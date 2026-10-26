import { SITE } from '../site.mjs';
import { esc, img, header, contactSection, footer, ARROW, ARROW16 } from '../layout.mjs';

const CHECK = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>';
const AUTHOR = 'Martin Hols is an event photographer from the Netherlands. He has shot 2,132 events in more than ten years and won the European Event Photography Award.';

const POSTS = [
  {
    slug: 'how-to-brief-a-festival-photographer', type: 'guide', tag: 'Guide',
    title: 'How to brief a festival photographer.',
    desc: 'How to brief a festival photographer: send a written callsheet with the schedule, must-have moments, access, contacts and delivery. Practical guide by Martin Hols.',
    teaser: 'Send a written callsheet with the schedule, the must-have moments, access and contacts. Here is what to put in it, and why it beats a meeting.',
    short: 'Send a written callsheet: the schedule, the must-have moments, access and contacts, and when you need the images. One clear document beats any meeting.',
    file: 'portfolio/mysteryland-sunset-stone-hand-stage.jpg', pos: '50% 45%', alt: 'Mysteryland main stage at sunset, a giant stone hand holding the DJ booth, red smoke and light beams over the crowd', cap: 'Mysteryland 2025 · main stage at sunset',
    card: 'portfolio/mysteryland-stage-sunset-fireworks.jpg', cardAlt: 'Festival main stage at sunset with fireworks',
    toc: [['callsheet', 'Start with a callsheet'], ['moments', 'Name the must-have moments'], ['access', 'Sort access before the day'], ['delivery', 'Agree on delivery up front']],
    body: `
      <section id="callsheet"><h2>Start with a callsheet, not a meeting.</h2>
        <p>A photographer works from what is written down. On the day, nobody remembers what was said in a video call three weeks earlier, but everyone can check the callsheet. Put everything in one document and send it at least a week before the event.</p>
        <p>The best briefings are short. One page that answers who, what, where and when is worth more than a long deck. Below is what I ask every client to include.</p>
        <div class="cks"><p class="t-eyebrow acc">Callsheet checklist</p><ul class="ck">${['Programme with times per stage or room', 'The must-have shots: sponsors, speakers, headliners, pyro moments', 'Access: wristbands, photo pit, backstage, rooftop or towers', 'One contact person on site, with a phone number', 'Delivery: how many images, in what format, and by when', 'Usage: social, press, sponsors, aftermovie or campaign'].map((t) => `<li>${CHECK}<span>${t}</span></li>`).join('')}</ul></div>
      </section>
      <section id="moments"><h2>Name the must-have moments.</h2>
        <p>Every event has a handful of moments that matter most to you: the sponsor activation, the CEO on stage, the headliner’s first drop. List them with a time and a place, so I can be in the right spot before it happens instead of running after it.</p>
        <figure class="af">${img('portfolio/defqon1-stage-wall-of-fire.jpg', 'Wall of fire on the Defqon.1 main stage', { style: 'object-position:50% 50%' })}<figcaption>Defqon.1 · a pyro cue on the main stage. Moments like this are only caught when the timing is in the briefing.</figcaption></figure>
      </section>
      <section id="access"><h2>Sort access before the day.</h2>
        <p>The best overview shots come from places guests can’t reach: a light tower, a stage wing, a rooftop. Arrange the wristbands and permissions in advance and put them in the callsheet. Ten minutes lost at a gate can mean missing the opening of the show.</p>
      </section>
      <section id="delivery"><h2>Agree on delivery up front.</h2>
        <p>Say when you need the first images and what for. Social teams often want a selection during the event; sponsors and press usually need the full set the next day. If it is in the briefing, the workflow on site is built around it.</p>
      </section>`,
    faq: [['What should a briefing for an event photographer include?', 'A written callsheet with the programme and times, the must-have moments, access and permissions, one contact on site, and the delivery and usage requirements.'], ['How far in advance should I send the briefing?', 'At least a week before the event, so access and wristbands can be arranged in time.']],
  },
  {
    slug: 'shooting-pyro-at-defqon1', type: 'story', tag: 'Story',
    title: 'Shooting pyro at Defqon.1.',
    desc: 'How event photographer Martin Hols shoots pyro on the Defqon.1 main stage: know the cue, pick your spot early and stay calm when the stage turns bright.',
    teaser: 'A pyro cue lasts a few seconds and there is no second take. Here is how I prepare for it.',
    short: 'Pyro is a moment you get once. I shoot it by knowing the cue, standing where the heat is and staying calm when the stage turns bright.',
    file: 'portfolio/defqon1-stage-wall-of-fire.jpg', pos: '50% 50%', alt: 'Wall of fire on the Defqon.1 main stage', cap: 'Defqon.1 · main stage pyro',
    card: 'portfolio/defqon1-stage-wall-of-fire.jpg', cardAlt: 'Wall of fire on the Defqon.1 main stage',
    facts: [['Event', 'Defqon.1'], ['Place', 'Biddinghuizen, the Netherlands'], ['My job', 'Main stage, pyro and overview shots']],
    body: `
      <section><h2>The cue comes once.</h2>
        <p>A pyro cue lasts a few seconds and there is no second take. So the work happens before it: I read the show plan, learn where the flames go and decide where to stand.</p>
      </section>
      <blockquote class="pq"><p class="t-eyebrow acc">From the pit</p><p class="q">A flame doesn’t do it twice.</p><p class="by">Martin Hols</p></blockquote>
      <section><h2>Stay calm when it gets bright.</h2>
        <p>When the stage turns white, the camera wants to give up. I expose for the flames, let the crowd fall into shadow and trust the rhythm of the show.</p>
      </section>
      <section><h2>Three things I do every time.</h2>
        <ol class="steps">${[['Know the cue', 'Ask for the show plan and the cue times before the day.'], ['Pick a spot early', 'Walk the pit before the doors open and choose where to stand.'], ['Shoot wide, then tight', 'Overview first, details when the cue comes back.']].map(([h, p], i) => `<li><span class="n">0${i + 1}</span><span><b>${h}</b>${p}</span></li>`).join('')}</ol>
      </section>`,
    faq: [['How do you photograph pyro at a festival?', 'By knowing the cue times from the show plan, choosing a spot before the doors open, exposing for the flames and shooting wide first, then tight when the cue returns.']],
  },
];
const words = (p) => p.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const mins = (p) => Math.max(2, Math.round(words(p) / 200));
const url = (p) => `/blog/${p.slug}`;
const count = (k) => (k === 'all' ? POSTS.length : POSTS.filter((p) => p.type === k).length);

