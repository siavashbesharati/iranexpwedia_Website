/**
 * Single source of truth for brand, contact and measurement config.
 *
 * Anything written as [X] or marked `placeholder: true` is a real number we do
 * not have yet. Replace the value here and it updates everywhere on the site.
 */

export const site = {
  domain: 'https://iranexpedia.ir',
  defaultLocale: 'fa',
  locales: ['fa', 'en'],

  name: {
    fa: 'ایران اکسپدیا',
    en: 'IranExpedia',
  },

  tagline: {
    fa: 'دیده‌شدن. اعتمادسازی. بازگشت مشتری.',
    en: 'Visibility. Trust. Return.',
  },

  contact: {
    phone: '+982188728071',
    phoneDisplay: {
      fa: '۰۲۱-۸۸۷۲۸۰۷۱',
      en: '021-8872 8071',
    },
    mobile: '+989120674032',
    mobileDisplay: {
      fa: '۰۹۱۲ ۰۶۷ ۴۰۳۲',
      en: '0912 067 4032',
    },
    whatsapp: 'https://wa.me/989120674032',
    email: 'hello@iranexpedia.ir',
    bale: {
      handle: 'iranexpedia_ir',
      placeholder: '[شناسه بله]',
      baseUrl: 'https://ble.ir/',
    },
    address: {
      fa: 'تهران، وزرا، کوچه ششم، پلاک ۱۴، واحد ششم',
      en: 'Unit 6, No. 14, 6th Alley, Vozara, Tehran, Iran',
    },
    hours: {
      fa: 'شنبه تا چهارشنبه، ۹ تا ۱۸ — پنجشنبه ۹ تا ۱۳',
      en: 'Sat–Wed 9:00–18:00 · Thu 9:00–13:00',
    },
  },

  product: {
    name: { fa: 'بیدار', en: 'Bidar' },
    url: 'https://bidar-app.ir',
    tagline: {
      fa: 'یک مشتری. یک گفتگو. یک جریان کاری.',
      en: 'One customer. One conversation. One workflow.',
    },
  },

  // Rendered in the trust strip. `placeholder: true` prints the [X] marker.
  stats: [
    {
      value: '[X]',
      placeholder: true,
      label: { fa: 'پروژه اجراشده', en: 'projects delivered' },
    },
    {
      value: '[X]',
      placeholder: true,
      label: { fa: 'کسب‌وکار فعال روی بیدار', en: 'businesses running Bidar' },
    },
    {
      value: '3',
      placeholder: false,
      label: { fa: 'کانال پیام یکپارچه: واتساپ، دیوار، بله', en: 'unified channels: WhatsApp, Divar, Bale' },
    },
    {
      value: '[X]',
      placeholder: true,
      label: { fa: 'میانگین امتیاز مشتریان', en: 'average client rating' },
    },
  ],

  // Industries we actually work with today (from live client work).
  industries: {
    fa: ['املاک و مستغلات', 'کلینیک و زیبایی', 'آژانس مسافرتی', 'فروشگاه آنلاین', 'خدمات محلی', 'آموزش و مشاوره'],
    en: ['Real estate', 'Clinics & aesthetics', 'Travel agencies', 'E-commerce', 'Local services', 'Education & consulting'],
  },

  forms: {
    // POST target for every form on the site (Formspree/Getform/your own API).
    // While this is null the form falls back to a pre-filled WhatsApp message,
    // so no lead is ever lost.
    endpoint: null,
    successPath: { fa: '/thank-you', en: '/en/thank-you' },
  },

  analytics: {
    // No third-party script is loaded by default. Events are pushed to
    // window.dataLayer and forwarded to gtag/plausible when they exist, so any
    // tag manager can be dropped in later without touching the markup.
    dataLayerName: 'dataLayer',
  },

  // Enamad / trust badges. Set `enamad.html` to the snippet from enamad.ir.
  trustBadges: {
    enamad: null,
  },

  social: {
    instagram: null,
    linkedin: null,
  },
};

export const ogImage = `${site.domain}/assets/og-image.jpg?v=20260919`;

export const nav = [
  { key: 'home', label: { fa: 'خانه', en: 'Home' }, path: { fa: '/', en: '/en/' } },
  { key: 'how', label: { fa: 'روش کار', en: 'How it works' }, path: { fa: '/#how', en: '/en/#how' } },
  { key: 'what', label: { fa: 'چه می‌کنیم', en: 'What we do' }, path: { fa: '/#what', en: '/en/#what' } },
  { key: 'pricing', label: { fa: 'قیمت', en: 'Pricing' }, path: { fa: '/#pricing', en: '/en/#pricing' } },
  { key: 'contact', label: { fa: 'تماس', en: 'Contact' }, path: { fa: '/contact', en: '/en/contact' } },
];

