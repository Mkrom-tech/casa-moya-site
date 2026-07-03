import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { properties, type Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import { areaGuides, getAreaGuideHref } from "@/lib/areaGuides";
import { getPropertyReviews } from "@/lib/testimonials";
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
        className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 sm:grid-cols-2"
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.slug}
            property={property}
            locale={params.locale}
          />
        ))}
      </section>

      <section className="mx-auto max-w-5xl space-y-4 px-6 pb-16">
        {properties.map((property) => {
          const reviews = getPropertyReviews(property.slug);
          if (!reviews) return null;
          const quote = reviews.testimonials[0];
          return (
            <Link
              key={property.slug}
              href={`/${params.locale}/properties/${property.slug}`}
              className="flex aspect-[16/3] w-full items-center gap-6 overflow-hidden rounded-2xl border-2 border-gold bg-white p-6 transition hover:shadow-lg"
            >
              <div className="shrink-0 text-center">
                <div className="font-display text-2xl text-ink">
                  {reviews.aggregateRating.ratingValue}/{reviews.aggregateRating.bestRating}
                </div>
                <div className="text-xs text-charcoal/50">
                  {reviews.aggregateRating.reviewCount} {dict.property.reviewsSource}{" "}
                  {reviews.aggregateRating.source}
                </div>
              </div>
              <blockquote className="flex-1 text-sm italic text-charcoal/80 sm:text-base">
                &ldquo;{quote.text}&rdquo;
                <footer className="mt-1 text-xs not-italic text-charcoal/50">
                  — {quote.author}, {property.name}
                </footer>
              </blockquote>
            </Link>
          );
        })}
      </section>

      <section className="border-y border-charcoal/10 bg-white/60 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-display text-2xl text-ink">
            {dict.homeExtra.whyTitle}
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <h3 className="font-display text-lg text-ink">{dict.homeExtra.why1Title}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{dict.homeExtra.why1Body}</p>
            </div>
            <div className="text-center">
              <h3 className="font-display text-lg text-ink">{dict.homeExtra.why2Title}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{dict.homeExtra.why2Body}</p>
            </div>
            <div className="text-center">
              <h3 className="font-display text-lg text-ink">{dict.homeExtra.why3Title}</h3>
              <p className="mt-2 text-sm text-charcoal/70">{dict.homeExtra.why3Body}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center font-display text-2xl text-ink">
          {dict.homeExtra.guidesTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-charcoal/70">
          {dict.homeExtra.guidesSubtitle}
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {areaGuides.map((guide) => {
            const isMoraira = guide.slug === "moraira";
            return (
              <Link
                key={guide.slug}
                href={getAreaGuideHref(params.locale, guide)}
                className="group block overflow-hidden rounded-2xl border border-charcoal/10 bg-white transition hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-charcoal/10">
                  <Image
                    src={guide.heroImage}
                    alt={guide.title[params.locale]}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-ink">
                    {isMoraira ? dict.homeExtra.guideMoraira : dict.homeExtra.guideDenia}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal/70">
                    {isMoraira ? dict.homeExtra.guideMorairaDesc : dict.homeExtra.guideDeniaDesc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
