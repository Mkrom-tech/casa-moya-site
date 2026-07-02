# Casa Moya — direct booking site (starter)

Wat je hebt: een werkende Next.js site met NL/EN, een overzichtspagina voor
Casa Moya Moraira en Moya Apartment Denia, een pagina per huis (met echte
tekst/amenities gebaseerd op je Airbnb/Booking-listings), en een
boekingsaanvraagformulier. Getest met `npm run build` — bouwt zonder fouten.

Domein: casa-moya.com (geregistreerd bij Hostnet). Dit vervangt het plan om
seaviewcostablanca.com / eigenwebsite.nl te gebruiken — die hosting gaf te
veel problemen (verlopen SSL, geen databasetoegang).

Nog te doen: echte foto's (nu placeholders), prijzen, en betalen/kalendersync
aansluiten.

## 1. Lokaal draaien

```
npm install
npm run dev
```
Open http://localhost:3000

## 2. Content invullen

- `lib/properties.ts` — namen, prijzen, aantal gasten/kamers, beschrijving
  (NL + EN), voorzieningen.
- `public/images/` — vervang de placeholder-jpg's door echte foto's, en
  verwijs ernaar vanuit `lib/properties.ts` (`heroImage`, `images`).

## 3. Hosting: casa-moya.com + Vercel

Deze site is in Next.js gebouwd, wat Node.js-hosting nodig heeft — geen
gewone shared/PHP-hosting. Makkelijkste route: **Vercel** (gemaakt door de
makers van Next.js, gratis tier is ruim voldoende voor een site als deze).

1. Maak zelf een account op vercel.com (met GitHub inloggen kan).
2. Push deze projectmap naar een nieuwe GitHub-repository.
3. In Vercel: "Add New Project" → kies die repository → Deploy.
4. Bij Vercel onder Settings → Domains: voeg `casa-moya.com` toe.
5. Bij Hostnet (waar je het domein hebt gekocht) pas je de DNS-records aan
   naar wat Vercel je opgeeft (meestal een CNAME of A-record). Vercel
   regelt het SSL-certificaat daarna automatisch.

Zeg het als je hier hulp bij wil, dan lopen we het samen door.

## 4. Kalendersync met Airbnb/Booking.com (voorkomt dubbele boekingen)

Beide platformen geven een .ics-kalenderlink:
- Airbnb: Kalender → Beschikbaarheid → "Kalender exporteren"
- Booking.com: Extranet → Kalender → Kalenders synchroniseren

Zet die links in `lib/properties.ts` bij `icalUrls` per huis. Vervolgens
bouwen we een server-route die deze feeds ophaalt en samenvoegt tot
geblokkeerde data, zodat gasten op de site altijd de actuele
beschikbaarheid zien. (Nog te bouwen — huidige versie toont een
plaatshouder-tekst op de huis-pagina.)

## 5. Boekingsaanvragen ontvangen

Nu logt `/app/api/inquiry/route.ts` een aanvraag alleen server-side (je
ziet 'm niet). Om ze per e-mail te ontvangen, kies een van:
- **Resend** (resend.com) — paar regels code, werkt goed met Vercel.
- **Formspree/Getform** — geen code nodig, formulier-actie wijst er
  rechtstreeks naartoe.

## 6. Later: automatisch online betalen

Als je van "aanvraag + zelf bevestigen" naar "gast boekt en betaalt
meteen" wil: Stripe of Mollie (Mollie is Nederlands/simpel, Stripe is
internationaler) koppelen aan het formulier, plus prijsberekening op
basis van de geselecteerde data.
