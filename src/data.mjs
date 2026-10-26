// Haalt gepubliceerde projecten en artikelen uit Supabase tijdens de build.
// Lukt dat niet (geen netwerk, lege database), dan bouwt de site gewoon zonder.
import { SUPABASE } from './site.mjs';

async function get(table, order, onlyPublished = true) {
  try {
    if (process.env.DATA_FIXTURE) { const fx = JSON.parse((await import('node:fs')).readFileSync(process.env.DATA_FIXTURE, 'utf8')); return fx[table] || []; }
    const r = await fetch(`${SUPABASE.url}/rest/v1/${table}?select=*${onlyPublished ? '&published=eq.true' : ''}&order=${order}`, {
      headers: { apikey: SUPABASE.key, Authorization: `Bearer ${SUPABASE.key}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch (e) {
    console.warn(`[data] ${table} niet opgehaald (${e.message || e}); alleen vaste inhoud.`);
    return [];
  }
}
export const dbProjects = await get('projects', 'event_date.desc.nullslast,created_at.desc');
export const dbPhotos = await get('photos', 'created_at.asc', false);
export const dbPosts = await get('posts', 'published_at.desc.nullslast,created_at.desc');

// Eenvoudige tekst → HTML: lege regel = alinea, "## " = kop, "- " = lijst.
export function textToHtml(t = '') {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return t.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).map((b) => {
    if (b.startsWith('## ')) return `</section><section><h2>${esc(b.slice(3))}</h2>`;
    if (/^- /m.test(b)) return `<ul class="ck">${b.split('\n').filter((l) => l.startsWith('- ')).map((l) => `<li><span>${esc(l.slice(2))}</span></li>`).join('')}</ul>`;
    return `<p>${esc(b)}</p>`;
  }).join('\n').replace(/^/, '<section>').concat('</section>').replace('<section></section>', '');
}
