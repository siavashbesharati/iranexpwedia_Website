import { esc } from '../lib/html.mjs';
import { t, tList } from '../lib/i18n.mjs';
import { routes, localePath } from '../lib/routes.mjs';
import { site, demoCta, primaryCta } from '../data/site.mjs';
import { bidar } from '../data/bidar.mjs';
import { layout, breadcrumbSchema, faqSchema } from '../templates/layout.mjs';
import {
  s,
  breadcrumbs,
  ctaBand,
  faqBlock,
  testimonialBlock,
  checkList,
  leadForm,
} from '../templates/components.mjs';
import { iconTile } from '../templates/icons.mjs';
import { unifiedInboxVisual, tagBoardVisual, analyticsVisual } from '../templates/visuals.mjs';

export function bidarPage(locale, assets) {
  const str = s(locale);
  const trail = [
    { label: str.breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t(site.product.name, locale), href: localePath(routes.bidar, locale) },
  ];

  const hero = `<section class="hero">
  <div class="container hero-grid">
    <div>
      <p class="eyebrow">${esc(t(bidar.hero.eyebrow, locale))}</p>
      <h1>${esc(t(bidar.hero.title, locale))}</h1>
      <p class="lead">${esc(t(bidar.hero.lead, locale))}</p>
      <ul class="channel-pills">
        <li><span class="channel-dot is-whatsapp"></span>${esc(t({ fa: 'واتساپ', en: 'WhatsApp' }, locale))}</li>
        <li><span class="channel-dot is-divar"></span>${esc(t({ fa: 'دیوار', en: 'Divar' }, locale))}</li>
        <li><span class="channel-dot is-bale"></span>${esc(t({ fa: 'بله', en: 'Bale' }, locale))}</li>
      </ul>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="${esc(t(demoCta.path, locale))}" data-event="${demoCta.event}" data-event-location="bidar_hero">${esc(t(demoCta.label, locale))}</a>
        <a class="btn btn-secondary btn-lg" href="${esc(site.product.url)}" target="_blank" rel="noopener" data-event="bidar_app_open" data-event-location="bidar_hero">bidar-app.ir</a>
      </div>
      ${checkList(tList(bidar.hero.bullets, locale))}
    </div>
    <div class="hero-visual">
      <div class="product-frame">${unifiedInboxVisual(locale)}</div>
      <p class="product-caption">${esc(t({ fa: 'صندوق پیام یکپارچه — واتساپ، دیوار و بله در یک صفحه', en: 'The unified inbox — WhatsApp, Divar and Bale on one screen' }, locale))}</p>
    </div>
  </div>
</section>`;

  const channels = `<section class="section" id="integrations">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'سه کانالی که فروش شما در آن اتفاق می‌افتد', en: 'The three channels where your sales happen' }, locale))}</h2>
      <p>${esc(t({ fa: 'بدون جابه‌جا شدن بین اپلیکیشن‌ها و بدون گم شدن پیام.', en: 'No app switching, no lost messages.' }, locale))}</p>
    </div>
    <div class="grid grid-3">
      ${bidar.channels
        .map(
          (ch) => `<article class="card reveal">
        <span class="channel-dot is-${ch.key}" style="width:10px;height:10px;display:inline-block;margin-block-end:var(--space-1)"></span>
        <h3>${esc(t(ch.name, locale))}</h3>
        <p class="muted">${esc(t(ch.text, locale))}</p>
      </article>`
        )
        .join('\n')}
    </div>
  </div>
</section>`;

  const features = `<section class="section section-tint" id="features">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'قابلیت‌ها', en: 'Features' }, locale))}</h2>
      <p>${esc(t({ fa: 'از پاسخ اول تا گزارش پایان ماه.', en: 'From the first reply to the end-of-month report.' }, locale))}</p>
    </div>
    <div class="grid grid-3">
      ${bidar.features
        .map(
          (f) => `<article class="card reveal">
        ${iconTile(f.icon)}
        <h3>${esc(t(f.title, locale))}</h3>
        <p class="muted">${esc(t(f.text, locale))}</p>
      </article>`
        )
        .join('\n')}
    </div>
  </div>
</section>`;

  const flow = `<section class="section" id="how">
  <div class="container split split-top">
    <div>
      <p class="eyebrow">${esc(t({ fa: 'جریان کاری', en: 'The workflow' }, locale))}</p>
      <h2>${esc(t({ fa: 'از پیام تا لید، در چهار قدم', en: 'From message to lead in four steps' }, locale))}</h2>
      <ol class="process-list" style="grid-template-columns:1fr">
        ${bidar.flow
          .map((step) => `<li><strong>${esc(t(step.title, locale))}</strong><span>${esc(t(step.text, locale))}</span></li>`)
          .join('\n')}
      </ol>
    </div>
    <div class="reveal">
      <div class="product-frame">${tagBoardVisual(locale)}</div>
      <p class="product-caption">${esc(t({ fa: 'تگ‌ها و فیلتر مخاطبان کمپین', en: 'Tags and the campaign audience filter' }, locale))}</p>
    </div>
  </div>
</section>`;

  const analytics = `<section class="section section-warm" id="analytics">
  <div class="container split">
    <div class="reveal">
      <div class="product-frame">${analyticsVisual(locale)}</div>
      <p class="product-caption">${esc(t({ fa: 'گزارش لید، زمان پاسخ و حجم پیام', en: 'Leads, response time and message volume' }, locale))}</p>
    </div>
    <div>
      <h2>${esc(t({ fa: 'چیزی را اندازه می‌گیرید که به فروش وصل است', en: 'You measure what connects to sales' }, locale))}</h2>
      <p class="lead">${esc(t({ fa: 'زمان پاسخ، تعداد لید، پیام‌های بی‌جواب و سهم هر کانال — به تفکیک اپراتور. همین چند عدد کافی است تا بفهمید کجا فرصت از دست می‌رود.', en: 'Response time, lead count, unanswered messages and each channel’s share — broken down by operator. Those few numbers show exactly where opportunity leaks.' }, locale))}</p>
      ${checkList(
        tList(
          {
            fa: ['زمان اولین پاسخ به تفکیک کانال', 'تعداد لید و نرخ تبدیل گفتگو به لید', 'پیام‌های بی‌جواب و ساعت‌های پرریسک', 'عملکرد هر اپراتور در کنار پاسخ‌های هوشمند'],
            en: ['First-response time per channel', 'Lead count and chat-to-lead conversion', 'Unanswered messages and risky hours', 'Per-operator performance alongside AI replies'],
          },
          locale
        )
      )}
    </div>
  </div>
</section>`;

  const useCases = `<section class="section" id="use-cases">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'کاربردها', en: 'Use cases' }, locale))}</h2>
      <p>${esc(t({ fa: 'هر کسب‌وکاری که روزی بیش از ۳۰ پیام جواب می‌دهد.', en: 'Any business answering more than 30 messages a day.' }, locale))}</p>
    </div>
    <div class="grid grid-3">
      ${bidar.useCases
        .map(
          (u) => `<article class="card reveal">
        <h3>${esc(t(u.title, locale))}</h3>
        <p class="muted">${esc(t(u.text, locale))}</p>
      </article>`
        )
        .join('\n')}
    </div>
  </div>
</section>`;

  const pricing = `<section class="section section-tint" id="pricing">
  <div class="container">
    <div class="section-head is-centered">
      <h2>${esc(t(bidar.pricing.title, locale))}</h2>
      <p>${esc(t(bidar.pricing.lead, locale))}</p>
    </div>
    <div class="price-grid price-grid-two">
      ${bidar.pricing.tiers
        .map((tier) => {
          const isContact = tier.cta === 'contact';
          const href = isContact ? `tel:${site.contact.mobile}` : t(demoCta.path, locale);
          const label = isContact
            ? t({ fa: 'تماس بگیرید — ۰۹۱۲ ۰۶۷ ۴۰۳۲', en: 'Call 0912 067 4032' }, locale)
            : t({ fa: 'شروع کنید', en: 'Get started' }, locale);
          const event = isContact ? 'call_click' : demoCta.event;
          return `<article class="card price-card${tier.featured ? ' is-featured' : ''} reveal">
        <h3>${esc(t(tier.name, locale))}</h3>
        <p class="price-for">${esc(t(tier.for, locale))}</p>
        <p class="price-value">${esc(t(tier.price, locale))}</p>
        ${checkList(tList(tier.items, locale))}
        <a class="btn ${tier.featured ? 'btn-primary' : 'btn-secondary'} btn-block" href="${esc(href)}" data-event="${esc(event)}" data-event-location="pricing_${esc(t(tier.name, 'en'))}">${esc(label)}</a>
      </article>`;
        })
        .join('\n')}
    </div>
    <p class="muted" style="margin-block-start:var(--space-3);text-align:center">${esc(t(bidar.pricing.note, locale))}</p>
  </div>
</section>`;

  const demoForm = `<section class="section" id="demo">
  <div class="container split split-top">
    <div>
      <h2>${esc(t({ fa: 'دموی ۲۰ دقیقه‌ای بیدار', en: 'A 20-minute Bidar demo' }, locale))}</h2>
      <p class="lead">${esc(t({ fa: 'با کانال‌های خودتان نگاه می‌کنیم: کجا پیام گم می‌شود، چه چیزی قابل خودکارسازی است و قیمت دقیق چقدر می‌شود.', en: 'We look at your own channels: where messages get lost, what can be automated and what it will actually cost.' }, locale))}</p>
      ${checkList(
        tList(
          {
            fa: ['نمایش زنده‌ی صندوق پیام و تگ‌ها', 'بررسی حجم پیام و کانال‌های شما', 'قیمت شفاف در همان جلسه'],
            en: ['A live look at the inbox and tags', 'A review of your message volume and channels', 'Clear pricing in the same call'],
          },
          locale
        )
      )}
    </div>
    <div class="reveal">${leadForm(locale, 'consultation', { topicDefault: 'bidar' })}</div>
  </div>
</section>`;

  const body = [
    hero,
    channels,
    features,
    flow,
    analytics,
    useCases,
    testimonialBlock(locale, {
      title: t({ fa: 'تیم‌هایی که با بیدار کار می‌کنند', en: 'Teams running on Bidar' }, locale),
    }),
    pricing,
    demoForm,
    faqBlock(locale, bidar.faq),
    ctaBand(locale, {
      title: t({ fa: 'پاسخ‌گویی‌تان را از امروز منظم کنید', en: 'Get your replies organised this week' }, locale),
      text: t(
        {
          fa: 'یک دموی کوتاه بگذارید و ببینید بیدار روی کانال‌های خودتان چه می‌کند.',
          en: 'Book a short demo and see what Bidar does on your own channels.',
        },
        locale
      ),
      primary: { label: t(demoCta.label, locale), href: t(demoCta.path, locale), event: demoCta.event },
      secondary: { label: t(primaryCta.label, locale), href: t(primaryCta.path, locale), event: primaryCta.event },
      location: 'bidar_final',
    }),
  ].join('\n');

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: t(site.product.name, locale),
    alternateName: 'Bidar',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM',
    operatingSystem: 'Web',
    url: site.product.url,
    description: t(bidar.metaDescription, locale),
    inLanguage: ['fa', 'en'],
    featureList: bidar.features.map((f) => t(f.title, locale)),
    provider: { '@id': `${site.domain}/#organization` },
    offers: {
      '@type': 'Offer',
      url: `${site.domain}${localePath(routes.bidar, locale)}#pricing`,
      price: '20000000',
      priceCurrency: 'IRR',
      availability: 'https://schema.org/InStock',
      name: t({ fa: 'بیدار — اشتراک ماهانه', en: 'Bidar — monthly subscription' }, locale),
    },
  };

  return layout(
    {
      locale,
      path: routes.bidar,
      navKey: 'bidar',
      pageId: 'bidar',
      title: t(bidar.metaTitle, locale),
      description: t(bidar.metaDescription, locale),
      schema: [softwareSchema, breadcrumbSchema(locale, trail), faqSchema(bidar.faq, locale, t)],
      body,
    },
    assets
  );
}
