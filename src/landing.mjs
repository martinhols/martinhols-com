// Template voor SEO/advertentie-landingspagina's. Eén config per pagina, zie src/pages/amsterdam.mjs.
// Volgorde: hero, klanten, portfolio van één categorie, FAQ, over mij, prijstabel, laatste projecten, offerteformulier.
import { SITE } from './site.mjs';
import { esc, img, header, footer, turnstile, ARROW, ARROW16, ICONS } from './layout.mjs';
import { tile, lightbox, projSec, catGallery } from './pages/portfolio.mjs';
import { PROJECTS, CATS } from './pages/projects.mjs';
import { photosById } from './data.mjs';
import { tr } from './i18n.mjs';

const LOGOS = [
  ['logo-albert-heijn.png', 'Albert Heijn', 'width:159px;height:64px'],
  ['logo-tomorrowland.png', 'Tomorrowland', 'width:120px;height:64px'],
  ['logo-mojo.png', 'MOJO', 'width:190px;height:46px'],
  ['logo-gall-and-gall.png', 'Gall & Gall', 'width:188px;height:64px'],
  ['logo-formula-1.png', 'Formula 1', 'width:147px;height:64px'],
];
const TYPES = [['fest', 'Festivals', 'festivals'], ['corp', 'Corporate', 'corporate'], ['sport', 'Sport', 'sport'], ['music', 'Shows / Music', 'shows-music']];

