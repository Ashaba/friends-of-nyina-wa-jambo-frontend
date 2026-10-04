import { expect, test } from "vitest";
import {
  getEventCountdown,
  getFeastBannerSeason,
  getFeastSeason,
  getUpcomingPilgrimages,
  todayInKibeho,
} from "./countdowns";
import type { Event } from "@/types/strapi";

test.each([
  [
    "early October",
    "2026-10-03",
    {
      kind: "countdown",
      feastDate: "2026-11-28",
      daysUntilFeast: 56,
      novenaStartDate: "2026-11-19",
    },
  ],
  [
    "the day before the novena",
    "2026-11-18",
    {
      kind: "countdown",
      feastDate: "2026-11-28",
      daysUntilFeast: 10,
      novenaStartDate: "2026-11-19",
    },
  ],
  [
    "the first day of the novena",
    "2026-11-19",
    { kind: "novena", feastDate: "2026-11-28", novenaDay: 1 },
  ],
  [
    "the last day of the novena",
    "2026-11-27",
    { kind: "novena", feastDate: "2026-11-28", novenaDay: 9 },
  ],
  ["the feast", "2026-11-28", { kind: "feastDay", feastDate: "2026-11-28" }],
  [
    "the day after the feast",
    "2026-11-29",
    {
      kind: "countdown",
      feastDate: "2027-11-28",
      daysUntilFeast: 364,
      novenaStartDate: "2027-11-19",
    },
  ],
  [
    "New Year's Eve",
    "2026-12-31",
    {
      kind: "countdown",
      feastDate: "2027-11-28",
      daysUntilFeast: 332,
      novenaStartDate: "2027-11-19",
    },
  ],
])("getFeastSeason on %s", (_scenario, today, season) => {
  // Act & Assert
  expect(getFeastSeason(today)).toEqual(season);
});

test.each([
  ["the last day of September", "2026-09-30", undefined],
  ["1 October", "2026-10-01", "countdown"],
  ["the novena", "2026-11-21", "novena"],
  ["the feast", "2026-11-28", "feastDay"],
  ["the day after the feast", "2026-11-29", undefined],
  ["New Year's Day", "2027-01-01", undefined],
])("getFeastBannerSeason on %s", (_scenario, today, kind) => {
  // Act & Assert
  expect(getFeastBannerSeason(today)?.kind).toBe(kind);
});

test.each([
  [
    "a single-day event tomorrow",
    { startDate: "2026-10-04" },
    { kind: "upcoming", daysUntilStart: 1 },
  ],
  [
    "a multi-day event that starts later",
    { startDate: "2026-12-01", endDate: "2026-12-05" },
    { kind: "upcoming", daysUntilStart: 59 },
  ],
  [
    "an event that starts today",
    { startDate: "2026-10-03" },
    { kind: "startsToday" },
  ],
  [
    "an event on its last day",
    { startDate: "2026-10-01", endDate: "2026-10-03" },
    { kind: "underway" },
  ],
  [
    "a multi-day event that has ended",
    { startDate: "2026-09-25", endDate: "2026-10-02" },
    { kind: "past" },
  ],
  [
    "a single-day event yesterday",
    { startDate: "2026-10-02" },
    { kind: "past" },
  ],
])("getEventCountdown for %s", (_scenario, dates, countdown) => {
  // Act & Assert
  expect(getEventCountdown(dates, "2026-10-03")).toEqual(countdown);
});

test("todayInKibeho when it is already past midnight in Kibeho returns the Kibeho date", () => {
  // Arrange — 23:30 UTC is 01:30 the next day in Kibeho (UTC+2).
  const lateEveningUtc = new Date("2026-11-27T23:30:00Z");

  // Act & Assert
  expect(todayInKibeho(lateEveningUtc)).toBe("2026-11-28");
});

test("todayInKibeho before midnight in Kibeho returns the same date", () => {
  // Act & Assert
  expect(todayInKibeho(new Date("2026-11-27T21:30:00Z"))).toBe("2026-11-27");
});

function event(overrides: Partial<Event>): Event {
  return {
    id: 1,
    title: "Pilgrimage to Kibeho",
    startDate: "2027-03-15",
    time: "Full Day",
    location: "Rwanda",
    type: "Pilgrimage",
    description: "A guided pilgrimage.",
    featured: false,
    ...overrides,
  };
}

test("getUpcomingPilgrimages returns the soonest pilgrimages not yet started, with days to go", () => {
  // Arrange
  const events = [
    event({ id: 1, startDate: "2027-06-01" }),
    event({ id: 2, startDate: "2026-10-03" }),
    event({ id: 3, startDate: "2026-09-01" }),
    event({ id: 4, startDate: "2026-10-04", type: "Retreat" }),
    event({ id: 5, startDate: "2026-12-01" }),
    event({ id: 6, startDate: "2027-03-15" }),
  ];

  // Act
  const upcoming = getUpcomingPilgrimages(events, "2026-10-03");

  // Assert
  expect(
    upcoming.map(({ event, daysUntilStart }) => [event.id, daysUntilStart])
  ).toEqual([
    [5, 59],
    [6, 163],
  ]);
});

test("getUpcomingPilgrimages when none are scheduled returns none", () => {
  // Act & Assert
  expect(
    getUpcomingPilgrimages([event({ type: "Retreat" })], "2026-10-03")
  ).toEqual([]);
});
