"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/properties";
import { getDictionary } from "@/lib/dictionaries";

interface BusyRange {
  start: string;
  end: string;
}

const MONTHS_TO_SHOW = 6;

const MONTH_NAMES: Record<Locale, string[]> = {
  nl: [
    "januari", "februari", "maart", "april", "mei", "juni",
    "juli", "augustus", "september", "oktober", "november", "december"
  ],
  en: [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ],
  es: [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ],
  it: [
    "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
    "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"
  ],
  de: [
    "Januar", "Februar", "März", "April", "Mai", "Juni",
    "Juli", "August", "September", "Oktober", "November", "Dezember"
  ]
};

const WEEKDAYS: Record<Locale, string[]> = {
  nl: ["ma", "di", "wo", "do", "vr", "za", "zo"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  es: ["lu", "ma", "mi", "ju", "vi", "sá", "do"],
  it: ["lu", "ma", "me", "gi", "ve", "sa", "do"],
  de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
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

function MonthGrid({
  year,
  month,
  busy,
  locale
}: {
  year: number;
  month: number;
  busy: BusyRange[];
  locale: Locale;
}) {
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
      <p className="mb-2 text-sm font-medium text-ink">
        {MONTH_NAMES[locale][month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-charcoal/50">
        {WEEKDAYS[locale].map((w, i) => (
          <div key={i}>{w}</div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const past = date.getTime() < today.getTime();
          const busyDay = isBusy(date, busy);
          return (
            <div
              key={i}
              className={[
                "flex h-8 items-center justify-center rounded text-xs",
                past
                  ? "text-charcoal/20"
                  : busyDay
                  ? "bg-charcoal/10 text-charcoal/30 line-through"
                  : "bg-terracotta/10 text-ink"
              ].join(" ")}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AvailabilityCalendar({
  locale,
  slug
}: {
  locale: Locale;
  slug: string;
}) {
  const dict = getDictionary(locale);
  type CalState = { status: "loading" } | { status: "not-connected" } | { status: "ready"; busy: BusyRange[] } | { status: "error" };
  const [state, setState] = useState<CalState>({ status: "loading" });

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
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const now = new Date();
  const months = Array.from({ length: MONTHS_TO_SHOW }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    return { year: d.getFullYear(), month: d.getMonth() };
  });

  return (
    <div className="rounded-xl border border-charcoal/10 bg-white p-5">
      <h3 className="mb-3 font-display text-lg text-ink">
        {dict.property.availabilityTitle}
      </h3>

      {state.status === "loading" && (
        <p className="text-sm text-charcoal/60">{dict.property.loadingAvailability}</p>
      )}

      {state.status === "not-connected" && (
        <p className="text-sm text-charcoal/70">{dict.property.notConnected}</p>
      )}

      {state.status === "error" && (
        <p className="text-sm text-charcoal/70">{dict.property.calendarError}</p>
      )}

      {state.status === "ready" && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {months.map(({ year, month }) => (
              <MonthGrid
                key={`${year}-${month}`}
                year={year}
                month={month}
                busy={state.busy}
                locale={locale}
              />
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-xs text-charcoal/60">
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-terracotta/10" />
              {dict.property.available}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-3 w-3 rounded bg-charcoal/10" />
              {dict.property.booked}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
