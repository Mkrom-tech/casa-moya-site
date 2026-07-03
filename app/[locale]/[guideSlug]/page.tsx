import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/properties";
import { getProperty } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import { areaGuides, getAreaGuideByLocaleSlug, getAreaGuideHref } from "@/lib/areaGuides";
import { LogoMark } from "@/components/Logo";

const LOCALES: Locale[] = ["nl", "en", "es", "it", "de"];

export function generateStaticParams() {
  return areaGuides.flatMap((guide) =>
    LOCALES.map((locale) => ({ locale, guideSlug: guide.slugs[locale] }))
  );
}

export function generateMetadata({
  params
}: {
  params: { locale: Locale; guideSlug: string };
}): Metadata {
  const guide = getAreaGuideByLocaleSlug(params.locale, params.guideSlug);
  if (!guide) return {};

  const title = guide.metaTitle[params.locale];
  const description = guide.metaDescription[params.locale];
  const languages: Record<string, string> = {};
  LOCALES.forEach((l) => {
    languages[l] = `/${l}/${guide.slugs[l]}`;
  });

  return {
    title,
    description,
    alternates: {
      canonical: getAreaGuideHref(params.locale, guide),
      languages
    },
    openGraph: {
      title,
      description,
      url: getAreaGuideHref(params.locale, guide),
      images: [guide.heroImage],
      locale: params.locale === "nl" ? "nl_NL" : "en_US"
    }
  };
}

export default function AreaGuidePage({
  params
}: {
  params: { locale: Locale; guideSlug: string };
}) {
  const guide = getAreaGuideByLocaleSlug(params.locale, params.guideSlug);
  if (!guide) notFound();

  const dict = getDictionary(params.locale);
  const property = getProperty(guide.relatedPropertySlug);
  const title = guide.title[params.locale];
  const intro = guide.intro[params.locale];
  const sections = guide.sections[params.locale];
  const faq = guide.faq[params.locale];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link href={`/${params.locale}`} className="text-sm text-charcoal/60 hover:text-ink">
          &larr; {dict.property.backToOverview}
        </Link>

        <h1 className="mt-4 font-display text-3xl text-ink sm:text-4xl">{title}</h1>

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-charcoal/10">
          <Image
            src={guide.heroImage}
            alt={title}
            fill
            priority
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
          />
        </div>

        <p className="mt-6 text-charcoal/80">{intro}</p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="mb-2 font-display text-lg text-ink">{section.heading}</h2>
              <p className="text-charcoal/80">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-charcoal/10 bg-white p-6">
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="mb-2 font-display text-lg text-ink">{dict.areaGuide.ctaTitle}</h2>
              {property && (
                <Link
                  href={`/${params.locale}/properties/${property.slug}`}
                  className="inline-block rounded-full bg-terracotta px-6 py-3 font-medium text-white transition hover:opacity-90"
                >
                  {property.name}
                </Link>
              )}
            </div>
            <div className="hidden shrink-0 items-center justify-center sm:flex">
              <LogoMark className="h-20 w-20" />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 font-display text-lg text-ink">{dict.areaGuide.faqTitle}</h2>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q}>
                <p className="font-medium text-ink">{item.q}</p>
                <p className="mt-1 text-charcoal/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
