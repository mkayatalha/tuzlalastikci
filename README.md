# tuzlalastikci
Tuzla'da bir lastikçi ve yol yardımı hizmetine erişim için yapılmış modern bir web sitesi. Astro ile yapılmış statik site; Cloudflare Pages'te ücretsiz yayınlanır.

## Bilgileri değiştirmek
İşletme bilgileri, hizmet ve bölge metinleri tek dosyada: `src/data/site.ts`.
- WhatsApp numarası: `business.whatsapp` (boşken buton görünmez)
- Ölçüm: `analytics.ga4Id` (Google Analytics 4) ve `analytics.cloudflareToken` (Cloudflare Web Analytics)

## Yerelde çalıştırma
    npm install
    npm run dev      # http://localhost:4321
    npm run build    # çıktı: dist/

## Yayın (Cloudflare Pages)
1. Bu klasörü bir GitHub deposuna koyun.
2. Cloudflare panelinde Workers & Pages > Create > Pages > Connect to Git, depoyu seçin.
3. Build command: `npm run build`, output directory: `dist`.
4. Custom domains bölümünden `tuzlalastikci.com` ve `www.tuzlalastikci.com` ekleyin.
Her `git push` sonrası site otomatik güncellenir.
