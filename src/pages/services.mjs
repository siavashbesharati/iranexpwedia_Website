import { esc } from '../lib/html.mjs';
import { t, tList } from '../lib/i18n.mjs';
import { routes, localePath } from '../lib/routes.mjs';
import { site, primaryCta, demoCta, framework } from '../data/site.mjs';
import { services, servicesPage } from '../data/services.mjs';
import { faq } from '../data/pages.mjs';
import { layout, breadcrumbSchema, faqSchema } from '../templates/layout.mjs';
import {
  s,
  breadcrumbs,
  ctaBand,
  faqBlock,
  serviceTile,
  checkList,
  arrowList,
  inlineCta,
  testimonialBlock,
} from '../templates/components.mjs';
import { iconTile } from '../templates/icons.mjs';

const stageLabel = {
  visibility: { fa: 'لایه‌ی دیده‌شدن', en: 'Visibility layer' },
  trust: { fa: 'لایه‌ی اعتماد', en: 'Trust layer' },
  retention: { fa: 'لایه‌ی نگه‌داشتن', en: 'Retention layer' },
};

/* ------------------------------------------------------------- hub page -- */

export function servicesHubPage(locale, assets) {
  const trail = [
    { label: s(locale).breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t({ fa: 'خدمات', en: 'Services' }, locale), href: localePath(routes.services, locale) },
  ];

  const layers = framework
    .map((layer) => {
      const inLayer = services.filter((svc) => svc.stage === layer.key);
      return `<section class="section${layer.key === 'trust' ? ' section-tint' : ''}">
      <div class="container">
        <div class="section-head">
          <p class="eyebrow">${esc(t(layer.title, locale))}</p>
          <h2>${esc(t(layer.text, locale))}</h2>
        </div>
        <div class="grid grid-2">${inLayer.map((svc) => serviceTile(locale, svc)).join('\n')}</div>
      </div>
    </section>`;
    })
    .join('\n');

  const intro = `<section class="hero-page">
  <div class="container">
    ${breadcrumbs(locale, [{ label: t({ fa: 'خدمات', en: 'Services' }, locale) }])}
    <h1>${esc(t(servicesPage.title, locale))}</h1>
    <p class="lead">${esc(t(servicesPage.lead, locale))}</p>
    <div class="btn-row">
      <a class="btn btn-primary btn-lg" href="${esc(t(primaryCta.path, locale))}" data-event="${primaryCta.event}" data-event-location="services_hero">${esc(t(primaryCta.label, locale))}</a>
      <a class="btn btn-secondary btn-lg" href="${esc(localePath(routes.caseStudies, locale))}" data-event="view_case_studies" data-event-location="services_hero">${esc(t({ fa: 'دیدن نتایج واقعی', en: 'See real results' }, locale))}</a>
    </div>
  </div>
</section>`;

  const body = [
    intro,
    layers,
    testimonialBlock(locale),
    faqBlock(locale, faq),
    ctaBand(locale, {
      title: t({ fa: 'نمی‌دانید از کدام قطعه شروع کنید؟', en: 'Not sure which piece to start with?' }, locale),
      text: t(
        {
          fa: 'در جلسه‌ی ۳۰ دقیقه‌ای گلوگاه شما را پیدا می‌کنیم و ترتیب اجرا را پیشنهاد می‌دهیم.',
          en: 'In a 30-minute call we find your bottleneck and propose the order of work.',
        },
        locale
      ),
      location: 'services_final',
    }),
  ].join('\n');

  return layout(
    {
      locale,
      path: routes.services,
      navKey: 'services',
      pageId: 'services',
      title: t(servicesPage.metaTitle, locale),
      description: t(servicesPage.metaDescription, locale),
      schema: [breadcrumbSchema(locale, trail), faqSchema(faq, locale, t)],
      body,
    },
    assets
  );
}

/* ---------------------------------------------------------- detail page -- */

