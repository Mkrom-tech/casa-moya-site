import { NextResponse } from "next/server";
import { Resend } from "resend";

// Guest registration (Spanish "parte de viajeros" requirement). Submissions
// — including passport copy and signature photos — are emailed directly to
// the owner via Resend as attachments. Nothing is stored on the server or in
// any database; the request body is processed in memory only.
//
// Requires the same env vars as /api/inquiry:
//   RESEND_API_KEY, INQUIRY_NOTIFY_EMAIL (optional), INQUIRY_FROM_EMAIL (optional)
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_EMAIL = process.env.INQUIRY_NOTIFY_EMAIL || "manonloont@gmail.com";
const FROM_EMAIL = process.env.INQUIRY_FROM_EMAIL || "Casa Moya <onboarding@resend.dev>";

const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4 MB combined across all attachments
const MIN_FILL_TIME_MS = 1500;

export async function POST(req: Request) {
  const formData = await req.formData();

  // Honeypot: bots tend to fill every field, including this hidden one.
  // Pretend success so we don't tip them off.
  if (formData.get("companyWebsite")) {
    return NextResponse.json({ ok: true });
  }

  // Minimum time-on-page: a real person can't fill this form in under
  // ~1.5s, so anything faster (or missing the timestamp entirely, which
  // happens when a bot posts directly without loading the page) is spam.
  const loadedAt = Number(formData.get("formLoadedAt"));
  if (!loadedAt || Date.now() - loadedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true });
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const dateOfBirth = formData.get("dateOfBirth");
  const passportNumber = formData.get("passportNumber");
  const passportExpiry = formData.get("passportExpiry");
  const propertySlug = formData.get("propertySlug");

  if (
    !name ||
    !email ||
    !phone ||
    !dateOfBirth ||
    !passportNumber ||
    !passportExpiry ||
    !propertySlug
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const passportFiles = formData.getAll("passportCopy").filter((f): f is File => f instanceof File);
  const signatureFiles = formData.getAll("signature").filter((f): f is File => f instanceof File);
  const allFiles = [...passportFiles, ...signatureFiles];

  if (allFiles.length === 0) {
    return NextResponse.json({ error: "Missing files" }, { status: 400 });
  }

  const totalSize = allFiles.reduce((sum, f) => sum + f.size, 0);
  if (totalSize > MAX_TOTAL_BYTES) {
    return NextResponse.json({ error: "Files too large" }, { status: 413 });
  }

  console.log("New guest registration:", {
    propertySlug,
    name,
    email,
    phone,
    dateOfBirth,
    passportNumber,
    passportExpiry,
    files: allFiles.map((f) => f.name)
  });

  if (resend) {
    try {
      const attachments = await Promise.all(
        allFiles.map(async (file) => ({
          filename: file.name || "bestand",
          content: Buffer.from(await file.arrayBuffer())
        }))
      );

      await resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFY_EMAIL,
        replyTo: String(email),
        subject: `Gastregistratie — ${propertySlug}`,
        text: [
          `Woning: ${propertySlug}`,
          `Naam: ${name}`,
          `E-mail: ${email}`,
          `Telefoon: ${phone}`,
          `Geboortedatum: ${dateOfBirth}`,
          `Paspoortnummer: ${passportNumber}`,
          `Vervaldatum paspoort: ${passportExpiry}`
        ].join("\n"),
        attachments
      });
    } catch (err) {
      console.error("Failed to send registration email:", err);
      return NextResponse.json({ error: "Email failed" }, { status: 500 });
    }
  } else {
    console.warn(
      "RESEND_API_KEY not set — registration was logged but no email was sent."
    );
  }

  return NextResponse.json({ ok: true });
}
