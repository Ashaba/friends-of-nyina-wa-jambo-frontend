import type {
  StrapiResponse,
  StrapiDailyMessageAttributes,
  StrapiEventAttributes,
  StrapiVideoAttributes,
  StrapiError,
  StrapiResult,
  MessageOfTheDay,
  DailyMessage,
  Event,
  Video,
} from "@/types/strapi";

export type {
  MessageOfTheDay,
  DailyMessage,
  Event,
  Video,
} from "@/types/strapi";

const STRAPI_API_URL = process.env.STRAPI_API_URL || "";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

function isStrapiError<T>(result: StrapiResult<T>): result is StrapiError {
  return "error" in result && result.error !== undefined;
}

/**
 * Generic Strapi fetch helper for collection endpoints.
 * Returns null on any failure so components can gracefully fall back to hardcoded data.
 */
async function fetchAPI<T>(
  path: string,
  params?: Record<string, string>
): Promise<T | null> {
  if (!STRAPI_API_URL) return null;

  try {
    const url = new URL(`/api${path}`, STRAPI_API_URL);
    if (params) {
      Object.entries(params).forEach(([key, value]) =>
        url.searchParams.set(key, value)
      );
    }

    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const res = await fetch(url.toString(), {
      headers,
      next: { revalidate: 60, tags: ["strapi"] },
    });

    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Strapi fetch helper for single-type endpoints (legacy).
 */
async function fetchStrapi<T>(
  endpoint: string,
  tags: string[] = ["strapi"]
): Promise<T | null> {
  if (!STRAPI_API_URL) return null;

  try {
    const url = `${STRAPI_API_URL}/api${endpoint}`;
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, { headers, next: { tags } });
    const result: StrapiResult<T> = await response.json();

    if (isStrapiError(result)) {
      throw new Error(result.error.message);
    }

    return result.data as T;
  } catch {
    return null;
  }
}

/**
 * POST helper for Strapi — used for form submissions (prayer requests, newsletter).
 * Returns true on success, false on failure.
 */
export async function postAPI(
  path: string,
  data: Record<string, unknown>
): Promise<boolean> {
  if (!STRAPI_API_URL) return false;

  try {
    const url = new URL(`/api${path}`, STRAPI_API_URL);
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const res = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify({ data }),
    });

    return res.ok;
  } catch {
    return false;
  }
}

// ------------------------------------------------------------------
// Content-specific fetch functions
// ------------------------------------------------------------------

/**
 * Fetch the legacy single-type message-of-the-day from Strapi.
 */
export async function getMessageOfTheDay(): Promise<MessageOfTheDay | null> {
  return fetchStrapi<MessageOfTheDay>("/message-of-the-day", [
    "strapi",
    "strapi-message-of-the-day",
  ]);
}

/**
 * Fetch today's daily message from Strapi.
 * Falls back to null so the component can use its hardcoded rotation.
 */
export async function getDailyMessage(): Promise<DailyMessage | null> {
  const today = new Date().toISOString().split("T")[0];

  const response = await fetchAPI<StrapiResponse<StrapiDailyMessageAttributes>>(
    "/daily-messages",
    {
      "filters[date][$eq]": today,
      "filters[active][$eq]": "true",
      "pagination[limit]": "1",
      sort: "createdAt:desc",
    }
  );

  if (!response?.data?.length) return null;

  const entry = response.data[0].attributes;
  return {
    message: entry.message,
    source: entry.source,
    reflection: entry.reflection,
  };
}

/**
 * Fetch all events from Strapi, sorted by date.
 */
export async function getEvents(): Promise<Event[] | null> {
  const response = await fetchAPI<StrapiResponse<StrapiEventAttributes>>(
    "/events",
    {
      sort: "date:asc",
      populate: "image",
      "pagination[limit]": "50",
    }
  );

  if (!response?.data?.length) return null;

  return response.data.map((entry) => {
    const a = entry.attributes;
    const imageUrl = a.image?.data?.attributes?.url;
    return {
      id: entry.id,
      title: a.title,
      date: a.date,
      time: a.time,
      location: a.location,
      type: a.type,
      description: a.description,
      image: imageUrl ? `${STRAPI_API_URL}${imageUrl}` : undefined,
      featured: a.featured,
    };
  });
}

/**
 * Fetch all videos from Strapi, sorted by published date descending.
 */
export async function getVideos(): Promise<Video[] | null> {
  const response = await fetchAPI<StrapiResponse<StrapiVideoAttributes>>(
    "/videos",
    {
      sort: "publishedDate:desc",
      populate: "thumbnail",
      "pagination[limit]": "50",
    }
  );

  if (!response?.data?.length) return null;

  return response.data.map((entry) => {
    const a = entry.attributes;
    const thumbUrl = a.thumbnail?.data?.attributes?.url;
    return {
      id: entry.id,
      title: a.title,
      youtubeUrl: a.youtubeUrl,
      description: a.description,
      category: a.category,
      publishedDate: a.publishedDate,
      thumbnail: thumbUrl ? `${STRAPI_API_URL}${thumbUrl}` : undefined,
    };
  });
}