export function servicePage(locale, svc, assets) {
  const str = s(locale);
  const path = routes.service(svc.slug);

  const trail = [
    { label: str.breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t({ fa: 'خدمات', en: 'Services' }, locale), href: localePath(routes.services, locale) },
    { label: t(svc.title, locale), href: localePath(path, locale) },
  ];

  const relatedTiles = svc.related
    .map((slug) => services.find((item) => item.slug === slug))
    .filter(Boolean)
    .map((item) => serviceTile(locale, item))
    .join('\n');

  const productBlock = svc.productLink
    ? inlineCta(locale, {
        text: t(
          {
            fa: 'این خدمت روی محصول خودمان اجرا می‌شود: بیدار، CRM و صندوق پیام یکپارچه.',
            en: 'This service runs on our own product: Bidar, a CRM and unified inbox.',
          },
          locale
        ),
        label: t(demoCta.label, locale),
        href: t(demoCta.path, locale),
        event: demoCta.event,
        location: 'service_' + svc.slug,
      })
    : '';

  const hero = `<section class="hero-page">
  <div class="container">
    ${breadcrumbs(locale, [
      { label: t({ fa: 'خدمات', en: 'Services' }, locale), href: localePath(routes.services, locale) },
      { label: t(svc.title, locale) },
    ])}
    <div class="split split-top">
      <div>
        <p class="eyebrow">${esc(t(stageLabel[svc.stage], locale))}</p>
        <h1>${esc(t(svc.title, locale))}</h1>
        <p class="lead">${esc(t(svc.promise, locale))}</p>
        <div class="btn-row">
          <a class="btn btn-primary btn-lg" href="${esc(t(primaryCta.path, locale))}" data-event="${primaryCta.event}" data-event-location="service_${esc(svc.slug)}_hero">${esc(t(primaryCta.label, locale))}</a>
        </div>
      </div>
      <div class="card">
        ${iconTile(svc.icon)}
        <h2 style="font-size:var(--step-1)">${esc(t({ fa: 'این خدمت برای چه کسی است؟', en: 'Who is this for?' }, locale))}</h2>
        ${arrowList(tList(svc.audience, locale))}
      </div>
    </div>
  </div>
</section>`;

  const problem = `<section class="section">
  <div class="container container-narrow">
    <p class="case-stage">${esc(t({ fa: 'مشکلی که حل می‌کنیم', en: 'The problem we solve' }, locale))}</p>
    <h2>${esc(t({ fa: 'اگر این جمله‌ها آشناست، همین خدمت را لازم دارید', en: 'If these sound familiar, this is the service you need' }, locale))}</h2>
    ${arrowList(tList(svc.problem, locale))}
  </div>
</section>`;

  const approach = `<section class="section section-tint">
  <div class="container container-narrow">
    <p class="case-stage">${esc(t({ fa: 'روش ما', en: 'Our approach' }, locale))}</p>
    <h2>${esc(t({ fa: 'چطور جلو می‌بریم', en: 'How we work on it' }, locale))}</h2>
    ${checkList(tList(svc.approach, locale))}
  </div>
</section>`;

  const deliverables = `<section class="section">
  <div class="container split split-top">
    <div>
      <p class="case-stage">${esc(t({ fa: 'تحویلی‌ها', en: 'Deliverables' }, locale))}</p>
      <h2>${esc(t({ fa: 'دقیقاً چه چیزی تحویل می‌گیرید', en: 'Exactly what you receive' }, locale))}</h2>
      <p class="muted">${esc(t(svc.outcome, locale))}</p>
    </div>
    <div class="card">${checkList(tList(svc.deliverables, locale))}</div>
  </div>
</section>`;

  const related = `<section class="section section-warm">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'قطعه‌های مرتبط سیستم', en: 'Related pieces of the system' }, locale))}</h2>
      <p>${esc(t({ fa: 'این خدمت تنها کار نمی‌کند؛ معمولاً با این‌ها ترکیب می‌شود.', en: 'This service does not work alone; it is usually combined with these.' }, locale))}</p>
    </div>
    <div class="grid grid-2">${relatedTiles}</div>
  </div>
</section>`;

  const body = [
    hero,
    problem,
    approach,
    deliverables,
    productBlock ? `<div class="container container-narrow">${productBlock}</div>` : '',
    related,
    ctaBand(locale, {
      title: t({ fa: 'یک جلسه، یک تشخیص روشن', en: 'One call, one clear diagnosis' }, locale),
      text: t(
        {
          fa: 'بگویید امروز کجا گیر کرده‌اید؛ می‌گوییم این خدمت به کار شما می‌آید یا نه.',
          en: 'Tell us where you are stuck; we will tell you whether this service is the right fit.',
        },
        locale
      ),
      location: `service_${svc.slug}_final`,
    }),
  ]
    .filter(Boolean)
    .join('\n');

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t(svc.title, locale),
    serviceType: t(svc.title, locale),
    description: t(svc.metaDescription, locale),
    provider: { '@id': `${site.domain}/#organization` },
    areaServed: { '@type': 'Country', name: 'Iran' },
    audience: { '@type': 'BusinessAudience', name: tList(svc.audience, locale)[0] },
    url: `${site.domain}${localePath(path, locale)}`,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t({ fa: 'تحویلی‌ها', en: 'Deliverables' }, locale),
      itemListElement: tList(svc.deliverables, locale).map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };

  return layout(
    {
      locale,
      path,
      navKey: 'services',
      pageId: `service_${svc.slug}`,
      title: t(svc.metaTitle, locale),
      description: t(svc.metaDescription, locale),
      schema: [serviceSchema, breadcrumbSchema(locale, trail)],
      body,
    },
    assets
  );
}
