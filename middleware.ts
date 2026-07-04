import { NextRequest, NextResponse } from "next/server";

// Keep in sync with the Locale type in lib/properties.ts.
const SUPPORTED_LOCALES = ["nl", "en", "es", "it", "de", "fr"] as const;
const DEFAULT_LOCALE = "en";

// Parses an Accept-Language header like "en-US,en;q=0.9,nl;q=0.8" into an
// ordered list of 2-letter language codes, most preferred first.
function parseAcceptLanguage(header: string): string[] {
  return header
    .split(",")
    .map((part) => {
      const [rawTag, qPart] = part.trim().split(";q=");
      const quality = qPart ? parseFloat(qPart) : 1;
      const lang = rawTag.split("-")[0].toLowerCase();
      return { lang, quality };
    })
    .sort((a, b) => b.quality - a.quality)
    .map((entry) => entry.lang);
}

function detectLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const preferredLangs = parseAcceptLanguage(acceptLanguage);
  const match = preferredLangs.find((lang) =>
    (SUPPORTED_LOCALES as readonly string[]).includes(lang)
  );
  return match ?? DEFAULT_LOCALE;
}

// Only runs for the bare root ("/"), so it can't interfere with any other
// route. Redirects each visitor to the locale their browser asks for
// (falling back to Dutch), instead of sending everyone to /nl regardless
// of language.
export function middleware(request: NextRequest) {
  const locale = detectLocale(request);
  const response = NextResponse.redirect(new URL(`/${locale}`, request.url), 307);
  // The redirect target depends on the request's Accept-Language header,
  // so tell caches/crawlers not to reuse one visitor's result for another.
  response.headers.set("Vary", "Accept-Language");
  return response;
}

export const config = {
  matcher: "/"
};
