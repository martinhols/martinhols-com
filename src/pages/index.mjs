import { SITE } from '../site.mjs';
import { PROJECTS, CATS } from './projects.mjs';
import { bestPhoto } from '../data.mjs';
import { img, header, contactSection, footer, ARROW, ARROW16, ICONS } from '../layout.mjs';

const slides = [
  { file: 'tomorrowland-mainstage-fireworks.jpg', name: 'Tomorrowland', pos: '50% 38%', alt: 'Festival mainstage with fireworks fanning out above a packed crowd at night' },
  { file: 'tomorrowland-stage-night.jpg', name: 'Tomorrowland', pos: '50% 50%', alt: 'Tomorrowland stage at night with the crowd in front' },
  { file: 'defqon1-main-stage.jpg', name: 'Defqon.1', pos: '50% 50%', alt: 'Defqon.1 main stage in daylight' },
  { file: 'mysteryland-festival-stage.jpg', name: 'Mysteryland', pos: '50% 50%', alt: 'Mysteryland festival stage and crowd' },
  { file: 'f1-las-vegas-grand-prix.jpg', name: 'F1 Las Vegas Grand Prix', pos: '50% 50%', alt: 'Formula 1 Las Vegas Grand Prix' },
  { file: 'defqon1-pyro-show.jpg', name: 'Defqon.1', pos: '50% 50%', alt: 'Pyro show on the Defqon.1 stage' },
];

const projects = PROJECTS.slice(0, 3).map((p) => ({ cat: CATS[p.cat], title: p.title, file: p.file, pos: p.pos, alt: p.alt, href: p.href }));

const cats0 = [
  { n: '01', name: 'Festivals', slug: 'festivals', file: 'tomorrowland-mainstage-fireworks.jpg', pos: '50% 40%', alt: 'Festivals' },
  { n: '02', name: 'Corporate', slug: 'corporate', file: 'corporate-event-auditorium.jpg', pos: '50% 45%', alt: 'Corporate event in a circular auditorium' },
  { n: '03', name: 'Sport', slug: 'sport', file: 'handball-match-arena.jpg', pos: '54% 55%', alt: 'Handball match in a packed arena' },
  { n: '04', name: 'Shows / Music', slug: 'shows-music', file: 'singer-blue-light-show.jpg', pos: '64% 40%', alt: 'Singer on stage under blue light' },
];
const cats = cats0.map((c) => { const b = bestPhoto(c.slug); return b ? { ...c, file: b.file, pos: b.pos, alt: b.alt } : c; });

const logos = [
  ['logo-albert-heijn.png', 'Albert Heijn', 'width:159px;height:64px'],
  ['logo-tomorrowland.png', 'Tomorrowland', 'width:120px;height:64px'],
  ['logo-mojo.png', 'MOJO', 'width:190px;height:46px'],
  ['logo-gall-and-gall.png', 'Gall & Gall', 'width:188px;height:64px'],
  ['logo-formula-1.png', 'Formula 1', 'width:147px;height:64px'],
];

const projCard = (p, aria = false) => `<a class="pj" href="${p.href}"${aria ? ' aria-hidden="true" tabindex="-1"' : ''}>${img(p.file, aria ? '' : p.alt, { style: `object-position:${p.pos}` })}<p class="t-eyebrow acc k">${p.cat}</p><p class="tt">${p.title}</p></a>`;

