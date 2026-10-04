import { afterEach, beforeEach, expect, test, vi } from "vitest";

const API_URL = "https://cms.internal.example.com";

async function loadStrapi(): Promise<typeof import("./strapi")> {
  vi.resetModules();
  vi.stubEnv("STRAPI_API_URL", API_URL);
  return import("./strapi");
}

/** Stubs fetch with a successful JSON response. */
function stubJsonResponse(body: unknown): void {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, status: 200, json: async () => body })
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
  vi.spyOn(console, "warn").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

test("getDailyMessage when fetch throws with the host in the message logs no backend origin", async () => {
  // Arrange — Node's fetch leaks the hostname in DNS failures.
  const error = vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockRejectedValue(
        new Error("getaddrinfo ENOTFOUND cms.internal.example.com")
      )
  );

  // Act
  const { getDailyMessage } = await loadStrapi();
  const result = await getDailyMessage();

  // Assert
  expect(result.status).toBe("network-error");
  const logged = JSON.stringify(error.mock.calls);
  expect(logged).not.toContain("cms.internal.example.com");
  expect(logged).toContain("[host redacted]");
  expect(logged).toContain("/api/daily-messages");
});

test("getDailyMessage when fetch throws returns a detail free of the backend origin", async () => {
  // Arrange
  vi.stubGlobal(
    "fetch",
    vi
      .fn()
      .mockRejectedValue(
        new Error("getaddrinfo ENOTFOUND cms.internal.example.com")
      )
  );

  // Act
  const { getDailyMessage } = await loadStrapi();
  const result = await getDailyMessage();

  // Assert
  expect(result.detail).toBe("Content source could not be reached");
});

test("getDailyMessage when the response is an HTTP error returns a vendor-neutral detail", async () => {
  // Arrange
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    })
  );

  // Act
  const { getDailyMessage } = await loadStrapi();
  const result = await getDailyMessage();

  // Assert
  expect(result.status).toBe("http-error");
  expect(result.detail).toBe("Content source returned an error response");
});

test.each([
  [
    "a network failure",
    () =>
      vi.stubGlobal(
        "fetch",
        vi.fn().mockRejectedValue(new Error("fetch failed"))
      ),
  ],
  [
    "an HTTP error",
    () =>
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({
          ok: false,
          status: 502,
          statusText: "Bad Gateway",
        })
      ),
  ],
  ["an empty result set", () => stubJsonResponse({ data: [], meta: {} })],
])(
  "getDailyMessage on %s returns a detail that does not fingerprint the backend",
  async (_scenario, arrangeFetch) => {
    // Arrange
    arrangeFetch();

    // Act
    const { getDailyMessage } = await loadStrapi();
    const { detail } = await getDailyMessage();

    // Assert
    expect(detail).toBeDefined();
    expect(detail!.toLowerCase()).not.toContain("strapi");
    expect(detail).not.toContain("STRAPI_API_URL");
    expect(detail).not.toContain(API_URL);
  }
);

test("getDailyMessage when STRAPI_API_URL is unset returns a detail without the variable name", async () => {
  // Arrange
  vi.resetModules();
  vi.stubEnv("STRAPI_API_URL", "");

  // Act
  const { getDailyMessage } = await import("./strapi");
  const result = await getDailyMessage();

  // Assert
  expect(result.status).toBe("not-configured");
  expect(result.detail).toBe("Content source is not configured");
});

/**
 * Strapi 5 returns flat entries — fields sit on the entry next to `id` and
 * `documentId`, with no `data`/`attributes` nesting on media. If parsing
 * regresses to the v4 shape, every mapped field silently becomes undefined.
 */
test("getDailyMessage when the API returns a Strapi 5 entry maps the flat fields", async () => {
  // Arrange
  stubJsonResponse({
    data: [
      {
        id: 8,
        documentId: "acrckg6q5wfiy6wze0byv3iz",
        message: "Happy Feast of Our Lady of Lourdes!",
        source: "Our Lady of Kibeho",
        reflection: "Pray the Rosary today.",
        date: "2026-08-30",
        active: true,
        createdAt: "2026-01-10T20:24:56.854Z",
        updatedAt: "2026-02-11T05:47:44.732Z",
        publishedAt: "2026-02-11T05:47:44.880Z",
      },
    ],
    meta: { pagination: { page: 1, pageSize: 1, pageCount: 1, total: 1 } },
  });

  // Act
  const { getDailyMessage } = await loadStrapi();
  const { data, status } = await getDailyMessage();

  // Assert
  expect(status).toBe("success");
  expect(data).toEqual({
    message: "Happy Feast of Our Lady of Lourdes!",
    source: "Our Lady of Kibeho",
    reflection: "Pray the Rosary today.",
  });
});

