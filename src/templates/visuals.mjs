/**
 * Product visuals for Bidar, drawn as inline SVG.
 *
 * Vector mockups instead of bitmap screenshots: a few KB, crisp on any screen,
 * no layout shift, and they mirror automatically for RTL/LTR. Replace with real
 * screenshots by swapping these functions for <img loading="lazy"> tags.
 */

import { esc } from '../lib/html.mjs';

const W = 640;

function frame(locale, height, body, { title }) {
  const rtl = locale === 'fa';
  const dotX = rtl ? [W - 22, W - 40, W - 58] : [22, 40, 58];
  return `<svg viewBox="0 0 ${W} ${height}" role="img" aria-label="${esc(title)}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${height}" rx="14" fill="#ffffff"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${height - 1}" rx="13.5" fill="none" stroke="#e6e4dd"/>
  <rect x="1" y="1" width="${W - 2}" height="38" rx="13" fill="#f1f7f6"/>
  <circle cx="${dotX[0]}" cy="20" r="4" fill="#d6d3ca"/>
  <circle cx="${dotX[1]}" cy="20" r="4" fill="#d6d3ca"/>
  <circle cx="${dotX[2]}" cy="20" r="4" fill="#d6d3ca"/>
  <text x="${W / 2}" y="24" text-anchor="middle" font-family="Vazirmatn, system-ui, sans-serif" font-size="12" fill="#566072">${esc(title)}</text>
  ${body}
</svg>`;
}

