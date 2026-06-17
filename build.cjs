// Static site builder — outputs to public/ (preview) AND site/ (deployable to Netlify/Vercel/GitHub Pages)
const fs = require('fs');
const path = require('path');

const PHONE_DISPLAY = '9494 4683';
const PHONE_TEL = '96594944683';
const WA = '96594944683';
const BRAND = 'الكويت لشراء المستعمل';
const TAGLINE = 'منصة كويتية موثوقة لشراء المكيفات والأثاث والأجهزة والألمنيوم والخردة';

const NAV = [
  ['index.html', 'الرئيسية'],
  ['services.html', 'الخدمات'],
  ['about.html', 'من نحن'],
  ['gallery.html', 'أعمالنا'],
  ['coverage.html', 'مناطق التغطية'],
  ['contact.html', 'اتصل بنا'],
];

const head = (title, desc, page, keywords = '') => `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#ffffff">
<title>${title} | ${BRAND} — الكويت</title>
<meta name="description" content="${desc}">
<meta name="keywords" content="${keywords}, شراء مكيفات مستعملة الكويت, شراء اثاث مستعمل الكويت, شراء اجهزة كهربائية مستعملة, شراء خردة الكويت, نقل عفش الكويت, ${BRAND}">
<meta name="author" content="${BRAND}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="geo.region" content="KW">
<meta name="geo.placename" content="Kuwait City">
<link rel="canonical" href="/${page}">
<meta property="og:title" content="${title} | ${BRAND}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:locale" content="ar_KW">
<meta property="og:site_name" content="${BRAND}">
<meta property="og:image" content="/assets/about-team.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23b8884a'/%3E%3Ctext x='32' y='44' text-anchor='middle' font-family='Tajawal,Arial' font-weight='900' font-size='40' fill='white'%3Eك%3C/text%3E%3C/svg%3E">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "${BRAND}",
  "telephone": "+${PHONE_TEL}",
  "image": "/assets/about-team.jpg",
  "priceRange": "$$",
  "areaServed": [{"@type":"Country","name":"Kuwait"},{"@type":"City","name":"Kuwait City"},{"@type":"City","name":"Hawalli"},{"@type":"City","name":"Al Farwaniyah"},{"@type":"City","name":"Al Ahmadi"},{"@type":"City","name":"Mubarak Al-Kabeer"},{"@type":"City","name":"Al Jahra"}],
  "address": {"@type":"PostalAddress","addressCountry":"KW","addressLocality":"Kuwait City"},
  "openingHoursSpecification": {"@type":"OpeningHoursSpecification","dayOfWeek":["Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"00:00","closes":"23:59"},
  "sameAs": ["https://wa.me/${WA}"]
}
</script>
</head>
<body>
<div class="scroll-progress"></div>
<header class="nav">
  <div class="container nav__inner">
    <a href="/" class="brand"><span class="brand__mark"><span>ك</span></span> الكويت <em style="color:var(--gold);font-style:normal">للمستعمل</em></a>
    <nav class="nav__links" aria-label="القائمة الرئيسية">
      ${NAV.map(([h, l]) => `<a href="/${h}"${h === page ? ' class="active" aria-current="page"' : ''}>${l}</a>`).join('\n      ')}
    </nav>
    <div class="nav__cta">
      <a href="tel:+${PHONE_TEL}" class="btn btn--gold btn--sm">📞 ${PHONE_DISPLAY}</a>
      <button class="nav__burger" aria-label="فتح القائمة"><span></span></button>
    </div>
  </div>
</header>
`;

const footer = `
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="brand" style="color:#fff;margin-bottom:16px"><span class="brand__mark"><span>ك</span></span> ${BRAND}</div>
        <p style="font-size:.9rem;color:#9a948a;max-width:32ch">${TAGLINE}. خدمة 24/7، أسعار يومية محدّثة، تقييم مجاني فوري، ودفع نقدي.</p>
        <p style="margin-top:14px"><a href="tel:+${PHONE_TEL}" style="color:var(--gold);font-weight:800;font-size:1.05rem">📞 +965 ${PHONE_DISPLAY}</a></p>
      </div>
      <div>
        <h4>خدماتنا</h4>
        <ul>
          <li><a href="/used-ac.html">شراء المكيفات المستعملة</a></li>
          <li><a href="/appliances.html">الأجهزة الكهربائية</a></li>
          <li><a href="/furniture.html">الأثاث المستعمل</a></li>
          <li><a href="/aluminum.html">الألمنيوم والأبواب</a></li>
          <li><a href="/kitchens.html">المطابخ المستعملة</a></li>
          <li><a href="/moving.html">نقل العفش</a></li>
          <li><a href="/scrap.html">شراء الخردة</a></li>
        </ul>
      </div>
      <div>
        <h4>الشركة</h4>
        <ul>
          <li><a href="/about.html">من نحن</a></li>
          <li><a href="/gallery.html">معرض الأعمال</a></li>
          <li><a href="/coverage.html">مناطق التغطية</a></li>
          <li><a href="/contact.html">اتصل بنا</a></li>
        </ul>
      </div>
      <div>
        <h4>تواصل مباشر</h4>
        <ul>
          <li><a href="tel:+${PHONE_TEL}">📞 +965 ${PHONE_DISPLAY}</a></li>
          <li><a href="https://wa.me/${WA}">💬 واتساب فوري</a></li>
          <li>🕐 خدمة 24 ساعة طوال الأسبوع</li>
          <li>📍 جميع محافظات الكويت الست</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© ${new Date().getFullYear()} ${BRAND}. جميع الحقوق محفوظة.</span>
      <span>صُنع بإتقان في الكويت 🇰🇼</span>
    </div>
  </div>
</footer>
<div class="mobile-bar">
  <a class="mb-call" href="tel:+${PHONE_TEL}">📞 اتصل · ${PHONE_DISPLAY}</a>
  <a class="mb-wa" href="https://wa.me/${WA}">💬 واتساب</a>
</div>
<script src="/assets/main.js" defer></script>
</body>
</html>`;

