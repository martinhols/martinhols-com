import { SITE } from '../site.mjs';
import { img, header, footer, ARROW, ARROW16 } from '../layout.mjs';

const co = SITE.company;
const details = ['MartinHols.com is part of The Arrows', co.kvk && `KVK: ${co.kvk}`, co.vat && `VAT: ${co.vat}`, co.address].filter(Boolean).join('<br>');
const types = [['fest', 'Festivals'], ['corp', 'Corporate'], ['sport', 'Sport'], ['music', 'Shows / Music']];

export const page = {
  path: '/contact',
  title: 'Contact & request a quote | Martin Hols, event photographer',
  description: 'Planning an event? Tell Martin Hols the date, the place and what you need. Email martin@thearrows.nl, call +31 6 4114 84 79 or send a quote request. Replies usually the same day.',
  ogImage: 'martin-hols-portrait.jpg',
  jsonld: [{
    '@context': 'https://schema.org', '@type': 'ContactPage', url: `${SITE.url}/contact`, name: 'Contact Martin Hols',
    about: { '@id': `${SITE.url}/#business` },
    mainEntity: { '@type': 'ProfessionalService', '@id': `${SITE.url}/#business`, name: SITE.name, email: SITE.email, telephone: SITE.phone, areaServed: ['Netherlands', 'Europe', 'Worldwide'] },
  }],
  body: `
  <header class="panel subhero" id="main">
    ${header('/contact')}
    <div><p class="t-eyebrow acc">Contact</p><h1>Let’s talk.</h1></div>
    <p class="sub">Planning an event? Tell me the date, the place and what you need.</p>
  </header>

  <section class="contact-grid" aria-label="Contact options and quote request">
    <div class="cream contact-side" data-theme="cream">
      <div>
        <p class="t-eyebrow acc">Get in touch</p>
        <h2>Prefer to call or write?</h2>
        <div class="ct-list">
          <a class="ct" href="mailto:${SITE.email}"><span><span class="t-eyebrow dim" style="display:block">Email</span><span class="v">${SITE.email}</span></span><span class="rb">${ARROW}</span></a>
          <a class="ct" href="tel:${SITE.phone}"><span><span class="t-eyebrow dim" style="display:block">Phone</span><span class="v">${SITE.phoneText}</span></span><span class="rb">${ARROW}</span></a>
          <a class="ct" href="${SITE.instagram}" target="_blank" rel="noopener"><span><span class="t-eyebrow dim" style="display:block">Instagram</span><span class="v">@martin.hols</span></span><span class="rb">${ARROW}</span></a>
        </div>
        <div class="next"><p class="t-eyebrow dim">What happens next</p><ol>
          <li><span>01</span><p><b>I reply the same day.</b> With a first answer and any questions about the event.</p></li>
          <li><span>02</span><p><b>You get a clear quote.</b> Date, hours, location, deliverables and price.</p></li>
          <li><span>03</span><p><b>Let’s get to work.</b> We confirm in writing and head into a great collaboration.</p></li>
        </ol></div>
        <div class="company"><p class="t-eyebrow dim">Company details</p><p class="d">${details}</p></div>
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
        <label class="fld"><span>Location</span><input type="text" name="location" placeholder="City, venue"></label>
      </div>
      <div class="fld"><span class="flb" id="type-l">Type of event</span><div class="ty" role="radiogroup" aria-labelledby="type-l">${types.map(([id, l], i) => `<input type="radio" name="type" value="${l}" id="t-${id}"${i === 0 ? ' checked' : ''}><label for="t-${id}">${l}</label>`).join('')}</div></div>
      <label class="fld"><span>Message</span><textarea name="message" placeholder="What are you planning?" required></textarea></label>
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
