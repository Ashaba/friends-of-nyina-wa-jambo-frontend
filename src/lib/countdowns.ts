import type { Event } from "@/types/strapi";

const DAY_MS = 24 * 60 * 60 * 1000;
const NOVENA_DAYS = 9;

// The feast is celebrated in Kibeho, so a day there decides the count.
const kibehoDateFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Kigali",
});

/** Today's date in Kibeho as YYYY-MM-DD (the en-CA date format). */
export function todayInKibeho(now: Date = new Date()): string {
  return kibehoDateFormat.format(now);
}

/** Whole days from one YYYY-MM-DD date to a later one. */
function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(to) - Date.parse(from)) / DAY_MS);
}

function addDays(date: string, days: number): string {
  return new Date(Date.parse(date) + days * DAY_MS).toISOString().slice(0, 10);
}

export type FeastSeason =
  | {
      kind: "countdown";
      feastDate: string;
      daysUntilFeast: number;
      novenaStartDate: string;
    }
  | { kind: "novena"; feastDate: string; novenaDay: number }
  | { kind: "feastDay"; feastDate: string };

/**
 * Where `today` falls relative to the next Feast of Our Lady of Kibeho on
 * 28 November: counting down, during the nine-day novena before it, or on
 * the feast itself.
 */
export function getFeastSeason(today: string): FeastSeason {
  const year = Number(today.slice(0, 4));
  const thisYearsFeast = `${year}-11-28`;
  const feastDate =
    today > thisYearsFeast ? `${year + 1}-11-28` : thisYearsFeast;
  const daysUntilFeast = daysBetween(today, feastDate);

  if (daysUntilFeast === 0) return { kind: "feastDay", feastDate };
  if (daysUntilFeast <= NOVENA_DAYS) {
    return {
      kind: "novena",
      feastDate,
      novenaDay: NOVENA_DAYS + 1 - daysUntilFeast,
    };
  }
  return {
    kind: "countdown",
    feastDate,
    daysUntilFeast,
    novenaStartDate: addDays(feastDate, -NOVENA_DAYS),
  };
}

export interface UpcomingPilgrimage {
  event: Event;
  daysUntilStart: number;
}

const UPCOMING_PILGRIMAGES_SHOWN = 2;

/** The soonest pilgrimages that have not started by `today`. */
export function getUpcomingPilgrimages(
  events: Event[],
  today: string
): UpcomingPilgrimage[] {
  return events
    .filter((event) => event.type === "Pilgrimage" && event.startDate > today)
    .toSorted((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, UPCOMING_PILGRIMAGES_SHOWN)
    .map((event) => ({
      event,
      daysUntilStart: daysBetween(today, event.startDate),
    }));
}
