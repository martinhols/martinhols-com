import { readFileSync } from 'node:fs';
import { SITE } from '../site.mjs';
import { dbPhotos, localMap, siteUrl, bestPhoto } from '../data.mjs';
import { PROJECTS } from './projects.mjs';
import { esc, img, header, contactSection, footer, ARROW, ARROW16 } from '../layout.mjs';

const STATIC = JSON.parse(readFileSync(new URL('../portfolio.json', import.meta.url))).map((p) => ({ ...p, cats: [p.cat], full: `/img/portfolio/${p.slug}.jpg`, file: `portfolio/${p.slug}-s.jpg`, thumbOpt: false }));
// Foto's uit de database (portfolio aan, alt-tekst aanwezig): Top eerst, daarna de vaste selectie, daarna de rest op datum.
const dateOf = (x) => String(x.taken_on || x.created_at || '');
const sizeOf = (x) => { const r = (x.width || 3) / (x.height || 2); return r < 0.9 ? 't' : r > 1.7 ? 'w' : 's'; };
const CATS = Object.fromEntries(SITE.categories.map((c) => [c.slug, c.name]));
// Ontbreekt de alt-tekst nog, dan maken we een nette terugval uit event, plaats en jaar.
const altFor = (x) => (x.alt || '').trim() || [x.event || x.caption, x.city, x.year].filter(Boolean).join(', ') + (x.event || x.caption ? ' · ' : '') + `${CATS[(x.categories || [])[0]] || 'Event'} photography`;
const DB = dbPhotos.filter((x) => x.portfolio && localMap[x.url] && (x.categories || []).length)
  .map((x) => ({ slug: x.id, cat: x.categories[0], cats: x.categories, size: sizeOf(x), pos: x.crop || '50% 50%', name: x.event || x.caption || 'Event photography', alt: altFor(x), top: x.top, date: dateOf(x), full: siteUrl(x.url), file: x.url, thumbOpt: true, db: x }));
DB.sort((a, b) => b.date.localeCompare(a.date));
const PHOTOS = [...DB.filter((x) => x.top), ...STATIC, ...DB.filter((x) => !x.top)].map((p, i) => ({ ...p, rank: `No. ${String(i + 1).padStart(2, '0')}` }));
const HERO = { file: 'portfolio/mysteryland-sunset-stone-hand-stage.jpg', alt: 'Mysteryland main stage at sunset, a giant stone hand holding the DJ booth, red smoke and light beams over the crowd' };

