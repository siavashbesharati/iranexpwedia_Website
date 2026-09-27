import { createHmac, timingSafeEqual } from 'node:crypto';

const CONTENT_DIR = 'src/data/blog-cms';
const COOKIE_NAME = 'ix_blog_admin';
const SESSION_SECONDS = 60 * 60 * 12;
const MAX_IMAGE_BYTES = 750_000;

function send(res, status, payload, headers = {}) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  for (const [name, value] of Object.entries(headers)) res.setHeader(name, value);
  res.statusCode = status;
  res.end(JSON.stringify(payload));
}

function secret() {
  return process.env.BLOG_ADMIN_PASSWORD || '';
}

function signature(value) {
  return createHmac('sha256', secret()).update(value).digest('hex');
}

function cookieValue(req) {
  const cookieHeader = req.headers.cookie || '';
  const item = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`));
  return item ? decodeURIComponent(item.slice(COOKIE_NAME.length + 1)) : '';
}

function validSession(req) {
  if (!secret()) return false;
  const [timestamp, suppliedSignature] = cookieValue(req).split('.');
  const created = Number(timestamp);
  if (!Number.isFinite(created) || Date.now() - created > SESSION_SECONDS * 1000) return false;
  const expected = Buffer.from(signature(timestamp), 'hex');
  let supplied;
  try {
    supplied = Buffer.from(suppliedSignature || '', 'hex');
  } catch {
    return false;
  }
  return expected.length === supplied.length && timingSafeEqual(expected, supplied);
}

function sessionCookie(req, value, maxAge) {
  const secure = process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https';
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; HttpOnly; SameSite=Strict; Path=/api/blog; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

function repositoryConfig() {
  const repository = process.env.GITHUB_REPOSITORY || '';
  if (!process.env.GITHUB_TOKEN || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) {
    throw new Error('CMS_GITHUB_CONFIGURATION');
  }
  return {
    repository,
    branch: process.env.GITHUB_BRANCH || 'main',
    token: process.env.GITHUB_TOKEN,
  };
}

async function github(path, options = {}) {
  const { repository, branch, token } = repositoryConfig();
  const response = await fetch(`https://api.github.com/repos/${repository}/contents/${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });
  if (response.status === 404) return null;
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error('CMS_GITHUB_REQUEST_FAILED');
    error.status = response.status;
    throw error;
  }
  return result;
}

async function existingSha(path) {
  const item = await github(path);
  return item?.sha;
}

async function writeFile(path, content, message, contentType = 'text') {
  const { branch } = repositoryConfig();
  const sha = await existingSha(path);
  const result = await github(path, {
    method: 'PUT',
    body: JSON.stringify({
      message,
      content: Buffer.from(content, contentType === 'base64' ? 'base64' : 'utf8').toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });
  return result?.content?.path;
}

function slugValue(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? value : '';
}

function validLocalizedText(value, required = true) {
  return value && typeof value === 'object' && ['fa', 'en'].every((locale) =>
    typeof value[locale] === 'string' && (!required || value[locale].trim().length > 0)
  );
}

function validatePost(post) {
  const slug = slugValue(post?.slug);
  if (!slug || !/^[a-z0-9-]+$/.test(post.category || '')) return null;
  if (!validLocalizedText(post.title) || !validLocalizedText(post.description) || !validLocalizedText(post.markdown)) return null;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date || '')) return null;
  if (post.answerSummary && !validLocalizedText(post.answerSummary, false)) return null;
  if (post.keywords && !validLocalizedText(post.keywords, false)) return null;

  return {
    slug,
    category: post.category,
    date: post.date,
    updated: new Date().toISOString().slice(0, 10),
    title: post.title,
    description: post.description,
    markdown: post.markdown,
    readingMinutes: Math.max(1, Math.ceil(Math.max(
      post.markdown.fa.trim().split(/\s+/).length,
      post.markdown.en.trim().split(/\s+/).length
    ) / 200)),
    answerSummary: post.answerSummary || { fa: '', en: '' },
    keywords: post.keywords || { fa: '', en: '' },
    coverImage: typeof post.coverImage === 'string' && /^\/assets\/blog\/[a-z0-9-]+\/[a-z0-9._-]+\.webp$/.test(post.coverImage)
      ? post.coverImage
      : '',
    cta: ['consultation', 'demo', 'audit'].includes(post.cta) ? post.cta : 'consultation',
    published: Boolean(post.published),
  };
}

