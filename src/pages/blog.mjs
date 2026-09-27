import { esc } from '../lib/html.mjs';
import { t, formatDate, readingTime } from '../lib/i18n.mjs';
import { routes, localePath } from '../lib/routes.mjs';
import { site, ogImage, primaryCta, demoCta } from '../data/site.mjs';
import { posts, categories, blogPage } from '../data/blog.mjs';
import { markdownToHtml, markdownWordCount } from '../lib/markdown.mjs';
import { layout, breadcrumbSchema } from '../templates/layout.mjs';
import { s, breadcrumbs, ctaBand, inlineCta, leadForm } from '../templates/components.mjs';

const sortPosts = (items) => [...items].sort((a, b) => (a.date < b.date ? 1 : -1));
const sortedPosts = sortPosts(posts);

function categoryOf(slug) {
  return categories.find((cat) => cat.slug === slug);
}

function postCard(locale, post) {
  const cat = categoryOf(post.category);
  return `<article class="card post-card reveal">
  <div class="post-meta">
    <span class="category-pill">${esc(t(cat.title, locale))}</span>
    <time datetime="${post.date}">${esc(formatDate(post.date, locale))}</time>
    <span class="dot"></span>
    <span>${esc(readingTime(post.readingMinutes, locale))}</span>
  </div>
  <h3><a href="${esc(localePath(routes.post(post.slug), locale))}">${esc(t(post.title, locale))}</a></h3>
  <p class="muted">${esc(t(post.description, locale))}</p>
  <a class="link-arrow" href="${esc(localePath(routes.post(post.slug), locale))}">${esc(s(locale).readMore)}</a>
</article>`;
}

function categoryNav(locale, activeSlug) {
  const items = [
    `<li><a href="${esc(localePath(routes.blog, locale))}"${!activeSlug ? ' aria-current="page"' : ''}>${esc(t({ fa: 'همه', en: 'All' }, locale))}</a></li>`,
    ...categories.map(
      (cat) =>
        `<li><a href="${esc(localePath(routes.blogCategory(cat.slug), locale))}"${activeSlug === cat.slug ? ' aria-current="page"' : ''}>${esc(t(cat.title, locale))}</a></li>`
    ),
  ];
  return `<ul class="category-nav">${items.join('')}</ul>`;
}

/* ------------------------------------------------------------- blog index -- */

export function blogIndexPage(locale, assets, allPosts = posts) {
  const pagePosts = sortPosts(allPosts);
  const str = s(locale);
  const trail = [
    { label: str.breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t({ fa: 'بلاگ', en: 'Blog' }, locale), href: localePath(routes.blog, locale) },
  ];

  const body = `<section class="hero-page">
  <div class="container">
    ${breadcrumbs(locale, [{ label: t({ fa: 'بلاگ', en: 'Blog' }, locale) }])}
    <h1>${esc(t({ fa: 'ایده و تجربه برای ساختن کسب‌وکار بهتر', en: 'Ideas and field notes for building better businesses' }, locale))}</h1>
    <p class="lead">${esc(t(blogPage.lead, locale))}</p>
  </div>
</section>
<section class="section">
  <div class="container">
    ${categoryNav(locale)}
    <div class="grid grid-2">${pagePosts.map((post) => postCard(locale, post)).join('\n')}</div>
  </div>
</section>
${ctaBand(locale, {
  title: t({ fa: 'از خواندن به اجرا', en: 'From reading to doing' }, locale),
  text: t(
    {
      fa: 'اگر می‌خواهید همین موضوع‌ها را روی کسب‌وکار خودتان اجرا کنید، یک جلسه‌ی مشاوره بگذارید.',
      en: 'If you want these applied to your own business, book a consultation.',
    },
    locale
  ),
  location: 'blog_final',
})}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: t(blogPage.metaTitle, locale),
    url: `${site.domain}${localePath(routes.blog, locale)}`,
    inLanguage: locale === 'fa' ? 'fa-IR' : 'en',
    publisher: { '@id': `${site.domain}/#organization` },
    blogPost: pagePosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: t(post.title, locale),
      url: `${site.domain}${localePath(routes.post(post.slug), locale)}`,
      datePublished: post.date,
    })),
  };

  return layout(
    {
      locale,
      path: routes.blog,
      navKey: 'blog',
      pageId: 'blog',
      title: t(blogPage.metaTitle, locale),
      description: t(blogPage.metaDescription, locale),
      schema: [schema, breadcrumbSchema(locale, trail)],
      body,
    },
    assets
  );
}

/* ---------------------------------------------------------- category page -- */

