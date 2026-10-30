// Haalt projecten, artikelen en foto's uit Supabase tijdens de build (niet per bezoeker)
// en zet de foto's op de site zelf. Lukt het ophalen niet, dan bouwt de site met de vaste inhoud.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { SUPABASE } from './site.mjs';

export let dbProjects = [], dbPosts = [], dbPhotos = [], dbSeo = [];
export const localMap = {}; // supabase-url -> { src, thumb, w, h }

async function get(table, order, onlyPublished = true) {
  try {
    if (process.env.DATA_FIXTURE) { const fx = JSON.parse(fs.readFileSync(process.env.DATA_FIXTURE, 'utf8')); return fx[table] || []; }
    const r = await fetch(`${SUPABASE.url}/rest/v1/${table}?select=*${onlyPublished ? '&published=eq.true' : ''}&order=${order}`, {
      headers: { apikey: SUPABASE.key, Authorization: `Bearer ${SUPABASE.key}` }, signal: AbortSignal.timeout(10000),
    });
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch (e) {
    console.warn(`[data] ${table} niet opgehaald (${e.message || e}); alleen vaste inhoud.`);
    return [];
  }
}

// Fotocache: elke Supabase-foto wordt maar één keer gedownload en daarna uit de cache gehaald.
// node_modules/.cache blijft op Vercel tussen builds bewaard (build cache) en lokaal ook.
// Upload-URL's zijn uniek (tijdstempel in de naam), dus een URL verandert nooit van inhoud.
const CACHE = path.join(process.cwd(), 'node_modules/.cache/img-db');
fs.mkdirSync(CACHE, { recursive: true });
const cacheKey = (url) => crypto.createHash('sha1').update(url).digest('hex');
const stats = { hit: 0, miss: 0 };

async function download(url, file) {
  const key = path.join(CACHE, cacheKey(url));
  if (fs.existsSync(key + '.missing')) throw new Error(`404 ${url} (cache)`);
  if (fs.existsSync(key)) { fs.copyFileSync(key, file); stats.hit++; return; }
  const r = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (r.status === 400 || r.status === 404) { fs.writeFileSync(key + '.missing', ''); throw new Error(`${r.status} ${url}`); }
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(key, buf);
  fs.writeFileSync(file, buf);
  stats.miss++;
}

// Kopieert alle gebruikte foto's naar dist/img/db en vult localMap.
async function localize(dist, urls, dims, names = {}) {
  const dir = path.join(dist, 'img/db');
  fs.mkdirSync(dir, { recursive: true });
  const queue = [...new Set(urls.filter((u) => /^https?:/.test(u) && !u.includes('martinhols-com.vercel.app')))];
  const used = new Set();
  const work = async () => {
    while (queue.length) {
      const url = queue.shift();
      let base = decodeURIComponent(url.split('/').pop().replace(/\.[^.]+$/, '')).replace(/^\d{10,}-/, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-');
      if (names[url]) base = names[url].replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || base;
      while (used.has(base)) base += '-x';
      used.add(base);
      try {
        await download(url, path.join(dir, base + '.jpg'));
        let thumb = `/img/db/${base}.jpg`;
        try { await download(url.replace(/\.jpg$/, '-s.jpg'), path.join(dir, base + '-s.jpg')); thumb = `/img/db/${base}-s.jpg`; } catch {}
        const [w, h] = dims[url] || [];
        const set = [];
        for (const wd of [640, 1280, 2400]) {
          try { await download(url.replace(/\.jpg$/, `-${wd}.webp`), path.join(dir, `${base}-${wd}.webp`)); set.push(`/img/db/${base}-${wd}.webp ${wd}w`); } catch {}
        }
        localMap[url] = { src: `/img/db/${base}.jpg`, thumb, w, h, srcset: set.length ? set.join(', ') : '' };
      } catch (e) { console.warn('[data] foto overgeslagen:', e.message); }
    }
  };
  await Promise.all(Array.from({ length: 6 }, work));
  console.log(`[data] ${Object.keys(localMap).length} foto's naar de site gekopieerd (${stats.hit} uit cache, ${stats.miss} van Supabase)`);
}

export async function prepareData(dist) {
  dbProjects = await get('projects', 'event_date.desc.nullslast,created_at.desc');
  dbPosts = await get('posts', 'published_at.desc.nullslast,created_at.desc');
  dbPhotos = await get('photos', 'created_at.asc', false);
  dbSeo = await get('seo_pages', 'path.asc', false);
  const pub = new Set(dbProjects.map((p) => p.id));
  dbPhotos = dbPhotos.filter((x) => x.portfolio || x.home_hero || x.cat_header || (x.project_id && pub.has(x.project_id)));
  const dims = Object.fromEntries(dbPhotos.map((x) => [x.url, [x.width, x.height]]));
  const urls = [...dbPhotos.map((x) => x.url), ...dbProjects.flatMap((p) => [p.hero_url, ...(p.gallery || [])]), ...dbPosts.map((p) => p.hero_url)].filter(Boolean);
  const names = Object.fromEntries(dbPhotos.filter((x) => x.file).map((x) => [x.url, x.file]));
  await localize(dist, urls, dims, names);
}

export const siteUrl = (u, thumb) => { const m = localMap[u]; return m ? (thumb ? m.thumb : m.src) : u; };

// Eenvoudige tekst → HTML: lege regel = alinea, "## " = kop, "- " = lijst.
export function textToHtml(t = '') {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return t.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).map((b) => {
    if (b.startsWith('## ')) return `</section><section><h2>${esc(b.slice(3))}</h2>`;
    if (/^- /m.test(b)) return `<ul class="ck">${b.split('\n').filter((l) => l.startsWith('- ')).map((l) => `<li><span>${esc(l.slice(2))}</span></li>`).join('')}</ul>`;
    return `<p>${esc(b)}</p>`;
  }).join('\n').replace(/^/, '<section>').concat('</section>').replace('<section></section>', '');
}

// Focuspunt (admin) -> object-position; anders 50% 50%.
const posOf = (x) => (x.focus_x != null && x.focus_y != null ? `${x.focus_x}% ${x.focus_y}%` : x.crop || '50% 50%');

// Beste foto per categorie: nieuwste Top-foto in die categorie (of null).
export function bestPhoto(cat) {
  const h = dbPhotos.find((x) => x.cat_header === cat && localMap[x.url]);
  if (h) return { file: h.url, alt: (h.alt || '').trim() || [h.event, h.city, h.year].filter(Boolean).join(', ') || 'Event photography', pos: posOf(h) };
  const t = dbPhotos.filter((x) => x.portfolio && x.top && (x.categories || []).includes(cat) && localMap[x.url]);
  t.sort((a, b) => String(b.taken_on || b.created_at).localeCompare(String(a.taken_on || a.created_at)));
  return t[0] ? { file: t[0].url, alt: (t[0].alt || '').trim() || [t[0].event, t[0].city, t[0].year].filter(Boolean).join(', ') || 'Event photography', pos: posOf(t[0]) } : null;
}

// De gekozen hero-foto's voor de homepage, op volgorde (leeg = vaste selectie).
export function heroPhotos() {
  return dbPhotos.filter((x) => x.home_hero && localMap[x.url]).sort((a, b) => a.home_hero - b.home_hero)
    .map((x) => ({ file: x.url, name: x.event || x.caption || 'Event photography', pos: posOf(x), alt: (x.alt || '').trim() || [x.event, x.city, x.year].filter(Boolean).join(', ') || 'Event photography' }));
}
