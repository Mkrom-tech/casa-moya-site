import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Locale } from "@/lib/properties";

export function generateStaticParams() {
  return [{ locale: "nl" }, { locale: "en" }, { locale: "es" }, { locale: "it" }, { locale: "de" }];
}

// Without this, Next.js tries to render this segment for ANY path value
// (e.g. a stray request to /favicon.ico gets treated as locale="favicon.ico"),
// which crashes with a 500 since that "locale" has no dictionary. Setting
// this to false makes Next.js return a clean 404 for anything outside the
// 5 real locales instead.
export const dynamicParams = false;

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={params.locale} />
      <main className="flex-1">{children}</main>
      <Footer locale={params.locale} />
    </div>
  );
}
