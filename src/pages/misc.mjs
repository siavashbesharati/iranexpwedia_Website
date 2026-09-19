import { esc } from '../lib/html.mjs';
import { t, tList } from '../lib/i18n.mjs';
import { routes, localePath } from '../lib/routes.mjs';
import { site, primaryCta, secondaryCta, framework, processSteps } from '../data/site.mjs';
import { about, contact, thankYou, notFound, faq } from '../data/pages.mjs';
import { services } from '../data/services.mjs';
import { layout, breadcrumbSchema, organizationSchema, faqSchema } from '../templates/layout.mjs';
import {
  s,
  breadcrumbs,
  ctaBand,
  faqBlock,
  testimonialBlock,
  contactOptions,
  leadForm,
  checkList,
  serviceTile,
  trustStrip,
} from '../templates/components.mjs';

/* ------------------------------------------------------------------ about */

export function aboutPage(locale, assets) {
  const str = s(locale);
  const trail = [
    { label: str.breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t({ fa: 'درباره ما', en: 'About' }, locale), href: localePath(routes.about, locale) },
  ];

  const body = `<section class="hero-page">
  <div class="container container-narrow">
    ${breadcrumbs(locale, [{ label: t({ fa: 'درباره ما', en: 'About' }, locale) }])}
    <h1>${esc(t(about.title, locale))}</h1>
    <p class="lead">${esc(t(about.lead, locale))}</p>
  </div>
</section>
${trustStrip(locale)}
<section class="section">
  <div class="container container-narrow prose" style="max-width:none">
    ${tList(about.story, locale)
      .map((para) => `<p>${esc(para)}</p>`)
      .join('\n')}
  </div>
</section>
<section class="section section-tint">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'قاعده‌های کاری ما', en: 'How we operate' }, locale))}</h2>
      <p>${esc(t({ fa: 'این چهار قاعده تعیین می‌کند چه کاری را قبول می‌کنیم و چه کاری را نه.', en: 'These four rules decide which work we take on and which we decline.' }, locale))}</p>
    </div>
    <div class="grid grid-2">
      ${about.principles
        .map(
          (p) => `<article class="card reveal">
        <h3>${esc(t(p.title, locale))}</h3>
        <p class="muted">${esc(t(p.text, locale))}</p>
      </article>`
        )
        .join('\n')}
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'چارچوبی که با آن کار می‌کنیم', en: 'The framework we work with' }, locale))}</h2>
    </div>
    <div class="grid grid-3">
      ${framework
        .map(
          (item) => `<article class="card framework-card reveal">
        <span class="framework-step" aria-hidden="true">${esc(item.step)}</span>
        <h3>${esc(t(item.title, locale))}</h3>
        <p class="muted">${esc(t(item.text, locale))}</p>
      </article>`
        )
        .join('\n')}
    </div>
    <ol class="process-list" style="margin-block-start:var(--space-3)">
      ${processSteps
        .map((step) => `<li><strong>${esc(t(step.title, locale))}</strong><span>${esc(t(step.text, locale))}</span></li>`)
        .join('\n')}
    </ol>
  </div>
</section>
<section class="section section-warm">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'چه کارهایی انجام می‌دهیم', en: 'What we do' }, locale))}</h2>
    </div>
    <div class="grid grid-3">${services.map((svc) => serviceTile(locale, svc)).join('\n')}</div>
  </div>
</section>
${testimonialBlock(locale)}
${ctaBand(locale, {
  title: t({ fa: 'اگر شبیه روش کاری ما فکر می‌کنید، حرف بزنیم', en: 'If this way of working fits, let’s talk' }, locale),
  text: t(
    { fa: 'یک جلسه‌ی ۳۰ دقیقه‌ای، بدون تعهد و بدون ارائه‌ی فروش.', en: 'A 30-minute call, no commitment and no sales pitch.' },
    locale
  ),
  location: 'about_final',
})}`;

  return layout(
    {
      locale,
      path: routes.about,
      navKey: 'about',
      pageId: 'about',
      title: t(about.metaTitle, locale),
      description: t(about.metaDescription, locale),
      schema: [organizationSchema(locale), breadcrumbSchema(locale, trail)],
      body,
    },
    assets
  );
}

/* ---------------------------------------------------------------- contact */

