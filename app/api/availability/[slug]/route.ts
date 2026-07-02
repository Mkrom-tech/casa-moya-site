import { NextResponse } from "next/server";
import { getProperty } from "@/lib/properties";
import { getBusyRanges } from "@/lib/ical";

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
  return NextResponse.json({ connected: true, busy });
}
