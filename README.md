# iranexpedia.ir

Persian-first (RTL) marketing site for IranExpedia and its product, Bidar.
Light theme, static HTML, no runtime dependencies.

## How it works

The HTML in this repository is **generated and committed**. `build.mjs` renders
every page for both locales from the content in `src/data/` and writes the
result to the repository root, so the deployed site is a plain static bundle
that Vercel serves with zero configuration.

```
src/
  data/        content: site config, services, Bidar, case studies, blog, reviews
  lib/         helpers: locale + Jalali dates, HTML escaping, routes
  templates/   layout, shared components, inline SVG icons and product visuals
  pages/       one module per page type
  assets/      source CSS and browser JS (hashed into /assets on build)
build.mjs      the generator
scripts/       local preview server
```

## Commands

Node 18 or newer, no `npm install` needed — the generator has no dependencies.

```bash
node build.mjs          # regenerate all HTML, the hashed CSS/JS and sitemap.xml
node scripts/serve.mjs  # preview on http://localhost:4173 with Vercel-style clean URLs
```

Always run `node build.mjs` and commit the generated files after editing
anything in `src/`.

> **Do not add a `package.json` to the repository root.** It makes Vercel treat
> the project as a build-step app and look for an output directory that does not
> exist, which fails the deployment. The generator is dependency-free and runs
> directly with `node`, so none is needed.

## Things to fill in

These are deliberately left as placeholders instead of invented values.

| Where | What |
| --- | --- |
| `src/data/site.mjs` → `stats` | Real project count, client count and rating (currently `[X]`) |
| `src/data/site.mjs` → `contact.bale.handle` | Bale ID; setting it turns the placeholder card into a live link |
| `src/data/site.mjs` → `forms.endpoint` | Form POST target. While `null`, forms fall back to a pre-filled WhatsApp message |
| `src/data/site.mjs` → `trustBadges.enamad` | Enamad snippet, rendered in the footer when set |
| `src/data/case-studies.mjs` | Every `[X]` metric, from the client's own dashboard only |
| `src/data/bidar.mjs` → `pricing.tiers[].price` | Published pricing, once confirmed |

## Analytics

No third-party script is loaded. Every CTA carries a `data-event` attribute and
`src/assets/js/site.js` pushes events to `window.dataLayer`, forwarding them to
`gtag` or `plausible` if either is present. Add a tag manager snippet and the
existing events (`book_consultation`, `request_demo`, `audit_request`,
`form_submit`, `form_success`, `whatsapp_click`, `call_click`, …) start
reporting without markup changes.
