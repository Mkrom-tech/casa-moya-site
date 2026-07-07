import { NextResponse } from "next/server";
import { getProperty } from "@/lib/properties";
import { getBusyRanges } from "@/lib/ical";

// Without this, Next.js can treat this route as statically optimizable
// (no headers()/cookies()/searchParams used) and serve a frozen snapshot
// from build time instead of re-checking availability. Forcing it dynamic
// means this handler actually re-runs on every request; freshness beyond
// that is then controlled by the fetch-level revalidate window in lib/ical.ts.
export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const property = getProperty(params.slug);
  if (!property) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (property.icalUrls.length === 0) {
    return NextResponse.json({ connected: false, busy: [] });
  }

  const busy = await getBusyRanges(property.icalUrls);
  return NextResponse.json(
    { connected: true, busy },
    { headers: { "Cache-Control": "no-store" } }
  );
}