/** The unified inbox: three channels on one screen, one thread per customer. */
export function unifiedInboxVisual(locale) {
  const rtl = locale === 'fa';
  const H = 420;
  const X = (x, w = 0) => (rtl ? W - x - w : x);
  const TX = (x) => (rtl ? W - x : x);
  const anchor = rtl ? 'end' : 'start';
  const font = 'Vazirmatn, system-ui, sans-serif';

  const copy =
    locale === 'fa'
      ? {
          title: 'بیدار — صندوق پیام یکپارچه',
          channels: 'کانال‌ها',
          items: [
            { name: 'خانم احمدی', channel: 'واتساپ', color: '#25d366', tag: 'داغ' },
            { name: 'خریدار دیوار', channel: 'دیوار', color: '#a3005f', tag: 'جدید' },
            { name: 'آقای کرمی', channel: 'بله', color: '#1f8bd6', tag: 'پیگیری' },
          ],
          threadName: 'خانم احمدی',
          threadMeta: 'واتساپ · یک مشتری، یک پرونده',
          bubbleIn: 'قیمت مشاوره چقدره؟ امشب وقت دارید؟',
          bubbleOut: 'سلام. مشاوره اولیه رایگانه. فردا ۱۰ صبح یا ۱۷ خالیه.',
          taskLabel: 'وظیفه: تماس پیگیری',
          taskTime: 'فردا، ۱۰:۰۰',
        }
      : {
          title: 'Bidar — unified inbox',
          channels: 'Channels',
          items: [
            { name: 'Ms. Ahmadi', channel: 'WhatsApp', color: '#25d366', tag: 'Hot' },
            { name: 'Divar buyer', channel: 'Divar', color: '#a3005f', tag: 'New' },
            { name: 'Mr. Karami', channel: 'Bale', color: '#1f8bd6', tag: 'Follow up' },
          ],
          threadName: 'Ms. Ahmadi',
          threadMeta: 'WhatsApp · one customer, one thread',
          bubbleIn: 'How much is a consultation? Any slot tonight?',
          bubbleOut: 'Hi! The first consultation is free. Tomorrow 10:00 or 17:00 is open.',
          taskLabel: 'Task: follow-up call',
          taskTime: 'Tomorrow, 10:00',
        };

  const listRows = copy.items
    .map((item, i) => {
      const y = 76 + i * 58;
      const active = i === 0;
      return `<rect x="${X(16, 190)}" y="${y}" width="190" height="48" rx="10" fill="${active ? '#eaf6f4' : '#fafaf7'}" stroke="${active ? '#d6efec' : '#e6e4dd'}"/>
  <circle cx="${TX(rtl ? 34 : 34)}" cy="${y + 24}" r="5" fill="${item.color}"/>
  <text x="${TX(rtl ? 48 : 48)}" y="${y + 20}" text-anchor="${anchor}" font-family="${font}" font-size="12.5" fill="#1f2937">${esc(item.name)}</text>
  <text x="${TX(rtl ? 48 : 48)}" y="${y + 37}" text-anchor="${anchor}" font-family="${font}" font-size="10.5" fill="#6b7484">${esc(item.channel)} · ${esc(item.tag)}</text>`;
    })
    .join('\n  ');

  const body = `<rect x="${X(0, 216)}" y="39" width="216" height="${H - 40}" fill="#ffffff"/>
  <line x1="${X(216)}" y1="39" x2="${X(216)}" y2="${H}" stroke="#e6e4dd"/>
  <text x="${TX(rtl ? 24 : 24)}" y="62" text-anchor="${anchor}" font-family="${font}" font-size="11" fill="#6b7484">${esc(copy.channels)}</text>
  ${listRows}

  <text x="${TX(rtl ? 244 : 244)}" y="68" text-anchor="${anchor}" font-family="${font}" font-size="14" font-weight="700" fill="#1f2937">${esc(copy.threadName)}</text>
  <text x="${TX(rtl ? 244 : 244)}" y="86" text-anchor="${anchor}" font-family="${font}" font-size="10.5" fill="#6b7484">${esc(copy.threadMeta)}</text>
  <line x1="${X(244)}" y1="100" x2="${X(244 + 372)}" y2="100" stroke="#f0eee8"/>

  <rect x="${X(244, 250)}" y="116" width="250" height="52" rx="12" fill="#f4f4f0" stroke="#e6e4dd"/>
  <text x="${TX(rtl ? 258 : 258)}" y="139" text-anchor="${anchor}" font-family="${font}" font-size="11.5" fill="#1f2937">${esc(copy.bubbleIn)}</text>
  <text x="${TX(rtl ? 258 : 258)}" y="156" text-anchor="${anchor}" font-family="${font}" font-size="9.5" fill="#6b7484">23:41</text>

  <rect x="${X(320, 296)}" y="182" width="296" height="64" rx="12" fill="#0f766e"/>
  <text x="${TX(rtl ? 336 : 336)}" y="206" text-anchor="${anchor}" font-family="${font}" font-size="11.5" fill="#ffffff">${esc(copy.bubbleOut)}</text>
  <text x="${TX(rtl ? 336 : 336)}" y="232" text-anchor="${anchor}" font-family="${font}" font-size="9.5" fill="#cdeae6">23:41 · AI</text>

  <rect x="${X(244, 372)}" y="272" width="372" height="56" rx="12" fill="#fbf7f0" stroke="#efe7d6"/>
  <circle cx="${TX(rtl ? 268 : 268)}" cy="300" r="9" fill="#ffffff" stroke="#d6d3ca"/>
  <path d="M${rtl ? W - 272 : 264} 300 l3 3 5-6" stroke="#0f766e" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${TX(rtl ? 286 : 286)}" y="296" text-anchor="${anchor}" font-family="${font}" font-size="11.5" fill="#1f2937">${esc(copy.taskLabel)}</text>
  <text x="${TX(rtl ? 286 : 286)}" y="313" text-anchor="${anchor}" font-family="${font}" font-size="10" fill="#6b7484">${esc(copy.taskTime)}</text>

  <rect x="${X(244, 372)}" y="344" width="372" height="40" rx="20" fill="#fafaf7" stroke="#e6e4dd"/>
  <text x="${TX(rtl ? 266 : 266)}" y="369" text-anchor="${anchor}" font-family="${font}" font-size="11" fill="#6b7484">${locale === 'fa' ? 'پاسخ پیشنهادی هوش مصنوعی…' : 'Suggested AI reply…'}</text>
  <circle cx="${TX(rtl ? 592 : 592)}" cy="364" r="14" fill="#0f766e"/>
  <path d="M${rtl ? W - 598 : 586} 364 h11 m-4 -4 l4 4 -4 4" stroke="#ffffff" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="${rtl ? `rotate(180 ${W - 592} 364)` : ''}"/>`;

  return frame(locale, H, body, { title: copy.title });
}