// Per categorie: hero, teksten, FAQ (GEO). Teksten voor corporate, sport en shows/music zijn voorstellen.
const CAT = {
  festivals: {
    hero: 'portfolio/defqon1-main-stage-daylight.jpg', pos: '50% 40%', alt: 'Defqon.1 main stage in daylight',
    names: 'Tomorrowland · Mysteryland · Festival grounds · Defqon.1',
    lead: 'Main stages, crowds and the moments in between.',
    seo: 'Festival photography by Martin Hols: main stages, crowds, pyro and fireworks at Tomorrowland, Defqon.1 and Mysteryland. Fully edited photos during the event, the rest within 24 hours.',
    faq: [
      ['How fast do you deliver festival photos?', 'During the event I already deliver high-quality, fully edited images, ready to share. The rest of the set follows within 24 hours.'],
      ['Do you photograph pyro, SFX and fireworks?', 'Yes, it is one of my specialties. With the show cues in the briefing I am in position before the flames or fireworks go off.'],
      ['Do you work outside the Netherlands?', 'Yes. I am based in Hilversum and work wherever the event is, in the Netherlands and abroad.'],
      ['Which festivals have you photographed?', 'Tomorrowland, Defqon.1, Mysteryland, Pinkpop and Zwarte Cross, among others.'],
      ['How do I brief you?', 'Send a written callsheet with the programme, must-have moments, access and contacts. I plan positions, like overview spots and pyro cues, together with you and your partners.'],
    ],
  },
  corporate: {
    hero: 'portfolio/corporate-event-circular-auditorium.jpg', pos: '50% 45%', alt: 'Corporate event in a circular auditorium under a truss ceiling',
    names: 'Congresses · Company events · Brand activations',
    lead: 'Congresses, company days and brand events, shown at their best.',
    seo: 'Corporate event photography by Martin Hols: congresses, company days and brand activations. Fully edited photos during the event, the rest within 24 hours.',
    faq: [
      ['How fast do you deliver corporate event photos?', 'During the event I already deliver high-quality, fully edited images, ready to share. The rest of the set follows within 24 hours.'],
      ['What kinds of corporate events do you photograph?', 'Congresses, company days, brand activations and award shows, from a single room to a full venue.'],
      ['Do you work outside the Netherlands?', 'Yes. I am based in Hilversum and work wherever the event is, in the Netherlands and abroad.'],
      ['How do I brief you?', 'Send a written callsheet with the programme, must-have moments, access and one contact person on site.'],
    ],
  },
  sport: {
    hero: 'portfolio/f1-las-vegas-fireworks-straight.jpg', pos: '50% 50%', alt: 'Fireworks above the main straight and grandstands at the Las Vegas Grand Prix',
    names: 'Formula 1 · Handball · Arenas',
    lead: 'Speed, crowds and the decisive moments, from the grandstand to the podium.',
    seo: 'Sports event photography by Martin Hols: Formula 1 Las Vegas Grand Prix, handball and more. Fully edited photos during the event, the rest within 24 hours.',
    faq: [
      ['How fast do you deliver sports photos?', 'During the event I already deliver high-quality, fully edited images, ready to share. The rest of the set follows within 24 hours.'],
      ['Which sports events have you photographed?', 'The Formula 1 Dutch Grand Prix in Zandvoort and the Las Vegas Grand Prix, and the 2025 handball World Championship, among others.'],
      ['Do you photograph the atmosphere as well as the action?', 'Yes. I cover the sport, the crowd, the venue and the brand moments around it, so you get the whole story of the event.'],
      ['Do you work outside the Netherlands?', 'Yes. I am based in Hilversum and work wherever the event is, in the Netherlands and abroad.'],
    ],
  },
  'shows-music': {
    hero: 'portfolio/live-show-flame-jets-video-screen.jpg', pos: '50% 50%', alt: 'Flame jets in front of a giant video screen during a live show',
    names: 'Live shows · DJs · Artists',
    lead: 'Artists, light and sound, from club stages to arena shows.',
    seo: 'Show and concert photography by Martin Hols: DJs, artists, pyro and light shows. Fully edited photos during the event, the rest within 24 hours.',
    faq: [
      ['How fast do you deliver show photos?', 'During the event I already deliver high-quality, fully edited images, ready to share. The rest of the set follows within 24 hours.'],
      ['Do you photograph pyro and light shows?', 'Yes, it is one of my specialties. I learn the cues, take my spot early and wait for the moment it all goes off.'],
      ['Can you photograph artists and DJs on stage?', 'Yes, from the front row, from above and from the crowd, so you get both the artist and the show around them.'],
      ['Do you work outside the Netherlands?', 'Yes. I am based in Hilversum and work wherever the event is, in the Netherlands and abroad.'],
    ],
  },
};

const TITLE_AS = { festivals: 'Festival', corporate: 'Corporate event', sport: 'Sports', 'shows-music': 'Show and concert' };
// Eigen specialiteiten per categorie (beeld blijft gelijk aan de standaardset).
const SPEC_TEXT = {
  festivals: [['Main stage overviews', 'The whole stage, the crowd and the build, shown the way it was designed.'], ['Pyro, fireworks and lasers', 'Caught at the exact moment they peak. I learn the cues and take my spot early.'], ['Crowd and atmosphere', 'The people, the energy and the moments between the shows.']],
  corporate: [['Speakers and stage', 'Clear, confident portraits of speakers and a stage that looks as good as it is.'], ['Networking and atmosphere', 'Real conversations and the mood of the day, not stiff group photos.'], ['Brand and sponsor moments', 'Every partner and activation, delivered in a set your marketing team can use.']],
  sport: [['Action and podium', 'The decisive moments, from the start line to the podium.'], ['Crowd and venue', 'Grandstands, arenas and the people who make the atmosphere.'], ['Brand activations', 'Sponsor moments around the sport, shot as carefully as the sport itself.']],
  'shows-music': [['Artists on stage', 'Front row, from above and from the crowd, so you get the artist and the show around them.'], ['Light shows and pyro', 'Lasers, flames and fireworks, caught at the exact moment they peak.'], ['Crowd and backstage', 'The energy in the room and the moments the audience never sees.']],
};

const SPECS = [
  ['Overview photography', 'The full picture: stages, crowds and venues, shown the way the event was designed.', 'pinkpop-overview-stage-sunset.jpg', '50% 45%', 'Pinkpop main stage and festival sign at sunset, seen from above the crowd'],
  ['SFX and pyro', 'Fire, fireworks, lasers and confetti, caught at the exact moment they peak.', 'arena-stage-pyro-fireworks-crowd.jpg', '50% 50%', 'Pyro fountains and fireworks behind an ornate arena stage in front of a packed crowd'],
  ['Superfast delivery', 'Fully edited images during the event, the rest of the set within 24 hours.', 'f1-zandvoort-race-car-corner.jpg', '55% 55%', 'Formula 1 car taking a corner at the Dutch Grand Prix in Zandvoort'],
];

