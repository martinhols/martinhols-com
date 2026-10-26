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
  function play() { stop(); if (!reduce) timer = setTimeout(function () { show(i + 1); play(); }, 4000); }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } }
  s.addEventListener('mouseenter', function () { s.classList.add('paused'); stop(); });
  s.addEventListener('mouseleave', function () { s.classList.remove('paused'); show(i); play(); });
  s.addEventListener('focusin', function () { s.classList.add('paused'); stop(); });
  s.addEventListener('focusout', function () { s.classList.remove('paused'); play(); });
  if (reduce) { s.querySelector('.s-count').style.display = 'none'; }
  play();
})();
