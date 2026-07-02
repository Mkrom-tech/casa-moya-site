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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
