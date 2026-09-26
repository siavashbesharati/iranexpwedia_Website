/**
 * Clean URLs, one canonical Persian path per page. English lives under /en.
 * Vercel `cleanUrls` maps `about.html` → `/about`, so every output file is
 * named after its path.
 */

export const routes = {
  home: '/',
  services: '/services',
  service: (slug) => `/services/${slug}`,
  bidar: '/bidar',
  caseStudies: '/case-studies',
  caseStudy: (slug) => `/case-studies/${slug}`,
  blog: '/blog',
  blogCategory: (slug) => `/blog/category/${slug}`,
  post: (slug) => `/blog/${slug}`,
  about: '/about',
  contact: '/contact',
  contract: '/contract-template',
  thankYou: '/thank-you',
  notFound: '/404',
};

/** Prefix a canonical path with the locale segment. */
export function localePath(path, locale) {
  if (locale === 'fa') return path;
  return path === '/' ? '/en' : `/en${path}`;
}

/** Absolute URL for canonical tags, sitemap and structured data. */
export function absolute(domain, path, locale = 'fa') {
  const localized = localePath(path, locale);
  return `${domain}${localized === '/' ? '/' : localized}`;
}

/** Disk location for a localized path. */
export function outputFile(path, locale) {
  const localized = localePath(path, locale);
  if (localized === '/') return 'index.html';
  if (localized === '/en') return 'en/index.html';
  return `${localized.replace(/^\//, '')}.html`;
}
