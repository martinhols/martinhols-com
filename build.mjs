// Bouwt de statische site naar dist/. Geen dependencies nodig.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from './src/layout.mjs';
import { SITE } from './src/site.mjs';
import { prepareData } from './src/data.mjs';

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
for (const f of fs.readdirSync(path.join(root, 'src/pages')).filter((x) => x.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(path.join(root, 'src/pages', f)).href);
  for (const p of mod.pages || [mod.page]) {
    const out = p.path === '/404' ? '404.html' : p.path === '/' ? 'index.html' : p.path.replace(/^\//, '') + '/index.html';
    fs.mkdirSync(path.dirname(path.join(dist, out)), { recursive: true });
    fs.writeFileSync(path.join(dist, out), layout(p));
    pages.push(p);
  }
}

// sitemap + robots
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.filter((p) => !p.noindex).map((p) => `  <url><loc>${SITE.url}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod></url>`).join('\n') + `\n</urlset>\n`);
const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'Bingbot'];
fs.writeFileSync(path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /admin\n\n` + bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n') + `\nSitemap: ${SITE.url}/sitemap.xml\n`);

console.log(`Built ${pages.length} page(s) → dist/`);
