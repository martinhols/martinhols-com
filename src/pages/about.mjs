import { SITE } from '../site.mjs';
import { img, header, contactSection, footer, ARROW16, ICONS } from '../layout.mjs';

const logos = [
  ['logo-albert-heijn.png', 'Albert Heijn', 'width:159px;height:64px'],
  ['logo-tomorrowland.png', 'Tomorrowland', 'width:120px;height:64px'],
  ['logo-mojo.png', 'MOJO', 'width:190px;height:46px'],
  ['logo-gall-and-gall.png', 'Gall & Gall', 'width:188px;height:64px'],
  ['logo-formula-1.png', 'Formula 1', 'width:147px;height:64px'],
  ['logo-q-dance.png', 'Q-dance', ''],
  ['logo-klm.png', 'KLM Royal Dutch Airlines', ''],
  ['logo-etos.png', 'Etos', ''],
  ['logo-hema.png', 'HEMA', ''],
  ['logo-bynder.png', 'Bynder', ''],
  ['logo-as-watson.png', 'AS Watson', ''],
  ['logo-pinkpop.png', 'Pinkpop', ''],
  ['logo-down-the-rabbit-hole.png', 'Down The Rabbit Hole', ''],
  ['logo-zwarte-cross.png', 'Zwarte Cross', ''],
  ['logo-concert-at-sea.png', 'Concert at SEA', ''],
  ['logo-agents-after-all.png', 'Agents After All', ''],
  ['logo-7th-sunday-festival.png', '7th Sunday Festival', ''],
  ['logo-sendcloud.png', 'Sendcloud', ''],
  ['logo-google.png', 'Google', ''],
  ['logo-bakertilly.png', 'Baker Tilly', ''],
  ['logo-sport-vibes.png', 'Sport Vibes', ''],
];

const facts = [
  ['Who', 'Martin Hols, event and festival photographer'],
  ['Based in', 'Hilversum, the Netherlands'],
  ['Experience', '2,132 events in 10+ years'],
  ['Award', 'European Event Photography Award'],
  ['Clients', 'Albert Heijn, Tomorrowland, MOJO, Gall & Gall, Formula 1'],
  ['Specialties', 'Overview photography, SFX and pyro, super fast delivery'],
  ['Events', 'Festivals, corporate, sport, shows and music'],
  ['Part of', 'The Arrows'],
];

const story = [
  'After studying psychology, I became a web designer. Working on different projects, I slowly found my way into photography. I went to a lot of concerts, and one night I watched a photographer working right up close to the music. Something clicked: this is what I wanted to do.',
  'At home I would watch the closing shows of festivals again and again, thinking: one day I’ll work in music. One day I’ll be on the big stages of Defqon.1 and Tomorrowland. So I bought a camera, left everything else behind and went for it.',
  'I said yes to everything I could get: nightclubs, student parties, photo booths. Those nights were my first real miles. I taught myself a lot in Photoshop, and my background in web design and marketing helped me understand what clients actually needed from their images. Step by step I grew, mostly in corporate events and music, and built a group of regular clients along the way.',
  'From 2021 the chances started coming, one after another, and I took each one with both hands. That same year I started The Arrows. I was flown abroad more often, and my fast editing and my focus on overviews and special effects brought me to bigger festivals. In 2023 I chose to focus fully on events and music.',
  'Winning the European Event Photography Award opened doors I had only dreamed of, to events like Formula 1 and Tomorrowland. Every time I’m on one of those stages, I still think of the guy on the couch rewatching closing shows.',
];

const timeline = [
  ['Start', 'Psychology, then web design'],
  ['The spark', 'Concerts, a first camera and all in'],
  ['First miles', 'Nightclubs, student parties, photo booths'],
  ['2021', 'The Arrows and the first jobs abroad'],
  ['2023', 'Full focus on events and music'],
  ['Award', 'European Event Photography Award'],
];

const frames = [
  ['Festivals', 'Defqon.1', '/portfolio/festivals', 'defqon1-main-stage.jpg', '50% 50%', 'Defqon.1 main stage in daylight'],
  ['Sport', 'F1 Las Vegas Grand Prix', '/portfolio/sport', 'f1-las-vegas-grand-prix.jpg', '30% 40%', 'Formula 1 Las Vegas Grand Prix'],
  ['Shows / Music', 'Defqon.1', '/portfolio/shows-music', 'defqon1-pyro-show.jpg', '50% 50%', 'Two DJs on the Defqon.1 stage in front of a packed crowd'],
  ['Corporate', 'Corporate event', '/portfolio/corporate', 'corporate-event-auditorium.jpg', '50% 45%', 'Corporate event in a circular auditorium'],
];

