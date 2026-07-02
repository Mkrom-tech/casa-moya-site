import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { properties, getProperty, type Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import InquiryForm from "@/components/InquiryForm";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import PhotoGallery from "@/components/PhotoGallery";
import Link from "next/link";

export function generateStaticParams() {
  return properties.flatMap((p) =>
    ["nl", "en", "es", "it"].map((locale) => ({ locale, slug: p.slug }))
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
        en: `/en/properties/${property.slug}`,
        es: `/es/properties/${property.slug}`,
        it: `/it/properties/${property.slug}`
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

          <PhotoGallery
            images={property.images}
            heroImage={property.heroImage}
            alt={property.name}
            title={dict.property.galleryTitle}
          />

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
