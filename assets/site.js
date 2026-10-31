(function () {
  var cfg = window.SITE_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* WhatsApp: shown only when assets/config.js has a real number */
  var wa = $('#wa'), waRow = $('#wa-row');
  var digits = String(cfg.WHATSAPP || '').replace(/\D/g, '');
  if (wa && waRow && digits.length >= 10) {
    wa.href = 'https://wa.me/' + digits + '?text=' + encodeURIComponent(wa.getAttribute('data-msg') || '');
    waRow.hidden = false;
  }

  /* One field: opens the email app with the message ready */
  var form = $('#ask');
  if (form) {
    var mailUrl = function () {
      var need = ($('#need', form).value || '').trim();
      var body = (need ? need + '\n\n' : '') + (form.getAttribute('data-sign') || '');
      var url = 'mailto:' + (cfg.EMAIL || 'filhosantoslucas@gmail.com') +
        '?subject=' + encodeURIComponent(form.getAttribute('data-subject') || '') +
        '&body=' + encodeURIComponent(body);
      form.setAttribute('data-mail', url);
      return url;
    };
    form.addEventListener('input', mailUrl);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = mailUrl();
    });
  }

  /* Local time in Recife, updated each minute */
  var clock = $('#clock');
  if (clock && window.Intl && Intl.DateTimeFormat) {
    var fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Recife' });
    var tick = function () { clock.textContent = fmt.format(new Date()); };
    tick();
    setInterval(tick, 20000);
  }

  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Animated demos: steps appear in order, the cursor moves and clicks, then the loop restarts */
  var demos = $$('.demo');
  function money(v) { return Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function initDemo(d) {
    var steps = $$('[data-s]', d), xs = $$('[data-x]', d), ats = $$('[data-at]', d), curs = $$('[data-cur]', d), types = $$('[data-type]', d);
    var cur = $('.cur', d), ms = +d.getAttribute('data-ms') || 1000, maxS = 0, t = 0, timer = null;
    steps.forEach(function (e) { var s = +e.getAttribute('data-s'); if (s > maxS) maxS = s; });
    types.forEach(function (e) { e.setAttribute('data-full', e.getAttribute('data-type')); });
    function typeInto(e) {
      var txt = e.getAttribute('data-full'), i = 0;
      clearInterval(e._ti); e.textContent = '';
      e._ti = setInterval(function () { i++; e.textContent = txt.slice(0, i); if (i >= txt.length) clearInterval(e._ti); }, Math.max(16, Math.min(38, ms * 0.8 / txt.length)));
    }
    function count(e) {
      var p = e.getAttribute('data-count').split('>'), a = parseFloat(p[0]), b = parseFloat(p[1]), t0 = null;
      (function f(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 700); e.textContent = money(a + (b - a) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(performance.now());
    }
    function stageReset() { $$('.dm-stages', d).forEach(function (g) { var sp = $$('span', g); sp.forEach(function (x) { x.classList.remove('now'); }); if (sp[0]) sp[0].classList.add('now'); }); }
    function toCursor(target) {
      if (!cur) return;
      var dr = d.getBoundingClientRect(), r = target.getBoundingClientRect();
      cur.style.setProperty('--cx', Math.round(r.left - dr.left + r.width * 0.55) + 'px');
      cur.style.setProperty('--cy', Math.round(r.top - dr.top + r.height * 0.6) + 'px');
      cur.classList.add('show');
    }
    function resetAll() {
      ats.forEach(function (e) { e._at = 0; if (e.hasAttribute('data-count')) e.textContent = money(e.getAttribute('data-count').split('>')[0]); });
      stageReset();
      if (cur) { cur.classList.remove('show'); }
    }
    function apply(n) {
      var top = 0;
      steps.forEach(function (e) {
        var s = +e.getAttribute('data-s');
        if (s <= n) { if (!e.classList.contains('on')) { e.classList.add('on'); if (e.hasAttribute('data-type')) typeInto(e); } if (e.classList.contains('dm-row') && s > top) top = s; }
        else { e.classList.remove('on'); if (e.hasAttribute('data-type')) { clearInterval(e._ti); e.textContent = ''; } }
      });
      steps.forEach(function (e) { if (e.classList.contains('dm-row')) e.classList.toggle('last', +e.getAttribute('data-s') === top); });
      xs.forEach(function (e) { e.classList.toggle('off', n >= +e.getAttribute('data-x')); });
      ats.forEach(function (e) {
        var a = +e.getAttribute('data-at');
        if (n >= a && !e._at) {
          e._at = 1;
          if (e.hasAttribute('data-count')) count(e);
          else if (e.parentElement.classList.contains('dm-stages')) { $$('span', e.parentElement).forEach(function (x) { x.classList.remove('now'); }); e.classList.add('now'); }
        }
      });
      curs.forEach(function (e) {
        if (+e.getAttribute('data-cur') !== n) return;
        toCursor(e);
        setTimeout(function () { e.classList.add('pressed'); if (cur) cur.classList.add('press'); setTimeout(function () { e.classList.remove('pressed'); if (cur) cur.classList.remove('press'); }, 160); }, 720);
      });
    }
    function settle() {
      d.classList.add('static');
      steps.forEach(function (e) { e.classList.add('on'); });
      types.forEach(function (e) { e.textContent = e.getAttribute('data-full'); });
      ats.forEach(function (e) { if (e.hasAttribute('data-count')) e.textContent = money(e.getAttribute('data-count').split('>')[1]); else if (e.parentElement.classList.contains('dm-stages')) { $$('span', e.parentElement).forEach(function (x) { x.classList.remove('now'); }); e.classList.add('now'); } });
      xs.forEach(function (e) { e.classList.add('off'); });
    }
    if (still) { settle(); return; }
    ats.forEach(function (e) { if (e.hasAttribute('data-count')) e.textContent = money(e.getAttribute('data-count').split('>')[0]); });
    types.forEach(function (e) { e.textContent = ''; });
    stageReset();
    function tick() { t++; if (t > maxS + 3) { t = 0; resetAll(); apply(0); } else { apply(t); } }
    function start() { if (timer) return; d.classList.remove('paused'); if (t === 0) apply(0); timer = setInterval(tick, ms); }
    function stop() { clearInterval(timer); timer = null; d.classList.add('paused'); }
    d._start = start; d._stop = stop;
  }
  demos.forEach(initDemo);
  var nx = $('.nx-mark');
  if ('IntersectionObserver' in window) {
    var dio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var el = en.target;
        if (el.classList.contains('nx-mark')) { el.classList.toggle('live', en.isIntersecting); return; }
        if (en.isIntersecting) { if (el._start) el._start(); } else if (el._stop) { el._stop(); }
      });
    }, { threshold: 0.3 });
    demos.forEach(function (d) { dio.observe(d); });
    if (nx) dio.observe(nx);
  } else {
    demos.forEach(function (d) { if (d._start) d._start(); });
    if (nx) nx.classList.add('live');
  }

  /* Footage plays only while on screen, and not at all with reduced motion */
  var vids = $$('video[loop]');
  if (vids.length && 'IntersectionObserver' in window && !still) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { v.preload = 'auto'; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.25 });
    vids.forEach(function (v) { vio.observe(v); });
  }

  /* The header takes the field and ink of the chapter under it */
  var bar = $('#bar');
  var chapters = $$('[data-chapter]');
  var ticking = false;
  function paintBar() {
    ticking = false;
    if (!bar) return;
    var y = bar.offsetHeight / 2, theme = 'dark';
    for (var i = 0; i < chapters.length; i++) {
      var r = chapters[i].getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { theme = chapters[i].getAttribute('data-chapter'); }
    }
    if (bar.getAttribute('data-theme') !== theme) bar.setAttribute('data-theme', theme);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(paintBar); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  paintBar();

  /* Entrances: heading, then text, then picture, staggered, once */
  var items = $$('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px 14% 0px', threshold: 0.02 });
    items.forEach(function (el) {
      var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) { return c.classList.contains('rv'); });
      el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 70 + 'ms');
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();
