import { localMap } from './data.mjs';
import { SITE } from './site.mjs';
import fs from 'node:fs';

const webpBases = new Set(fs.readdirSync(new URL('./img', import.meta.url), { recursive: true }).filter((f) => /-\d+\.webp$/.test(f)).map((f) => f.replace(/-\d+\.webp$/, '')));
const sizes = JSON.parse(fs.readFileSync(new URL('./img/sizes.json', import.meta.url)));
export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const ARROW = '<svg class="arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"></path></svg>';
export const ARROW16 = ARROW.replace(/width="20" height="20"/, 'width="16" height="16"');
const MAIL = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="M3 7l9 6 9-6"></path></svg>';
const IG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"></circle></svg>';
const igA = (extra = '') => `<a class="rb acc-b" href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram @martin.hols" title="Instagram"${extra}>${IG}</a>`;
const PHONE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"></path></svg>';
const MENU = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 8h16M4 16h16"></path></svg>';
const CLOSE = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>';
const STAR = '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"></path></svg>';
export const ICONS = { ARROW, MAIL, PHONE, MENU, CLOSE, STAR };

/** <img> met afmetingen uit sizes.json. opts: lazy (standaard true), cls, style, sizes, priority */
export function img(file, alt, opts = {}) {
  const remote = /^https?:/.test(file), L = remote && localMap[file];
  const [w, h] = (L ? [L.w, L.h] : !remote && sizes[file]) || [];
  const a = [`src="${L ? (opts.thumb ? L.thumb : L.src) : remote ? file : '/img/' + file}"`, `alt="${esc(alt)}"`];
  if (w) a.push(`width="${w}"`, `height="${h}"`);
  if (!remote) { const b = file.replace(/(-s)?\.jpg$/, ''); if (webpBases.has(b)) { const set = [640, 1280, 2400].filter((w) => fs.existsSync(new URL(`./img/${b}-${w}.webp`, import.meta.url))); if (set.length) { a.push(`srcset="${set.map((w) => `/img/${b}-${w}.webp ${w}w`).join(', ')}"`, `sizes="${opts.sizes || (opts.priority ? '100vw' : /-s\.jpg$/.test(file) || opts.thumb ? '(min-width:1100px) 25vw, 50vw' : '(min-width:1100px) 50vw, 100vw')}"`); } } }
  if (L && L.srcset) a.push(`srcset="${L.srcset}"`, `sizes="${opts.sizes || (opts.priority ? '100vw' : opts.thumb ? '(min-width:1100px) 25vw, 50vw' : '(min-width:1100px) 50vw, 100vw')}"`);
  if (opts.cls) a.push(`class="${opts.cls}"`);
  if (opts.style) a.push(`style="${opts.style}"`);
  if (opts.priority) a.push('fetchpriority="high"');
  else a.push('loading="lazy"');
  a.push('decoding="async"');
  return `<img ${a.join(' ')}>`;
}

export function header(active = '') {
  const nav = SITE.nav.map((n) => {
    const a = `<a href="${n.href}"${active === n.href ? ' aria-current="page"' : ''}>${n.label}</a>`;
    if (n.href !== '/portfolio') return a;
    return `<div class="dd">${a.replace('</a>', '<svg class="chev" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg></a>')}<div class="ddm"><a href="/portfolio">Hall of fame</a>${SITE.categories.map((c) => `<a href="/portfolio/${c.slug}">${c.name}</a>`).join('')}</div></div>`;
  }).join('');
  return `
    <a class="site-logo" href="/" aria-label="${SITE.name} home">${img('martin-hols-portrait.jpg', '', { priority: true, style: 'object-position:50% 22%' })}<span>${SITE.name}</span></a>
    <nav class="site-nav" aria-label="Main">${nav}</nav>
    <div class="notch n-tr">
      <div class="nt-desk">
        <a class="rb acc-b" href="mailto:${SITE.email}" aria-label="Email ${SITE.email}" title="${SITE.email}">${MAIL}</a>
        <a class="rb acc-b" href="tel:${SITE.phone}" aria-label="Call ${SITE.phoneText}" title="${SITE.phoneText}">${PHONE}</a>
        ${igA(' style="margin-right:8px"')}
        <a class="btn btn-p" href="/contact">Request a quote <span class="ic">${ARROW16}</span></a>
      </div>
      <div class="nt-mob">
        <a class="rb acc-b" href="tel:${SITE.phone}" aria-label="Call ${SITE.phoneText}">${PHONE}</a>
        <button type="button" class="rb menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mmenu" data-menu-open>${MENU}</button>
      </div>
    </div>`;
}

