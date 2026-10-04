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
  render(<EventsContent cmsEvents={[event(dates)]} today="2026-01-01" />);

  // Assert
  expect(screen.getByText(label)).toBeInTheDocument();
});

test.each([
  ["an upcoming event", { startDate: "2026-11-28" }, "56 days"],
  ["an event one day away", { startDate: "2026-10-04" }, "1 day"],
  ["an event that starts today", { startDate: "2026-10-03" }, "Today"],
  [
    "an event under way",
    { startDate: "2026-10-01", endDate: "2026-10-05" },
    "Now",
  ],
  ["a past event", { startDate: "2026-09-01" }, "Past"],
])("EventsContent for %s counts down in its tile", (_scenario, dates, tile) => {
  // Act
  render(
    <EventsContent
      cmsEvents={[event({ ...dates, featured: false })]}
      today="2026-10-03"
    />
  );

  // Assert
  expect(
    screen.getByRole("button", { name: /Pilgrimage to Kibeho/ })
  ).toHaveTextContent(new RegExp(`^${tile}`));
});

test("EventsContent for an event with when text keeps the calendar icon", () => {
  // Act
  render(
    <EventsContent
      cmsEvents={[
        event({
          startDate: "2026-11-28",
          when: "First Saturday of each month",
        }),
      ]}
      today="2026-10-03"
    />
  );

  // Assert
  expect(
    screen.getByRole("button", { name: /Pilgrimage to Kibeho/ })
  ).not.toHaveTextContent(/days/);
});

test("EventsContent showing the example events does not count to their made-up dates", () => {
  // Act
  render(<EventsContent cmsEvents={null} today="2026-10-03" />);

  // Assert
  expect(
    screen.getByRole("button", { name: /Novena to Our Lady of Kibeho/ })
  ).toHaveTextContent(/^Novena/);
});
