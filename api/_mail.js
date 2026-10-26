// Bouwt de e-mail voor een offerteverzoek: nette opmaak + knop "Zet in HQ" (voorgevuld projectformulier).
const HQ = 'https://photography-project-management-virid.vercel.app/projecten/nieuw#prefill=';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CATEGORY = { Festivals: 'festival', Corporate: 'corporate_reportage' };
const PHOTOGRAPHY = { Corporate: 'corporate_reportage' };

/** dd/mm/jjjj (of dd-mm-jjjj, dd.mm.jjjj) → JJJJ-MM-DD, anders null */
function isoDate(s) {
  const m = String(s).match(/^\s*(\d{1,2})[\/.\-\s]+(\d{1,2})[\/.\-\s]+(\d{4})\s*$/);
  if (!m) return null;
  const [d, mo, y] = [+m[1], +m[2], +m[3]];
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function hqLink({ name, company, email, date, location, type, message }) {
  const iso = isoDate(date);
  const data = {
    title: [company, type].filter(Boolean).join(' · ') || 'Offerteaanvraag website',
    ...(company && { client: company }),
    ...(CATEGORY[type] && { category: CATEGORY[type] }),
    ...(location && { location }),
    contact: { name, email },
    ...(iso && { days: [{ date: iso, photography: PHOTOGRAPHY[type] || 'event' }] }),
    briefing: `Aanvraag via martinhols.com${date && !iso ? ` · datum: ${date}` : ''}\n${message}`.slice(0, 1500),
  };
  return HQ + Buffer.from(JSON.stringify(data), 'utf8').toString('base64url');
}

export function buildMail(f) {
  const link = hqLink(f);
  const rows = [['Name', f.name], ['Email', f.email], ['Company / event', f.company], ['Event date', f.date], ['Location', f.location], ['Type of event', f.type]].filter(([, v]) => v);
  const row = ([k, v]) => `<tr><td style="padding:12px 0;border-top:1px solid #E4DDCF;width:150px;font:600 11px/16px Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#6B7785;vertical-align:top">${esc(k)}</td><td style="padding:12px 0;border-top:1px solid #E4DDCF;font:500 16px/24px Arial,sans-serif;color:#051E31">${k === 'Email' ? `<a href="mailto:${esc(v)}" style="color:#051E31">${esc(v)}</a>` : esc(v)}</td></tr>`;
  const btn = (href, label, bg, fg, border) => `<a href="${esc(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:14px 22px;background:${bg};color:${fg};border:1px solid ${border};border-radius:8px;font:700 15px/20px Arial,sans-serif;text-decoration:none">${label}</a>`;
  const html = `<!doctype html><html><body style="margin:0;background:#F4EFE6"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4EFE6"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
<tr><td style="background:#051E31;border-radius:16px 16px 0 0;padding:28px 32px">
<div style="font:700 11px/16px Arial,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#FF8A1F">New quote request · priority</div>
<div style="margin-top:10px;font:300 30px/36px Arial,sans-serif;color:#F4EFE6">${esc(f.company || f.name)}${f.type ? ' · ' + esc(f.type) : ''}</div>
</td></tr>
<tr><td style="background:#FFFFFF;padding:8px 32px 8px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows.map(row).join('')}</table>
</td></tr>
<tr><td style="background:#FFFFFF;padding:8px 32px 24px">
<div style="padding-top:16px;border-top:1px solid #E4DDCF;font:600 11px/16px Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#6B7785">Message</div>
<div style="margin-top:10px;font:400 17px/27px Georgia,serif;color:#051E31">${esc(f.message).replace(/\n/g, '<br>')}</div>
</td></tr>
<tr><td style="background:#FFFFFF;border-radius:0 0 16px 16px;padding:8px 32px 32px">
${btn(link, 'Zet in HQ →', '#FF8A1F', '#051E31', '#FF8A1F')}${btn('mailto:' + f.email + '?subject=' + encodeURIComponent('Re: your quote request'), 'Reply to ' + esc(f.name.split(' ')[0]), '#FFFFFF', '#051E31', '#051E31')}
<div style="margin-top:8px;font:400 13px/20px Arial,sans-serif;color:#6B7785">“Zet in HQ” opens a pre-filled new project (status: Aanvraag). Check it and save.</div>
</td></tr>
<tr><td style="padding:16px 8px;font:400 12px/18px Arial,sans-serif;color:#6B7785;text-align:center">Sent from the contact form on martinhols.com</td></tr>
</table></td></tr></table></body></html>`;
  const text = `NEW QUOTE REQUEST\n\n${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\nMessage:\n${f.message}\n\nZet in HQ: ${link}\nReply: mailto:${f.email}`;
  return { html, text, subject: `🔴 Quote request: ${f.company || f.type || 'event'} — ${f.name}` };
}
