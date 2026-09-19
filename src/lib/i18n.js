/** Locale helpers: text picking, direction and Jalali date formatting. */

export const localeMeta = {
  fa: { lang: 'fa', dir: 'rtl', htmlLang: 'fa-IR', ogLocale: 'fa_IR' },
  en: { lang: 'en', dir: 'ltr', htmlLang: 'en', ogLocale: 'en_US' },
};

/** Pick the string for a locale from a `{ fa, en }` object (or pass through). */
export function t(value, locale) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value;
  if (locale in value) return value[locale];
  return value.fa ?? value.en ?? '';
}

/** Same as `t` but always returns an array. */
export function tList(value, locale) {
  const picked = t(value, locale);
  return Array.isArray(picked) ? picked : [picked].filter(Boolean);
}

const jalaliFormatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-arabext', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

const gregorianFormatter = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/** Blog dates: Jalali for Persian pages, Gregorian for English pages. */
export function formatDate(iso, locale) {
  const date = new Date(`${iso}T00:00:00Z`);
  return locale === 'fa' ? jalaliFormatter.format(date) : gregorianFormatter.format(date);
}

const faDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** Persian digits for numbers shown inside Persian copy. */
export function localizeDigits(input, locale) {
  const text = String(input);
  if (locale !== 'fa') return text;
  return text.replace(/\d/g, (d) => faDigits[Number(d)]);
}

export function readingTime(minutes, locale) {
  return locale === 'fa'
    ? `${localizeDigits(minutes, 'fa')} دقیقه مطالعه`
    : `${minutes} min read`;
}