export const packageOffer = {
  amount: 15000000,
  toman: { fa: '۱۵٬۰۰۰٬۰۰۰', en: '15,000,000' },
  unit: { fa: 'تومان / ماه', en: 'Toman / month' },
  irr: 150000000,
};

export const primaryCta = {
  label: { fa: 'نقشه راه', en: 'Roadmap' },
  path: { fa: '/contact', en: '/en/contact' },
  event: 'build_roadmap',
};

export const secondaryCta = {
  label: { fa: 'آشنایی با بیدار', en: 'Explore Bidar' },
  path: { fa: '/bidar', en: '/en/bidar' },
  event: 'explore_bidar',
};

export const demoCta = {
  label: { fa: 'درخواست دموی بیدار', en: 'Request a Bidar demo' },
  path: { fa: '/contact?topic=bidar', en: '/en/contact?topic=bidar' },
  event: 'request_demo',
};

/** The growth framework every page maps back to. */
export const framework = [
  {
    key: 'visibility',
    step: '01',
    title: { fa: 'دیده شدن', en: 'Visibility' },
    text: {
      fa: 'مشتری باید شما را در لحظه‌ی نیاز پیدا کند: جستجوی گوگل، نقشه، دیوار و شبکه‌های اجتماعی.',
      en: 'Customers find you at the moment of need: Google, Maps, Divar and social.',
    },
  },
  {
    key: 'trust',
    step: '02',
    title: { fa: 'اعتماد', en: 'Trust' },
    text: {
      fa: 'وقتی پیدا شدید، باید در چند ثانیه باور شوید: سایت تمیز، نظرات واقعی، پاسخ سریع.',
      en: 'Once found, you have seconds to be believed: a clean site, real reviews, fast replies.',
    },
  },
  {
    key: 'retention',
    step: '03',
    title: { fa: 'نگه‌داشتن', en: 'Retention' },
    text: {
      fa: 'هیچ پیامی بی‌جواب نمی‌ماند و هیچ مشتری‌ای فراموش نمی‌شود؛ پیگیری خودکار انجام می‌شود.',
      en: 'No message is missed and no customer is forgotten; follow-up happens automatically.',
    },
  },
];

export const frameworkOutcome = {
  title: { fa: 'رشد', en: 'Growth' },
  text: {
    fa: 'وقتی این سه تا کنار هم کار کنند، رشد نتیجه‌ی طبیعی سیستم است، نه شانس.',
    en: 'When those three work together, growth is the output of a system — not luck.',
  },
};

/** Discover → Design → Build → Launch → Measure → Optimize */
export const processSteps = [
  {
    step: '01',
    title: { fa: 'کشف', en: 'Discover' },
    text: { fa: 'بازار، مشتری و اعداد امروز شما را می‌فهمیم.', en: 'We learn your market, your customer and your current numbers.' },
  },
  {
    step: '02',
    title: { fa: 'طراحی', en: 'Design' },
    text: { fa: 'مسیر مشتری و پیام‌ها را قبل از هر خط کد طراحی می‌کنیم.', en: 'We design the customer journey and the message before any code.' },
  },
  {
    step: '03',
    title: { fa: 'ساخت', en: 'Build' },
    text: { fa: 'سایت، محتوا و اتوماسیون را می‌سازیم و به هم وصل می‌کنیم.', en: 'We build the site, the content and the automation, and connect them.' },
  },
  {
    step: '04',
    title: { fa: 'راه‌اندازی', en: 'Launch' },
    text: { fa: 'با تیم شما اجرا می‌کنیم؛ آموزش و تحویل بخشی از کار است.', en: 'We launch with your team; training and handover are part of the job.' },
  },
  {
    step: '05',
    title: { fa: 'اندازه‌گیری', en: 'Measure' },
    text: { fa: 'لید، تماس و فروش را می‌شماریم — نه بازدید خالی را.', en: 'We count leads, calls and sales — not vanity traffic.' },
  },
  {
    step: '06',
    title: { fa: 'بهینه‌سازی', en: 'Optimize' },
    text: { fa: 'هر ماه روی همان عددی کار می‌کنیم که برای شما مهم است.', en: 'Every month we work on the one number that matters to you.' },
  },
];
