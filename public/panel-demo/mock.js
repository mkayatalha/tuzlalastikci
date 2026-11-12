// DEMO: Sunucu yerine tarayıcıda çalışan sahte veri. Sayfa yenilenince başa döner.
(function () {
  const now = () => new Date().toISOString().replace('T', ' ').slice(0, 19);
  const daysAgo = (d) => new Date(Date.now() - d * 864e5).toISOString().slice(0, 10);
  let tid = 0, mid = 0, hid = 0, cid = 0;
  const T = (brand, model, size, ls, season, category, qty, min, price, dot) => ({ id: ++tid, brand, model, size, load_speed: ls, season, category, dot_year: dot || 2025, quantity: qty, min_qty: min, price, note: '', created_at: now(), updated_at: now() });
  const tires = [
    T('Hankook', 'Ventus Prime 4', '205/55 R16', '91V', 'yaz', 'binek', 12, 4, 3450),
    T('Hankook', 'Kinergy 4S2', '205/55 R16', '94V', '4mevsim', 'binek', 6, 4, 3790),
    T('Hankook', 'Winter i*cept RS3', '205/55 R16', '91H', 'kis', 'binek', 3, 4, 3600),
    T('Hankook', 'Kinergy Eco 2', '195/65 R15', '91H', 'yaz', 'binek', 16, 4, 2690),
    T('Hankook', 'Winter i*cept RS3', '195/65 R15', '91T', 'kis', 'binek', 8, 4, 2850),
    T('Hankook', 'Ventus S1 evo3', '225/45 R17', '94Y', 'yaz', 'binek', 4, 4, 4900),
    T('Hankook', 'Dynapro HP2', '215/65 R16', '98H', 'yaz', 'suv', 5, 4, 4350),
    T('Hankook', 'Vantra LT RA18', '195/75 R16C', '107/105R', 'yaz', 'hafif_ticari', 10, 6, 4100),
    T('Hankook', 'Winter i*cept LV', '215/65 R16C', '109/107R', 'kis', 'hafif_ticari', 2, 4, 4650),
    T('Hankook', 'AH31', '315/80 R22.5', '156/150L', '4mevsim', 'agir_ticari', 6, 2, 14900),
    T('Laufenn', 'G FIT EQ+', '185/65 R15', '88H', 'yaz', 'binek', 20, 4, 2150),
    T('Lassa', 'Snoways 4', '205/55 R16', '91H', 'kis', 'binek', 0, 4, 2950, 2024),
    T('Michelin', 'Primacy 4+', '225/45 R17', '94W', 'yaz', 'binek', 4, 2, 6200),
    T('Petlas', 'Full Power PT825+', '195/75 R16C', '107/105R', 'yaz', 'hafif_ticari', 8, 4, 2990),
    T('Continental', 'EcoContact 6', '195/65 R15', '91H', 'yaz', 'binek', 1, 2, 3700, 2024),
  ];
  const moves = [];
  const M = (t, delta, reason, note, d) => moves.push({ id: ++mid, tire_id: t.id, delta, reason, note: note || '', user_email: 'usta', created_at: new Date(Date.now() - d * 36e5).toISOString().replace('T', ' ').slice(0, 19) });
  tires.forEach((t, i) => M(t, t.quantity + (i % 3), 'alis', 'Açılış sayımı', 200 - i));
  [[0, -4, 'satis', '34 KL 0001 Doblo', 30], [3, -2, 'satis', '', 26], [11, -4, 'satis', 'Filo müşterisi', 20], [8, -2, 'satis', '', 9], [14, -1, 'satis', '', 5], [2, -1, 'satis', '', 2]].forEach(([i, d, r, n, h]) => M(tires[i], d, r, n, h));
  const customers = [];
  const C = (name, phone, kvkk) => { const c = { id: ++cid, name, phone, kvkk_ok: kvkk ? 1 : 0 }; customers.push(c); return c; };
  const hotel = [];
  const H = (c, o) => hotel.push(Object.assign({ id: ++hid, customer_id: c.id, plate: '', vehicle: '', brand: '', size: '', season: 'kis', count: 4, with_rim: 0, tread_mm: null, shelf: '', fee: null, note: '', check_in: daysAgo(30), check_out: null }, o));
  const c1 = C('Örnek Müşteri 1', '05550000001', 1), c2 = C('Örnek Müşteri 2', '05550000002', 1), c3 = C('Örnek Firma Lojistik', '05550000003', 1), c4 = C('Örnek Müşteri 4', '05550000004', 0);
  H(c1, { plate: '34 ABC 101', vehicle: 'Renault Clio', brand: 'Hankook', size: '195/65 R15', season: 'yaz', tread_mm: 5.5, shelf: 'A-03', fee: 1500, check_in: daysAgo(12) });
  H(c2, { plate: '34 XYZ 202', vehicle: 'VW Passat', brand: 'Michelin', size: '225/45 R17', season: 'yaz', with_rim: 1, tread_mm: 6, shelf: 'A-07', fee: 2000, check_in: daysAgo(9) });
  H(c3, { plate: '34 FRM 303', vehicle: 'Ford Transit', brand: 'Hankook', size: '215/65 R16C', season: 'yaz', tread_mm: 4, shelf: 'B-01', note: 'Sağ arka yanakta çizik', check_in: daysAgo(7) });
  H(c3, { plate: '34 FRM 304', vehicle: 'Ford Transit', brand: 'Hankook', size: '215/65 R16C', season: 'yaz', tread_mm: 4.5, shelf: 'B-02', check_in: daysAgo(7) });
  H(c4, { plate: '41 DEF 404', vehicle: 'Fiat Egea', brand: 'Lassa', size: '205/55 R16', season: 'yaz', shelf: 'A-11', check_in: daysAgo(3) });
  H(c1, { plate: '34 ABC 101', vehicle: 'Renault Clio', brand: 'Hankook', size: '195/65 R15', season: 'kis', shelf: 'A-03', fee: 1500, check_in: daysAgo(210), check_out: daysAgo(14) });

  const SEASONS = ['yaz', 'kis', '4mevsim'];
  const err = (status, error) => { const e = new Error(error); e.status = status; throw e; };
  const n = (v, d = null) => (v === '' || v == null ? d : Number(String(v).replace(',', '.')));
  const phoneNorm = (v) => { let d = String(v || '').replace(/\D/g, ''); if (d.startsWith('90') && d.length === 12) d = d.slice(2); if (d.length === 10) d = '0' + d; return d; };
  const tireFields = (b) => {
    if (!String(b.brand || '').trim() || !String(b.size || '').trim()) err(400, 'Marka ve ölçü zorunlu.');
    return { brand: b.brand.trim(), model: (b.model || '').trim(), size: b.size.trim(), load_speed: (b.load_speed || '').trim(), season: SEASONS.includes(b.season) ? b.season : 'yaz', category: b.category || 'binek', dot_year: n(b.dot_year), quantity: Math.max(0, Math.round(n(b.quantity, 0))), min_qty: Math.round(n(b.min_qty, 4)), price: n(b.price), note: (b.note || '').trim() };
  };
  const hotelRow = (h) => { const c = customers.find((x) => x.id === h.customer_id); return Object.assign({}, h, { name: c.name, phone: c.phone, kvkk_ok: c.kvkk_ok }); };
  const upsertCustomer = (b) => {
    const phone = phoneNorm(b.phone);
    if (!String(b.name || '').trim() || phone.length < 10) err(400, 'Müşteri adı ve geçerli telefon zorunlu.');
    let c = customers.find((x) => x.phone === phone);
    if (c) { c.name = b.name.trim(); c.kvkk_ok = Math.max(c.kvkk_ok, b.kvkk_ok ? 1 : 0); }
    else c = C(b.name.trim(), phone, b.kvkk_ok);
    return c.id;
  };
  const hotelFields = (b) => ({ plate: String(b.plate || '').toUpperCase().trim(), vehicle: b.vehicle || '', brand: b.brand || '', size: b.size || '', season: SEASONS.includes(b.season) ? b.season : 'kis', count: Math.round(n(b.count, 4)), with_rim: b.with_rim ? 1 : 0, tread_mm: n(b.tread_mm), shelf: b.shelf || '', fee: n(b.fee), note: b.note || '', check_in: b.check_in || daysAgo(0) });

  function route(method, path, b) {
    const [res, idRaw, action] = path.split('/');
    const id = Number(idRaw) || null;
    if (res === 'me') return { user: 'demo' };
    if (res === 'tires') {
      if (!idRaw && method === 'GET') return tires.slice().sort((a, b) => a.brand.localeCompare(b.brand, 'tr') || a.size.localeCompare(b.size));
      if (!idRaw && method === 'POST') { const t = Object.assign({ id: ++tid, created_at: now(), updated_at: now() }, tireFields(b)); tires.push(t); if (t.quantity) M(t, t.quantity, 'ilk_kayit', '', 0); return t; }
      if (idRaw === 'import') { b.rows.forEach((r) => tires.push(Object.assign({ id: ++tid, created_at: now(), updated_at: now() }, tireFields(r)))); return { added: b.rows.length }; }
      const t = tires.find((x) => x.id === id) || err(404, 'Kayıt bulunamadı.');
      if (!action && method === 'PUT') { const f = tireFields(b); delete f.quantity; return Object.assign(t, f, { updated_at: now() }); }
      if (!action && method === 'DELETE') { tires.splice(tires.indexOf(t), 1); return { ok: true }; }
      if (action === 'move') { const d = Math.round(n(b.delta, 0)); if (t.quantity + d < 0) err(409, 'Stok eksiye düşemez.'); t.quantity += d; M(t, d, b.reason || (d < 0 ? 'satis' : 'alis'), b.note, 0); return t; }
      if (action === 'moves') return moves.filter((m) => m.tire_id === id).sort((a, b) => b.id - a.id);
    }
    if (res === 'moves') return moves.slice().sort((a, b) => b.id - a.id).slice(0, 100).map((m) => { const t = tires.find((x) => x.id === m.tire_id) || {}; return Object.assign({}, m, { brand: t.brand, model: t.model, size: t.size }); }).filter((m) => m.size);
    if (res === 'hotel') {
      if (!idRaw && method === 'GET') return hotel.slice().sort((a, b) => (!!a.check_out - !!b.check_out) || b.id - a.id).map(hotelRow);
      if (!idRaw && method === 'POST') { const h = Object.assign({ id: ++hid, customer_id: upsertCustomer(b), check_out: null }, hotelFields(b)); hotel.push(h); return hotelRow(h); }
      const h = hotel.find((x) => x.id === id) || err(404, 'Kayıt bulunamadı.');
      if (!action && method === 'PUT') { Object.assign(h, hotelFields(b), { customer_id: upsertCustomer(b) }); return hotelRow(h); }
      if (action === 'checkout') { h.check_out = daysAgo(0); return hotelRow(h); }
      if (action === 'reopen') { h.check_out = null; return hotelRow(h); }
      if (!action && method === 'DELETE') { hotel.splice(hotel.indexOf(h), 1); return { ok: true }; }
    }
    if (res === 'customers' && method === 'DELETE') { for (let i = hotel.length - 1; i >= 0; i--) if (hotel[i].customer_id === id) hotel.splice(i, 1); customers.splice(customers.findIndex((c) => c.id === id), 1); return { ok: true }; }
    err(404, 'Bulunamadı.');
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = async (url, opts = {}) => {
    const u = String(url);
    if (!u.startsWith('/api/panel/')) return realFetch(url, opts);
    await new Promise((r) => setTimeout(r, 120));
    const method = opts.method || 'GET';
    try {
      const data = route(method, u.slice('/api/panel/'.length).split('?')[0], opts.body ? JSON.parse(opts.body) : {});
      return new Response(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { status: e.status || 500, headers: { 'Content-Type': 'application/json' } });
    }
  };
})();