const card = (p) => `<a class="bc" data-c="${p.type}" href="${url(p)}"><span class="im">${img(p.card, p.cardAlt)}<span class="tg">${p.tag}</span></span><span class="tx"><span><span class="nm">${esc(p.title)}</span><span class="dt">${mins(p)} min read</span></span><span class="rb">${ARROW}</span></span></a>`;
const crumbs = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: n, item: SITE.url + u })) });

const list = {
  path: '/blog',
  title: 'Blog: guides and stories from behind the lens | Martin Hols',
  description: 'Guides for event organisers and stories from behind the lens at the biggest stages, by event photographer Martin Hols.',
  ogImage: 'portfolio/mysteryland-sunset-stone-hand-stage.jpg',
  jsonld: [
    { '@context': 'https://schema.org', '@type': 'Blog', '@id': `${SITE.url}/blog#blog`, url: `${SITE.url}/blog`, name: 'Notes from the pit', inLanguage: 'en', author: { '@id': `${SITE.url}/#martin` }, blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title.replace(/\.$/, ''), url: SITE.url + url(p) })) },
    crumbs([['Home', '/'], ['Blog', '/blog']]),
  ],
  body: `
  <header class="panel subhero" id="main">
    ${header('/blog')}
    <div><p class="t-eyebrow acc">Blog</p><h1>Notes from the pit.</h1></div>
    <p class="sub">Guides for event organisers and stories from behind the lens at the biggest stages.</p>
  </header>

  <a class="panel ftr" href="${url(POSTS[0])}">
    <span class="fi">${img(POSTS[0].file, POSTS[0].alt, { style: 'object-position:50% 45%' })}<span class="fb"><i>${ARROW16.replace('M7 17L17 7M8 7h9v9', 'M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z')}</i>Featured</span></span>
    <span class="fx2"><span><span class="meta"><span class="t-eyebrow acc">${POSTS[0].tag}</span><i></i><span class="t-eyebrow dim">${mins(POSTS[0])} min read</span></span><h2>${esc(POSTS[0].title)}</h2><p>${POSTS[0].teaser}</p></span><span class="btn btn-p">Read the guide <span class="ic">${ARROW16}</span></span></span>
  </a>

  <section class="cream lst blst" data-theme="cream" aria-labelledby="all-h">
    <div class="lh"><h2 class="t-h3" id="all-h">All articles</h2>
      <div class="fpr" role="radiogroup" aria-label="Filter articles">${[['all', 'All'], ['guide', 'Guides'], ['story', 'Stories']].map(([k, l], i) => `<input type="radio" name="b" id="b-${k}"${i ? '' : ' checked'}><label for="b-${k}">${l}<i>${count(k)}</i></label>`).join('')}</div>
    </div>
    <div class="bgr">${POSTS.map(card).join('')}</div>
  </section>

  ${contactSection('tomorrowland-stage-night.jpg')}
  ${footer()}`,
};