// =================== SERVICES META ===================
const SERVICES = [
  { slug: 'used-ac',    title: 'شراء المكيفات المستعملة', short: 'مكيفات', tag: 'الأكثر طلباً', img: 'svc-ac.jpg',         desc: 'سبليت، شباك، مركزي، صحراوي — تقييم فوري وفك وشراء بأعلى سعر.', cls: 't-hero' },
  { slug: 'furniture',  title: 'شراء الأثاث المستعمل',   short: 'أثاث',  tag: 'جديد',         img: 'service-furniture.jpg', desc: 'كنب، غرف نوم، طاولات، خزائن — نشتري أثاث منزلك بسعر مغرٍ.', cls: 't-tall' },
  { slug: 'appliances', title: 'الأجهزة الكهربائية',     short: 'أجهزة', tag: 'فوري',         img: 'svc-appliances.jpg', desc: 'ثلاجات، غسالات، مايكروويف، شاشات — جميع الماركات والحالات.', cls: 't-third' },
  { slug: 'aluminum',   title: 'الألمنيوم والأبواب',     short: 'ألمنيوم', tag: 'متخصصون',    img: 'service-doors.jpg',  desc: 'أبواب وشبابيك ألمنيوم — تقطيع وفك وشراء بسعر اليوم.', cls: 't-third' },
  { slug: 'kitchens',   title: 'المطابخ المستعملة',     short: 'مطابخ', tag: 'تركيب وفك',    img: 'svc-kitchen.jpg',    desc: 'مطابخ ألمنيوم وخشب وكوارتز — فك احترافي وشراء فوري.', cls: 't-half' },
  { slug: 'moving',     title: 'نقل العفش',              short: 'نقل عفش', tag: 'مع الفك والتركيب', img: 'svc-moving.jpg',  desc: 'نقل الأثاث مع الفنيين والتغليف الكامل لجميع المناطق.', cls: 't-half' },
  { slug: 'scrap',      title: 'شراء الخردة',            short: 'خردة',  tag: 'أسعار يومية',  img: 'svc-scrap.jpg',     desc: 'حديد، نحاس، ألمنيوم، كيبلات — وزن دقيق ودفع فوري.', cls: 't-wide' },
];

const tile = (s) => `
<a href="/${s.slug}.html" class="tile ${s.cls} reveal">
  <span class="tile__img" style="background-image:url('/assets/${s.img}')"></span>
  <span class="tile__overlay"></span>
  <span class="tile__tag">${s.tag}</span>
  <span class="tile__arrow" aria-hidden="true">←</span>
  <h3 class="tile__title">${s.title}</h3>
  <p class="tile__desc">${s.desc}</p>
</a>`;

