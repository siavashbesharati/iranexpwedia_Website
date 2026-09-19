import { esc, markPlaceholders } from '../lib/html.js';
import { t, tList } from '../lib/i18n.js';
import { routes, localePath } from '../lib/routes.js';
import { site, primaryCta } from '../data/site.js';
import { caseStudies, caseStudiesPage } from '../data/case-studies.js';
import { services } from '../data/services.js';
import { layout, breadcrumbSchema } from '../templates/layout.js';
import { s, breadcrumbs, ctaBand, arrowList, checkList, serviceTile } from '../templates/components.js';

function resultGrid(study, locale) {
  const results = t(study.results, locale) || [];
  return `<ul class="result-grid">
    ${results
      .map(
        (r) => `<li><span class="result-metric">${markPlaceholders(r.metric)}</span><span class="result-label">${esc(r.label)}</span></li>`
      )
      .join('\n')}
  </ul>`;
}

/* ------------------------------------------------------------ index page -- */

export function caseStudiesPageTemplate(locale, assets) {
  const str = s(locale);
  const trail = [
    { label: str.breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t({ fa: 'نمونه‌کارها', en: 'Case studies' }, locale), href: localePath(routes.caseStudies, locale) },
  ];

  const cards = caseStudies
    .map(
      (study) => `<article class="card case-card reveal">
    <div class="case-meta"><span>${esc(t(study.industry, locale))}</span><span>${esc(t(study.client, locale))}</span></div>
    <h2 style="font-size:var(--step-2)"><a href="${esc(localePath(routes.caseStudy(study.slug), locale))}">${esc(t(study.title, locale))}</a></h2>
    <p class="muted">${esc(t(study.problem, locale))}</p>
    ${resultGrid(study, locale)}
    <a class="link-arrow" href="${esc(localePath(routes.caseStudy(study.slug), locale))}">${esc(t({ fa: 'جزئیات اجرا', en: 'How we did it' }, locale))}</a>
  </article>`
    )
    .join('\n');

  const body = `<section class="hero-page">
  <div class="container">
    ${breadcrumbs(locale, [{ label: t({ fa: 'نمونه‌کارها', en: 'Case studies' }, locale) }])}
    <h1>${esc(t({ fa: 'نتیجه‌ها، بدون اغراق', en: 'Results, without the spin' }, locale))}</h1>
    <p class="lead">${esc(t(caseStudiesPage.lead, locale))}</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="grid" style="gap:var(--space-3)">${cards}</div>
  </div>
</section>
${ctaBand(locale, {
  title: t({ fa: 'نتیجه‌ی مشابه برای کسب‌وکار شما', en: 'The same kind of result for your business' }, locale),
  text: t(
    {
      fa: 'در جلسه‌ی مشاوره می‌گوییم کدام‌یک از این مسیرها به وضعیت شما نزدیک‌تر است.',
      en: 'On the consultation call we tell you which of these paths is closest to your situation.',
    },
    locale
  ),
  location: 'case_studies_final',
})}`;

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: caseStudies.map((study, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t(study.title, locale),
      url: `${site.domain}${localePath(routes.caseStudy(study.slug), locale)}`,
    })),
  };

  return layout(
    {
      locale,
      path: routes.caseStudies,
      navKey: 'case-studies',
      pageId: 'case_studies',
      title: t(caseStudiesPage.metaTitle, locale),
      description: t(caseStudiesPage.metaDescription, locale),
      schema: [itemList, breadcrumbSchema(locale, trail)],
      body,
    },
    assets
  );
}

/* ----------------------------------------------------------- detail page -- */

export function caseStudyPage(locale, study, assets) {
  const str = s(locale);
  const path = routes.caseStudy(study.slug);
  const relatedService = services.find((svc) => svc.slug === study.service);

  const trail = [
    { label: str.breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t({ fa: 'نمونه‌کارها', en: 'Case studies' }, locale), href: localePath(routes.caseStudies, locale) },
    { label: t(study.title, locale), href: localePath(path, locale) },
  ];

  const body = `<section class="hero-page">
  <div class="container container-narrow">
    ${breadcrumbs(locale, [
      { label: t({ fa: 'نمونه‌کارها', en: 'Case studies' }, locale), href: localePath(routes.caseStudies, locale) },
      { label: t(study.title, locale) },
    ])}
    <div class="case-meta" style="margin-block-end:var(--space-2)">
      <span>${esc(t(study.industry, locale))}</span><span>${esc(t(study.client, locale))}</span>
    </div>
    <h1>${esc(t(study.title, locale))}</h1>
  </div>
</section>
<section class="section">
  <div class="container container-narrow">
    <div class="case-block">
      <div>
        <p class="case-stage">${esc(str.problem)}</p>
        <p>${esc(t(study.problem, locale))}</p>
      </div>
    </div>
    <div class="case-block">
      <div>
        <p class="case-stage">${esc(str.whatWeDid)}</p>
        ${arrowList(tList(study.actions, locale))}
      </div>
    </div>
    <div class="case-block">
      <div>
        <p class="case-stage">${esc(str.result)}</p>
        ${resultGrid(study, locale)}
        <p class="muted" style="margin-block-start:var(--space-2)">${esc(
          t(
            {
              fa: 'اعداد نشان‌داده‌شده با [X] هنوز با مشتری نهایی نشده‌اند و به‌محض تأیید جایگزین می‌شوند.',
              en: 'Values shown as [X] are not yet confirmed with the client and will be replaced once they are.',
            },
            locale
          )
        )}</p>
      </div>
    </div>
    <blockquote class="prose" style="max-width:none">
      <p>${esc(t(study.quote, locale))}</p>
      <footer class="muted">— ${esc(t(study.quoteBy, locale))}</footer>
    </blockquote>
  </div>
</section>
${
  relatedService
    ? `<section class="section section-tint">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'خدمتی که در این پروژه اجرا شد', en: 'The service behind this project' }, locale))}</h2>
    </div>
    <div class="grid grid-2">
      ${serviceTile(locale, relatedService)}
      <div class="card">
        <h3>${esc(t({ fa: 'وضعیت شما شبیه این است؟', en: 'Does this sound like you?' }, locale))}</h3>
        ${checkList(tList(relatedService.problem, locale))}
      </div>
    </div>
  </div>
</section>`
    : ''
}
${ctaBand(locale, {
  title: t({ fa: 'بیایید عددهای شما را ببینیم', en: 'Let’s look at your numbers' }, locale),
  text: t(
    {
      fa: 'در ۳۰ دقیقه می‌گوییم کدام تغییر بیشترین اثر را روی فروش شما دارد.',
      en: 'In 30 minutes we tell you which change moves your sales the most.',
    },
    locale
  ),
  location: `case_${study.slug}_final`,
})}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(study.title, locale),
    description: t(study.metaDescription, locale),
    inLanguage: locale === 'fa' ? 'fa-IR' : 'en',
    author: { '@id': `${site.domain}/#organization` },
    publisher: { '@id': `${site.domain}/#organization` },
    mainEntityOfPage: `${site.domain}${localePath(path, locale)}`,
    about: relatedService ? t(relatedService.title, locale) : undefined,
  };

  return layout(
    {
      locale,
      path,
      navKey: 'case-studies',
      pageId: `case_${study.slug}`,
      ogType: 'article',
      title: t(study.metaTitle, locale),
      description: t(study.metaDescription, locale),
      schema: [schema, breadcrumbSchema(locale, trail)],
      body,
    },
    assets
  );
}
