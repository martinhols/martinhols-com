// Vercel serverless function: zet de site opnieuw live (start een nieuwe build) zonder dat de deploy hook in de browser staat.
// Vereist in Vercel (Settings -> Environment Variables): DEPLOY_HOOK_URL (de Deploy Hook URL uit Settings -> Git -> Deploy Hooks).
// Alleen een ingelogde admin (Supabase-sessie) mag dit aanroepen.
const SB_URL = process.env.SUPABASE_URL || 'https://rpspddxsnedszscudfke.supabase.co';
const SB_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable__p3yyQ_mtRIaa-MDEWG_CQ_vn0cEPVB';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' });
  const hook = process.env.DEPLOY_HOOK_URL;
  if (!hook) return res.status(501).json({ ok: false, error: 'not_configured' });
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  if (!token) return res.status(401).json({ ok: false, error: 'auth' });
  try {
    const u = await fetch(SB_URL + '/auth/v1/user', { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + token } });
    if (!u.ok) return res.status(401).json({ ok: false, error: 'auth' });
    const r = await fetch(hook, { method: 'POST' });
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'upstream' });
  }
}
