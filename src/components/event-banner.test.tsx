import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EventBanner } from "./event-banner";
import {
  EVENT_BANNER_DISMISSED_ATTRIBUTE,
  hideDismissedEventBannerScript,
} from "@/lib/event-banner-dismissal";
import type { Event } from "@/types/strapi";

function setKibehoNoonOn(date: string): void {
  vi.setSystemTime(new Date(`${date}T10:00:00Z`));
}

const runHeadScript = (): void =>
  new Function(hideDismissedEventBannerScript)();

// A fresh store stands in for a new browser session.
function newSessionStorage(): Pick<Storage, "getItem" | "setItem"> {
  const items = new Map<string, string>();
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, value),
  };
}

function featuredEvent(overrides: Partial<Event>): Event {
  return {
    id: 1,
    title: "Feast of Our Lady of Kibeho",
    startDate: "2026-11-28",
    time: "9:00 AM - 5:00 PM",
    location: "Kibeho Shrine, Rwanda",
    type: "Feast Day",
    description: "The annual feast day.",
    featured: true,
    ...overrides,
  };
}

const feast = featuredEvent({});
const novena = featuredEvent({
  id: 2,
  title: "Novena to Our Lady of Kibeho",
  startDate: "2026-11-19",
  endDate: "2026-11-27",
  type: "Novena",
});

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.stubGlobal("sessionStorage", newSessionStorage());
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute(EVENT_BANNER_DISMISSED_ATTRIBUTE);
});

test("EventBanner counts down to the event using the browser's date, not the build date", () => {
  // Arrange
  setKibehoNoonOn("2026-11-10");

  // Act
  render(<EventBanner events={[feast]} builtOn="2026-10-01" />);

  // Assert
  expect(
    screen.getByRole("complementary", { name: "Event countdown" })
  ).toHaveTextContent("18 days until Feast of Our Lady of Kibeho. See details");
});

test("EventBanner during a multi-day event shows which day it is", () => {
  // Arrange
  setKibehoNoonOn("2026-11-21");

  // Act
  render(<EventBanner events={[feast, novena]} builtOn="2026-11-21" />);

  // Assert
  expect(screen.getByRole("complementary")).toHaveTextContent(
    "Day 3 of 9: Novena to Our Lady of Kibeho."
  );
});

test("EventBanner on the day an event starts says it is today", () => {
  // Arrange
  setKibehoNoonOn("2026-11-28");

  // Act
  render(<EventBanner events={[feast, novena]} builtOn="2026-11-28" />);

  // Assert
  expect(screen.getByRole("complementary")).toHaveTextContent(
    "Today: Feast of Our Lady of Kibeho."
  );
});

test("EventBanner with no featured event within 30 days is not shown", () => {
  // Arrange
  setKibehoNoonOn("2026-10-28");

  // Act
  render(<EventBanner events={[feast]} builtOn="2026-10-28" />);

  // Assert
  expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
});

test("EventBanner dismiss hides the banner and remembers it for this session", () => {
  // Arrange
  setKibehoNoonOn("2026-11-10");
  render(<EventBanner events={[feast]} builtOn="2026-11-10" />);

  // Act
  fireEvent.click(screen.getByRole("button", { name: "Dismiss countdown" }));

  // Assert
  expect(document.documentElement).toHaveAttribute(
    EVENT_BANNER_DISMISSED_ATTRIBUTE
  );
  document.documentElement.removeAttribute(EVENT_BANNER_DISMISSED_ATTRIBUTE);
  runHeadScript();
  expect(document.documentElement).toHaveAttribute(
    EVENT_BANNER_DISMISSED_ATTRIBUTE
  );
});

test("EventBanner dismissed in an earlier session shows again", () => {
  // Arrange
  setKibehoNoonOn("2026-11-10");
  render(<EventBanner events={[feast]} builtOn="2026-11-10" />);
  fireEvent.click(screen.getByRole("button", { name: "Dismiss countdown" }));
  document.documentElement.removeAttribute(EVENT_BANNER_DISMISSED_ATTRIBUTE);

  // Act
  vi.stubGlobal("sessionStorage", newSessionStorage());
  runHeadScript();

  // Assert
  expect(document.documentElement).not.toHaveAttribute(
    EVENT_BANNER_DISMISSED_ATTRIBUTE
  );
});

test("EventBanner never dismissed is left visible by the head script", () => {
  // Act
  runHeadScript();

  // Assert
  expect(document.documentElement).not.toHaveAttribute(
    EVENT_BANNER_DISMISSED_ATTRIBUTE
  );
});
