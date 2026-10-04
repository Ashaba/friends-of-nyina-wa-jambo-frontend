import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EventsContent } from "./events-content";
import type { Event } from "@/types/strapi";

function event(overrides: Partial<Event>): Event {
  return {
    id: 1,
    title: "Pilgrimage to Kibeho",
    startDate: "2026-03-15",
    time: "Full Day",
    location: "Rwanda",
    type: "Pilgrimage",
    description: "A guided pilgrimage.",
    featured: false,
    ...overrides,
  };
}

test.each([
  ["a single day", { startDate: "2026-11-28" }, "November 28, 2026"],
  [
    "a start and end date",
    { startDate: "2026-11-19", endDate: "2026-11-27" },
    /^November 19\s*–\s*27, 2026$/,
  ],
  [
    "when text",
    { startDate: "2026-01-03", when: "First Saturday of each month" },
    "First Saturday of each month",
  ],
])("EventsContent for %s shows the right date", (_scenario, dates, label) => {
  // Act
  render(<EventsContent cmsEvents={[event(dates)]} />);

  // Assert
  expect(screen.getByText(label)).toBeInTheDocument();
});
