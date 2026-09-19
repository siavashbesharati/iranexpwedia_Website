/**
 * Inline stroke icons (24×24, currentColor). Inline SVG keeps the icon set at
 * zero extra requests and zero layout shift.
 */

const paths = {
  presence: '<rect x="2.5" y="4" width="19" height="14" rx="2.5"/><path d="M2.5 8.5h19M7 21h10"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>',
  content: '<path d="M4 5.5h16M4 11h11M4 16.5h7"/><circle cx="19" cy="16.5" r="2.5"/>',
  trust: '<path d="M12 3l7.5 3v5.5c0 4.4-3 8.2-7.5 9.5-4.5-1.3-7.5-5.1-7.5-9.5V6L12 3z"/><path d="M8.8 12l2.2 2.2 4.2-4.4"/>',
  automation: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5"/>',
  inbox: '<path d="M3.5 13.5h4l1.5 2.5h6l1.5-2.5h4"/><path d="M3.5 13.5L6 5h12l2.5 8.5V19a1.5 1.5 0 01-1.5 1.5H5A1.5 1.5 0 013.5 19v-5.5z"/>',
  ai: '<rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 3v4M9 12.5h.01M15 12.5h.01M9.5 16h5"/>',
  tag: '<path d="M20.5 12.7l-7.8 7.8a2 2 0 01-2.9 0L3.5 13.2V3.5H13l7.5 7.4a1.6 1.6 0 010 1.8z"/><circle cx="8.2" cy="8.2" r="1.4"/>',
  task: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.2l2.3 2.3 4.7-5"/>',
  campaign: '<path d="M4 9.5v5a1.5 1.5 0 001.5 1.5H8l6 4V5.5l-6 4H5.5A1.5 1.5 0 004 11z"/><path d="M17.5 8.5a5 5 0 010 7"/>',
  team: '<circle cx="9" cy="8.5" r="3.2"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><path d="M16 5.6a3.2 3.2 0 010 6M18 14.8c2 .8 3.3 2.6 3.3 5.2"/>',
  chart: '<path d="M4 20h16"/><path d="M7 20V12M12 20V6M17 20v-6"/>',
  agent: '<path d="M12 3.5l8 4.2v8.6l-8 4.2-8-4.2V7.7l8-4.2z"/><path d="M12 12l8-4.3M12 12v8.5M12 12L4 7.7"/>',
  whatsapp: '<path d="M20 11.7A8 8 0 018 18.9L4 20l1.1-3.9A8 8 0 1120 11.7z"/><path d="M9 9.8c0 3 2.2 5.2 5.2 5.2l.8-1.3-1.9-1-1 .8a4.6 4.6 0 01-1.6-1.6l.8-1-1-1.9-1.3.8z"/>',
  bale: '<path d="M4 12.5l16-7-7 16-2.2-6.8L4 12.5z"/>',
  phone: '<path d="M7 3.5h3l1.5 4-2 1.5a10 10 0 005 5l1.5-2 4 1.5v3a2 2 0 01-2.2 2A16 16 0 015.5 5.7 2 2 0 017 3.5z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.8 6.4l8.2 6 8.2-6"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>',
  spark: '<path d="M12 3l1.9 5.3L19 10l-5.1 1.7L12 17l-1.9-5.3L5 10l5.1-1.7L12 3z"/>',
  gauge: '<path d="M4.5 17a8.5 8.5 0 1115 0"/><path d="M12 12l3.5-3"/><circle cx="12" cy="17" r="1.5"/>',
};

export function icon(name, { size = 24, className = '' } = {}) {
  const body = paths[name];
  if (!body) return '';
  return `<svg${className ? ` class="${className}"` : ''} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

export function iconTile(name) {
  return `<span class="icon-tile">${icon(name)}</span>`;
}
