/** The HTML document shell: head, SEO, structured data, shared chrome. */

import { esc, tidy, jsonLd } from '../lib/html.js';
import { localeMeta } from '../lib/i18n.js';
import { absolute, localePath } from '../lib/routes.js';
import { site } from '../data/site.js';
import { header, footer, actionBar } from './components.js';

/**
 * @param {object} page
 * @param {string} page.locale
 * @param {string} page.path       canonical Persian path (localized internally)
 * @param {string} page.title
 * @param {string} page.description
 * @param {string} page.body
 * @param {string} [page.navKey]
 * @param {object[]} [page.schema]
 * @param {boolean} [page.noindex]
 * @param {string} [page.pageId]   used as the analytics page label
 */
export function layout(page, assets) {
  const { locale, path, title, description, body, navKey, schema = [], noindex = false, pageId } = page;
  const meta = localeMeta[locale];
  const canonical = absolute(site.domain, path, locale);
  const altLocale = locale === 'fa' ? 'en' : 'fa';
  const altPath = localePath(path, altLocale);

  const runtimeConfig = {
    dataLayerName: site.analytics.dataLayerName,
    formEndpoint: site.forms.endpoint,
    whatsapp: site.contact.mobile,
    locale,
  };

  return tidy(`<!DOCTYPE html>
<html lang="${meta.htmlLang}" dir="${meta.dir}" class="no-js">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}" />
<link rel="canonical" href="${esc(canonical)}" />
<link rel="alternate" hreflang="fa-IR" href="${esc(absolute(site.domain, path, 'fa'))}" />
<link rel="alternate" hreflang="en" href="${esc(absolute(site.domain, path, 'en'))}" />
<link rel="alternate" hreflang="x-default" href="${esc(absolute(site.domain, path, 'fa'))}" />
<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />
<meta name="theme-color" content="#0f766e" />
<meta name="color-scheme" content="light" />
<meta name="format-detection" content="telephone=yes" />
<meta name="geo.region" content="IR-07" />
<meta name="geo.placename" content="Tehran" />

<link rel="preload" href="/assets/fonts/vazirmatn-var.woff2" as="font" type="font/woff2" crossorigin />
<link rel="stylesheet" href="${assets.css}" />

<link rel="icon" href="/assets/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />

<meta property="og:type" content="${page.ogType || 'website'}" />
<meta property="og:locale" content="${meta.ogLocale}" />
<meta property="og:locale:alternate" content="${localeMeta[altLocale].ogLocale}" />
<meta property="og:site_name" content="${esc(site.name[locale])}" />
<meta property="og:url" content="${esc(canonical)}" />
<meta property="og:title" content="${esc(title)}" />
<meta property="og:description" content="${esc(description)}" />
<meta property="og:image" content="${site.domain}/assets/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(title)}" />
<meta name="twitter:description" content="${esc(description)}" />
<meta name="twitter:image" content="${site.domain}/assets/og-image.png" />

${schema.map((entry) => jsonLd(entry)).join('\n')}
<script>window.__IX_CONFIG__=${JSON.stringify(runtimeConfig)};</script>
</head>
<body data-page="${esc(pageId || navKey || 'page')}">
${header(locale, navKey, altPath)}
<main id="main">
${body}
</main>
${footer(locale)}
${actionBar(locale)}
<script src="${assets.js}" defer></script>
</body>
</html>`);
}

/* ------------------------------------------------------- structured data -- */

export function organizationSchema(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.domain}/#organization`,
    name: site.name[locale],
    alternateName: locale === 'fa' ? 'Iran Expedia' : 'ایران اکسپدیا',
    url: `${site.domain}/`,
    logo: `${site.domain}/assets/logoWithTitles.svg`,
    image: `${site.domain}/assets/og-image.png`,
    description: site.tagline[locale],
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address[locale],
      addressLocality: locale === 'fa' ? 'تهران' : 'Tehran',
      addressCountry: 'IR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.contact.phone,
        contactType: 'customer service',
        availableLanguage: ['Persian', 'English'],
      },
      {
        '@type': 'ContactPoint',
        telephone: site.contact.mobile,
        contactType: 'sales',
        availableLanguage: ['Persian'],
      },
    ],
    sameAs: [site.contact.whatsapp, site.product.url],
    areaServed: 'IR',
    knowsLanguage: ['fa', 'en'],
  };
}

export function websiteSchema(locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.domain}/#website`,
    name: site.name[locale],
    url: `${site.domain}/`,
    inLanguage: localeMeta[locale].htmlLang,
    publisher: { '@id': `${site.domain}/#organization` },
  };
}

export function breadcrumbSchema(locale, trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `${site.domain}${item.href}`,
    })),
  };
}

export function faqSchema(items, locale, pick) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: pick(item.q, locale),
      acceptedAnswer: { '@type': 'Answer', text: pick(item.a, locale) },
    })),
  };
}
