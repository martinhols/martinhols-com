// Vaste gegevens van de site. Eén plek, zodat cijfers en namen overal gelijk zijn (GEO).
export const SUPABASE = { url: 'https://rpspddxsnedszscudfke.supabase.co', key: 'sb_publishable__p3yyQ_mtRIaa-MDEWG_CQ_vn0cEPVB' };

export const SITE = {
  url: 'https://www.martinhols.com',
  name: 'MartinHols.com',
  person: 'Martin Hols',
  email: 'martin@thearrows.nl',
  phone: '+31641148479',
  instagram: 'https://www.instagram.com/martin.hols',
  phoneText: '+31 6 4114 84 79',
  // Bedrijfsgegevens: vul in als ze bekend zijn; lege velden worden niet getoond.
  company: { kvk: '[KVK-nummer invullen]', vat: '[BTW-nummer invullen]', address: '[Adres invullen]' },
  arrows: 'https://www.thearrows.nl',
  turnstile: process.env.TURNSTILE_SITEKEY || '0x4AAAAAAFqzuD_1CxjlmZzI', // Cloudflare Turnstile site key (openbaar). Leeg = geen widget, server controleert dan ook niet.
  ga4: process.env.GA4_ID || 'G-SSSFVJS3PC', // Google Analytics 4 meet-ID (G-XXXXXXXXXX). Leeg = banner en meting uit.
  events: '2,132',
  years: '10+',
  award: 'European Event Photography Award',
  categories: [
    { slug: 'festivals', name: 'Festivals' },
    { slug: 'corporate', name: 'Corporate' },
    { slug: 'sport', name: 'Sport' },
    { slug: 'shows-music', name: 'Shows / Music' },
  ],
  nav: [
    { href: '/projects', label: 'Projects' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
};
