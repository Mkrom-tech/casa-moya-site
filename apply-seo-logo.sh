#!/bin/bash
set -e
cd ~/Desktop/seaview-booking

cat > app/layout.tsx << 'EOF'
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.casa-moya.com"),
  title: {
    default: "Casa Moya — Vakantiehuizen Moraira & Denia, boek direct",
    template: "%s | Casa Moya"
  },
  description:
    "Boek rechtstreeks — Casa Moya Moraira en Moya Apartment Denia, Costa Blanca. Geen commissie, altijd de beste prijs.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
EOF

cat > "app/[locale]/page.tsx" << 'EOF'
import type { Metadata } from "next";
import { properties, type Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import PropertyCard from "@/components/PropertyCard";

export function generateStaticParams() {
  return [{ locale: "nl" }, { locale: "en" }];
}

export function generateMetadata({
  params
}: {
  params: { locale: Locale };
}): Metadata {
  const dict = getDictionary(params.locale);
  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    alternates: {
      canonical: `/${params.locale}`,
      languages: { nl: "/nl", en: "/en" }
    },
    openGraph: {
      title: dict.home.metaTitle,
      description: dict.home.metaDescription,
      url: `/${params.locale}`,
      images: ["/images/moraira-1.jpg"],
      locale: params.locale === "nl" ? "nl_NL" : "en_US"
    }
  };
}

export default function HomePage({
  params
}: {
  params: { locale: Locale };
}) {
  const dict = getDictionary(params.locale);

  return (
    <div>
      <section className="mx-auto max-w-5xl px-6 pb-12 pt-16 text-center">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">
          {dict.home.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-charcoal/70">
          {dict.home.subtitle}
        </p>
      </section>
      <section
        id="properties"
        className="mx-auto grid max-w-5xl gap-6 px-6 pb-24 sm:grid-cols-2"
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.slug}
            property={property}
            locale={params.locale}
          />
        ))}
      </section>
    </div>
  );
}
EOF

cat > "app/[locale]/properties/[slug]/page.tsx" << 'EOF'
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties, getProperty, type Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import InquiryForm from "@/components/InquiryForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import Link from "next/link";

export function generateStaticParams() {
  return properties.flatMap((p) =>
    ["nl", "en"].map((locale) => ({ locale, slug: p.slug }))
  );
}

export function generateMetadata({
  params
}: {
  params: { locale: Locale; slug: string };
}): Metadata {
  const property = getProperty(params.slug);
  if (!property) return {};

  const title = property.metaTitle[params.locale];
  const description = property.metaDescription[params.locale];

  return {
    title,
    description,
    alternates: {
      canonical: `/${params.locale}/properties/${property.slug}`,
      languages: {
        nl: `/nl/properties/${property.slug}`,
        en: `/en/properties/${property.slug}`
      }
    },
    openGraph: {
      title,
      description,
      url: `/${params.locale}/properties/${property.slug}`,
      images: [property.heroImage],
      locale: params.locale === "nl" ? "nl_NL" : "en_US"
    }
  };
}

