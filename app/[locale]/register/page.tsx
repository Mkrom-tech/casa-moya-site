import type { Metadata } from "next";
import { properties, type Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import RegistrationForm from "@/components/RegistrationForm";

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
    title: dict.register.pageTitle,
    robots: { index: false, follow: false }
  };
}

export default function RegisterPage({
  params,
  searchParams
}: {
  params: { locale: Locale };
  searchParams: { property?: string };
}) {
  const dict = getDictionary(params.locale);

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-3xl text-ink">{dict.register.pageTitle}</h1>
      <p className="mt-2 text-charcoal/70">{dict.register.pageSubtitle}</p>

      <div className="mt-8 rounded-2xl border border-charcoal/10 bg-white p-6">
        <RegistrationForm
          locale={params.locale}
          properties={properties.map((p) => ({ slug: p.slug, name: p.name }))}
          initialSlug={searchParams.property}
        />
      </div>
    </div>
  );
}