test("getVideos when the thumbnail URL is relative resolves it against the API origin", async () => {
  // Arrange
  stubJsonResponse({
    data: [
      {
        id: 1,
        documentId: "vid1",
        title: "Kibeho Pilgrimage",
        youtubeUrl: "https://youtu.be/abc",
        description: "A pilgrimage.",
        category: "Pilgrimages",
        publishedDate: "2026-08-01",
        thumbnail: {
          id: 3,
          documentId: "thumb1",
          url: "/uploads/thumb.jpg",
          alternativeText: null,
        },
        createdAt: "2026-08-01T00:00:00.000Z",
        updatedAt: "2026-08-01T00:00:00.000Z",
        publishedAt: "2026-08-01T00:00:00.000Z",
      },
    ],
    meta: {},
  });

  // Act
  const { getVideos } = await loadStrapi();
  const videos = await getVideos();

  // Assert
  expect(videos).toHaveLength(1);
  expect(videos![0].title).toBe("Kibeho Pilgrimage");
  expect(videos![0].thumbnail).toBe(`${API_URL}/uploads/thumb.jpg`);
});

/** Builds a Strapi 5 event entry with the given image field. */
function eventEntry(id: number, image: unknown): Record<string, unknown> {
  return {
    id,
    documentId: `e${id}`,
    title: "Feast Day",
    date: "2026-09-01",
    time: "10:00",
    location: "Kibeho",
    type: "Feast Day",
    description: "Mass.",
    featured: true,
    image,
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z",
    publishedAt: "2026-08-01T00:00:00.000Z",
  };
}

test("getEvents when the image URL is already absolute leaves it unchanged", async () => {
  // Arrange — uploads served by S3 or Cloudinary come back absolute.
  stubJsonResponse({
    data: [
      eventEntry(1, {
        id: 9,
        documentId: "img1",
        url: "https://cdn.example.com/uploads/feast.jpg",
      }),
    ],
    meta: {},
  });

  // Act
  const { getEvents } = await loadStrapi();
  const events = await getEvents();

  // Assert
  expect(events![0].image).toBe("https://cdn.example.com/uploads/feast.jpg");
});

test("getEvents when the image is null returns an undefined image", async () => {
  // Arrange
  stubJsonResponse({ data: [eventEntry(2, null)], meta: {} });

  // Act
  const { getEvents } = await loadStrapi();
  const events = await getEvents();

  // Assert
  expect(events![0].image).toBeUndefined();
});

/** Builds a Strapi 5 gallery photo entry with the given image field. */
function galleryPhotoEntry(
  id: number,
  image: unknown
): Record<string, unknown> {
  return {
    id,
    documentId: `g${id}`,
    caption: "Pilgrims at the Kibeho shrine",
    takenOn: "2025-11-28",
    image,
    createdAt: "2025-11-29T00:00:00.000Z",
    updatedAt: "2025-11-29T00:00:00.000Z",
    publishedAt: "2025-11-29T00:00:00.000Z",
  };
}

test("getGalleryPhotos requests published photos newest first with their image", async () => {
  // Arrange
  stubJsonResponse({ data: [], meta: {} });

  // Act
  const { getGalleryPhotos } = await loadStrapi();
  await getGalleryPhotos();

  // Assert
  const [url, init] = vi.mocked(fetch).mock.calls[0];
  const { pathname, searchParams } = new URL(String(url));
  expect(pathname).toBe("/api/gallery-photos");
  expect(searchParams.get("sort")).toBe("takenOn:desc");
  expect(searchParams.get("populate")).toBe("image");
  expect(init?.next?.tags).toContain("strapi-gallery-photos");
});

test("getGalleryPhotos when the image URL is relative resolves it against the API origin", async () => {
  // Arrange
  stubJsonResponse({
    data: [
      galleryPhotoEntry(1, {
        id: 5,
        documentId: "img5",
        url: "/uploads/pilgrims.jpg",
        alternativeText: "Pilgrims singing outside the church",
      }),
    ],
    meta: {},
  });

  // Act
  const { getGalleryPhotos } = await loadStrapi();
  const photos = await getGalleryPhotos();

  // Assert
  expect(photos).toEqual([
    {
      id: 1,
      src: `${API_URL}/uploads/pilgrims.jpg`,
      alt: "Pilgrims singing outside the church",
      caption: "Pilgrims at the Kibeho shrine",
      takenOn: "2025-11-28",
    },
  ]);
});

test("getGalleryPhotos when the image has no alt text falls back to the caption", async () => {
  // Arrange
  stubJsonResponse({
    data: [
      galleryPhotoEntry(1, {
        id: 5,
        documentId: "img5",
        url: "https://cdn.example.com/pilgrims.jpg",
        alternativeText: null,
      }),
    ],
    meta: {},
  });

  // Act
  const { getGalleryPhotos } = await loadStrapi();
  const [photo] = await getGalleryPhotos();

  // Assert
  expect(photo.alt).toBe("Pilgrims at the Kibeho shrine");
});

test("getGalleryPhotos when an entry has no image leaves it out", async () => {
  // Arrange
  stubJsonResponse({ data: [galleryPhotoEntry(1, null)], meta: {} });

  // Act
  const { getGalleryPhotos } = await loadStrapi();
  const photos = await getGalleryPhotos();

  // Assert
  expect(photos).toEqual([]);
});

test("getGalleryPhotos when the CMS cannot be reached returns no photos", async () => {
  // Arrange
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

  // Act
  const { getGalleryPhotos } = await loadStrapi();
  const photos = await getGalleryPhotos();

  // Assert
  expect(photos).toEqual([]);
});
