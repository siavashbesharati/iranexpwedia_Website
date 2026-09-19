#!/usr/bin/env node
/**
 * Static site generator for iranexpedia.ir.
 *
 * Renders every page for both locales into plain HTML at the repository root,
 * so the deployed site stays a dependency-free static bundle. CSS and JS are
 * content-hashed because /assets/* is served with a one-year immutable cache.
 *
 * Usage: npm run build
 */

import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from './src/data/site.js';
import { services } from './src/data/services.js';
import { caseStudies } from './src/data/case-studies.js';
import { categories, posts } from './src/data/blog.js';
import { routes, localePath, outputFile } from './src/lib/routes.js';
import { homePage } from './src/pages/home.js';
import { servicesHubPage, servicePage } from './src/pages/services.js';
import { bidarPage } from './src/pages/bidar.js';
import { caseStudiesPageTemplate, caseStudyPage } from './src/pages/case-studies.js';
import { blogIndexPage, blogCategoryPage, postPage } from './src/pages/blog.js';
import { aboutPage, contactPage, thankYouPage, notFoundPage } from './src/pages/misc.js';

const root = path.dirname(fileURLToPath(import.meta.url));
const LOCALES = ['fa', 'en'];

/* Directories and files this build owns and may safely recreate. */
const GENERATED_DIRS = ['services', 'case-studies', 'blog', 'en', 'assets/css', 'assets/js'];
const GENERATED_ROOT_FILES = ['sitemap.xml', 'robots.txt'];

async function main() {
  await clean();
  const assets = await buildAssets();
  const pages = collectPages(assets);

  for (const page of pages) {
    const file = path.join(root, page.file);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, page.html, 'utf8');
  }

  await writeSitemap(pages);
  await writeRobots();

  const bytes = pages.reduce((sum, page) => sum + Buffer.byteLength(page.html), 0);
  console.log(`✓ ${pages.length} pages (${(bytes / 1024).toFixed(0)} KB html)`);
  console.log(`✓ ${assets.css}`);
  console.log(`✓ ${assets.js}`);
}

/* ------------------------------------------------------------------ clean */

async function clean() {
  for (const dir of GENERATED_DIRS) {
    await fs.rm(path.join(root, dir), { recursive: true, force: true });
  }
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.html')) {
      await fs.rm(path.join(root, entry.name), { force: true });
    }
  }
  for (const file of GENERATED_ROOT_FILES) {
    await fs.rm(path.join(root, file), { force: true });
  }
}

/* ----------------------------------------------------------------- assets */

async function buildAssets() {
  const css = await fs.readFile(path.join(root, 'src/assets/css/site.css'), 'utf8');
  const js = await fs.readFile(path.join(root, 'src/assets/js/site.js'), 'utf8');

  const cssName = `site.${hash(css)}.css`;
  const jsName = `site.${hash(js)}.js`;

  await fs.mkdir(path.join(root, 'assets/css'), { recursive: true });
  await fs.mkdir(path.join(root, 'assets/js'), { recursive: true });
  await fs.writeFile(path.join(root, 'assets/css', cssName), css, 'utf8');
  await fs.writeFile(path.join(root, 'assets/js', jsName), js, 'utf8');

  return { css: `/assets/css/${cssName}`, js: `/assets/js/${jsName}` };
}

function hash(content) {
  return createHash('sha256').update(content).digest('hex').slice(0, 8);
}

/* ------------------------------------------------------------------ pages */

function collectPages(assets) {
  const pages = [];

  const add = (locale, routePath, html, options = {}) => {
    pages.push({
      locale,
      path: routePath,
      url: `${site.domain}${localePath(routePath, locale)}`,
      file: outputFile(routePath, locale),
      html,
      priority: options.priority ?? 0.6,
      changefreq: options.changefreq ?? 'monthly',
      lastmod: options.lastmod,
      indexable: options.indexable !== false,
    });
  };

  for (const locale of LOCALES) {
    add(locale, routes.home, homePage(locale, assets), { priority: 1.0, changefreq: 'weekly' });
    add(locale, routes.services, servicesHubPage(locale, assets), { priority: 0.9, changefreq: 'monthly' });
    add(locale, routes.bidar, bidarPage(locale, assets), { priority: 0.95, changefreq: 'weekly' });
    add(locale, routes.caseStudies, caseStudiesPageTemplate(locale, assets), { priority: 0.8 });
    add(locale, routes.blog, blogIndexPage(locale, assets), { priority: 0.8, changefreq: 'weekly' });
    add(locale, routes.about, aboutPage(locale, assets), { priority: 0.6 });
    add(locale, routes.contact, contactPage(locale, assets), { priority: 0.9 });
    add(locale, routes.thankYou, thankYouPage(locale, assets), { indexable: false });
    add(locale, routes.notFound, notFoundPage(locale, assets), { indexable: false });

    for (const svc of services) {
      add(locale, routes.service(svc.slug), servicePage(locale, svc, assets), { priority: 0.85 });
    }
    for (const study of caseStudies) {
      add(locale, routes.caseStudy(study.slug), caseStudyPage(locale, study, assets), { priority: 0.7 });
    }
    for (const category of categories) {
      add(locale, routes.blogCategory(category.slug), blogCategoryPage(locale, category, assets), {
        priority: 0.5,
        changefreq: 'weekly',
      });
    }
    for (const post of posts) {
      add(locale, routes.post(post.slug), postPage(locale, post, assets), {
        priority: 0.7,
        lastmod: post.updated || post.date,
      });
    }
  }

  return pages;
}

/* --------------------------------------------------------------- sitemap */

async function writeSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const indexable = pages.filter((page) => page.indexable);

  // One <url> per Persian page, with the English twin declared as an alternate.
  const byPath = new Map();
  for (const page of indexable) {
    if (!byPath.has(page.path)) byPath.set(page.path, {});
    byPath.get(page.path)[page.locale] = page;
  }

  const entries = [...byPath.entries()].map(([routePath, group]) => {
    const primary = group.fa || group.en;
    const alternates = LOCALES.filter((locale) => group[locale])
      .map(
        (locale) =>
          `    <xhtml:link rel="alternate" hreflang="${locale === 'fa' ? 'fa-IR' : 'en'}" href="${group[locale].url}" />`
      )
      .join('\n');

    return `  <url>
    <loc>${primary.url}</loc>
    <lastmod>${primary.lastmod || today}</lastmod>
    <changefreq>${primary.changefreq}</changefreq>
    <priority>${primary.priority.toFixed(1)}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${(group.fa || primary).url}" />
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

  await fs.writeFile(path.join(root, 'sitemap.xml'), xml, 'utf8');
}

async function writeRobots() {
  const robots = `User-agent: *
Allow: /
Disallow: /thank-you
Disallow: /en/thank-you

Sitemap: ${site.domain}/sitemap.xml
`;
  await fs.writeFile(path.join(root, 'robots.txt'), robots, 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