export function blogCategoryPage(locale, category, assets, allPosts = posts) {
  const str = s(locale);
  const path = routes.blogCategory(category.slug);
  const items = sortPosts(allPosts).filter((post) => post.category === category.slug);

  const trail = [
    { label: str.breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t({ fa: 'بلاگ', en: 'Blog' }, locale), href: localePath(routes.blog, locale) },
    { label: t(category.title, locale), href: localePath(path, locale) },
  ];

  const body = `<section class="hero-page">
  <div class="container">
    ${breadcrumbs(locale, [
      { label: t({ fa: 'بلاگ', en: 'Blog' }, locale), href: localePath(routes.blog, locale) },
      { label: t(category.title, locale) },
    ])}
    <h1>${esc(t(category.title, locale))}</h1>
    <p class="lead">${esc(t(category.description, locale))}</p>
  </div>
</section>
<section class="section">
  <div class="container">
    ${categoryNav(locale, category.slug)}
    <div class="grid grid-2">${
      items.length
        ? items.map((post) => postCard(locale, post)).join('\n')
        : `<p class="muted">${esc(t({ fa: 'به‌زودی در این دسته می‌نویسیم.', en: 'We are writing in this category soon.' }, locale))}</p>`
    }</div>
  </div>
</section>
${ctaBand(locale, {
  title: t({ fa: 'سوالی در همین حوزه دارید؟', en: 'Have a question in this area?' }, locale),
  text: t(
    { fa: 'در جلسه‌ی مشاوره مستقیم روی وضعیت خودتان حرف می‌زنیم.', en: 'On the consultation call we talk about your specific situation.' },
    locale
  ),
  location: `blog_category_${category.slug}`,
})}`;

  return layout(
    {
      locale,
      path,
      navKey: 'blog',
      pageId: `blog_category_${category.slug}`,
      title: `${t(category.title, locale)} | ${t(site.name, locale)}`,
      description: t(category.description, locale),
      schema: [breadcrumbSchema(locale, trail)],
      body,
    },
    assets
  );
}

/* -------------------------------------------------------------- post page -- */

const postCtas = {
  consultation: (locale) => ({
    text: t(
      {
        fa: 'می‌خواهید همین کارها روی کسب‌وکار خودتان اجرا شود؟ یک جلسه‌ی ۳۰ دقیقه‌ای بگذارید.',
        en: 'Want this applied to your own business? Book a 30-minute call.',
      },
      locale
    ),
    label: t(primaryCta.label, locale),
    href: t(primaryCta.path, locale),
    event: primaryCta.event,
  }),
  demo: (locale) => ({
    text: t(
      {
        fa: 'می‌خواهید ببینید این روی پیام‌های خودتان چطور کار می‌کند؟ دموی بیدار را ببینید.',
        en: 'Want to see this working on your own messages? Take a Bidar demo.',
      },
      locale
    ),
    label: t(demoCta.label, locale),
    href: t(demoCta.path, locale),
    event: demoCta.event,
  }),
  audit: (locale) => ({
    text: t(
      {
        fa: 'ارزیابی رایگان حضور دیجیتال بگیرید و سه کار مؤثر بعدی را بدانید.',
        en: 'Get the free digital presence audit and learn your next three fixes.',
      },
      locale
    ),
    label: t({ fa: 'درخواست ارزیابی رایگان', en: 'Request the free audit' }, locale),
    href: `${t(primaryCta.path, locale)}#audit`,
    event: 'audit_request',
  }),
};

function renderBlocks(blocks) {
  return blocks
    .map((block) => {
      if (block.h2) return `<h2>${esc(block.h2)}</h2>`;
      if (block.p) return `<p>${esc(block.p)}</p>`;
      if (block.quote) return `<blockquote><p>${esc(block.quote)}</p></blockquote>`;
      if (block.ul) return `<ul>${block.ul.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>`;
      if (block.ol) return `<ol>${block.ol.map((li) => `<li>${esc(li)}</li>`).join('')}</ol>`;
      return '';
    })
    .join('\n');
}

function sourceHref(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : '';
  } catch {
    return '';
  }
}

