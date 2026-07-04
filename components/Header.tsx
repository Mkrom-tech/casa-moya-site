import Link from "next/link";
import type { Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import { LogoMark } from "@/components/Logo";

const LOCALES: Locale[] = ["nl", "en", "es", "it", "de", "fr"];

export default function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <header className="border-b border-charcoal/10">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 text-ink"
        >
          <LogoMark className="h-16 w-16 shrink-0" />
          <span className="font-logo text-2xl font-light uppercase tracking-[0.12em]">
            {dict.siteName}
          </span>
        </Link>
        <nav className="text-sm text-charcoal">
          <div className="grid grid-cols-3 gap-1">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className={[
                  "rounded-full border px-2.5 py-1 text-center text-xs uppercase tracking-wide transition",
                  l === locale
                    ? "border-ink bg-ink text-white"
                    : "border-charcoal/20 text-charcoal hover:border-charcoal/40"
                ].join(" ")}
              >
                {l}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
