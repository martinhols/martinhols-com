import { SITE } from '../site.mjs';
import { esc, img, header, contactSection, footer, ARROW16 } from '../layout.mjs';

const CHECK = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>';
const url = `${SITE.url}/event-photographer-amsterdam`;

const FAQ = [
  ['How much does an event photographer in Amsterdam cost?', 'Corporate events and conferences: €650 for 4 hours, €900 for 6 hours, €1,150 for 8 hours and €1,350 for a full day. Festivals and sport: €850 per day. Shows and concerts: €650 per show. Editing and usage rights are included. VAT and travel costs are extra.'],
  ['Do you work in Amsterdam?', 'Yes. I am based in Hilversum, about 30 minutes from Amsterdam, so I can be on location quickly. I work all over Amsterdam and the surrounding region, and abroad.'],
  ['How fast do I get the photos?', 'At larger events I deliver fully edited, high-quality images during the event, ready for your social team. The rest of the set follows within 24 hours.'],
  ['Which events do you photograph?', 'Conferences, company parties, product launches, brand activations, festivals, sports events, concerts and shows.'],
  ['Are usage rights included?', 'Yes. All usage rights are included in the price, so you can use the photos on social media, your website, in press and in campaigns.'],
  ['What are the travel costs for an event in Amsterdam?', 'Travel is charged at €0.35 per kilometre from Hilversum. Because Amsterdam is close, this stays a small part of the total.'],
  ['How do I book you?', 'Send me the date, the location, the type of event and the hours you need. You get a clear quote, usually within one working day.'],
  ['What if I need a photographer on short notice?', 'Get in touch with your date. If I am available I can usually confirm quickly. If I am not, I tell you right away so you can look elsewhere.'],
];

const types = [
  ['Conferences and corporate events', 'Speakers, panels, networking and brand moments, in a clean set you can use straight away.'],
  ['Company parties and product launches', 'The mood, the guests and the details, without stiff group photos.'],
  ['Festivals and brand activations', 'Overviews, crowds, stages and sponsor moments, including pyro and fireworks.'],
  ['Sport and shows', 'Action, atmosphere and the decisive moment, from the arena to the stage.'],
];

const incl = [
  'Fully edited images, delivered during the event at larger events',
  'The rest of the set within 24 hours',
  'All usage rights included: social, web, press and campaigns',
  'A written briefing or callsheet agreed up front',
  'Backup gear on location, and a plan if something goes wrong',
  'One clear quote, no surprises on the day',
];

const steps = [
  ['Send your request', 'Date, location, type of event and the hours you need.'],
  ['Get a clear quote', 'I reply within one working day with a fixed price and what is included.'],
  ['Brief me', 'Send a callsheet with the programme and must-have moments. I plan positions with you.'],
  ['Receive your photos', 'Edited images during the event, the full set within 24 hours.'],
];

const frames = [
  ['portfolio/corporate-event-circular-auditorium.jpg', 'Corporate event in a circular auditorium under a truss ceiling', '50% 45%', 'Corporate events'],
  ['f1-zandvoort-race-car-corner.jpg', 'Formula 1 car taking a corner at the Dutch Grand Prix in Zandvoort', '55% 55%', 'Sport'],
  ['portfolio/mysteryland-stage-sunset-fireworks.jpg', 'Mysteryland main stage at sunset with fireworks over the crowd', '50% 50%', 'Festivals'],
];

const title = 'Event Photographer Amsterdam | Martin Hols';
const description = 'Event photographer in Amsterdam for conferences, company events, festivals and sport. Edited photos during the event, the rest within 24 hours. Fixed prices, usage rights included.';

