import { NextResponse } from "next/server";
import { Resend } from "resend";

// Sends an email notification for every booking inquiry via Resend
// (resend.com). Requires two environment variables set in Vercel:
//   RESEND_API_KEY       — your Resend API key
//   INQUIRY_NOTIFY_EMAIL — where inquiries should be sent (defaults below)
// Optional: INQUIRY_FROM_EMAIL once you've verified casa-moya.com in Resend,
// e.g. "Casa Moya <boekingen@casa-moya.com>". Until then the Resend sandbox
// sender is used, which only works while RESEND_API_KEY belongs to the
// account whose owner email matches INQUIRY_NOTIFY_EMAIL.
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_EMAIL = process.env.INQUIRY_NOTIFY_EMAIL || "manonloont@gmail.com";
const FROM_EMAIL = process.env.INQUIRY_FROM_EMAIL || "Casa Moya <onboarding@resend.dev>";

const MIN_FILL_TIME_MS = 1500;

export async function POST(req: Request) {
  const body = await req.json();

  // Honeypot: bots tend to fill every field, including this hidden one.
  // Pretend success so we don't tip them off.
  if (body.companyWebsite) {
    return NextResponse.json({ ok: true });
  }

  // Minimum time-on-page: a real person can't fill this form in under
  // ~1.5s, so anything faster (or missing the timestamp entirely, which
  // happens when a bot posts directly without loading the page) is spam.
  const loadedAt = Number(body.formLoadedAt);
  if (!loadedAt || Date.now() - loadedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name || !body.email || !body.checkin || !body.checkout || !body.guests) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  console.log("New booking inquiry:", body);

  if (resend) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        replyTo: body.email,
        subject: `Nieuwe boekingsaanvraag: ${body.propertyName || "Casa Moya"}`,
        text: [
          `Woning: ${body.propertyName || body.propertySlug}`,
          `Naam: ${body.name}`,
          `E-mail: ${body.email}`,
          `Aankomst: ${body.checkin}`,
          `Vertrek: ${body.checkout}`,
          `Aantal gasten: ${body.guests}`,
          `Bericht: ${body.message || "-"}`
        ].join("\n")
      });
    } catch (err) {
      // Don't fail the request just because email delivery failed — the
      // inquiry is still logged above and the guest still gets confirmation.
      console.error("Failed to send inquiry email:", err);
    }
  } else {
    console.warn(
      "RESEND_API_KEY not set — inquiry was logged but no email was sent."
    );
  }

  return NextResponse.json({ ok: true });
}
