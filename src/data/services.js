/**
 * Five outcomes, not a list of tactics. Each one is a component of the
 * Visibility → Trust → Retention → Growth framework.
 */

export const services = [
  {
    slug: 'digital-presence',
    stage: 'visibility',
    icon: 'presence',
    title: { fa: 'حضور دیجیتال', en: 'Digital Presence' },
    promise: {
      fa: 'سایتی که در ۵ ثانیه معلوم می‌کند شما چه کار می‌کنید و چرا باید به شما زنگ بزنند.',
      en: 'A site that makes it obvious in five seconds what you do and why to call you.',
    },
    metaTitle: {
      fa: 'طراحی سایت و حضور دیجیتال برای کسب‌وکار ایرانی',
      en: 'Website design & digital presence for Iranian businesses',
    },
    metaDescription: {
      fa: 'طراحی سایت سریع و موبایل‌محور، لندینگ فروش و هویت دیجیتال — ساخته‌شده برای تبدیل بازدیدکننده به تماس و پیام.',
      en: 'Fast, mobile-first websites and landing pages built to turn visitors into calls and messages.',
    },
    problem: {
      fa: [
        'سایت دارید ولی کسی از آن تماس نمی‌گیرد.',
        'روی موبایل کند باز می‌شود و مشتری قبل از دیدن خدمات می‌رود.',
        'مشتری نمی‌فهمد دقیقاً چه می‌فروشید و قیمت در چه محدوده‌ای است.',
      ],
      en: [
        'You have a website but nobody calls from it.',
        'It loads slowly on mobile and people leave before seeing what you offer.',
        'Visitors cannot tell what exactly you sell or what it roughly costs.',
      ],
    },
    approach: {
      fa: [
        'اول مسیر مشتری را می‌نویسیم: از جستجو تا پیام. بعد صفحه را می‌سازیم.',
        'هر صفحه یک هدف دارد و یک دکمه‌ی اصلی؛ بقیه چیزها حذف می‌شوند.',
        'سرعت روی اینترنت موبایل ایران معیار ماست، نه روی فیبر دفتر.',
        'محتوا به زبان مشتری نوشته می‌شود، نه به زبان صنعت.',
      ],
      en: [
        'We map the customer journey first — from search to message — then build the page.',
        'Every page gets one goal and one primary button; the rest is removed.',
        'Speed is measured on Iranian mobile networks, not on office fibre.',
        'Copy is written in the customer’s language, not in industry jargon.',
      ],
    },
    deliverables: {
      fa: [
        'سایت یا لندینگ واکنش‌گرا با پشتیبانی کامل راست‌به‌چپ',
        'نسخه‌ی انگلیسی و ساختار دو زبانه در صورت نیاز',
        'متن فروش برای صفحه‌ی اصلی و صفحات خدمات',
        'فرم تماس + واتساپ + تماس تلفنی روی هر صفحه',
        'اتصال به گوگل آنالیتیکس و رویداد تبدیل روی هر دکمه',
        'آموزش تیم شما برای به‌روزرسانی محتوا',
      ],
      en: [
        'Responsive site or landing page with full RTL support',
        'English version and a bilingual structure when needed',
        'Sales copy for the homepage and service pages',
        'Contact form + WhatsApp + click-to-call on every page',
        'Analytics wiring with a conversion event on every button',
        'Training so your team can update content',
      ],
    },
    audience: {
      fa: [
        'کسب‌وکارهایی که سایتشان بیش از سه سال قدیمی است',
        'کلینیک‌ها و خدماتی که مشتری قبل از تماس، آن‌ها را جستجو می‌کند',
        'تیم‌هایی که می‌خواهند یک لندینگ مشخص برای یک کمپین داشته باشند',
      ],
      en: [
        'Businesses whose site is more than three years old',
        'Clinics and services customers research before calling',
        'Teams that need one focused landing page for a campaign',
      ],
    },
    outcome: {
      fa: 'نتیجه: بازدیدکننده در همان صفحه‌ی اول می‌فهمد باید چه کاری بکند — و می‌کند.',
      en: 'Outcome: visitors understand the next step on the first screen — and take it.',
    },
    related: ['search-visibility', 'reputation-trust'],
  },

  {
    slug: 'search-visibility',
    stage: 'visibility',
    icon: 'search',
    title: { fa: 'سئو و دیده‌شدن', en: 'Search & Visibility' },
    promise: {
      fa: 'وقتی مشتری دنبال خدمات شما می‌گردد، اسم شما بالا باشد — در گوگل و روی نقشه.',
      en: 'When customers search for your service, you are the name they find — in Google and on Maps.',
    },
    metaTitle: {
      fa: 'خدمات سئو و سئوی محلی برای کسب‌وکارهای ایرانی',
      en: 'SEO and local search visibility for Iranian businesses',
    },
    metaDescription: {
      fa: 'سئوی فنی، محتوای هدفمند و سئوی محلی روی گوگل و نقشه — برای اینکه در لحظه‌ی نیاز مشتری دیده شوید.',
      en: 'Technical SEO, intent-led content and local search so you show up at the moment of need.',
    },
    problem: {
      fa: [
        'رقیب کوچک‌تر از شما بالاتر از شما در گوگل است.',
        'روی نقشه پیدا نمی‌شوید یا اطلاعاتتان غلط است.',
        'محتوا تولید می‌کنید ولی هیچ‌کدام به تماس ختم نمی‌شود.',
      ],
      en: [
        'A smaller competitor ranks above you in Google.',
        'You are missing from Maps, or your listing is wrong.',
        'You publish content, but none of it turns into a call.',
      ],
    },
    approach: {
      fa: [
        'با کلمات کلیدی «قصد خرید» شروع می‌کنیم، نه کلماتی که فقط بازدید می‌آورند.',
        'مشکلات فنی که مانع ایندکس شدن می‌شوند را اول حل می‌کنیم.',
        'برای هر خدمت یک صفحه‌ی مستقل و قوی می‌سازیم و به هم لینک می‌دهیم.',
        'سئوی محلی: نقشه، آدرس، ساعت کاری و نظرات — همان جایی که تماس محلی ساخته می‌شود.',
      ],
      en: [
        'We start from buying-intent keywords, not traffic-only keywords.',
        'Technical blockers that stop indexing get fixed first.',
        'Each service gets one strong page, properly interlinked.',
        'Local SEO: Maps, address, hours and reviews — where local calls are won.',
      ],
    },
    deliverables: {
      fa: [
        'تحقیق کلمات کلیدی بر اساس قصد خرید',
        'ممیزی فنی: سرعت، ایندکس، ساختار آدرس‌ها، اسکیما',
        'بهینه‌سازی عنوان، توضیحات و ساختار داخلی هر صفحه',
        'تقویم محتوای سه‌ماهه با اولویت‌بندی',
        'ثبت و بهینه‌سازی نقشه و پروفایل کسب‌وکار',
        'گزارش ماهانه‌ی رتبه، ترافیک و لید',
      ],
      en: [
        'Intent-based keyword research',
        'Technical audit: speed, indexing, URL structure, schema',
        'Title, meta and internal-structure optimisation per page',
        'A prioritised quarterly content calendar',
        'Map and business-profile setup and optimisation',
        'Monthly reporting on rankings, traffic and leads',
      ],
    },
    audience: {
      fa: [
        'خدمات محلی: کلینیک، آموزشگاه، تعمیرات، مشاور املاک',
        'فروشگاه‌های آنلاین با دسته‌بندی‌های رقابتی',
        'شرکت‌های B2B با چرخه‌ی فروش بلند',
      ],
      en: [
        'Local services: clinics, training centres, repairs, realtors',
        'Online stores in competitive categories',
        'B2B companies with long sales cycles',
      ],
    },
    outcome: {
      fa: 'نتیجه: ترافیکی که دنبال خرید است، نه فقط عددی در داشبورد.',
      en: 'Outcome: traffic with buying intent, not a number on a dashboard.',
    },
    related: ['digital-presence', 'social-content'],
  },

  {
    slug: 'social-content',
    stage: 'trust',
    icon: 'content',
    title: { fa: 'شبکه‌های اجتماعی و محتوا', en: 'Social & Content' },
    promise: {
      fa: 'محتوایی که مشتری را قانع می‌کند — نه پستی که فقط کارهای ما را نشان می‌دهد.',
      en: 'Content that convinces a customer — not posts that show off our process.',
    },
    metaTitle: {
      fa: 'تولید محتوا و مدیریت شبکه‌های اجتماعی برای فروش',
      en: 'Content and social media built for sales',
    },
    metaDescription: {
      fa: 'استراتژی محتوا، تقویم انتشار و مدیریت شبکه‌های اجتماعی با تمرکز روی لید و فروش، نه فقط لایک.',
      en: 'Content strategy, a publishing calendar and social management focused on leads, not likes.',
    },
    problem: {
      fa: [
        'هر روز پست می‌گذارید ولی فروش تکان نمی‌خورد.',
        'نمی‌دانید درباره‌ی چه چیزی حرف بزنید که برای مشتری مهم باشد.',
        'پاسخ‌گویی به دایرکت و کامنت وقت تیم فروش را می‌گیرد.',
      ],
      en: [
        'You post every day and sales do not move.',
        'You do not know which topics actually matter to your customer.',
        'Answering DMs and comments eats your sales team’s day.',
      ],
    },
    approach: {
      fa: [
        'از سوال‌های واقعی مشتری شروع می‌کنیم؛ همان چیزهایی که در چت پرسیده می‌شود.',
        'هر محتوا یک کار مشخص دارد: جذب، توضیح، اعتمادسازی یا بستن فروش.',
        'یک تقویم ساده و قابل اجرا می‌سازیم که تیم شما بتواند ادامه بدهد.',
        'گفتگوهای شبکه‌های اجتماعی به CRM وصل می‌شوند تا لید گم نشود.',
      ],
      en: [
        'We start from the questions customers actually ask in chat.',
        'Every piece has one job: attract, explain, build trust, or close.',
        'We build a simple calendar your team can keep running.',
        'Social conversations feed the CRM so leads are not lost.',
      ],
    },
    deliverables: {
      fa: [
        'استراتژی محتوا بر اساس سوال‌های واقعی مشتری',
        'تقویم محتوای ماهانه با موضوع و هدف هر پست',
        'تولید محتوای متنی و راهنمای تصویری',
        'مقاله‌های سئو شده که به صفحات خدمات لینک می‌دهند',
        'سناریوی پاسخ به دایرکت و کامنت',
        'گزارش ماهانه بر اساس لید، نه لایک',
      ],
      en: [
        'Content strategy based on real customer questions',
        'A monthly calendar with a topic and a goal per post',
        'Written content plus visual direction',
        'SEO articles that link into your service pages',
        'Reply scripts for DMs and comments',
        'Monthly reporting on leads, not likes',
      ],
    },
    audience: {
      fa: [
        'برندهایی که مخاطب دارند ولی فروش ندارند',
        'کسب‌وکارهای خدماتی که باید تخصصشان را ثابت کنند',
        'تیم‌های کوچکی که به تقویم و سناریوی آماده نیاز دارند',
      ],
      en: [
        'Brands with an audience but no sales',
        'Service businesses that must prove expertise',
        'Small teams that need a ready-made calendar and scripts',
      ],
    },
    outcome: {
      fa: 'نتیجه: محتوایی که سوال مشتری را جواب می‌دهد و او را به گفتگو می‌آورد.',
      en: 'Outcome: content that answers the question and starts the conversation.',
    },
    related: ['search-visibility', 'reputation-trust'],
  },

  {
    slug: 'reputation-trust',
    stage: 'trust',
    icon: 'trust',
    title: { fa: 'اعتبار و اعتماد', en: 'Reputation & Trust' },
    promise: {
      fa: 'قبل از اینکه مشتری زنگ بزند، جواب سوال «به این‌ها می‌شود اعتماد کرد؟» را دیده باشد.',
      en: 'Before a customer calls, they already have an answer to “can I trust them?”',
    },
    metaTitle: {
      fa: 'مدیریت اعتبار، نظرات مشتریان و نشان اعتماد',
      en: 'Reputation management, reviews and trust signals',
    },
    metaDescription: {
      fa: 'جمع‌آوری نظرات واقعی، مدیریت پاسخ به بازخورد منفی و نمایش نشانه‌های اعتماد مثل اینماد و نمونه‌کار.',
      en: 'Collect real reviews, handle negative feedback and display trust signals like Enamad and case studies.',
    },
    problem: {
      fa: [
        'مشتری قیمت شما را می‌پسندد ولی مطمئن نیست کار را درست تحویل می‌دهید.',
        'چند نظر منفی قدیمی هنوز اولین چیزی است که دیده می‌شود.',
        'نمونه‌کار دارید ولی هیچ‌جا به شکل قابل‌فهم نشان داده نشده.',
      ],
      en: [
        'Customers like your price but are not sure you deliver.',
        'A few old negative reviews are still the first thing people see.',
        'You have results, but they are not shown anywhere understandable.',
      ],
    },
    approach: {
      fa: [
        'یک مسیر ساده می‌سازیم که مشتری راضی، بدون اصرار، نظر بگذارد.',
        'برای بازخورد منفی سناریوی پاسخ محترمانه و سریع می‌نویسیم.',
        'نمونه‌کارها را به قالب «مشکل ← کاری که کردیم ← نتیجه‌ی قابل اندازه‌گیری» تبدیل می‌کنیم.',
        'نشانه‌های اعتماد (اینماد، گارانتی، شفافیت قیمت) را جایی می‌گذاریم که تصمیم گرفته می‌شود.',
      ],
      en: [
        'We build an easy path for happy customers to leave a review.',
        'We script fast, respectful responses to negative feedback.',
        'We reshape your work into “problem → what we did → measurable result”.',
        'Trust signals (Enamad, guarantees, clear pricing) go where the decision happens.',
      ],
    },
    deliverables: {
      fa: [
        'سیستم درخواست نظر بعد از خرید یا مراجعه',
        'سناریوی پاسخ به نظرات منفی و مثبت',
        'نوشتن و طراحی سه نمونه‌کار با عدد',
        'بخش نظرات و نشانه‌های اعتماد روی سایت',
        'راهنمای اینماد و صفحات قوانین و حریم خصوصی',
        'پایش ماهانه‌ی نظرات در نقشه و شبکه‌های اجتماعی',
      ],
      en: [
        'A post-purchase review request system',
        'Response scripts for negative and positive reviews',
        'Three written and designed case studies with numbers',
        'A reviews and trust section on your site',
        'Enamad guidance plus terms and privacy pages',
        'Monthly review monitoring on Maps and social',
      ],
    },
    audience: {
      fa: [
        'کلینیک‌ها و خدماتی که تصمیم مشتری با ریسک همراه است',
        'فروشگاه‌های آنلاین که پرداخت آنلاین دارند',
        'کسب‌وکارهایی که تازه وارد بازار شده‌اند',
      ],
      en: [
        'Clinics and services where the decision carries risk',
        'Online stores taking online payments',
        'Businesses that are new to the market',
      ],
    },
    outcome: {
      fa: 'نتیجه: نرخ تبدیل بالاتر با همان ترافیک، فقط چون شک کمتر شده.',
      en: 'Outcome: a higher conversion rate on the same traffic, simply because doubt is removed.',
    },
    related: ['digital-presence', 'automation-crm'],
  },

  {
    slug: 'automation-crm',
    stage: 'retention',
    icon: 'automation',
    title: { fa: 'اتوماسیون و CRM', en: 'Automation & CRM' },
    promise: {
      fa: 'هیچ پیامی بی‌جواب نماند و هیچ مشتری‌ای فراموش نشود — حتی ساعت ۱۱ شب.',
      en: 'No message goes unanswered and no customer is forgotten — even at 11pm.',
    },
    metaTitle: {
      fa: 'اتوماسیون فروش و CRM برای واتساپ، دیوار و بله',
      en: 'Sales automation and CRM for WhatsApp, Divar and Bale',
    },
    metaDescription: {
      fa: 'پیاده‌سازی CRM و پاسخ خودکار روی واتساپ، دیوار و بله با بیدار: صندوق پیام یکپارچه، لید، تگ و کمپین.',
      en: 'CRM and automated replies across WhatsApp, Divar and Bale with Bidar: unified inbox, leads, tags and campaigns.',
    },
    problem: {
      fa: [
        'پیام‌ها بین واتساپ، دیوار و بله پخش شده و بعضی‌ها اصلاً جواب نمی‌گیرند.',
        'شماره‌ی مشتری در چت می‌ماند و هیچ‌وقت وارد لیست فروش نمی‌شود.',
        'پیگیری به حافظه‌ی تیم وابسته است، نه به سیستم.',
      ],
      en: [
        'Messages are scattered across WhatsApp, Divar and Bale — some never get a reply.',
        'Customer numbers stay in chat and never reach your sales list.',
        'Follow-up depends on someone remembering, not on a system.',
      ],
    },
    approach: {
      fa: [
        'همه‌ی کانال‌ها را در یک صندوق پیام جمع می‌کنیم تا یک مشتری یک پرونده داشته باشد.',
        'پاسخ خودکار را با دانش واقعی کسب‌وکار شما آموزش می‌دهیم، نه با جواب‌های کلیشه‌ای.',
        'گفتگو در نقطه‌ی درست به اپراتور انسانی تحویل داده می‌شود.',
        'هر گفتگو به لید تگ‌خورده تبدیل می‌شود که قابل پیگیری و کمپین است.',
      ],
      en: [
        'All channels land in one inbox so a customer has one thread.',
        'Auto-replies are trained on your real business knowledge, not canned answers.',
        'Conversations hand over to a human operator at the right moment.',
        'Every conversation becomes a tagged lead you can follow up and campaign to.',
      ],
    },
    deliverables: {
      fa: [
        'راه‌اندازی بیدار و اتصال کانال‌های واتساپ، دیوار و بله',
        'آموزش پاسخ‌گوی هوشمند با اسناد و قیمت‌های شما',
        'ساختار تگ و مراحل قیف فروش متناسب با کسب‌وکار شما',
        'سناریوی تحویل گفتگو به اپراتور انسانی',
        'کمپین‌های پیگیری و مناسبتی',
        'آموزش تیم و پشتیبانی بعد از راه‌اندازی',
      ],
      en: [
        'Bidar setup with WhatsApp, Divar and Bale connected',
        'AI assistant trained on your documents and pricing',
        'A tag structure and pipeline stages that fit your business',
        'Human-handover scenarios',
        'Follow-up and seasonal campaigns',
        'Team training and post-launch support',
      ],
    },
    audience: {
      fa: [
        'کسب‌وکارهایی با بیش از ۳۰ پیام در روز',
        'املاک، کلینیک، آژانس مسافرتی و فروشگاه‌های پرپیام',
        'تیم‌های فروشی که چند اپراتور و چند اکانت دارند',
      ],
      en: [
        'Businesses handling more than 30 messages a day',
        'Real estate, clinics, travel agencies and high-volume stores',
        'Sales teams with multiple operators and multiple accounts',
      ],
    },
    outcome: {
      fa: 'نتیجه: زمان پاسخ کوتاه‌تر و لیدهایی که در CRM می‌مانند، نه در چت.',
      en: 'Outcome: faster replies and leads that live in a CRM, not in a chat app.',
    },
    related: ['reputation-trust', 'digital-presence'],
    productLink: true,
  },
];

export const servicesPage = {
  title: {
    fa: 'خدمات ما — اجزای یک سیستم رشد',
    en: 'Services — the components of one growth system',
  },
  metaTitle: {
    fa: 'خدمات رشد کسب‌وکار: سایت، سئو، محتوا، اعتماد و اتوماسیون',
    en: 'Growth services: web, SEO, content, trust and automation',
  },
  metaDescription: {
    fa: 'پنج خدمت ایران اکسپدیا که کنار هم یک سیستم رشد می‌سازند: حضور دیجیتال، سئو، محتوا، اعتبار و اتوماسیون فروش.',
    en: 'Five IranExpedia services that combine into one growth system: presence, search, content, reputation and automation.',
  },
  lead: {
    fa: 'ما لیست خدمات نمی‌فروشیم. یک سیستم می‌سازیم که مشتری شما را پیدا کند، به شما اعتماد کند و بماند. هر خدمت یک قطعه از همان سیستم است — می‌توانید از یک قطعه شروع کنید.',
    en: 'We do not sell a list of services. We build a system that gets you found, gets you trusted and keeps customers. Each service is one piece of that system — you can start with a single piece.',
  },
};
