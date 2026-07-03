import type { Locale } from "./properties";

export interface AreaGuideSection {
  heading: string;
  body: string;
}

export interface AreaGuideFaq {
  q: string;
  a: string;
}

export interface AreaGuide {
  slug: "moraira" | "denia";
  slugs: Record<Locale, string>;
  relatedPropertySlug: string;
  heroImage: string;
  title: Record<Locale, string>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  intro: Record<Locale, string>;
  sections: Record<Locale, AreaGuideSection[]>;
  faq: Record<Locale, AreaGuideFaq[]>;
}

export const areaGuides: AreaGuide[] = [
  {
    slug: "moraira",
    slugs: {
      nl: "vakantievilla-moraira",
      en: "villa-rental-moraira",
      es: "alquiler-villa-moraira",
      it: "villa-affitto-moraira",
      de: "ferienvilla-moraira"
    },
    relatedPropertySlug: "casa-moya-moraira",
    heroImage: "/images/moraira-2.jpg",
    title: {
      nl: "Vakantievilla huren in Moraira - met privézwembad en zeezicht",
      en: "Villa Rental in Moraira - Private Pool and Sea Views",
      es: "Villa en alquiler en Moraira - piscina privada y vistas al mar",
      it: "Villa in affitto a Moraira - piscina privata e vista mare",
      de: "Villa mieten in Moraira - mit Privatpool und Meerblick"
    },
    metaTitle: {
      nl: "Vakantievilla Moraira huren | Privézwembad & zeezicht - Casa Moya",
      en: "Moraira Villa Rental | Private Pool & Sea View - Casa Moya",
      es: "Villa en alquiler en Moraira | Piscina privada y vistas al mar - Casa Moya",
      it: "Villa in affitto a Moraira | Piscina privata e vista mare - Casa Moya",
      de: "Villa mieten in Moraira | Privatpool und Meerblick - Casa Moya"
    },
    metaDescription: {
      nl: "Op zoek naar een vakantievilla in Moraira met privézwembad en zeezicht? Casa Moya ligt 2,1 km van het strand, in een rustige, kindvriendelijke omgeving. Boek rechtstreeks, zonder commissie.",
      en: "Looking for a villa rental in Moraira with a private pool and sea views? Casa Moya is 2.1 km from the beach, in a quiet, family-friendly setting. Book direct, no commission.",
      es: "¿Buscas una villa en alquiler en Moraira con piscina privada y vistas al mar? Casa Moya está a 2,1 km de la playa, en un entorno tranquilo y familiar. Reserva directa, sin comisión.",
      it: "Cerchi una villa in affitto a Moraira con piscina privata e vista mare? Casa Moya si trova a 2,1 km dalla spiaggia, in una zona tranquilla e adatta alle famiglie. Prenota diretto, senza commissioni.",
      de: "Suchen Sie eine Villa in Moraira mit Privatpool und Meerblick? Casa Moya liegt 2,1 km vom Strand entfernt, in ruhiger, familienfreundlicher Lage. Direkt buchen, ohne Provision."
    },
    intro: {
      nl: "Moraira is een van de rustigste en meest gewilde badplaatsen aan de Costa Blanca - een klein, veilig dorp met een goed te belopen centrum, mooie baaien en een boulevard langs zee. Casa Moya is een vakantievilla met privézwembad, tuin en zeezicht, 2,1 km van het strand en 3,2 km van het centrum.",
      en: "Moraira is one of the quietest and most sought-after resort towns on the Costa Blanca - a small, safe village with a walkable centre, beautiful coves and a seafront promenade. Casa Moya is a villa with a private pool, garden and sea views, 2.1 km from the beach and 3.2 km from the centre.",
      es: "Moraira es uno de los pueblos costeros más tranquilos y solicitados de la Costa Blanca - un pueblo pequeño y seguro, con un centro accesible a pie, calas preciosas y un paseo marítimo. Casa Moya es una villa con piscina privada, jardín y vistas al mar, a 2,1 km de la playa y 3,2 km del centro.",
      it: "Moraira è una delle località costiere più tranquille e ricercate della Costa Blanca - un piccolo borgo sicuro, con un centro percorribile a piedi, calette bellissime e una passeggiata lungomare. Casa Moya è una villa con piscina privata, giardino e vista mare, a 2,1 km dalla spiaggia e 3,2 km dal centro.",
      de: "Moraira ist einer der ruhigsten und beliebtesten Ferienorte an der Costa Blanca - ein kleines, sicheres Dorf mit einem zu Fuß erreichbaren Zentrum, wunderschönen Buchten und einer Strandpromenade. Casa Moya ist eine Villa mit Privatpool, Garten und Meerblick, 2,1 km vom Strand und 3,2 km vom Zentrum entfernt."
    },
    sections: {
      nl: [
        {
          heading: "Ligging en bereikbaarheid",
          body: "Het dichtstbijzijnde strand, L'Ampolla, is het grootste en meest gezinsvriendelijke strand van Moraira, aan het begin van de boulevard. Een stukje verderop ligt de rustige baai El Portet, ongeveer 1 km lopen, met een mooi wandelpad dat ook met kinderwagen te doen is. Parkeren in het dorp is grotendeels gratis; bij het gemeentehuis (La Sanieta) is een grote gratis parkeerplaats op loopafstand van het centrum. In de zomer is het verstandig vóór 10:00 uur te arriveren als je dicht bij het strand wilt parkeren."
        },
        {
          heading: "Geschikt voor gezinnen",
          body: "Moraira is klein, veilig en goed te voet te doen - ideaal voor gezinnen met kinderen. De rustige baaien, de boulevard en de wekelijkse markt maken het een ontspannen bestemming zonder de drukte van grotere kustplaatsen."
        },
        {
          heading: "Beste periode om te boeken",
          body: "Het zwembad is te gebruiken van april tot en met oktober. Juli en augustus zijn het drukst en boeken het snelst vol; voor de beste prijs en ruime keuze raden we aan minimaal 2-3 maanden van tevoren te boeken, of te kiezen voor juni of september voor rustiger weer met nog volop zon."
        },
        {
          heading: "Waarom rechtstreeks boeken bij Casa Moya",
          body: "Rechtstreeks boeken betekent geen commissie voor Airbnb of Booking.com, persoonlijk contact met de eigenaar, en altijd de beste directe prijs - dezelfde villa, zonder de opslag."
        }
      ],
      en: [
        {
          heading: "Location and getting around",
          body: "The nearest beach, L'Ampolla, is Moraira's largest and most family-friendly, right at the start of the promenade. A little further on is the quieter cove of El Portet, about 1 km away on a scenic, buggy-friendly walking path. Parking in the village is largely free; there's a large free car park by the town hall (La Sanieta) within walking distance of the centre. In summer, arrive before 10am if you want to park near the beach."
        },
        {
          heading: "Good for families",
          body: "Moraira is small, safe and easy to get around on foot - ideal for families with children. The calm coves, the promenade and the weekly market make it a relaxed destination without the crowds of bigger coastal towns."
        },
        {
          heading: "Best time to book",
          body: "The pool is usable from April through October. July and August are the busiest months and book up fastest; for the best price and choice, book 2-3 months ahead, or choose June or September for quieter weather with plenty of sun."
        },
        {
          heading: "Why book direct with Casa Moya",
          body: "Booking direct means no commission for Airbnb or Booking.com, personal contact with the owner, and always the best direct rate for the same villa."
        }
      ],
      es: [
        {
          heading: "Ubicación y cómo moverte",
          body: "La playa más cercana, L'Ampolla, es la más grande y familiar de Moraira, justo al inicio del paseo marítimo. Un poco más allá está la tranquila cala de El Portet, a 1 km aproximadamente, por un camino escénico apto también para carritos de bebé. El aparcamiento en el pueblo es en su mayoría gratuito; hay un gran aparcamiento gratuito junto al ayuntamiento (La Sanieta), a poca distancia del centro. En verano, llega antes de las 10:00 si quieres aparcar cerca de la playa."
        },
        {
          heading: "Ideal para familias",
          body: "Moraira es pequeño, seguro y fácil de recorrer a pie - ideal para familias con niños. Las calas tranquilas, el paseo marítimo y el mercado semanal lo convierten en un destino relajado, sin las aglomeraciones de las localidades costeras más grandes."
        },
        {
          heading: "Mejor época para reservar",
          body: "La piscina se puede usar de abril a octubre. Julio y agosto son los meses más solicitados y se llenan antes; para el mejor precio y disponibilidad, reserva con 2-3 meses de antelación, o elige junio o septiembre para un clima más tranquilo con mucho sol."
        },
        {
          heading: "Por qué reservar directamente con Casa Moya",
          body: "Reservar directamente significa sin comisión de Airbnb o Booking.com, contacto personal con el propietario, y siempre el mejor precio directo para la misma villa."
        }
      ],
      it: [
        {
          heading: "Posizione e spostamenti",
          body: "La spiaggia più vicina, L'Ampolla, è la più grande e adatta alle famiglie di Moraira, proprio all'inizio della passeggiata. Poco più avanti si trova la tranquilla caletta di El Portet, a circa 1 km, raggiungibile con un percorso panoramico adatto anche ai passeggini. Il parcheggio in paese è per lo più gratuito; c'è un grande parcheggio gratuito vicino al municipio (La Sanieta), a pochi passi dal centro. In estate, arriva prima delle 10:00 se vuoi parcheggiare vicino alla spiaggia."
        },
        {
          heading: "Ideale per le famiglie",
          body: "Moraira è piccola, sicura e facile da girare a piedi - ideale per famiglie con bambini. Le calette tranquille, la passeggiata e il mercato settimanale la rendono una destinazione rilassata, senza la folla delle località costiere più grandi."
        },
        {
          heading: "Il momento migliore per prenotare",
          body: "La piscina è utilizzabile da aprile a ottobre. Luglio e agosto sono i mesi più richiesti e si riempiono più in fretta; per il miglior prezzo e disponibilità, prenota con 2-3 mesi di anticipo, oppure scegli giugno o settembre per un clima più tranquillo e ancora molto sole."
        },
        {
          heading: "Perché prenotare direttamente con Casa Moya",
          body: "Prenotare direttamente significa nessuna commissione per Airbnb o Booking.com, contatto personale con il proprietario, e sempre il miglior prezzo diretto per la stessa villa."
        }
      ],
      de: [
        {
          heading: "Lage und Erreichbarkeit",
          body: "Der nächste Strand, L'Ampolla, ist der größte und familienfreundlichste Strand Morairas, direkt am Anfang der Promenade. Etwas weiter liegt die ruhige Bucht El Portet, etwa 1 km entfernt, über einen malerischen, auch mit Kinderwagen begehbaren Weg. Parken im Dorf ist größtenteils kostenlos; beim Rathaus (La Sanieta) gibt es einen großen kostenlosen Parkplatz in Gehweite zum Zentrum. Im Sommer sollten Sie vor 10 Uhr ankommen, wenn Sie in Strandnähe parken möchten."
        },
        {
          heading: "Gut für Familien",
          body: "Moraira ist klein, sicher und gut zu Fuß erkundbar - ideal für Familien mit Kindern. Die ruhigen Buchten, die Promenade und der Wochenmarkt machen es zu einem entspannten Reiseziel ohne den Trubel größerer Küstenorte."
        },
        {
          heading: "Beste Buchungszeit",
          body: "Der Pool ist von April bis Oktober nutzbar. Juli und August sind die gefragtesten Monate und am schnellsten ausgebucht; für den besten Preis und die größte Auswahl empfehlen wir eine Buchung 2-3 Monate im Voraus, oder Juni bzw. September für ruhigeres Wetter mit weiterhin viel Sonne."
        },
        {
          heading: "Warum direkt bei Casa Moya buchen",
          body: "Direkt buchen bedeutet keine Provision für Airbnb oder Booking.com, persönlichen Kontakt mit dem Eigentümer, und immer den besten Direktpreis für dieselbe Villa."
        }
      ]
    },
    faq: {
      nl: [
        { q: "Hoe ver is het strand vanaf de villa?", a: "Het dichtstbijzijnde strand ligt op 2,1 km, ongeveer 5 minuten met de auto of een korte fietstocht." },
        { q: "Is er gratis parkeren in Moraira?", a: "Ja, bij de villa zelf en in het dorp is volop gratis parkeren, onder andere bij het gemeentehuis vlak bij het centrum." },
        { q: "Is Moraira geschikt voor kinderen?", a: "Zeker - het dorp is klein, veilig en goed te voet te doen, met rustige familiestranden zoals L'Ampolla." },
        { q: "Wat is de beste periode om te boeken?", a: "Het zwembad is open van april tot oktober. Voor de beste beschikbaarheid en prijs boek je het liefst ruim vóór het hoogseizoen (juli-augustus)." }
      ],
      en: [
        { q: "How far is the beach from the villa?", a: "The nearest beach is 2.1 km away, about a 5-minute drive or a short bike ride." },
        { q: "Is there free parking in Moraira?", a: "Yes - free parking at the villa itself, plus plenty of free parking around the village, including near the town hall close to the centre." },
        { q: "Is Moraira good for children?", a: "Yes - the village is small, safe and easy to explore on foot, with calm family beaches like L'Ampolla." },
        { q: "What's the best time to book?", a: "The pool is open April through October. For the best availability and price, book well ahead of high season (July-August)." }
      ],
      es: [
        { q: "¿A qué distancia está la playa de la villa?", a: "La playa más cercana está a 2,1 km, unos 5 minutos en coche o un corto trayecto en bicicleta." },
        { q: "¿Hay aparcamiento gratuito en Moraira?", a: "Sí - aparcamiento gratuito en la propia villa, además de mucho aparcamiento gratuito por el pueblo, incluido junto al ayuntamiento cerca del centro." },
        { q: "¿Es Moraira adecuado para niños?", a: "Sí - el pueblo es pequeño, seguro y fácil de recorrer a pie, con playas familiares tranquilas como L'Ampolla." },
        { q: "¿Cuál es la mejor época para reservar?", a: "La piscina está disponible de abril a octubre. Para la mejor disponibilidad y precio, reserva con antelación antes de la temporada alta (julio-agosto)." }
      ],
      it: [
        { q: "Quanto dista la spiaggia dalla villa?", a: "La spiaggia più vicina è a 2,1 km, circa 5 minuti in auto o una breve pedalata." },
        { q: "C'è parcheggio gratuito a Moraira?", a: "Sì - parcheggio gratuito presso la villa stessa, oltre a molto parcheggio gratuito in paese, anche vicino al municipio nei pressi del centro." },
        { q: "Moraira è adatta ai bambini?", a: "Sì - il paese è piccolo, sicuro e facile da girare a piedi, con spiagge tranquille e familiari come L'Ampolla." },
        { q: "Qual è il momento migliore per prenotare?", a: "La piscina è aperta da aprile a ottobre. Per la migliore disponibilità e il miglior prezzo, prenota con largo anticipo rispetto all'alta stagione (luglio-agosto)." }
      ],
      de: [
        { q: "Wie weit ist der Strand von der Villa entfernt?", a: "Der nächste Strand liegt 2,1 km entfernt, etwa 5 Minuten mit dem Auto oder eine kurze Fahrradfahrt." },
        { q: "Gibt es kostenlose Parkplätze in Moraira?", a: "Ja - kostenlose Parkplätze direkt bei der Villa sowie viele kostenlose Parkmöglichkeiten im Dorf, unter anderem beim Rathaus nahe dem Zentrum." },
        { q: "Ist Moraira gut für Kinder geeignet?", a: "Ja - das Dorf ist klein, sicher und gut zu Fuß erkundbar, mit ruhigen Familienstränden wie L'Ampolla." },
        { q: "Was ist die beste Buchungszeit?", a: "Der Pool ist von April bis Oktober geöffnet. Für die beste Verfügbarkeit und den besten Preis buchen Sie am besten weit vor der Hochsaison (Juli-August)." }
      ]
    }
  },
  {
    slug: "denia",
    slugs: {
      nl: "zeezicht-appartement-denia",
      en: "sea-view-apartment-denia",
      es: "apartamento-vistas-mar-denia",
      it: "appartamento-vista-mare-denia",
      de: "meerblick-wohnung-denia"
    },
    relatedPropertySlug: "moya-apartment-denia",
    heroImage: "/images/denia-17.avif",
    title: {
      nl: "Zeezicht appartement huren in Denia - aan het strand van Les Deveses",
      en: "Sea View Apartment Rental in Denia - On Les Deveses Beach",
      es: "Apartamento con vistas al mar en alquiler en Denia - en la playa de Les Deveses",
      it: "Appartamento vista mare in affitto a Denia - sulla spiaggia di Les Deveses",
      de: "Wohnung mit Meerblick mieten in Denia - am Strand von Les Deveses"
    },
    metaTitle: {
      nl: "Zeezicht appartement Denia huren | Strand Les Deveses - Casa Moya",
      en: "Denia Sea View Apartment Rental | Les Deveses Beach - Casa Moya",
      es: "Apartamento con vistas al mar en Denia | Playa Les Deveses - Casa Moya",
      it: "Appartamento vista mare a Denia | Spiaggia Les Deveses - Casa Moya",
      de: "Wohnung mit Meerblick in Denia | Strand Les Deveses - Casa Moya"
    },
    metaDescription: {
      nl: "Appartement met zeezicht huren in Denia, 90 meter van het rustige strand Les Deveses. Gratis parkeren, ideaal voor gezinnen. Boek rechtstreeks bij Casa Moya, zonder commissie.",
      en: "Rent a sea-view apartment in Denia, 90 metres from the quiet Les Deveses beach. Free parking, great for families. Book direct with Casa Moya, no commission.",
      es: "Alquila un apartamento con vistas al mar en Denia, a 90 metros de la tranquila playa de Les Deveses. Aparcamiento gratuito, ideal para familias. Reserva directa con Casa Moya, sin comisión.",
      it: "Affitta un appartamento vista mare a Denia, a 90 metri dalla tranquilla spiaggia di Les Deveses. Parcheggio gratuito, ideale per famiglie. Prenota diretto con Casa Moya, senza commissioni.",
      de: "Mieten Sie eine Wohnung mit Meerblick in Denia, 90 Meter vom ruhigen Strand Les Deveses entfernt. Kostenlose Parkplätze, ideal für Familien. Direkt bei Casa Moya buchen, ohne Provision."
    },
    intro: {
      nl: "Les Deveses is het rustigste strand van Denia - fijn zand, kalm water en volop ruimte, zonder de drukte van de stadsstranden. Casa Moya Seaview Apartment Denia ligt op 90 meter van dit strand, met eigen terras en balkon met zeezicht.",
      en: "Les Deveses is Denia's quietest beach - fine sand, calm water and plenty of space, without the crowds of the city beaches. Casa Moya Seaview Apartment Denia is 90 metres from this beach, with its own terrace and sea-view balcony.",
      es: "Les Deveses es la playa más tranquila de Denia - arena fina, aguas calmas y mucho espacio, sin las aglomeraciones de las playas de la ciudad. Casa Moya Seaview Apartment Denia está a 90 metros de esta playa, con terraza propia y balcón con vistas al mar.",
      it: "Les Deveses è la spiaggia più tranquilla di Denia - sabbia fine, acque calme e molto spazio, senza la folla delle spiagge cittadine. Casa Moya Seaview Apartment Denia si trova a 90 metri da questa spiaggia, con terrazza propria e balcone vista mare.",
      de: "Les Deveses ist der ruhigste Strand von Denia - feiner Sand, ruhiges Wasser und viel Platz, ohne den Trubel der Stadtstrände. Casa Moya Seaview Apartment Denia liegt 90 Meter von diesem Strand entfernt, mit eigener Terrasse und Balkon mit Meerblick."
    },
    sections: {
      nl: [
        {
          heading: "Ligging en bereikbaarheid",
          body: "Les Deveses ligt zo'n 10 km van het centrum van Denia, aan de rustige noordkant van de stad. Er is gratis straatparkeren rondom het strand, en in de zomer rijdt er een bus tussen het centrum van Denia en Les Deveses."
        },
        {
          heading: "Geschikt voor gezinnen",
          body: "Het strand heeft kalm, ondiep water, houten loopplanken, een EHBO-post van het Rode Kruis en toezicht - ideaal voor gezinnen met jonge kinderen. 's Zomers ligt er ook een opblaasbaar speelplatform in zee."
        },
        {
          heading: "Beste periode om te boeken",
          body: "Denia is vrijwel het hele jaar aangenaam, maar juli en augustus zijn het populairst. Voor rustiger strand en nog steeds warm weer zijn juni en september een goede keuze; boek ruim van tevoren voor het hoogseizoen."
        },
        {
          heading: "Waarom rechtstreeks boeken bij Casa Moya",
          body: "Geen commissie voor Airbnb of Booking.com, persoonlijk contact met de eigenaar, en altijd de beste directe prijs voor hetzelfde appartement."
        }
      ],
      en: [
        {
          heading: "Location and getting around",
          body: "Les Deveses is about 10 km from Denia's town centre, on the quiet north side of the city. There's free street parking around the beach, and a summer bus connects Denia's centre with Les Deveses."
        },
        {
          heading: "Good for families",
          body: "The beach has calm, shallow water, wooden boardwalks, a Red Cross first-aid post and lifeguard cover - ideal for families with young children. In summer there's also an inflatable play platform in the sea."
        },
        {
          heading: "Best time to book",
          body: "Denia is pleasant nearly year-round, but July and August are the most popular. For a quieter beach with still-warm weather, June and September are great choices; book well ahead for high season."
        },
        {
          heading: "Why book direct with Casa Moya",
          body: "No commission for Airbnb or Booking.com, personal contact with the owner, and always the best direct rate for the same apartment."
        }
      ],
      es: [
        {
          heading: "Ubicación y cómo moverte",
          body: "Les Deveses está a unos 10 km del centro de Denia, en la tranquila zona norte de la ciudad. Hay aparcamiento gratuito en las calles alrededor de la playa, y en verano un autobús conecta el centro de Denia con Les Deveses."
        },
        {
          heading: "Ideal para familias",
          body: "La playa tiene aguas calmas y poco profundas, pasarelas de madera, un puesto de primeros auxilios de Cruz Roja y vigilancia - ideal para familias con niños pequeños. En verano también hay una plataforma inflable en el mar."
        },
        {
          heading: "Mejor época para reservar",
          body: "Denia es agradable casi todo el año, pero julio y agosto son los meses más populares. Para una playa más tranquila con clima aún cálido, junio y septiembre son buenas opciones; reserva con antelación para la temporada alta."
        },
        {
          heading: "Por qué reservar directamente con Casa Moya",
          body: "Sin comisión de Airbnb o Booking.com, contacto personal con el propietario, y siempre el mejor precio directo para el mismo apartamento."
        }
      ],
      it: [
        {
          heading: "Posizione e spostamenti",
          body: "Les Deveses dista circa 10 km dal centro di Denia, nella tranquilla zona nord della città. C'è parcheggio gratuito in strada intorno alla spiaggia, e in estate un autobus collega il centro di Denia con Les Deveses."
        },
        {
          heading: "Ideale per le famiglie",
          body: "La spiaggia ha acque calme e poco profonde, passerelle in legno, un posto di primo soccorso della Croce Rossa e sorveglianza - ideale per famiglie con bambini piccoli. In estate c'è anche una piattaforma gonfiabile in mare."
        },
        {
          heading: "Il momento migliore per prenotare",
          body: "Denia è piacevole quasi tutto l'anno, ma luglio e agosto sono i mesi più richiesti. Per una spiaggia più tranquilla con clima ancora caldo, giugno e settembre sono un'ottima scelta; prenota con anticipo per l'alta stagione."
        },
        {
          heading: "Perché prenotare direttamente con Casa Moya",
          body: "Nessuna commissione per Airbnb o Booking.com, contatto personale con il proprietario, e sempre il miglior prezzo diretto per lo stesso appartamento."
        }
      ],
      de: [
        {
          heading: "Lage und Erreichbarkeit",
          body: "Les Deveses liegt etwa 10 km vom Zentrum Denias entfernt, an der ruhigen Nordseite der Stadt. Rund um den Strand gibt es kostenlose Straßenparkplätze, und im Sommer verbindet ein Bus das Zentrum Denias mit Les Deveses."
        },
        {
          heading: "Gut für Familien",
          body: "Der Strand hat ruhiges, flaches Wasser, Holzstege, eine Erste-Hilfe-Station des Roten Kreuzes und Aufsicht - ideal für Familien mit kleinen Kindern. Im Sommer gibt es zudem eine aufblasbare Spielplattform im Meer."
        },
        {
          heading: "Beste Buchungszeit",
          body: "Denia ist fast das ganze Jahr über angenehm, aber Juli und August sind am beliebtesten. Für einen ruhigeren Strand bei weiterhin warmem Wetter sind Juni und September gute Optionen; buchen Sie für die Hochsaison rechtzeitig im Voraus."
        },
        {
          heading: "Warum direkt bei Casa Moya buchen",
          body: "Keine Provision für Airbnb oder Booking.com, persönlicher Kontakt mit dem Eigentümer, und immer der beste Direktpreis für dieselbe Wohnung."
        }
      ]
    },
    faq: {
      nl: [
        { q: "Hoe ver is het strand vanaf het appartement?", a: "Het strand van Les Deveses ligt op 90 meter, letterlijk om de hoek." },
        { q: "Is er parkeren bij het appartement?", a: "Ja, er is gratis parkeren op eigen terrein en volop gratis straatparkeren rond het strand." },
        { q: "Is Les Deveses geschikt voor kinderen?", a: "Ja - kalm water, een opblaasbaar speelplatform in de zomer en toezicht op het strand maken het een van de meest gezinsvriendelijke stranden van Denia." },
        { q: "Hoe ver is het centrum van Denia?", a: "Ongeveer 10 km; in de zomer rijdt er een bus tussen Les Deveses en het centrum." }
      ],
      en: [
        { q: "How far is the beach from the apartment?", a: "Les Deveses beach is 90 metres away, literally around the corner." },
        { q: "Is there parking at the apartment?", a: "Yes - free on-site parking, plus plenty of free street parking around the beach." },
        { q: "Is Les Deveses good for children?", a: "Yes - calm water, a summer inflatable play platform and lifeguard cover make it one of Denia's most family-friendly beaches." },
        { q: "How far is Denia's town centre?", a: "About 10 km; a summer bus connects Les Deveses with the centre." }
      ],
      es: [
        { q: "¿A qué distancia está la playa del apartamento?", a: "La playa de Les Deveses está a 90 metros, literalmente a la vuelta de la esquina." },
        { q: "¿Hay aparcamiento en el apartamento?", a: "Sí - aparcamiento gratuito en la propia propiedad, además de mucho aparcamiento gratuito en la calle alrededor de la playa." },
        { q: "¿Es Les Deveses adecuada para niños?", a: "Sí - aguas calmas, una plataforma inflable en verano y vigilancia hacen que sea una de las playas más familiares de Denia." },
        { q: "¿A qué distancia está el centro de Denia?", a: "Unos 10 km; en verano un autobús conecta Les Deveses con el centro." }
      ],
      it: [
        { q: "Quanto dista la spiaggia dall'appartamento?", a: "La spiaggia di Les Deveses è a 90 metri, letteralmente dietro l'angolo." },
        { q: "C'è parcheggio presso l'appartamento?", a: "Sì - parcheggio gratuito in loco, oltre a molto parcheggio gratuito in strada intorno alla spiaggia." },
        { q: "Les Deveses è adatta ai bambini?", a: "Sì - acque calme, una piattaforma gonfiabile estiva e sorveglianza la rendono una delle spiagge più adatte alle famiglie di Denia." },
        { q: "Quanto dista il centro di Denia?", a: "Circa 10 km; in estate un autobus collega Les Deveses al centro." }
      ],
      de: [
        { q: "Wie weit ist der Strand von der Wohnung entfernt?", a: "Der Strand von Les Deveses liegt 90 Meter entfernt, buchstäblich um die Ecke." },
        { q: "Gibt es Parkplätze bei der Wohnung?", a: "Ja - kostenlose Parkplätze auf dem eigenen Grundstück sowie viele kostenlose Straßenparkplätze rund um den Strand." },
        { q: "Ist Les Deveses gut für Kinder geeignet?", a: "Ja - ruhiges Wasser, eine sommerliche aufblasbare Spielplattform und Aufsicht machen ihn zu einem der familienfreundlichsten Strände Denias." },
        { q: "Wie weit ist das Zentrum von Denia entfernt?", a: "Etwa 10 km; im Sommer verbindet ein Bus Les Deveses mit dem Zentrum." }
      ]
    }
  }
];

export function getAreaGuide(slug: string) {
  return areaGuides.find((g) => g.slug === slug);
}

// Looks up a guide by its locale-specific URL slug, e.g. "vakantievilla-moraira" (nl).
export function getAreaGuideByLocaleSlug(locale: Locale, localeSlug: string) {
  return areaGuides.find((g) => g.slugs[locale] === localeSlug);
}

export function getAreaGuideHref(locale: Locale, guide: AreaGuide) {
  return `/${locale}/${guide.slugs[locale]}`;
}
