// Tüm işletme bilgileri tek yerde. Google İşletme Profili ile harfi harfine aynı tutun.

export const business = {
  name: 'Tersane Lastik',
  headline: 'Tuzla Lastikçi',
  tagline: 'Lastik · Jant · Yol Yardım',
  phone: '0216 446 15 60',
  phoneE164: '+902164461560',
  // 90 ile başlayarak yazın. Boşken WhatsApp butonları gizlenir.
  whatsapp: '905352952752',
  whatsappDisplay: '0535 295 27 52',
  street: 'Evliya Çelebi Mah. Ayabakan Sk. No:1',
  postalCode: '34944',
  district: 'Tuzla',
  city: 'İstanbul',
  geo: { lat: 40.841009, lng: 29.294133 },
  mapsUrl: 'https://maps.app.goo.gl/uKEFstR3DtiKtoUz9',
  instagram: 'https://www.instagram.com/tersane_lastik/',
  hours: [
    { days: 'Pazartesi – Cumartesi', open: '08:00', close: '23:30', schemaDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] },
    { days: 'Pazar', open: '11:00', close: '18:00', schemaDays: ['Sunday'] },
  ],
};

// Ölçüm kodları. Boş bırakılan servis siteye hiç yüklenmez.
export const analytics = {
  ga4Id: 'G-DWG28GLDVR', // ör. 'G-XXXXXXXXXX' (Google Analytics 4)
  cloudflareToken: '', // Cloudflare Web Analytics site token'ı
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  body: string[];
  bullets: string[];
  faq: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: 'lastik-degisimi',
    title: 'Lastik satış ve değişim',
    short: 'Yaz, kış ve 4 mevsim lastik. Sökme, takma, balans ve sibop değişimi aynı gün.',
    h1: 'Tuzla Lastik Satış ve Değişim',
    metaTitle: 'Tuzla Lastik Değişimi ve Satışı | Tersane Lastik',
    metaDescription: 'Tuzla\'da yaz, kış ve 4 mevsim lastik satışı, değişimi ve balans. Randevusuz gelin, 23:30\'a kadar açığız. 0216 446 15 60',
    icon: 'tire',
    body: [
      'Binek araç, SUV, hafif ticari ve motosiklet lastiklerinde satış ve değişim yapıyoruz. Lastik ölçünüzü telefonda söylemeniz yeterli; stok ve fiyat bilgisini hemen veriyoruz.',
      'Değişimde eski lastiği söküyor, yeni lastiği takıyor, balans ayarını yapıyor ve gerekirse sibobu yeniliyoruz. Dört lastik için işlem genelde 30–45 dakika sürer.',
      'Mevsim geçişlerinde (kasım ve nisan) yoğunluk olur. Bu dönemlerde önceden arayıp uygun saati sormanızı öneririz.',
    ],
    bullets: ['Yaz, kış ve 4 mevsim lastik', 'Balans ve sibop değişimi', 'Patlak lastik tamiri', 'Motosiklet lastiği'],
    faq: [
      { q: 'Randevu almam gerekiyor mu?', a: 'Hayır, randevusuz gelebilirsiniz. Mevsim geçişlerinde önceden aramanız beklemeyi azaltır.' },
      { q: 'Kış lastiğine ne zaman geçmeliyim?', a: 'Hava sıcaklığı düzenli olarak 7 °C\'nin altına indiğinde, İstanbul\'da genellikle kasım ayında.' },
    ],
  },
  {
    slug: 'hankook-lastik',
    title: 'Hankook bayi',
    short: 'Yetkili Hankook bayisiyiz. Diğer markaların lastiklerini de satıyoruz.',
    h1: 'Tuzla Hankook Bayi',
    metaTitle: 'Tuzla Hankook Bayi | Tersane Lastik',
    metaDescription: 'Tuzla\'da yetkili Hankook bayisi: yaz, kış ve 4 mevsim lastik. Ölçünüzü söyleyin, stok ve fiyatı hemen verelim. Takma ve balans dahil. 0216 446 15 60',
    icon: 'badge',
    body: [
      'Tuzla\'da yetkili Hankook bayisiyiz. Hankook\'un binek, SUV ve hafif ticari lastiklerini satıyor, aynı gün takıyoruz. Hankook dışındaki markaların lastiklerini de bulabilirsiniz. Aracınızın kullanımına göre (şehir içi, uzun yol, ağır yük) uygun modeli birlikte seçiyoruz.',
      'Stokta olmayan ölçüleri kısa sürede getirtebiliyoruz. Fiyat için lastiğin yanağındaki ölçüyü (ör. 205/55 R16) söylemeniz yeterli.',
    ],
    bullets: ['Yaz, kış ve 4 mevsim modeller', 'SUV ve hafif ticari ölçüler', 'Takma ve balans', 'Stokta olmayan ölçüyü getirtme'],
    faq: [
      { q: 'Hankook lastik fiyatını nasıl öğrenirim?', a: 'Lastik ölçünüzü telefonla veya dükkanda söyleyin, güncel stok ve fiyatı hemen verelim.' },
    ],
  },
  {
    slug: 'jant-kumlama-boyama',
    title: 'Jant kumlama ve boyama',
    short: 'Paslanmış, çizilmiş jantları kumlayıp istediğiniz renge boyuyoruz.',
    h1: 'Tuzla Jant Kumlama ve Boyama',
    metaTitle: 'Tuzla Jant Kumlama ve Jant Boyama | Tersane Lastik',
    metaDescription: 'Tuzla\'da jant kumlama ve jant boyama. Paslı, çizik jantlarınızı kumlayıp istediğiniz renkte boyuyoruz. Fiyat için arayın: 0216 446 15 60',
    icon: 'rim',
    body: [
      'Zamanla paslanan, kaldırıma sürtünüp çizilen veya boyası kalkan jantları kumlama ile eski boyadan ve pastan tamamen temizliyoruz. Ardından jantı istediğiniz renge boyuyoruz.',
      'Siyah, antrasit, gri ve gümüş en çok tercih edilen renkler. Rengi teslimden önce birlikte seçiyoruz.',
      'Takım jantlar çoğunlukla 1–2 iş gününde teslim edilir. Kesin süre ve fiyat için jantlarınızın durumunu görmemiz gerekir.',
    ],
    bullets: ['Kumlama ile pas ve eski boya temizliği', 'Dilediğiniz renkte boya', 'Çelik ve alüminyum jant', 'Takım halinde veya tek jant'],
    faq: [
      { q: 'Jant kumlama ve boyama kaç gün sürer?', a: 'Takım jantlar genelde 1–2 iş gününde teslim edilir.' },
      { q: 'Lastikler jantın üzerindeyken boyanabilir mi?', a: 'Hayır. Kaliteli sonuç için lastikleri söküp jantı boyuyor, sonra lastikleri geri takıp balansını yapıyoruz.' },
    ],
  },
  {
    slug: 'jant-duzeltme-cnc',
    title: 'Jant düzeltme ve CNC',
    short: 'Eğilen jantlar için düzeltme ve CNC torna ile yüzey yenileme.',
    h1: 'Tuzla Jant Düzeltme ve CNC Jant',
    metaTitle: 'Tuzla Jant Düzeltme ve CNC | Tersane Lastik',
    metaDescription: 'Tuzla\'da eğilen jant düzeltme ve CNC jant yüzey yenileme. Direksiyon titriyorsa jantınızı kontrol edelim. 0216 446 15 60',
    icon: 'cnc',
    body: [
      'Çukura veya kaldırıma sert giren araçlarda jant eğilebilir. Bunun belirtisi genelde belirli hızlarda direksiyonda veya koltukta hissedilen titreşimdir.',
      'Eğilen jantı kontrol ediyor, düzeltilebilecek durumdaysa düzeltip balansını yapıyoruz. CNC torna ile parlak (elmas kesim) yüzeyli jantların yüzeyini de yeniliyoruz.',
      'Çatlak veya kırık jantları güvenlik nedeniyle düzeltmiyor, değişim öneriyoruz.',
    ],
    bullets: ['Eğik jant kontrolü ve düzeltme', 'CNC ile yüzey yenileme', 'Düzeltme sonrası balans', 'Çatlak kontrolü'],
    faq: [
      { q: 'Eğilen jant düzeltilebilir mi?', a: 'Çoğu eğilme düzeltilebilir. Çatlak veya kırık jantlarda güvenlik için değişim öneriyoruz.' },
    ],
  },
  {
    slug: 'yol-yardim',
    title: 'Yol yardım ve yerinde değişim',
    short: 'Lastiğiniz yolda patladıysa arayın; Tuzla ve çevresinde yerinize gelelim.',
    h1: 'Tuzla Lastik Yol Yardım',
    metaTitle: 'Tuzla Lastik Yol Yardım ve Yerinde Değişim | Tersane Lastik',
    metaDescription: 'Tuzla\'da lastiğiniz patladıysa arayın: yol yardım ve yerinde lastik değişimi. Tuzla, Aydınlı, Orhanlı, İçmeler. 0216 446 15 60',
    icon: 'truck',
    body: [
      'Lastiğiniz yolda patladıysa veya stepneniz yoksa bizi arayın. Konumunuzu söyleyin, Tuzla ve yakın çevresinde yerinize gelip lastiği tamir ediyor ya da değiştiriyoruz.',
      'Güvenliğiniz için aracı mümkünse emniyet şeridine çekin, dörtlüleri yakın ve reflektörü koyun. Konumunuzu telefonla paylaşmanız ekibin sizi daha hızlı bulmasını sağlar.',
    ],
    bullets: ['Yerinde patlak tamiri', 'Yerinde lastik değişimi', 'Stepne takma', 'Tuzla ve yakın çevresi'],
    faq: [
      { q: 'Yol yardım için ne yapmam gerekiyor?', a: 'Telefonla arayın, konumunuzu ve aracınızın lastik ölçüsünü söyleyin.' },
    ],
  },
  {
    slug: 'lastik-oteli',
    title: 'Lastik oteli',
    short: 'Mevsimi geçen lastiklerinizi biz saklayalım; sezon gelince takalım.',
    h1: 'Tuzla Lastik Oteli ve Lastik Saklama',
    metaTitle: 'Tuzla Lastik Oteli ve Lastik Saklama | Tersane Lastik',
    metaDescription: 'Tuzla\'da lastik oteli: yaz veya kış lastiklerinizi sezon boyunca saklıyor, mevsim gelince takıyoruz. Evde yer kaplamasın. 0216 446 15 60',
    icon: 'rack',
    body: [
      'Yaz ve kış lastiği kullananlar için iki takım lastiği evde, balkonda veya otoparkta saklamak hem yer kaplar hem de lastiğin güneş ve nemden yıpranmasına yol açar.',
      'Lastik otelinde, mevsim değişiminde çıkan lastiklerinizi temiz ve düzenli şekilde saklıyoruz. Sezon gelince arayın, lastiklerinizi hazırlayıp takalım.',
    ],
    bullets: ['Yaz ve kış lastiği saklama', 'Mevsim geçişinde sökme ve takma', 'Lastik durum kontrolü', 'Jantlı veya jantsız lastik'],
    faq: [
      { q: 'Lastik oteli nedir?', a: 'Kullanmadığınız mevsimin lastiklerini sizin yerinize sakladığımız hizmettir. Sezon gelince lastikleri çıkarıp aracınıza takıyoruz.' },
    ],
  },
  {
    slug: 'ticari-arac-lastik',
    title: 'Ticari ve servis araçları',
    short: 'Servis minibüsleri, kamyonet ve kamyon lastikleri. Firmalara fatura ve düzenli bakım.',
    h1: 'Tuzla Ticari Araç ve Kamyon Lastiği',
    metaTitle: 'Tuzla Ticari Araç, Minibüs ve Kamyon Lastiği | Tersane Lastik',
    metaDescription: 'Tuzla\'da servis araçları, kamyonet ve kamyonlar için lastik satış ve değişim. Firmalara faturalı hizmet. 0216 446 15 60',
    icon: 'van',
    body: [
      'Servis minibüsleri, panelvanlar, kamyonetler ve kamyonlar için lastik satışı ve değişimi yapıyoruz.',
      'Birden fazla aracı olan firmalarla düzenli lastik kontrolü ve faturalı çalışma yapabiliyoruz. Filonuz için arayıp görüşelim.',
    ],
    bullets: ['Servis minibüsü ve panelvan', 'Kamyonet ve kamyon lastiği', 'Firmalara faturalı hizmet', 'Düzenli lastik kontrolü'],
    faq: [
      { q: 'Firmamızın araçları için anlaşma yapabilir miyiz?', a: 'Evet. Araç sayınızı ve lastik ölçülerini paylaşın, düzenli bakım ve faturalı çalışma için görüşelim.' },
    ],
  },
];

