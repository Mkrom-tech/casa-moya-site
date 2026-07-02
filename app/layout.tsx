import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.casa-moya.com"),
  title: {
    default: "Casa Moya — Vakantiehuizen Moraira & Denia, boek direct",
    template: "%s | Casa Moya"
  },
  description:
    "Boek rechtstreeks — Casa Moya Moraira en Moya Apartment Denia, Costa Blanca. Geen commissie, altijd de beste prijs.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
