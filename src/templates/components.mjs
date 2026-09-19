/** Reusable blocks shared by every page. */

import { esc, markPlaceholders, attrs } from '../lib/html.mjs';
import { t, tList, localizeDigits } from '../lib/i18n.mjs';
import { routes, localePath } from '../lib/routes.mjs';
import { site, nav, primaryCta, secondaryCta } from '../data/site.mjs';
import { services } from '../data/services.mjs';
import { categories } from '../data/blog.mjs';
import { testimonials } from '../data/testimonials.mjs';
import { icon, iconTile } from './icons.mjs';

const strings = {
  fa: {
    skip: 'رفتن به محتوای اصلی',
    menu: 'منو',
    langSwitch: 'English',
    langSwitchLabel: 'switch to English',
    call: 'تماس',
    whatsapp: 'واتساپ',
    bale: 'بله',
    phone: 'تلفن',
    email: 'ایمیل',
    address: 'آدرس',
    hours: 'ساعات کاری',
    quickLinks: 'دسترسی سریع',
    servicesTitle: 'خدمات',
    blogTitle: 'بلاگ',
    rights: 'تمامی حقوق محفوظ است.',
    product: 'محصول',
    reviewLabel: 'نظر',
    readMore: 'ادامه مطلب',
    seeAll: 'مشاهده همه',
    problem: 'مشکل',
    whatWeDid: 'کاری که کردیم',
    result: 'نتیجه',
    faqTitle: 'سوالات پرتکرار',
    breadcrumbHome: 'خانه',
    formName: 'نام',
    formBusiness: 'نام کسب‌وکار',
    formPhone: 'شماره تماس یا واتساپ',
    formTopic: 'موضوع',
    formMessage: 'بیشتر توضیح دهید (اختیاری)',
    formWebsite: 'آدرس سایت یا پیج (اختیاری)',
    formSubmitConsult: 'رزرو جلسه مشاوره',
    formSubmitAudit: 'درخواست ارزیابی رایگان',
    formSending: 'در حال ارسال…',
    formSuccess: 'پیام شما ثبت شد. به‌زودی تماس می‌گیریم.',
    formError: 'ارسال انجام نشد. از طریق واتساپ ادامه می‌دهیم.',
    formFallback: 'واتساپ باز شد تا پیام شما با همین اطلاعات ارسال شود.',
    formLegal: 'اطلاعات شما فقط برای پاسخ به همین درخواست استفاده می‌شود.',
    required: 'الزامی',
    topicOptions: [
      'مشاوره رشد کسب‌وکار',
      'دموی بیدار (CRM و پیام‌ها)',
      'سایت و حضور دیجیتال',
      'سئو و دیده‌شدن',
      'محتوا و شبکه‌های اجتماعی',
      'موضوع دیگر',
    ],
    waIntro: 'درخواست از سایت ایران اکسپدیا:',
  },
  en: {
    skip: 'Skip to main content',
    menu: 'Menu',
    langSwitch: 'فارسی',
    langSwitchLabel: 'switch to Persian',
    call: 'Call',
    whatsapp: 'WhatsApp',
    bale: 'Bale',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    hours: 'Hours',
    quickLinks: 'Quick links',
    servicesTitle: 'Services',
    blogTitle: 'Blog',
    rights: 'All rights reserved.',
    product: 'Product',
    reviewLabel: 'Review',
    readMore: 'Read more',
    seeAll: 'See all',
    problem: 'Problem',
    whatWeDid: 'What we did',
    result: 'Result',
    faqTitle: 'Frequently asked questions',
    breadcrumbHome: 'Home',
    formName: 'Name',
    formBusiness: 'Business name',
    formPhone: 'Phone or WhatsApp number',
    formTopic: 'Topic',
    formMessage: 'Tell us a bit more (optional)',
    formWebsite: 'Website or social profile (optional)',
    formSubmitConsult: 'Book the consultation',
    formSubmitAudit: 'Request the free audit',
    formSending: 'Sending…',
    formSuccess: 'Received. We will be in touch shortly.',
    formError: 'That did not send. Continuing on WhatsApp.',
    formFallback: 'WhatsApp opened with your details pre-filled.',
    formLegal: 'We use your details only to answer this request.',
    required: 'required',
    topicOptions: [
      'Growth consultation',
      'Bidar demo (CRM & messaging)',
      'Website & digital presence',
      'SEO & visibility',
      'Content & social',
      'Something else',
    ],
    waIntro: 'Request from the IranExpedia website:',
  },
};

