# Panel kurulumu (stok + lastik oteli)

Panel adresi: https://tuzlalastikci.com/panel/  
Her şey Cloudflare'in ücretsiz planında çalışır.

## 1. Veritabanını oluştur
Cloudflare paneli > **Storage & Databases > D1** > **Create database**  
Ad: `tuzlalastikci-panel` (konum: otomatik). Tablolar ilk girişte kendiliğinden oluşur.

## 2. Veritabanını siteye bağla
**Workers & Pages > tuzlalastikci > Settings > Bindings > Add > D1 database**  
- Variable name: `DB`  
- D1 database: `tuzlalastikci-panel`  
Bunu yalnızca **Production** ortamına ekle. PR önizlemelerinde panel bilerek kapalı kalır.

## 3. Şifreleri ekle
**Settings > Variables and Secrets > Add**  
- Type: **Secret**  
- Variable name: `PANEL_USERS`  
- Value: `talha:BURAYA-SIFRE, usta:BURAYA-BASKA-SIFRE`

Her kişi `isim:şifre`, kişiler virgülle ayrılır. Şifre en az 8 karakter olmalı (öneri: 3-4 kelimelik, akılda kalan bir cümle). Hareket geçmişinde işlemi kimin yaptığı bu isimle görünür.  
Şifre değiştirilirse herkesin oturumu kapanır, yeni şifreyle bir kez girilir.

## 4. Yeniden yayınla
Ayarlar yeni yayında geçerli olur: **Deployments** > en üstteki Production kaydı > **⋯ > Retry deployment**.

## Giriş nasıl çalışır
- Sadece şifre sorulur. Telefonun şifre kaydetme özelliği şifreyi hatırlar.
- Bir kez giriş yapan cihaz 6 ay hatırlanır. Panel kullanıldıkça süre kendiliğinden uzar, düzenli kullanan kişiye bir daha şifre sorulmaz.
- Aynı yerden 15 dakikada 10 hatalı denemede giriş 15 dakika kilitlenir.
- Telefonda Safari/Chrome > Paylaş > **Ana Ekrana Ekle** ile uygulama gibi açılır.

## Yedek
Stok ve otel sekmelerindeki "indir (CSV)" düğmeleri Excel'de açılan bir yedek verir. Ayda bir indirilmesi önerilir.
