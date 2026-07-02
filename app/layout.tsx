import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

// Google Search Console: paste the verification code Google gives you
// (Search Console > Settings > Ownership verification > HTML tag > just the
// content="..." value) into the NEXT_PUBLIC_GSC_VERIFICATION env var in Vercel.
const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

// Google Analytics 4: paste your Measurement ID (looks like "G-XXXXXXXXXX")
// into the NEXT_PUBLIC_GA_ID env var in Vercel.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.casa-moya.com"),
  title: {
    default: "Casa Moya — Vakantiehuizen Moraira & Denia, boek direct",
    template: "%s | Casa Moya"
  },
  description:
    "Boek rechtstreeks — Casa Moya Villa Moraira en Moya Apartment Denia, Costa Blanca. Geen commissie, altijd de beste prijs.",
  icons: {
    icon: "/favicon.svg"
  },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {})
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
      <body>
        {children}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