// =================== INDEX ===================
const indexHTML = head('الرئيسية', `${TAGLINE} — شراء فوري بأعلى الأسعار في الكويت. اتصل +965 ${PHONE_DISPLAY}.`, 'index.html', 'شراء مكيفات مستعملة, شراء اثاث مستعمل, شراء اجهزة, خردة, نقل عفش, الكويت') + `
<main id="main">
<section class="hero">
  <div class="container">
    <div class="hero__head">
      <div class="reveal">
        <span class="eyebrow">منصة الكويت الأولى للمستعمل</span>
        <h1 class="hero__title">نشتري المستعمل<br>بسعر <em>يستحقه</em> فعلاً.</h1>
        <p class="hero__sub">من المكيف لباب الألمنيوم لطقم الأثاث — فريق كويتي محترف يصل خلال ساعة، تقييم مجاني تماماً، ودفع فوري نقداً في يدك.</p>
        <div class="hero__actions">
          <a href="tel:+${PHONE_TEL}" class="btn btn--primary">📞 اتصل الآن · ${PHONE_DISPLAY}</a>
          <a href="https://wa.me/${WA}" class="btn btn--ghost">💬 واتساب فوري</a>
        </div>
        <ul class="hero__chips">
          <li>✓ تقييم مجاني</li>
          <li>✓ دفع نقدي فوري</li>
          <li>✓ فك بدون ضرر</li>
          <li>✓ خدمة 24/7</li>
        </ul>
      </div>
      <div class="hero__meta reveal">
        <div><b data-count="12">0</b><span>سنة خبرة</span></div>
        <div><b data-count="8500">0</b><span>عميل سعيد</span></div>
        <div><b>24/7</b><span>خدمة على مدار الساعة</span></div>
      </div>
    </div>

    <div class="bento">
      ${SERVICES.map(tile).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head reveal">
      <div>
        <span class="eyebrow">لماذا نحن</span>
        <h2>الفرق بين خدمة عابرة<br>وشريك تثق فيه.</h2>
      </div>
      <p>نقدم تجربة كاملة — من المكالمة الأولى للتقييم الفوري وحتى الفك والنقل والدفع — بفريق مدرب وأسعار شفافة محدّثة يومياً حسب السوق.</p>
    </div>

    <div class="steps">
      <div class="step reveal"><div class="step__num">01</div><b>تواصل معنا</b><p>اتصل أو راسلنا على الواتساب مع وصف للأغراض وصور إن أمكن — رد فوري خلال دقائق.</p></div>
      <div class="step reveal"><div class="step__num">02</div><b>تقييم فوري</b><p>نرسل خبيراً متخصصاً في نفس اليوم لمعاينة مجانية بدون أي التزام وتسعير عادل وشفاف.</p></div>
      <div class="step reveal"><div class="step__num">03</div><b>فك ونقل</b><p>فنيون مدربون يفكون وينقلون بأمان كامل بأدوات احترافية ودون أي إزعاج أو ضرر.</p></div>
      <div class="step reveal"><div class="step__num">04</div><b>دفع نقدي</b><p>تستلم القيمة كاملة فوراً قبل مغادرتنا الموقع — نقداً أو تحويل بنكي حسب رغبتك.</p></div>
    </div>

    <div class="trust reveal">
      <div class="trust__item"><b data-count="8500">0</b><span>صفقة ناجحة</span></div>
      <div class="trust__item"><b data-count="98">0</b><span>% رضا العملاء</span></div>
      <div class="trust__item"><b data-count="60">0</b><span>دقيقة وقت الوصول</span></div>
      <div class="trust__item"><b data-count="12">0</b><span>سنة خبرة</span></div>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="about">
      <div class="about__media reveal">
        <img src="/assets/about-team.jpg" alt="فريق الكويت لشراء المستعمل أثناء العمل" loading="lazy" width="900" height="700">
        <div class="about__badge"><div><b>+12</b><span>سنة خبرة</span></div></div>
      </div>
      <div class="reveal">
        <span class="eyebrow">من نحن</span>
        <h2>محترفون كويتيون<br>تخصصنا الشغل النضيف.</h2>
        <p class="lead">بدأنا من قطعة سبليت واحدة — اليوم نخدم آلاف العائلات والشركات في جميع مناطق الكويت بنفس الالتزام: سعر عادل، وقت محدد، واحترام كامل لمنزلك.</p>
        <div class="about__points">
          <div class="about__point"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg><div><b>تقييم مجاني وفوري</b><span>زيارة ميدانية أو تقدير عبر الصور خلال دقائق.</span></div></div>
          <div class="about__point"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg><div><b>أعلى الأسعار في السوق</b><span>نقارن السعر مباشرة ونتفوق على أي عرض آخر.</span></div></div>
          <div class="about__point"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg><div><b>فك ونقل احترافي</b><span>فنيون مدربون بمعدات أصلية بدون أي ضرر.</span></div></div>
          <div class="about__point"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg><div><b>دفع فوري نقداً</b><span>تستلم مبلغك كاملاً قبل أن نغادر الموقع.</span></div></div>
        </div>
        <a href="/about.html" class="btn btn--ghost" style="margin-top:24px">تعرف علينا أكثر ←</a>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head reveal">
      <div><span class="eyebrow">آراء عملائنا</span><h2>ثقة تتراكم<br>صفقة بعد صفقة.</h2></div>
    </div>
    <div class="testimonials">
      <figure class="quote reveal"><blockquote>"بعت لهم 3 مكيفات سبليت بسعر ممتاز، الفريق وصل في الوقت المحدد بالضبط وفك بدون أي خربشة على الجدار. تجربة محترمة."</blockquote><figcaption><b>أبو محمد</b><span>السالمية</span></figcaption></figure>
      <figure class="quote reveal"><blockquote>"كنت محتاج أبيع أثاث الشقة كله بسرعة قبل السفر. اتصلت الصبح وفي الظهر كان كل شي مفكوك ومنقول والفلوس بإيدي. شكراً."</blockquote><figcaption><b>عبدالله الفهد</b><span>الجابرية</span></figcaption></figure>
      <figure class="quote reveal"><blockquote>"أفضل سعر حصلت عليه للأبواب الألمنيوم القديمة بعد ما سألت 4 محلات. صراحة وأمانة في التعامل."</blockquote><figcaption><b>أم خالد</b><span>بيان</span></figcaption></figure>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head reveal">
      <div><span class="eyebrow">أسئلة شائعة</span><h2>كل ما تريد معرفته<br>قبل البيع.</h2></div>
    </div>
    <div class="faq reveal">
      <details open><summary>كم يستغرق التقييم والشراء؟</summary><p>عادة نصل خلال 60 دقيقة داخل مدينة الكويت ونتم العملية كاملة (تقييم + فك + دفع) في نفس الزيارة دون الحاجة لمواعيد متكررة.</p></details>
      <details><summary>هل التقييم مجاني فعلاً؟</summary><p>نعم 100% — الزيارة والمعاينة والتسعير مجاناً دون أي التزام منك. لو السعر ما عجبك، ما في أي رسوم على الزيارة.</p></details>
      <details><summary>ما هي المناطق التي تغطونها؟</summary><p>جميع محافظات الكويت الست: العاصمة، حولي، الفروانية، مبارك الكبير، الأحمدي، والجهراء — بدون استثناء.</p></details>
      <details><summary>هل تشترون الأجهزة غير العاملة؟</summary><p>نعم نشتري المكيفات والأجهزة العاطلة أيضاً بسعر مناسب حسب الحالة وقطع الغيار القابلة للاستفادة.</p></details>
      <details><summary>كيف يتم الدفع؟</summary><p>نقداً فورياً عند إتمام الفك — أو تحويل بنكي فوري حسب رغبتك. لا انتظار ولا وعود.</p></details>
      <details><summary>هل أحتاج لإفراغ الموقع قبل وصولكم؟</summary><p>لا، فريقنا يتولى كل شيء بنفسه: الفصل، الفك، التغليف، والنقل — كل ما عليك هو فتح الباب.</p></details>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-banner reveal">
      <div><span class="eyebrow" style="color:var(--gold)">جاهز للبيع؟</span><h2>اتصل بنا الآن واحصل على<br>تقييم فوري ومجاني.</h2><p>فريقنا متاح 24 ساعة لخدمتك في أي منطقة بالكويت.</p></div>
      <div class="cta-banner__actions"><a href="tel:+${PHONE_TEL}" class="btn btn--gold">📞 ${PHONE_DISPLAY}</a><a href="https://wa.me/${WA}" class="btn btn--ghost" style="color:#fff;border-color:rgba(255,255,255,.2)">واتساب</a></div>
    </div>
  </div>
</section>
</main>
` + footer;

