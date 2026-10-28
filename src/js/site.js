(function () {
  // Mobiel menu
  var menu = document.getElementById('mmenu');
  var opener = document.querySelector('[data-menu-open]');
  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (opener) opener.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { var c = menu.querySelector('[data-menu-close]'); if (c) c.focus(); } else if (opener) { opener.focus(); }
  }
  if (menu) {
    document.querySelectorAll('[data-menu-open]').forEach(function (b) { b.addEventListener('click', function () { setMenu(true); }); });
    menu.querySelectorAll('[data-menu-close]').forEach(function (b) { b.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false); });
    menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  }


  // Contactformulier
  var f = document.getElementById('quote-form');
  if (f) {
    var st = document.getElementById('form-status');
    var btn = f.querySelector('button[type=submit]');
    var say = function (msg, cls) { st.textContent = msg; st.className = 'status ' + cls; st.hidden = false; };
    if (/[?&]sent=1/.test(location.search)) say('Thank you. I received your request and usually reply the same day.', 'ok');
    if (/[?&]error=1/.test(location.search)) say('Sorry, sending failed. Please email me directly at martin@thearrows.nl.', 'err');
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var bad = false;
      ['name', 'email', 'company', 'message'].forEach(function (n) {
        var el = f.elements[n]; var ok = el.value.trim() && (n !== 'email' || /^\S+@\S+\.\S+$/.test(el.value.trim()));
        el.setAttribute('aria-invalid', ok ? 'false' : 'true'); if (!ok) { bad = true; if (bad === true && !f.__first) { f.__first = el; } }
      });
      if (bad) { say('Please fill in your name, a valid email, your company or event and a short message.', 'err'); var first = f.querySelector('[aria-invalid="true"]'); if (first) first.focus(); f.__first = null; return; }
      var data = {}; new FormData(f).forEach(function (v, k) { data[k] = v; });
      btn.disabled = true;
      fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) return r.json().catch(function () { return {}; }).then(function (j) { var e = new Error('send failed'); e.info = (j.error || r.status) + (j.detail ? ': ' + j.detail : ''); throw e; }); return r.json(); })
        .then(function () { f.reset(); say('Thank you. I received your request and usually reply the same day.', 'ok'); })
        .catch(function (e) { say('Sorry, sending failed. Please email me directly at martin@thearrows.nl.' + (e && e.info ? ' (' + e.info + ')' : ''), 'err'); })
        .then(function () { btn.disabled = false; });
    });
  }

  // Portfolio: filter en lightbox
  var gal = document.querySelector('[data-gallery]');
  if (gal) {
    var tiles = Array.prototype.slice.call(gal.querySelectorAll('.tile'));
    var lb = document.getElementById('lb');
    var lbImg = lb.querySelector('[data-lb-img]');
    var cur = -1, lastFocus = null;
    var vis = function () { return tiles.filter(function (t) { return !t.hidden; }); };
    var fp = document.querySelector('.fp');
    if (fp) fp.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-filter]'); if (!a) return;
      e.preventDefault();
      var k = a.getAttribute('data-filter');
      tiles.forEach(function (t) { t.hidden = !(k === 'all' || (' ' + t.getAttribute('data-cat') + ' ').indexOf(' ' + k + ' ') > -1); });
      fp.querySelectorAll('a').forEach(function (x) { x.classList.toggle('on', x === a); if (x === a) x.setAttribute('aria-current', 'true'); else x.removeAttribute('aria-current'); });
    });
    var show = function (i) {
      var v = vis(); if (!v.length) return;
      cur = (i + v.length) % v.length; var t = v[cur];
      lbImg.src = t.getAttribute('href'); lbImg.alt = t.getAttribute('data-alt') || '';
      lb.querySelector('[data-lb-name]').textContent = t.getAttribute('data-name');
      lb.querySelector('[data-lb-rank]').textContent = t.getAttribute('data-catname');
      lb.querySelector('[data-lb-count]').textContent = String(cur + 1).padStart(2, '0') + ' / ' + String(v.length).padStart(2, '0');
    };
    var open = function (t) { lastFocus = t; lb.hidden = false; document.body.classList.add('lb-open'); show(vis().indexOf(t)); lb.querySelector('.x').focus(); };
    var close = function () { lb.hidden = true; document.body.classList.remove('lb-open'); lbImg.removeAttribute('src'); if (lastFocus) lastFocus.focus(); };
    gal.addEventListener('click', function (e) { var t = e.target.closest('.tile'); if (!t) return; e.preventDefault(); open(t); });
    lb.addEventListener('click', function (e) {
      if (e.target.closest('[data-lb-close]')) close();
      else if (e.target.closest('[data-lb-prev]')) show(cur - 1);
      else if (e.target.closest('[data-lb-next]')) show(cur + 1);
    });
    document.addEventListener('keydown', function (e) {
      if (lb.hidden) return;
      if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
    });
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (sx === null) return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); });
  }

  // FAQ: op mobiel ingeklapt
  if (window.matchMedia('(max-width:1099px)').matches) document.querySelectorAll('.faq details[open]').forEach(function (d) { d.removeAttribute('open'); });

  // About-carrousel
  document.querySelectorAll('[data-pcar]').forEach(function (c) {
    var ps = c.querySelectorAll('.ps'), ds = c.querySelectorAll('.pdots button'), k = 0, t = null;
    var rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function go(x) { k = (x + ps.length) % ps.length; ps.forEach(function (p, q) { p.classList.toggle('on', q === k); }); ds.forEach(function (d, q) { d.classList.toggle('on', q === k); }); }
    function start() { if (!rm) { clearInterval(t); t = setInterval(function () { go(k + 1); }, 5000); } }
    ds.forEach(function (d) { d.addEventListener('click', function () { go(+d.getAttribute('data-go')); start(); }); });
    c.addEventListener('mouseenter', function () { clearInterval(t); }); c.addEventListener('mouseleave', start);
    start();
  });

  // Hero-slider
  var s = document.querySelector('[data-slider]');
  if (!s) return;
  var track = s.querySelector('.track');
  var slides = Array.prototype.slice.call(track.children);
  var n = slides.length;
  var num = s.querySelector('[data-num]');
  var cap = s.querySelector('[data-cap]');
  var bar = s.querySelector('.bar i');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var i = 0, timer = null;
  function show(k) {
    i = (k + n) % n;
    track.style.transform = 'translateX(' + (-i * 100) + '%)';
    slides.forEach(function (el, j) { el.classList.toggle('on', j === i); });
    num.textContent = (i + 1 < 10 ? '0' : '') + (i + 1);
    cap.textContent = slides[i].getAttribute('data-name');
    bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
  }
  // Overige slides pas ná het laden van de pagina ophalen (geen concurrentie met de eerste foto),
  // en pas doorschuiven als de volgende foto er ook echt is.
  function ready(k) { var im = slides[(k + n) % n].querySelector('img'); return !im || im.complete; }
  function warm() { slides.forEach(function (el) { var im = el.querySelector('img'); if (im && im.loading === 'lazy') im.loading = 'eager'; }); }
  if (document.readyState === 'complete') warm(); else window.addEventListener('load', warm);
  function tick() { if (ready(i + 1)) { show(i + 1); play(); } else { timer = setTimeout(tick, 300); } }
  function play() { stop(); if (!reduce) timer = setTimeout(tick, 4000); }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } }
  s.addEventListener('focusin', function () { s.classList.add('paused'); stop(); });
  s.addEventListener('focusout', function () { s.classList.remove('paused'); play(); });
  if (reduce) { s.querySelector('.s-count').style.display = 'none'; }
  play();
})();
