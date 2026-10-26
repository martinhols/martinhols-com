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

  const name = clean(b.name, 200), email = clean(b.email, 200), message = clean(b.message);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !message) return res.status(400).json({ ok: false, error: 'invalid' });

  const key = process.env.RESEND_API_KEY, to = process.env.CONTACT_TO, from = process.env.CONTACT_FROM;
  if (!key || !to || !from) return res.status(503).json({ ok: false, error: 'not-configured' });

  const rows = [['Name', name], ['Email', email], ['Event date', clean(b.date, 100)], ['Location', clean(b.location, 200)], ['Type of event', clean(b.type, 100)], ['Message', message]];
  const html = '<table cellpadding="6" style="font-family:sans-serif;font-size:15px">' + rows.map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${k}</td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('') + '</table>';
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: to.split(',').map((s) => s.trim()), reply_to: email, subject: `Quote request: ${clean(b.type, 60) || 'event'} — ${name}`, html, text }),
  });
  if (!r.ok) { let d = ''; try { d = (await r.json()).message || ''; } catch {} return res.status(502).json({ ok: false, error: 'send', detail: `${r.status} ${d}`.slice(0, 300) }); }
  return res.status(200).json({ ok: true });
}
