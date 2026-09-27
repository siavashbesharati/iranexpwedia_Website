const byId = (id) => document.getElementById(id);
const fields = ['title-en', 'title-fa', 'slug', 'category', 'date', 'description-en', 'description-fa', 'answer-en', 'answer-fa', 'keywords-en', 'keywords-fa', 'cta', 'markdown'];
const categories = [
  ['business-growth', 'Business Growth', 'رشد کسب‌وکار'],
  ['marketing', 'Marketing', 'بازاریابی'],
  ['technology-ai', 'Technology & AI', 'فناوری و هوش مصنوعی'],
  ['business-ideas', 'Business Ideas', 'ایده‌های کسب‌وکار'],
  ['case-studies', 'Case Studies', 'تجربه‌های اجرا'],
];
const state = { posts: [], currentSlug: '', dirty: false, image: null, objectUrl: '', toastTimer: 0, markdownLocale: 'en', markdown: { en: '', fa: '' }, coverImage: '', slugEdited: false };

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function safeHref(value, image = false) {
  const url = value.trim();
  return /^(https?:\/\/|\/|\.\/|\.\.\/)/i.test(url) || (!image && /^(mailto:|tel:)/i.test(url)) ? url : '';
}

function renderMarkdown(markdown) {
  const tokens = [];
  const hold = (html) => `\u0000${tokens.push(html) - 1}\u0000`;
  const inline = (source) => {
    let text = source
      .replace(/!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_all, alt, src, title = '') => {
        const url = safeHref(src, true);
        return url ? hold(`<img src="${escapeHtml(url)}" alt="${escapeHtml(alt)}"${title ? ` title="${escapeHtml(title)}"` : ''} loading="lazy" />`) : escapeHtml(alt);
      })
      .replace(/\[([^\]]+)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g, (_all, label, href, title = '') => {
        const url = safeHref(href);
        return url ? hold(`<a href="${escapeHtml(url)}"${title ? ` title="${escapeHtml(title)}"` : ''} rel="nofollow noopener">${escapeHtml(label)}</a>`) : escapeHtml(label);
      })
      .replace(/`([^`]+)`/g, (_all, code) => hold(`<code>${escapeHtml(code)}</code>`));
    text = escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      .replace(/\u0000(\d+)\u0000/g, (_all, index) => tokens[Number(index)] || '');
    return text;
  };

  const lines = String(markdown).replace(/\r\n?/g, '\n').split('\n');
  const output = [];
  for (let index = 0; index < lines.length;) {
    const line = lines[index];
    if (!line.trim()) { index += 1; continue; }
    const fence = line.match(/^\s*```\s*([\w+-]*)\s*$/);
    if (fence) {
      index += 1;
      const code = [];
      while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) code.push(lines[index++]);
      if (index < lines.length) index += 1;
      output.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }
    const heading = line.match(/^\s*#{1,6}\s+(.+?)\s*#*\s*$/);
    if (heading) { output.push(`<h2>${inline(heading[1])}</h2>`); index += 1; continue; }
    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) { output.push('<hr />'); index += 1; continue; }
    if (/^\s*>/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) quote.push(lines[index++].replace(/^\s*>\s?/, ''));
      output.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`);
      continue;
    }
    const item = line.match(/^\s*(?:([-*+])|(\d+)\.)\s+(.+)$/);
    if (item) {
      const ordered = Boolean(item[2]);
      const items = [];
      while (index < lines.length) {
        const next = lines[index].match(/^\s*(?:([-*+])|(\d+)\.)\s+(.+)$/);
        if (!next || Boolean(next[2]) !== ordered) break;
        items.push(`<li>${inline(next[3])}</li>`); index += 1;
      }
      const tag = ordered ? 'ol' : 'ul';
      output.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }
    const paragraph = [line.trim()]; index += 1;
    while (index < lines.length && lines[index].trim() && !/^\s*(#{1,6}\s|```|>\s?|[-*+]\s|\d+\.\s)/.test(lines[index])) paragraph.push(lines[index++].trim());
    output.push(`<p>${inline(paragraph.join(' '))}</p>`);
  }
  return output.join('\n');
}