export function s(locale) {
  return strings[locale] || strings.fa;
}

/* ------------------------------------------------------------------ header */

export function header(locale, activeKey, altPath) {
  const str = s(locale);
  const brandName = t(site.name, locale);

  const links = nav
    .map((item) => {
      const href = t(item.path, locale);
      const current = item.key === activeKey ? ' aria-current="page"' : '';
      return `<li><a href="${esc(href)}"${current}>${esc(t(item.label, locale))}</a></li>`;
    })
    .join('');

  const otherLocale = locale === 'fa' ? 'en' : 'fa';

  return `<a class="skip-link" href="#main">${esc(str.skip)}</a>
<header class="site-header">
  <div class="container header-inner">
    <a class="brand" href="${esc(localePath(routes.home, locale))}" aria-label="${esc(brandName)}">
      <img src="/assets/logoWithTitles.svg" alt="${esc(brandName)}" width="150" height="38" fetchpriority="high" />
    </a>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="${esc(str.menu)}">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav" id="site-nav" aria-label="${esc(str.quickLinks)}">
      <ul>${links}</ul>
      <div class="header-tools">
        <a class="header-phone" href="tel:${esc(site.contact.mobile)}" dir="ltr" data-event="call_click" data-event-location="header">${esc(t(site.contact.mobileDisplay, locale))}</a>
        <a class="lang-toggle" href="${esc(altPath)}" hreflang="${otherLocale}" lang="${otherLocale}" aria-label="${esc(str.langSwitchLabel)}" data-event="language_switch">${esc(str.langSwitch)}</a>
        <a class="btn btn-primary btn-sm" href="${esc(t(primaryCta.path, locale))}" data-event="${primaryCta.event}" data-event-location="header">${esc(t(primaryCta.label, locale))}</a>
      </div>
    </nav>
  </div>
</header>`;
}

/* ------------------------------------------------------------------ footer */

