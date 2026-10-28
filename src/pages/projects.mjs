import { readFileSync } from 'node:fs';
import { SITE } from '../site.mjs';
import { dbProjects, dbPhotos, siteUrl, localMap } from '../data.mjs';
const altOf = Object.fromEntries(dbPhotos.filter((x) => x.alt).map((x) => [x.url, x.alt]));
import { esc, img, header, contactSection, footer, ARROW, ARROW16 } from '../layout.mjs';

const STATIC = JSON.parse(readFileSync(new URL('../projects.json', import.meta.url)));
const fromDb = dbProjects.filter((d) => d.hero_url).map((d) => ({ slug: d.slug, cat: d.category, title: d.title, file: d.hero_url, pos: '50% 50%', alt: altOf[d.hero_url] || `${d.title}, event photography by Martin Hols`, href: `/projects/${d.slug}`, db: d }));
const dbSlugs = new Set(fromDb.map((p) => p.slug));
export const PROJECTS = [...fromDb.filter((p) => p.db.pinned), ...fromDb.filter((p) => !p.db.pinned), ...STATIC.filter((p) => !dbSlugs.has(p.slug))];
export const CATS = Object.fromEntries(SITE.categories.map((c) => [c.slug, c.name]));

const card = (p, cls = 'prc') => `<a class="${cls}" data-c="${p.cat}" href="${p.href}"><span class="im">${img(p.file, p.alt, { style: `object-position:${p.pos}`, thumb: true })}</span><span class="tx"><span class="tt"><span class="ce">${CATS[p.cat]}</span><span class="nm">${esc(p.title)}</span></span><span class="rb">${ARROW}</span></span></a>`;

const phero = (file, alt, pos, eyebrow, h1, lead) => `
  <header class="panel phero phero-s" id="main">
    ${img(file, alt, { priority: true, style: `object-position:${pos}` })}
    <div class="shade"></div>
    ${header('/projects')}
    <div class="ph-tx">${eyebrow}<h1>${h1}</h1>${lead ? `<p class="lead">${lead}</p>` : ''}</div>
    ${lead ? '' : `<div class="notch n-br ph-n"><p class="t-nav">Scroll</p><a class="rb" href="#detail" aria-label="Scroll down" style="width:56px;height:56px">${ARROW}</a></div>`}
  </header>`;