export function contactPage(locale, assets) {
  const str = s(locale);
  const trail = [
    { label: str.breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t({ fa: 'تماس', en: 'Contact' }, locale), href: localePath(routes.contact, locale) },
  ];

  const body = `<section class="hero-page">
  <div class="container">
    ${breadcrumbs(locale, [{ label: t({ fa: 'تماس', en: 'Contact' }, locale) }])}
    <div class="split split-top">
      <div>
        <h1>${esc(t(contact.title, locale))}</h1>
        <p class="lead">${esc(t(contact.lead, locale))}</p>
        <h2 style="font-size:var(--step-1);margin-block-start:var(--space-3)">${esc(t(contact.expectations.title, locale))}</h2>
        ${checkList(tList(contact.expectations.items, locale))}
      </div>
      <div>
        <h2 style="font-size:var(--step-1)">${esc(t(contact.formTitle, locale))}</h2>
        <p class="muted">${esc(t(contact.formNote, locale))}</p>
        ${leadForm(locale, 'consultation')}
      </div>
    </div>
  </div>
</section>
<section class="section" id="channels">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'راه‌های تماس', en: 'Ways to reach us' }, locale))}</h2>
      <p>${esc(t({ fa: 'هر کدام راحت‌تر است؛ همه به یک تیم می‌رسد.', en: 'Whichever suits you; they all reach the same team.' }, locale))}</p>
    </div>
    ${contactOptions(locale)}
  </div>
</section>
<section class="section section-tint" id="audit">
  <div class="container split split-top">
    <div>
      <h2>${esc(t({ fa: 'ترجیح می‌دهید اول یک ارزیابی رایگان بگیرید؟', en: 'Prefer a free audit first?' }, locale))}</h2>
      <p class="lead">${esc(
        t(
          {
            fa: 'آدرس سایت یا پیج‌تان را بفرستید؛ یک گزارش کوتاه از وضعیت امروز و سه پیشنهاد اولویت‌دار می‌دهیم.',
            en: 'Send your site or profile and we will send back a short report on where you stand, with three prioritised fixes.',
          },
          locale
        )
      )}</p>
    </div>
    <div>${leadForm(locale, 'audit')}</div>
  </div>
</section>
${faqBlock(locale, faq)}`;

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t(contact.metaTitle, locale),
    url: `${site.domain}${localePath(routes.contact, locale)}`,
    mainEntity: { '@id': `${site.domain}/#organization` },
  };

  return layout(
    {
      locale,
      path: routes.contact,
      navKey: 'contact',
      pageId: 'contact',
      title: t(contact.metaTitle, locale),
      description: t(contact.metaDescription, locale),
      schema: [contactSchema, organizationSchema(locale), breadcrumbSchema(locale, trail), faqSchema(faq, locale, t)],
      body,
    },
    assets
  );
}

/* ------------------------------------------------------------- thank you */

export function thankYouPage(locale, assets) {
  const links = [
    { label: t({ fa: 'صفحه‌ی بیدار', en: 'The Bidar page' }, locale), href: localePath(routes.bidar, locale) },
    { label: t({ fa: 'نمونه‌کارها', en: 'Case studies' }, locale), href: localePath(routes.caseStudies, locale) },
    { label: t({ fa: 'بلاگ', en: 'Blog' }, locale), href: localePath(routes.blog, locale) },
  ];

  const body = `<section class="hero-page">
  <div class="container container-narrow">
    <h1>${esc(t(thankYou.title, locale))}</h1>
    <p class="lead">${esc(t(thankYou.lead, locale))}</p>
    <div class="btn-row">
      <a class="btn btn-primary" href="${esc(site.contact.whatsapp)}" target="_blank" rel="noopener" data-event="whatsapp_click" data-event-location="thank_you">${esc(s(locale).whatsapp)}</a>
      <a class="btn btn-secondary" href="tel:${esc(site.contact.phone)}" data-event="call_click" data-event-location="thank_you">${esc(t(site.contact.phoneDisplay, locale))}</a>
    </div>
  </div>
</section>
<section class="section">
  <div class="container container-narrow">
    <p>${esc(t(thankYou.next, locale))}</p>
    <ul class="arrow-list">${links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')}</ul>
  </div>
</section>`;

  return layout(
    {
      locale,
      path: routes.thankYou,
      navKey: 'contact',
      pageId: 'thank_you',
      noindex: true,
      title: t(thankYou.metaTitle, locale),
      description: t(thankYou.metaDescription, locale),
      body,
    },
    assets
  );
}

/* ------------------------------------------------------------------- 404 */

export function notFoundPage(locale, assets) {
  const links = [
    { label: t({ fa: 'خانه', en: 'Home' }, locale), href: localePath(routes.home, locale) },
    { label: t({ fa: 'خدمات', en: 'Services' }, locale), href: localePath(routes.services, locale) },
    { label: t({ fa: 'بیدار', en: 'Bidar' }, locale), href: localePath(routes.bidar, locale) },
    { label: t({ fa: 'تماس', en: 'Contact' }, locale), href: localePath(routes.contact, locale) },
  ];

  const body = `<section class="hero-page">
  <div class="container container-narrow">
    <h1>${esc(t(notFound.title, locale))}</h1>
    <p class="lead">${esc(t(notFound.lead, locale))}</p>
    <ul class="arrow-list">${links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join('')}</ul>
    <div class="btn-row">
      <a class="btn btn-primary" href="${esc(t(primaryCta.path, locale))}" data-event="${primaryCta.event}" data-event-location="not_found">${esc(t(primaryCta.label, locale))}</a>
      <a class="btn btn-secondary" href="${esc(t(secondaryCta.path, locale))}" data-event="${secondaryCta.event}" data-event-location="not_found">${esc(t(secondaryCta.label, locale))}</a>
    </div>
  </div>
</section>`;

  return layout(
    {
      locale,
      path: routes.notFound,
      navKey: null,
      pageId: 'not_found',
      noindex: true,
      title: t(notFound.metaTitle, locale),
      description: t(notFound.title, locale),
      body,
    },
    assets
  );
}
