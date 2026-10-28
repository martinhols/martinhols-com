// SEO-controle op de gebouwde pagina's. Draait na elke build en schrijft dist/seo-audit.json.
// Bedoeld voor mensen en voor SEO-agents: één bestand met per pagina de bevindingen.
import fs from 'node:fs';
import path from 'node:path';

const strip = (h) => h.replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const attr = (tag, n) => { const m = tag.match(new RegExp(`\\b${n}="([^"]*)"`)); return m ? m[1] : null; };
const dec = (s) => (s || '').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

export function audit(dist, seoList, siteUrl) {
  const known = new Set(seoList.map((p) => p.path).concat(['/404']));
  const out = [];
  for (const p of seoList) {
    const file = path.join(dist, p.path === '/' ? 'index.html' : p.path.replace(/^\//, '') + '/index.html');
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    const issues = [];
    const add = (severity, code, message) => issues.push({ severity, code, message });
    const title = dec((html.match(/<title>([^<]*)<\/title>/) || [])[1]), desc = dec(attr((html.match(/<meta name="description"[^>]*>/) || [''])[0], 'content'));
    const h1 = (html.match(/<h1[\s>]/g) || []).length;
    const visible = html.replace(/<(a|div|span)\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/\1>/g, ''); // aria-hidden blokken (dubbele carrousel-kaarten) tellen niet mee
    const imgs = visible.match(/<img\b[^>]*>/g) || [];
    const noAlt = imgs.filter((t) => attr(t, 'alt') === null).length;
    const emptyAlt = imgs.filter((t) => attr(t, 'alt') === '' && !/aria-hidden/.test(t)).length;
    const words = strip(html.split('<body')[1] || '').split(' ').length;
    const links = (html.match(/<a\b[^>]*href="\/[^"#?]*[^"]*"/g) || []).map((t) => attr(t, 'href').split('#')[0].split('?')[0]).filter((h) => h && !h.startsWith('//'));
    const broken = [...new Set(links.filter((h) => !known.has(h === '' ? '/' : h.replace(/\/$/, '') || '/') && !/\.(jpg|png|webp|ico|css|js|json|xml|txt)$/.test(h) && h !== '/api/contact'))];
    const ld = (html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || []).map((s) => { try { return JSON.parse(s.replace(/<\/?script[^>]*>/g, ''))['@type']; } catch { return 'INVALID'; } });
    if (!title) add('high', 'title-missing', 'No title.'); else { if (title.length > 60) add('medium', 'title-long', `Title is ${title.length} characters (max 60).`); if (title.length < 25) add('low', 'title-short', `Title is only ${title.length} characters.`); }
    if (!desc) add('high', 'description-missing', 'No meta description.'); else { if (desc.length > 160) add('medium', 'description-long', `Description is ${desc.length} characters (max 160).`); if (desc.length < 90) add('low', 'description-short', `Description is only ${desc.length} characters.`); }
    if (h1 !== 1) add('high', 'h1-count', `Page has ${h1} H1 headings (should be 1).`);
    if (noAlt) add('high', 'img-alt-missing', `${noAlt} image(s) without alt attribute.`);
    if (emptyAlt > 4) add('low', 'img-alt-empty', `${emptyAlt} images with empty alt that are not decorative.`);
    if (!p.noindex && words < 150 && !/^\/(privacy|terms)/.test(p.path)) add('medium', 'thin-content', `Only about ${words} words of text.`);
    if (broken.length) add('high', 'broken-links', `Internal links to unknown pages: ${broken.join(', ')}`);
    if (!p.noindex && !html.includes('rel="canonical"')) add('high', 'canonical-missing', 'No canonical link.');
    if (!p.noindex && !ld.length) add('medium', 'no-structured-data', 'No structured data (JSON-LD).');
    out.push({ path: p.path, url: siteUrl + (p.path === '/' ? '/' : p.path), noindex: !!p.noindex, title, description: desc, titleLength: title.length, descriptionLength: desc.length, h1, words, images: imgs.length, imagesWithoutAlt: noAlt, structuredData: ld.flat(), internalLinks: links.length, issues });
  }
  // dubbele titels en beschrijvingen
  for (const k of ['title', 'description']) {
    const m = {}; out.filter((x) => !x.noindex).forEach((x) => (m[x[k]] = m[x[k]] || []).push(x));
    Object.values(m).filter((a) => a.length > 1).forEach((a) => a.forEach((x) => x.issues.push({ severity: 'high', code: `${k}-duplicate`, message: `Same ${k} as ${a.filter((y) => y !== x).map((y) => y.path).join(', ')}.` })));
  }
  return { generated: new Date().toISOString(), site: siteUrl, pages: out, summary: { pages: out.length, high: out.flatMap((x) => x.issues).filter((i) => i.severity === 'high').length, medium: out.flatMap((x) => x.issues).filter((i) => i.severity === 'medium').length, low: out.flatMap((x) => x.issues).filter((i) => i.severity === 'low').length } };
}
