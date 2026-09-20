/**
 * iranexpedia.ir — all client behaviour, one file, no dependencies.
 *
 * 1. Analytics + conversion events (dataLayer, forwarded to gtag/plausible)
 * 2. Mobile navigation
 * 3. Scroll reveal
 * 4. Testimonial carousel (slide in from left + typewriter)
 * 5. Forms with a WhatsApp fallback so a lead is never lost
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    root.classList.add('no-js');
    root.classList.remove('js');
  } else {
    root.classList.remove('no-js');
    root.classList.add('js');
  }
  var config = window.__IX_CONFIG__ || {};

  /* ---------------------------------------------------------------- events */

  var dataLayerName = config.dataLayerName || 'dataLayer';
  window[dataLayerName] = window[dataLayerName] || [];

  function track(eventName, params) {
    var payload = Object.assign({ event: eventName }, params || {});
    window[dataLayerName].push(payload);

    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params || {});
    }
    if (typeof window.plausible === 'function') {
      window.plausible(eventName, { props: params || {} });
    }
  }

  window.ixTrack = track;

  // Every CTA carries data-event; clicking it is a measurable conversion step.
  document.addEventListener(
    'click',
    function (e) {
      var el = e.target.closest('[data-event]');
      if (!el) return;
      track(el.getAttribute('data-event'), {
        label: (el.getAttribute('data-event-label') || el.textContent || '').trim().slice(0, 80),
        location: el.getAttribute('data-event-location') || 'page',
        page: document.body.getAttribute('data-page') || location.pathname,
      });
    },
    { passive: true }
  );

  /* ------------------------------------------------------------ navigation */

  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ------------------------------------------ scroll-in + story rail */

  initScrollIn();

  function initScrollIn() {
    var scrollSelector = [
      '.scroll-in',
      '.reveal',
      '.story-hero .story-kicker',
      '.story-hero h1',
      '.story-hero-support',
      '.story-hero .story-price',
      '.story-hero-actions',
      '.story-scroll',
      '.parallel-card',
      '.story-chapter .story-emotion',
      '.story-head',
      '.story-visual',
      '.image-slot',
      '.story-after',
      '.story-bridge',
      '.is-overwhelm > .story-shell > h2',
      '.is-reveal .story-kicker',
      '.is-reveal h2',
      '.is-reveal .story-price',
      '.is-reveal .story-lead',
      '.is-reveal .story-hero-actions',
      '.is-reveal .story-collapse-label',
      '.hero .eyebrow',
      '.hero h1',
      '.hero .lead',
      '.hero .btn-row',
      '.hero .check-list',
      '.hero-visual',
      '.channel-pills',
      '.hero-page h1',
      '.hero-page .lead',
      '.section-head',
      '.card',
      '.process-list > li',
      '.faq-list details',
      '.form-card',
      '.cta-band',
      '.cta-inline',
      '.testimonial-stage',
      '.testimonial-dots',
      '.product-frame',
      '.contact-option',
      '.trust-item',
      '.industry-row',
      '.post-card',
      '.category-nav',
      '.prose > p',
      '.prose > h2',
      '.prose > ul',
      '.prose > ol',
      '.prose > blockquote',
    ].join(',');

    var nodes = document.querySelectorAll(scrollSelector);
    var unique = [];
    var seen = typeof WeakSet === 'function' ? new WeakSet() : null;

    nodes.forEach(function (el) {
      if (seen) {
        if (seen.has(el)) return;
        seen.add(el);
      }
      unique.push(el);
    });

    function stagger(parent, childSelector, step) {
      if (!parent) return;
      var kids;
      try {
        kids = childSelector ? parent.querySelectorAll(childSelector) : parent.children;
      } catch (err) {
        kids = parent.children;
      }
      Array.prototype.forEach.call(kids, function (el, i) {
        if (el.nodeType !== 1) return;
        el.style.setProperty('--scroll-delay', i * step + 'ms');
      });
    }

    var hero = document.querySelector('.story-hero .story-shell') || document.querySelector('.hero > .container') || document.querySelector('.hero-grid');
    stagger(hero, '.story-kicker, h1, .story-hero-support, .story-price, .btn-row, .story-hero-actions, .check-list, .channel-pills, .story-scroll, .lead, .eyebrow', 80);

    document.querySelectorAll('.grid, .price-grid, .process-list, .faq-list, .contact-options, .trust-grid, .parallel-row').forEach(function (parent) {
      stagger(parent, null, 70);
    });

    var chapters = document.querySelectorAll('.story-chapter');
    var railLinks = document.querySelectorAll('.story-rail a');

    function activateRail(id) {
      railLinks.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('data-chapter') === id);
      });
    }

    function revealEl(el) {
      el.classList.add('is-in', 'is-visible');
    }

    if (reduceMotion || !('IntersectionObserver' in window)) {
      unique.forEach(revealEl);
      chapters.forEach(function (el) {
        el.classList.add('is-in');
      });
      return;
    }

    var inObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          revealEl(entry.target);
          inObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    unique.forEach(function (el) {
      inObserver.observe(el);
    });
    chapters.forEach(function (el) {
      inObserver.observe(el);
    });

    if (chapters.length && railLinks.length) {
      var railObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.getAttribute('data-chapter') || entry.target.id;
            if (id) activateRail(id);
          });
        },
        { rootMargin: '-40% 0px -45% 0px', threshold: 0 }
      );
      chapters.forEach(function (el) {
        railObserver.observe(el);
      });
    }
  }

  /* --------------------------------------------- testimonials (kept as-is) */

  initTestimonials();

  function initTestimonials() {
    var stage = document.querySelector('.testimonial-stage');
    var slide = document.getElementById('testimonial-slide');
    var quoteEl = document.getElementById('t-quote-text');
    var nameEl = document.getElementById('t-name');
    var roleEl = document.getElementById('t-role');
    var letterEl = document.getElementById('t-letter');
    var photoEl = document.getElementById('t-photo');
    var avatarEl = document.getElementById('t-avatar');
    var dotsEl = document.getElementById('testimonial-dots');
    var caretEl = document.querySelector('.t-caret');
    var dataEl = document.getElementById('testimonial-data');

    if (!stage || !slide || !quoteEl || !dataEl) return;

    var reviews;
    try {
      reviews = JSON.parse(dataEl.textContent);
    } catch (err) {
      return;
    }
    if (!reviews || !reviews.length) return;

    var index = 0;
    var typingTimer = null;
    var holdTimer = null;
    var running = true;
    var TYPE_MS = 28;
    var HOLD_MS = 2200;
    var EXIT_MS = 520;
    var ENTER_MS = 560;
    var photoCache = Object.create(null);

    preloadPhotos();

    function preloadPhotos() {
      var queue = [];
      var seen = Object.create(null);
      reviews.forEach(function (item) {
        if (!item.photo || seen[item.photo]) return;
        seen[item.photo] = true;
        queue.push(item.photo);
      });

      var i = 0;
      function loadOne() {
        if (i >= queue.length) return;
        var url = queue[i++];
        var img = new Image();
        var settled = false;
        function done() {
          if (settled) return;
          settled = true;
          scheduleNext();
        }
        img.decoding = 'async';
        img.onload = function () {
          photoCache[url] = img;
          done();
        };
        img.onerror = done;
        img.src = url;
        if (img.complete && img.naturalWidth > 0) {
          photoCache[url] = img;
          done();
        }
      }
      function scheduleNext() {
        if (i >= queue.length) return;
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadOne, { timeout: 1200 });
        } else {
          setTimeout(loadOne, 60);
        }
      }
      if ('requestIdleCallback' in window) {
        requestIdleCallback(loadOne, { timeout: 2000 });
      } else {
        setTimeout(loadOne, 350);
      }
    }

    function firstLetter(name) {
      var cleaned = (name || '').replace(/^(دکتر|مهندس|Dr\.)\s+/u, '').trim();
      return cleaned.charAt(0) || '?';
    }

    function setAvatar(item) {
      if (!letterEl || !photoEl || !avatarEl) return;
      letterEl.textContent = firstLetter(item.name);
      avatarEl.classList.remove('has-photo');
      photoEl.hidden = true;
      photoEl.removeAttribute('src');
      if (!item.photo) return;

      function showPhoto() {
        photoEl.hidden = false;
        photoEl.removeAttribute('hidden');
        avatarEl.classList.add('has-photo');
      }

      photoEl.onload = showPhoto;
      photoEl.onerror = function () {
        photoEl.hidden = true;
        avatarEl.classList.remove('has-photo');
      };
      photoEl.alt = item.name;

      var cached = photoCache[item.photo];
      photoEl.src = item.photo;
      if ((cached && cached.complete && cached.naturalWidth > 0) || (photoEl.complete && photoEl.naturalWidth > 0)) {
        showPhoto();
      }
    }

    function buildDots() {
      if (!dotsEl) return;
      dotsEl.innerHTML = '';
      reviews.forEach(function (item, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', (dotsEl.getAttribute('data-label') || 'Review') + ' ' + (i + 1));
        if (i === index) btn.classList.add('is-active');
        btn.addEventListener('click', function () {
          goTo(i, true);
        });
        dotsEl.appendChild(btn);
      });
    }

    function syncDots() {
      if (!dotsEl) return;
      Array.prototype.forEach.call(dotsEl.children, function (btn, i) {
        btn.classList.toggle('is-active', i === index);
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
      quoteEl.textContent = '';
      if (caretEl) caretEl.classList.remove('is-done');
      if (reduceMotion) {
        quoteEl.textContent = full;
        if (caretEl) caretEl.classList.add('is-done');
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
          if (caretEl) caretEl.classList.add('is-done');
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
      if (nameEl) nameEl.textContent = item.name;
      if (roleEl) roleEl.textContent = item.role;
      quoteEl.textContent = '';

      slide.classList.remove('is-enter', 'is-exit', 'is-active');

      function startTyping() {
        slide.classList.remove('is-enter');
        slide.classList.add('is-active');
        typeText(item.text, function () {
          holdTimer = setTimeout(exitAndNext, HOLD_MS);
        });
      }

      if (reduceMotion || skipEnter) {
        slide.classList.add('is-active');
        startTyping();
        return;
      }

      void slide.offsetWidth; // restart the enter animation
      slide.classList.add('is-enter');
      setTimeout(startTyping, ENTER_MS);
    }

    function exitAndNext() {
      if (!running) return;
      if (reduceMotion) {
        showReview(index + 1, true);
        return;
      }
      slide.classList.remove('is-enter', 'is-active');
      slide.classList.add('is-exit');
      setTimeout(function () {
        slide.classList.remove('is-exit');
        showReview(index + 1, false);
      }, EXIT_MS);
    }

    function goTo(i, fromDot) {
      clearTimers();
      running = true;
      if (fromDot && !reduceMotion) {
        slide.classList.remove('is-enter', 'is-active');
        slide.classList.add('is-exit');
        setTimeout(function () {
          slide.classList.remove('is-exit');
          showReview(i, false);
        }, EXIT_MS);
      } else {
        showReview(i, reduceMotion);
      }
    }

    buildDots();

    if ('IntersectionObserver' in window) {
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

    // Pause the carousel while the tab is hidden so timers do not stack up.
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        running = false;
        clearTimers();
      } else if (!running) {
        running = true;
        showReview(index, true);
      }
    });
  }

  /* ------------------------------------------------------------ forms */

  var forms = document.querySelectorAll('form[data-ix-form]');

  forms.forEach(function (form) {
    var statusEl = form.querySelector('.form-status');
    var submitBtn = form.querySelector('[type="submit"]');
    var formName = form.getAttribute('data-ix-form');
    var messages = {
      sending: form.getAttribute('data-msg-sending') || '…',
      error: form.getAttribute('data-msg-error') || 'Error',
      fallback: form.getAttribute('data-msg-fallback') || '',
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (form.querySelector('input[name="_honey"]') && form.querySelector('input[name="_honey"]').value) {
        return; // bot
      }
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      data.delete('_honey');
      data.set('_page', location.pathname);
      data.set('_form', formName);

      track('form_submit', { form: formName, page: location.pathname });

      var endpoint = config.formEndpoint;

      if (!endpoint) {
        // No backend configured yet: hand the lead to WhatsApp with the
        // answers pre-filled rather than dropping it.
        sendToWhatsApp(form, data, messages, statusEl);
        return;
      }

      setStatus(statusEl, messages.sending, 'pending');
      if (submitBtn) submitBtn.disabled = true;

      fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (!res.ok) throw new Error('bad status');
          track('form_success', { form: formName, page: location.pathname });
          var next = form.getAttribute('data-success-url');
          if (next) {
            location.assign(next);
          } else {
            setStatus(statusEl, form.getAttribute('data-msg-success') || 'OK', 'success');
            form.reset();
          }
        })
        .catch(function () {
          setStatus(statusEl, messages.error, 'error');
          sendToWhatsApp(form, data, messages, statusEl);
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  });

  function sendToWhatsApp(form, data, messages, statusEl) {
    var waNumber = (config.whatsapp || '').replace(/\D/g, '');
    if (!waNumber) return;

    var lines = [];
    var intro = form.getAttribute('data-wa-intro');
    if (intro) lines.push(intro);

    form.querySelectorAll('[name]').forEach(function (input) {
      if (input.name.charAt(0) === '_' || !input.value) return;
      var labelEl = input.closest('.field');
      var label = labelEl && labelEl.querySelector('span') ? labelEl.querySelector('span').textContent : input.name;
      lines.push(label.replace(/\s*\*$/, '') + ': ' + input.value);
    });

    track('form_whatsapp_fallback', { form: form.getAttribute('data-ix-form') });
    if (messages.fallback) setStatus(statusEl, messages.fallback, 'success');
    window.open('https://wa.me/' + waNumber + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
  }

  function setStatus(el, text, state) {
    if (!el) return;
    el.textContent = text;
    el.setAttribute('data-state', state);
  }
})();
