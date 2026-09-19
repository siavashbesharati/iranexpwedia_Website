import { esc } from '../lib/html.mjs';
import { t, tList } from '../lib/i18n.mjs';
import { routes } from '../lib/routes.mjs';
import { site, primaryCta, packageOffer } from '../data/site.mjs';
import { story } from '../data/story.mjs';
import { faq } from '../data/pages.mjs';
import { layout, organizationSchema, websiteSchema, faqSchema } from '../templates/layout.mjs';
import { faqBlock, testimonialBlock } from '../templates/components.mjs';

function priceBlock(locale, { large = false } = {}) {
  return `<p class="story-price${large ? ' is-large' : ''}">
  <span class="story-price-amount">${esc(t(packageOffer.toman, locale))}</span>
  <span class="story-price-unit">${esc(t(packageOffer.unit, locale))}</span>
</p>`;
}

function ctaLink(locale, location, extraClass = '') {
  return `<a class="btn btn-primary${extraClass ? ` ${extraClass}` : ''}" href="${esc(t(primaryCta.path, locale))}" data-event="${primaryCta.event}" data-event-location="${esc(location)}">${esc(t(primaryCta.label, locale))}</a>`;
}

function imageSlot(locale, image, ratio = '4 / 3') {
  return `<figure class="image-slot" style="--ratio:${ratio}">
  <div class="image-slot-frame" role="img" aria-label="${esc(t(image.label, locale))}">
    <img src="${esc(image.src)}" alt="${esc(t(image.label, locale))}" loading="lazy" decoding="async" />
    <span class="image-slot-title">${esc(t(image.label, locale))}</span>
  </div>
  <figcaption>${esc(t(image.note, locale))}</figcaption>
</figure>`;
}

function chapterHead(locale, chapter) {
  return `<header class="story-head">
    <p class="story-num" aria-hidden="true">${esc(chapter.num)}</p>
    <p class="story-kicker">${esc(t(chapter.kicker, locale))}</p>
    <h2>${esc(t(chapter.title, locale))}</h2>
    <p class="story-lead">${esc(t(chapter.lead, locale))}</p>
  </header>`;
}