export const page = {
  path: '/',
  title: 'Event & festival photographer in the Netherlands | Martin Hols',
  description: 'Martin Hols is an event and festival photographer based in the Netherlands, working worldwide. 2,132 events in 10+ years, winner of the European Event Photography Award. Fully edited photos during the event, the rest within 24 hours.',
  ogImage: 'tomorrowland-mainstage-fireworks.jpg',
  jsonld: [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url + '/', name: SITE.name, inLanguage: 'en',
          publisher: { '@id': `${SITE.url}/#business` },
        },
        {
          '@type': 'ProfessionalService', '@id': `${SITE.url}/#business`, name: SITE.name, url: SITE.url + '/',
          description: 'Event and festival photography in the Netherlands and worldwide.',
          image: `${SITE.url}/img/tomorrowland-mainstage-fireworks.jpg`,
          email: SITE.email, telephone: SITE.phone,
          areaServed: ['Netherlands', 'Europe', 'Worldwide'],
          knowsAbout: ['Event photography', 'Festival photography', 'Corporate event photography', 'Sports photography', 'Concert photography'],
          founder: { '@id': `${SITE.url}/#martin` },
          parentOrganization: { '@type': 'Organization', name: 'The Arrows' },
        },
        {
          '@type': 'Person', '@id': `${SITE.url}/#martin`, name: SITE.person, jobTitle: 'Event photographer',
          url: SITE.url + '/', image: `${SITE.url}/img/martin-hols-portrait.jpg`, email: SITE.email, telephone: SITE.phone,
          award: SITE.award, workLocation: { '@type': 'Place', name: 'Netherlands' },
          worksFor: { '@id': `${SITE.url}/#business` },
          knowsAbout: ['Event photography', 'Festival photography'],
        },
      ],
    },
  ],
  body: `
  <header class="panel hero" id="main">
    ${header('')}
    <div class="hero-main">
      <div class="eyebrows"><p class="t-eyebrow acc">Event &amp; festival photography</p><i></i><p class="t-eyebrow dim">Netherlands · Worldwide</p></div>
      <h1>Where the biggest stages get remembered.</h1>

      <div class="slider" data-slider role="group" aria-roledescription="carousel" aria-label="Selected festival photos">
        <div class="track">
          ${slides.map((s, i) => `<div class="slide${i === 0 ? ' on' : ''}" data-name="${s.name}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}">${img(s.file, s.alt, { style: `object-position:${s.pos}`, priority: i === 0 })}</div>`).join('')}
        </div>
        <a class="s-cap glass" href="/portfolio/festivals" data-cap>${slides[0].name}</a>
        <div class="s-count glass" aria-hidden="true"><span data-num>01</span><span class="bar"><i></i></span><span class="of">${String(slides.length).padStart(2, '0')}</span></div>
        <a class="rb s-go" href="/portfolio/festivals" aria-label="View festival photos">${ARROW}</a>
      </div>
    </div>

    <div class="portrait-d">
      ${img('martin-hols-portrait.jpg', 'Portrait of Martin Hols, smiling, in a black shirt against a warm orange backdrop', { priority: true })}
      <div class="award"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">Award winner</p><p class="t-caption">European Event<br>Photography Award</p></div></div>
      <div class="namecard"><p class="nm">Martin Hols</p><hr><p class="t-eyebrow dim" style="font-size:12px;line-height:16px;letter-spacing:.22em">Event photographer</p></div>
    </div>

    <div class="portrait-m">
      ${img('martin-hols-portrait.jpg', 'Portrait of Martin Hols')}
      <div><p class="nm">Martin Hols</p><p class="t-eyebrow">Event photographer</p></div>
    </div>
    <a class="m-btn p btn-q" href="/contact">Request a quote <span class="ic">${ARROW16}</span></a>
  </header>

  <section class="cream trusted" data-theme="cream" aria-labelledby="trusted-h">
    <p class="t-eyebrow dim" id="trusted-h">Trusted by the brands behind the biggest events</p>
    <div class="logos">
      ${logos.map(([f, a, s]) => `<div>${img(f, a, { style: s })}</div>`).join('')}
    </div>
  </section>

  <section aria-labelledby="portfolio-h">
    <div class="cream sec-head" data-theme="cream">
      <div><p class="t-eyebrow acc">Portfolio</p><h2 id="portfolio-h">Every kind of event, covered.</h2></div>
      <a class="btn btn-o plain d-only" href="/portfolio" style="color:var(--ink);border-color:var(--line-strong)">View all portfolio</a>
      <a class="m-btn o" href="/portfolio" style="color:var(--ink)">View all portfolio <span class="ic">${ARROW16}</span></a>
    </div>
    <div class="cats" style="margin-top:24px">
      ${cats.map((c) => `<a class="cat" href="/portfolio/${c.slug}">${img(c.file, c.alt, { style: `object-position:${c.pos}` })}<span class="fade"></span><span class="num">${c.n}</span><span class="nm">${c.name}</span><span class="notch n-br"><span class="rb">${ARROW}</span></span></a>`).join('')}
    </div>
  </section>

  <section class="panel projects" aria-labelledby="projects-h">
    <div class="hd">
      <div><p class="t-eyebrow acc">Projects</p><h2 id="projects-h">Latest projects</h2></div>
      <a class="btn btn-p" href="/projects">All projects <span class="ic">${ARROW16}</span></a>
    </div>
    <div class="pgrid">
      ${projects.map((p) => `<a class="pc" href="${p.href}">${img(p.file, p.alt, { style: `object-position:${p.pos}` })}<p class="t-eyebrow acc k">${p.cat}</p><p class="tt">${p.title}</p></a>`).join('')}
    </div>
    <div class="car"><div class="cartrack">${projects.map((p) => projCard(p)).join('')}${projects.map((p) => projCard(p, true)).join('')}</div></div>
    <a class="m-btn p btn-m" href="/projects" style="margin-top:20px">All projects <span class="ic">${ARROW16}</span></a>
  </section>

  <section class="about" aria-labelledby="about-h">
    <div class="ph">
      ${img('martin-hols-portrait.jpg', 'Portrait of Martin Hols')}
      <div class="award"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">Award winner</p><p class="t-caption">European Event<br>Photography Award</p></div></div>
      <div class="award-m"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">Award winner</p><p class="w">European Event Photography Award</p></div></div>
    </div>
    <div class="cream tx" data-theme="cream">
      <p class="t-eyebrow acc">About</p>
      <h2 id="about-h">One photographer who knows how events run.</h2>
      <p class="lead">In more than ten years I have photographed more than two thousand events, so your brand is represented at its best, on and off the stage.</p>
      <div class="stats">
        <div><p class="stat">${SITE.events}</p><p class="l">events shot</p></div>
        <div><p class="stat">${SITE.years}</p><p class="l">years in the field</p></div>
      </div>
      <a class="btn btn-p" href="/about">Meet your photographer <span class="ic">${ARROW16}</span></a>
    </div>
  </section>

  ${contactSection()}
  ${footer()}`,
};
