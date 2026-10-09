import type { APIRoute } from 'astro';
import { services, areas } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const paths = ['/', ...services.map((s) => `/hizmetler/${s.slug}/`), ...areas.map((a) => `/bolge/${a.slug}/`), '/sss/', '/iletisim/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
