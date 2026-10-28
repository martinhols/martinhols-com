// Bouwt de statische site naar dist/. Geen dependencies nodig.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from './src/layout.mjs';
import { SITE } from './src/site.mjs';
import { audit } from './src/audit.mjs';
import { prepareData, dbSeo } from './src/data.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });

// css + js
const css = fs.readFileSync(path.join(root, 'src/css/tokens.css'), 'utf8') + '\n' + fs.readFileSync(path.join(root, 'src/css/site.css'), 'utf8');
fs.writeFileSync(path.join(dist, 'assets/site.css'), css);
fs.writeFileSync(path.join(dist, 'assets/tokens.css'), fs.readFileSync(path.join(root, 'src/css/tokens.css'), 'utf8'));
fs.copyFileSync(path.join(root, 'src/js/site.js'), path.join(dist, 'assets/site.js'));

// afbeeldingen
fs.cpSync(path.join(root, 'src/img'), path.join(dist, 'img'), { recursive: true });
fs.rmSync(path.join(dist, 'img/sizes.json'), { force: true });
if (fs.existsSync(path.join(root, 'public'))) fs.cpSync(path.join(root, 'public'), dist, { recursive: true });

await prepareData(dist);

// pagina's: elke src/pages/*.mjs exporteert `page`
const pages = [];
const seoList = [];
const SEO_FILE = JSON.parse(fs.readFileSync(path.join(root, 'src/seo.json'), 'utf8'));
for (const f of fs.readdirSync(path.join(root, 'src/pages')).filter((x) => x.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(path.join(root, 'src/pages', f)).href);
  for (const p of mod.pages || [mod.page]) {
    // SEO: voorzet uit src/seo.json, daarna aanpassingen uit de admin (tabel seo_pages) die winnen.
    const base = { title: p.title, description: p.description, noindex: !!p.noindex };
    Object.assign(p, SEO_FILE[p.path] || {});
    const dflt = { title: p.title, description: p.description, noindex: !!p.noindex };
    const ov = dbSeo.find((x) => x.path === p.path);
    if (ov) { if (ov.title) p.title = ov.title; if (ov.description) p.description = ov.description; if (ov.og_title) p.ogTitle = ov.og_title; if (ov.og_description) p.ogDescription = ov.og_description; if (ov.noindex !== null && ov.noindex !== undefined) p.noindex = ov.noindex; }
    seoList.push({ path: p.path, title: p.title, description: p.description, ogTitle: p.ogTitle || '', ogDescription: p.ogDescription || '', noindex: !!p.noindex, def: dflt, orig: base });
    const out = p.path === '/404' ? '404.html' : p.path === '/' ? 'index.html' : p.path.replace(/^\//, '') + '/index.html';
    fs.mkdirSync(path.dirname(path.join(dist, out)), { recursive: true });
    fs.writeFileSync(path.join(dist, out), layout(p));
    pages.push(p);
  }
}

fs.writeFileSync(path.join(dist, 'seo-pages.json'), JSON.stringify(seoList.filter((x) => x.path !== '/404')));

// SEO-controle (voor mensen en agents): dist/seo-audit.json
{
  const a = audit(dist, seoList.filter((x) => x.path !== '/404'), SITE.url);
  fs.writeFileSync(path.join(dist, 'seo-audit.json'), JSON.stringify(a));
  console.log(`[seo] ${a.summary.pages} pagina's gecontroleerd: ${a.summary.high} hoog, ${a.summary.medium} middel, ${a.summary.low} laag`);
  for (const pg of a.pages) for (const i of pg.issues.filter((x) => x.severity === 'high')) console.log(`[seo]   ${pg.path}: ${i.message}`);
}

// sitemap + robots
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE.url}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n') + `\n</urlset>\n`);
const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot'];
fs.writeFileSync(path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /seo-audit.json\nDisallow: /seo-pages.json\n\n` + bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n') + `\nSitemap: ${SITE.url}/sitemap.xml\n`);

// llms.txt: korte gids voor AI-systemen. Pagina's komen automatisch uit de build, dus nieuwe pagina's staan er vanzelf in.
const live = pages.filter((p) => !p.noindex && p.path !== '/404' && p.path !== '/admin');
const group = (re) => live.filter((p) => re.test(p.path));
const line = (p) => `- [${(p.title || p.path).replace(/\s*\|\s*Martin Hols.*$/, '')}](${SITE.url}${p.path === '/' ? '/' : p.path}): ${(p.description || '').replace(/\s+/g, ' ')}`;
const used = new Set();
const sect = (name, list) => { const l = list.filter((p) => !used.has(p.path)); l.forEach((p) => used.add(p.path)); return l.length ? `## ${name}\n${l.map(line).join('\n')}\n` : ''; };
fs.writeFileSync(path.join(dist, 'llms.txt'),
  `# Martin Hols\n\n> Martin Hols is an award-winning event and festival photographer based in Hilversum, the Netherlands, working worldwide. ${SITE.events} events in ${SITE.years} years, winner of the ${SITE.award}. Clients include Albert Heijn, Tomorrowland, MOJO, Gall & Gall and Formula 1. Edited photos are delivered during the event and the rest of the set within 24 hours. Part of The Arrows (${SITE.arrows}).\n\n` +
  `## Services and rates\nFestivals and sport: EUR 850 per day. Shows and concerts: EUR 650 per show. Corporate events and conferences: EUR 650 for 4 hours, EUR 900 for 6 hours, EUR 1,150 for 8 hours, EUR 1,350 for a full day (up to 12 hours), EUR 125 per extra hour. All usage rights are included. VAT and travel costs (EUR 0.35 per km from Hilversum) are extra.\n\n` +
  sect('Main pages', live.filter((p) => ['/', '/about', '/contact', '/projects', '/portfolio'].includes(p.path))) + '\n' +
  sect('Portfolio categories', group(/^\/portfolio\//)) + '\n' +
  sect('Landing pages', live.filter((p) => !used.has(p.path) && /^\/event-photographer/.test(p.path))) + '\n' +
  sect('Blog', group(/^\/blog\//)) + '\n' +
  sect('Projects', group(/^\/projects\//)) + '\n' +
  `## Contact\nEmail ${SITE.email}, phone ${SITE.phoneText}. Request a quote: ${SITE.url}/contact\n`);

console.log(`Built ${pages.length} page(s) → dist/`);