export function postPage(locale, post, assets, allPosts = posts) {
  const str = s(locale);
  const path = routes.post(post.slug);
  const category = categoryOf(post.category);
  const blocks = t(post.body, locale);
  const markdown = post.markdown ? t(post.markdown, locale) : null;
  const articleContent = markdown === null ? renderBlocks(blocks) : markdownToHtml(markdown);
  const cta = (postCtas[post.cta] || postCtas.consultation)(locale);

  const trail = [
    { label: str.breadcrumbHome, href: localePath(routes.home, locale) },
    { label: t({ fa: 'بلاگ', en: 'Blog' }, locale), href: localePath(routes.blog, locale) },
    { label: t(category.title, locale), href: localePath(routes.blogCategory(category.slug), locale) },
    { label: t(post.title, locale), href: localePath(path, locale) },
  ];

  const related = sortPosts(allPosts).filter((item) => item.slug !== post.slug).slice(0, 2);
  const answerSummary = t(post.answerSummary, locale);
  const keywords = t(post.keywords, locale);
  const sourceUrl = sourceHref(post.sourceUrl);

  const body = `<article>
<section class="hero-page">
  <div class="container container-narrow">
    ${breadcrumbs(locale, [
      { label: t({ fa: 'بلاگ', en: 'Blog' }, locale), href: localePath(routes.blog, locale) },
      { label: t(category.title, locale), href: localePath(routes.blogCategory(category.slug), locale) },
      { label: t(post.title, locale) },
    ])}
    <div class="post-meta" style="margin-block-end:var(--space-2)">
      <span class="category-pill">${esc(t(category.title, locale))}</span>
      <time datetime="${post.date}">${esc(formatDate(post.date, locale))}</time>
      <span class="dot"></span>
      <span>${esc(readingTime(post.readingMinutes, locale))}</span>
    </div>
    <h1>${esc(t(post.title, locale))}</h1>
    <p class="lead">${esc(t(post.description, locale))}</p>
  </div>
</section>
<section class="section">
  <div class="container container-narrow">
    ${answerSummary ? `<aside class="answer-summary"><strong>${esc(t({ fa: 'پاسخ کوتاه', en: 'Quick answer' }, locale))}</strong><p>${esc(answerSummary)}</p></aside>` : ''}
    ${sourceUrl ? `<p class="source-reference">${esc(t({ fa: 'منبع مقاله:', en: 'Source article:' }, locale))} <a href="${esc(sourceUrl)}" rel="nofollow noopener" target="_blank">${esc(new URL(sourceUrl).hostname)}</a></p>` : ''}
    <div class="prose" style="max-width:none">
      ${articleContent}
    </div>
    ${inlineCta(locale, { ...cta, location: `post_${post.slug}` })}
  </div>
</section>
</article>
<section class="section section-tint">
  <div class="container">
    <div class="section-head">
      <h2>${esc(t({ fa: 'خواندن بعدی', en: 'Read next' }, locale))}</h2>
    </div>
    <div class="grid grid-2">${related.map((item) => postCard(locale, item)).join('\n')}</div>
  </div>
</section>
<section class="section" id="audit">
  <div class="container split split-top">
    <div>
      <h2>${esc(t({ fa: 'ارزیابی رایگان حضور دیجیتال', en: 'Free digital presence audit' }, locale))}</h2>
      <p class="lead">${esc(
        t(
          {
            fa: 'یک گزارش کوتاه از وضعیت سایت، جستجو و پاسخ‌گویی شما — با سه پیشنهاد اولویت‌دار.',
            en: 'A short report on your site, search visibility and response times — with three prioritised fixes.',
          },
          locale
        )
      )}</p>
    </div>
    <div>${leadForm(locale, 'audit')}</div>
  </div>
</section>`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: t(post.title, locale),
    description: t(post.description, locale),
    inLanguage: locale === 'fa' ? 'fa-IR' : 'en',
    datePublished: post.date,
    dateModified: post.updated || post.date,
    articleSection: t(category.title, locale),
    abstract: answerSummary || t(post.description, locale),
    keywords,
    ...(sourceUrl ? { isBasedOn: sourceUrl } : {}),
    wordCount: markdown === null
      ? blocks.reduce((sum, block) => sum + String(block.p || block.h2 || block.quote || (block.ul || block.ol || []).join(' ')).split(/\s+/).length, 0)
      : markdownWordCount(markdown),
    author: { '@id': `${site.domain}/#organization` },
    publisher: { '@id': `${site.domain}/#organization` },
    image: ogImage,
    ...(answerSummary ? { speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.answer-summary'] } } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${site.domain}${localePath(path, locale)}` },
  };

  return layout(
    {
      locale,
      path,
      navKey: 'blog',
      pageId: `post_${post.slug}`,
      ogType: 'article',
      title: `${t(post.title, locale)} | ${t(site.name, locale)}`,
      description: t(post.description, locale),
      ogImage: post.coverImage ? `${site.domain}${post.coverImage}` : undefined,
      schema: [articleSchema, breadcrumbSchema(locale, trail)],
      body,
    },
    assets
  );
}

export { sortedPosts };