// =================== Service page detail content (unique per service) ===================
const SD = {
  'used-ac': {
    intro: 'نشتري جميع أنواع المكيفات المستعملة في الكويت بأعلى الأسعار: سبليت، شباك، مركزي، صحراوي، كاسيت، دكتد، وحتى المكيفات العاطلة لها قيمة عندنا. فريقنا الفني متخصص في فك المكيفات بطريقة احترافية تحفظ الجهاز وتحفظ جدران بيتك. نصلك خلال 60 دقيقة في أي منطقة بالكويت، نقيّم مجاناً، ندفع نقداً، ونأخذ الجهاز معنا في نفس الزيارة.',
    bullets: [['جميع الأنواع','سبليت، شباك، مركزي، صحراوي، كاسيت، دكتد، VRF'], ['كل الماركات','LG, Samsung, General, Daikin, Carrier, York, Gree, Midea'], ['عاطل أو شغال','نشتري الحالتين بأسعار مدروسة حسب الحالة'], ['فك بدون ضرر','أدوات احترافية ومفرغة غاز أصلية'], ['تنظيف موقع العمل','نترك المكان نظيف بعد الفك مباشرة'], ['دفع نقدي فوري','مبلغك في يدك قبل ما نخرج']],
    pricing: [['سبليت 1.5 طن جيد','25 – 60 د.ك'], ['سبليت 2 طن جيد','35 – 80 د.ك'], ['شباك 1.5 طن','15 – 40 د.ك'], ['مركزي للوحدة','حسب المعاينة'], ['مكيف عاطل','5 – 20 د.ك حسب القطع']],
    faq: [['هل تشترون المكيفات العاطلة؟','نعم، حتى لو الكمبروسر تالف نشتري الجهاز للاستفادة من الهيكل والمحركات وقطع الغيار.'], ['هل تفكون من أي ارتفاع؟','نعم، فريقنا مجهز بسلالم وحبال أمان للفك من البنايات العالية والفلل.'], ['كم سعر مكيف السبليت المستعمل؟','يعتمد على الماركة والسعة والحالة. اتصل بنا أو أرسل صورة واتساب لتقدير فوري.']],
    cta: 'هل لديك مكيف للبيع؟ اتصل الآن وسنرسل خبيراً مجاناً.',
  },
  'furniture': {
    intro: 'شراء الأثاث المستعمل بجميع أنواعه في الكويت — غرف نوم كاملة، صالات، كنب، طاولات طعام، مكاتب، خزائن، أثاث فنادق، أثاث مطاعم، أثاث مكتبي. سواء كنت تجدّد منزلك، تنتقل لشقة جديدة، أو مسافر — نخلصك من الأثاث بسعر يرضيك خلال زيارة واحدة فقط. تقييم بالصور عبر الواتساب لتوفير وقتك، أو زيارة ميدانية مجانية.',
    bullets: [['أثاث منزلي','غرف نوم، صالات، أطقم سفرة، خزائن، أرفف'], ['أثاث مكتبي','مكاتب، كراسي تنفيذية، خزائن ملفات، كاونتر'], ['أثاث فنادق ومطاعم','كميات كبيرة بأسعار جملة'], ['تقييم بالصور','ابعت صور واتساب واحصل على سعر مبدئي خلال 10 دقائق'], ['نقل احترافي','معدات تغليف ونقل دون خدوش أو كسر'], ['دفع فوري','نقداً بمجرد الاتفاق على السعر']],
    pricing: [['غرفة نوم كاملة 7 قطع','80 – 250 د.ك'], ['كنب 3+2+1','40 – 150 د.ك'], ['طاولة سفرة + كراسي','30 – 120 د.ك'], ['دولاب ملابس','20 – 80 د.ك'], ['طقم مكتب تنفيذي','60 – 200 د.ك']],
    faq: [['هل تشترون الأثاث المتضرر قليلاً؟','نعم، خدوش بسيطة أو علامات استخدام عادية لا تمنع الشراء — يتم تعديل السعر فقط.'], ['هل تأخذون شقة كاملة دفعة واحدة؟','نعم تخصصنا — نفرّغ الشقة بالكامل في زيارة واحدة وندفع كل المبلغ نقداً.'], ['هل النقل علي أنا؟','أبداً، فريقنا يفك وينقل كل شيء بمعداته الخاصة دون أي تكلفة عليك.']],
    cta: 'شقة كاملة أو قطع متفرقة؟ اتصل الآن لتقييم فوري.',
  },
  'appliances': {
    intro: 'نشتري جميع الأجهزة الكهربائية المستعملة في الكويت: ثلاجات، فريزرات، غسالات، مايكروويف، شاشات تلفزيون، أفران، بوتاجازات، غسالات صحون، مكانس، مجففات، براد ماء، وأجهزة المطبخ الصغيرة. نشتري الشغّال والعاطل — لكل جهاز قيمة عندنا حسب حالته وقطعه. تقييم سريع، شراء فوري، ودفع نقدي في نفس الزيارة.',
    bullets: [['كل الأجهزة','ثلاجات، غسالات، شاشات، أفران، مايكروويف، غسالات صحون'], ['كل الماركات','Samsung, LG, Bosch, Daewoo, Sharp, Toshiba, Hitachi'], ['عاطل أو شغال','نشتري الحالتين بأسعار عادلة وواضحة'], ['كميات كبيرة','نشتري معدات مطابخ المطاعم والفنادق كاملة'], ['نأتي إليك','بدون عناء النقل عليك — شاحناتنا الخاصة'], ['دفع كاش','فوراً بعد المعاينة وبدون مماطلة']],
    pricing: [['ثلاجة ساندويتش جيدة','30 – 100 د.ك'], ['ثلاجة فريزر علوي','20 – 80 د.ك'], ['غسالة فول أوتوماتيك','25 – 90 د.ك'], ['شاشة LED 50 إنش','30 – 100 د.ك'], ['مايكروويف','5 – 20 د.ك'], ['جهاز عاطل','5 – 25 د.ك']],
    faq: [['هل الشاشات المكسورة لها قيمة؟','اللوحة مكسورة لكن الجهاز ينفع للأجزاء الإلكترونية، ندفع سعر رمزي حسب الموديل.'], ['هل تشترون أجهزة المطاعم الكبيرة؟','نعم — أفران بيتزا، شوايات، ثلاجات عرض، ميز تحضير. اتصل لزيارة مجانية.'], ['متى يصل الفريق؟','عادةً خلال ساعة من اتصالك داخل مدينة الكويت، وخلال ساعتين للمناطق البعيدة.']],
    cta: 'لديك جهاز للبيع؟ ابعت صورة واتساب الآن وخذ سعرك فوراً.',
  },
  'aluminum': {
    intro: 'متخصصون في شراء الألمنيوم والأبواب والشبابيك المستعملة في الكويت. نوفر فك احترافي، تقطيع موقعي، وشراء بأعلى الأسعار وفق سعر الألمنيوم اليومي في السوق العالمي. سواء كنت تجدّد فيلتك، تهدم بناية، أو لديك ألمنيوم متراكم من مشاريع — نأتيك بشاحناتنا ومعداتنا ونخلصك من كل شيء في يوم واحد.',
    bullets: [['أبواب وشبابيك','جميع المقاسات والأشكال والألوان'], ['ألمنيوم خام','بروفايلات، صفائح، قطع متبقية من ورش'], ['فك متخصص','فريق مدرب على الألمنيوم تحديداً'], ['سعر يومي شفاف','حسب سعر السوق العالمي محدّث يومياً'], ['تقطيع موقعي','أدوات احترافية للقطع في الموقع'], ['وزن دقيق','ميزان معتمد أمام عينيك قبل الدفع']],
    pricing: [['ألمنيوم نظيف (للكيلو)','حسب سعر اليوم — اتصل للتأكيد'], ['أبواب ألمنيوم كاملة','حسب الوزن والمقاس'], ['شبابيك سيكوريت','وزن + قيمة الإطار'], ['تكييف ألمنيوم','سعر منفصل أعلى من الخام']],
    faq: [['هل سعر الألمنيوم ثابت؟','لا، يتغير يومياً حسب البورصة العالمية — نعطيك السعر الحالي وقت المعاينة.'], ['هل تفكون من البنايات الكبيرة؟','نعم لدينا فرق متخصصة في فك الواجهات والشبابيك من الأدوار العالية بأمان كامل.'], ['ما الفرق بين الأبيض والملون؟','الألمنيوم الأبيض النظيف أعلى سعراً، الملون يحتاج معالجة لذلك سعره أقل قليلاً.']],
    cta: 'كميات ألمنيوم للبيع؟ اتصل الآن للتسعير اليومي.',
  },
  'kitchens': {
    intro: 'شراء المطابخ المستعملة بكافة أنواعها في الكويت: ألمنيوم، خشب MDF، أكريليك، بولي لاك، وكوارتز. نفك المطبخ بطريقة دقيقة تحفظ الأبواب والأدراج والرخام قابلين لإعادة الاستخدام والبيع، مما يعني سعر أعلى لك. نشتري المطبخ شامل الأجهزة المدمجة (شفاط، فرن، حوض، تنور) كصفقة واحدة، أو منفصلة حسب رغبتك.',
    bullets: [['كل أنواع المطابخ','ألمنيوم، خشب، MDF، أكريليك، بولي لاك'], ['شامل الرخام والكوارتز','نأخذ السطح والحوض والشفاط معاً'], ['فك دقيق','دون كسر الأبواب أو الأدراج'], ['شامل الأجهزة المدمجة','فرن، شفاط، تنور، حوض، خلاط'], ['تقييم سريع','زيارة في نفس اليوم بدون موعد مسبق'], ['نقل ذاتي','شاحنة مجهزة لنقل المطبخ دفعة واحدة']],
    pricing: [['مطبخ ألمنيوم متوسط','100 – 350 د.ك'], ['مطبخ خشب فاخر','200 – 700 د.ك'], ['مطبخ أكريليك','250 – 800 د.ك'], ['كوارتز فقط (متر طولي)','5 – 15 د.ك']],
    faq: [['هل تشترون المطبخ شامل الرخام؟','نعم نأخذ كل شي ضمن صفقة واحدة بسعر شامل أفضل.'], ['كم وقت يأخذ فك المطبخ؟','من 3 إلى 6 ساعات حسب الحجم — يتم في نفس يوم المعاينة.'], ['هل تفكون مطبخ ما زال مركّب؟','نعم تخصصنا — نفصل المياه والكهرباء بأمان قبل البدء.']],
    cta: 'تغيّر مطبخك؟ اتصل لتقييم مجاني وفك في نفس اليوم.',
  },
  'moving': {
    intro: 'خدمة نقل العفش الاحترافية في الكويت — فك، تغليف، تحميل، نقل، تفريغ، تركيب — لجميع المناطق داخل وخارج العاصمة. سيارات مجهزة بمختلف الأحجام، فنيون نجارين متخصصين، ومواد تغليف عالية الجودة لضمان وصول كل قطعة في نفس حالتها الأصلية. نخدم المنازل، الشقق، الفلل، المكاتب، والشركات.',
    bullets: [['فك وتركيب','نجار وفني كهرباء متخصص'], ['تغليف كامل','بلاستيك فقاعي، كراتين مقوّاة، أغطية أثاث'], ['كل المناطق','داخل الكويت وخارجها لدول الخليج'], ['أسعار واضحة','بدون رسوم خفية — كل شي مكتوب في العقد'], ['أحجام شاحنات متعددة','من بكب صغير إلى شاحنة 10 طن'], ['تأمين الأثاث','نضمن أي ضرر يحصل أثناء النقل']],
    pricing: [['نقل شقة صغيرة','40 – 80 د.ك'], ['نقل شقة كبيرة','80 – 150 د.ك'], ['نقل فيلا','150 – 400 د.ك'], ['نقل مكتب','60 – 200 د.ك'], ['تغليف فقط','حسب الكمية']],
    faq: [['متى أحجز موعد النقل؟','يُفضل قبل 24 ساعة على الأقل لضمان توفر الفريق والشاحنة المناسبة.'], ['هل تنقلون لخارج الكويت؟','نعم — السعودية، البحرين، الإمارات بترتيب مسبق وأوراق رسمية.'], ['هل النجارة مشمولة بالسعر؟','نعم فك وتركيب جميع غرف النوم والمطابخ والخزائن مشمول.']],
    cta: 'موعد نقل؟ احجز الآن واضمن أفضل سعر وأفضل فريق.',
  },
  'scrap': {
    intro: 'شراء الخردة بجميع أنواعها في الكويت: حديد، نحاس أحمر، نحاس أصفر، ألمنيوم، رصاص، استانلس ستيل، كيبلات نحاس، بطاريات سيارات، رادياتيرات، ومحركات قديمة. نعمل بأسعار يومية محدّثة حسب البورصة العالمية، ميزان معتمد ودقيق أمامك، شاحناتنا تأتي إليك مجاناً، والدفع نقدي فوري دون أي مماطلة.',
    bullets: [['كل أنواع المعادن','حديد، نحاس، ألمنيوم، رصاص، استانلس'], ['كيبلات وبطاريات','نشتري كميات صغيرة وكبيرة'], ['وزن معتمد','ميزان دقيق ومعاير أمامك'], ['أسعار يومية','حسب أسعار البورصة العالمية محدّثة كل صباح'], ['نقل مجاني','شاحناتنا تأتيك في أي منطقة بدون رسوم'], ['دفع نقدي','فور انتهاء الوزن مباشرة']],
    pricing: [['حديد (للطن)','حسب السعر اليومي'], ['نحاس أحمر نظيف (كيلو)','يومياً'], ['نحاس أصفر (كيلو)','يومياً'], ['ألمنيوم (كيلو)','يومياً'], ['بطارية سيارة','3 – 15 د.ك']],
    faq: [['كيف أعرف السعر الحالي؟','اتصل صباحاً وسنخبرك بسعر اليوم لكل نوع — يتغير حسب البورصة.'], ['هل تشترون كميات صغيرة؟','نعم من 50 كيلو فأكثر، أقل من ذلك تأتي بها لمحلنا.'], ['هل الكيبلات تباع بالكيلو أم منزوعة؟','نأخذها بالحالتين — نزع العزل يعطي سعر أعلى للنحاس الصافي.']],
    cta: 'لديك خردة؟ احصل على سعر اليوم واتصل الآن.',
  },
};

