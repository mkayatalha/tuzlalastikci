// Panel API'si: /api/panel/...  (giriş kontrolü ve tablo kurulumu _middleware.js içinde)

const SEASONS = ['yaz', 'kis', '4mevsim'];
const CATEGORIES = ['binek', 'suv', 'hafif_ticari', 'agir_ticari'];

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const str = (v, max = 200) => String(v ?? '').trim().slice(0, max);
const int = (v, { min = 0, max = 1e6, def = null } = {}) => {
  if (v === '' || v === null || v === undefined) return def;
  const n = Math.round(Number(v));
  if (!Number.isFinite(n) || n < min || n > max) throw new HttpError(400, 'Geçersiz sayı.');
  return n;
};
const num = (v) => {
  if (v === '' || v === null || v === undefined) return null;
  const n = Number(String(v).replace(',', '.'));
  if (!Number.isFinite(n) || n < 0) throw new HttpError(400, 'Geçersiz sayı.');
  return n;
};
const oneOf = (v, opts, def) => (opts.includes(v) ? v : def);
const phoneNorm = (v) => {
  let d = String(v ?? '').replace(/\D/g, '');
  if (d.startsWith('90') && d.length === 12) d = d.slice(2);
  if (d.length === 10) d = '0' + d;
  return d;
};
const date = (v) => {
  const s = str(v, 10);
  if (!s) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) throw new HttpError(400, 'Geçersiz tarih.');
  return s;
};

function tireFields(b) {
  const brand = str(b.brand, 60);
  const size = str(b.size, 40);
  if (!brand || !size) throw new HttpError(400, 'Marka ve ölçü zorunlu.');
  return {
    brand,
    model: str(b.model, 80),
    size,
    load_speed: str(b.load_speed, 20),
    season: oneOf(b.season, SEASONS, 'yaz'),
    category: oneOf(b.category, CATEGORIES, 'binek'),
    dot_year: int(b.dot_year, { min: 2000, max: 2100 }),
    quantity: int(b.quantity, { def: 0 }),
    min_qty: int(b.min_qty, { def: 4, max: 1000 }),
    price: num(b.price),
    note: str(b.note, 500),
  };
}

function hotelFields(b) {
  return {
    plate: str(b.plate, 20).toUpperCase().replace(/\s+/g, ' '),
    vehicle: str(b.vehicle, 80),
    brand: str(b.brand, 60),
    size: str(b.size, 40),
    season: oneOf(b.season, SEASONS, 'kis'),
    count: int(b.count, { def: 4, max: 20 }),
    with_rim: b.with_rim ? 1 : 0,
    tread_mm: num(b.tread_mm),
    shelf: str(b.shelf, 40),
    fee: num(b.fee),
    note: str(b.note, 500),
    check_in: date(b.check_in) || new Date().toISOString().slice(0, 10),
  };
}

async function body(request) {
  try {
    return await request.json();
  } catch {
    throw new HttpError(400, 'Geçersiz veri.');
  }
}

const TIRE_COLS = ['brand', 'model', 'size', 'load_speed', 'season', 'category', 'dot_year', 'quantity', 'min_qty', 'price', 'note'];
const insertTire = (db, t) =>
  db
    .prepare(`INSERT INTO tires (${TIRE_COLS.join(',')}) VALUES (${TIRE_COLS.map(() => '?').join(',')}) RETURNING *`)
    .bind(...TIRE_COLS.map((c) => t[c]));

async function upsertCustomer(db, b) {
  const name = str(b.name, 80);
  const phone = phoneNorm(b.phone);
  if (!name || phone.length < 10) throw new HttpError(400, 'Müşteri adı ve geçerli telefon zorunlu.');
  const kvkk = b.kvkk_ok ? 1 : 0;
  const row = await db
    .prepare(
      `INSERT INTO customers (name, phone, kvkk_ok) VALUES (?, ?, ?)
       ON CONFLICT(phone) DO UPDATE SET name = excluded.name, kvkk_ok = MAX(kvkk_ok, excluded.kvkk_ok)
       RETURNING id`,
    )
    .bind(name, phone, kvkk)
    .first();
  return row.id;
}

const HOTEL_SELECT = `SELECT h.*, c.name, c.phone, c.kvkk_ok FROM hotel h JOIN customers c ON c.id = h.customer_id`;

