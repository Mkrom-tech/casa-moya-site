import type { Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";
import { LogoMark } from "@/components/Logo";

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="mt-24 border-t border-charcoal/10 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 text-sm text-charcoal/60 sm:flex-row sm:justify-between">
        <LogoMark className="h-10 w-10 shrink-0" />
        <div>
          &copy; {new Date().getFullYear()} {dict.siteName}. {dict.footer.rights}
        </div>
      </div>
    </footer>
  );
}