export function landing(c) {
  const t = tr(c.lang), L = t.lp;
  const url = SITE.url + c.path;
  const formType = c.formType !== undefined ? c.formType : c.catName;
  const list = catGallery(c.cat, c.galleryMax || 12);
  // Hero-slider: bij voorkeur de vaste lijst `heroPhotoIds` (minstens 2 gevonden), anders de eerste 6 van de categorie.
  const picked = photosById(c.heroPhotoIds);
  const slides = (picked.length >= 2 ? picked : list.length >= 2 ? list.slice(0, 6) : [{ file: c.hero.file, alt: c.hero.alt, pos: c.hero.pos || '50% 50%', name: c.catName }]).map((p) => ({ file: p.file, alt: p.alt, pos: p.pos, name: p.name }));
  // Geen projecten in deze categorie? Toon dan de laatste projecten in het algemeen.
  const latest = () => { const LP = [...PROJECTS].sort((a, b) => String((b.db && (b.db.event_date || b.db.created_at)) || '').localeCompare(String((a.db && (a.db.event_date || a.db.created_at)) || ''))).slice(0, 3); return LP.length ? `
  <section class="panel projects" aria-labelledby="projects-h">
    <div class="hd"><div><p class="t-eyebrow acc">${L.projects}</p><h2 id="projects-h">${L.latest}</h2></div><a class="btn btn-p" href="/projects">${L.allProjects} <span class="ic">${ARROW16}</span></a></div>
    <div class="pgrid">${LP.map((p) => `<a class="pc" href="${p.href}">${img(p.file, p.alt, { style: `object-position:${p.pos}` })}<p class="t-eyebrow acc k">${t.cats[p.cat] || CATS[p.cat]}</p><p class="tt">${esc(p.title)}</p></a>`).join('')}</div>
  </section>` : ''; };
  return {
    path: c.path, title: c.title, description: c.description, ogImage: c.hero.file, lang: c.lang, alternates: c.alternates,
    jsonld: [
      { '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${SITE.url}/#business`, name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email, areaServed: c.areaServed, priceRange: c.priceRange },
      { '@context': 'https://schema.org', '@type': 'Service', name: c.serviceName, serviceType: c.serviceType, provider: { '@id': `${SITE.url}/#business` }, areaServed: c.areaServed, url, ...((c.prices || []).length ? { offers: c.prices.map(([n, p]) => ({ '@type': 'Offer', name: `${c.serviceType}, ${n}`, price: String(p.replace(/[^\d]/g, '')), priceCurrency: 'EUR' })) } : {}) },
      ...(c.person ? [{ '@context': 'https://schema.org', '@type': 'Person', '@id': `${SITE.url}/#martin`, name: SITE.person, jobTitle: c.person.jobTitle, url: SITE.url + '/', email: SITE.email, telephone: SITE.phone, award: `${SITE.award} 2025`, knowsAbout: c.person.knowsAbout, areaServed: c.areaServed[c.areaServed.length - 1] }] : []),
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: c.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: c.crumb, item: url }] },
    ],
    body: `
  <header class="panel hero lp2" id="main">
    ${header('', c.lang)}
    <div class="hero-main">
      <div class="eyebrows"><p class="t-eyebrow acc">${c.eyebrow}</p><i></i><p class="t-eyebrow dim">${c.eyebrow2}</p></div>
      <h1>${c.h1}</h1>
      <p class="lead" style="margin:16px 0 0;max-width:640px;font:400 22px/34px var(--font-body);color:var(--ink-muted)">${c.lead}</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin:24px 0 28px">
        <a class="btn btn-p" href="#quote" data-cta="${c.key}-hero-quote">${t.quote} <span class="ic">${ARROW16}</span></a>
        <a class="btn btn-o" href="tel:${SITE.phone}" data-cta="${c.key}-hero-call">${t.call} ${SITE.phoneText}</a>
      </div>
      <div class="slider" data-slider role="group" aria-roledescription="carousel" aria-label="${c.sliderLabel || `Selected ${c.catName.toLowerCase()} photos`}">
        <div class="track">
          ${slides.map((p, i) => `<div class="slide${i === 0 ? ' on' : ''}" data-name="${esc(p.name)}" role="group" aria-roledescription="slide" aria-label="${i + 1} ${L.of} ${slides.length}">${img(p.file, p.alt, { style: `object-position:${p.pos}`, priority: i === 0, sizes: '(min-width:1100px) 72vw, 100vw' })}</div>`).join('')}
        </div>
        <a class="s-cap glass" href="/portfolio/${c.cat}" data-cap>${esc(slides[0].name)}</a>
        <div class="s-count glass" aria-hidden="true"><span data-num>01</span><span class="bar"><i></i></span><span class="of">${String(slides.length).padStart(2, '0')}</span></div>
        <a class="rb s-go" href="/portfolio/${c.cat}" aria-label="${c.viewLabel || `View ${c.catName.toLowerCase()} photos`}">${ARROW}</a>
      </div>
    </div>

    <div class="portrait-d">
      ${img('martin-hols-event-photographer.jpg', L.portraitAlt, { priority: true })}
      <div class="award"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">${L.awardWinner}</p><p class="t-caption">${L.awardL1}<br>${L.awardL2}</p></div></div>
      <div class="namecard"><p class="t-eyebrow acc" style="font-size:12px;line-height:16px;letter-spacing:.22em">${L.eventPhotographer}</p><p class="nm">Martin Hols</p></div>
    </div>

    <div class="portrait-m">
      ${img('martin-hols-avatar.jpg', L.avatarAlt)}
      <div><p class="nm">Martin Hols</p><p class="t-eyebrow">${L.eventPhotographer}</p></div>
    </div>
    <a class="m-btn p btn-q" href="#quote">${t.quote} <span class="ic">${ARROW16}</span></a>
  </header>

  <section class="cream trusted" data-theme="cream" aria-labelledby="trusted-h">
    <p class="t-eyebrow dim" id="trusted-h">${L.trusted}</p>
    <div class="logos">${LOGOS.map(([f, a, s]) => `<div>${img(f, a, { style: s })}</div>`).join('')}</div>
  </section>

  <section class="panel gal" id="gallery" aria-labelledby="gal-h">
    <div class="gh">
      <div><p class="t-eyebrow acc">${c.galleryEyebrow}</p><h2 id="gal-h">${c.galleryTitle}</h2></div>
      <a class="btn btn-l" href="/portfolio/${c.cat}">${c.allFramesLabel || `All ${c.catName.toLowerCase()} frames`} <span class="ic">${ARROW16}</span></a>
    </div>
    <div class="grid" data-gallery>${list.map(tile).join('')}</div>
  </section>
  ${lightbox}
  ${(c.sections || []).length ? `<section class="cream lp-prose" data-theme="cream" aria-label="${esc(c.sectionsLabel || c.h1)}"><div class="pg">${c.sections.map((x) => `<div><p class="t-eyebrow acc">${x.eyebrow}</p><h2>${x.title}</h2>${x.html}</div>`).join('')}</div></section>` : ''}

  <section class="cream faqs" data-theme="cream" aria-labelledby="faq-h">
    <div class="fq-l">
      <p class="t-eyebrow acc">${L.faq}</p>
      <h2 id="faq-h">${c.faqTitle}</h2>
      <p class="lead">${L.faqLead}</p>
      <a class="btn btn-o plain" href="#quote" style="color:var(--ink);border-color:var(--line-strong)">${L.askMore}</a>
    </div>
    <div class="faq">${c.faq.map(([q, a, href, label]) => `<details class="qa"><summary><h3>${esc(q)}</h3><span class="pl" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span></summary><p>${esc(a)}${href ? ` <a href="${href}">${esc(label)}</a>` : ''}</p></details>`).join('')}</div>
  </section>

  <section class="about" aria-labelledby="about-h">
    <div class="ph">
      ${img('martin-hols-event-photographer.jpg', L.portraitShort)}
      <div class="award"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">${L.awardWinner}</p><p class="t-caption">${L.awardL1}<br>${L.awardL2}</p></div></div>
      <div class="award-m"><div class="ai">${ICONS.STAR}</div><div><p class="t-eyebrow">${L.awardWinner}</p><p class="w">${L.awardM}</p></div></div>
    </div>
    <div class="cream tx" data-theme="cream">
      <p class="t-eyebrow acc">${L.aboutEyebrow}</p>
      <h2 id="about-h">${c.aboutTitle}</h2>
      <p class="lead">${c.aboutText}</p>
      <div class="stats">
        <div><p class="stat">${t.events}</p><p class="l">${L.eventsShot}</p></div>
        <div><p class="stat">${SITE.years}</p><p class="l">${L.yearsField}</p></div>
      </div>
      <a class="btn btn-p" href="/about">${L.meet} <span class="ic">${ARROW16}</span></a>
    </div>
  </section>

  ${(c.prices || []).length ? `<section class="cream pricing" data-theme="cream" aria-labelledby="price-h" id="prices">
    <div class="pr-h">
      <div><p class="t-eyebrow acc">${L.prices}</p><h2 id="price-h">${c.priceTitle}</h2></div>
      <p class="lead">${c.priceIntro}</p>
    </div>
    <div class="pr-grid">${c.prices.map(([n, p, d], i) => `<a class="pr-card${i === c.prices.length - 1 ? ' hi' : ''}" href="#quote" data-cta="${c.key}-price-${i + 1}"><p class="t-eyebrow acc">${n}</p><p class="pr-p">${p}</p><p class="pr-d">${d || ''}</p><ul>${(c.priceIncl || []).map((t) => `<li><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>${t}</li>`).join('')}</ul><span class="pr-go">${t.quote} <i>${ARROW}</i></span></a>`).join('')}</div>
    <div class="pr-notes">${(c.priceNotes || []).map(([k, v]) => `<div><p class="t-eyebrow dim">${k}</p><p>${v}</p></div>`).join('')}</div>
  </section>` : ''}

  ${latest()}

  <section class="contact-grid" id="quote" aria-label="${t.quote}">
    <div class="cream contact-side" data-theme="cream">
      <div>
        <p class="t-eyebrow acc">${L.getInTouch}</p>
        <h2>${L.preferCall}</h2>
        <div class="ct-list">
          <a class="ct" href="mailto:${SITE.email}"><span><span class="t-eyebrow dim" style="display:block">${t.email}</span><span class="v">${SITE.email}</span></span><span class="rb">${ARROW}</span></a>
          <a class="ct" href="tel:${SITE.phone}"><span><span class="t-eyebrow dim" style="display:block">${t.phone}</span><span class="v">${SITE.phoneText}</span></span><span class="rb">${ARROW}</span></a>
        </div>
        <div class="next"><p class="t-eyebrow dim">${L.next}</p><ol>
          <li><span>01</span><p>${L.n1}</p></li>
          <li><span>02</span><p>${L.n2}</p></li>
          <li><span>03</span><p>${L.n3}</p></li>
        </ol></div>
      </div>
    </div>
    <form class="quote" id="quote-form" action="/api/contact" method="post" novalidate data-ok="${esc(L.ok)}" data-err="${esc(L.err)}" data-bad="${esc(L.bad)}">
      <div><p class="t-eyebrow acc">${t.quote}</p><h2>${L.tell}</h2></div>
      <div class="frow">
        <label class="fld"><span>${L.name}</span><input type="text" name="name" placeholder="${L.yourName}" autocomplete="name" required></label>
        <label class="fld"><span>${L.mail}</span><input type="email" name="email" placeholder="${L.mailPh}" autocomplete="email" required></label>
      </div>
      <label class="fld"><span>${L.company}</span><input type="text" name="company" placeholder="${L.companyPh}" autocomplete="organization" required></label>
      <div class="frow">
        <label class="fld"><span>${L.date}</span><input type="text" name="date" placeholder="${L.datePh}" inputmode="numeric"></label>
        <label class="fld"><span>${L.location}</span><input type="text" name="location" placeholder="${L.locationPh}"${c.formLocation ? ` value="${esc(c.formLocation)}"` : ''}></label>
      </div>
      <div class="fld"><span class="flb" id="type-l">${L.type}</span><div class="ty" role="radiogroup" aria-labelledby="type-l">${TYPES.map(([id, l, slug]) => `<input type="radio" name="type" value="${l}" id="t-${id}"${l === formType ? ' checked' : ''}><label for="t-${id}">${t.cats[slug]}</label>`).join('')}</div></div>
      <label class="fld"><span>${L.message}</span><textarea name="message" placeholder="${L.messagePh}" required></textarea></label>
      <input type="hidden" name="ts" value="">
      ${turnstile()}
      <div class="hp" aria-hidden="true"><label>${L.leaveEmpty} <input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <p class="status" id="form-status" role="status" aria-live="polite" hidden></p>
      <div class="send">
        <button type="submit" class="btn btn-p d-btn">${L.send} <span class="ic">${ARROW16}</span></button>
        <p>${L.orMail} <a href="mailto:${SITE.email}">${SITE.email}</a>${L.directly === '.' ? '.' : ' ' + L.directly}</p>
      </div>
    </form>
  </section>
  ${footer(c.lang)}`,
  };
}
