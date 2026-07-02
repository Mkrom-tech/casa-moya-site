import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Locale } from "@/lib/properties";

export function generateStaticParams() {
  return [{ locale: "nl" }, { locale: "en" }, { locale: "es" }, { locale: "it" }, { locale: "de" }];
}

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
