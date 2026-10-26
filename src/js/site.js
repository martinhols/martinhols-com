(function () {
  // Hero schaalt mee op schermen breder dan 1440 px
  function hz() { var w = window.innerWidth; var k = w >= 1440 ? Math.max(1, Math.min((Math.min(w, 2560) - 48) / 1392, (window.innerHeight - 48) / 852)) : 1; document.documentElement.style.setProperty('--hz', k); }
  window.addEventListener('resize', hz); hz();
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
