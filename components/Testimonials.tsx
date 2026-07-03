import type { PropertyReviews } from "@/lib/testimonials";

export default function Testimonials({
  reviews,
  title,
  sourceLabel
}: {
  reviews: PropertyReviews;
  title: string;
  sourceLabel: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="font-display text-lg text-ink">{title}</h2>
        <span className="text-sm text-charcoal/60">
          {reviews.aggregateRating.ratingValue}/{reviews.aggregateRating.bestRating} &middot;{" "}
          {reviews.aggregateRating.reviewCount} {sourceLabel} {reviews.aggregateRating.source}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.testimonials.map((t) => (
          <blockquote
            key={`${t.author}-${t.source}`}
            className="rounded-xl border border-gold/40 bg-green-50 p-4 text-sm text-charcoal/80"
          >
            <p>&ldquo;{t.text}&rdquo;</p>
            <footer className="mt-3 text-xs text-charcoal/50">
              — {t.author}, {sourceLabel} {t.source}
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
