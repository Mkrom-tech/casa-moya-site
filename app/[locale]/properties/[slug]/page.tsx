import { notFound } from "next/navigation";
import { properties, getProperty, type Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import InquiryForm from "@/components/InquiryForm";
import AvailabilityNote from "@/components/AvailabilityNote";
import Link from "next/link";

export function generateStaticParams() {
  return properties.flatMap((p) =>
    ["nl", "en"].map((locale) => ({ locale, slug: p.slug }))
  );
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

  return (
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
          alt={property.name}
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

          <AvailabilityNote locale={params.locale} property={property} />
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
  );
}
