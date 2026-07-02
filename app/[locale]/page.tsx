import type { Metadata } from "next";
import { properties, type Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import PropertyCard from "@/components/PropertyCard";

export function generateStaticParams() {
  return [{ locale: "nl" }, { locale: "en" }, { locale: "es" }, { locale: "it" }, { locale: "de" }];
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
      languages: { nl: "/nl", en: "/en", es: "/es", it: "/it", de: "/de" }
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
