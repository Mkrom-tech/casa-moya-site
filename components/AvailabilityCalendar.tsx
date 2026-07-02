"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";

interface BusyRange {
  start: string;
  end: string;
}

const MONTH_NAMES: Record<Locale, string[]> = {
  nl: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

const WEEKDAYS: Record<Locale, string[]> = {
  nl: ["ma", "di", "wo", "do", "vr", "za", "zo"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
};

function toDateOnly(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isBusy(date: Date, busy: BusyRange[]) {
  const t = toDateOnly(date).getTime();
  return busy.some((r) => {
    const start = new Date(r.start).getTime();
    const end = new Date(r.end).getTime();
    return t >= start && t < end;
  });
}

function MonthGrid({ year, month, busy, locale }: { year: number; month: number; busy: BusyRange[]; locale: Locale }) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = toDateOnly(new Date());

  const cells: (Date | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1))
  ];

  return (
    <div>
      <p className="mb-2 text-sm font-medium text-ink">{MONTH_NAMES[locale][month]} {year}</p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-charcoal/50">
        {WEEKDAYS[locale].map((w) => (<div key={w}>{w}</div>))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const past = date.getTime() < today.getTime();
          const busyDay = isBusy(date, busy);
          return (
            <div key={i} className={["flex h-8 items-center justify-center rounded text-xs", past ? "text-charcoal/20" : busyDay ? "bg-charcoal/10 text-charcoal/30 line-through" : "bg-terracotta/10 text-ink"].join(" ")}>
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AvailabilityCalendar({ locale, slug }: { locale: Locale; slug: string }) {
  const dict = getDictionary(locale);
  const [state, setState] = useState
    | { status: "loading" }
    | { status: "not-connected" }
    | { status: "ready"; busy: BusyRange[] }
    | { status: "error" }
  >({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/availability/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.connected) setState({ status: "not-connected" });
        else setState({ status: "ready", busy: data.busy });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => { cancelled = true; };
  }, [slug]);

  const now = new Date();

  return (
    <div className="rounded-xl border border-charcoal/10 bg-white p-5">
      <h3 className="mb-3 font-display text-lg text-ink">{dict.property.availabilityTitle}</h3>

      {state.status === "loading" && (
        <p className="text-sm text-charcoal/60">{locale === "nl" ? "Beschikbaarheid laden…" : "Loading availability…"}</p>
      )}

      {state.status === "not-connected" && (
        <p className="text-sm text-charcoal/70">
          {locale === "nl"
            ? "Koppel hier de Airbnb- en Booking.com-kalender (iCal) zodat gasten altijd de actuele beschikbaarheid zien en dubbele boekingen onmogelijk zijn."
            : "Connect the Airbnb and Booking.com calendars (iCal) here so guests always see live availability and double bookings are impossible."}
        </p>
      )}

      {state.status === "error" && (
        <p className="text-sm text-charcoal/70">
          {locale === "nl" ? "Kon de kalender nu niet laden. Probeer het later opnieuw." : "Couldn't load the calendar right now. Please try again later."}
        </p>
      )}

      {state.status === "ready" && (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <MonthGrid year={now.getFullYear()} month={now.getMonth()} busy={state.busy} locale={locale} />
            <MonthGrid year={now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear()} month={(now.getMonth() + 1) % 12} busy={state.busy} locale={locale} />
          </div>
          <div className="mt-4 flex gap-4 text-xs text-charcoal/60">
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-terracotta/10" />{locale === "nl" ? "Beschikbaar" : "Available"}</span>
            <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-charcoal/10" />{locale === "nl" ? "Bezet" : "Booked"}</span>
          </div>
        </>
      )}
    </div>
  );
}