export const page = {
  path: '/event-photographer-amsterdam',
  title,
  description,
  ogImage: 'portfolio/corporate-event-circular-auditorium.jpg',
  jsonld: [
    {
      '@context': 'https://schema.org', '@type': 'ProfessionalService', '@id': `${SITE.url}/#business`, name: SITE.name,
      url: SITE.url, telephone: SITE.phone, email: SITE.email,
      description: 'Event and festival photographer in Amsterdam and the Netherlands.',
      areaServed: [{ '@type': 'City', name: 'Amsterdam' }, { '@type': 'Country', name: 'Netherlands' }],
      priceRange: '€650 - €1,350',
    },
    {
      '@context': 'https://schema.org', '@type': 'Service', name: 'Event photography in Amsterdam', serviceType: 'Event photography',
      provider: { '@id': `${SITE.url}/#business` }, areaServed: { '@type': 'City', name: 'Amsterdam' }, url,
      offers: [
        { '@type': 'Offer', name: 'Corporate event, 4 hours', price: '650', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Corporate event, 8 hours', price: '1150', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Festival or sport event, per day', price: '850', priceCurrency: 'EUR' },
        { '@type': 'Offer', name: 'Show or concert', price: '650', priceCurrency: 'EUR' },
      ],
    },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQ.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url + '/' }, { '@type': 'ListItem', position: 2, name: 'Event photographer Amsterdam', item: url }] },
  ],
  body: `
  <header class="panel ahero" id="main">
    ${header('')}
    <div class="ah-l">
      <div>
        <div class="eyebrows"><p class="t-eyebrow acc">Amsterdam</p><i></i><p class="t-eyebrow dim">Event photography</p></div>
        <h1>Event photographer in Amsterdam.</h1>
        <div class="ans"><p class="t-eyebrow acc">Short answer</p><p>I photograph conferences, company events, festivals and sport in Amsterdam. Fully edited images during the event, the rest within 24 hours. Prices from €650, usage rights included.</p></div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:28px">
          <a class="btn btn-p" href="/contact#quote-form" data-cta="amsterdam-quote">Request a quote <span class="ic">${ARROW16}</span></a>
          <a class="btn btn-o" href="tel:${SITE.phone}" data-cta="amsterdam-call">Call ${SITE.phoneText}</a>
        </div>
      </div>
    </div>
    <figure class="ah-r">${img('portfolio/corporate-event-circular-auditorium.jpg', 'Corporate event in a circular auditorium under a truss ceiling', { priority: true, style: 'object-position:50% 45%' })}<figcaption>Corporate event, shot for the organiser and the brand</figcaption></figure>
  </header>

  <section class="cream art-w" data-theme="cream">
    <aside class="art-s">
      <dl class="pf">
        <div><dt class="t-eyebrow dim">Experience</dt><dd>2,132 events in 10+ years</dd></div>
        <div><dt class="t-eyebrow dim">Award</dt><dd>${esc(SITE.award)}</dd></div>
        <div><dt class="t-eyebrow dim">Clients</dt><dd>Albert Heijn, Tomorrowland, MOJO, Gall &amp; Gall, Formula 1</dd></div>
        <div><dt class="t-eyebrow dim">Based in</dt><dd>Hilversum, 30 minutes from Amsterdam</dd></div>
        <div><dt class="t-eyebrow dim">Delivery</dt><dd>Edited during the event, full set in 24 hours</dd></div>
      </dl>
      <div class="cta" data-theme="dark"><p class="t-eyebrow acc">Planning an event in Amsterdam?</p><p class="h">Send me the date and the location.</p><a class="btn btn-p" href="/contact#quote-form" data-cta="amsterdam-side">Request a quote</a></div>
    </aside>
    <article class="art">
      <section id="why"><h2>An event photographer you can rely on.</h2>
        <p>Organisers in Amsterdam choose me for one reason: it goes right. I have photographed 2,132 events in more than ten years, for brands like Albert Heijn, Tomorrowland and Formula 1. Many of them book me again, year after year. I arrive prepared, I read your briefing and I know where to stand before the moment happens.</p>
        <p>I am the photographer behind <a href="/portfolio">the portfolio</a>, and the winner of the ${esc(SITE.award)}. You get one person to talk to, from first email to final delivery.</p>
      </section>

      <section id="events"><h2>What I photograph in Amsterdam.</h2>
        <ul class="ck">${types.map(([t, d]) => `<li>${CHECK}<span><b>${t}.</b> ${d}</span></li>`).join('')}</ul>
        <p>See the work per type: <a href="/portfolio/corporate">corporate</a>, <a href="/portfolio/festivals">festivals</a>, <a href="/portfolio/sport">sport</a> and <a href="/portfolio/shows-music">shows and music</a>.</p>
      </section>

      <section id="work"><h2>A look at the work.</h2>
        <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px">${frames.map(([f, a, p, c]) => `<figure class="af" style="margin:0">${img(f, a, { style: `object-position:${p};height:260px` })}<figcaption>${c}</figcaption></figure>`).join('')}</div>
      </section>

      <section id="included"><h2>What is included.</h2>
        <div class="cks"><p class="t-eyebrow acc">Always in the price</p><ul class="ck">${incl.map((t) => `<li>${CHECK}<span>${t}</span></li>`).join('')}</ul></div>
      </section>

      <section id="prices"><h2>Prices for an event photographer in Amsterdam.</h2>
        <p>Clear rates, so you can plan your budget. VAT and travel costs are extra. Travel is €0.35 per km from Hilversum, which keeps Amsterdam affordable.</p>
        <table class="pt"><thead><tr><th>Type of event</th><th>Price</th></tr></thead><tbody>
          <tr><td>Corporate, 4 hours</td><td>€650</td></tr>
          <tr><td>Corporate, 6 hours</td><td>€900</td></tr>
          <tr><td>Corporate, 8 hours</td><td>€1,150</td></tr>
          <tr><td>Corporate, full day (up to 12 hours)</td><td>€1,350</td></tr>
          <tr><td>Festival or sport event, per day</td><td>€850</td></tr>
          <tr><td>Show or concert</td><td>€650</td></tr>
        </tbody></table>
        <p>More detail in <a href="/blog/what-does-an-event-photographer-cost">what an event photographer costs</a>.</p>
      </section>

      <section id="how"><h2>How it works.</h2>
        <ol class="ck" style="list-style:none;padding:0">${steps.map(([t, d], i) => `<li><span class="t-eyebrow acc" style="min-width:28px">0${i + 1}</span><span><b>${t}.</b> ${d}</span></li>`).join('')}</ol>
        <p>Not sure what to put in the briefing? Read <a href="/blog/how-to-brief-a-festival-photographer">how to brief an event photographer</a>.</p>
      </section>

      <section id="choose"><h2>Choosing a photographer in Amsterdam.</h2>
        <p>There are many event photographers in Amsterdam. Compare them on style, experience with your type of event, what is included and how fast you get the photos. My guide has the <a href="/blog/how-to-choose-an-event-photographer">9 questions to ask every photographer</a>.</p>
      </section>

      <section id="faq"><h2>Questions, answered.</h2>
        <div class="faq">${FAQ.map(([q, a]) => `<details class="qa"><summary><h3>${esc(q)}</h3><span class="pl" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></span></summary><p>${esc(a)}</p></details>`).join('')}</div>
      </section>
    </article>
  </section>

  ${contactSection('portfolio/mysteryland-stage-sunset-fireworks.jpg')}
  ${footer()}`,
};