export type Area = {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: string[];
  focus: string[]; // services slugs most relevant here
};

// Her bölge sayfasının metni farklı olmalı; kopyala-yapıştır sayfalar Google'da değer kaybeder.
export const areas: Area[] = [
  {
    slug: 'tuzla-tersaneler',
    name: 'Tuzla Tersaneler',
    h1: 'Tuzla Tersane Bölgesi Lastikçi',
    metaTitle: 'Tersane Lastikçi | Tuzla Tersaneler Bölgesi',
    metaDescription: 'Tuzla tersaneler bölgesine yakın lastikçi. Servis araçları, kamyonet ve binek araçlar için lastik, jant ve yol yardım. 0216 446 15 60',
    intro: 'Tersaneler bölgesinde çalışan servis şoförleri, firma araçları ve vardiya çıkışı lastiğini yaptırmak isteyenler için yakın adresiz.',
    body: [
      'Tersane vardiyaları akşam geç bittiği için hafta içi 23:30\'a kadar açığız. İş çıkışı aracınızı getirip lastiğinizi değiştirebilirsiniz.',
      'Bölgede yoğun çalışan servis minibüsleri ve kamyonetlerin lastiklerini de yapıyoruz. Firma araçları için faturalı çalışıyoruz.',
    ],
    focus: ['ticari-arac-lastik', 'lastik-degisimi', 'yol-yardim'],
  },
  {
    slug: 'aydinli',
    name: 'Aydınlı',
    h1: 'Aydınlı Lastikçi',
    metaTitle: 'Aydınlı Lastikçi | Tersane Lastik',
    metaDescription: 'Aydınlı\'ya yakın lastikçi: lastik değişimi, jant kumlama, jant düzeltme ve yol yardım. 23:30\'a kadar açık. 0216 446 15 60',
    intro: 'Aydınlı ve çevresindeki sanayi bölgelerinden gelen müşterilerimiz için lastik, jant ve yol yardım hizmeti veriyoruz.',
    body: [
      'Aydınlı\'dan dükkanımıza araçla kısa sürede ulaşabilirsiniz. Yol tarifi için sayfanın altındaki harita bağlantısını kullanın.',
      'Aydınlı çevresinde lastiğiniz patladıysa arayın; konumunuza gelip yerinde tamir veya değişim yapalım.',
    ],
    focus: ['lastik-degisimi', 'yol-yardim', 'jant-duzeltme-cnc'],
  },
  {
    slug: 'orhanli',
    name: 'Orhanlı',
    h1: 'Orhanlı Lastikçi',
    metaTitle: 'Orhanlı Lastikçi | Tersane Lastik',
    metaDescription: 'Orhanlı\'ya yakın lastikçi: lastik satış ve değişim, Hankook lastik, jant kumlama ve boyama. 0216 446 15 60',
    intro: 'Orhanlı\'da oturan veya çalışanlar için lastik değişimi, Hankook lastik ve jant işleri.',
    body: [
      'Orhanlı\'dan gelirken önceden arayıp lastik ölçünüzü söylerseniz lastiğinizi hazır tutarız, dükkanda beklemezsiniz.',
      'Jant kumlama ve boyama için jantlarınızı bırakıp 1–2 iş günü içinde teslim alabilirsiniz.',
    ],
    focus: ['hankook-lastik', 'jant-kumlama-boyama', 'lastik-degisimi'],
  },
  {
    slug: 'icmeler',
    name: 'İçmeler',
    h1: 'İçmeler Lastikçi',
    metaTitle: 'İçmeler Lastikçi | Tersane Lastik',
    metaDescription: 'İçmeler\'e yakın lastikçi: lastik değişimi, balans, jant düzeltme ve yol yardım. Pazar günleri de açık. 0216 446 15 60',
    intro: 'İçmeler ve Tuzla merkez tarafından gelen müşterilerimiz için lastik ve jant hizmetleri.',
    body: [
      'Pazar günleri de 11:00–18:00 arası açığız; hafta içi vakit bulamıyorsanız hafta sonu gelebilirsiniz.',
      'Direksiyonda titreme varsa jantınız eğilmiş veya balansı bozulmuş olabilir. Getirin, kontrol edelim.',
    ],
    focus: ['lastik-degisimi', 'jant-duzeltme-cnc', 'yol-yardim'],
  },
];

