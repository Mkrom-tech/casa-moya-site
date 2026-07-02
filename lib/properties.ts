export type Locale = "nl" | "en" | "es" | "it";

export interface Property {
  slug: string;
  name: string;
  location: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  pricePerNight: number;
  heroImage: string;
  images: string[];
  amenities: Record<Locale, string[]>;
  description: Record<Locale, string>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
  // Fill in with the real .ics export URL from Airbnb / Booking.com
  // (Airbnb: Calendar > Availability > "Export calendar";
  //  Booking.com: Extranet > Calendar > Sync calendars)
  icalUrls: string[];
}

export const properties: Property[] = [
  {
    slug: "casa-moya-moraira",
    name: "Casa Moya Moraira",
    location: "Moraira / Teulada, Costa Blanca",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    pricePerNight: 150,
    heroImage: "/images/moraira-1.jpg",
    images: Array.from({ length: 28 }, (_, i) => `/images/moraira-${i + 1}.jpg`),
    amenities: {
      nl: [
        "Privézwembad",
        "Zeezicht",
        "Tuin",
        "Balkon",
        "Airco",
        "Wifi",
        "Wasmachine",
        "Vaatwasser",
        "Satelliet-tv"
      ],
      en: [
        "Private pool",
        "Sea view",
        "Garden",
        "Balcony",
        "Air conditioning",
        "Wifi",
        "Washing machine",
        "Dishwasher",
        "Satellite TV"
      ],
      es: [
        "Piscina privada",
        "Vistas al mar",
        "Jardín",
        "Balcón",
        "Aire acondicionado",
        "Wifi",
        "Lavadora",
        "Lavavajillas",
        "TV vía satélite"
      ],
      it: [
        "Piscina privata",
        "Vista mare",
        "Giardino",
        "Balcone",
        "Aria condizionata",
        "Wifi",
        "Lavatrice",
        "Lavastoviglie",
        "TV satellitare"
      ]
    },
    description: {
      nl: "Seaview villa in Moraira met privézwembad, tuin en balkon met uitzicht op zee. Licht, ruim en rustig gelegen op 3,2 km van het centrum en 2,1 km van het strand.",
      en: "Seaview villa in Moraira with a private pool, garden, and a sea-view balcony. Light, spacious and quietly located, 3.2 km from the centre and 2.1 km from the beach.",
      es: "Villa con vistas al mar en Moraira, con piscina privada, jardín y balcón con vistas al mar. Luminosa, espaciosa y tranquila, a 3,2 km del centro y a 2,1 km de la playa.",
      it: "Villa vista mare a Moraira con piscina privata, giardino e balcone con vista sul mare. Luminosa, spaziosa e tranquilla, a 3,2 km dal centro e a 2,1 km dalla spiaggia."
    },
    metaTitle: {
      nl: "Villa met privézwembad en zeezicht huren in Moraira",
      en: "Villa with Private Pool & Sea View for Rent in Moraira",
      es: "Villa con piscina privada y vistas al mar en alquiler en Moraira",
      it: "Villa con piscina privata e vista mare in affitto a Moraira"
    },
    metaDescription: {
      nl: "Vakantievilla in Moraira/Teulada met privézwembad, tuin en zeezicht. 4 gasten, 2 slaapkamers, 2,1 km van het strand. Boek rechtstreeks bij de eigenaar, geen commissie of boekingskosten.",
      en: "Vacation villa in Moraira/Teulada with private pool, garden and sea views. Sleeps 4, 2 bedrooms, 2.1 km from the beach. Book direct with the owner — no commission, no booking fees.",
      es: "Villa de vacaciones en Moraira/Teulada con piscina privada, jardín y vistas al mar. 4 huéspedes, 2 dormitorios, a 2,1 km de la playa. Reserva directamente con el propietario, sin comisiones ni gastos de reserva.",
      it: "Villa vacanze a Moraira/Teulada con piscina privata, giardino e vista mare. 4 ospiti, 2 camere da letto, a 2,1 km dalla spiaggia. Prenota direttamente con il proprietario, senza commissioni né spese di prenotazione."
    },
    icalUrls: [
      "https://ical.booking.com/v1/export?t=29a54afe-d090-4eec-8193-755dd760fa8c",
      "https://www.airbnb.com/calendar/ical/53103651.ics?t=6aeed9c315c24079bfe59c4668b668fc"
    ]
  },
  {
    slug: "moya-apartment-denia",
    name: "Casa Moya Seaview Apartment Denia",
    location: "Denia (Les Deveses), Costa Blanca",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    pricePerNight: 115,
    heroImage: "/images/denia-1.jpg",
    images: Array.from({ length: 24 }, (_, i) => `/images/denia-${i + 1}.jpg`),
    amenities: {
      nl: [
        "Vlak bij strand (90 m)",
        "Zeezicht",
        "Terras",
        "Balkon",
        "Gratis parkeren",
        "Wifi",
        "Fietsenstalling"
      ],
      en: [
        "Steps from the beach (90 m)",
        "Sea view",
        "Terrace",
        "Balcony",
        "Free parking",
        "Wifi",
        "Bicycle parking"
      ],
      es: [
        "A pasos de la playa (90 m)",
        "Vistas al mar",
        "Terraza",
        "Balcón",
        "Aparcamiento gratuito",
        "Wifi",
        "Aparcamiento para bicicletas"
      ],
      it: [
        "A pochi passi dalla spiaggia (90 m)",
        "Vista mare",
        "Terrazza",
        "Balcone",
        "Parcheggio gratuito",
        "Wifi",
        "Posto bici"
      ]
    },
    description: {
      nl: "Appartement met zeezicht in Denia, op 90 meter van het strand van Les Deveses. Terras en balkon met zeezicht, gratis parkeren op eigen terrein.",
      en: "Sea-view apartment in Denia, just 90 metres from Les Deveses beach. Terrace and balcony with sea views, free on-site parking.",
      es: "Apartamento con vistas al mar en Denia, a solo 90 metros de la playa de Les Deveses. Terraza y balcón con vistas al mar, aparcamiento gratuito en la propiedad.",
      it: "Appartamento vista mare a Denia, a soli 90 metri dalla spiaggia di Les Deveses. Terrazza e balcone con vista mare, parcheggio gratuito in loco."
    },
    metaTitle: {
      nl: "Appartement huren bij strand Les Deveses, Denia",
      en: "Apartment for Rent near Les Deveses Beach, Denia",
      es: "Apartamento en alquiler cerca de la playa de Les Deveses, Denia",
      it: "Appartamento in affitto vicino alla spiaggia di Les Deveses, Denia"
    },
    metaDescription: {
      nl: "Appartement met zeezicht in Denia, 90 meter van het strand van Les Deveses. 4 gasten, 2 slaapkamers, gratis parkeren. Boek rechtstreeks bij de eigenaar, geen commissie.",
      en: "Sea-view apartment in Denia, just 90 metres from Les Deveses beach. Sleeps 4, 2 bedrooms, free parking. Book direct with the owner — no commission.",
      es: "Apartamento con vistas al mar en Denia, a 90 metros de la playa de Les Deveses. 4 huéspedes, 2 dormitorios, aparcamiento gratuito. Reserva directamente con el propietario, sin comisiones.",
      it: "Appartamento vista mare a Denia, a 90 metri dalla spiaggia di Les Deveses. 4 ospiti, 2 camere da letto, parcheggio gratuito. Prenota direttamente con il proprietario, senza commissioni."
    },
    icalUrls: [
      "https://www.airbnb.com/calendar/ical/1118123648822104746.ics?t=3c0a0aad03e04920a23280f11f34a279",
      "https://ical.booking.com/v1/export?t=771a8bf5-3572-4c01-b900-4c7cee5117f4"
    ]
  }
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}
