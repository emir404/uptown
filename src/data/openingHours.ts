"use client";

import { useEffect, useState } from "react";
import type { HoursRow } from "@/lib/content";

// The hours themselves live in the CMS (Einstellungen → Öffnungszeiten) and
// reach the components as props; this module only holds the clock logic that
// decides whether the „Jetzt geöffnet“ badge lights up.

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

export function useOpenState(hours: HoursRow[]) {
  const [state, setState] = useState<{ day: number; isOpen: boolean } | null>(
    null,
  );

  useEffect(() => {
    const update = () => {
      const { day, minutes } = berlinNow();
      const range = hours.find((row) => row.dayIndex === day)?.open ?? null;
      setState({
        day,
        isOpen: range !== null && minutes >= range[0] && minutes < range[1],
      });
    };
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, [hours]);

  return state;
}