export const generalFaq = [
  { q: 'Tuzla\'da gece açık lastikçi var mı?', a: 'Evet. Pazartesi\'den Cumartesi\'ye 23:30\'a kadar, Pazar günü 11:00–18:00 arası açığız.' },
  { q: 'Lastik değişimi ne kadar sürer?', a: 'Dört lastik için sökme, takma ve balans genelde 30–45 dakika sürer. Randevusuz gelebilirsiniz.' },
  { q: 'Jant kumlama ve boyama kaç günde biter?', a: 'Takım jantlar çoğunlukla 1–2 iş gününde teslim edilir. Rengi önceden birlikte seçiyoruz.' },
  { q: 'Eğilen jant düzeltilebilir mi?', a: 'Çoğu eğilme düzeltilebilir. Çatlak veya kırık jantlarda güvenlik için değişim öneriyoruz.' },
  { q: 'Lastik fiyatını telefonda öğrenebilir miyim?', a: 'Evet. Lastiğin yanağındaki ölçüyü (ör. 205/55 R16) söyleyin, stok ve fiyatı hemen verelim.' },
  { q: 'Lastik oteli hizmetiniz var mı?', a: 'Evet. Mevsimi geçen yaz veya kış lastiklerinizi saklıyor, sezon gelince takıyoruz.' },
  { q: 'Ticari araç ve kamyon lastiği yapıyor musunuz?', a: 'Evet. Servis minibüsü, kamyonet ve kamyon lastiklerinin satış ve değişimini yapıyoruz.' },
];
