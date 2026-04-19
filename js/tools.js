/* ============================================================
   HerramientasDeTexto.com — tools.js
   Shared utilities for all 300 tool pages
   Exposed on window.HT
   ============================================================ */

(function (global) {
  'use strict';

  /* ── Internal helpers ──────────────────────────────────── */

  var _toastTimer = null;
  var _toastEl    = null;

  function _getToast() {
    if (!_toastEl) {
      _toastEl = document.getElementById('ht-toast');
    }
    return _toastEl;
  }

  /* ── HT namespace ──────────────────────────────────────── */

  var HT = {};

  /**
   * fmt(n) — Format a number using Spanish locale (punto de miles)
   * e.g.  1234 → "1.234"
   */
  HT.fmt = function (n) {
    if (typeof n !== 'number' || isNaN(n)) return '0';
    return n.toLocaleString('es');
  };

  /**
   * fmtTime(words, wpm) — Human-readable reading/speaking time
   * Returns a string like "≈ 4m 27s" or "< 1 s"
   */
  HT.fmtTime = function (words, wpm) {
    if (!words || words <= 0) return '—';
    var wpmVal  = wpm || 225;
    var totalSec = Math.round((words / wpmVal) * 60);
    if (totalSec < 1) return '< 1 s';
    var minutes = Math.floor(totalSec / 60);
    var seconds = totalSec % 60;
    if (minutes === 0) return '\u2248 ' + seconds + ' s';
    if (seconds === 0) return '\u2248 ' + minutes + ' min';
    return '\u2248 ' + minutes + 'm ' + seconds + 's';
  };

  /**
   * pop(el, newVal) — Update element text and trigger pop animation
   * el  : DOM element with class .ht-stat-num
   * newVal : formatted string to set as textContent
   */
  HT.pop = function (el, newVal) {
    if (!el) return;
    if (el.textContent === newVal) return; // no change, no animation
    el.textContent = newVal;
    el.classList.remove('pop');
    /* Force reflow so re-adding the class triggers animation */
    void el.offsetWidth;
    el.classList.add('pop');
    el.addEventListener('animationend', function handler() {
      el.classList.remove('pop');
      el.removeEventListener('animationend', handler);
    });
  };

  /**
   * showToast(msg, duration) — Display the #ht-toast notification
   * msg      : message string
   * duration : ms to show (default 2000)
   */
  HT.showToast = function (msg, duration) {
    var toast = _getToast();
    if (!toast) return;
    var dur = duration || 2000;
    var msgEl = toast.querySelector('span') || toast;
    msgEl.textContent = msg;
    toast.classList.add('show');
    if (_toastTimer) clearTimeout(_toastTimer);
    _toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, dur);
  };

  /**
   * paste(textareaId) — Read clipboard and insert into textarea
   */
  HT.paste = async function (textareaId) {
    var ta = document.getElementById(textareaId);
    if (!ta) return;
    try {
      var text = await navigator.clipboard.readText();
      ta.value = text;
      /* Dispatch input event so the tool's listener fires */
      ta.dispatchEvent(new Event('input'));
      HT.showToast('Texto pegado desde el portapapeles');
    } catch (e) {
      HT.showToast('No se pudo acceder al portapapeles');
    }
  };

  /**
   * copy(text) — Write text to clipboard and show confirmation toast
   */
  HT.copy = async function (text) {
    if (!text) {
      HT.showToast('No hay texto para copiar');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      HT.showToast('Copiado al portapapeles');
    } catch (e) {
      HT.showToast('No se pudo copiar');
    }
  };

  /**
   * faqToggle(btn) — Accordion toggle for .ht-faq-btn elements
   * Pass the button element (or use onclick="HT.faqToggle(this)")
   */
  HT.faqToggle = function (btn) {
    var isOpen   = btn.getAttribute('aria-expanded') === 'true';
    var targetId = btn.getAttribute('aria-controls');
    var body     = document.getElementById(targetId);

    /* Close all others in the same .ht-faq-list */
    var list = btn.closest('.ht-faq-list');
    if (list) {
      list.querySelectorAll('.ht-faq-btn[aria-expanded="true"]').forEach(function (other) {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          var otherId = other.getAttribute('aria-controls');
          var otherBody = document.getElementById(otherId);
          if (otherBody) otherBody.classList.remove('open');
        }
      });
    }

    /* Toggle this item */
    var next = !isOpen;
    btn.setAttribute('aria-expanded', String(next));
    if (body) {
      if (next) {
        body.classList.add('open');
      } else {
        body.classList.remove('open');
      }
    }
  };

  /**
   * updatePlatformBar(barId, current, limit)
   * Updates a platform progress bar and its count label.
   * barId  : the data-bar attribute value
   * current: current character count
   * limit  : platform character limit
   */
  HT.updatePlatformBar = function (barId, current, limit) {
    var fill  = document.querySelector('[data-bar="' + barId + '"] .ht-bar-fill');
    var count = document.querySelector('[data-bar="' + barId + '"] .ht-platform-bar-count');
    if (!fill || !count) return;

    var pct = Math.min((current / limit) * 100, 100);
    fill.style.width = pct + '%';

    /* Color transition: green < 70%, amber 70-95%, red > 95% */
    fill.classList.remove('ht-bar-fill--amber', 'ht-bar-fill--red');
    if (pct > 95) {
      fill.classList.add('ht-bar-fill--red');
    } else if (pct > 70) {
      fill.classList.add('ht-bar-fill--amber');
    }

    count.textContent = HT.fmt(current) + ' / ' + HT.fmt(limit);
    /* Color the count label too */
    count.style.color = pct > 95
      ? 'var(--red)'
      : pct > 70
        ? 'var(--amber)'
        : 'var(--green)';
  };

  /**
   * updateDonut(pct, label)
   * Updates the CSS conic-gradient donut chart.
   * pct   : number 0-100
   * label : text for the centre
   */
  HT.updateDonut = function (pct, label) {
    var donut   = document.querySelector('.ht-donut');
    var pctEl   = document.querySelector('.ht-donut-pct');
    if (!donut) return;
    var safe = Math.min(Math.max(pct, 0), 100);
    donut.style.background =
      'conic-gradient(var(--cat-color) 0% ' + safe + '%, var(--border) ' + safe + '% 100%)';
    if (pctEl) pctEl.textContent = (label !== undefined ? label : Math.round(safe) + '%');
  };

  /**
   * debounce(fn, ms) — Classic debounce utility
   */
  HT.debounce = function (fn, ms) {
    var timer;
    return function () {
      var args = arguments;
      var ctx  = this;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, ms);
    };
  };

  /* ── Expose ────────────────────────────────────────────── */
  global.HT = HT;

}(window));

/* ── Theme toggle (tool & category pages) ───────────────── */
(function () {
  function init() {
    var btn = document.getElementById('ht-theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var html = document.documentElement;
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
