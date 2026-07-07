"use client";

import { useEffect, useState } from "react";

export type HourEntry = {
  day: string;
  time: string;
  open: [number, number] | null;
};

// Verified hours from the UPTOWN knowledge base (oeffnungszeiten):
// Di–Do 16–21 (Küche bis 20:30), Fr–Sa 16–22 (Küche bis 21:30),
// Sonntag + Montag Ruhetag. index 0 = Sonntag (matches Date.getDay()).
export const HOURS: HourEntry[] = [
  { day: "Sonntag", time: "Ruhetag", open: null },
  { day: "Montag", time: "Ruhetag", open: null },
  { day: "Dienstag", time: "16:00 – 21:00", open: [16 * 60, 21 * 60] },
  { day: "Mittwoch", time: "16:00 – 21:00", open: [16 * 60, 21 * 60] },
  { day: "Donnerstag", time: "16:00 – 21:00", open: [16 * 60, 21 * 60] },
  { day: "Freitag", time: "16:00 – 22:00", open: [16 * 60, 22 * 60] },
  { day: "Samstag", time: "16:00 – 22:00", open: [16 * 60, 22 * 60] },
];

export const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

/** Kitchen closes earlier than the house — shown alongside the hours. */
export const KITCHEN_NOTE =
  "Küche: Di–Do bis 20:30 Uhr, Fr–Sa bis 21:30 Uhr · Telefonisch erreichbar ab 15 Uhr";

/** Current weekday + minutes in the restaurant's timezone (Europe/Berlin). */
export function berlinNow(): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Berlin",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(
    get("weekday"),
  );
  return {
    day: dayIndex,
    minutes: parseInt(get("hour"), 10) * 60 + parseInt(get("minute"), 10),
  };
}

export function useOpenState() {
  const [state, setState] = useState<{ day: number; isOpen: boolean } | null>(
    null,
  );

  useEffect(() => {
    const update = () => {
      const { day, minutes } = berlinNow();
      const range = HOURS[day].open;
      setState({
        day,
        isOpen: range !== null && minutes >= range[0] && minutes < range[1],
      });
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  return state;
}
