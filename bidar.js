(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var bubbles = document.querySelectorAll(".chat-bubble");
  var demo = document.getElementById("chat-demo");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (bubbles.length) {
    if (reduceMotion || !demo || !("IntersectionObserver" in window)) {
      bubbles.forEach(function (b) {
        b.classList.add("visible");
      });
    } else {
      var shown = false;
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting || shown) return;
            shown = true;
            bubbles.forEach(function (bubble, i) {
              setTimeout(function () {
                bubble.classList.add("visible");
              }, i * 420);
            });
            observer.disconnect();
          });
        },
        { threshold: 0.35 }
      );
      observer.observe(demo);
    }
  }

  /* —— Testimonials carousel + typewriter ——
     To add a profile photo later, set photo: "/assets/reviews/name.png"
     Use lowercase extensions (.png not .PNG) — Linux/Vercel is case-sensitive.
  */
  var reviews = [
    {
      name: "رضا موسوی",
      role: "مدیر فروش · بنگاه املاک ونک",
      text: "قبلاً روزی نزدیک صد پیام دیوار و واتساپ داشتیم و نصف‌شون از دست می‌رفت. بیدار پاسخ اولیه رو می‌ده، مشتری رو به واتساپ می‌آره و شماره رو ذخیره می‌کنه. تیم فروش ما فقط روی لیدهای داغ وقت می‌ذاره.",
      photo: "/assets/reviews/man-1.png"
    },
    {
      name: "مینا احمدی",
      role: "مالک · املاک پارس سعادت‌آباد",
      text: "روی دیوار فایل‌های رهن و اجاره زیادی داریم. بیدار مکالمه رو طبیعی جلو می‌بره و وقتی مشتری جدی باشه تگ «داغ» می‌خوره. برای اولین‌بار قیف فروش املاک‌مون شفاف شده.",
      photo: "/assets/reviews/woman-1.png"
    },
    {
      name: "دکتر سارا نیک‌پی",
      role: "مدیر کلینیک زیبایی آتریوم",
      text: "کلینیک ما نوبت و مشاوره زیادی از بله و واتساپ می‌گیره. پاسخ خودکار بیدار باعث شد منشی‌ها شب‌ها هم پوشش داشته باشن و بیمار از دست نره. تگ «نیاز به انسان» هم عالی کار می‌کنه.",
      photo: "/assets/reviews/woman-2.png"
    },
    {
      name: "علی کرمی",
      role: "مسئول پذیرش · کلینیک دندان‌پزشکی مهر",
      text: "برای کمپین‌های یادآوری چکاپ و تخفیف فصلی، فیلتر روی تگ‌های جدید و قدیمی خیلی کمک کرد. بدون تماس دستی، پیام هدفمند رفت و نرخ برگشت بیمار بهتر شد.",
      photo: "/assets/reviews/man-2.png"
    },
    {
      name: "نگار صالحی",
      role: "مدیر عملیات · آژانس مسافرتی آسمان آبی",
      text: "تور و بلیط آخر هفته پیام خیلی زیادی داره. بیدار روی چند اکانت واتساپ و بله کار می‌کنه و اپراتورها هم‌زمان جواب می‌دن. ایجنت هوشمند هم می‌گه امروز داغ‌ترین لیدها کدوم‌ان.",
      photo: "/assets/reviews/woman-3.png"
    },
    {
      name: "حسین فرهادی",
      role: "مدیر مارکتینگ · سفرهای پارسیان",
      text: "کمپین نوروز رو روی همه مشتریانی که از دیوار یا واتساپ پیام داده بودن زدیم. زمان ارسال و فیلتر تگ «جدید + داغ» دقیقاً همون چیزی بود که برای فروش تور نیاز داشتیم.",
      photo: "/assets/reviews/man-3.png"
    },
    {
      name: "پویا رستمی",
      role: "مدیرعامل · گروه املاک و سرمایه‌گذاری آریا",
      text: "ما بر کسب‌وکار خودمان نیاز به شخصی‌سازی داشتیم که تیم بیدار این کار را کردند و پیشنهاد می‌دهم شما هم اگر نیاز دارید حتماً مطرح کنید؛ تیم بیدار بسیار باهوش هستند و ایده‌های شما را تقویت می‌کنند و به خوبی پیاده‌سازی می‌کنند.",
      photo: "/assets/reviews/man-4.png"
    },
    {
      name: "مریم جعفری",
      role: "بنیان‌گذار · کلینیک پوست و مو نوران",
      text: "سناریوی پاسخ کلینیک ما خاص بود؛ از سوال قیمت تا هماهنگی پزشک. تیم بیدار ایده‌هامون رو گوش داد، بهترش کرد و توی سیستم پیاده کرد. حس می‌کنی شریک فنی داری، نه فقط یک نرم‌افزار آماده.",
      photo: "/assets/reviews/woman-4.png"
    }
  ];

  var slide = document.getElementById("testimonial-slide");
  var quoteEl = document.getElementById("t-quote-text");
  var nameEl = document.getElementById("t-name");
  var roleEl = document.getElementById("t-role");
  var letterEl = document.getElementById("t-letter");
  var photoEl = document.getElementById("t-photo");
  var avatarEl = document.getElementById("t-avatar");
  var dotsEl = document.getElementById("testimonial-dots");
  var caretEl = document.querySelector(".t-caret");

  if (!slide || !quoteEl || !reviews.length) return;

  var index = 0;
  var typingTimer = null;
  var holdTimer = null;
  var running = true;
  var TYPE_MS = 28;
  var HOLD_MS = 2200;
  var EXIT_MS = 520;
  var ENTER_MS = 560;

  function firstLetter(name) {
    var cleaned = (name || "").replace(/^(دکتر|مهندس)\s+/u, "").trim();
    return cleaned.charAt(0) || "?";
  }

  function setAvatar(item) {
    letterEl.textContent = firstLetter(item.name);
    avatarEl.classList.remove("has-photo");
    photoEl.hidden = true;
    photoEl.removeAttribute("src");
    if (item.photo) {
      photoEl.onload = function () {
        photoEl.hidden = false;
        photoEl.removeAttribute("hidden");
        avatarEl.classList.add("has-photo");
      };
      photoEl.onerror = function () {
        photoEl.hidden = true;
        avatarEl.classList.remove("has-photo");
      };
      photoEl.alt = item.name;
      photoEl.src = item.photo;
      if (photoEl.complete && photoEl.naturalWidth > 0) {
        photoEl.onload();
      }
    }
  }

  function buildDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = "";
    reviews.forEach(function (_, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "نظر " + (i + 1));
      if (i === index) btn.classList.add("is-active");
      btn.addEventListener("click", function () {
        goTo(i, true);
      });
      dotsEl.appendChild(btn);
    });
  }

  function syncDots() {
    if (!dotsEl) return;
    Array.prototype.forEach.call(dotsEl.children, function (btn, i) {
      btn.classList.toggle("is-active", i === index);
    });
  }

  function clearTimers() {
    if (typingTimer) {
      clearTimeout(typingTimer);
      typingTimer = null;
    }
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
  }

  function typeText(full, onDone) {
    quoteEl.textContent = "";
    if (caretEl) caretEl.classList.remove("is-done");
    if (reduceMotion) {
      quoteEl.textContent = full;
      if (caretEl) caretEl.classList.add("is-done");
      onDone();
      return;
    }
    var i = 0;
    function step() {
      if (!running) return;
      i += 1;
      quoteEl.textContent = full.slice(0, i);
      if (i < full.length) {
        typingTimer = setTimeout(step, TYPE_MS);
      } else {
        if (caretEl) caretEl.classList.add("is-done");
        onDone();
      }
    }
    step();
  }

  function showReview(i, skipEnter) {
    clearTimers();
    index = (i + reviews.length) % reviews.length;
    var item = reviews[index];
    syncDots();
    setAvatar(item);
    nameEl.textContent = item.name;
    roleEl.textContent = item.role;
    quoteEl.textContent = "";

    slide.classList.remove("is-enter", "is-exit", "is-active");

    function startTyping() {
      slide.classList.remove("is-enter");
      slide.classList.add("is-active");
      typeText(item.text, function () {
        holdTimer = setTimeout(function () {
          exitAndNext();
        }, HOLD_MS);
      });
    }

    if (reduceMotion || skipEnter) {
      slide.classList.add("is-active");
      startTyping();
      return;
    }

    // force reflow so enter animation restarts
    void slide.offsetWidth;
    slide.classList.add("is-enter");
    setTimeout(startTyping, ENTER_MS);
  }

  function exitAndNext() {
    if (!running) return;
    if (reduceMotion) {
      showReview(index + 1, true);
      return;
    }
    slide.classList.remove("is-enter", "is-active");
    slide.classList.add("is-exit");
    setTimeout(function () {
      slide.classList.remove("is-exit");
      showReview(index + 1, false);
    }, EXIT_MS);
  }

  function goTo(i, fromDot) {
    clearTimers();
    running = true;
    if (fromDot && !reduceMotion) {
      slide.classList.remove("is-enter", "is-active");
      slide.classList.add("is-exit");
      setTimeout(function () {
        slide.classList.remove("is-exit");
        showReview(i, false);
      }, EXIT_MS);
    } else {
      showReview(i, reduceMotion);
    }
  }

  buildDots();

  var stage = document.querySelector(".testimonial-stage");
  if (stage && "IntersectionObserver" in window) {
    var started = false;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !started) {
            started = true;
            showReview(0, false);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(stage);
  } else {
    showReview(0, false);
  }
})();