const servicePage = (s, sd) => head(s.title, sd.intro.slice(0, 155), s.slug + '.html', `${s.short}, ${s.title} الكويت, شراء ${s.short} مستعمل, ${s.short} الكويت`) + `
<main id="main">
<section class="section" style="padding-top:48px">
  <div class="container">
    <div class="about">
      <div class="reveal">
        <span class="eyebrow">${s.tag}</span>
        <h1 style="margin:14px 0 18px">${s.title}<br><em style="color:var(--gold);font-style:normal">في الكويت</em></h1>
        <p class="lead">${sd.intro}</p>
        <div class="about__points" style="margin-top:24px">
          ${sd.bullets.map(b => `<div class="about__point"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg><div><b>${b[0]}</b><span>${b[1]}</span></div></div>`).join('')}
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:28px">
          <a href="tel:+${PHONE_TEL}" class="btn btn--primary">📞 اتصل · ${PHONE_DISPLAY}</a>
          <a href="https://wa.me/${WA}" class="btn btn--gold">💬 واتساب فوري</a>
        </div>
      </div>
      <div class="about__media reveal">
        <img src="/assets/${s.img}" alt="${s.title} في الكويت" loading="lazy" width="900" height="700">
      </div>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section__head reveal"><div><span class="eyebrow">جدول الأسعار التقريبية</span><h2>أسعارنا<br>شفافة وواضحة.</h2></div><p>الأسعار التالية تقريبية وتختلف حسب الحالة، الماركة، والكمية. التقييم الفعلي يتم عند المعاينة المجانية.</p></div>
    <div class="price-table reveal">
      <table>
        <thead><tr><th>الصنف</th><th>السعر التقريبي</th></tr></thead>
        <tbody>
          ${sd.pricing.map(p => `<tr><td>${p[0]}</td><td><b>${p[1]}</b></td></tr>`).join('')}
        </tbody>
      </table>
      <p class="price-note">* الأسعار قابلة للزيادة حسب الحالة الممتازة وقد تقل في حال التلف الشديد. اتصل لتقييم دقيق مجاناً.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section__head reveal"><div><span class="eyebrow">خطوات بسيطة</span><h2>كيف نخدمك<br>خطوة بخطوة.</h2></div></div>
    <div class="steps">
      <div class="step reveal"><div class="step__num">01</div><b>اتصل أو راسلنا</b><p>أرسل وصف وصور للأغراض على الواتساب — رد فوري.</p></div>
      <div class="step reveal"><div class="step__num">02</div><b>زيارة مجانية</b><p>نصل إليك في موعد يناسبك خلال ساعة.</p></div>
      <div class="step reveal"><div class="step__num">03</div><b>تسعير شفاف</b><p>سعر نهائي عادل بدون مفاوضة مرهقة.</p></div>
      <div class="step reveal"><div class="step__num">04</div><b>فك ودفع</b><p>نفك بعناية ونسلمك المبلغ كاملاً نقداً.</p></div>
    </div>
  </div>
</section>

<section class="section section--soft">
  <div class="container">
    <div class="section__head reveal"><div><span class="eyebrow">أسئلة شائعة</span><h2>عن ${s.title}.</h2></div></div>
    <div class="faq reveal">
      ${sd.faq.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${f[0]}</summary><p>${f[1]}</p></details>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="cta-banner reveal">
      <div><h2>${sd.cta}</h2><p>خدمة 24/7 في جميع مناطق الكويت — تقييم مجاني ودفع فوري.</p></div>
      <div class="cta-banner__actions"><a href="tel:+${PHONE_TEL}" class="btn btn--gold">📞 ${PHONE_DISPLAY}</a><a href="https://wa.me/${WA}" class="btn btn--ghost" style="color:#fff;border-color:rgba(255,255,255,.2)">واتساب</a></div>
    </div>
  </div>
</section>
</main>
` + footer;