/** Tags + campaign filter: how a conversation becomes a segment. */
export function tagBoardVisual(locale) {
  const rtl = locale === 'fa';
  const H = 260;
  const X = (x, w = 0) => (rtl ? W - x - w : x);
  const TX = (x) => (rtl ? W - x : x);
  const anchor = rtl ? 'end' : 'start';
  const font = 'Vazirmatn, system-ui, sans-serif';

  const copy =
    locale === 'fa'
      ? {
          title: 'بیدار — تگ و کمپین',
          heading: 'فیلتر مخاطبان کمپین',
          tags: ['داغ', 'جدید', 'قدیمی', 'ناراضی', 'ازدست‌رفته', 'نیاز به انسان'],
          channels: ['واتساپ', 'دیوار', 'بله'],
          count: 'مخاطب انتخاب‌شده: [X]',
          send: 'زمان‌بندی ارسال',
        }
      : {
          title: 'Bidar — tags & campaigns',
          heading: 'Campaign audience filter',
          tags: ['Hot', 'New', 'Returning', 'Unhappy', 'Lost', 'Needs a human'],
          channels: ['WhatsApp', 'Divar', 'Bale'],
          count: 'Selected contacts: [X]',
          send: 'Schedule send',
        };

  const widths = copy.tags.map((tag) => Math.max(58, tag.length * (locale === 'fa' ? 9 : 8) + 30));
  let cursor = 24;
  let row = 0;
  const tagShapes = copy.tags
    .map((tag, i) => {
      const w = widths[i];
      if (cursor + w > W - 24) {
        cursor = 24;
        row += 1;
      }
      const x = cursor;
      const y = 86 + row * 44;
      cursor += w + 10;
      const active = i < 2;
      return `<rect x="${X(x, w)}" y="${y}" width="${w}" height="32" rx="16" fill="${active ? '#0f766e' : '#fafaf7'}" stroke="${active ? '#0f766e' : '#e6e4dd'}"/>
  <text x="${TX(rtl ? x + w / 2 : x + w / 2)}" y="${y + 21}" text-anchor="middle" font-family="${font}" font-size="11.5" fill="${active ? '#ffffff' : '#566072'}">${esc(tag)}</text>`;
    })
    .join('\n  ');

  const channelShapes = copy.channels
    .map((name, i) => {
      const w = 96;
      const x = 24 + i * (w + 10);
      return `<rect x="${X(x, w)}" y="184" width="${w}" height="30" rx="8" fill="#eaf6f4" stroke="#d6efec"/>
  <text x="${TX(x + w / 2)}" y="204" text-anchor="middle" font-family="${font}" font-size="11" fill="#115e59">${esc(name)}</text>`;
    })
    .join('\n  ');

  const body = `<text x="${TX(rtl ? 24 : 24)}" y="66" text-anchor="${anchor}" font-family="${font}" font-size="12.5" font-weight="700" fill="#1f2937">${esc(copy.heading)}</text>
  ${tagShapes}
  ${channelShapes}
  <line x1="${X(24)}" y1="232" x2="${X(24 + 592)}" y2="232" stroke="#f0eee8"/>
  <text x="${TX(rtl ? 24 : 24)}" y="250" text-anchor="${anchor}" font-family="${font}" font-size="11.5" fill="#566072">${esc(copy.count)}</text>
  <rect x="${X(472, 144)}" y="176" width="144" height="38" rx="19" fill="#0f766e"/>
  <text x="${TX(rtl ? 544 : 544)}" y="200" text-anchor="middle" font-family="${font}" font-size="11.5" fill="#ffffff">${esc(copy.send)}</text>`;

  return frame(locale, H, body, { title: copy.title });
}