export async function onRequest({ request, env, params, data }) {
  const db = env.DB;
  const path = params.path || [];
  const [res, idRaw, action] = path;
  const id = idRaw ? int(idRaw, { min: 1, max: 1e12 }) : null;
  const m = request.method;

  if (res === 'me' && m === 'GET') return json({ user: data.user });

  // ---- Stok ----
  if (res === 'tires') {
    if (!id && m === 'GET') {
      const { results } = await db.prepare('SELECT * FROM tires ORDER BY brand, size, model').all();
      return json(results);
    }
    if (!id && m === 'POST') {
      const t = tireFields(await body(request));
      const row = await insertTire(db, t).first();
      if (t.quantity) {
        await db
          .prepare('INSERT INTO stock_moves (tire_id, delta, reason, user_email) VALUES (?, ?, ?, ?)')
          .bind(row.id, t.quantity, 'ilk_kayit', data.user)
          .run();
      }
      return json(row, 201);
    }
    if (idRaw === 'import' && m === 'POST') {
      const b = await body(request);
      const rows = Array.isArray(b.rows) ? b.rows.slice(0, 2000) : [];
      if (!rows.length) throw new HttpError(400, 'Aktarılacak satır yok.');
      const items = rows.map((r, i) => {
        try {
          return tireFields(r);
        } catch (e) {
          throw new HttpError(400, `${i + 1}. satır: ${e.message}`);
        }
      });
      for (let i = 0; i < items.length; i += 50) {
        await db.batch(items.slice(i, i + 50).map((t) => insertTire(db, t)));
      }
      return json({ added: items.length }, 201);
    }
    if (id && !action && m === 'PUT') {
      const b = await body(request);
      const t = tireFields(b);
      // Adet burada değişmez; adet değişikliği hareket kaydıyla /move üzerinden yapılır.
      const cols = TIRE_COLS.filter((c) => c !== 'quantity');
      const row = await db
        .prepare(`UPDATE tires SET ${cols.map((c) => `${c} = ?`).join(', ')}, updated_at = datetime('now') WHERE id = ? RETURNING *`)
        .bind(...cols.map((c) => t[c]), id)
        .first();
      if (!row) throw new HttpError(404, 'Kayıt bulunamadı.');
      return json(row);
    }
    if (id && !action && m === 'DELETE') {
      await db.batch([db.prepare('DELETE FROM stock_moves WHERE tire_id = ?').bind(id), db.prepare('DELETE FROM tires WHERE id = ?').bind(id)]);
      return json({ ok: true });
    }
    if (id && action === 'move' && m === 'POST') {
      const b = await body(request);
      const delta = int(b.delta, { min: -10000, max: 10000 });
      if (!delta) throw new HttpError(400, 'Adet değişikliği girilmeli.');
      const reason = oneOf(b.reason, ['satis', 'alis', 'duzeltme', 'iade'], delta < 0 ? 'satis' : 'alis');
      const note = str(b.note, 200);
      const [, upd] = await db.batch([
        db
          .prepare(
            `INSERT INTO stock_moves (tire_id, delta, reason, note, user_email)
             SELECT id, ?, ?, ?, ? FROM tires WHERE id = ? AND quantity + ? >= 0`,
          )
          .bind(delta, reason, note, data.user, id, delta),
        db
          .prepare(`UPDATE tires SET quantity = quantity + ?, updated_at = datetime('now') WHERE id = ? AND quantity + ? >= 0 RETURNING *`)
          .bind(delta, id, delta),
      ]);
      const row = upd.results?.[0];
      if (!row) throw new HttpError(409, 'Stok eksiye düşemez.');
      return json(row);
    }
    if (id && action === 'moves' && m === 'GET') {
      const { results } = await db.prepare('SELECT * FROM stock_moves WHERE tire_id = ? ORDER BY id DESC LIMIT 100').bind(id).all();
      return json(results);
    }
  }

  if (res === 'moves' && !id && m === 'GET') {
    const { results } = await db
      .prepare(
        `SELECT s.*, t.brand, t.model, t.size FROM stock_moves s JOIN tires t ON t.id = s.tire_id ORDER BY s.id DESC LIMIT 100`,
      )
      .all();
    return json(results);
  }

  // ---- Lastik oteli ----
  if (res === 'hotel') {
    if (!id && m === 'GET') {
      const { results } = await db.prepare(`${HOTEL_SELECT} ORDER BY h.check_out IS NOT NULL, h.id DESC`).all();
      return json(results);
    }
    if (!id && m === 'POST') {
      const b = await body(request);
      const h = hotelFields(b);
      const customerId = await upsertCustomer(db, b);
      const cols = Object.keys(h);
      const { id: newId } = await db
        .prepare(`INSERT INTO hotel (customer_id, ${cols.join(',')}) VALUES (?, ${cols.map(() => '?').join(',')}) RETURNING id`)
        .bind(customerId, ...cols.map((c) => h[c]))
        .first();
      return json(await db.prepare(`${HOTEL_SELECT} WHERE h.id = ?`).bind(newId).first(), 201);
    }
    if (id && !action && m === 'PUT') {
      const b = await body(request);
      const h = hotelFields(b);
      const customerId = await upsertCustomer(db, b);
      const cols = Object.keys(h);
      const r = await db
        .prepare(`UPDATE hotel SET customer_id = ?, ${cols.map((c) => `${c} = ?`).join(', ')} WHERE id = ?`)
        .bind(customerId, ...cols.map((c) => h[c]), id)
        .run();
      if (!r.meta.changes) throw new HttpError(404, 'Kayıt bulunamadı.');
      return json(await db.prepare(`${HOTEL_SELECT} WHERE h.id = ?`).bind(id).first());
    }
    if (id && (action === 'checkout' || action === 'reopen') && m === 'POST') {
      const b = await body(request);
      const out = action === 'checkout' ? date(b.date) || new Date().toISOString().slice(0, 10) : null;
      await db.prepare('UPDATE hotel SET check_out = ? WHERE id = ?').bind(out, id).run();
      return json(await db.prepare(`${HOTEL_SELECT} WHERE h.id = ?`).bind(id).first());
    }
    if (id && !action && m === 'DELETE') {
      await db.prepare('DELETE FROM hotel WHERE id = ?').bind(id).run();
      return json({ ok: true });
    }
  }

  // KVKK: müşteriyi ve tüm otel kayıtlarını tamamen siler.
  if (res === 'customers' && id && m === 'DELETE') {
    await db.batch([db.prepare('DELETE FROM hotel WHERE customer_id = ?').bind(id), db.prepare('DELETE FROM customers WHERE id = ?').bind(id)]);
    return json({ ok: true });
  }

  return json({ error: 'Bulunamadı.' }, 404);
}