// =================== ABOUT ===================
const aboutHTML = head('من نحن', 'تعرف على فريق الكويت لشراء المكيفات والأثاث والأجهزة المستعملة — 12 سنة خبرة و8500+ عميل في جميع مناطق الكويت.', 'about.html', 'من نحن, شركة شراء مستعمل الكويت') + `
<main id="main">
<section class="section">
  <div class="container">
    <div class="about">
      <div class="reveal">
        <span class="eyebrow">من نحن</span>
        <h1 style="margin:14px 0 18px">قصة بدأت بثقة<br>وكبرت بإتقان.</h1>
        <p class="lead">بدأنا قبل 12 سنة بفريق صغير وحلم واضح: نوفر للناس طريقة محترمة وعادلة لبيع أغراضهم المستعملة بدون مماطلة ولا أسعار خيالية. اليوم، نخدم آلاف العائلات والشركات والمطاعم والفنادق في جميع مناطق الكويت بنفس المبدأ الذي بدأنا به: شفافية، سرعة، واحترام كامل لكل عميل.</p>
        <p>نحن لسنا مجرد محل خردة — نحن منصة متكاملة تجمع بين الخبرة الفنية في الفك والتقييم، وبين الالتزام التجاري بأعلى معايير الأمانة والاحترافية. كل موظف في فريقنا مدرب، كل سيارة مجهزة، وكل سعر مدروس حسب السوق اليومي.</p>
        <div class="about__points" style="margin-top:24px">
          <div class="about__point"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg><div><b>رؤيتنا</b><span>أن نكون الخيار الأول لكل عميل يبحث عن بيع موثوق في الكويت.</span></div></div>
          <div class="about__point"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg><div><b>مهمتنا</b><span>تقديم تجربة بيع راقية وشفافة بأعلى الأسعار وأسرع وقت.</span></div></div>
          <div class="about__point"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg><div><b>قيمنا</b><span>صدق في التسعير، احترام للمنزل، والتزام بالموعد المحدد.</span></div></div>
        </div>
      </div>
      <div class="about__media reveal">
        <img src="/assets/about-team.jpg" alt="فريق العمل في الكويت لشراء المستعمل" loading="lazy" width="900" height="700">
        <div class="about__badge"><div><b>+8500</b><span>عميل سعيد</span></div></div>
      </div>
    </div>

    <div class="trust reveal" style="margin-top:64px">
      <div class="trust__item"><b data-count="12">0</b><span>سنة خبرة</span></div>
      <div class="trust__item"><b data-count="8500">0</b><span>عميل</span></div>
      <div class="trust__item"><b data-count="6">0</b><span>محافظات نغطيها</span></div>
      <div class="trust__item"><b data-count="98">0</b><span>% رضا</span></div>
    </div>

    <div class="section__head reveal" style="margin-top:80px"><div><span class="eyebrow">القيم التي تحركنا</span><h2>أربع ركائز<br>لا نتنازل عنها أبداً.</h2></div></div>
    <div class="steps">
      <div class="step reveal"><div class="step__num">01</div><b>الشفافية</b><p>سعر واضح ومبرر، بدون أرقام عشوائية ولا تكتيكات مفاوضة.</p></div>
      <div class="step reveal"><div class="step__num">02</div><b>الالتزام</b><p>الموعد الذي نعطيه هو الموعد الذي نصل فيه — دقيقة بدقيقة.</p></div>
      <div class="step reveal"><div class="step__num">03</div><b>الاحترام</b><p>منزلك مساحتك الخاصة — ندخلها بأقدام نظيفة ونخرج تاركينها كما هي.</p></div>
      <div class="step reveal"><div class="step__num">04</div><b>الاحتراف</b><p>أدوات أصلية، فنيون مدربون، وتأمين على كل عملية فك ونقل.</p></div>
    </div>
  </div>
</section>
</main>
` + footer;

