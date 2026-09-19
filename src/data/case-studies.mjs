/**
 * Format: Problem → What we did → Measurable result.
 *
 * Every metric is written as [X] until the real number is confirmed with the
 * client. Never replace a [X] with an estimate — pull it from the CRM or the
 * analytics account, or leave it out.
 *
 * `client` uses the segment, not the brand name, until written permission to
 * publish the name is on file. Set `clientNamed: true` once you have it.
 */

export const caseStudies = [
  {
    slug: 'real-estate-divar-leads',
    clientNamed: false,
    client: { fa: 'بنگاه املاک — تهران، ونک', en: 'Real estate agency — Vanak, Tehran' },
    industry: { fa: 'املاک و مستغلات', en: 'Real estate' },
    service: 'automation-crm',
    title: {
      fa: 'از صد پیام گم‌شده در دیوار تا یک قیف فروش شفاف',
      en: 'From a hundred lost Divar messages to a clear sales pipeline',
    },
    metaTitle: {
      fa: 'نمونه‌کار املاک: تبدیل چت دیوار و واتساپ به لید',
      en: 'Case study: turning Divar and WhatsApp chats into leads',
    },
    metaDescription: {
      fa: 'چطور یک بنگاه املاک در ونک با صندوق پیام یکپارچه و پاسخ خودکار، پیام‌های از دست رفته را به لید تگ‌خورده تبدیل کرد.',
      en: 'How a Vanak real estate agency turned missed messages into tagged leads with a unified inbox and automated replies.',
    },
    problem: {
      fa: 'روزانه نزدیک به ۱۰۰ پیام از دیوار و واتساپ می‌آمد. مشاورها فقط به پیام‌هایی جواب می‌دادند که در ساعت کاری و بالای لیست بود. بقیه‌ی پیام‌ها بی‌جواب می‌ماند و هیچ‌کس نمی‌دانست چند فرصت از دست رفته است، چون هیچ‌جا ثبت نمی‌شد.',
      en: 'Around 100 messages a day arrived from Divar and WhatsApp. Agents only replied to what was at the top of the list during office hours. The rest went unanswered, and nobody knew how many opportunities were lost because nothing was recorded.',
    },
    actions: {
      fa: [
        'همه‌ی اکانت‌های واتساپ و دیوار در یک صندوق پیام بیدار جمع شد.',
        'پاسخ‌گوی هوشمند با فایل‌های واقعی رهن و اجاره و سوال‌های پرتکرار آموزش دید.',
        'سناریوی هدایت خریدار دیوار به واتساپ و گرفتن شماره نوشته و پیاده شد.',
        'تگ‌های «داغ»، «جدید» و «نیاز به انسان» به مراحل قیف فروش بنگاه وصل شد.',
        'گزارش روزانه‌ی لیدهای داغ برای مدیر فروش فعال شد.',
      ],
      en: [
        'Every WhatsApp and Divar account was merged into one Bidar inbox.',
        'The AI assistant was trained on real rental listings and frequent questions.',
        'A flow was written and shipped to move Divar buyers to WhatsApp and capture their number.',
        '“Hot”, “new” and “needs a human” tags were mapped to the agency’s pipeline stages.',
        'A daily hot-lead digest was switched on for the sales manager.',
      ],
    },
    results: {
      fa: [
        { metric: '[X]٪', label: 'کاهش پیام‌های بی‌جواب' },
        { metric: '[X] دقیقه', label: 'میانگین زمان اولین پاسخ (قبل: [X] دقیقه)' },
        { metric: '[X]', label: 'لید ثبت‌شده در ماه اول' },
        { metric: '[X]٪', label: 'رشد قرار بازدید ملک' },
      ],
      en: [
        { metric: '[X]%', label: 'fewer unanswered messages' },
        { metric: '[X] min', label: 'average first-response time (before: [X] min)' },
        { metric: '[X]', label: 'leads recorded in the first month' },
        { metric: '[X]%', label: 'more property viewings booked' },
      ],
    },
    quote: {
      fa: 'تیم فروش ما فقط روی لیدهای داغ وقت می‌ذاره.',
      en: 'Our sales team now only spends time on hot leads.',
    },
    quoteBy: { fa: 'مدیر فروش بنگاه', en: 'Agency sales manager' },
  },

  {
    slug: 'clinic-after-hours-bookings',
    clientNamed: false,
    client: { fa: 'کلینیک زیبایی — تهران', en: 'Aesthetic clinic — Tehran' },
    industry: { fa: 'کلینیک و زیبایی', en: 'Clinics & aesthetics' },
    service: 'automation-crm',
    title: {
      fa: 'پوشش نوبت‌گیری بعد از ساعت کاری بدون استخدام منشی جدید',
      en: 'Covering after-hours bookings without hiring another receptionist',
    },
    metaTitle: {
      fa: 'نمونه‌کار کلینیک: پاسخ‌گویی شبانه و نوبت‌گیری خودکار',
      en: 'Case study: after-hours replies and automated clinic bookings',
    },
    metaDescription: {
      fa: 'چطور یک کلینیک زیبایی با پاسخ خودکار روی واتساپ و بله، مراجعان شبانه را حفظ کرد و نوبت‌ها را منظم کرد.',
      en: 'How an aesthetic clinic kept its evening enquiries with automated WhatsApp and Bale replies.',
    },
    problem: {
      fa: 'بیشتر پیام‌های مشاوره بین ساعت ۲۰ تا ۲۴ می‌رسید — دقیقاً وقتی منشی‌ها نبودند. صبح روز بعد بخشی از این افراد قبلاً به کلینیک دیگری مراجعه کرده بودند. سوال‌های تکراری درباره‌ی قیمت و آمادگی قبل از درمان هم نیمی از وقت پذیرش را می‌گرفت.',
      en: 'Most consultation messages arrived between 8pm and midnight — exactly when reception was closed. By the next morning, some of those people had already gone to another clinic. Repetitive questions about pricing and pre-treatment prep ate half of reception’s day.',
    },
    actions: {
      fa: [
        'واتساپ و بله کلینیک به یک صندوق پیام واحد وصل شد.',
        'پاسخ‌گوی هوشمند با لیست خدمات، محدوده‌ی قیمت و شرایط قبل از درمان آموزش دید.',
        'سوال‌های حساس پزشکی به‌جای پاسخ خودکار، با تگ «نیاز به انسان» برای پزشک نگه داشته شد.',
        'فرم کوتاه نوبت‌گیری در انتهای گفتگو اضافه شد.',
        'کمپین یادآوری مراجعه‌ی بعدی روی تگ بیماران قدیمی تنظیم شد.',
      ],
      en: [
        'The clinic’s WhatsApp and Bale channels were merged into one inbox.',
        'The assistant was trained on the service list, price ranges and pre-treatment rules.',
        'Sensitive medical questions were held for a doctor with a “needs a human” tag instead of being auto-answered.',
        'A short booking form was added at the end of the conversation.',
        'A recall campaign was set up on the returning-patient tag.',
      ],
    },
    results: {
      fa: [
        { metric: '[X]٪', label: 'پیام‌های خارج از ساعت کاری که پاسخ گرفتند' },
        { metric: '[X]', label: 'نوبت رزروشده از مسیر چت در ماه' },
        { metric: '[X] ساعت', label: 'صرفه‌جویی هفتگی وقت پذیرش' },
        { metric: '[X]٪', label: 'رشد بازگشت بیمار با کمپین یادآوری' },
      ],
      en: [
        { metric: '[X]%', label: 'of after-hours messages answered' },
        { metric: '[X]', label: 'appointments booked through chat per month' },
        { metric: '[X] hrs', label: 'reception time saved per week' },
        { metric: '[X]%', label: 'lift in patient return rate from recall campaigns' },
      ],
    },
    quote: {
      fa: 'پاسخ خودکار بیدار باعث شد منشی‌ها شب‌ها هم پوشش داشته باشن و بیمار از دست نره.',
      en: 'Bidar’s automated replies cover the evenings so no patient is lost.',
    },
    quoteBy: { fa: 'مدیر کلینیک', en: 'Clinic director' },
  },

  {
    slug: 'travel-agency-campaigns',
    clientNamed: false,
    client: { fa: 'آژانس مسافرتی — تهران', en: 'Travel agency — Tehran' },
    industry: { fa: 'گردشگری', en: 'Travel' },
    service: 'automation-crm',
    title: {
      fa: 'کمپین نوروز روی مشتریانی که فقط در چت وجود داشتند',
      en: 'A Nowruz campaign to customers who only existed in chat',
    },
    metaTitle: {
      fa: 'نمونه‌کار آژانس مسافرتی: کمپین هدفمند روی لیدهای چت',
      en: 'Case study: targeted campaigns for a travel agency’s chat leads',
    },
    metaDescription: {
      fa: 'چطور یک آژانس مسافرتی مخاطبان پراکنده در واتساپ، دیوار و بله را به لیست قابل کمپین تبدیل کرد.',
      en: 'How a travel agency turned scattered WhatsApp, Divar and Bale contacts into a campaign-ready list.',
    },
    problem: {
      fa: 'هزاران گفتگو در چند اکانت واتساپ و بله پخش بود. برای هر کمپین، تیم باید دستی در چت‌ها جستجو می‌کرد و پیام می‌فرستاد. نتیجه: کمپین‌ها دیر اجرا می‌شدند و هیچ گزارشی از نتیجه وجود نداشت.',
      en: 'Thousands of conversations were spread across several WhatsApp and Bale accounts. For every campaign the team searched chats by hand and messaged people one by one. Campaigns went out late and nobody could report on results.',
    },
    actions: {
      fa: [
        'همه‌ی اکانت‌ها زیر یک کسب‌وکار در بیدار جمع شد و چند اپراتور همزمان فعال شدند.',
        'مخاطبان بر اساس کانال، مقصد مورد علاقه و تگ داغ/جدید/قدیمی دسته‌بندی شدند.',
        'کمپین نوروز با فیلتر «جدید + داغ» و زمان‌بندی ارسال ساخته شد.',
        'پاسخ‌های ورودی کمپین مستقیم به همان صندوق پیام و اپراتورها برگشت.',
        'گزارش نرخ پاسخ و فروش به تفکیک کانال فعال شد.',
      ],
      en: [
        'All accounts were consolidated under one Bidar workspace with multiple operators.',
        'Contacts were segmented by channel, preferred destination and hot/new/returning tags.',
        'The Nowruz campaign was built with a “new + hot” filter and scheduled sending.',
        'Campaign replies came back into the same shared inbox.',
        'Reply-rate and sales reporting was broken down per channel.',
      ],
    },
    results: {
      fa: [
        { metric: '[X]', label: 'مخاطب قابل کمپین که قبلاً فقط در چت بودند' },
        { metric: '[X]٪', label: 'نرخ پاسخ به کمپین نوروز' },
        { metric: '[X]', label: 'رزرو تور از مسیر کمپین' },
        { metric: '[X] ساعت', label: 'کاهش زمان اجرای هر کمپین' },
      ],
      en: [
        { metric: '[X]', label: 'campaign-ready contacts that previously lived only in chat' },
        { metric: '[X]%', label: 'reply rate on the Nowruz campaign' },
        { metric: '[X]', label: 'tour bookings attributed to the campaign' },
        { metric: '[X] hrs', label: 'less time to run each campaign' },
      ],
    },
    quote: {
      fa: 'زمان ارسال و فیلتر تگ «جدید + داغ» دقیقاً همون چیزی بود که برای فروش تور نیاز داشتیم.',
      en: 'Scheduling plus the “new + hot” tag filter was exactly what we needed to sell tours.',
    },
    quoteBy: { fa: 'مدیر مارکتینگ آژانس', en: 'Agency marketing manager' },
  },
];

export const caseStudiesPage = {
  metaTitle: {
    fa: 'نمونه‌کارها — مشکل، کاری که کردیم، نتیجه',
    en: 'Case studies — problem, what we did, result',
  },
  metaDescription: {
    fa: 'نمونه‌کارهای ایران اکسپدیا در املاک، کلینیک و گردشگری؛ با قالب مشکل ← اقدام ← نتیجه‌ی قابل اندازه‌گیری.',
    en: 'IranExpedia case studies in real estate, clinics and travel — problem, action, measurable result.',
  },
  lead: {
    fa: 'هر نمونه‌کار سه بخش دارد: مشکل، کاری که کردیم و نتیجه. اعدادی که هنوز با مشتری نهایی نشده‌اند با [X] نشان داده می‌شوند — چیزی از خودمان اضافه نمی‌کنیم.',
    en: 'Every case study has three parts: the problem, what we did and the result. Numbers not yet confirmed with the client are shown as [X] — we do not invent data.',
  },
};
