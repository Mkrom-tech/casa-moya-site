import type { Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";

export default function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="mt-24 border-t border-charcoal/10 py-8">
      <div className="mx-auto max-w-5xl px-6 text-sm text-charcoal/60">
        &copy; {new Date().getFullYear()} {dict.siteName}. {dict.footer.rights}
      </div>
    </footer>
  );
}
