import { NextResponse } from "next/server";

// MVP: logs the booking request server-side.
// To actually receive these by email, wire up one of:
//   - Resend (resend.com) — a few lines, works great on Vercel
//   - Formspree / Getform — no backend code needed, just point the <form> action at them
//   - Your own SMTP via nodemailer
// See DEPLOYMENT.md in the project root for the exact steps.
export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || !body.email || !body.checkin || !body.checkout) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  console.log("New booking inquiry:", body);

  // TODO: send an email / Slack notification / save to a sheet here.

  return NextResponse.json({ ok: true });
}
