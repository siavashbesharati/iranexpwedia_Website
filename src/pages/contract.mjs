import { esc } from '../lib/html.mjs';
import { t } from '../lib/i18n.mjs';
import { routes, localePath } from '../lib/routes.mjs';
import { layout, breadcrumbSchema } from '../templates/layout.mjs';
import { breadcrumbs } from '../templates/components.mjs';
import { site } from '../data/site.mjs';

const copy = {
  fa: {
    title: 'قالب قرارداد همکاری',
    description: 'قالب قابل ویرایش قرارداد همکاری ایران‌اکسپدیا؛ اطلاعات طرفین و مفاد را تکمیل کنید و نسخه چاپی یا PDF بگیرید.',
    hint: 'روی بخش‌های خط‌چین کلیک کنید و اطلاعات را وارد کنید؛ سپس نسخه چاپی یا PDF بگیرید.',
    reset: 'بازگردانی مقادیر پیش‌فرض',
    print: 'چاپ / خروجی PDF',
    resetConfirm: 'همه فیلدها به مقادیر پیش‌فرض بازگردانده شوند؟',
    titleDefault: 'قرارداد همکاری ایران‌اکسپدیا و نوین آرمان',
    titlePlaceholder: 'عنوان قرارداد',
    subtitle: 'این قرارداد بر اساس توافق طرفین و مطابق قوانین جاری تنظیم می‌گردد.',
    datePlaceholder: 'تاریخ',
    parties: [
      {
        title: 'طرف اول (کارفرما)',
        fields: [
          ['نام / شرکت', 'درنا سیستم شمس (با نام تجاری ایران‌اکسپدیا)', 'نام کامل یا نام شرکت'],
          ['شماره ثبت', '14010032992', 'شماره ثبت'],
          ['نشانی', 'خیابان وزرا، کوچه ششم، پلاک ۱۴، واحد ۱', 'نشانی'],
          ['تلفن', '09120674032', 'شماره تماس'],
        ],
      },
      {
        title: 'طرف دوم (پیمانکار / ارائه‌دهنده خدمات)',
        fields: [
          ['نام / شرکت', '', 'نام کامل یا نام شرکت'],
          ['شماره ثبت', '', 'شماره ثبت'],
          ['نشانی', '', 'نشانی'],
          ['تلفن', '', 'شماره تماس'],
        ],
      },
    ],
    headings: [
      'ماده ۱ — موضوع قرارداد',
      'ماده ۲ — مدت قرارداد',
      'ماده ۳ — مبلغ و نحوه پرداخت',
      'ماده ۴ — تعهدات طرف اول',
      'ماده ۵ — تعهدات طرف دوم',
      'ماده ۶ — محرمانگی',
      'ماده ۷ — فسخ قرارداد',
      'ماده ۸ — حل اختلاف',
      'ماده ۹ — نسخ قرارداد',
      'ماده ۱۰ — اعتبار الکترونیکی قرارداد',
    ],
    subject: 'ارائه خدمات رهبری و مدیریت رشد دیجیتال (Leadership & Growth Management) توسط ایران‌اکسپدیا به نوین آرمان؛ شامل تعیین مسیر رشد، تدوین Roadmap و اولویت‌ها، طراحی استراتژی محتوا و Niche Market، طراحی Funnel و Campaign، تعیین Taskهای تیم اجرایی، بررسی و اصلاح خروجی‌ها، و تحلیل داده و KPI.',
    subjectPlaceholder: 'شرح کامل موضوع قرارداد و خدمات موردنظر را اینجا بنویسید…',
    durationLead: 'این قرارداد از تاریخ',
    durationMiddle: 'به مدت',
    durationDefault: '۳ ماه',
    durationPlaceholder: 'مدت قرارداد',
    durationEnd: 'تا تاریخ',
    durationTail: 'معتبر است و در صورت توافق طرفین قابل تمدید می‌باشد.',
    amountLead: 'مبلغ کل این قرارداد',
    amountDefault: '۴۵,۰۰۰,۰۰۰',
    amountPlaceholder: 'مبلغ به تومان',
    amountMiddle: 'تومان است که به‌صورت',
    paymentDefault: 'ماهانه، هر ماه ۱۵,۰۰۰,۰۰۰ تومان',
    paymentPlaceholder: 'نحوه پرداخت',
    amountTail: 'پرداخت می‌شود.',
    obligationsFirst: 'رهبری سیستم رشد؛ تعیین Roadmap و اولویت‌ها؛ طراحی استراتژی محتوا و Niche Market؛ طراحی Funnel و Campaign؛ تعیین Taskهای تیم اجرایی و بررسی خروجی‌ها؛ اصلاح فرآیندها و Mentoring تیم؛ تحلیل داده‌ها و بررسی KPI؛ برگزاری جلسات مدیریتی و تصمیم‌گیری درباره مسیر ادامه کار.',
    obligationsFirstPlaceholder: 'تعهدات و وظایف طرف اول را اینجا بنویسید…',
    obligationsSecond: 'تأمین تیم اجرایی (Editor، Copywriter، Admin)؛ اجرای دقیق دستورها و سناریوهای تعیین‌شده؛ تولید و انتشار محتوا طبق تقویم محتوایی؛ پیگیری لیدها و پاسخ‌گویی به مخاطبان؛ ثبت اطلاعات و ارائه گزارش منظم؛ رعایت هویت بصری و استانداردهای کیفی تعیین‌شده.',
    obligationsSecondPlaceholder: 'تعهدات و وظایف طرف دوم را اینجا بنویسید…',
    confidentiality: 'طرفین متعهد می‌شوند اطلاعات محرمانه یکدیگر را در طول همکاری و پس از پایان آن حفظ کرده و بدون اجازه کتبی طرف مقابل، در اختیار اشخاص ثالث قرار ندهند.',
    terminationLead: 'هر یک از طرفین می‌تواند با اعلام کتبی حداقل',
    terminationPlaceholder: 'مثلاً ۳۰ روز',
    terminationTail: 'پیش از تاریخ موردنظر، نسبت به فسخ این قرارداد اقدام نماید.',
    disputeLead: 'در صورت بروز هرگونه اختلاف، طرفین ابتدا از طریق مذاکره مستقیم و در صورت عدم توافق، از طریق',
    disputePlaceholder: 'مرجع حل اختلاف (داوری / دادگاه صالح)',
    disputeTail: 'اقدام خواهند کرد.',
    copiesLead: 'این قرارداد در',
    copiesPlaceholder: 'تعداد',
    copiesTail: 'نسخه تنظیم و به امضای طرفین رسید و هر نسخه حکم واحد را دارد.',
    electronic: 'این قرارداد در بستر الکترونیکی منعقد گردیده و پس از تأیید و پذیرش مفاد آن توسط طرفین، دارای اعتبار و لازم‌الاجرا بوده و امضای فیزیکی یا دستی طرفین شرط اعتبار، نفوذ و اجرای قرارداد نخواهد بود.',
    disclaimer: 'این سند صرفاً یک قالب عمومی است و توصیه می‌شود پیش از استفاده رسمی، توسط مشاور حقوقی بررسی شود.',
  },
  en: {
    title: 'Collaboration contract template',
    description: 'An editable IranExpedia collaboration agreement template. Complete the parties and terms, then print or save a PDF.',
    hint: 'Select the dotted fields to enter details, then print or save a PDF.',
    reset: 'Restore defaults',
    print: 'Print / Save as PDF',
    resetConfirm: 'Restore all fields to their default values?',
    titleDefault: 'Collaboration Agreement: IranExpedia and Novin Arman',
    titlePlaceholder: 'Contract title',
    subtitle: 'This agreement is made by mutual consent of the parties and in accordance with applicable laws.',
    datePlaceholder: 'Date',
    parties: [
      {
        title: 'Party One (Client)',
        fields: [
          ['Name / company', 'Dorna System Shams (trading as IranExpedia)', 'Full name or company'],
          ['Registration no.', '14010032992', 'Registration number'],
          ['Address', 'Unit 1, No. 14, 6th Alley, Vozara Street, Tehran', 'Address'],
          ['Phone', '09120674032', 'Phone number'],
        ],
      },
      {
        title: 'Party Two (Contractor / service provider)',
        fields: [
          ['Name / company', '', 'Full name or company'],
          ['Registration no.', '', 'Registration number'],
          ['Address', '', 'Address'],
          ['Phone', '', 'Phone number'],
        ],
      },
    ],
    headings: [
      'Article 1 — Scope of agreement',
      'Article 2 — Term',
      'Article 3 — Fee and payment',
      'Article 4 — Responsibilities of Party One',
      'Article 5 — Responsibilities of Party Two',
      'Article 6 — Confidentiality',
      'Article 7 — Termination',
      'Article 8 — Dispute resolution',
      'Article 9 — Counterparts',
      'Article 10 — Electronic validity',
    ],
    subject: 'IranExpedia will provide digital growth leadership and management to Novin Arman, including growth direction, a roadmap and priorities, content and niche-market strategy, funnel and campaign design, task assignment to the delivery team, review and refinement of deliverables, and data and KPI analysis.',
    subjectPlaceholder: 'Describe the scope of the agreement and requested services…',
    durationLead: 'This agreement starts on',
    durationMiddle: 'for a term of',
    durationDefault: '3 months',
    durationPlaceholder: 'Contract term',
    durationEnd: 'and ends on',
    durationTail: 'It may be extended by mutual agreement.',
    amountLead: 'The total fee under this agreement is',
    amountDefault: '45,000,000',
    amountPlaceholder: 'Amount in toman',
    amountMiddle: 'toman, payable as follows:',
    paymentDefault: '15,000,000 toman per month',
    paymentPlaceholder: 'Payment schedule',
    amountTail: '',
    obligationsFirst: 'Lead the growth system; define the roadmap and priorities; design content and niche-market strategy, funnels and campaigns; assign tasks to the delivery team and review outputs; improve processes and mentor the team; analyse data and KPIs; and hold management sessions to decide next steps.',
    obligationsFirstPlaceholder: 'Enter the responsibilities of Party One…',
    obligationsSecond: 'Provide the delivery team (editor, copywriter and administrator); follow the agreed instructions and scenarios; create and publish content according to the editorial calendar; follow up with leads and respond to audiences; keep records and provide regular reports; and follow the agreed visual identity and quality standards.',
    obligationsSecondPlaceholder: 'Enter the responsibilities of Party Two…',
    confidentiality: 'Each party shall protect the other party’s confidential information during and after the collaboration and shall not disclose it to third parties without the other party’s written permission.',
    terminationLead: 'Either party may terminate this agreement by giving written notice at least',
    terminationPlaceholder: 'e.g. 30 days',
    terminationTail: 'before the intended termination date.',
    disputeLead: 'In the event of a dispute, the parties shall first seek to resolve it through direct negotiation. If they cannot agree, they will refer it to',
    disputePlaceholder: 'Arbitration / competent court',
    disputeTail: '.',
    copiesLead: 'This agreement is executed and signed in',
    copiesPlaceholder: 'Number',
    copiesTail: 'counterparts, each of which has equal effect.',
    electronic: 'This agreement is made electronically and becomes valid and enforceable once the parties accept its terms. A physical or handwritten signature is not a condition of its validity or enforcement.',
    disclaimer: 'This is a general-purpose template. Have it reviewed by a legal adviser before formal use.',
  },
};

