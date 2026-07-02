export type Locale = "nl" | "en";

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
  amenities: { nl: string[]; en: string[] };
  description: { nl: string; en: string };
  metaTitle: { nl: string; en: string };
  metaDescription: { nl: string; en: string };
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
    pricePerNight: 145, // TODO: vul je echte prijs in
    heroImage: "/images/moraira-1.jpg",
    images: [
      "/images/moraira-1.jpg",
      "/images/moraira-2.jpg",
      "/images/moraira-3.jpg"
    ],
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
      ]
    },
    description: {
      nl: "Seaview villa in Moraira met privézwembad, tuin en balkon met uitzicht op zee. Licht, ruim en rustig gelegen op 3,2 km van het centrum en 2,1 km van het strand.",
      en: "Seaview villa in Moraira with a private pool, garden, and a sea-view balcony. Light, spacious and quietly located, 3.2 km from the centre and 2.1 km from the beach."
    },
    metaTitle: {
      nl: "Villa met privézwembad en zeezicht huren in Moraira",
      en: "Villa with Private Pool & Sea View for Rent in Moraira"
    },
    metaDescription: {
      nl: "Vakantievilla in Moraira/Teulada met privézwembad, tuin en zeezicht. 4 gasten, 2 slaapkamers, 2,1 km van het strand. Boek rechtstreeks bij de eigenaar, geen commissie of boekingskosten.",
      en: "Vacation villa in Moraira/Teulada with private pool, garden and sea views. Sleeps 4, 2 bedrooms, 2.1 km from the beach. Book direct with the owner — no commission, no booking fees."
    },
    icalUrls: [
      "https://ical.booking.com/v1/export?t=29a54afe-d090-4eec-8193-755dd760fa8c",
      "https://www.airbnb.com/calendar/ical/53103651.ics?t=6aeed9c315c24079bfe59c4668b668fc"
    ]
  },
  {
    slug: "moya-apartment-denia",
    name: "Moya Apartment Denia",
    location: "Denia (Les Deveses), Costa Blanca",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    pricePerNight: 110, // TODO: vul je echte prijs in
    heroImage: "/images/denia-1.jpg",
    images: ["/images/denia-1.jpg", "/images/denia-2.jpg"],
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
      ]
    },
    description: {
      nl: "Appartement met zeezicht in Denia, op 90 meter van het strand van Les Deveses. Terras en balkon met zeezicht, gratis parkeren op eigen terrein.",
      en: "Sea-view apartment in Denia, just 90 metres from Les Deveses beach. Terrace and balcony with sea views, free on-site parking."
    },
    metaTitle: {
      nl: "Appartement huren bij strand Les Deveses, Denia",
      en: "Apartment for Rent near Les Deveses Beach, Denia"
    },
    metaDescription: {
      nl: "Appartement met zeezicht in Denia, 90 meter van het strand van Les Deveses. 4 gasten, 2 slaapkamers, gratis parkeren. Boek rechtstreeks bij de eigenaar, geen commissie.",
      en: "Sea-view apartment in Denia, just 90 metres from Les Deveses beach. Sleeps 4, 2 bedrooms, free parking. Book direct with the owner — no commission."
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
