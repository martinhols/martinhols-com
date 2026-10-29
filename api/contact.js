import { buildMail } from './_mail.js';
// Vercel serverless function: stuurt het offerteverzoek per e-mail via Resend.
// Vereist in Vercel (Settings → Environment Variables): RESEND_API_KEY, CONTACT_TO (ontvanger), CONTACT_FROM (afzender op een geverifieerd domein).
const clean = (v, max = 4000) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
  // Zonder JavaScript post het formulier direct: stuur dan terug naar de pagina in plaats van JSON te tonen.
  const isForm = String(req.headers['content-type'] || '').includes('application/x-www-form-urlencoded');
  if (isForm) {
    const real = res;
    res = { status: (c) => ({ json: (o) => { real.setHeader('Location', '/contact/?' + (o.ok ? 'sent=1' : 'error=1') + '#quote-form'); real.status(303).end(); } }) };
  }
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  if (clean(b.website)) return res.status(200).json({ ok: true }); // honeypot: doe alsof het gelukt is

  // Extra spambeveiliging: tijdcontrole, te veel links, limiet per IP en (indien ingesteld) Cloudflare Turnstile.
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  globalThis.__hits = globalThis.__hits || new Map();
  const hits = (globalThis.__hits.get(ip) || []).filter((t) => now - t < 600000);
  if (hits.length >= 5) return res.status(429).json({ ok: false, error: 'rate' });
  globalThis.__hits.set(ip, [...hits, now]);
  if (b.ts && now - Number(b.ts) < 3000) return res.status(200).json({ ok: true }); // te snel ingevuld: doe alsof het gelukt is
  if ((String(b.message || '').match(/https?:\/\/|www\./gi) || []).length > 2) return res.status(200).json({ ok: true });
  const secret = process.env.TURNSTILE_SECRET;
  if (secret) {
    const token = clean(b['cf-turnstile-response'], 4096);
    let okCaptcha = false;
    if (token) {
      try {
        const v = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ secret, response: token, remoteip: ip }) });
        okCaptcha = !!(await v.json()).success;
      } catch {}
    }
    if (!okCaptcha) return res.status(400).json({ ok: false, error: 'captcha' });
  }

  const company = clean(b.company, 200), name = clean(b.name, 200), email = clean(b.email, 200), message = clean(b.message);
  if (!name || !company || !/^\S+@\S+\.\S+$/.test(email) || !message) return res.status(400).json({ ok: false, error: 'invalid' });

  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO, from = process.env.CONTACT_FROM;
  if (!key || !to || !from) return res.status(503).json({ ok: false, error: 'not-configured' });

  const { html, text, subject } = buildMail({ name, company, email, date: clean(b.date, 100), location: clean(b.location, 200), type: clean(b.type, 100), message });

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: to.split(',').map((s) => s.trim()), reply_to: email, subject, html, text, headers: { 'X-Priority': '1', Importance: 'high', Priority: 'urgent' } }),
  });
  if (!r.ok) { let d = ''; try { d = (await r.json()).message || ''; } catch {} return res.status(502).json({ ok: false, error: 'send', detail: `${r.status} ${d}`.slice(0, 300) }); }
  return res.status(200).json({ ok: true });
}
