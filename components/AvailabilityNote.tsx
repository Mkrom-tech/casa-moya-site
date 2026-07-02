import type { Locale, Property } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";

// Placeholder for a real availability calendar. Once the property's
// icalUrls (in lib/properties.ts) point to the Airbnb/Booking.com .ics
// export links, this can be replaced with a calendar that fetches and
// merges those feeds server-side to grey out booked dates.
export default function AvailabilityNote({
  locale,
  property
}: {
  locale: Locale;
  property: Property;
}) {
  const dict = getDictionary(locale);
  const wired = property.icalUrls.length > 0;

  return (
    <div className="rounded-xl border border-charcoal/10 bg-white p-5">
      <h3 className="mb-2 font-display text-lg text-ink">
        {dict.property.availabilityTitle}
      </h3>
      {wired ? (
        <p className="text-sm text-charcoal/70">
          Live kalender volgt hier zodra de iCal-koppeling is ingebouwd.
        </p>
      ) : (
        <p className="text-sm text-charcoal/70">
          {locale === "nl"
            ? "Koppel hier de Airbnb- en Booking.com-kalender (iCal) zodat gasten altijd de actuele beschikbaarheid zien en dubbele boekingen onmogelijk zijn."
            : "Connect the Airbnb and Booking.com calendars (iCal) here so guests always see live availability and double bookings are impossible."}
        </p>
      )}
    </div>
  );
}
