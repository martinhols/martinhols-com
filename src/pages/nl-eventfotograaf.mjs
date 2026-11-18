import { landing } from '../landing.mjs';

// Nederlandse hoofdpagina voor "eventfotograaf". Tekst: zie het conceptdocument in het project (feitencheck door Martin op 2026-11-18).
export const page = landing({
  lang: 'nl', key: 'nl-eventfotograaf', path: '/nl/eventfotograaf', crumb: 'Eventfotograaf',
  title: 'Eventfotograaf Nederland | Martin Hols, 2.132 events',
  description: 'Eventfotograaf voor festivals, congressen en zakelijke events. 2.132 events in 10+ jaar, winnaar European Event Photography Award. Vraag een offerte.',
  alternates: [['nl-NL', '/nl/eventfotograaf'], ['en', '/event-photographer-netherlands'], ['x-default', '/event-photographer-netherlands']],
  cat: 'festivals', catName: 'Festivals', formType: '',
  hero: { file: 'tomorrowland-mainstage-fireworks.jpg', pos: '50% 50%', alt: 'Vuurwerk boven de mainstage van Tomorrowland' },
  eyebrow: 'Nederland', eyebrow2: 'Festivals, sport en zakelijke events',
  h1: 'Eventfotograaf voor festivals, sport en zakelijke events.',
  lead: '2.132 events in ruim tien jaar, van festivals en F1 tot conferenties. Winnaar van de European Event Photography Award.',
  sliderLabel: 'Geselecteerde eventfoto’s', viewLabel: 'Bekijk festivalfoto’s', allFramesLabel: 'Alle festivalfoto’s',
  galleryEyebrow: 'Portfolio', galleryTitle: 'Events, in beeld.',
  sectionsLabel: 'Over mijn werk als eventfotograaf',
  sections: [
    { eyebrow: 'Terugkerende opdrachtgevers', title: 'Waarom opdrachtgevers terugkomen', html: `
      <ul>
        <li><b>Albert Heijn:</b> 5 jaar achter elkaar</li>
        <li><b>Tomorrowland:</b> 4 jaar</li>
        <li><b>Formule 1:</b> 2 jaar</li>
        <li><b>Erkenning:</b> winnaar van de European Event Photography Award 2025</li>
      </ul>
      <p>Dat een organisator me een tweede, derde en vijfde keer vraagt, zegt voor mij meer dan een portfolio. Ik werk betrouwbaar, ook als het programma verandert en het licht tegenzit.</p>` },
    { eyebrow: 'Soorten events', title: 'Wat ik fotografeer', html: `
      <ul>
        <li><b>Festivals:</b> meerdere podia, dag en nacht, van de eerste act tot de laatste pyro-finale. Ik plan mijn positie op de showcues, zodat vuurwerk, vlammen en confetti op het juiste moment in beeld staan.</li>
        <li><b>Zakelijke events:</b> conferenties, awardshows en merkactivaties waar het beeld bij het merk moet passen.</li>
        <li><b>Sport en shows:</b> van een F1-weekend tot een stadionconcert, waar één moment alles is.</li>
      </ul>` },
    { eyebrow: 'Levering', title: 'Snel leveren', html: `
      <p>Direct na het event krijg je de belangrijkste beelden, zodat je team ze meteen kan gebruiken voor social en pers. De rest van de set volgt binnen 1 à 2 dagen, afhankelijk van hoe snel je ze nodig hebt.</p>` },
    { eyebrow: 'Kiezen', title: 'Waar je op kunt letten bij het kiezen van een eventfotograaf', html: `
      <ol>
        <li><b>Ervaring met jouw type event.</b> Vraag naar een complete reportage, niet alleen de beste tien foto’s.</li>
        <li><b>Consistentie.</b> Een goede eventfotograaf levert ook foto nummer 1.500 nog goed af.</li>
        <li><b>Levertijd.</b> Hoe snel zijn de eerste beelden bruikbaar?</li>
        <li><b>Beeldrechten.</b> Wat mag je met de foto’s doen, en voor hoe lang?</li>
        <li><b>Capaciteit.</b> Kan er een tweede fotograaf bij als het event groter wordt?</li>
      </ol>` },
  ],
  faqTitle: 'Eventfotograaf, veelgestelde vragen.',
  faq: [
    ['Wie is de beste eventfotograaf van Nederland?', 'Er is geen officiële ranglijst. Wel zijn er duidelijke maatstaven: ervaring met jouw type event, terugkerende opdrachtgevers, onafhankelijke erkenning en betrouwbare levering. Ik fotografeerde 2.132 events, won in 2025 de European Event Photography Award en werk al jaren voor dezelfde opdrachtgevers, zoals Albert Heijn en Tomorrowland.'],
    ['Wat kost een eventfotograaf?', 'Dat hangt af van het type event, de duur en de levering. Een festival, een sportdag en een zakelijk event hebben elk een eigen tarief. Vraag een offerte aan, dan krijg je een vaste prijs.', '/blog/what-does-an-event-photographer-cost', 'Lees het artikel over kosten (Engels).'],
    ['Hoe snel krijg ik de foto’s?', 'Direct na het event lever ik de belangrijkste beelden. De rest van de set volgt binnen 1 à 2 dagen, afhankelijk van hoe snel je ze nodig hebt.'],
    ['Fotografeer je ook zakelijke events en conferenties?', 'Ja. Ik fotografeer conferenties, awardshows en merkevents, onder meer voor Albert Heijn.', '/projects/albert-heijn-conference', 'Bekijk het Albert Heijn-project.'],
    ['Kun je meer fotografen inzetten bij een groot event?', 'Ja. Heeft je event meerdere podia of locaties, dan zet ik extra fotografen in zodat alles gedekt is.'],
    ['In welke regio werk je?', 'Ik werk door heel Nederland en daarbuiten. Reiskosten reken ik per kilometer vanaf Hilversum.'],
    ['Hoe bereid ik mijn event voor met een eventfotograaf?', 'Een korte, schriftelijke briefing helpt het meest.', '/blog/how-to-brief-a-festival-photographer', 'Lees de briefing-gids (Engels).'],
  ],
  aboutTitle: '2.132 events in ruim tien jaar.',
  aboutText: 'Ik ben Martin Hols, eventfotograaf in Nederland. In ruim tien jaar fotografeerde ik 2.132 events, van Tomorrowland en Pinkpop tot de Dutch Grand Prix en conferenties voor Albert Heijn. Mijn werk bestaat uit het vastleggen van wat er echt gebeurt, op het moment dat het gebeurt.',
  serviceName: 'Eventfotografie in Nederland', serviceType: 'Eventfotografie',
  areaServed: [{ '@type': 'Country', name: 'Nederland' }],
  person: { jobTitle: 'Eventfotograaf', knowsAbout: ['eventfotografie', 'festivalfotografie', 'zakelijke eventfotografie', 'sportfotografie', 'pyro en special effects fotografie'] },
});