function field(value, placeholder, block = false) {
  const tag = block ? 'div' : 'span';
  const defaultValue = esc(value);
  return `<${tag} class="contract-fill${block ? ' is-block' : ''}" data-placeholder="${esc(placeholder)}" data-default="${defaultValue}" contenteditable="true" spellcheck="true">${defaultValue}</${tag}>`;
}

function dateField(kind, placeholder) {
  return `<span class="contract-fill" data-placeholder="${esc(placeholder)}" data-default="" data-contract-date="${kind}" contenteditable="true" spellcheck="true"></span>`;
}

function partyMarkup(party) {
  return `<section class="contract-party">
  <h3>${esc(party.title)}</h3>
  ${party.fields
    .map(
      ([label, value, placeholder]) => `<p><strong>${esc(label)}:</strong> ${field(value, placeholder)}</p>`
    )
    .join('\n  ')}
</section>`;
}

export function contractPage(locale, assets) {
  const text = copy[locale] || copy.fa;
  const path = routes.contract;
  const trail = [
    { label: t({ fa: 'قالب قرارداد همکاری', en: 'Contract template' }, locale) },
  ];
  const body = `<section class="contract-shell">
  <div class="container">
    ${breadcrumbs(locale, trail)}
    <div class="contract-toolbar" aria-label="${esc(text.title)}">
      <p>${esc(text.hint)}</p>
      <div class="contract-actions">
        <button class="btn btn-secondary" type="button" id="contract-reset">${esc(text.reset)}</button>
        <button class="btn btn-primary" type="button" id="contract-print">${esc(text.print)}</button>
      </div>
    </div>
    <article class="contract-paper" id="contract-paper">
      <h1>${field(text.titleDefault, text.titlePlaceholder, true)}</h1>
      <p class="contract-subtitle">${esc(text.subtitle)}</p>

      <p>${esc(locale === 'fa' ? 'این قرارداد در تاریخ' : 'This agreement is dated')} ${dateField('start', text.datePlaceholder)} ${esc(locale === 'fa' ? 'فی‌مابین طرفین زیر منعقد می‌گردد:' : 'and is entered into by the following parties:')}</p>
      <div class="contract-parties">${text.parties.map(partyMarkup).join('\n')}</div>

      <h2>${esc(text.headings[0])}</h2>
      ${field(text.subject, text.subjectPlaceholder, true)}

      <h2>${esc(text.headings[1])}</h2>
      <p>${esc(text.durationLead)} ${dateField('start', text.datePlaceholder)} ${esc(text.durationMiddle)} ${field(text.durationDefault, text.durationPlaceholder)} ${esc(text.durationEnd)} ${dateField('end', text.datePlaceholder)} ${esc(text.durationTail)}</p>

      <h2>${esc(text.headings[2])}</h2>
      <p>${esc(text.amountLead)} ${field(text.amountDefault, text.amountPlaceholder)} ${esc(text.amountMiddle)} ${field(text.paymentDefault, text.paymentPlaceholder)} ${esc(text.amountTail)}</p>

      <h2>${esc(text.headings[3])}</h2>
      ${field(text.obligationsFirst, text.obligationsFirstPlaceholder, true)}

      <h2>${esc(text.headings[4])}</h2>
      ${field(text.obligationsSecond, text.obligationsSecondPlaceholder, true)}

      <h2>${esc(text.headings[5])}</h2>
      <p>${esc(text.confidentiality)}</p>

      <h2>${esc(text.headings[6])}</h2>
      <p>${esc(text.terminationLead)} ${field('', text.terminationPlaceholder)} ${esc(text.terminationTail)}</p>

      <h2>${esc(text.headings[7])}</h2>
      <p>${esc(text.disputeLead)} ${field('', text.disputePlaceholder)} ${esc(text.disputeTail)}</p>

      <h2>${esc(text.headings[8])}</h2>
      <p>${esc(text.copiesLead)} ${field('', text.copiesPlaceholder)} ${esc(text.copiesTail)}</p>

      <h2>${esc(text.headings[9])}</h2>
      <p>${esc(text.electronic)}</p>

      <div class="contract-signatures">
        <div><span></span><p>${esc(locale === 'fa' ? 'امضا و مهر طرف اول' : 'Party One signature and stamp')}</p></div>
        <div><span></span><p>${esc(locale === 'fa' ? 'امضا و مهر طرف دوم' : 'Party Two signature and stamp')}</p></div>
      </div>
      <footer>${esc(text.disclaimer)}</footer>
    </article>
  </div>
</section>`;

  return layout(
    {
      locale,
      path,
      navKey: null,
      pageId: 'contract_template',
      bodyClass: 'contract-page',
      title: text.title,
      description: text.description,
      schema: [breadcrumbSchema(locale, trail.map((item) => ({ ...item, href: localePath(path, locale) })))],
      body,
    },
    assets
  );
}