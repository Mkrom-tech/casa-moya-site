export interface BusyRange {
  start: string;
  end: string;
}

function parseIcs(text: string): BusyRange[] {
  const unfolded = text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
  const lines = unfolded.split("\n");
  const ranges: BusyRange[] = [];
  let inEvent = false;
  let start: string | null = null;
  let end: string | null = null;

  const toIso = (raw: string) => {
    const digits = raw.replace(/[^0-9]/g, "");
    const y = digits.slice(0, 4);
    const m = digits.slice(4, 6);
    const d = digits.slice(6, 8);
    if (!y || !m || !d) return null;
    return `${y}-${m}-${d}`;
  };

  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) {
      inEvent = true;
      start = null;
      end = null;
      continue;
    }
    if (line.startsWith("END:VEVENT")) {
      if (start && end) ranges.push({ start, end });
      inEvent = false;
      continue;
    }
    if (!inEvent) continue;

    if (line.startsWith("DTSTART")) {
      const value = line.split(":")[1];
      if (value) start = toIso(value);
    } else if (line.startsWith("DTEND")) {
      const value = line.split(":")[1];
      if (value) end = toIso(value);
    }
  }

  return ranges;
}

export async function getBusyRanges(urls: string[]): Promise<BusyRange[]> {
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (!res.ok) throw new Error(`iCal fetch failed: ${res.status}`);
      const text = await res.text();
      return parseIcs(text);
    })
  );

  const all: BusyRange[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") all.push(...r.value);
  }
  return all;
}
