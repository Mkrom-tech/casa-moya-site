import Link from "next/link";
import type { Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const other = locale === "nl" ? "en" : "nl";

  return (
    <header className="border-b border-charcoal/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2 font-display text-xl tracking-tight text-ink"
        >
          <img src="/logo-mark.svg" alt="" className="h-8 w-8" />
          {dict.siteName}
        </Link>
        <nav className="flex items-center gap-6 text-sm text-charcoal">
          <Link href={`/${locale}#properties`}>{dict.nav.properties}</Link>
          <Link
            href={`/${other}`}
            className="rounded-full border border-charcoal/20 px-3 py-1 uppercase tracking-wide"
          >
            {other}
          </Link>
        </nav>
      </div>
    </header>
  );
}
