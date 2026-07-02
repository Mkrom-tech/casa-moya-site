"use client";

import { useState } from "react";
import type { Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";

const MAX_TOTAL_BYTES = 4 * 1024 * 1024; // 4 MB combined, to stay under serverless payload limits

interface PropertyOption {
  slug: string;
  name: string;
}

export default function RegistrationForm({
  locale,
  properties,
  initialSlug
}: {
  locale: Locale;
  properties: PropertyOption[];
  initialSlug?: string;
}) {
  const dict = getDictionary(locale);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "too-large">(
    "idle"
  );

  function totalSize(form: HTMLFormElement) {
    const passportFiles = (form.elements.namedItem("passportCopy") as HTMLInputElement)?.files;
    const signatureFiles = (form.elements.namedItem("signature") as HTMLInputElement)?.files;
    let total = 0;
    if (passportFiles) for (const f of Array.from(passportFiles)) total += f.size;
    if (signatureFiles) for (const f of Array.from(signatureFiles)) total += f.size;
    return total;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (totalSize(form) > MAX_TOTAL_BYTES) {
      setStatus("too-large");
      return;
    }

    setStatus("sending");
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-xl bg-ink/5 p-6 text-ink">{dict.register.success}</div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <div>
        <label className="mb-1 block text-sm text-charcoal">
          {dict.register.propertyLabel}
        </label>
        <select
          required
          name="propertySlug"
          defaultValue={initialSlug || properties[0]?.slug}
          className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
        >
          {properties.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.register.name}
          </label>
          <input
            required
            name="name"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.register.email}
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
            {dict.register.phone}
          </label>
          <input
            required
            type="tel"
            name="phone"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.register.dob}
          </label>
          <input
            required
            type="date"
            name="dateOfBirth"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.register.passportNumber}
          </label>
          <input
            required
            name="passportNumber"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-charcoal">
            {dict.register.passportExpiry}
          </label>
          <input
            required
            type="date"
            name="passportExpiry"
            className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-charcoal">
          {dict.register.passportCopyLabel}
        </label>
        <input
          required
          type="file"
          name="passportCopy"
          multiple
          accept="image/*,.pdf"
          className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-charcoal/50">{dict.register.passportCopyHint}</p>
      </div>

      <div>
        <label className="mb-1 block text-sm text-charcoal">
          {dict.register.signatureLabel}
        </label>
        <input
          required
          type="file"
          name="signature"
          accept="image/*"
          className="w-full rounded-lg border border-charcoal/20 bg-white px-3 py-2 text-sm"
        />
        <p className="mt-1 text-xs text-charcoal/50">{dict.register.signatureHint}</p>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-terracotta px-6 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {dict.register.submit}
      </button>

      {status === "error" && (
        <p className="text-sm text-red-600">{dict.register.error}</p>
      )}
      {status === "too-large" && (
        <p className="text-sm text-red-600">{dict.register.sizeError}</p>
      )}
      <p className="text-xs text-charcoal/50">{dict.register.pageSubtitle}</p>
    </form>
  );
}
