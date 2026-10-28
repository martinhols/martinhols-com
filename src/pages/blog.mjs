import { SITE } from '../site.mjs';
import { dbPosts, textToHtml } from '../data.mjs';
import { esc, img, header, contactSection, footer, ARROW, ARROW16 } from '../layout.mjs';

const CHECK = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"></path></svg>';
const AUTHOR = 'Martin Hols is an event photographer from the Netherlands. He has shot 2,132 events in more than ten years and won the European Event Photography Award.';

const STATIC_POSTS = [
  {
    slug: 'how-to-choose-an-event-photographer', type: 'guide', tag: 'Guide',
    title: 'How to choose an event photographer: 9 questions to ask before you book.',
    desc: 'How to choose an event photographer: check style, real experience (also on Instagram), the type of event, references, price, terms, delivery time and backup. 9 questions to ask.',
    teaser: 'You don’t have to book me. Here are the nine questions that help you pick the right event photographer for your event.',
    short: 'Pick the photographer whose style matches what you want, who can show real experience, whose price and terms are clear, and who delivers when you need the images.',
    file: 'tomorrowland-stage-night.jpg', pos: '50% 50%', alt: 'Tomorrowland main stage at night with lights and crowd', cap: 'Tomorrowland · main stage at night',
    card: 'tomorrowland-stage-night.jpg', cardAlt: 'Tomorrowland main stage at night',
    toc: [['style', '1. Does the style match?'], ['experience', '2. How much real experience?'], ['type', '3. Are they a specialist in your field?'], ['instagram', '4. What does Instagram show?'], ['references', '5. Do clients come back?'], ['price', '6. What does the price tell you?'], ['terms', '7. What are the terms?'], ['delivery', '8. When do you get the images?'], ['backup', '9. What if something goes wrong?']],
    body: `
      <section><h2>Choose the right one, even if it isn’t me.</h2>
        <p>The best photographer is the one who fits your event, not the one with the nicest website. These are the nine questions I would ask if I were booking a photographer myself.</p>
      </section>
      <section id="style"><h2>1. Does the portfolio match the style you want?</h2>
        <p>Look at the pictures and ask yourself: is this what I want my event to look like? A good photographer has a recognisable style, and you are booking that style. It is not normal to ask a photographer to work in a way that is far from their own. If you want dark, dramatic stage photography and the portfolio is full of bright lifestyle shots, keep looking.</p>
        <figure class="af">${img('portfolio/tomorrowland-stage-laser-beams.jpg', 'Tomorrowland stage with laser beams cutting through the night', { style: 'object-position:50% 50%' })}<figcaption>Dark, dramatic stage photography is a style of its own</figcaption></figure>
      </section>
      <section id="experience"><h2>2. How much real experience do they have?</h2>
        <p>A website with a handful of strong images can hide a lot of luck. Experience cannot be bought: it shows in how many events someone has shot, at what size and how often clients come back. Ask which events they have photographed that look like yours, and for how many years.</p>
      </section>
      <section id="type"><h2>3. Are they a specialist in your type of event?</h2>
        <p>Not every event is the same job. A festival means dark stages, moving light, crowds and weather. A conference is about speakers, people and a clean look in a room. Sport is about speed and anticipation. No photographer can do every kind of photography equally well, so look for a specialist in your field. Ask for examples from events that look like yours.</p>
        <figure class="af">${img('portfolio/handball-match-arena-crowd.jpg', 'Handball match in a full arena with a crowd', { style: 'object-position:50% 50%' })}<figcaption>Sport: speed and anticipation</figcaption></figure>
        <figure class="af">${img('portfolio/corporate-event-circular-auditorium.jpg', 'Corporate event in a circular auditorium', { style: 'object-position:50% 50%' })}<figcaption>Corporate: people, speakers and a clean room</figcaption></figure>
      </section>
      <section id="instagram"><h2>4. What does their Instagram show?</h2>
        <p>Photographers are famous for not updating their website. Instagram is usually where the recent work is. Scroll back through the last months: do you see steady work at real events, or only a few good posts? A feed that is active and varied is a good sign.</p>
      </section>
      <section id="references"><h2>5. Do clients come back?</h2>
        <p>A client who books the same photographer year after year is the best proof there is. Ask which clients return, and whether you can speak to one of them or read their feedback. Reliable photographers have no problem with that question.</p>
      </section>
      <section id="price"><h2>6. What does the price tell you?</h2>
        <p>Photographers are often told to charge high rates because cameras and lenses are expensive. But an expensive photographer is not automatically a good one. And with a cheap photographer, ask extra questions about what is included. Compare quotes on what you get, not on the number alone. On my <a href="/blog/what-does-an-event-photographer-cost">cost page</a> you can see how I price different types of event.</p>
        <div class="cks"><p class="t-eyebrow acc">Ask every photographer</p><ul class="ck">${['What exactly is included in the price?', 'Is editing included?', 'Are VAT, travel and other costs on top?', 'How many final images will I get?'].map((t) => `<li>${CHECK}<span>${t}</span></li>`).join('')}</ul></div>
      </section>
      <section id="terms"><h2>7. What are the terms and usage rights?</h2>
        <p>Ask in writing what you may do with the images: social media, press, website, campaigns. Some photographers charge extra for every use. Also check the payment, deposit and cancellation terms before you sign anything.</p>
      </section>
      <section id="delivery"><h2>8. When do you get the images?</h2>
        <p>For events, speed matters. Your social team wants images during or right after the event, and sponsors and press want the full set the next day. Many photographers deliver weeks later. Ask when you will get the first images and the final set, and compare that with when you need them. See also how to <a href="/blog/how-to-brief-a-festival-photographer">brief a festival photographer</a> so delivery is agreed up front.</p>
        <figure class="af">${img('portfolio/f1-podium-driver-waving-trophies.jpg', 'Formula 1 driver waving two trophies on the podium', { style: 'object-position:50% 50%' })}<figcaption>Some moments need to be online within minutes</figcaption></figure>
      </section>
      <section id="backup"><h2>9. What if something goes wrong?</h2>
        <p>Cameras fail and people get sick. Ask whether the photographer works with backup gear and who steps in if they cannot make it. A professional has an answer ready.</p>
      </section>
      <section id="checklist"><div class="cks"><p class="t-eyebrow acc">Checklist · ask every photographer</p><ul class="ck">${['Does your style match what I want for this event?', 'How many events have you shot, and for how many years?', 'Are you a specialist in my type of event? Can I see examples?', 'Can I see your recent work on Instagram?', 'Which clients come back, and can I speak to one?', 'What exactly is included in the price, and what is not?', 'What are the terms, usage rights, deposit and cancellation?', 'When do I get the first images and the final set?', 'What is your backup plan for gear and for illness?'].map((t) => `<li>${CHECK}<span>${t}</span></li>`).join('')}</ul></div></section>`,
    faq: [['How do I choose an event photographer?', 'Check that the portfolio matches the style you want, look at real experience on both the website and Instagram, compare price and what is included, and agree on usage rights and delivery time.'], ['Is a cheaper event photographer a bad choice?', 'Not necessarily, but ask exactly what is included: editing, usage rights, number of images, delivery time and extra costs.'], ['How quickly should an event photographer deliver?', 'It depends on what you need. For events, ask for the first images within 24 hours so your team can start posting right away.']],
  },
  {
    slug: 'what-does-an-event-photographer-cost', type: 'guide', tag: 'Guide',
    title: 'What does an event photographer cost?',
    desc: 'What an event photographer costs in the Netherlands: rates per event type, from €650 for a show to €1,350 for a corporate day, with editing, delivery and usage rights included.',
    teaser: 'Prices differ per type of event. Here are my real rates for corporate events, festivals, sport, and shows, and what is included.',
    short: 'My rates start at €650 (excl. VAT) for a show or a 4-hour event, a festival or sport day is €850 and a full corporate day is €1,350. Editing, delivery within 24 hours and all usage rights are included.',
    file: 'portfolio/mysteryland-sunset-stone-hand-stage.jpg', pos: '50% 45%', alt: 'Mysteryland main stage at sunset, a giant stone hand holding the DJ booth, red smoke and light beams over the crowd', cap: 'Mysteryland 2025 · main stage at sunset',
    card: 'portfolio/mysteryland-stage-sunset-fireworks.jpg', cardAlt: 'Festival main stage at sunset with fireworks',
    toc: [['why', 'Why prices differ per event'], ['events', 'Corporate events'], ['festivals', 'Festivals and sport'], ['shows', 'Shows and music'], ['included', 'What is included'], ['overview', 'All prices at a glance']],
    body: `
      <section id="why"><h2>Why prices differ per event.</h2>
        <p>There is no single price for an event photographer, because events are very different jobs. A conference is a few hours in one room with a fixed programme. A festival is a long day across several stages, in weather, with crowds and moving light. A show is one performance where timing and light decide everything.</p>
        <p>So I use different tariffs per type of event. All prices below are excluding VAT, and apply from 1 October 2026.</p>
      </section>
      <section id="events"><h2>Corporate events.</h2>
        <p>For conferences, company parties and trade shows I charge by the hour block. You pay for the time I am on site, and that is clear up front.</p>
        <div class="cks"><p class="t-eyebrow acc">Standard rates</p><ul class="ck">${['4 hours: €650', '6 hours: €900', '8 hours: €1,150', 'Full day (up to 12 hours): €1,350', 'Every extra hour after 12 hours: €125'].map((t) => `<li>${CHECK}<span>${t}</span></li>`).join('')}</ul></div>
        <p>Hours are rounded up to the next even block, so a 5-hour event is priced as 6 hours.</p>
        <figure class="af">${img('portfolio/corporate-event-circular-auditorium.jpg', 'Corporate event in a circular auditorium with the audience seated around the stage', { style: 'object-position:50% 50%' })}<figcaption>Corporate event · priced by the hour block</figcaption></figure>
      </section>
      <section id="festivals"><h2>Festivals and sport events.</h2>
        <p>Festivals and sport events are priced per day: <b>€850 per day</b>. These days are long, the ground is rough and the light changes every hour, so I work with a day rate instead of counting hours. For multi-day festivals or several photographers, <a href="/contact">get in touch</a> and I will make a quote.</p>
        <figure class="af">${img('portfolio/festival-pink-canopy-stage-crowd.jpg', 'Festival stage under a pink canopy with a crowd in front', { style: 'object-position:50% 50%' })}<figcaption>Festival · priced per day</figcaption></figure>
        <figure class="af">${img('portfolio/handball-match-arena-crowd.jpg', 'Handball match in a full arena', { style: 'object-position:50% 50%' })}<figcaption>Sport · also priced per day</figcaption></figure>
      </section>
      <section id="shows"><h2>Shows and music.</h2>
        <p>For a concert, a show or a music performance the price is a fixed <b>€650 per show</b>. You know the cost before the doors open, no matter how the evening runs.</p>
        <figure class="af">${img('portfolio/guitarist-live-show-blue-light.jpg', 'Guitarist on stage in blue light during a live show', { style: 'object-position:50% 50%' })}<figcaption>Live show · one fixed price per show</figcaption></figure>
      </section>
      <section id="included"><h2>What is included.</h2>
        <p>Every price includes editing, delivery of the final images within 24 hours and all usage rights, so you can use the images wherever you need them. VAT, travel costs (€0.35 per kilometre from Hilversum) and any other costs are charged on top.</p>
        <p>The cheapest option is not always the best one. If you are still choosing, read my guide on how to <a href="/blog/how-to-brief-a-festival-photographer">brief a festival photographer</a>, and send me the date and the type of event for a fixed quote.</p>
      </section>
      <section id="overview"><h2>All prices at a glance.</h2>
        <table class="pt"><thead><tr><th>Type of event</th><th>Price, excl. VAT</th></tr></thead><tbody>
          <tr><td>Corporate event, 4 hours</td><td>€650</td></tr>
          <tr><td>Corporate event, 6 hours</td><td>€900</td></tr>
          <tr><td>Corporate event, 8 hours</td><td>€1,150</td></tr>
          <tr><td>Corporate event, full day (up to 12 hours)</td><td>€1,350</td></tr>
          <tr><td>Corporate event, each extra hour after 12 hours</td><td>€125</td></tr>
          <tr><td>Festival, per day</td><td>€850</td></tr>
          <tr><td>Sport event, per day</td><td>€850</td></tr>
          <tr><td>Show or music performance, per show</td><td>€650</td></tr>
        </tbody></table>
        <p>Every price includes editing, delivery within 24 hours and all usage rights. VAT, travel (€0.35 per kilometre from Hilversum) and any other costs are extra.</p>
      </section>
      <section id="checklist"><div class="cks"><p class="t-eyebrow acc">Checklist · send this for a fixed quote</p><ul class="ck">${['Type of event: corporate, festival, sport or show', 'Date, start and end time, and the location', 'Number of days, and whether you need more than one photographer', 'What the images are for: social, press, sponsors, campaign', 'When you need the first images and the final set', 'Whether VAT, travel and other costs are included in the quote'].map((t) => `<li>${CHECK}<span>${t}</span></li>`).join('')}</ul></div></section>`,
    faq: [['How much does an event photographer cost in the Netherlands?', 'With Martin Hols, a show costs €650, a festival or sport day €850 and a corporate event starts at €650 for 4 hours, up to €1,350 for a full day. All prices exclude VAT and travel.'], ['Why do prices differ per type of event?', 'Because the work differs: a festival or sport day is long and unpredictable, a show is a single performance, and a conference is a fixed number of hours. Each type has its own tariff.'], ['What is included in the price?', 'Editing, delivery of the final images within 24 hours and all usage rights. VAT, travel (€0.35 per kilometre from Hilversum) and other costs are extra.']],
  },
  {
    slug: 'how-to-brief-a-festival-photographer', type: 'guide', tag: 'Guide',
    title: 'How to brief a festival photographer.',
    desc: 'How to brief an event or festival photographer: send one written document with the schedule, special moments like pyro and confetti, contacts, call time and delivery.',
    teaser: 'The sooner the photographer knows what is going to happen, the sooner the experience kicks in. Here is what to put in the briefing.',
    short: 'Send one written briefing: what the event is about, the schedule, the special moments (pyro, SFX, confetti), contacts, call time and when you need the photos.',
    file: 'martin-at-work-1.jpg', pos: '50% 30%', alt: 'Martin Hols smiling behind his camera at an event, with an earpiece and a festival wristband', cap: 'On location · earpiece in, ready for the first cue',
    card: 'martin-at-work-1.jpg', cardAlt: 'Martin Hols with his camera at an event',
    toc: [['event', 'Tell what the event is about'], ['schedule', 'Share the schedule and special moments'], ['calltime', 'Set the call time'], ['contacts', 'List the key contacts'], ['musthave', 'Must-haves and nice-to-haves'], ['room', 'Leave room for the photographer'], ['look', 'Describe the look and feel'], ['edit', 'Give the photographer a place to edit'], ['food', 'Plan food and drinks'], ['delivery', 'Agree on delivery']],
    body: `
      <section><h2>Why the briefing matters.</h2>
        <p>The most important thing is that the photographer knows what is going to happen and what is expected of them. Once they know, experience kicks in and they can get to work. A good briefing is one written document, sent in advance, as a PDF or Word file. Everything below goes in it, and the more the photographer knows beforehand, the less has to be explained on the day, when everybody is busy.</p>
      </section>
      <section id="event"><h2>Tell what the event is about.</h2>
        <p>Explain what exactly is going to happen and what the event is about: who it is for, what the goal is and what the atmosphere should be. Information about the event helps the photographer form a picture before arriving, and make better choices on the day.</p>
      </section>
      <section id="schedule"><h2>Share the schedule and the special moments.</h2>
        <p>Give the full schedule with times, and mark the moments that matter: when SFX, fireworks or confetti are fired, when the headliner starts, when the speaker or the CEO takes the stage. If the photographer knows the time, they can be in the right place before it happens, instead of running after it.</p>
        <figure class="af">${img('portfolio/defqon1-stage-fireworks-light-beams.jpg', 'Defqon.1 stage with fireworks and light beams over the crowd', { style: 'object-position:50% 50%' })}<figcaption>Defqon.1 · a pyro cue is over in seconds. The time has to be in the briefing.</figcaption></figure>
      </section>
      <section id="calltime"><h2>Set the call time.</h2>
        <p>Tell the photographer what time to be there. As a rule of thumb: 30 minutes before the start for a corporate event, and about an hour before for music and festivals, so there is time for a walk-through of the site. For sports events and anything that needs accreditation, build the time for that into the planning, and mention it when you request the photographer.</p>
      </section>
      <section id="contacts"><h2>List the key contacts.</h2>
        <p>Add the names and phone numbers of the important partners on the event: the production lead, the stage or area manager, the artist or speaker liaison, and the person who arranges access. One contact on site who can solve problems is worth a lot.</p>
      </section>
      <section id="musthave"><h2>Must-haves and nice-to-haves.</h2>
        <p>Make two short lists. The must-haves are the shots you cannot do without: the sponsor activation, the headliner, the speaker. The nice-to-haves are everything you would be happy to get on top. The photographer knows then where to focus when time is short.</p>
      </section>
      <section id="room"><h2>Leave room for the photographer.</h2>
        <p>Don’t plan every minute. If you tell a photographer exactly what to do at every moment, you lose their creativity. Experienced photographers know how to use the rest of the time on things the client often doesn’t think of: the details, the atmosphere, the people, the shot that tells the story of the day.</p>
        <p>Also keep in mind that an event is a live situation, and not everything goes as planned. Schedules shift, acts start late, things happen that nobody expected. An experienced photographer makes something of it. And if something is a real must-have, give it time and information: the moment, the place and who is involved.</p>
      </section>
      <section id="look"><h2>Describe the look and feel.</h2>
        <p>If you really want to help, describe the look and feel you want: dark and dramatic, bright and natural, close to the people or wide and big. A few example photos work even better than words.</p>
      </section>
      <section id="edit"><h2>Give the photographer a place to edit.</h2>
        <p>Editing happens at quiet moments, or between sets, when nothing is happening. So the photographer needs a place for it: somewhere to sit, where their gear can be stored and is safe, and a power socket. Without that, fast delivery is not possible. A quiet corner backstage, a production office or a press room is often enough, as long as it is close to the action and the door can be closed. It also means the photographer does not have to carry everything around all day, and can work lighter and faster when the next moment comes.</p>
      </section>
      <section id="food"><h2>Plan when and where the photographer can eat and drink.</h2>
        <p>Think about it in advance: where can the photographer get food and something to drink, and when? An event day is long, often without a real break, and a photographer who is always on the move easily skips a meal. A well-fed photographer is a happy photographer, and one who can take on the whole world.</p>
        <p>Put it in the briefing: the time of the meal or break, the place, and whether there is a catering pass or wristband needed. Ask about dietary needs, so the meal is something they can actually eat. A short break planned during a quiet moment, between sets or before the main programme, costs you nothing and pays back in the quality of the photos at the end of the day.</p>
      </section>
      <section id="delivery"><h2>Agree on delivery.</h2>
        <p>Say when you want the photos. For most events the first photos are needed during the event, for social media. Put that in the briefing, together with who receives them, so the workflow on site is built around it. The full set follows later, within the agreed time.</p>
      </section>
      <section id="checklist"><div class="cks"><p class="t-eyebrow acc">Checklist · what goes in the briefing</p><ul class="ck">${['What the event is about, who it is for and what happens', 'The full schedule with times', 'Special moments: SFX, pyro, fireworks, confetti, headliners, speeches', 'Call time and the address, with accreditation arranged', 'Names and phone numbers of the key contacts on site', 'Must-have shots and nice-to-have shots', 'Look and feel, with example photos if you have them', 'Room for the photographer: only plan what is a real must-have, and give those moments time and information', 'A safe place to edit and store gear, with a power socket', 'When and where the photographer can eat and drink, and any dietary needs', 'When you need the first photos and the full set, and who gets them'].map((t) => `<li>${CHECK}<span>${t}</span></li>`).join('')}</ul></div></section>`,
    faq: [['Should I arrange food and drinks for the photographer?', 'Yes. Plan when and where the photographer can eat and drink, and ask about dietary needs. A well-fed photographer works better through a long event day.'], ['Should I plan every minute for the photographer?', 'No. Only plan the real must-haves, with time and information. Experienced photographers use the rest of the time for things you may not think of, and events never go exactly as planned.'], ['What should a briefing for an event photographer include?', 'What the event is about, the schedule, the special moments such as pyro, SFX and confetti, call time, key contacts, must-have and nice-to-have shots, look and feel, a place to edit, and when the photos are needed.'], ['How early should the photographer arrive?', 'About 30 minutes before the start of a corporate event and about an hour before a music event or festival. Sport events and events that need accreditation need extra time.'], ['In what format should I send the briefing?', 'One written document, as a PDF or Word file, sent well before the event.']],
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
const dbp = dbPosts.filter((d) => d.hero_url).map((d) => ({
  slug: d.slug, type: d.type, tag: d.type === 'story' ? 'Story' : 'Guide', title: d.title.endsWith('.') ? d.title : d.title + '.',
  desc: d.description || d.short_answer || d.title, teaser: d.short_answer || d.description || '', short: d.short_answer || d.description || '',
  file: d.hero_url, pos: '50% 50%', alt: d.title, cap: d.title, card: d.hero_url, cardAlt: d.title,
  body: textToHtml(d.body || ''), faq: (d.faq || []).filter((f) => f.q && f.a).map((f) => [f.q, f.a]), date: d.published_at,
}));
const dbSlugs = new Set(dbp.map((p) => p.slug));
const POSTS = [...dbp, ...STATIC_POSTS.filter((p) => !dbSlugs.has(p.slug))];
const words = (p) => p.body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
const mins = (p) => Math.max(2, Math.round(words(p) / 200));
const url = (p) => `/blog/${p.slug}`;
const count = (k) => (k === 'all' ? POSTS.length : POSTS.filter((p) => p.type === k).length);

const card = (p) => `<a class="bc" data-c="${p.type}" href="${url(p)}"><span class="im">${img(p.card, p.cardAlt, { thumb: true })}<span class="tg">${p.tag}</span></span><span class="tx"><span><span class="nm">${esc(p.title)}</span><span class="dt">${mins(p)} min read</span></span><span class="rb">${ARROW}</span></span></a>`;
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
      { '@context': 'https://schema.org', '@type': 'Article', '@id': `${SITE.url}${url(p)}#article`, headline: p.title.replace(/\.$/, ''), description: p.desc, url: SITE.url + url(p), inLanguage: 'en', image: `${SITE.url}/img/${p.file}`, wordCount: words(p), ...(p.date ? { datePublished: p.date } : {}), author: { '@id': `${SITE.url}/#martin` }, publisher: { '@id': `${SITE.url}/#martin` }, isPartOf: { '@id': `${SITE.url}/blog#blog` }, mainEntityOfPage: SITE.url + url(p) },
      ...(p.faq.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: p.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }] : []),
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