const how = [
  ['Briefing', 'You send a written callsheet with the programme, the must-have moments, access and one contact person on site.'],
  ['Preparation', 'Together with you and your partners on the event, I plan the positions, like overview spots and pyro cues, and we arrange access in advance.'],
  ['On the day', 'I photograph the show, the crowd and the brand moments, and deliver high-quality, fully edited images during the event.'],
  ['Delivery', 'The rest of the edited set lands in your inbox within 24 hours.'],
];

const specs = [
  ['Overview photography', 'It’s the big picture that gets me: a full main stage, thousands of hands in the air, a whole production working together. I’ll climb a tower or find a roof to show an event the way its makers designed it.', 'defqon1-main-stage.jpg', '50% 40%', 'Defqon.1 main stage in daylight, seen from above the crowd'],
  ['SFX and pyro', 'Fire, fireworks, lasers, confetti. The moment it all goes off is the peak of the show, and it lasts a second. I learn the cues, take my spot early and wait for it. That second still gives me goosebumps.', 'mysteryland-festival-stage.jpg', '50% 50%', 'Fireworks shooting up behind a festival stage and crowd'],
  ['Super fast delivery', 'An event moves fast, and so does its story online. That’s why I deliver high-quality, fully edited images during the event itself, so your team can share them while everyone is still talking about the night. The rest follows within 24 hours.', 'f1-las-vegas-grand-prix.jpg', '30% 40%', 'Performer at the Formula 1 Las Vegas Grand Prix'],
];

const e = (s) => s.replace(/&/g, '&amp;');
const btns = `<a class="btn btn-p" href="/contact">Request a quote <span class="ic">${ARROW16}</span></a><a class="btn btn-o plain" href="/portfolio">View portfolio</a>`;
const mbtns = `<a class="m-btn p" href="/contact">Request a quote <span class="ic">${ARROW16}</span></a><a class="m-btn l" href="/portfolio">View portfolio <span class="ic">${ARROW16}</span></a>`;
const stat = (n, l) => `<div><p class="stat">${n}</p><p class="l">${l}</p></div>`;
const award = `<div class="award"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">Award winner</p><p class="t-caption">European Event<br>Photography Award</p></div></div>`;