// =================== SERVICES PAGE ===================
const servicesHTML = head('الخدمات', 'جميع خدماتنا: شراء المكيفات، الأثاث، الأجهزة، الألمنيوم، المطابخ، الخردة، ونقل العفش في الكويت.', 'services.html', 'خدمات شراء مستعمل الكويت') + `
<main id="main">
<section class="hero">
  <div class="container">
    <div class="reveal" style="text-align:center;margin-bottom:36px">
      <span class="eyebrow">خدماتنا</span>
      <h1 style="margin:14px 0 14px">كل ما نقدمه<br>تحت سقف واحد.</h1>
      <p class="lead" style="margin:0 auto">سبع خدمات متخصصة. فريق واحد محترف. وسعر دائماً يستحق.</p>
    </div>
    <div class="bento">${SERVICES.map(tile).join('')}</div>
  </div>
</section>
</main>
` + footer;

// =================== GALLERY ===================
const galleryHTML = head('أعمالنا', 'صور من أعمالنا الميدانية في الكويت — شراء، فك، تقييم، ونقل.', 'gallery.html', 'معرض اعمال شراء مستعمل الكويت') + `
<main id="main">
<section class="section">
  <div class="container">
    <div class="section__head reveal"><div><span class="eyebrow">معرض الأعمال</span><h2>أعمالنا تتحدث<br>قبل كلامنا.</h2></div></div>
    <div class="gallery">
      ${['svc-ac','svc-appliances','service-furniture','service-doors','svc-kitchen','svc-moving','svc-scrap','service-ac','about-team'].map(i => `<a href="/assets/${i}.jpg" class="reveal"><img src="/assets/${i}.jpg" alt="عمل ميداني" loading="lazy" width="600" height="600"></a>`).join('')}
    </div>
  </div>
</section>
</main>
` + footer;

// =================== COVERAGE ===================
const areas = ['السالمية','حولي','الجابرية','بيان','مشرف','سلوى','الرميثية','الزهراء','الفنطاس','المهبولة','أبو حليفة','الفحيحيل','مبارك الكبير','صباح السالم','الفروانية','الرقعي','جليب الشيوخ','العاصمة','الشعب','الدسمة','الجهراء','الأحمدي','الوفرة','صباح الأحمد','الشامية','كيفان','الفيحاء','القادسية','اليرموك','العديلية','الخالدية','الروضة','السرة','الشهداء'];
const coverageHTML = head('مناطق التغطية', 'نخدم جميع مناطق الكويت — العاصمة، حولي، الفروانية، مبارك الكبير، الأحمدي، الجهراء.', 'coverage.html', 'مناطق تغطية الكويت, خدمة جميع مناطق الكويت') + `
<main id="main">
<section class="section">
  <div class="container">
    <div class="reveal" style="text-align:center;margin-bottom:32px">
      <span class="eyebrow">تغطية شاملة</span>
      <h1 style="margin:14px 0 14px">نصل إليك<br>أينما كنت في الكويت.</h1>
      <p class="lead" style="margin:0 auto">جميع المحافظات الست، خدمة فورية 24/7، وزمن وصول 60 دقيقة.</p>
    </div>
    <div class="areas reveal">${areas.map(a => `<span>${a}</span>`).join('')}</div>
    <div class="cta-banner reveal" style="margin-top:48px">
      <div><h2>منطقتك مش موجودة؟</h2><p>اتصل بنا — نخدم كل الكويت بدون استثناء.</p></div>
      <div class="cta-banner__actions"><a href="tel:+${PHONE_TEL}" class="btn btn--gold">📞 ${PHONE_DISPLAY}</a></div>
    </div>
  </div>
</section>
</main>
` + footer;

