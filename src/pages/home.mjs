import { esc, markPlaceholders } from '../lib/html.mjs';
import { t, tList } from '../lib/i18n.mjs';
import { routes, localePath } from '../lib/routes.mjs';
import { site, primaryCta, secondaryCta, demoCta, framework, frameworkOutcome, processSteps } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { caseStudies } from '../data/case-studies.mjs';
import { home, faq } from '../data/pages.mjs';
import { layout, organizationSchema, websiteSchema, faqSchema } from '../templates/layout.mjs';
import {
  s,
  trustStrip,
  ctaBand,
  faqBlock,
  testimonialBlock,
  leadForm,
  serviceTile,
  checkList,
} from '../templates/components.mjs';
import { iconTile } from '../templates/icons.mjs';
import { unifiedInboxVisual, tagBoardVisual } from '../templates/visuals.mjs';

export function homePage(locale, assets) {
  const str = s(locale);
  const servicePath = (slug) => localePath(routes.service(slug), locale);

  /* 1. Hero */
  const hero = `<section class="hero">
  <div class="container hero-grid">
    <div>
      <p class="eyebrow">${esc(t(home.hero.eyebrow, locale))}</p>
      <h1>${esc(t(home.hero.title, locale))}</h1>
      <p class="lead">${esc(t(home.hero.lead, locale))}</p>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="${esc(t(primaryCta.path, locale))}" data-event="${primaryCta.event}" data-event-location="hero">${esc(t(primaryCta.label, locale))}</a>
        <a class="btn btn-secondary btn-lg" href="${esc(t(secondaryCta.path, locale))}" data-event="${secondaryCta.event}" data-event-location="hero">${esc(t(secondaryCta.label, locale))}</a>
      </div>
      <p class="hero-note">${esc(t(home.hero.reassurance, locale))}</p>
    </div>
    <div class="hero-visual">
      <div class="product-frame">${unifiedInboxVisual(locale)}</div>
      <p class="product-caption">${esc(t(site.product.tagline, locale))}</p>
    </div>
  </div>
</section>`;

  /* 3. Problem → solution */
  const painCards = home.problem.items
    .map(
      (item) => `<article class="card pain-card reveal">
      <p class="pain-quote">${esc(t(item.pain, locale))}</p>
      <dl class="pain-line">
        <dt>${esc(t({ fa: 'علت', en: 'Cause' }, locale))}</dt><dd>${esc(t(item.cause, locale))}</dd>
        <dt>${esc(t({ fa: 'راه‌حل', en: 'Fix' }, locale))}</dt><dd>${esc(t(item.fix, locale))}</dd>
      </dl>
      <a class="link-arrow" href="${esc(servicePath(item.service))}">${esc(t({ fa: 'راه‌حل مرتبط', en: 'The related service' }, locale))}</a>
    </article>`
    )
    .join('\n');

  const problem = `<section class="section">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t(home.problem.title, locale))}</h2>
      <p>${esc(t(home.problem.lead, locale))}</p>
    </div>
    <div class="grid grid-3">${painCards}</div>
  </div>
</section>`;

  /* 4. Growth framework */
  const frameworkCards = framework
    .map(
      (item) => `<article class="card framework-card reveal">
      <span class="framework-step" aria-hidden="true">${esc(item.step)}</span>
      <h3>${esc(t(item.title, locale))}</h3>
      <p class="muted">${esc(t(item.text, locale))}</p>
    </article>`
    )
    .join('\n');

  const frameworkSection = `<section class="section section-tint" id="framework">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t(home.frameworkSection.title, locale))}</h2>
      <p>${esc(t(home.frameworkSection.lead, locale))}</p>
    </div>
    <div class="grid grid-3">${frameworkCards}</div>
    <div class="framework-outcome reveal">
      <h3>${esc(t(frameworkOutcome.title, locale))}</h3>
      <p>${esc(t(frameworkOutcome.text, locale))}</p>
    </div>
  </div>
</section>`;

  /* 5. Services by outcome (5 outcomes + the product = 6 tiles) */
  const bidarTile = `<a class="card card-link reveal" href="${esc(localePath(routes.bidar, locale))}">
  ${iconTile('inbox')}
  <h3>${esc(t(site.product.name, locale))}</h3>
  <p class="muted">${esc(t(site.product.tagline, locale))}</p>
</a>`;

  const servicesSection = `<section class="section" id="services">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t(home.servicesSection.title, locale))}</h2>
      <p>${esc(t(home.servicesSection.lead, locale))}</p>
    </div>
    <div class="grid grid-3">
      ${services.map((svc) => serviceTile(locale, svc)).join('\n')}
      ${bidarTile}
    </div>
    <p style="margin-block-start:var(--space-3)"><a class="link-arrow" href="${esc(localePath(routes.services, locale))}">${esc(t({ fa: 'همه‌ی خدمات و جزئیات', en: 'All services in detail' }, locale))}</a></p>
  </div>
</section>`;

  /* 6. How we work */
  const processSection = `<section class="section section-warm" id="process">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t(home.processSection.title, locale))}</h2>
      <p>${esc(t(home.processSection.lead, locale))}</p>
    </div>
    <ol class="process-list reveal">
      ${processSteps
        .map((step) => `<li><strong>${esc(t(step.title, locale))}</strong><span>${esc(t(step.text, locale))}</span></li>`)
        .join('\n')}
    </ol>
  </div>
</section>`;

  /* 7. Bidar spotlight */
  const bidarSection = `<section class="section" id="bidar">
  <div class="container split">
    <div>
      <p class="eyebrow">${esc(t(home.bidarSection.eyebrow, locale))}</p>
      <h2>${esc(t(home.bidarSection.title, locale))}</h2>
      <p class="lead">${esc(t(home.bidarSection.lead, locale))}</p>
      ${checkList(tList(home.bidarSection.bullets, locale))}
      <ul class="channel-pills">
        <li><span class="channel-dot is-whatsapp"></span>${esc(t({ fa: 'واتساپ', en: 'WhatsApp' }, locale))}</li>
        <li><span class="channel-dot is-divar"></span>${esc(t({ fa: 'دیوار', en: 'Divar' }, locale))}</li>
        <li><span class="channel-dot is-bale"></span>${esc(t({ fa: 'بله', en: 'Bale' }, locale))}</li>
      </ul>
      <div class="btn-row">
        <a class="btn btn-primary" href="${esc(localePath(routes.bidar, locale))}" data-event="${secondaryCta.event}" data-event-location="bidar_spotlight">${esc(t({ fa: 'صفحه‌ی بیدار', en: 'See Bidar' }, locale))}</a>
        <a class="btn btn-secondary" href="${esc(t(demoCta.path, locale))}" data-event="${demoCta.event}" data-event-location="bidar_spotlight">${esc(t(demoCta.label, locale))}</a>
      </div>
    </div>
    <div class="reveal">
      <div class="product-frame">${tagBoardVisual(locale)}</div>
      <p class="product-caption">${esc(t({ fa: 'تگ‌گذاری خودکار لید و فیلتر کمپین در بیدار', en: 'Automatic lead tagging and campaign filters in Bidar' }, locale))}</p>
    </div>
  </div>
</section>`;

  /* 8. Case studies */
  const caseCards = caseStudies
    .slice(0, 3)
    .map((study) => {
      const results = (t(study.results, locale) || []).slice(0, 2);
      return `<article class="card case-card reveal">
      <div class="case-meta"><span>${esc(t(study.industry, locale))}</span><span>${esc(t(study.client, locale))}</span></div>
      <h3>${esc(t(study.title, locale))}</h3>
      <p class="muted">${esc(t(study.problem, locale).slice(0, 150))}…</p>
      <ul class="result-grid">
        ${results
          .map(
            (r) => `<li><span class="result-metric">${markPlaceholders(r.metric)}</span><span class="result-label">${esc(r.label)}</span></li>`
          )
          .join('')}
      </ul>
      <a class="link-arrow" href="${esc(localePath(routes.caseStudy(study.slug), locale))}">${esc(t({ fa: 'خواندن نمونه‌کار', en: 'Read the case study' }, locale))}</a>
    </article>`;
    })
    .join('\n');

  const caseSection = `<section class="section section-tint" id="results">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t(home.caseSection.title, locale))}</h2>
      <p>${esc(t(home.caseSection.lead, locale))}</p>
    </div>
    <div class="grid grid-3">${caseCards}</div>
  </div>
</section>`;

  /* 9. Lead magnet */
  const leadMagnet = `<section class="section" id="audit">
  <div class="container split split-top">
    <div>
      <p class="eyebrow">${esc(t(home.leadMagnet.eyebrow, locale))}</p>
      <h2>${esc(t(home.leadMagnet.title, locale))}</h2>
      <p class="lead">${esc(t(home.leadMagnet.lead, locale))}</p>
      ${checkList(tList(home.leadMagnet.bullets, locale))}
    </div>
    <div class="reveal">${leadForm(locale, 'audit')}</div>
  </div>
</section>`;

  /* 10. Testimonials + FAQ */
  const testimonialsSection = testimonialBlock(locale, {
    title: t(home.testimonialSection.title, locale),
    lead: t(home.testimonialSection.lead, locale),
  });

  const faqSection = faqBlock(locale, faq, { title: str.faqTitle });

  /* 11. Final CTA */
  const finalCta = ctaBand(locale, {
    title: t(home.finalCta.title, locale),
    text: t(home.finalCta.lead, locale),
    location: 'home_final',
  });

  const body = [
    hero,
    trustStrip(locale),
    problem,
    frameworkSection,
    servicesSection,
    processSection,
    bidarSection,
    caseSection,
    leadMagnet,
    testimonialsSection,
    faqSection,
    finalCta,
  ].join('\n');

  return layout(
    {
      locale,
      path: routes.home,
      navKey: 'home',
      pageId: 'home',
      title: t(home.metaTitle, locale),
      description: t(home.metaDescription, locale),
      schema: [organizationSchema(locale), websiteSchema(locale), faqSchema(faq, locale, t)],
      body,
    },
    assets
  );
}
