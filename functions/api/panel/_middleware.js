import { readSession, sessionCookie, clearCookie, login, users } from '../../../server/auth.js';
import { ensureSchema } from '../../../server/schema.js';

const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', ...extra },
  });

export async function onRequest(context) {
  const { request, env } = context;
  const path = new URL(request.url).pathname;

  if (!users(env).size) return json({ error: 'Panel henüz yapılandırılmadı (PANEL_USERS eksik).' }, 503);
  if (!env.DB) return json({ error: 'Veritabanı bağlı değil (D1 bağlantısı "DB" adıyla eklenmeli).' }, 503);

  // Başka sitelerden gelen istekleri engellemek için değişiklik isteklerinde özel başlık şart.
  if (request.method !== 'GET' && request.headers.get('X-Panel') !== '1') {
    return json({ error: 'Geçersiz istek.' }, 400);
  }

  try {
    await ensureSchema(env.DB);

    if (path === '/api/panel/login' && request.method === 'POST') {
      let body = {};
      try { body = await request.json(); } catch {}
      const r = await login(request, env, body.password);
      if (r.error) return json({ error: r.error }, r.status);
      return json({ user: r.user }, 200, { 'Set-Cookie': await sessionCookie(env, r.user) });
    }
    if (path === '/api/panel/logout' && request.method === 'POST') {
      return json({ ok: true }, 200, { 'Set-Cookie': clearCookie() });
    }

    const session = await readSession(request, env);
    if (!session) return json({ error: 'Giriş yapılmamış.' }, 401);
    context.data.user = session.user;

    const res = await context.next();
    if (!session.renew) return res;
    // Kullandıkça oturum süresi uzar; düzenli giren kişiye bir daha şifre sorulmaz.
    const out = new Response(res.body, res);
    out.headers.append('Set-Cookie', await sessionCookie(env, session.user));
    return out;
  } catch (e) {
    return json({ error: e.status ? e.message : 'Sunucu hatası.' }, e.status || 500);
  }
}