const tile = (p, i) => `<a class="tile ${p.size}" href="${p.full}" data-cat="${p.cats.join(' ')}" data-name="${esc(p.name)}" data-rank="${esc(p.rank)}" data-catname="${esc(CATS[p.cat])}" data-alt="${esc(p.alt)}" aria-label="Open photo: ${esc(p.alt)}">${img(p.file, p.alt, { style: `object-position:${p.pos}`, thumb: p.thumbOpt })}<span class="fade"></span><span class="cap"><span class="nm">${esc(p.name)}</span></span><span class="rb">${ARROW}</span></a>`;

const lightbox = `
  <div class="lb" id="lb" role="dialog" aria-modal="true" aria-label="Photo viewer" hidden>
    <button type="button" class="bd" data-lb-close aria-label="Close"></button>
    <figure><img alt="" data-lb-img><figcaption><span class="ce" data-lb-rank></span><span class="nm" data-lb-name></span><span class="ce" data-lb-count></span></figcaption></figure>
    <button type="button" class="ctl x" data-lb-close aria-label="Close"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    <button type="button" class="ctl pv" data-lb-prev aria-label="Previous"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
    <button type="button" class="ctl nx" data-lb-next aria-label="Next"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>
  </div>`;

const gallerySchema = (list, url, name) => ({
  '@context': 'https://schema.org',
  '@type': 'ImageGallery', '@id': url + '#gallery', url, name, inLanguage: 'en',
  author: { '@id': `${SITE.url}/#martin` }, creator: { '@id': `${SITE.url}/#martin` },
  image: list.map((p) => ({ '@type': 'ImageObject', contentUrl: SITE.url + p.full, thumbnailUrl: SITE.url + (p.db ? (localMap[p.file] || {}).thumb || p.full : `/img/portfolio/${p.slug}-s.jpg`), caption: p.alt, name: `${p.name}, ${CATS[p.cat]}`, creator: { '@id': `${SITE.url}/#martin` }, creditText: 'Martin Hols', copyrightNotice: '© Martin Hols' })),
});

const specs = (slug) => { const T = SPEC_TEXT[slug]; const L = T ? SPECS.map((x, i) => [T[i][0], T[i][1], x[2], x[3], x[4]]) : SPECS; return `
  <section class="cream specs" data-theme="cream" aria-labelledby="sp-h">
    <div class="hh"><p class="t-eyebrow acc" id="sp-h">Specialties</p><p class="t-eyebrow dim hh-r">What I do best</p></div>
    <div class="spg">${L.map(([t, d, f, pos, alt], i) => `<div class="sp"><span class="im">${img(f, alt, { style: `object-position:${pos}` })}</span><span class="tx"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${t}</span><span class="d">${d}</span></span></div>`).join('')}</div>
  </section>`; };

const projSec = (slug, name) => {
  const list = PROJECTS.filter((p) => p.cat === slug).slice(0, 3);
  if (!list.length) return '';
  const card = (p, aria = false) => `<a class="pj" href="${p.href}"${aria ? ' aria-hidden="true" tabindex="-1"' : ''}>${img(p.file, aria ? '' : p.alt, { style: `object-position:${p.pos}`, sizes: '(min-width:1100px) 34vw, 85vw' })}<p class="t-eyebrow acc k">${CATS[p.cat]}</p><p class="tt">${esc(p.title)}</p></a>`;
  return `
  <section class="panel projects" aria-labelledby="projects-h">
    <div class="hd">
      <div><p class="t-eyebrow acc">Projects</p><h2 id="projects-h">Latest ${name.toLowerCase()} projects</h2></div>
      <a class="btn btn-p" href="/projects">All projects <span class="ic">${ARROW16}</span></a>
    </div>
    <div class="pgrid">
      ${list.map((p) => `<a class="pc" href="${p.href}">${img(p.file, p.alt, { style: `object-position:${p.pos}` })}<p class="t-eyebrow acc k">${CATS[p.cat]}</p><p class="tt">${esc(p.title)}</p></a>`).join('')}
    </div>
    <div class="car"><div class="cartrack">${list.map((p) => card(p)).join('')}${list.map((p) => card(p, true)).join('')}</div></div>
    <a class="m-btn p btn-m" href="/projects" style="margin-top:20px">All projects <span class="ic">${ARROW16}</span></a>
  </section>`;
};