const post = (p) => {
  const more = POSTS.filter((o) => o !== p);
  return {
    path: url(p),
    title: `${p.title.replace(/\.$/, '')} | Martin Hols`,
    description: p.desc,
    ogImage: p.file,
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'Article', '@id': `${SITE.url}${url(p)}#article`, headline: p.title.replace(/\.$/, ''), description: p.desc, url: SITE.url + url(p), inLanguage: 'en', image: `${SITE.url}/img/${p.file}`, wordCount: words(p), author: { '@id': `${SITE.url}/#martin` }, publisher: { '@id': `${SITE.url}/#martin` }, isPartOf: { '@id': `${SITE.url}/blog#blog` }, mainEntityOfPage: SITE.url + url(p) },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      crumbs([['Home', '/'], ['Blog', '/blog'], [p.title.replace(/\.$/, ''), url(p)]]),
    ],
    body: `
  <header class="panel ahero" id="main">
    ${header('/blog')}
    <div class="ah-l">
      <div>
        <div class="eyebrows"><a class="t-eyebrow acc" href="/blog">Blog</a><i class="sl">/</i><p class="t-eyebrow acc">${p.tag}</p><i></i><p class="t-eyebrow dim">${mins(p)} min read</p></div>
        <h1>${esc(p.title)}</h1>
        <div class="ans"><p class="t-eyebrow acc">${p.type === 'story' ? 'In short' : 'Short answer'}</p><p>${p.short}</p></div>
      </div>
      <div class="au">${img('martin-hols-portrait.jpg', 'Martin Hols', { style: 'object-position:50% 22%' })}<div><p class="nm">Martin Hols</p><p class="t-caption dim">Event photographer · ${esc(SITE.award)}</p></div></div>
    </div>
    <figure class="ah-r">${img(p.file, p.alt, { priority: true, style: `object-position:${p.pos}` })}<figcaption>${p.cap}</figcaption></figure>
  </header>

  <section class="cream art-w" data-theme="cream">
    <aside class="art-s">
      ${p.toc ? `<div><p class="t-eyebrow dim">In this guide</p><nav class="toc" aria-label="In this guide">${p.toc.map(([id, l], i) => `<a href="#${id}"><span>0${i + 1}</span>${l}</a>`).join('')}</nav></div>` : ''}
      ${p.facts ? `<dl class="pf">${p.facts.map(([k, v]) => `<div><dt class="t-eyebrow dim">${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}
      <div class="cta" data-theme="dark"><p class="t-eyebrow acc">Planning an event?</p><p class="h">${p.type === 'story' ? 'Tell me what you’re planning.' : 'Send me your callsheet and I’ll take it from there.'}</p><a class="btn btn-p" href="/contact#quote-form">Request a quote <span class="ic">${ARROW16}</span></a></div>
    </aside>
    <article class="art">${p.body}</article>
  </section>

  <section class="cream aut" data-theme="cream">
    <div class="ai">${img('martin-hols-portrait.jpg', 'Martin Hols', { style: 'object-position:50% 22%' })}<div><p class="t-eyebrow dim">About the author</p><p class="nm">Martin Hols</p><p class="bio">${AUTHOR}</p></div></div>
    <a class="btn btn-o" href="/about" style="color:var(--ink);border-color:var(--line-strong)">More about Martin <span class="ic">${ARROW16}</span></a>
  </section>

  <section class="panel keep" data-theme="dark">
    <div class="hh"><p class="t-eyebrow acc">Keep reading</p><a class="btn btn-o" href="/blog">All articles</a></div>
    ${more.map((o) => `<a class="cr" href="${url(o)}"><span><span class="t-eyebrow dim" style="display:block">${o.tag} · ${mins(o)} min read</span><span class="t-h4" style="display:block;margin-top:6px">${esc(o.title.replace(/\.$/, ''))}</span></span><span class="rb">${ARROW}</span></a>`).join('')}
  </section>

  ${contactSection('tomorrowland-stage-night.jpg')}
  ${footer()}`,
  };
};

export const pages = [list, ...POSTS.map(post)];
