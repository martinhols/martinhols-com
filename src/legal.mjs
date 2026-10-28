import fs from 'node:fs';
import { SITE } from './site.mjs';
import { arrowsLink, header, footer, ARROW, ARROW16, esc } from './layout.mjs';

const data = JSON.parse(fs.readFileSync(new URL('./legal.json', import.meta.url), 'utf8'));
export const UPDATED = data.UPDATED;

const co = SITE.company;
// Placeholders vervangen door echte gegevens; ontbreekt een gegeven, dan valt de regel weg.
function fillItem(x) {
  if (x.startsWith('KVK:')) return co.kvk ? `KVK: ${co.kvk}` : null;
  if (x.startsWith('VAT:')) return co.vat ? `VAT: ${co.vat}` : null;
  if (x.startsWith('Address:')) return co.address ? `Address: ${co.address}` : null;
  return x;
}

function part(p, mobile) {
  if (typeof p === 'string') return `<p>${arrowsLink(esc(p))}</p>`;
  if (p[0] === 'list') return `<ul>${p[1].map(fillItem).filter(Boolean).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
  if (p[0] === 'table') {
    const row = ([w, a, b, c]) => `<div class="r"><span class="w">${esc(w)}</span><span class="v"><i class="k">What I collect</i>${esc(a)}</span><span class="v"><i class="k">Why</i>${esc(b)}</span><span class="v"><i class="k">How long</i>${esc(c)}</span></div>`;
    return `<div class="dt"><div class="r h"><span>What</span><span>What I collect</span><span>Why</span><span>How long</span></div>${p[1].map(row).join('')}</div>`;
  }
  if (p[0] === 'link') return `<a class="btn btn-o lk" href="/privacy" style="color:var(--ink)">${esc(p[1])} <span class="ic">${ARROW16}</span></a>`;
  return '';
}

/** key: 'PRIVACY' | 'TERMS' */
export function legalPage(key, path, title, description) {
  const c = data[key];
  const other = key === 'PRIVACY' ? { href: '/terms', label: 'Terms & conditions' } : { href: '/privacy', label: 'Privacy policy' };
  const toc = c.sections.map(([t], i) => `<a href="#s${i + 1}"><span class="n">${String(i + 1).padStart(2, '0')}</span>${esc(t)}</a>`).join('');
  const secs = c.sections.map(([t, parts], i) => `<section class="sec" id="s${i + 1}"><div class="num">${String(i + 1).padStart(2, '0')}</div><div><h2>${esc(t)}</h2>${parts.map((p) => part(p, false)).join('')}</div></section>`).join('');
  const short = c.short.map((t, i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><span>${esc(t)}</span></li>`).join('');
  return {
    path, title, description, noindex: true, ogImage: 'martin-hols-portrait.jpg',
    jsonld: [{ '@context': 'https://schema.org', '@type': 'WebPage', name: c.title, url: SITE.url + path, dateModified: '2026-10-26', isPartOf: { '@id': `${SITE.url}/#website` } }],
    body: `
  <header class="panel subhero" id="main">
    ${header('')}
    <div><p class="t-eyebrow acc">${c.eyebrow}</p><h1>${esc(c.title)}</h1></div>
    <div class="sub"><p class="subp">${esc(c.sub)}</p><p class="t-eyebrow dim" style="margin-top:12px">Last updated ${UPDATED}</p></div>
  </header>

  <section class="cream legal" data-theme="cream">
    <aside class="legal-aside">
      <p class="t-eyebrow acc">On this page</p>
      <nav class="toc" aria-label="On this page">${toc}</nav>
      <a class="btn btn-o" href="${other.href}" style="margin-top:24px;color:var(--ink)">${other.label} <span class="ic">${ARROW16}</span></a>
    </aside>
    <details class="tocd" data-theme="cream"><summary>On this page <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg></summary>${toc}</details>
    <div class="legal-main">
      <div class="panel inshort" data-theme="dark"><p class="t-eyebrow acc">In short</p><ul class="sh">${short}</ul></div>
      <div class="legal-secs">${secs}</div>
    </div>
  </section>

  <section class="panel qblock">
    <div><p class="t-eyebrow acc">Contact</p><h2>${esc(c.qtitle)}</h2><p class="qt">${esc(c.qtext)}</p></div>
    <a class="btn btn-p" href="mailto:${SITE.email}">${SITE.email} <span class="ic">${ARROW16}</span></a>
  </section>
  ${footer()}`,
  };
}
