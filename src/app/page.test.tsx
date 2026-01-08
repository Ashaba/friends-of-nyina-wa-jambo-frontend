import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";
import { vi } from "vitest";
import * as strapiLib from "@/lib/strapi";

// Mock the strapi module to avoid backend dependencies
vi.mock("@/lib/strapi", () => ({
  getMessageOfTheDay: vi.fn(),
}));

describe("Home Page", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  test("renders Message of the Day heading with default message", async () => {
    // Mock the API to return null (simulating no message from backend)
    vi.mocked(strapiLib.getMessageOfTheDay).mockResolvedValue(null);

    const component = await Home();
    render(component);

    const heading = screen.getByText(/Message of the Day/i);
    expect(heading).toBeInTheDocument();

    const message = screen.getByText(/Coming soon/i);
    expect(message).toBeInTheDocument();
  });

  test("renders custom message when API returns data", async () => {
    // Mock the API to return a custom message
    const mockMessage = {
      id: 1,
      documentId: "test-123",
      title: "Test Title",
      message: "Hello from the test!",
      createdAt: "2026-01-07T00:00:00.000Z",
      updatedAt: "2026-01-07T00:00:00.000Z",
    };
    vi.mocked(strapiLib.getMessageOfTheDay).mockResolvedValue(mockMessage);

    const component = await Home();
    render(component);

    const heading = screen.getByText(/Message of the Day/i);
    expect(heading).toBeInTheDocument();

    const message = screen.getByText(/Hello from the test!/i);
    expect(message).toBeInTheDocument();
  });

  test("renders with proper structure", async () => {
    // Mock the API to return null
    vi.mocked(strapiLib.getMessageOfTheDay).mockResolvedValue(null);

    const component = await Home();
    const { container } = render(component);

    const mainElement = container.querySelector("main");
    expect(mainElement).toBeInTheDocument();
    expect(mainElement).toHaveClass("container");
  });
});
