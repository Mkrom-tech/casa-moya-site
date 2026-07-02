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
    pricePerNight: 145,
    heroImage: "/images/moraira-1.jpg",
    images: ["/images/moraira-1.jpg", "/images/moraira-2.jpg", "/images/moraira-3.jpg"],
    amenities: {
      nl: ["Privézwembad", "Zeezicht", "Tuin", "Balkon", "Airco", "Wifi", "Wasmachine", "Vaatwasser", "Satelliet-tv"],
      en: ["Private pool", "Sea view", "Garden", "Balcony", "Air conditioning", "Wifi", "Washing machine", "Dishwasher", "Satellite TV"]
    },
    description: {
      nl: "Seaview villa in Moraira met privézwembad, tuin en balkon met uitzicht op zee. Licht, ruim en rustig gelegen op 3,2 km van het centrum en 2,1 km van het strand.",
      en: "Seaview villa in Moraira with a private pool, garden, and a sea-view balcony. Light, spacious and quietly located, 3.2 km from the centre and 2.1 km from the beach."
    },
    icalUrls: []
  },
  {
    slug: "moya-apartment-denia",
    name: "Moya Apartment Denia",
    location: "Denia (Les Deveses), Costa Blanca",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    pricePerNight: 110,
    heroImage: "/images/denia-1.jpg",
    images: ["/images/denia-1.jpg", "/images/denia-2.jpg"],
    amenities: {
      nl: ["Vlak bij strand (90 m)", "Zeezicht", "Terras", "Balkon", "Gratis parkeren", "Wifi", "Fietsenstalling"],
      en: ["Steps from the beach (90 m)", "Sea view", "Terrace", "Balcony", "Free parking", "Wifi", "Bicycle parking"]
    },
    description: {
      nl: "Appartement met zeezicht in Denia, op 90 meter van het strand van Les Deveses. Terras en balkon met zeezicht, gratis parkeren op eigen terrein.",
      en: "Sea-view apartment in Denia, just 90 metres from Les Deveses beach. Terrace and balcony with sea views, free on-site parking."
    },
    icalUrls: []
  }
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}