// =================== CONTACT ===================
const contactHTML = head('اتصل بنا', `تواصل مع فريق الكويت لشراء المستعمل — اتصل ${PHONE_DISPLAY} أو راسلنا على الواتساب 24 ساعة.`, 'contact.html', 'اتصل بنا, تواصل الكويت') + `
<main id="main">
<section class="section">
  <div class="container">
    <div class="reveal" style="text-align:center;margin-bottom:48px">
      <span class="eyebrow">تواصل معنا</span>
      <h1 style="margin:14px 0 14px">جاهزون لخدمتك<br>على مدار الساعة.</h1>
    </div>

    <div class="contact">
      <div class="contact__info reveal">
        <div class="contact__row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0122 16.92z"/></svg><div><b>اتصل بنا مباشرة</b><a href="tel:+${PHONE_TEL}" style="color:var(--gold);font-weight:800;font-size:1.15rem">+965 ${PHONE_DISPLAY}</a><br><span>24 ساعة طوال أيام الأسبوع</span></div></div>
        <div class="contact__row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg><div><b>واتساب فوري</b><a href="https://wa.me/${WA}" style="color:var(--gold);font-weight:800">راسلنا الآن</a><br><span>رد خلال دقائق معدودة</span></div></div>
        <div class="contact__row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg><div><b>مناطق العمل</b><span>جميع محافظات الكويت الست بدون استثناء</span></div></div>
        <div class="contact__row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><div><b>أوقات العمل</b><span>24 ساعة / 7 أيام في الأسبوع</span></div></div>
      </div>

      <form class="form reveal" data-wa>
        <h3 style="margin-bottom:6px">احصل على تقييم مجاني</h3>
        <p style="color:var(--mute);font-size:.9rem;margin-bottom:8px">املأ النموذج وسنرد عليك خلال دقائق</p>
        <div><label>الاسم</label><input name="name" required placeholder="اسمك الكريم"></div>
        <div><label>رقم الهاتف</label><input name="phone" required type="tel" placeholder="965xxxxxxxx"></div>
        <div><label>الخدمة المطلوبة</label><select name="service" required>
          <option value="">اختر الخدمة</option>
          ${SERVICES.map(s => `<option>${s.title}</option>`).join('')}
        </select></div>
        <div><label>المنطقة</label><input name="area" placeholder="مثال: السالمية"></div>
        <div><label>تفاصيل إضافية</label><textarea name="note" rows="3" placeholder="اوصف الأغراض أو أي ملاحظات"></textarea></div>
        <button type="submit" class="btn btn--gold" style="margin-top:6px">إرسال عبر واتساب 💬</button>
      </form>
    </div>
  </div>
</section>
</main>
` + footer;

// =================== WRITE ALL TO BOTH public/ AND site/ ===================
const OUT_DIRS = ['public', 'site'];

OUT_DIRS.forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const assetsDst = path.join(dir, 'assets');
  if (!fs.existsSync(assetsDst)) fs.mkdirSync(assetsDst, { recursive: true });
});

const writeAll = (file, html) => OUT_DIRS.forEach(d => fs.writeFileSync(path.join(d, file), html));

writeAll('index.html', indexHTML);
writeAll('about.html', aboutHTML);
writeAll('services.html', servicesHTML);
writeAll('gallery.html', galleryHTML);
writeAll('coverage.html', coverageHTML);
writeAll('contact.html', contactHTML);

SERVICES.forEach(s => {
  const sd = SD[s.slug];
  writeAll(`${s.slug}.html`, servicePage(s, sd));
});

// Copy assets from public/assets to site/assets
const srcAssets = path.join('public', 'assets');
if (fs.existsSync(srcAssets)) {
  fs.readdirSync(srcAssets).forEach(f => {
    fs.copyFileSync(path.join(srcAssets, f), path.join('site', 'assets', f));
  });
}

// robots.txt + sitemap.xml + deploy configs in site/
const pages = ['', 'about.html', 'services.html', 'gallery.html', 'coverage.html', 'contact.html', ...SERVICES.map(s => `${s.slug}.html`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url><loc>https://www.example.com/${p}</loc><changefreq>weekly</changefreq><priority>${p === '' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>`;

const robots = `User-agent: *
Allow: /

Sitemap: /sitemap.xml`;

OUT_DIRS.forEach(d => {
  fs.writeFileSync(path.join(d, 'sitemap.xml'), sitemap);
  fs.writeFileSync(path.join(d, 'robots.txt'), robots);
});

// Deploy configs ONLY in site/
fs.writeFileSync('site/netlify.toml', `[build]
  publish = "."
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
`);

fs.writeFileSync('site/vercel.json', JSON.stringify({
  cleanUrls: true,
  headers: [{ source: "/assets/(.*)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }]
}, null, 2));

fs.writeFileSync('site/README.md', `# ${BRAND}

موقع ثابت بسيط — HTML + CSS + JavaScript خالص. بدون أي build خطوة.

## النشر السريع

### Netlify
ارفع مجلد \`site/\` كاملاً عبر Drag & Drop على [app.netlify.com/drop](https://app.netlify.com/drop) — جاهز فوراً.

### Vercel
\`\`\`bash
cd site && npx vercel --prod
\`\`\`

### GitHub Pages
ارفع محتويات المجلد على فرع \`gh-pages\` أو فعّل GitHub Pages من إعدادات المستودع.

### استضافة عادية (cPanel / FTP)
ارفع جميع الملفات إلى مجلد \`public_html\` مباشرة.

## الهيكل
- \`index.html\` — الرئيسية
- \`assets/\` — صور، CSS، JS
- \`sitemap.xml\`, \`robots.txt\` — SEO
- \`netlify.toml\`, \`vercel.json\` — إعدادات النشر

## الاتصال
+965 ${PHONE_DISPLAY}
`);

console.log('✓ Built', 6 + SERVICES.length, 'pages → public/ + site/');
