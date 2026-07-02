interface PhotoGalleryProps {
  images: string[];
  heroImage: string;
  alt: string;
  title: string;
}

export default function PhotoGallery({
  images,
  heroImage,
  alt,
  title
}: PhotoGalleryProps) {
  const rest = images.filter((img) => img !== heroImage);
  if (rest.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 font-display text-lg text-ink">{title}</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {rest.map((img, i) => (
          <a
            key={img}
            href={img}
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-[4/3] overflow-hidden rounded-lg bg-charcoal/10"
          >
            <img
              src={img}
              alt={`${alt} — ${i + 2}`}
              loading="lazy"
              className="h-full w-full object-cover transition hover:scale-105"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
