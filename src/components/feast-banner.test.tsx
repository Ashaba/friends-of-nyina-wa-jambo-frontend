import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FeastBanner } from "./feast-banner";
import {
  FEAST_BANNER_DISMISSED_ATTRIBUTE,
  hideDismissedFeastBannerScript,
} from "@/lib/feast-banner-dismissal";

function setKibehoNoonOn(date: string): void {
  vi.setSystemTime(new Date(`${date}T10:00:00Z`));
}

const runHeadScript = (): void =>
  new Function(hideDismissedFeastBannerScript)();

// A fresh store stands in for a new browser session.
function newSessionStorage(): Pick<Storage, "getItem" | "setItem"> {
  const items = new Map<string, string>();
  return {
    getItem: (key) => items.get(key) ?? null,
    setItem: (key, value) => items.set(key, value),
  };
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.stubGlobal("sessionStorage", newSessionStorage());
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute(FEAST_BANNER_DISMISSED_ATTRIBUTE);
});

test("FeastBanner counts down using the browser's date, not the build date", () => {
  // Arrange
  setKibehoNoonOn("2026-10-03");

  // Act
  render(<FeastBanner builtOn="2026-09-01" />);

  // Assert
  expect(
    screen.getByRole("complementary", { name: "Feast countdown" })
  ).toHaveTextContent(
    "56 days until the Feast of Our Lady of Kibeho. Read the novena"
  );
});

test("FeastBanner during the novena points to that day's prayers", () => {
  // Arrange
  setKibehoNoonOn("2026-11-21");

  // Act
  render(<FeastBanner builtOn="2026-11-21" />);

  // Assert
  expect(screen.getByRole("complementary")).toHaveTextContent(
    "Day 3 of the novena to Our Lady of Kibeho. Pray day 3"
  );
});

test("FeastBanner before 1 October is not shown", () => {
  // Arrange
  setKibehoNoonOn("2026-09-30");

  // Act
  render(<FeastBanner builtOn="2026-09-30" />);

  // Assert
  expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
});

test("FeastBanner dismiss hides the banner and remembers it for this session", () => {
  // Arrange
  setKibehoNoonOn("2026-10-03");
  render(<FeastBanner builtOn="2026-10-03" />);

  // Act
  fireEvent.click(screen.getByRole("button", { name: "Dismiss countdown" }));

  // Assert
  expect(document.documentElement).toHaveAttribute(
    FEAST_BANNER_DISMISSED_ATTRIBUTE
  );
  document.documentElement.removeAttribute(FEAST_BANNER_DISMISSED_ATTRIBUTE);
  runHeadScript();
  expect(document.documentElement).toHaveAttribute(
    FEAST_BANNER_DISMISSED_ATTRIBUTE
  );
});

test("FeastBanner dismissed in an earlier session shows again", () => {
  // Arrange
  setKibehoNoonOn("2026-10-03");
  render(<FeastBanner builtOn="2026-10-03" />);
  fireEvent.click(screen.getByRole("button", { name: "Dismiss countdown" }));
  document.documentElement.removeAttribute(FEAST_BANNER_DISMISSED_ATTRIBUTE);

  // Act
  vi.stubGlobal("sessionStorage", newSessionStorage());
  runHeadScript();

  // Assert
  expect(document.documentElement).not.toHaveAttribute(
    FEAST_BANNER_DISMISSED_ATTRIBUTE
  );
});

test("FeastBanner never dismissed is left visible by the head script", () => {
  // Arrange
  setKibehoNoonOn("2026-10-03");

  // Act
  runHeadScript();

  // Assert
  expect(document.documentElement).not.toHaveAttribute(
    FEAST_BANNER_DISMISSED_ATTRIBUTE
  );
});
