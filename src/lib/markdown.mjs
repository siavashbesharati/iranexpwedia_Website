import { esc } from './html.mjs';

function safeUrl(value, image = false) {
  const url = value.trim();
  if (/^(https?:\/\/|\/|\.\/|\.\.\/)/i.test(url)) return url;
  if (!image && /^(mailto:|tel:)/i.test(url)) return url;
  return '';
}

function inline(source) {
  const tokens = [];
  const token = (html) => `\u0000${tokens.push(html) - 1}\u0000`;
  let text = source
    .replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_match, alt, src, title = '') => {
      const href = safeUrl(src, true);
      return href
        ? token(`<img src="${esc(href)}" alt="${esc(alt)}"${title ? ` title="${esc(title)}"` : ''} loading="lazy" decoding="async" />`)
        : esc(alt);
    })
    .replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_match, label, href, title = '') => {
      const url = safeUrl(href);
      return url
        ? token(`<a href="${esc(url)}"${title ? ` title="${esc(title)}"` : ''} rel="nofollow noopener">${esc(label)}</a>`)
        : esc(label);
    })
    .replace(/`([^`]+)`/g, (_match, code) => token(`<code>${esc(code)}</code>`));

  text = esc(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/\u0000(\d+)\u0000/g, (_match, index) => tokens[Number(index)] || '');

  return text;
}

function isBlockStart(line) {
  return /^\s*(#{1,6}\s|```|>\s?|[-*+]\s|\d+\.\s|(?:-{3,}|\*{3,}|_{3,})\s*$)/.test(line);
}

export function markdownToHtml(markdown = '') {
  const lines = String(markdown).replace(/\r\n?/g, '\n').split('\n');
  const html = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^\s*```\s*([\w+-]*)\s*$/);
    if (fence) {
      index += 1;
      const code = [];
      while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) code.push(lines[index++]);
      if (index < lines.length) index += 1;
      html.push(`<pre><code${fence[1] ? ` class="language-${esc(fence[1])}"` : ''}>${esc(code.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = line.match(/^\s*#{1,6}\s+(.+?)\s*#*\s*$/);
    if (heading) {
      html.push(`<h2>${inline(heading[1])}</h2>`);
      index += 1;
      continue;
    }

    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      html.push('<hr />');
      index += 1;
      continue;
    }

    if (/^\s*>/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) quote.push(lines[index++].replace(/^\s*>\s?/, ''));
      html.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`);
      continue;
    }

    const listMatch = line.match(/^\s*(?:([-*+])|(\d+)\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = Boolean(listMatch[2]);
      const items = [];
      while (index < lines.length) {
        const item = lines[index].match(/^\s*(?:([-*+])|(\d+)\.)\s+(.+)$/);
        if (!item || Boolean(item[2]) !== ordered) break;
        items.push(`<li>${inline(item[3])}</li>`);
        index += 1;
      }
      const tag = ordered ? 'ol' : 'ul';
      html.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) paragraph.push(lines[index++].trim());
    html.push(`<p>${inline(paragraph.join(' '))}</p>`);
  }

  return html.join('\n');
}

export function markdownWordCount(markdown = '') {
  const plainText = String(markdown)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~`-]/g, ' ');
  return (plainText.match(/[\p{L}\p{N}]+/gu) || []).length;
}