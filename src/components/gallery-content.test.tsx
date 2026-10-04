import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { GalleryContent } from "./gallery-content";
import type { GalleryPhoto } from "@/types/strapi";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

function galleryPhoto(overrides: Partial<GalleryPhoto> = {}): GalleryPhoto {
  return {
    id: 1,
    src: "https://cdn.example.com/pilgrims.jpg",
    alt: "Pilgrims singing outside the church",
    caption: "Pilgrims at the Kibeho shrine",
    takenOn: "2025-11-28",
    ...overrides,
  };
}

test("GalleryContent shows each photo with its caption and the date it was taken", () => {
  // Act
  render(<GalleryContent photos={[galleryPhoto()]} />);

  // Assert
  expect(
    screen.getByRole("img", { name: "Pilgrims singing outside the church" })
  ).toHaveAttribute("src", "https://cdn.example.com/pilgrims.jpg");
  expect(screen.getByText("Pilgrims at the Kibeho shrine")).toBeInTheDocument();
  expect(screen.getByText("November 28, 2025")).toHaveAttribute(
    "datetime",
    "2025-11-28"
  );
});

test("GalleryContent when there are no photos says they are coming soon", () => {
  // Act
  render(<GalleryContent photos={[]} />);

  // Assert
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
  expect(screen.getByText(/will appear here soon/i)).toBeInTheDocument();
});