export default function PropertyPage({
  params
}: {
  params: { locale: Locale; slug: string };
}) {
  const property = getProperty(params.slug);
  if (!property) notFound();

  const dict = getDictionary(params.locale);
  const description = property.description[params.locale];
  const amenities = property.amenities[params.locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.name,
    description,
    image: `https://www.casa-moya.com${property.heroImage}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "ES"
    },
    priceRange: `€${property.pricePerNight}`,
    numberOfRooms: property.bedrooms
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href={`/${params.locale}`}
        className="text-sm text-charcoal/60 hover:text-ink"
      >
        &larr; {dict.property.backToOverview}
      </Link>

      <h1 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
        {property.name}
      </h1>
      <p className="mt-1 text-charcoal/70">{property.location}</p>

      <div className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-charcoal/10">
        <img
          src={property.heroImage}
          alt={`${property.name} — ${property.location}`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-8 grid gap-8 sm:grid-cols-3">
        <div className="sm:col-span-2 space-y-8">
          <p className="text-charcoal/80">{description}</p>

          <div>
            <h2 className="mb-3 font-display text-lg text-ink">
              {dict.property.amenitiesTitle}
            </h2>
            <ul className="grid grid-cols-2 gap-2 text-sm text-charcoal/70">
              {amenities.map((a) => (
                <li key={a}>&bull; {a}</li>
              ))}
            </ul>
          </div>

          <AvailabilityCalendar locale={params.locale} slug={property.slug} />
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border border-charcoal/10 bg-white p-4 text-sm text-charcoal/70">
            <p>
              {property.guests} {dict.property.guests} &middot;{" "}
              {property.bedrooms} {dict.property.bedrooms} &middot;{" "}
              {property.bathrooms} {dict.property.bathrooms}
            </p>
            <p className="mt-2 text-lg font-medium text-terracotta">
              &euro;{property.pricePerNight} {dict.property.perNight}
            </p>
          </div>
        </aside>
      </div>

      <div className="mt-12 rounded-2xl border border-charcoal/10 bg-white p-6">
        <h2 className="mb-4 font-display text-xl text-ink">
          {dict.property.inquiryTitle}
        </h2>
        <InquiryForm
          locale={params.locale}
          propertySlug={property.slug}
          propertyName={property.name}
        />
      </div>
    </div>
    </>
  );
}
EOF

cat > app/sitemap.ts << 'EOF'
import type { MetadataRoute } from "next";
import { properties } from "@/lib/properties";

const BASE_URL = "https://www.casa-moya.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["nl", "en"] as const;

  const homeEntries: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1
  }));

  const propertyEntries: MetadataRoute.Sitemap = properties.flatMap((p) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/properties/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8
    }))
  );

  return [...homeEntries, ...propertyEntries];
}
EOF

cat > app/robots.ts << 'EOF'
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://www.casa-moya.com/sitemap.xml"
  };
}
EOF

cat > lib/properties.ts << 'EOF'
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
EOF

cat > lib/dictionaries.ts << 'EOF'
import type { Locale } from "./properties";

export const dictionaries = {
  nl: {
    siteName: "Casa Moya",
    nav: { properties: "Onze huizen", contact: "Contact" },
    home: {
      title: "Twee huizen aan de Costa Blanca",
      subtitle:
        "Boek rechtstreeks bij ons — geen commissie voor Airbnb of Booking.com, en altijd het beste directe tarief.",
      cta: "Bekijk beschikbaarheid",
      metaTitle: "Vakantiehuizen Moraira & Denia — boek direct, zonder commissie",
      metaDescription:
        "Casa Moya Moraira (villa met privézwembad en zeezicht) en Moya Apartment Denia (appartement bij het strand van Les Deveses), Costa Blanca. Boek rechtstreeks bij de eigenaar — altijd de beste prijs, geen boekingskosten."
    },
    property: {
      guests: "gasten",
      bedrooms: "slaapkamers",
      bathrooms: "badkamers",
      perNight: "per nacht",
      amenitiesTitle: "Voorzieningen",
      availabilityTitle: "Beschikbaarheid",
      inquiryTitle: "Boekingsaanvraag",
      backToOverview: "Terug naar overzicht"
    },
    form: {
      name: "Naam",
      email: "E-mailadres",
      checkin: "Aankomst",
      checkout: "Vertrek",
      guests: "Aantal gasten",
      message: "Bericht (optioneel)",
      submit: "Verstuur aanvraag",
      success:
        "Bedankt! Je aanvraag is verstuurd. We nemen binnen 24 uur contact met je op.",
      note: "Dit is een aanvraag, geen definitieve boeking. Je ontvangt persoonlijk bevestiging van ons."
    },
    footer: {
      rights: "Alle rechten voorbehouden."
    }
  },
  en: {
    siteName: "Casa Moya",
    nav: { properties: "Our houses", contact: "Contact" },
    home: {
      title: "Two houses on the Costa Blanca",
      subtitle:
        "Book directly with us — no commission for Airbnb or Booking.com, always our best direct rate.",
      cta: "Check availability",
      metaTitle: "Villa & Apartment Rentals Moraira & Denia — Book Direct",
      metaDescription:
        "Casa Moya Moraira (sea-view villa with private pool) and Moya Apartment Denia (apartment near Les Deveses beach), Costa Blanca. Book directly with the owner — best price guaranteed, no booking fees."
    },
    property: {
      guests: "guests",
      bedrooms: "bedrooms",
      bathrooms: "bathrooms",
      perNight: "per night",
      amenitiesTitle: "Amenities",
      availabilityTitle: "Availability",
      inquiryTitle: "Booking request",
      backToOverview: "Back to overview"
    },
    form: {
      name: "Name",
      email: "Email address",
      checkin: "Check-in",
      checkout: "Check-out",
      guests: "Number of guests",
      message: "Message (optional)",
      submit: "Send request",
      success:
        "Thank you! Your request has been sent. We'll get back to you within 24 hours.",
      note: "This is a request, not a confirmed booking. You'll receive a personal confirmation from us."
    },
    footer: {
      rights: "All rights reserved."
    }
  }
} satisfies Record<Locale, unknown>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
EOF

cat > public/favicon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#1f2a24"/>
  <text x="32" y="42" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="28" fill="#efe8dd">CM</text>
</svg>
EOF

cat > public/logo-mark.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <!-- sun -->
  <circle cx="20" cy="11" r="3.2" fill="#c8813b"/>
  <!-- villa arch -->
  <path d="M11 30V19a9 9 0 0 1 18 0v11" stroke="#1f2a24" stroke-width="2.4" stroke-linecap="round"/>
  <!-- sea waves -->
  <path d="M8 30q3-2.5 6 0t6 0 6 0 6 0" stroke="#c8813b" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M8 34.5q3-2.5 6 0t6 0 6 0 6 0" stroke="#1f2a24" stroke-width="1.6" stroke-linecap="round" opacity="0.35"/>
</svg>
EOF

cat > components/Header.tsx << 'EOF'
import Link from "next/link";
import type { Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const other = locale === "nl" ? "en" : "nl";

  return (
    <header className="border-b border-charcoal/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-display text-xl tracking-tight text-ink"
        >
          <img src="/logo-mark.svg" alt="" className="h-8 w-8" />
          {dict.siteName}
        </Link>
        <nav className="flex items-center gap-6 text-sm text-charcoal">
          <Link href={`/${locale}#properties`}>{dict.nav.properties}</Link>
          <Link
            href={`/${other}`}
            className="rounded-full border border-charcoal/20 px-3 py-1 uppercase tracking-wide"
          >
            {other}
          </Link>
        </nav>
      </div>
    </header>
  );
}
EOF

npm run build

git add .
git commit -m "Add SEO metadata, sitemap, structured data, and logo"
git push

echo ""
echo "KLAAR — als de build hierboven geen fouten toont, staat het over ~40 sec live op casa-moya.com"
