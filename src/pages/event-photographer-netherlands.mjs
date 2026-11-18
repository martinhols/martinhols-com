import { landing } from '../landing.mjs';

// Engelse tegenhanger van /nl/eventfotograaf (hreflang-paar). Zelfde feiten, zelfde volgorde.
export const page = landing({
  lang: 'en', key: 'nl-main', path: '/event-photographer-netherlands', crumb: 'Event photographer Netherlands',
  title: 'Event Photographer Netherlands | Martin Hols, 2,132 Events',
  description: 'Event photographer for festivals, conferences and corporate events in the Netherlands. 2,132 events, European Event Photography Award winner. Request a quote.',
  alternates: [['nl-NL', '/nl/eventfotograaf'], ['en', '/event-photographer-netherlands'], ['x-default', '/event-photographer-netherlands']],
  cat: 'festivals', catName: 'Festivals', formType: '',
  hero: { file: 'tomorrowland-mainstage-fireworks.jpg', pos: '50% 50%', alt: 'Fireworks above the Tomorrowland mainstage' },
  eyebrow: 'The Netherlands', eyebrow2: 'Festivals, sport and corporate events',
  h1: 'Event photographer for festivals, sport and corporate events.',
  lead: '2,132 events in more than ten years, from festivals and F1 to conferences. Winner of the European Event Photography Award.',
  sliderLabel: 'Selected event photos', viewLabel: 'View festival photos', allFramesLabel: 'All festival frames',
  galleryEyebrow: 'Portfolio', galleryTitle: 'Events, in frames.',
  sectionsLabel: 'About my work as an event photographer',
  sections: [
    { eyebrow: 'Returning clients', title: 'Why clients come back', html: `
      <ul>
        <li><b>Albert Heijn:</b> 5 years in a row</li>
        <li><b>Tomorrowland:</b> 4 years</li>
        <li><b>Formula 1:</b> 2 years</li>
        <li><b>Recognition:</b> winner of the European Event Photography Award 2025</li>
      </ul>
      <p>When an organiser asks me back a second, third and fifth time, that tells me more than any portfolio. I stay reliable when the programme changes and the light is against me.</p>` },
    { eyebrow: 'Types of events', title: 'What I photograph', html: `
      <ul>
        <li><b>Festivals:</b> multiple stages, day and night, from the first act to the last pyro finale. I plan my position around the show cues, so fireworks, flames and confetti land in the frame at exactly the right moment.</li>
        <li><b>Corporate events:</b> conferences, award shows and brand activations where the images have to fit the brand.</li>
        <li><b>Sport and shows:</b> from an F1 weekend to a stadium concert, where a single moment is everything.</li>
      </ul>` },
    { eyebrow: 'Delivery', title: 'Fast delivery', html: `
      <p>Right after the event you get the most important images, so your team can use them straight away for social and press. The rest of the set follows within 1 to 2 days, depending on how soon you need it.</p>` },
    { eyebrow: 'Choosing', title: 'What to look for when choosing an event photographer', html: `
      <ol>
        <li><b>Experience with your type of event.</b> Ask for a complete report, not just the best ten photos.</li>
        <li><b>Consistency.</b> A good event photographer still delivers photo number 1,500 at the same standard.</li>
        <li><b>Turnaround.</b> How soon are the first images usable?</li>
        <li><b>Usage rights.</b> What can you do with the photos, and for how long?</li>
        <li><b>Capacity.</b> Can a second photographer join if the event grows?</li>
      </ol>` },
  ],
  faqTitle: 'Event photographer in the Netherlands, answered.',
  faq: [
    ['Who is the best event photographer in the Netherlands?', 'There is no official ranking. There are clear yardsticks, though: experience with your type of event, returning clients, independent recognition and reliable delivery. I have photographed 2,132 events, won the European Event Photography Award in 2025 and work for the same clients year after year, such as Albert Heijn and Tomorrowland.'],
    ['What does an event photographer cost?', 'It depends on the type of event, the duration and the delivery. A festival, a sports day and a corporate event each have their own rate. Request a quote and you get a fixed price.', '/blog/what-does-an-event-photographer-cost', 'Read what an event photographer costs.'],
    ['How fast do I get the photos?', 'Right after the event I deliver the most important images. The rest of the set follows within 1 to 2 days, depending on how soon you need it.'],
    ['Do you photograph corporate events and conferences?', 'Yes. I photograph conferences, award shows and brand events, including for Albert Heijn.', '/projects/albert-heijn-conference', 'See the Albert Heijn project.'],
    ['Can you bring more photographers to a large event?', 'Yes. If your event has multiple stages or locations, I bring in extra photographers so everything is covered.'],
    ['Where do you work?', 'I work throughout the Netherlands and abroad. Travel costs are charged per kilometre from Hilversum.'],
    ['How do I prepare my event with an event photographer?', 'A short, written briefing helps most.', '/blog/how-to-brief-a-festival-photographer', 'Read the briefing guide.'],
  ],
  aboutTitle: '2,132 events in more than ten years.',
  aboutText: 'I am Martin Hols, an event photographer in the Netherlands. In more than ten years I photographed 2,132 events, from Tomorrowland and Pinkpop to the Dutch Grand Prix and conferences for Albert Heijn. My work is capturing what really happens, at the moment it happens.',
  serviceName: 'Event photography in the Netherlands', serviceType: 'Event photography',
  areaServed: [{ '@type': 'Country', name: 'Netherlands' }],
  person: { jobTitle: 'Event photographer', knowsAbout: ['event photography', 'festival photography', 'corporate event photography', 'sports photography', 'pyro and special effects photography'] },
});
