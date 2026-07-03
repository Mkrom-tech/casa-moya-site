import Link from "next/link";
import Image from "next/image";
import type { Locale, Property } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";

export default function PropertyCard({
  property,
  locale
}: {
  property: Property;
  locale: Locale;
}) {
  const dict = getDictionary(locale);
  return (
    <Link
      href={`/${locale}/properties/${property.slug}`}
      className="group block overflow-hidden rounded-2xl border border-charcoal/10 bg-white transition hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-charcoal/10">
        <Image
          src={property.heroImage}
          alt={property.name}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-5">
        <h3 className="font-display text-lg text-ink">{property.name}</h3>
        <p className="text-sm text-charcoal/70">{property.location}</p>
        <p className="text-sm text-charcoal/70">
          {property.guests} {dict.property.guests} &middot; {property.bedrooms}{" "}
          {dict.property.bedrooms}
        </p>
        <p className="pt-1 font-medium text-terracotta">
          &euro;{property.pricePerNight} {dict.property.perNight}{" "}
          <span className="text-sm font-normal text-charcoal/50">
            {dict.property.avgPriceNote}
          </span>
        </p>
      </div>
    </Link>
  );
}
