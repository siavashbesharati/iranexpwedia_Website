#!/usr/bin/env node
/**
 * Local preview server that mirrors the Vercel config: clean URLs, no trailing
 * slash, 404.html fallback. For development only.
 *
 * Usage: npm run serve  (then open http://localhost:4173)
 */

import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

async function tryFiles(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const candidates =
    clean === '/'
      ? ['index.html']
      : [`${clean.slice(1)}.html`, path.join(clean.slice(1), 'index.html'), clean.slice(1)];

  for (const candidate of candidates) {
    const file = path.join(root, candidate);
    if (!file.startsWith(root)) continue;
    try {
      const stat = await fs.stat(file);
      if (stat.isFile()) return file;
    } catch {
      /* keep looking */
    }
  }
  return null;
}

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = (await tryFiles(pathname)) || path.join(root, '404.html');
  try {
    const body = await fs.readFile(file);
    res.writeHead(file.endsWith('404.html') && pathname !== '/404' ? 404 : 200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
}).listen(port, () => {
  console.log(`serving ${root} on http://localhost:${port}`);
});
