"use client";

import { useEffect, useState } from "react";

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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const showPrev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + rest.length) % rest.length));
  const showNext = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % rest.length));

  useEffect(() => {
    if (openIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  if (rest.length === 0) return null;

  return (
    <div>
      <h2 className="mb-3 font-display text-lg text-ink">{title}</h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
        {rest.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group relative z-0 block aspect-[4/3] hover:z-20"
          >
            <img
              src={img}
              alt={`${alt} — ${i + 2}`}
              loading="lazy"
              className="h-full w-full origin-center rounded-lg bg-charcoal/10 object-cover transition-transform duration-300 ease-out group-hover:scale-[2.2] group-hover:shadow-2xl"
            />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 text-3xl leading-none text-white/80 transition hover:text-white"
            aria-label="Close"
          >
            &times;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 text-4xl text-white/70 transition hover:text-white sm:left-6"
            aria-label="Previous"
          >
            &#8249;
          </button>
          <img
            src={rest[openIndex]}
            alt={`${alt} — ${openIndex + 2}`}
            className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 text-4xl text-white/70 transition hover:text-white sm:right-6"
            aria-label="Next"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}
