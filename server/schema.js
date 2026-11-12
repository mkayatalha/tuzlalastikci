// D1 tabloları. İlk istekte "IF NOT EXISTS" ile kendiliğinden oluşturulur,
// elle SQL çalıştırmaya gerek yoktur.
export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS tires (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL DEFAULT '',
    size TEXT NOT NULL,
    load_speed TEXT NOT NULL DEFAULT '',
    season TEXT NOT NULL DEFAULT 'yaz',
    category TEXT NOT NULL DEFAULT 'binek',
    dot_year INTEGER,
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    min_qty INTEGER NOT NULL DEFAULT 4,
    price REAL,
    note TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS stock_moves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tire_id INTEGER NOT NULL REFERENCES tires(id) ON DELETE CASCADE,
    delta INTEGER NOT NULL,
    reason TEXT NOT NULL DEFAULT '',
    note TEXT NOT NULL DEFAULT '',
    user_email TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE INDEX IF NOT EXISTS stock_moves_tire ON stock_moves(tire_id, id)`,
  `CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    kvkk_ok INTEGER NOT NULL DEFAULT 0,
    note TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS hotel (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL REFERENCES customers(id),
    plate TEXT NOT NULL DEFAULT '',
    vehicle TEXT NOT NULL DEFAULT '',
    brand TEXT NOT NULL DEFAULT '',
    size TEXT NOT NULL DEFAULT '',
    season TEXT NOT NULL DEFAULT 'kis',
    count INTEGER NOT NULL DEFAULT 4,
    with_rim INTEGER NOT NULL DEFAULT 0,
    tread_mm REAL,
    shelf TEXT NOT NULL DEFAULT '',
    fee REAL,
    note TEXT NOT NULL DEFAULT '',
    check_in TEXT NOT NULL DEFAULT (date('now')),
    check_out TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE INDEX IF NOT EXISTS hotel_open ON hotel(check_out)`,
  `CREATE TABLE IF NOT EXISTS login_fail (
    ip TEXT PRIMARY KEY,
    count INTEGER NOT NULL,
    first_at INTEGER NOT NULL
  )`,
];

let ready = false;
export async function ensureSchema(db) {
  if (ready) return;
  await db.batch(SCHEMA.map((s) => db.prepare(s)));
  ready = true;
}