// ---------- overzicht ----------
const counts = (k) => (k === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.cat === k).length);
const pillsRow = [['all', 'All']].concat(SITE.categories.map((c) => [c.slug, c.name]));
const listPage = {
  path: '/projects',
  title: 'Projects: recent event and festival photography | Martin Hols',
  description: 'Recent event photography projects by Martin Hols: Mysteryland, Defqon.1, Tomorrowland, Formula 1 and more. Browse the latest work or filter by category.',
  ogImage: 'portfolio/mysteryland-sunset-stone-hand-stage.jpg',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'CollectionPage', '@id': `${SITE.url}/projects#page`, url: `${SITE.url}/projects`, name: 'Latest projects by Martin Hols', inLanguage: 'en',
      isPartOf: { '@id': `${SITE.url}/#website` },
      mainEntity: { '@type': 'ItemList', itemListElement: PROJECTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.title, url: SITE.url + p.href })) },
    },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE.url}/projects` }] },
  ],
  body: `
  <header class="panel subhero" id="main">
    ${header('/projects')}
    <div><p class="t-eyebrow acc">Projects</p><h1>Latest projects.</h1></div>
    <p class="sub">Every event is a story. Browse the most recent work, or filter by category.</p>
  </header>

  <section class="cream lst" data-theme="cream" aria-labelledby="lst-h">
    <div class="lh">
      <p class="t-eyebrow dim" id="lst-h">${PROJECTS.length} projects</p>
      <div class="fpr" role="radiogroup" aria-label="Filter by category">${pillsRow.map(([k, l], i) => `<input type="radio" name="f" id="f-${k}"${i === 0 ? ' checked' : ''}><label for="f-${k}">${l}<i>${counts(k)}</i></label>`).join('')}</div>
    </div>
    <div class="pgr">${PROJECTS.map((p) => card(p)).join('')}</div>
  </section>

  ${contactSection('tomorrowland-stage-night.jpg')}
  ${footer()}`,
};

// ---------- detailpagina: Mysteryland ----------
// Alleen bevestigde feiten staan erin. Datum, plaats, aantallen en verhaal volgen zodra ze bekend zijn.
const M = {
  slug: 'mysteryland-2025', name: 'Mysteryland', event: 'Mysteryland 2025', client: 'ID-T', cat: 'Festivals',
  gallery: [
    [['mysteryland-stage-sunset-fireworks', '50% 50%', 1]],
    [['festival-stage-fireworks-fan-night', '50% 50%', 1], ['mysteryland-stage-fireworks-crowd', '50% 50%', 1]],
    [['mysteryland-stage-stone-hand-blue', '50% 45%', 1], ['mysteryland-stage-lasers-smoke-blue', '50% 50%', 2]],
    [['mysteryland-stage-glowing-hand-dusk', '50% 50%', 1], ['mysteryland-colourful-flags-hill', '50% 50%', 1]],
    [['mysteryland-sunset-stone-hand-stage', '50% 55%', 1]],
  ],
  alts: {
    'mysteryland-stage-sunset-fireworks': 'Mysteryland main stage at sunset with fireworks and a blue waterfall screen',
    'festival-stage-fireworks-fan-night': 'Fireworks fanning out above the Mysteryland stage at night',
    'mysteryland-stage-fireworks-crowd': 'Fireworks fanning out behind the Mysteryland stage over a huge crowd',
    'mysteryland-stage-stone-hand-blue': 'Mysteryland stage with a stone hand in blue light and a crowd below',
    'mysteryland-stage-lasers-smoke-blue': 'Mysteryland stage with blue lasers cutting through smoke',
    'mysteryland-stage-glowing-hand-dusk': 'Mysteryland stage with a giant glowing hand at dusk',
    'mysteryland-colourful-flags-hill': 'Colourful Mysteryland flags on a hill under a blue sky',
    'mysteryland-sunset-stone-hand-stage': 'Mysteryland main stage at sunset, a giant stone hand holding the DJ booth, red smoke and light beams over the crowd',
  },
  faq: [
    ['Who photographed Mysteryland 2025?', 'Martin Hols, event photographer from the Netherlands, commissioned by ID-T.'],
    ['How fast are the images delivered?', 'High-quality, fully edited images are delivered during the event. The rest of the set follows within 24 hours.'],
  ],
};
const facts = [['Client', M.client], ['Event', M.event], ['Category', M.cat]];
const detailPage = {
  path: `/projects/${M.slug}`,
  title: 'Mysteryland 2025 event photography for ID-T | Martin Hols',
  description: 'Martin Hols was the event photographer at Mysteryland 2025, commissioned by ID-T: main stage, crowd and atmosphere. Fully edited photos during the event, the rest within 24 hours.',
  ogImage: 'portfolio/mysteryland-sunset-stone-hand-stage.jpg',
  noindex: true, // tot datum, plaats, aantallen en verhaal zijn ingevuld
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'CreativeWork', '@id': `${SITE.url}/projects/${M.slug}#project`, name: 'Mysteryland 2025 event photography', url: `${SITE.url}/projects/${M.slug}`, inLanguage: 'en',
      creator: { '@id': `${SITE.url}/#martin` }, author: { '@id': `${SITE.url}/#martin` }, producer: { '@type': 'Organization', name: M.client },
      about: { '@type': 'Event', name: M.event },
      image: Object.keys(M.alts).map((s) => `${SITE.url}/img/portfolio/${s}.jpg`),
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: M.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE.url}/projects` }, { '@type': 'ListItem', position: 3, name: M.name, item: `${SITE.url}/projects/${M.slug}` }] },
  ],
  body: `
  ${phero('portfolio/mysteryland-sunset-stone-hand-stage.jpg', M.alts['mysteryland-sunset-stone-hand-stage'], '50% 45%', `<div class="eyebrows"><p class="t-eyebrow acc">Project</p><i></i><p class="t-eyebrow dim">${M.cat}</p></div>`, `${M.name}.`, '')}

  <section class="cream psum" id="detail" data-theme="cream" aria-labelledby="ps-h">
    <div class="ps-l">
      <p class="t-eyebrow acc" id="ps-h">Project summary</p>
      <p class="sum">Martin Hols was the event photographer at ${M.event}, commissioned by ${M.client}. He photographed the main stage, the crowd and the atmosphere.</p>
    </div>
    <dl class="fxg">${facts.map(([k, v]) => `<div class="fx"><dt class="t-eyebrow dim">${k}</dt><dd class="v">${esc(v)}</dd></div>`).join('')}</dl>
  </section>

  <section class="panel pgal" aria-label="Photos from ${M.event}">
    ${M.gallery.map((row, r) => `<div class="pr pr${row.length}">${row.map(([s, pos, flex]) => `<div class="pi" style="flex:${flex}">${img(`portfolio/${s}.jpg`, M.alts[s], { style: `object-position:${pos}` })}</div>`).join('')}</div>`).join('')}
  </section>

  <section class="cream pfaq" data-theme="cream" aria-labelledby="pq-h">
    <p class="t-eyebrow dim" id="pq-h">Questions about this project</p>
    <div class="pqg">${M.faq.map(([q, a]) => `<div class="qa"><h3>${esc(q)}</h3><p>${esc(a)}</p></div>`).join('')}</div>
  </section>

  <section class="cream prel" data-theme="cream" aria-labelledby="pr-h">
    <div class="hh"><p class="t-eyebrow dim" id="pr-h">Related festival projects</p><a class="btn btn-o plain d-only" href="/projects" style="color:var(--ink);border-color:var(--line-strong)">All projects</a></div>
    <div class="prg">${PROJECTS.filter((p) => p.cat === 'festivals' && p.slug !== M.slug).map((p) => card(p)).join('')}</div>
    <a class="m-btn o" href="/projects" style="color:var(--ink)">All projects <span class="ic">${ARROW16}</span></a>
  </section>

  <a class="nxp" href="/portfolio/festivals">
    ${img('portfolio/defqon1-main-stage-daylight.jpg', 'Defqon.1 main stage in daylight', { style: 'object-position:50% 40%' })}
    <span class="shade"></span>
    <span class="nt"><span class="t-eyebrow acc" style="display:block">Next project</span><span class="h">Defqon.1</span><span class="t-eyebrow dim" style="display:block;margin-top:14px">Festivals</span></span>
    <span class="rb">${ARROW}</span>
  </a>

  ${contactSection('mysteryland-stage-sunset-fireworks.jpg')}
  ${footer()}`,
};


// Detailpagina's uit de database (Supabase)
const dbDetail = (p) => {
  const d = p.db, faq = (Array.isArray(d.faq) ? d.faq : []).filter((f) => f.q && f.a);
  // Alle foto's van het project in de galerij: eerst de volgorde uit de admin, daarna hero, card en de rest.
  const mine = dbPhotos.filter((x) => x.project_id === d.id);
  const gal = [...new Set([...(Array.isArray(d.gallery) ? d.gallery : []), ...mine.filter((x) => x.slot === 'hero' || x.slot === 'card').map((x) => x.url), d.hero_url, ...mine.map((x) => x.url)].filter(Boolean))];
  const dims = new Map(mine.map((x) => [x.url, x.width && x.height ? x.width / x.height : 0]));
  const ratio = (u) => { const m = localMap[u]; const r = (m && m.w && m.h ? m.w / m.h : 0) || dims.get(u) || 1.5; return Math.min(Math.max(r, 0.45), 2.6); };
  // Rijen met gelijke hoogte: elke foto krijgt zijn eigen beeldverhouding, staande foto's blijven staand.
  const rows = [];
  for (let i = 0; i < gal.length;) {
    const row = []; let S = 0;
    while (i < gal.length && row.length < 3) {
      const r = ratio(gal[i]);
      if (!row.length && r >= 1.6) { row.push([gal[i], r]); i++; break; }
      if (row.length && r >= 1.6 && S >= 1.4) break;
      row.push([gal[i], r]); S += r; i++;
      if (S >= 2.0) break;
    }
    rows.push(row);
  }
  const fx = [['Client', d.client], ['Event', d.event_name || d.title], ['Location', d.location], ['Date', d.event_date && new Date(d.event_date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })]].filter(([, v]) => v);
  const sum = d.summary || `Martin Hols was the event photographer at ${d.event_name || d.title}${d.client ? `, commissioned by ${d.client}` : ''}.`;
  return {
    path: `/projects/${d.slug}`, title: `${d.event_name || d.title} event photography${d.client ? ` for ${d.client}` : ''} | Martin Hols`, description: sum.slice(0, 200), ogImage: d.hero_url,
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'CreativeWork', name: `${d.title} event photography`, url: `${SITE.url}/projects/${d.slug}`, inLanguage: 'en', creator: { '@id': `${SITE.url}/#martin` }, about: { '@type': 'Event', name: d.event_name || d.title, ...(d.location ? { location: d.location } : {}), ...(d.event_date ? { startDate: d.event_date } : {}) }, image: [d.hero_url, ...gal].map((u) => (u.startsWith('/') ? SITE.url + u : /^https?:/.test(siteUrl(u)) ? siteUrl(u) : SITE.url + siteUrl(u))) },
      ...(faq.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }] : []),
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [['Home', '/'], ['Projects', '/projects'], [d.title, `/projects/${d.slug}`]].map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE.url + u })) },
    ],
    body: `
  ${phero(d.hero_url, p.alt, '50% 50%', `<div class="eyebrows"><p class="t-eyebrow acc">Project</p><i></i><p class="t-eyebrow dim">${CATS[d.category]}</p></div>`, `${esc(d.title)}.`, '')}
  <section class="cream psum" id="detail" data-theme="cream"><div class="ps-l"><p class="t-eyebrow acc">Project summary</p><p class="sum">${esc(sum)}</p></div>
    <dl class="fxg" style="--n:${Math.min(fx.length, 4)}">${fx.map(([k, v]) => `<div class="fx"><dt class="t-eyebrow dim">${k}</dt><dd class="v">${esc(v)}</dd></div>`).join('')}</dl></section>
  ${rows.length ? `<section class="panel pgal" aria-label="Photos">${rows.map((r) => { const S = r.reduce((a, [, x]) => a + x, 0); return `<div class="pr${r.length > 1 && r.every(([, x]) => x < 0.9) ? ' pv' : ''}" style="--s:${S.toFixed(3)};--n:${r.length}">${r.map(([u, x]) => `<div class="pi" style="flex:${x.toFixed(3)} 1 0;aspect-ratio:${x.toFixed(3)}">${img(u, altOf[u] || `${d.title} event photography`)}</div>`).join('')}</div>`; }).join('')}</section>` : ''}
  ${faq.length ? `<section class="cream pfaq" data-theme="cream"><p class="t-eyebrow dim">Questions about this project</p><div class="pqg">${faq.map((f) => `<div class="qa"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('')}</div></section>` : ''}
  ${contactSection('tomorrowland-stage-night.jpg')}
  ${footer()}`,
  };
};
export const pages = [listPage, ...fromDb.filter((p) => p.slug !== M.slug).map(dbDetail)];
