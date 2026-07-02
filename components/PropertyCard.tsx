import Link from "next/link";
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
      <div className="aspect-[4/3] w-full overflow-hidden bg-charcoal/10">
        {/* Replace with real photos in /public/images */}
        <img
          src={property.heroImage}
          alt={property.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
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
          &euro;{property.pricePerNight} {dict.property.perNight}
        </p>
      </div>
    </Link>
  );
}
