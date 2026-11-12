// Panel girişi: kişiye özel şifre + uzun süreli imzalı çerez.
//
// Tek ayar: Cloudflare Pages > Settings > Variables and Secrets içinde
// PANEL_USERS adlı gizli değişken (Secret). Biçim, her satır veya virgül bir kişi:
//   talha:uzun-bir-sifre, usta:baska-bir-sifre
// Şifre değiştirilirse tüm açık oturumlar kapanır (imza anahtarı bu değerden türetilir).

const COOKIE = 'tl_panel';
const SESSION_DAYS = 180;
const RENEW_BELOW_DAYS = 150;
const MAX_FAILS = 10;
const FAIL_WINDOW_SEC = 15 * 60;

const enc = new TextEncoder();

function b64url(bytes) {
  let s = '';
  for (const b of new Uint8Array(bytes)) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function fromB64url(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
}

export function users(env) {
  const out = new Map();
  for (const part of String(env.PANEL_USERS || '').split(/[\n,]/)) {
    const i = part.indexOf(':');
    if (i < 1) continue;
    const name = part.slice(0, i).trim();
    const pass = part.slice(i + 1).trim();
    if (name && pass.length >= 8) out.set(name, pass);
  }
  return out;
}

async function key(env) {
  const raw = await crypto.subtle.digest('SHA-256', enc.encode('tuzlalastikci-panel-v1|' + env.PANEL_USERS));
  return crypto.subtle.importKey('raw', raw, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function sameText(a, b) {
  // Sabit süreli karşılaştırma: iki değerin özetini karşılaştırır.
  const [x, y] = await Promise.all([crypto.subtle.digest('SHA-256', enc.encode(a)), crypto.subtle.digest('SHA-256', enc.encode(b))]);
  const ua = new Uint8Array(x), ub = new Uint8Array(y);
  let d = 0;
  for (let i = 0; i < ua.length; i++) d |= ua[i] ^ ub[i];
  return d === 0;
}

export async function sessionCookie(env, user) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_DAYS * 86400;
  const body = b64url(enc.encode(JSON.stringify({ u: user, exp })));
  const sig = b64url(await crypto.subtle.sign('HMAC', await key(env), enc.encode(body)));
  return `${COOKIE}=${body}.${sig}; Path=/api/panel; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_DAYS * 86400}`;
}

export const clearCookie = () => `${COOKIE}=; Path=/api/panel; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

// Geçerli oturum varsa { user, renew } döner, yoksa null.
export async function readSession(request, env) {
  const m = (request.headers.get('Cookie') || '').match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!m) return null;
  const [body, sig] = m[1].split('.');
  if (!body || !sig) return null;
  try {
    const ok = await crypto.subtle.verify('HMAC', await key(env), fromB64url(sig), enc.encode(body));
    if (!ok) return null;
    const { u, exp } = JSON.parse(new TextDecoder().decode(fromB64url(body)));
    const now = Math.floor(Date.now() / 1000);
    if (!exp || exp < now || !users(env).has(u)) return null;
    return { user: u, renew: exp - now < RENEW_BELOW_DAYS * 86400 };
  } catch {
    return null;
  }
}

// Şifreyi kontrol eder; aynı IP'den 15 dakikada 10 hatalı denemeden sonra kilitler.
export async function login(request, env, password) {
  const db = env.DB;
  const ip = request.headers.get('CF-Connecting-IP') || 'yerel';
  const now = Math.floor(Date.now() / 1000);
  const row = await db.prepare('SELECT count, first_at FROM login_fail WHERE ip = ?').bind(ip).first();
  if (row && now - row.first_at < FAIL_WINDOW_SEC && row.count >= MAX_FAILS) {
    return { status: 429, error: 'Çok fazla hatalı deneme. 15 dakika sonra tekrar deneyin.' };
  }

  let found = null;
  for (const [name, pass] of users(env)) {
    if (await sameText(String(password || ''), pass)) found = name;
  }
  if (!found) {
    if (!row || now - row.first_at >= FAIL_WINDOW_SEC) {
      await db.prepare('INSERT OR REPLACE INTO login_fail (ip, count, first_at) VALUES (?, 1, ?)').bind(ip, now).run();
    } else {
      await db.prepare('UPDATE login_fail SET count = count + 1 WHERE ip = ?').bind(ip).run();
    }
    return { status: 401, error: 'Şifre yanlış.' };
  }
  if (row) await db.prepare('DELETE FROM login_fail WHERE ip = ?').bind(ip).run();
  return { user: found };
}
