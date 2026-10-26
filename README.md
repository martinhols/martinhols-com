# martinhols.com

Statische site (geen framework). `node build.mjs` bouwt naar `dist/`; Vercel draait dat automatisch (zie `vercel.json`).

- `src/site.mjs` vaste gegevens (naam, e-mail, telefoon, cijfers, nav)
- `src/layout.mjs` gedeelde onderdelen: header, mobiel menu, contactblok, footer, hele pagina met meta en JSON-LD
- `src/pages/*.mjs` een bestand per pagina (exporteert `page`)
- `src/css/tokens.css` kleuren, typografie, knoppen (uit het ontwerpsysteem); `src/css/site.css` stijl van de site
- `src/img/` foto's met beschrijvende namen; `src/img/sizes.json` afmetingen voor width/height

Het ontwerp staat in het Claude Design-canvas "MartinHols.com website" en in het ontwerpsysteem "MartinHols.com".
Lokaal: `npm run dev` (bouwt en serveert op http://localhost:3000).
