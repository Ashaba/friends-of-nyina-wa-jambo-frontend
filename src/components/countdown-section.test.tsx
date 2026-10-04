import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CountdownSection } from "./countdown-section";
import type { Event } from "@/types/strapi";

function pilgrimage(overrides: Partial<Event>): Event {
  return {
    id: 1,
    title: "Pilgrimage to Kibeho",
    startDate: "2027-03-15",
    endDate: "2027-03-25",
    time: "Full Day",
    location: "Rwanda",
    type: "Pilgrimage",
    description: "A guided pilgrimage.",
    featured: false,
    ...overrides,
  };
}

test("CountdownSection before the novena counts the days to the feast", () => {
  // Act
  render(<CountdownSection today="2026-10-03" events={[]} />);

  // Assert
  expect(screen.getByText("56 days")).toBeInTheDocument();
  expect(
    screen.getByText(/until the feast on November 28, 2026\./)
  ).toHaveTextContent(/begins on November 19, 2026\./);
});

test("CountdownSection the day before the novena is still counting down", () => {
  // Act
  render(<CountdownSection today="2026-11-18" events={[]} />);

  // Assert
  expect(screen.getByText("10 days")).toBeInTheDocument();
});

test("CountdownSection during the novena shows the day of the novena", () => {
  // Act
  render(<CountdownSection today="2026-11-21" events={[]} />);

  // Assert
  expect(screen.getByText("Day 3 of 9")).toBeInTheDocument();
  expect(screen.getByText(/Pray day 3/)).toBeInTheDocument();
});

test("CountdownSection on the feast says today is the feast", () => {
  // Act
  render(<CountdownSection today="2026-11-28" events={[]} />);

  // Assert
  expect(screen.getByText("Today is the feast")).toBeInTheDocument();
});

test("CountdownSection with an upcoming pilgrimage shows its dates and days to go", () => {
  // Act
  render(
    <CountdownSection
      today="2026-10-03"
      events={[pilgrimage({ startDate: "2026-10-04", endDate: undefined })]}
    />
  );

  // Assert
  expect(screen.getByText("Upcoming Pilgrimages")).toBeInTheDocument();
  expect(screen.getByText("Pilgrimage to Kibeho")).toBeInTheDocument();
  expect(screen.getByText("October 4, 2026, in 1 day")).toBeInTheDocument();
});

test("CountdownSection when no pilgrimage is coming up leaves the panel out", () => {
  // Act
  render(
    <CountdownSection
      today="2026-10-03"
      events={[pilgrimage({ startDate: "2026-09-01" })]}
    />
  );

  // Assert
  expect(screen.queryByText("Upcoming Pilgrimages")).not.toBeInTheDocument();
});