function wordCount(text) {
  const plain = String(text).replace(/```[\s\S]*?```/g, ' ').replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[#>*_~`-]/g, ' ');
  return (plain.match(/[\p{L}\p{N}]+/gu) || []).length;
}

function notify(message) {
  const toast = byId('toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => toast.classList.remove('visible'), 3200);
}

async function request(action, body) {
  const response = await fetch('/api/blog', {
    method: body ? 'POST' : 'GET',
    credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify({ action, ...body }) : undefined,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.error || 'Something went wrong.');
    error.fields = result.fields;
    throw error;
  }
  return result;
}

function toggleWorkspace(authenticated) {
  byId('login-panel').hidden = authenticated;
  byId('workspace').hidden = !authenticated;
  byId('logout').hidden = !authenticated;
  if (authenticated) loadPosts().catch((error) => notify(error.message));
  else byId('password').focus();
}

async function loadPosts() {
  const result = await request('posts');
  state.posts = result.posts || [];
  renderPostList();
}

function renderPostList() {
  const list = byId('post-list');
  list.replaceChildren();
  for (const post of state.posts) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'post-item';
    button.setAttribute('aria-current', post.slug === state.currentSlug ? 'true' : 'false');
    button.innerHTML = `<strong>${escapeHtml(post.title?.en || post.title?.fa || post.slug)}</strong><small>${post.published ? 'Published' : '<span class="draft-label">Draft</span>'} · ${escapeHtml(post.slug)}</small>`;
    button.addEventListener('click', () => openPost(post));
    list.append(button);
  }
}

function setStatus(text, dirty = false) {
  state.dirty = dirty;
  byId('save-state').textContent = dirty ? 'Unsaved changes' : text;
  byId('article-status').textContent = state.currentSlug || 'New article';
  byId('publish-post').textContent = dirty ? 'Publish' : 'Publish';
}

function readForm() {
  state.markdown[state.markdownLocale] = byId('markdown').value;
  return {
    slug: byId('slug').value.trim(),
    category: byId('category').value,
    date: byId('date').value,
    title: { en: byId('title-en').value.trim(), fa: byId('title-fa').value.trim() },
    description: { en: byId('description-en').value.trim(), fa: byId('description-fa').value.trim() },
    answerSummary: { en: byId('answer-en').value.trim(), fa: byId('answer-fa').value.trim() },
    keywords: { en: byId('keywords-en').value.trim(), fa: byId('keywords-fa').value.trim() },
    markdown: { ...state.markdown },
    cta: byId('cta').value,
    coverImage: state.coverImage,
  };
}

function validateForm(post, published) {
  const errors = {};
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.slug)) errors.slug = 'Use a lowercase English URL slug with hyphens, for example local-seo-guide.';
  if (!categories.some(([slug]) => slug === post.category)) errors.category = 'Choose a blog category.';
  const date = new Date(`${post.date}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(post.date) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== post.date) {
    errors.date = 'Choose a valid publication date.';
  }
  if (published) {
    for (const key of ['title', 'description', 'markdown']) {
      for (const locale of ['fa', 'en']) {
        if (!post[key][locale].trim()) errors[`${key}.${locale}`] = `Add the ${locale === 'fa' ? 'Persian' : 'English'} ${key}.`;
      }
    }
  }
  for (const [key, limit] of [['title', 150], ['description', 240], ['markdown', 200000], ['answerSummary', 500], ['keywords', 300]]) {
    for (const locale of ['fa', 'en']) {
      if (post[key][locale].length > limit) errors[`${key}.${locale}`] = `Keep this field under ${limit} characters.`;
    }
  }
  return errors;
}

function switchMarkdownLocale(locale) {
  state.markdown[state.markdownLocale] = byId('markdown').value;
  state.markdownLocale = locale;
  byId('markdown').value = state.markdown[locale];
  byId('markdown').dir = locale === 'fa' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-language]').forEach((tab) => tab.setAttribute('aria-pressed', String(tab.dataset.language === locale)));
  byId('preview').dir = locale === 'fa' ? 'rtl' : 'ltr';
  document.querySelector('.preview-language').textContent = locale === 'fa' ? 'فارسی' : 'English';
  updatePreview();
}

function showValidation(errors) {
  document.querySelectorAll('[aria-invalid="true"]').forEach((control) => control.removeAttribute('aria-invalid'));
  const labels = {
    slug: 'URL slug', category: 'Category', date: 'Publication date',
    'title.en': 'English title', 'title.fa': 'Persian title',
    'description.en': 'English description', 'description.fa': 'Persian description',
    'markdown.en': 'English article body', 'markdown.fa': 'Persian article body',
    'answerSummary.en': 'English quick answer', 'answerSummary.fa': 'Persian quick answer',
    'keywords.en': 'English search phrases', 'keywords.fa': 'Persian search phrases',
    cta: 'Call to action', coverImage: 'Social cover image',
  };
  const ids = {
    slug: 'slug', category: 'category', date: 'date',
    'title.en': 'title-en', 'title.fa': 'title-fa',
    'description.en': 'description-en', 'description.fa': 'description-fa',
    'answerSummary.en': 'answer-en', 'answerSummary.fa': 'answer-fa',
    'keywords.en': 'keywords-en', 'keywords.fa': 'keywords-fa',
    cta: 'cta', coverImage: 'set-cover',
  };
  const entries = Object.entries(errors || {});
  if (!entries.length) return false;
  for (const [key] of entries) {
    const id = ids[key];
    if (id) byId(id).setAttribute('aria-invalid', 'true');
  }
  const first = entries[0][0];
  let control = byId(ids[first]);
  if (first.startsWith('markdown.')) {
    switchMarkdownLocale(first.endsWith('.fa') ? 'fa' : 'en');
    control = byId('markdown');
    control.setAttribute('aria-invalid', 'true');
  }
  const summary = entries.slice(0, 4).map(([key, message]) => `${labels[key] || key}: ${message}`).join(' ');
  notify(summary);
  control?.focus();
  return true;
}

function openPost(post) {
  state.currentSlug = post.slug;
  state.slugEdited = true;
  byId('title-en').value = post.title?.en || '';
  byId('title-fa').value = post.title?.fa || '';
  byId('slug').value = post.slug || '';
  byId('category').value = post.category || categories[0][0];
  byId('date').value = post.date || new Date().toISOString().slice(0, 10);
  byId('description-en').value = post.description?.en || '';
  byId('description-fa').value = post.description?.fa || '';
  byId('answer-en').value = post.answerSummary?.en || '';
  byId('answer-fa').value = post.answerSummary?.fa || '';
  byId('keywords-en').value = post.keywords?.en || '';
  byId('keywords-fa').value = post.keywords?.fa || '';
  state.markdown = { en: post.markdown?.en || '', fa: post.markdown?.fa || '' };
  state.markdownLocale = 'en';
  byId('markdown').value = state.markdown.en;
  byId('markdown').dir = 'ltr';
  document.querySelectorAll('[data-language]').forEach((tab) => tab.setAttribute('aria-pressed', String(tab.dataset.language === 'en')));
  byId('preview').dir = 'ltr';
  document.querySelector('.preview-language').textContent = 'English';
  state.coverImage = post.coverImage || '';
  byId('cta').value = post.cta || 'consultation';
  byId('delete-post').hidden = false;
  setStatus(post.published ? 'Published' : 'Draft');
  updatePreview();
  renderPostList();
}

function newPost() {
  state.currentSlug = '';
  state.slugEdited = false;
  for (const field of fields) byId(field).value = '';
  state.markdown = { en: '', fa: '' };
  state.markdownLocale = 'en';
  state.coverImage = '';
  document.querySelectorAll('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === 'en')));
  byId('markdown').dir = 'ltr';
  byId('preview').dir = 'ltr';
  document.querySelector('.preview-language').textContent = 'English';
  byId('category').value = categories[0][0];
  byId('date').value = new Date().toISOString().slice(0, 10);
  byId('cta').value = 'consultation';
  byId('delete-post').hidden = true;
  clearImage();
  setStatus('Not saved', true);
  updatePreview();
  renderPostList();
  byId('title-en').focus();
}

function updatePreview() {
  const markdown = byId('markdown').value;
  state.markdown[state.markdownLocale] = markdown;
  const preview = byId('preview');
  preview.innerHTML = renderMarkdown(markdown) || '<p class="quiet-note">Your article preview will appear here.</p>';
  byId('word-count').textContent = `${wordCount(markdown)} words`;
}

function slugify(value) {
  return value.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90);
}

async function savePost(published) {
  const post = readForm();
  if (showValidation(validateForm(post, published))) return;
  const button = published ? byId('publish-post') : byId('save-draft');
  button.disabled = true;
  byId('save-state').textContent = 'Saving to GitHub…';
  try {
    const result = await request('save', { post: { ...post, published } });
    const index = state.posts.findIndex((item) => item.slug === result.post.slug);
    if (index < 0) state.posts.unshift(result.post); else state.posts[index] = result.post;
    state.currentSlug = result.post.slug;
    byId('delete-post').hidden = false;
    setStatus(published ? 'Published' : 'Draft');
    renderPostList();
    notify(published ? 'Published. Vercel will rebuild the public article.' : 'Draft saved to GitHub.');
  } catch (error) {
    byId('save-state').textContent = 'Save failed';
    if (!showValidation(error.fields)) notify(error.message);
  } finally {
    button.disabled = false;
  }
}

function clearImage() {
  if (state.objectUrl) URL.revokeObjectURL(state.objectUrl);
  state.objectUrl = '';
  state.image = null;
  byId('image-file').value = '';
  byId('image-preview').hidden = true;
}

function selectImage(file) {
  if (!file || !/^image\/(png|jpeg|webp)$/.test(file.type)) return notify('Choose a PNG, JPEG, or WebP image.');
  if (file.size > 15 * 1024 * 1024) return notify('Choose an image under 15 MB before resizing.');
  clearImage();
  state.image = file;
  state.objectUrl = URL.createObjectURL(file);
  byId('crop-x').value = '50';
  byId('crop-y').value = '50';
  byId('set-cover').checked = false;
  byId('image-preview-img').src = state.objectUrl;
  byId('image-preview').hidden = false;
  byId('image-size').textContent = `${file.name} · ${(file.size / 1024).toFixed(0)} KB before resize`;
}

async function cropAndUpload() {
  if (!state.image) return;
  const image = new Image();
  image.src = state.objectUrl;
  await image.decode();
  const ratio = byId('crop-ratio').value;
  const targetRatio = ratio === 'free' ? image.width / image.height : Number(ratio);
  const focusX = Number(byId('crop-x').value) / 100;
  const focusY = Number(byId('crop-y').value) / 100;
  let cropWidth = image.width;
  let cropHeight = image.height;
  if (image.width / image.height > targetRatio) cropWidth = image.height * targetRatio;
  else cropHeight = image.width / targetRatio;
  const cropX = (image.width - cropWidth) * focusX;
  const cropY = (image.height - cropHeight) * focusY;
  const width = Math.min(Number(byId('image-width').value), Math.round(cropWidth));
  const height = Math.max(1, Math.round(width / targetRatio));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', { alpha: false });
  context.drawImage(image, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', .84));
  if (!blob) throw new Error('The image could not be resized.');
  if (blob.size > 700_000) throw new Error('This crop is still too large. Choose a smaller output width.');
  const data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
  const slug = byId('slug').value.trim() || slugify(byId('title-en').value) || 'new-article';
  const filename = `${slug}-${Date.now().toString(36)}.webp`;
  const result = await request('image', { slug, filename, data });
  if (byId('set-cover').checked) state.coverImage = result.url;
  const alt = byId('title-en').value.trim() || 'Article image';
  const textarea = byId('markdown');
  const insertion = `![${alt}](${result.url})`;
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  textarea.setRangeText(`${start > 0 && textarea.value[start - 1] !== '\n' ? '\n\n' : ''}${insertion}\n\n`, start, end, 'end');
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
  clearImage();
  notify('Image resized, uploaded, and inserted.');
}

async function deletePost() {
  if (!state.currentSlug || !window.confirm(`Delete ${state.currentSlug}? This cannot be undone.`)) return;
  try {
    await request('delete', { slug: state.currentSlug });
    state.posts = state.posts.filter((post) => post.slug !== state.currentSlug);
    notify('Article deleted.');
    newPost();
  } catch (error) { notify(error.message); }
}

function init() {
  byId('category').innerHTML = categories.map(([slug, english]) => `<option value="${slug}">${english}</option>`).join('');
  byId('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    byId('login-error').textContent = '';
    try {
      await request('login', { password: byId('password').value });
      byId('password').value = '';
      toggleWorkspace(true);
    } catch (error) { byId('login-error').textContent = error.message; }
  });
  byId('logout').addEventListener('click', async () => { await request('logout', {}); toggleWorkspace(false); });
  byId('new-post').addEventListener('click', newPost);
  byId('save-draft').addEventListener('click', () => savePost(false));
  byId('publish-post').addEventListener('click', () => savePost(true));
  byId('delete-post').addEventListener('click', deletePost);
  byId('markdown').addEventListener('input', () => { updatePreview(); setStatus('Unsaved changes', true); });
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => switchMarkdownLocale(button.dataset.language)));
  for (const id of fields.filter((field) => field !== 'markdown')) {
    byId(id).addEventListener('input', () => {
      if ((id === 'title-en' || id === 'title-fa') && !state.currentSlug && !state.slugEdited) {
        const englishSlug = slugify(byId('title-en').value);
        const hasTitle = byId('title-en').value.trim() || byId('title-fa').value.trim();
        byId('slug').value = englishSlug || (hasTitle ? `article-${byId('date').value.replace(/-/g, '')}` : '');
      }
      byId(id).removeAttribute('aria-invalid');
      setStatus('Unsaved changes', true);
    });
  }
  byId('slug').addEventListener('input', () => {
    state.slugEdited = true;
    byId('slug').removeAttribute('aria-invalid');
  });
  byId('image-file').addEventListener('change', (event) => selectImage(event.target.files[0]));
  for (const id of ['crop-ratio', 'crop-x', 'crop-y']) byId(id).addEventListener('input', () => {
    byId('image-preview-img').style.objectPosition = `${byId('crop-x').value}% ${byId('crop-y').value}%`;
  });
  byId('insert-image').addEventListener('click', () => cropAndUpload().catch((error) => notify(error.message)));
  byId('clear-image').addEventListener('click', clearImage);
  byId('markdown').addEventListener('paste', (event) => {
    const image = [...(event.clipboardData?.items || [])].find((item) => item.type.startsWith('image/'));
    if (image) { event.preventDefault(); selectImage(image.getAsFile()); }
  });
  window.addEventListener('beforeunload', (event) => { if (state.dirty) event.preventDefault(); });
  fetch('/api/blog?action=session', { credentials: 'same-origin' })
    .then((response) => response.json())
    .then((result) => toggleWorkspace(Boolean(result.authenticated)))
    .catch(() => toggleWorkspace(false));
}

init();