export function homePage(locale, assets) {
  const chapters = story.chapters;
  const [understand, roadmap, build, acquire, retain, team, forward] = chapters;

  const rail = `<nav class="story-rail" aria-label="${esc(t({ fa: 'فصل‌های داستان', en: 'Chapters' }, locale))}">
    ${chapters
      .map(
        (ch, i) =>
          `<a href="#${esc(ch.id)}" data-chapter="${esc(ch.id)}"${i === 0 ? ' class="is-active"' : ''}><span>${esc(ch.num)}</span><b>${esc(t(ch.kicker, locale))}</b></a>`
      )
      .join('')}
  </nav>`;

  const heroPillars = tList(story.hero.pillars, locale)
    .map(
      (item, i) => `<li class="parallel-card" style="--i:${i}">
      <span class="parallel-num">${esc(item.num)}</span>
      <strong>${esc(item.k)}</strong>
      <span>${esc(item.v)}</span>
    </li>`
    )
    .join('');

  const hero = `<section class="story-hero" id="top">
  <div class="story-hero-wash" aria-hidden="true"></div>
  <div class="story-shell">
    <p class="story-kicker is-hero">${esc(t(story.hero.kicker, locale))}</p>
    <h1>${esc(t(story.hero.title, locale))}</h1>
    <ol class="parallel-row">${heroPillars}</ol>
    <p class="story-hero-support">${esc(t(story.hero.support, locale))}</p>
    ${priceBlock(locale)}
    <div class="story-hero-actions">
      ${ctaLink(locale, 'hero')}
    </div>
    <a class="story-scroll" href="#overwhelm">${esc(t(story.hero.scroll, locale))}</a>
  </div>
</section>`;

  const lossItems = tList(story.overwhelm.losses, locale)
    .map(
      (item, i) => `<li class="parallel-card" style="--i:${i}">
      <span class="parallel-num">${esc(item.num)}</span>
      <strong>${esc(item.k)}</strong>
      <span>${esc(item.v)}</span>
    </li>`
    )
    .join('');

  const overwhelm = `<section class="story-chapter is-overwhelm" id="overwhelm">
  <div class="story-shell">
    <h2>${esc(t(story.overwhelm.title, locale))}</h2>
    <ol class="parallel-row">${lossItems}</ol>
    <p class="story-after">${esc(t(story.overwhelm.after, locale))}</p>
    <p class="story-bridge">${esc(t(story.overwhelm.bridge, locale))}</p>
  </div>
</section>`;

  const understandScan = tList(understand.items, locale)
    .map((item, i) => `<li style="--i:${i}"><i></i><span>${esc(item)}</span></li>`)
    .join('');

  const chUnderstand = `<section class="story-chapter" id="${understand.id}" data-chapter="${understand.id}">
  <div class="story-shell story-split">
    <div>
      ${chapterHead(locale, understand)}
      <ol class="scan-list">${understandScan}</ol>
    </div>
    <div class="story-visual">
      <div class="scan-rings" aria-hidden="true">
        <span></span><span></span><span></span>
        <b></b>
      </div>
      ${imageSlot(locale, understand.image, '5 / 4')}
    </div>
  </div>
</section>`;

  const roadmapStages = tList(roadmap.stages, locale)
    .map(
      (stage, i) => `<li style="--i:${i}">
      <strong>${esc(stage.k)}</strong>
      <span>${esc(stage.v)}</span>
    </li>`
    )
    .join('');

  const chRoadmap = `<section class="story-chapter is-tint" id="${roadmap.id}" data-chapter="${roadmap.id}">
  <div class="story-shell story-split">
    <div>
      ${chapterHead(locale, roadmap)}
      <ol class="path-line">${roadmapStages}</ol>
    </div>
    <div class="story-visual">
      ${imageSlot(locale, roadmap.image, '5 / 4')}
    </div>
  </div>
</section>`;

  const buildGroups = build.groups
    .map(
      (group) => `<div class="stack-group">
      <h3>${esc(t(group.title, locale))}</h3>
      <ol class="stack-list">
        ${tList(group.items, locale)
          .map((item, i) => `<li style="--i:${i}">${esc(item)}</li>`)
          .join('')}
      </ol>
    </div>`
    )
    .join('');

  const chBuild = `<section class="story-chapter" id="${build.id}" data-chapter="${build.id}">
  <div class="story-shell story-split">
    <div>
      ${chapterHead(locale, build)}
      <div class="stack-board">${buildGroups}</div>
    </div>
    <div class="story-visual">
      ${imageSlot(locale, build.image, '4 / 5')}
    </div>
  </div>
</section>`;

  const funnelSteps = tList(acquire.funnel, locale)
    .map(
      (step, i) => `<li style="--i:${i}; --w:${100 - i * 12}%">
      <strong>${esc(step.k)}</strong>
      <span>${esc(step.v)}</span>
    </li>`
    )
    .join('');

  const chAcquire = `<section class="story-chapter is-tint" id="${acquire.id}" data-chapter="${acquire.id}">
  <div class="story-shell story-split">
    <div>
      ${chapterHead(locale, acquire)}
      <ol class="funnel">${funnelSteps}</ol>
    </div>
    <div class="story-visual">
      ${imageSlot(locale, acquire.image, '5 / 4')}
    </div>
  </div>
</section>`;

  const cycleSteps = tList(retain.cycle, locale)
    .map(
      (step, i) => `<li style="--i:${i}">
      <strong>${esc(step.k)}</strong>
      <span>${esc(step.v)}</span>
    </li>`
    )
    .join('');

  const extras = tList(retain.extras, locale)
    .map((item) => `<li>${esc(item)}</li>`)
    .join('');

  const chRetain = `<section class="story-chapter" id="${retain.id}" data-chapter="${retain.id}">
  <div class="story-shell story-split">
    <div>
      ${chapterHead(locale, retain)}
      <ol class="orbit">${cycleSteps}</ol>
      <ul class="quiet-row">${extras}</ul>
    </div>
    <div class="story-visual">
      ${imageSlot(locale, retain.image, '5 / 4')}
    </div>
  </div>
</section>`;

  const pillars = tList(team.pillars, locale)
    .map(
      (p, i) => `<li style="--i:${i}">
      <strong>${esc(p.k)}</strong>
      <span>${esc(p.v)}</span>
    </li>`
    )
    .join('');

  const chTeam = `<section class="story-chapter is-warm" id="${team.id}" data-chapter="${team.id}">
  <div class="story-shell story-split">
    <div>
      ${chapterHead(locale, team)}
      <ol class="pillars">${pillars}</ol>
    </div>
    <div class="story-visual">
      ${imageSlot(locale, team.image, '5 / 4')}
    </div>
  </div>
</section>`;

  const forwardItems = tList(forward.items, locale)
    .map((item, i) => `<li style="--i:${i}">${esc(item)}</li>`)
    .join('');

  const chForward = `<section class="story-chapter" id="${forward.id}" data-chapter="${forward.id}">
  <div class="story-shell story-split">
    <div>
      ${chapterHead(locale, forward)}
      <ol class="horizon">${forwardItems}</ol>
    </div>
    <div class="story-visual">
      ${imageSlot(locale, forward.image, '5 / 4')}
    </div>
  </div>
</section>`;

  const roles = tList(story.reveal.roles, locale)
    .map((role, i) => `<li style="--i:${i}">${esc(role)}</li>`)
    .join('');

  const collapse = tList(story.reveal.collapse, locale)
    .map((line, i) => `<li style="--i:${i}">${esc(line)}</li>`)
    .join('');

  const reveal = `<section class="story-chapter is-reveal" id="pricing" data-chapter="pricing">
  <div class="story-shell">
    <p class="story-kicker">${esc(t(story.reveal.before, locale))}</p>
    <ul class="role-cloud">${roles}</ul>
    <p class="story-collapse-label">${esc(t({ fa: 'به‌جای همه‌ی این‌ها:', en: 'Instead of all of that:' }, locale))}</p>
    <ul class="collapse-list">${collapse}</ul>
    <h2>${esc(t(story.reveal.title, locale))}</h2>
    ${priceBlock(locale, { large: true })}
    <p class="story-lead">${esc(t(story.reveal.lead, locale))}</p>
    <div class="story-hero-actions">
      ${ctaLink(locale, 'pricing')}
    </div>
  </div>
</section>`;

  const reviews = testimonialBlock(locale, {
    title: t(story.reviewsTitle, locale),
    lead: t(story.reviewsLead, locale),
    variant: 'home',
  });

  const faqSection = faqBlock(locale, faq);

  const body = [
    rail,
    hero,
    overwhelm,
    chUnderstand,
    chRoadmap,
    chBuild,
    chAcquire,
    chRetain,
    chTeam,
    chForward,
    reveal,
    reviews,
    faqSection,
  ].join('\n');

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: t({ fa: 'بسته‌ی ماهانه‌ی رشد کسب‌وکار', en: 'Monthly business growth package' }, locale),
    description: t(story.metaDescription, locale),
    price: String(packageOffer.irr),
    priceCurrency: 'IRR',
    unitText: 'MONTH',
    availability: 'https://schema.org/InStock',
    url: `${site.domain}/`,
    seller: { '@id': `${site.domain}/#organization` },
  };

  return layout(
    {
      locale,
      path: routes.home,
      navKey: 'home',
      pageId: 'home',
      bodyClass: 'is-story',
      title: t(story.metaTitle, locale),
      description: t(story.metaDescription, locale),
      schema: [organizationSchema(locale), websiteSchema(locale), offerSchema, faqSchema(faq, locale, t)],
      body,
    },
    assets
  );
}