const faqSec = (c, name, slug) => `
  <section class="cream faqs" data-theme="cream" aria-labelledby="faq-h">
    <div class="fq-l">
      <p class="t-eyebrow acc">FAQ</p>
      <h2 id="faq-h">${TITLE_AS[slug] || name} photography, answered.</h2>
      <p class="lead">The questions organisers ask most before they book.</p>
      <a class="btn btn-o plain" href="/contact" style="color:var(--ink);border-color:var(--line-strong)">Ask me something else</a>
    </div>
    <div class="faq">${c.faq.map(([q, a]) => `<details class="qa" open><summary><h3>${esc(q)}</h3><span class="pl" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span></summary><p>${esc(a)}</p></details>`).join('')}</div>
  </section>`;

function build(slug) {
  const isAll = !slug;
  const c = isAll ? null : CAT[slug];
  const name = isAll ? 'Portfolio' : CATS[slug];
  const list = isAll ? PHOTOS : PHOTOS.filter((p) => p.cats.includes(slug));
  const path = isAll ? '/portfolio' : `/portfolio/${slug}`;
  const url = SITE.url + path;
  const best = bestPhoto(isAll ? 'all' : slug);
  const hero = isAll ? best || { file: HERO.file, alt: HERO.alt, pos: '50% 45%' } : best || { file: c.hero, alt: c.alt, pos: c.pos };
  const pills = [['all', 'All', PHOTOS.length, '/portfolio']].concat(SITE.categories.map((k) => [k.slug, k.name, PHOTOS.filter((p) => p.cats.includes(k.slug)).length, `/portfolio/${k.slug}`]));
  return {
    path,
    title: isAll ? 'Portfolio: event & festival photography | Martin Hols' : `${TITLE_AS[slug] || name} photography portfolio | Martin Hols`,
    description: isAll ? 'The best frames from 2,132 events by event and festival photographer Martin Hols: festivals, corporate, sport and shows. Tomorrowland, Defqon.1, Mysteryland, Formula 1.' : c.seo,
    ogImage: hero.file,
    jsonld: [
      gallerySchema(list, url, isAll ? 'Portfolio of Martin Hols' : `${name} portfolio of Martin Hols`),
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE.url}/portfolio` }].concat(isAll ? [] : [{ '@type': 'ListItem', position: 3, name, item: url }]) },
      ...(isAll ? [] : [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }]),
    ],
    body: `
  <header class="panel phero" id="main">
    ${img(hero.file, hero.alt, { priority: true, style: `object-position:${hero.pos}` })}
    <div class="shade"></div>
    ${header('/portfolio')}
    <div class="ph-tx">
      <div class="eyebrows"><p class="t-eyebrow acc">Portfolio</p><i></i><p class="t-eyebrow dim">${isAll ? 'Tomorrowland · Defqon.1 · Mysteryland · Formula 1' : c.names}</p></div>
      <h1>${isAll ? 'Hall of fame.' : name + '.'}</h1>
      <p class="lead">${isAll ? 'The best frames from 2,132 events. Pick a category and the strongest shots rise to the top.' : c.lead}</p>
    </div>
    <div class="notch n-br ph-n">
      <div><p class="t-eyebrow" style="font-size:11px;line-height:14px;opacity:.7">Work with me</p><p class="t-h4" style="margin-top:4px">Contact</p></div>
      <a class="rb" href="/contact" aria-label="Contact Martin Hols" style="width:56px;height:56px">${ARROW}</a>
    </div>
  </header>

  <section class="panel gal" id="gallery" aria-labelledby="gal-h">
    <div class="gh">
      <div><p class="t-eyebrow acc">${isAll ? 'Hall of fame' : name}</p><h2 id="gal-h">Portfolio.</h2></div>
      ${isAll
        ? `<nav class="fp" aria-label="Filter by category">${pills.map(([k, l, n, href]) => `<a href="${href}" data-filter="${k}"${k === 'all' ? ' class="on" aria-current="true"' : ''}>${l}<i>${n}</i></a>`).join('')}</nav>`
        : `<a class="btn btn-l" href="/portfolio">All frames <span class="ic">${ARROW16}</span></a>`}
    </div>
    <div class="grid" data-gallery>
      ${list.map(tile).join('')}
    </div>
  </section>
  ${lightbox}
  ${specs(isAll ? null : slug)}
  ${isAll ? '' : faqSec(c, name, slug)}
  ${isAll ? '' : projSec(slug, name)}
  ${contactSection('portfolio/mysteryland-stage-sunset-fireworks.jpg')}
  ${footer()}`,
  };
}

export const pages = [build(null), ...SITE.categories.map((c) => build(c.slug))];
