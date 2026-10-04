import type { Event } from "@/types/strapi";

// Event dates are calendar dates, so format them in UTC to keep the visitor's
// time zone from moving them to the day before.
const calendarDateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeZone: "UTC",
});

/** Formats a YYYY-MM-DD date as, for example, "November 28, 2026". */
export function formatCalendarDate(date: string): string {
  return calendarDateFormat.format(new Date(date));
}

/** The editor's "when" text, or the event's date or date range. */
export function describeEventDates({
  startDate,
  endDate,
  when,
}: Pick<Event, "startDate" | "endDate" | "when">): string {
  if (when) return when;
  if (!endDate) return formatCalendarDate(startDate);
  return calendarDateFormat.formatRange(new Date(startDate), new Date(endDate));
}