export function mobileMenu() {
  const items = SITE.nav.map((n, i) => {
    const sub = n.href === '/portfolio'
      ? `<div class="sub">${SITE.categories.map((c, j) => `<a href="/portfolio/${c.slug}"><small>0${i + 1} ${String.fromCharCode(65 + j)}</small>${c.name}</a>`).join('')}</div>` : '';
    return `<li><a href="${n.href}"><small>0${i + 1}</small>${n.label}${ARROW}</a>${sub}</li>`;
  }).join('');
  return `
<div class="mmenu" id="mmenu" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="in">
    <div class="top">
      <a class="logo" href="/">${img('martin-hols-portrait.jpg', '')}${SITE.name}</a>
      <div style="display:flex;gap:8px"><a class="rb acc-b" href="tel:${SITE.phone}" aria-label="Call ${SITE.phoneText}" style="background:var(--accent);color:var(--on-accent)">${PHONE}</a>${igA(' style="background:var(--accent);color:var(--on-accent)"')}<button type="button" class="rb menu-btn" aria-label="Close menu" data-menu-close>${CLOSE}</button></div>
    </div>
    <ol>${items}</ol>
    <div class="bot">
      <a class="l" href="mailto:${SITE.email}">${SITE.email}</a>
      <a class="l" href="tel:${SITE.phone}">${SITE.phoneText}</a>
      <a class="l" href="${SITE.instagram}" target="_blank" rel="noopener">Instagram @martin.hols</a>
      <a class="m-btn p" href="/contact">Request a quote <span class="ic">${ARROW16}</span></a>
      <p class="t-caption dim" style="margin:8px 0 0">Part of The Arrows</p>
    </div>
  </div>
</div>`;
}

export function contactSection(photo = 'tomorrowland-mainstage-fireworks.jpg') {
  return `
  <section class="panel contact" aria-labelledby="contact-h">
    ${img(photo, '')}
    <div class="tx">
      <p class="t-eyebrow acc">How to contact me</p>
      <h2 id="contact-h">Planning an event? Let’s talk.</h2>
      <p class="lead">Send me an email or give me a call. I usually reply the same day.</p>
    </div>
    <div class="cbox glass">
      <a class="cr" href="mailto:${SITE.email}"><span><span class="t-eyebrow dim" style="display:block">Email</span><span class="v">${SITE.email}</span></span><span class="rb">${ARROW}</span></a>
      <a class="cr" href="tel:${SITE.phone}"><span><span class="t-eyebrow dim" style="display:block">Phone</span><span class="v">${SITE.phoneText}</span></span><span class="rb">${ARROW}</span></a>
      <a class="cr" href="${SITE.instagram}" target="_blank" rel="noopener"><span><span class="t-eyebrow dim" style="display:block">Instagram</span><span class="v">@martin.hols</span></span><span class="rb">${ARROW}</span></a>
    </div>
  </section>`;
}

export function footer() {
  const cats = SITE.categories.map((c) => `<a href="/portfolio/${c.slug}">${c.name}</a>`).join('');
  return `
  <footer class="cream foot" data-theme="cream">
    <div class="row">
      <a class="brand" href="/" aria-label="${SITE.name} home">${img('martin-hols-portrait.jpg', '')}<span>${SITE.name}</span></a>
      <div class="cols">
        <div><p class="t-eyebrow dim">Portfolio</p><div class="fl">${cats}</div></div>
        <div><p class="t-eyebrow dim">Pages</p><div class="fl"><a href="/projects">Projects</a><a href="/about">About</a><a href="/blog">Blog</a></div></div>
        <div><p class="t-eyebrow dim">Contact</p><div class="fl"><a href="mailto:${SITE.email}">${SITE.email}</a><a href="tel:${SITE.phone}">${SITE.phoneText}</a><a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a></div></div>
        <div><p class="t-eyebrow dim">Legal</p><div class="fl"><a href="/privacy">Privacy policy</a><a href="/terms">Terms &amp; conditions</a></div></div>
      </div>
    </div>
    <p class="t-caption copy">© 2026 ${SITE.name} · Part of <b>The Arrows</b></p>
  </footer>`;
}

/** Hele pagina. page: {path,title,description,ogImage,jsonld[],active,body,bodyClass} */
export function layout(page) {
  const url = SITE.url + (page.path === '/' ? '/' : page.path);
  const oi = page.ogImage || 'tomorrowland-mainstage-fireworks.jpg';
  const og = /^https?:/.test(oi) ? (localMap[oi] ? SITE.url + localMap[oi].src : oi) : SITE.url + '/img/' + oi;
  const ld = (page.jsonld || []).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex, follow">\n' : ''}
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#F4EFE6">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/img/martin-hols-portrait.jpg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rokkitt:wght@100..900&family=Ubuntu:wght@300;400;500;700&display=swap">
<link rel="stylesheet" href="/assets/site.css">
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="page" id="top">
${page.body}
</div>
${mobileMenu()}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}
