// Template voor SEO/advertentie-landingspagina's. Eén config per pagina, zie src/pages/amsterdam.mjs.
// Volgorde: hero, klanten, portfolio van één categorie, FAQ, over mij, prijstabel, laatste projecten, offerteformulier.
import { SITE } from './site.mjs';
import { esc, img, header, footer, turnstile, ARROW, ARROW16, ICONS } from './layout.mjs';
import { tile, lightbox, projSec, catGallery } from './pages/portfolio.mjs';
import { PROJECTS, CATS } from './pages/projects.mjs';

const LOGOS = [
  ['logo-albert-heijn.png', 'Albert Heijn', 'width:159px;height:64px'],
  ['logo-tomorrowland.png', 'Tomorrowland', 'width:120px;height:64px'],
  ['logo-mojo.png', 'MOJO', 'width:190px;height:46px'],
  ['logo-gall-and-gall.png', 'Gall & Gall', 'width:188px;height:64px'],
  ['logo-formula-1.png', 'Formula 1', 'width:147px;height:64px'],
];
const TYPES = [['fest', 'Festivals'], ['corp', 'Corporate'], ['sport', 'Sport'], ['music', 'Shows / Music']];

export function landing(c) {
  const url = SITE.url + c.path;
  const list = catGallery(c.cat, c.galleryMax || 12);
  const slides = (list.length >= 2 ? list.slice(0, 6) : [{ file: c.hero.file, alt: c.hero.alt, pos: c.hero.pos || '50% 50%', name: c.catName }]).map((p) => ({ file: p.file, alt: p.alt, pos: p.pos, name: p.name }));
  // Geen projecten in deze categorie? Toon dan de laatste projecten in het algemeen.
  const latest = () => { const L = [...PROJECTS].sort((a, b) => String((b.db && (b.db.event_date || b.db.created_at)) || '').localeCompare(String((a.db && (a.db.event_date || a.db.created_at)) || ''))).slice(0, 3); return L.length ? `
  <section class="panel projects" aria-labelledby="projects-h">
    <div class="hd"><div><p class="t-eyebrow acc">Projects</p><h2 id="projects-h">Latest events</h2></div><a class="btn btn-p" href="/projects">All projects <span class="ic">${ARROW16}</span></a></div>
    <div class="pgrid">${L.map((p) => `<a class="pc" href="${p.href}">${img(p.file, p.alt, { style: `object-position:${p.pos}` })}<p class="t-eyebrow acc k">${CATS[p.cat]}</p><p class="tt">${esc(p.title)}</p></a>`).join('')}</div>
  </section>` : ''; };
  return {
    path: c.path, title: c.title, description: c.description, ogImage: c.hero.file,
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${SITE.url}/#business`, name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email, areaServed: c.areaServed, priceRange: c.priceRange },
      { '@context': 'https://schema.org', '@type': 'Service', name: c.serviceName, serviceType: c.serviceType, provider: { '@id': `${SITE.url}/#business` }, areaServed: c.areaServed, url, offers: c.prices.map(([n, p]) => ({ '@type': 'Offer', name: `${c.serviceType}, ${n}`, price: String(p.replace(/[^\d]/g, '')), priceCurrency: 'EUR' })) },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: c.crumb, item: url }] },
    ],
    body: `
  <header class="panel hero lp2" id="main">
    ${header('')}
    <div class="hero-main">
      <div class="eyebrows"><p class="t-eyebrow acc">${c.eyebrow}</p><i></i><p class="t-eyebrow dim">${c.eyebrow2}</p></div>
      <h1>${c.h1}</h1>
      <p class="lead" style="margin:16px 0 0;max-width:640px;font:400 22px/34px var(--font-body);color:var(--ink-muted)">${c.lead}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin:24px 0 28px">
        <a class="btn btn-p" href="#quote" data-cta="${c.key}-hero-quote">Request a quote <span class="ic">${ARROW16}</span></a>
        <a class="btn btn-o" href="tel:${SITE.phone}" data-cta="${c.key}-hero-call">Call ${SITE.phoneText}</a>
      </div>
      <div class="slider" data-slider role="group" aria-roledescription="carousel" aria-label="Selected ${c.catName.toLowerCase()} photos">
        <div class="track">
          ${slides.map((p, i) => `<div class="slide${i === 0 ? ' on' : ''}" data-name="${esc(p.name)}" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${slides.length}">${img(p.file, p.alt, { style: `object-position:${p.pos}`, priority: i === 0, sizes: '(min-width:1100px) 72vw, 100vw' })}</div>`).join('')}
        </div>
        <a class="s-cap glass" href="/portfolio/${c.cat}" data-cap>${esc(slides[0].name)}</a>
        <div class="s-count glass" aria-hidden="true"><span data-num>01</span><span class="bar"><i></i></span><span class="of">${String(slides.length).padStart(2, '0')}</span></div>
        <a class="rb s-go" href="/portfolio/${c.cat}" aria-label="View ${c.catName.toLowerCase()} photos">${ARROW}</a>
      </div>
    </div>

    <div class="portrait-d">
      ${img('martin-hols-portrait.jpg', 'Portrait of Martin Hols, smiling, in a black shirt against a warm orange backdrop', { priority: true })}
      <div class="award"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">Award winner</p><p class="t-caption">European Event<br>Photography Award</p></div></div>
      <div class="namecard"><p class="t-eyebrow acc" style="font-size:12px;line-height:16px;letter-spacing:.22em">Event photographer</p><p class="nm">Martin Hols</p></div>
    </div>

    <div class="portrait-m">
      ${img('martin-hols-portrait.jpg', 'Portrait of Martin Hols')}
      <div><p class="nm">Martin Hols</p><p class="t-eyebrow">Event photographer</p></div>
    </div>
    <a class="m-btn p btn-q" href="#quote">Request a quote <span class="ic">${ARROW16}</span></a>
  </header>

  <section class="cream trusted" data-theme="cream" aria-labelledby="trusted-h">
    <p class="t-eyebrow dim" id="trusted-h">Trusted by the brands behind the biggest events</p>
    <div class="logos">${LOGOS.map(([f, a, s]) => `<div>${img(f, a, { style: s })}</div>`).join('')}</div>
  </section>

  <section class="panel gal" id="gallery" aria-labelledby="gal-h">
    <div class="gh">
      <div><p class="t-eyebrow acc">${c.galleryEyebrow}</p><h2 id="gal-h">${c.galleryTitle}</h2></div>
      <a class="btn btn-l" href="/portfolio/${c.cat}">All ${c.catName.toLowerCase()} frames <span class="ic">${ARROW16}</span></a>
    </div>
    <div class="grid" data-gallery>${list.map(tile).join('')}</div>
  </section>
  ${lightbox}

  <section class="cream faqs" data-theme="cream" aria-labelledby="faq-h">
    <div class="fq-l">
      <p class="t-eyebrow acc">FAQ</p>
      <h2 id="faq-h">${c.faqTitle}</h2>
      <p class="lead">The questions organisers ask most before they book.</p>
      <a class="btn btn-o plain" href="#quote" style="color:var(--ink);border-color:var(--line-strong)">Ask me something else</a>
    </div>
    <div class="faq">${c.faq.map(([q, a]) => `<details class="qa"><summary><h3>${esc(q)}</h3><span class="pl" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span></summary><p>${esc(a)}</p></details>`).join('')}</div>
  </section>

  <section class="about" aria-labelledby="about-h">
    <div class="ph">
      ${img('martin-hols-portrait.jpg', 'Portrait of Martin Hols')}
      <div class="award"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">Award winner</p><p class="t-caption">European Event<br>Photography Award</p></div></div>
      <div class="award-m"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">Award winner</p><p class="w">European Event Photography Award</p></div></div>
    </div>
    <div class="cream tx" data-theme="cream">
      <p class="t-eyebrow acc">About me</p>
      <h2 id="about-h">${c.aboutTitle}</h2>
      <p class="lead">${c.aboutText}</p>
      <div class="stats">
        <div><p class="stat">${SITE.events}</p><p class="l">events shot</p></div>
        <div><p class="stat">${SITE.years}</p><p class="l">years in the field</p></div>
      </div>
      <a class="btn btn-p" href="/about">Meet your photographer <span class="ic">${ARROW16}</span></a>
    </div>
  </section>

  <section class="cream pricing" data-theme="cream" aria-labelledby="price-h" id="prices">
    <div class="pr-h">
      <div><p class="t-eyebrow acc">Prices</p><h2 id="price-h">${c.priceTitle}</h2></div>
      <p class="lead">${c.priceIntro}</p>
    </div>
    <div class="pr-grid">${c.prices.map(([n, p, d], i) => `<a class="pr-card${i === c.prices.length - 1 ? ' hi' : ''}" href="#quote" data-cta="${c.key}-price-${i + 1}"><p class="t-eyebrow acc">${n}</p><p class="pr-p">${p}</p><p class="pr-d">${d || ''}</p><ul>${(c.priceIncl || []).map((t) => `<li><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>${t}</li>`).join('')}</ul><span class="pr-go">Request a quote <i>${ARROW}</i></span></a>`).join('')}</div>
    <div class="pr-notes">${(c.priceNotes || []).map(([k, v]) => `<div><p class="t-eyebrow dim">${k}</p><p>${v}</p></div>`).join('')}</div>
  </section>

  ${latest()}

  <section class="contact-grid" id="quote" aria-label="Request a quote">
    <div class="cream contact-side" data-theme="cream">
      <div>
        <p class="t-eyebrow acc">Get in touch</p>
        <h2>Prefer to call or write?</h2>
        <div class="ct-list">
          <a class="ct" href="mailto:${SITE.email}"><span><span class="t-eyebrow dim" style="display:block">Email</span><span class="v">${SITE.email}</span></span><span class="rb">${ARROW}</span></a>
          <a class="ct" href="tel:${SITE.phone}"><span><span class="t-eyebrow dim" style="display:block">Phone</span><span class="v">${SITE.phoneText}</span></span><span class="rb">${ARROW}</span></a>
        </div>
        <div class="next"><p class="t-eyebrow dim">What happens next</p><ol>
          <li><span>01</span><p><b>I reply within one working day,</b> with a first answer and any questions about the event.</p></li>
          <li><span>02</span><p><b>You get a clear quote.</b> Date, hours, location, deliverables and price.</p></li>
          <li><span>03</span><p><b>Let’s get to work.</b> We confirm everything and I start planning.</p></li>
        </ol></div>
      </div>
    </div>
    <form class="quote" id="quote-form" action="/api/contact" method="post" novalidate>
      <div><p class="t-eyebrow acc">Request a quote</p><h2>Tell me about your event.</h2></div>
      <div class="frow">
        <label class="fld"><span>Name</span><input type="text" name="name" placeholder="Your name" autocomplete="name" required></label>
        <label class="fld"><span>Email</span><input type="email" name="email" placeholder="you@company.com" autocomplete="email" required></label>
      </div>
      <label class="fld"><span>Company or event</span><input type="text" name="company" placeholder="e.g. Albert Heijn, Defqon.1" autocomplete="organization" required></label>
      <div class="frow">
        <label class="fld"><span>Event date</span><input type="text" name="date" placeholder="dd / mm / yyyy" inputmode="numeric"></label>
        <label class="fld"><span>Location</span><input type="text" name="location" placeholder="City, venue"${c.formLocation ? ` value="${esc(c.formLocation)}"` : ''}></label>
      </div>
      <div class="fld"><span class="flb" id="type-l">Type of event</span><div class="ty" role="radiogroup" aria-labelledby="type-l">${TYPES.map(([id, l]) => `<input type="radio" name="type" value="${l}" id="t-${id}"${l === c.catName ? ' checked' : ''}><label for="t-${id}">${l}</label>`).join('')}</div></div>
      <label class="fld"><span>Message</span><textarea name="message" placeholder="What are you planning?" required></textarea></label>
      <input type="hidden" name="ts" value="">
      ${turnstile()}
      <div class="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <p class="status" id="form-status" role="status" aria-live="polite" hidden></p>
      <div class="send">
        <button type="submit" class="btn btn-p d-btn">Send request <span class="ic">${ARROW16}</span></button>
        <p>Or email <a href="mailto:${SITE.email}">${SITE.email}</a> directly.</p>
      </div>
    </form>
  </section>
  ${footer()}`,
  };
}