export function footer(locale) {
  const str = s(locale);
  const year = new Date().getFullYear();
  const serviceLinks = services
    .map(
      (svc) =>
        `<li><a href="${esc(localePath(routes.service(svc.slug), locale))}">${esc(t(svc.title, locale))}</a></li>`
    )
    .join('');

  const categoryLinks = categories
    .map(
      (cat) =>
        `<li><a href="${esc(localePath(routes.blogCategory(cat.slug), locale))}">${esc(t(cat.title, locale))}</a></li>`
    )
    .join('');

  const badges = site.trustBadges.enamad
    ? `<div class="footer-badges">${site.trustBadges.enamad}</div>`
    : '';

  return `<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <img src="/assets/logoWithTitles.svg" alt="${esc(t(site.name, locale))}" width="140" height="36" loading="lazy" />
        <p>${esc(t(site.tagline, locale))}</p>
        <p>
          <a href="tel:${esc(site.contact.mobile)}" data-event="call_click" data-event-location="footer" dir="ltr">${esc(t(site.contact.mobileDisplay, locale))}</a>
          · <a href="${esc(site.contact.whatsapp)}" rel="noopener" target="_blank" data-event="whatsapp_click" data-event-location="footer">${esc(str.whatsapp)}</a>
        </p>
        ${badges}
      </div>
      <div>
        <h4>${esc(str.servicesTitle)}</h4>
        <ul>${serviceLinks}</ul>
      </div>
      <div>
        <h4>${esc(str.product)}</h4>
        <ul>
          <li><a href="${esc(localePath(routes.bidar, locale))}">${esc(t(site.product.name, locale))}</a></li>
          <li><a href="${esc(site.product.url)}" rel="noopener" target="_blank">bidar-app.ir</a></li>
          <li><a href="${esc(localePath(routes.caseStudies, locale))}">${esc(t({ fa: 'نمونه‌کارها', en: 'Case studies' }, locale))}</a></li>
          <li><a href="${esc(localePath(routes.about, locale))}">${esc(t({ fa: 'درباره ما', en: 'About' }, locale))}</a></li>
          <li><a href="${esc(localePath(routes.contact, locale))}">${esc(t({ fa: 'تماس', en: 'Contact' }, locale))}</a></li>
        </ul>
      </div>
      <div>
        <h4>${esc(str.blogTitle)}</h4>
        <ul>${categoryLinks}</ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${localizeDigits(year, locale)} ${esc(t(site.name, locale))} — ${esc(str.rights)}</p>
      <p>${esc(t(site.contact.address, locale))}</p>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------- mobile action bar (CTA) */

export function actionBar(locale) {
  const str = s(locale);
  return `<div class="action-bar">
  <a class="btn btn-primary" href="${esc(t(primaryCta.path, locale))}" data-event="${primaryCta.event}" data-event-location="action_bar">${esc(t(primaryCta.label, locale))}</a>
  <a class="btn btn-secondary" href="${esc(site.contact.whatsapp)}" target="_blank" rel="noopener" data-event="whatsapp_click" data-event-location="action_bar" aria-label="${esc(str.whatsapp)}">${icon('whatsapp')}</a>
  <a class="btn btn-secondary" href="tel:${esc(site.contact.mobile)}" data-event="call_click" data-event-location="action_bar" aria-label="${esc(str.call)}">${icon('phone')}</a>
</div>`;
}

/* ------------------------------------------------------------- page pieces */

export function breadcrumbs(locale, trail) {
  const str = s(locale);
  const items = [{ label: str.breadcrumbHome, href: localePath(routes.home, locale) }, ...trail];
  const html = items
    .map((item, i) => {
      const last = i === items.length - 1;
      return `<li>${last || !item.href ? `<span>${esc(item.label)}</span>` : `<a href="${esc(item.href)}">${esc(item.label)}</a>`}</li>`;
    })
    .join('');
  return `<nav class="breadcrumbs" aria-label="breadcrumb"><ol>${html}</ol></nav>`;
}

export function trustStrip(locale) {
  const items = site.stats
    .map(
      (stat) => `<div class="trust-item">
      <span class="trust-value${stat.placeholder ? ' placeholder-value' : ''}">${esc(localizeDigits(stat.value, locale))}</span>
      <span class="trust-label">${esc(t(stat.label, locale))}</span>
    </div>`
    )
    .join('');

  const industries = tList(site.industries, locale)
    .map((name) => `<li>${esc(name)}</li>`)
    .join('');

  return `<section class="trust-strip" aria-label="${esc(t({ fa: 'اعداد و صنایع', en: 'Numbers and industries' }, locale))}">
  <div class="container">
    <div class="trust-grid">${items}</div>
    <ul class="industry-row">${industries}</ul>
  </div>
</section>`;
}

export function ctaBand(locale, { title, text, primary, secondary, location = 'cta_band' }) {
  const primaryLink = primary || { label: t(primaryCta.label, locale), href: t(primaryCta.path, locale), event: primaryCta.event };
  const secondaryLink = secondary === null ? null : secondary || { label: t(secondaryCta.label, locale), href: t(secondaryCta.path, locale), event: secondaryCta.event };

  return `<section class="section">
  <div class="container">
    <div class="cta-band reveal">
      <h2>${esc(title)}</h2>
      <p>${esc(text)}</p>
      <div class="btn-row">
        <a class="btn btn-primary btn-lg" href="${esc(primaryLink.href)}" data-event="${esc(primaryLink.event)}" data-event-location="${esc(location)}">${esc(primaryLink.label)}</a>
        ${secondaryLink ? `<a class="btn btn-secondary btn-lg" href="${esc(secondaryLink.href)}" data-event="${esc(secondaryLink.event)}" data-event-location="${esc(location)}">${esc(secondaryLink.label)}</a>` : ''}
      </div>
    </div>
  </div>
</section>`;
}

export function inlineCta(locale, { text, label, href, event, location = 'inline' }) {
  return `<aside class="cta-inline">
  <p>${esc(text)}</p>
  <a class="btn btn-primary" href="${esc(href)}" data-event="${esc(event)}" data-event-location="${esc(location)}">${esc(label)}</a>
</aside>`;
}

export function faqBlock(locale, items, { title } = {}) {
  const str = s(locale);
  const list = items
    .map(
      (item) => `<details>
      <summary>${esc(t(item.q, locale))}</summary>
      <p>${markPlaceholders(t(item.a, locale))}</p>
    </details>`
    )
    .join('');

  return `<section class="section" id="faq">
  <div class="container container-narrow">
    <div class="section-head is-centered">
      <h2>${esc(title || str.faqTitle)}</h2>
    </div>
    <div class="faq-list">${list}</div>
  </div>
</section>`;
}

/** Testimonial carousel: slides in from the left, types the quote out. */
export function testimonialBlock(locale, { title, lead, variant = 'product' } = {}) {
  const str = s(locale);
  const payload = testimonials.map((item) => ({
    name: t(item.name, locale),
    role: t(item.role, locale),
    text: t(variant === 'home' && item.homeText ? item.homeText : item.text, locale),
    photo: item.photo || null,
  }));

  const first = payload[0];

  return `<section class="section section-tint" id="testimonials">
  <div class="container">
    <div class="section-head is-centered">
      <h2>${esc(title || t({ fa: 'نظر مشتریان', en: 'What clients say' }, locale))}</h2>
      ${lead ? `<p>${esc(lead)}</p>` : ''}
    </div>
    <div class="testimonial-stage" aria-live="polite">
      <article class="testimonial-slide is-active" id="testimonial-slide" aria-atomic="true">
        <div class="t-avatar" id="t-avatar">
          <span class="t-letter" id="t-letter">${esc(first.name.charAt(0))}</span>
          <img id="t-photo" alt="" width="64" height="64" hidden />
        </div>
        <blockquote class="t-quote"><span id="t-quote-text">${esc(first.text)}</span><span class="t-caret is-done" aria-hidden="true"></span></blockquote>
        <div class="t-meta">
          <strong id="t-name">${esc(first.name)}</strong>
          <span id="t-role">${esc(first.role)}</span>
        </div>
      </article>
    </div>
    <div class="testimonial-dots" id="testimonial-dots" data-label="${esc(str.reviewLabel)}"></div>
    <script type="application/json" id="testimonial-data">${JSON.stringify(payload).replace(/</g, '\\u003c')}</script>
  </div>
</section>`;
}

/* ------------------------------------------------------------------- forms */

/**
 * @param {'consultation'|'audit'} variant
 */
export function leadForm(locale, variant, { topicDefault = '' } = {}) {
  const str = s(locale);
  const isAudit = variant === 'audit';
  const formName = isAudit ? 'digital_presence_audit' : 'growth_consultation';
  const submitLabel = isAudit ? str.formSubmitAudit : str.formSubmitConsult;

  const topicOptions = str.topicOptions
    .map((option, i) => `<option value="${esc(option)}"${topicDefault && i === 1 ? ' selected' : ''}>${esc(option)}</option>`)
    .join('');

  const formAttrs = attrs({
    'data-ix-form': formName,
    'data-success-url': t(site.forms.successPath, locale),
    'data-msg-sending': str.formSending,
    'data-msg-success': str.formSuccess,
    'data-msg-error': str.formError,
    'data-msg-fallback': str.formFallback,
    'data-wa-intro': str.waIntro,
    novalidate: true,
  });

  return `<form class="form-card" ${formAttrs} method="post" action="${esc(t(site.forms.successPath, locale))}">
  <div class="field-row">
    <label class="field"><span>${esc(str.formName)} *</span>
      <input type="text" name="name" autocomplete="name" required />
    </label>
    <label class="field"><span>${esc(str.formPhone)} *</span>
      <input type="tel" name="phone" inputmode="tel" autocomplete="tel" dir="ltr" required />
    </label>
  </div>
  <div class="field-row">
    <label class="field"><span>${esc(str.formBusiness)}</span>
      <input type="text" name="business" autocomplete="organization" />
    </label>
    <label class="field"><span>${esc(isAudit ? str.formWebsite : str.formTopic)}</span>
      ${
        isAudit
          ? '<input type="text" name="website" dir="ltr" placeholder="example.ir" />'
          : `<select name="topic">${topicOptions}</select>`
      }
    </label>
  </div>
  <label class="field"><span>${esc(str.formMessage)}</span>
    <textarea name="message" rows="4"></textarea>
  </label>
  <div class="form-honey" aria-hidden="true">
    <label>Leave empty<input type="text" name="_honey" tabindex="-1" autocomplete="off" /></label>
  </div>
  <button class="btn btn-primary btn-lg btn-block" type="submit" data-event="${isAudit ? 'audit_request' : primaryCta.event}" data-event-location="form">${esc(submitLabel)}</button>
  <p class="form-status" role="status" aria-live="polite"></p>
  <p class="form-legal">${esc(str.formLegal)}</p>
</form>`;
}

/* -------------------------------------------------------- contact options */

export function contactOptions(locale) {
  const str = s(locale);
  const cards = [];

  cards.push(`<a class="contact-option" href="tel:${esc(site.contact.mobile)}" data-event="call_click" data-event-location="contact_options">
    ${iconTile('phone')}
    <span><span class="contact-label">${esc(str.call)}</span><span class="contact-value" dir="ltr">${esc(t(site.contact.mobileDisplay, locale))}</span></span>
  </a>`);

  cards.push(`<a class="contact-option" href="${esc(site.contact.whatsapp)}" target="_blank" rel="noopener" data-event="whatsapp_click" data-event-location="contact_options">
    ${iconTile('whatsapp')}
    <span><span class="contact-label">${esc(str.whatsapp)}</span><span class="contact-value" dir="ltr">${esc(t(site.contact.mobileDisplay, locale))}</span></span>
  </a>`);

  if (site.contact.bale.handle) {
    cards.push(`<a class="contact-option" href="${esc(site.contact.bale.baseUrl + site.contact.bale.handle)}" target="_blank" rel="noopener" data-event="bale_click" data-event-location="contact_options">
    ${iconTile('bale')}
    <span><span class="contact-label">${esc(str.bale)}</span><span class="contact-value" dir="ltr">${esc(site.contact.bale.handle)}</span></span>
  </a>`);
  } else {
    // No Bale ID configured yet — shown as an obvious placeholder rather than
    // a dead link. Set site.contact.bale.handle to activate it.
    cards.push(`<div class="contact-option is-placeholder">
    ${iconTile('bale')}
    <span><span class="contact-label">${esc(str.bale)}</span><span class="contact-value placeholder-value">${esc(site.contact.bale.placeholder)}</span></span>
  </div>`);
  }

  cards.push(`<a class="contact-option" href="tel:${esc(site.contact.phone)}" data-event="call_click" data-event-location="contact_options">
    ${iconTile('phone')}
    <span><span class="contact-label">${esc(str.phone)}</span><span class="contact-value" dir="ltr">${esc(t(site.contact.phoneDisplay, locale))}</span></span>
  </a>`);

  cards.push(`<a class="contact-option" href="mailto:${esc(site.contact.email)}" data-event="email_click" data-event-location="contact_options">
    ${iconTile('mail')}
    <span><span class="contact-label">${esc(str.email)}</span><span class="contact-value" dir="ltr">${esc(site.contact.email)}</span></span>
  </a>`);

  cards.push(`<div class="contact-option">
    ${iconTile('pin')}
    <span><span class="contact-label">${esc(str.address)}</span><span class="contact-value">${esc(t(site.contact.address, locale))}</span></span>
  </div>`);

  cards.push(`<div class="contact-option">
    ${iconTile('clock')}
    <span><span class="contact-label">${esc(str.hours)}</span><span class="contact-value">${esc(t(site.contact.hours, locale))}</span></span>
  </div>`);

  return `<div class="contact-options">${cards.join('\n')}</div>`;
}

/* ------------------------------------------------------------ list helpers */

export function serviceTile(locale, svc) {
  return `<a class="card card-link reveal" href="${esc(localePath(routes.service(svc.slug), locale))}">
  ${iconTile(svc.icon)}
  <h3>${esc(t(svc.title, locale))}</h3>
  <p class="muted">${esc(t(svc.promise, locale))}</p>
</a>`;
}

export function checkList(items) {
  return `<ul class="check-list">${items.map((item) => `<li>${markPlaceholders(item)}</li>`).join('')}</ul>`;
}

export function arrowList(items) {
  return `<ul class="arrow-list">${items.map((item) => `<li>${markPlaceholders(item)}</li>`).join('')}</ul>`;
}
