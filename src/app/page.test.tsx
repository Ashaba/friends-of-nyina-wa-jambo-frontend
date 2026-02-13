import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { vi } from "vitest";
import * as strapiLib from "@/lib/strapi";

// Mock the strapi module to avoid backend dependencies
vi.mock("@/lib/strapi", () => ({
  getDailyMessage: vi.fn(),
}));

// Mock next/image to render a plain img
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    const { fill: _fill, priority: _priority, ...rest } = props;
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...rest} />;
  },
}));

// Mock next/link to render a plain anchor
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

describe("Home Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders hero section with site branding", async () => {
    vi.mocked(strapiLib.getDailyMessage).mockResolvedValue(null);

    const component = await Home();
    render(component);

    // The hero section should render with the main h1 heading
    const heading = screen.getByRole("heading", {
      level: 1,
      name: /Our Lady of Kibeho/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("renders daily message section with fallback when API returns null", async () => {
    vi.mocked(strapiLib.getDailyMessage).mockResolvedValue(null);

    const component = await Home();
    render(component);

    // The daily message section heading should be present
    const heading = screen.getByText(/Daily Message/i);
    expect(heading).toBeInTheDocument();
  });

  test("renders navigation links", async () => {
    vi.mocked(strapiLib.getDailyMessage).mockResolvedValue(null);

    const component = await Home();
    render(component);

    // Check the header has key navigation links
    const prayersLink = screen.getAllByText(/Prayers/i);
    expect(prayersLink.length).toBeGreaterThan(0);
  });

  test("renders footer", async () => {
    vi.mocked(strapiLib.getDailyMessage).mockResolvedValue(null);

    const component = await Home();
    render(component);

    const matches = screen.getAllByText(/Friends of Nyina wa Jambo/i);
    expect(matches.length).toBeGreaterThan(0);
  });
});