async function listPosts() {
  const files = await github(`${CONTENT_DIR}?ref=${encodeURIComponent(repositoryConfig().branch)}`);
  if (!Array.isArray(files)) return [];
  const posts = await Promise.all(files.filter((file) => file.name.endsWith('.json')).map(async (file) => {
    const record = await github(`${CONTENT_DIR}/${encodeURIComponent(file.name)}?ref=${encodeURIComponent(repositoryConfig().branch)}`);
    return JSON.parse(Buffer.from(record.content, 'base64').toString('utf8'));
  }));
  return posts.sort((a, b) => (a.updated < b.updated ? 1 : -1));
}

function imagePayload(body) {
  const slug = slugValue(body?.slug);
  const name = typeof body?.filename === 'string' ? body.filename.toLowerCase().replace(/[^a-z0-9._-]+/g, '-') : '';
  const match = typeof body?.data === 'string' ? body.data.match(/^data:image\/(webp|png|jpeg);base64,([A-Za-z0-9+/=]+)$/) : null;
  if (!slug || !name || !match) return null;
  const bytes = Buffer.from(match[2], 'base64');
  if (!bytes.length || bytes.length > MAX_IMAGE_BYTES) return null;
  return { slug, name, bytes };
}

export default async function handler(req, res) {
  const action = req.method === 'GET' ? req.query?.action : req.body?.action;

  if (req.method === 'GET' && action === 'session') {
    return send(res, 200, { authenticated: validSession(req) });
  }

  if (req.method === 'POST' && action === 'login') {
    if (!secret()) return send(res, 503, { error: 'Admin password is not configured.' });
    const supplied = Buffer.from(String(req.body?.password || ''));
    const expected = Buffer.from(secret());
    const matches = supplied.length === expected.length && timingSafeEqual(supplied, expected);
    if (!matches) return send(res, 401, { error: 'Incorrect password.' });
    const timestamp = String(Date.now());
    return send(res, 200, { authenticated: true }, {
      'Set-Cookie': sessionCookie(req, `${timestamp}.${signature(timestamp)}`, SESSION_SECONDS),
    });
  }

  if (req.method === 'POST' && action === 'logout') {
    return send(res, 200, { authenticated: false }, { 'Set-Cookie': sessionCookie(req, '', 0) });
  }

  if (!validSession(req)) return send(res, 401, { error: 'Sign in to manage articles.' });

  try {
    if (req.method === 'GET' && action === 'posts') {
      return send(res, 200, { posts: await listPosts() });
    }

    if (req.method === 'POST' && action === 'save') {
      const post = validatePost(req.body?.post);
      if (!post) return send(res, 400, { error: 'Check the article fields and try again.' });
      const categoryFile = await github(`src/data/blog.mjs?ref=${encodeURIComponent(repositoryConfig().branch)}`);
      if (!categoryFile) return send(res, 503, { error: 'Blog categories could not be loaded.' });
      const categorySource = Buffer.from(categoryFile.content, 'base64').toString('utf8');
      if (!categorySource.includes(`slug: '${post.category}'`)) {
        return send(res, 400, { error: 'Select an existing blog category.' });
      }
      const path = `${CONTENT_DIR}/${post.slug}.json`;
      await writeFile(path, JSON.stringify(post, null, 2), `${post.published ? 'Publish' : 'Save'} blog article: ${post.slug}`);
      return send(res, 200, { post });
    }

    if (req.method === 'POST' && action === 'image') {
      const image = imagePayload(req.body);
      if (!image) return send(res, 400, { error: 'Use a supported image under 750 KB.' });
      const path = `assets/blog/${image.slug}/${image.name}`;
      await writeFile(path, image.bytes.toString('base64'), `Add blog image: ${image.slug}/${image.name}`, 'base64');
      return send(res, 200, { url: `/${path}` });
    }

    if (req.method === 'POST' && action === 'delete') {
      const slug = slugValue(req.body?.slug);
      if (!slug) return send(res, 400, { error: 'Invalid article slug.' });
      const path = `${CONTENT_DIR}/${slug}.json`;
      const sha = await existingSha(path);
      if (!sha) return send(res, 404, { error: 'Article not found.' });
      await github(path, {
        method: 'DELETE',
        body: JSON.stringify({ message: `Delete blog article: ${slug}`, sha, branch: repositoryConfig().branch }),
      });
      return send(res, 200, { deleted: slug });
    }

    return send(res, 404, { error: 'Unknown CMS action.' });
  } catch (error) {
    if (error.message === 'CMS_GITHUB_CONFIGURATION') {
      return send(res, 503, { error: 'GitHub storage settings are incomplete.' });
    }
    console.error('Blog CMS request failed', error.message);
    return send(res, error.status === 409 ? 409 : 502, { error: 'Could not save to GitHub. Check the repository settings.' });
  }
}