export const page = {
  path: '/about',
  title: 'About Martin Hols | Event and festival photographer',
  description: 'Martin Hols is an event and festival photographer from Hilversum, the Netherlands. 2,132 events in 10+ years, winner of the European Event Photography Award, trusted by Albert Heijn, Tomorrowland and Formula 1.',
  ogImage: 'martin-hols-portrait.jpg',
  jsonld: [
    {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'AboutPage', '@id': `${SITE.url}/about#page`, url: `${SITE.url}/about`, name: 'About Martin Hols', inLanguage: 'en', about: { '@id': `${SITE.url}/#martin` }, isPartOf: { '@id': `${SITE.url}/#website` } },
        {
          '@type': 'Person', '@id': `${SITE.url}/#martin`, name: SITE.person, jobTitle: 'Event photographer', url: `${SITE.url}/about`,
          image: `${SITE.url}/img/martin-hols-portrait.jpg`, email: SITE.email, telephone: SITE.phone, award: SITE.award,
          description: 'Event and festival photographer from Hilversum, the Netherlands. Covered 2,132 events in more than ten years, from festival main stages to brand activations and Formula 1.',
          homeLocation: { '@type': 'Place', name: 'Hilversum, the Netherlands' },
          worksFor: { '@type': 'Organization', name: 'The Arrows' },
          knowsAbout: ['Event photography', 'Festival photography', 'Overview photography', 'Pyro and special effects photography', 'Corporate event photography', 'Sports photography', 'Concert photography'],
          hasOccupation: { '@type': 'Occupation', name: 'Event photographer' },
        },
      ],
    },
  ],
  body: `
  <header class="panel hero ah" id="main">
    ${header('/about')}
    <div class="hero-main">
      <p class="t-eyebrow acc">Meet your photographer</p>
      <h1>Over 2,000 events. One photographer who knows how they run.</h1>
      <p class="lead">Brands such as Albert Heijn, Tomorrowland and Formula 1 trust me to represent them at their events.</p>
      <div class="ah-btns d-btns">${btns}</div>
      <div class="stats ah-stats">${stat(SITE.events, 'events shot')}${stat(SITE.years, 'years in the field')}</div>
      <div class="m-btns">${mbtns}</div>
    </div>
    <div class="portrait-d">
      ${img('martin-hols-portrait.jpg', 'Portrait of Martin Hols, smiling, in a black shirt against a warm orange backdrop', { priority: true })}
      ${award}
      <div class="namecard"><p class="nm">Martin Hols</p><hr><p class="t-eyebrow dim" style="font-size:12px;line-height:16px;letter-spacing:.22em">Event photographer</p></div>
    </div>
    <div class="portrait-m ah-pm">
      ${img('martin-hols-portrait.jpg', 'Portrait of Martin Hols', { priority: true })}
      <div><p class="nm">Martin Hols</p><p class="t-eyebrow">Event photographer</p></div>
    </div>
  </header>

  <section class="cream trusted lgrid" data-theme="cream" aria-labelledby="lg-h">
    <p class="t-eyebrow dim" id="lg-h">Events and brands I’ve worked for</p>
    <div class="logos logos24">${Array.from({ length: 24 }, (_, i) => logos[i] ? `<div>${img(logos[i][0], logos[i][1], { style: logos[i][2] })}</div>` : '<div class="empty" aria-hidden="true"></div>').join('')}</div>
  </section>

  <section class="intro cream" data-theme="cream" aria-labelledby="intro-h">
    <div class="ph">
      ${img('martin-hols-portrait.jpg', 'Portrait of Martin Hols')}
      ${award}
    </div>
    <div class="tx">
      <div>
        <p class="t-eyebrow acc">About</p>
        <h2 id="intro-h">Based in the Netherlands, working wherever the event is.</h2>
        <p class="lead">I’m Martin Hols, an event and festival photographer. In more than ten years I’ve covered 2,132 events, from festival main stages to brand activations and Formula 1.</p>
        <p class="lead">Brands such as Albert Heijn, Tomorrowland and Formula 1 trust me to represent them. My work was recognised with the European Event Photography Award.</p>
      </div>
      <div class="intro-ft">
        <div class="stats">${stat(SITE.events, 'events shot')}${stat(SITE.years, 'years in the field')}${stat('4', 'kinds of events')}</div>
        <div class="ah-btns">${btns}</div>
      </div>
    </div>
  </section>

  <section class="glance cream" data-theme="cream" aria-labelledby="glance-h">
    <div class="gh">
      <p class="t-eyebrow acc">At a glance</p>
      <h2 id="glance-h">Martin Hols in eight facts.</h2>
      <p class="lead">The short version, for anyone who needs to know who they are hiring.</p>
    </div>
    <dl class="gl">${facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${e(v)}</dd></div>`).join('')}</dl>
  </section>

  <section class="panel story" aria-labelledby="story-h">
    <figure>
      ${img('defqon1-pyro-show.jpg', 'Two DJs on stage seen from the crowd under purple lights', { style: 'object-position:50% 50%' })}
      <figcaption class="glass">Close to the music, where it all started</figcaption>
    </figure>
    <div class="body">
      <p class="t-eyebrow acc">My story</p>
      <h2 id="story-h">It started in the front row.</h2>
      ${story.map((p) => `<p>${p}</p>`).join('')}
    </div>
  </section>

  <section class="cream road" data-theme="cream" aria-labelledby="road-h">
    <p class="t-eyebrow dim" id="road-h">The road so far</p>
    <ol class="tl">${timeline.map(([y, w]) => `<li><span class="y">${y}</span><span class="w">${w}</span></li>`).join('')}</ol>
  </section>

  <section class="panel frames" aria-labelledby="frames-h">
    <div class="fh">
      <div><p class="t-eyebrow acc">Selected frames</p><h2 id="frames-h">Four kinds of events.</h2></div>
      <a class="btn btn-l d-only" href="/portfolio">View portfolio <span class="ic">${ARROW16}</span></a>
    </div>
    <div class="fg">
      ${frames.map(([c, n, href, f, pos, alt]) => `<a class="ft" href="${href}">${img(f, alt, { style: `object-position:${pos}` })}<span class="fade"></span><span class="cap"><span class="ce">${c}</span><span class="nm">${n}</span></span><span class="rb">${ICONS.ARROW}</span></a>`).join('')}
    </div>
    <a class="m-btn l" href="/portfolio">View portfolio <span class="ic">${ARROW16}</span></a>
  </section>

  <section class="cream how" data-theme="cream" aria-labelledby="how-h">
    <div class="hh"><h2 id="how-h">How I work.</h2><p class="t-eyebrow dim">From briefing to delivery</p></div>
    <ol class="hw">${how.map(([t, d], i) => `<li><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></li>`).join('')}</ol>
  </section>

  <section class="cream specs" data-theme="cream" aria-labelledby="specs-h">
    <div class="hh"><h2 id="specs-h">What I love to shoot.</h2><p class="t-eyebrow acc">Specialties</p></div>
    <div class="spl">
      ${specs.map(([t, d, f, pos, alt], i) => `<article class="spx${i === 1 ? ' rev' : ''}" data-theme="dark"><div class="im">${img(f, alt, { style: `object-position:${pos}` })}</div><div class="tx"><span class="n">${String(i + 1).padStart(2, '0')}</span><h3>${t}</h3><p>${d}</p></div></article>`).join('')}
    </div>
  </section>

  ${contactSection('tomorrowland-stage-night.jpg')}
  ${footer()}`,
};
