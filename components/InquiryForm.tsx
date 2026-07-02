"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";

export default function InquiryForm({
  locale,
  propertySlug,
  propertyName
}: {
  locale: Locale;
  propertySlug: string;
  propertyName: string;
}) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [formLoadedAt, setFormLoadedAt] = useState<number | null>(null);

  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Basic bot defense: a honeypot field bots tend to fill in, plus a
    // minimum time-on-page check (real people don't fill a 6-field form
    // in under a second).
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("companyWebsite") as HTMLInputElement)?.value;
    if (honeypot) {
      setStatus("sent");
      return;
    }
    if (!formLoadedAt || Date.now() - formLoadedAt < 1500) {
      setStatus("sent");
      return;
    }

    setStatus("sending");
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, propertySlug, propertyName })
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl bg-ink/5 p-6 text-ink">
        {dict.form.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="formLoadedAt" value={formLoadedAt ?? ""} readOnly />
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <label htmlFor="companyWebsite-inquiry">Company website</label>
        <input
          id="companyWebsite-inquiry"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.form.name}
          </label>
          <input
            required
            name="name"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.form.email}
          </label>
          <input
            required
            type="email"
            name="email"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.form.checkin}
          </label>
          <input
            required
            type="date"
            name="checkin"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.form.checkout}
          </label>
          <input
            required
            type="date"
            name="checkout"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.form.guests}
          </label>
          <input
            required
            type="number"
            min={1}
            name="guests"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-charcoal">
          {dict.form.message}
        </label>
        <textarea
          name="message"
          rows={3}
          className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-terracotta px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {dict.form.submit}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600">{dict.form.error}</p>
      )}
      <p className="text-xs text-charcoal/50">{dict.form.note}</p>
    </form>
  );
}
