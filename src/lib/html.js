/** Tiny HTML helpers used by the templates. */

const ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export function esc(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[&<>"']/g, (char) => ENTITIES[char]);
}

/** Wraps [X] style placeholders so they are visually flagged as unconfirmed. */
export function markPlaceholders(value) {
  return esc(value).replace(/\[[^\]]+\]/g, (match) => `<span class="placeholder-value">${match}</span>`);
}

export function attrs(map) {
  return Object.entries(map)
    .filter(([, v]) => v !== null && v !== undefined && v !== false && v !== '')
    .map(([k, v]) => (v === true ? k : `${k}="${esc(v)}"`))
    .join(' ');
}

export function classNames(...values) {
  return values.filter(Boolean).join(' ');
}

/** Minify-ish: collapse the indentation the template literals introduce. */
export function tidy(html) {
  return html
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line) => line.trim() !== '')
    .join('\n');
}

export function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')}</script>`;
}
