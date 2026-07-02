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
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
        {rest.map((img, i) => (
          <a
            key={img}
            href={img}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative z-0 block aspect-[4/3] hover:z-20"
          >
            <img
              src={img}
              alt={`${alt} — ${i + 2}`}
              loading="lazy"
              className="h-full w-full origin-center rounded-lg bg-charcoal/10 object-cover transition-transform duration-300 ease-out group-hover:scale-[2.2] group-hover:shadow-2xl"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
