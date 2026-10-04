import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { VideosContent } from "./videos-content";
import type { Video } from "@/types/strapi";

const originalTimeZone = process.env.TZ;

afterEach(() => {
  process.env.TZ = originalTimeZone;
});

test("VideosContent for a visitor west of UTC shows the published date as entered", () => {
  // Arrange — midnight UTC is still the day before in Chicago.
  process.env.TZ = "America/Chicago";
  const video: Video = {
    id: 1,
    title: "Kibeho Pilgrimage",
    youtubeUrl: "https://youtu.be/dQw4w9WgXcQ",
    description: "A pilgrimage.",
    category: "Pilgrimages",
    publishedDate: "2026-09-20",
  };

  // Act
  render(<VideosContent cmsVideos={[video]} />);

  // Assert
  expect(screen.getByText("Sep 20, 2026")).toBeInTheDocument();
});