/** Analytics: response time, leads and channel split. */
export function analyticsVisual(locale) {
  const rtl = locale === 'fa';
  const H = 280;
  const X = (x, w = 0) => (rtl ? W - x - w : x);
  const TX = (x) => (rtl ? W - x : x);
  const anchor = rtl ? 'end' : 'start';
  const font = 'Vazirmatn, system-ui, sans-serif';

  const copy =
    locale === 'fa'
      ? {
          title: 'بیدار — گزارش',
          kpis: [
            { value: '[X]', label: 'لید این ماه' },
            { value: '[X]', label: 'میانگین پاسخ (دقیقه)' },
            { value: '[X]٪', label: 'پیام بی‌جواب' },
          ],
          chart: 'حجم پیام به تفکیک کانال',
          legend: ['واتساپ', 'دیوار', 'بله'],
        }
      : {
          title: 'Bidar — analytics',
          kpis: [
            { value: '[X]', label: 'leads this month' },
            { value: '[X]', label: 'avg. response (min)' },
            { value: '[X]%', label: 'unanswered' },
          ],
          chart: 'Message volume by channel',
          legend: ['WhatsApp', 'Divar', 'Bale'],
        };

  const kpiShapes = copy.kpis
    .map((kpi, i) => {
      const w = 188;
      const x = 24 + i * (w + 10);
      return `<rect x="${X(x, w)}" y="56" width="${w}" height="64" rx="12" fill="#fafaf7" stroke="#e6e4dd"/>
  <text x="${TX(rtl ? x + 16 : x + 16)}" y="86" text-anchor="${anchor}" font-family="${font}" font-size="20" font-weight="700" fill="#115e59">${esc(kpi.value)}</text>
  <text x="${TX(rtl ? x + 16 : x + 16)}" y="106" text-anchor="${anchor}" font-family="${font}" font-size="10.5" fill="#6b7484">${esc(kpi.label)}</text>`;
    })
    .join('\n  ');

  const series = [
    { color: '#25d366', values: [30, 44, 38, 56, 48, 62] },
    { color: '#a3005f', values: [18, 26, 22, 34, 30, 40] },
    { color: '#1f8bd6', values: [10, 14, 18, 16, 22, 26] },
  ];

  const baseY = 236;
  const bars = series
    .flatMap((s, si) =>
      s.values.map((v, vi) => {
        const groupX = 40 + vi * 96;
        const x = groupX + si * 16;
        const h = v * 1.4;
        return `<rect x="${X(x, 12)}" y="${baseY - h}" width="12" height="${h}" rx="4" fill="${s.color}" opacity="0.85"/>`;
      })
    )
    .join('\n  ');

  const legend = copy.legend
    .map((name, i) => {
      const x = 380 + i * 82;
      return `<circle cx="${TX(rtl ? x : x)}" cy="156" r="5" fill="${series[i].color}"/>
  <text x="${TX(rtl ? x + 12 : x + 12)}" y="160" text-anchor="${anchor}" font-family="${font}" font-size="10" fill="#566072">${esc(name)}</text>`;
    })
    .join('\n  ');

  const body = `${kpiShapes}
  <text x="${TX(rtl ? 24 : 24)}" y="160" text-anchor="${anchor}" font-family="${font}" font-size="12" font-weight="700" fill="#1f2937">${esc(copy.chart)}</text>
  ${legend}
  <line x1="${X(24)}" y1="${baseY}" x2="${X(24 + 592)}" y2="${baseY}" stroke="#e6e4dd"/>
  ${bars}`;

  return frame(locale, H, body, { title: copy.title });
}
