import { createLogger } from "@/lib/logger";
import { FETCH_FAILURE_COPY } from "@/lib/content-source-status";
import type {
  StrapiMedia,
  StrapiResponse,
  StrapiDailyMessageFields,
  StrapiEventFields,
  StrapiVideoFields,
  StrapiFetchOutcome,
  DailyMessageResult,
  Event,
  Video,
} from "@/types/strapi";

export type {
  DailyMessage,
  DailyMessageResult,
  StrapiFetchStatus,
  Event,
  Video,
} from "@/types/strapi";

const STRAPI_API_URL = process.env.STRAPI_API_URL || "";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || "";

const log = createLogger("strapi");

/**
 * Identifies a request by relative path only — the backend origin must never
 * reach a log line or the browser.
 */
function describeRequest(
  path: string,
  params?: Record<string, string>
): string {
  const search = params ? new URLSearchParams(params).toString() : "";
  return `/api${path}${search ? `?${search}` : ""}`;
}

/**
 * Strips absolute URLs and the backend host out of an error message before it
 * is logged. Node's fetch leaks the hostname in DNS failures.
 */
function redact(detail: string): string {
  let safe = detail.replace(/\bhttps?:\/\/\S+/gi, "[url redacted]");

  if (STRAPI_API_URL) {
    try {
      const { hostname } = new URL(STRAPI_API_URL);
      if (hostname) {
        safe = safe.split(hostname).join("[host redacted]");
      }
    } catch {
      // STRAPI_API_URL is not parseable; the generic URL scrub still applies.
    }
  }

  return safe;
}

/**
 * Resolves a Strapi 5 media field to an absolute URL. Media comes back flat
 * (no `data`/`attributes` nesting) and may be null when nothing is uploaded;
 * uploads served from a provider like S3 are already absolute.
 */
function toMediaUrl(media?: StrapiMedia | null): string | undefined {
  if (!media?.url) return undefined;
  return /^https?:\/\//i.test(media.url)
    ? media.url
    : `${STRAPI_API_URL}${media.url}`;
}

/**
 * Generic Strapi fetch helper for collection endpoints.
 * Never throws: returns an outcome describing why the data is missing so
 * callers can log it and gracefully fall back to hardcoded data.
 */
async function fetchAPI<T>(
  path: string,
  params?: Record<string, string>,
  tags: string[] = ["strapi"]
): Promise<StrapiFetchOutcome<T>> {
  const label = describeRequest(path, params);

  if (!STRAPI_API_URL) {
    log.warn("request.skipped", {
      path: label,
      reason: "STRAPI_API_URL is not set",
    });
    return {
      data: null,
      status: "not-configured",
      detail: FETCH_FAILURE_COPY["not-configured"].detail,
    };
  }

  const url = new URL(`/api${path}`, STRAPI_API_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    );
  }

  log.debug("request.start", { method: "GET", path: label });

  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const startedAt = Date.now();
    const res = await fetch(url.toString(), {
      headers,
      next: { revalidate: 60, tags },
    });
    const durationMs = Date.now() - startedAt;

    if (!res.ok) {
      log.warn("request.failed", {
        method: "GET",
        path: label,
        status: res.status,
        statusText: res.statusText,
        durationMs,
      });
      return {
        data: null,
        status: "http-error",
        detail: FETCH_FAILURE_COPY["http-error"].detail,
      };
    }

    log.debug("request.succeeded", {
      method: "GET",
      path: label,
      status: res.status,
      durationMs,
    });
    return { data: (await res.json()) as T, status: "success" };
  } catch (error) {
    log.error("request.threw", {
      method: "GET",
      path: label,
      error: redact(error instanceof Error ? error.message : String(error)),
    });
    return {
      data: null,
      status: "network-error",
      detail: FETCH_FAILURE_COPY["network-error"].detail,
    };
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
  const label = describeRequest(path);

  if (!STRAPI_API_URL) {
    log.warn("request.skipped", {
      method: "POST",
      path: label,
      reason: "STRAPI_API_URL is not set",
    });
    return false;
  }

  const url = new URL(`/api${path}`, STRAPI_API_URL);
  log.debug("request.start", { method: "POST", path: label });

  try {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const res = await fetch(url.toString(), {
      method: "POST",
      headers,
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      log.warn("request.failed", {
        method: "POST",
        path: label,
        status: res.status,
        statusText: res.statusText,
      });
      return false;
    }

    log.debug("request.succeeded", {
      method: "POST",
      path: label,
      status: res.status,
    });
    return true;
  } catch (error) {
    const detail = redact(
      error instanceof Error ? error.message : String(error)
    );
    log.error("request.threw", { method: "POST", path: label, error: detail });
    return false;
  }
}

// ------------------------------------------------------------------
// Content-specific fetch functions
// ------------------------------------------------------------------

/**
 * Fetch today's daily message from Strapi.
 * Returns the outcome (not just the data) so the UI can log why it is
 * falling back to the hardcoded rotation.
 */
export async function getDailyMessage(): Promise<DailyMessageResult> {
  const today = new Date().toISOString().split("T")[0];

  const outcome = await fetchAPI<StrapiResponse<StrapiDailyMessageFields>>(
    "/daily-messages",
    {
      "filters[date][$eq]": today,
      "filters[active][$eq]": "true",
      "pagination[limit]": "1",
      sort: "createdAt:desc",
    },
    ["strapi", "strapi-daily-message"]
  );

  if (outcome.status !== "success") {
    return { data: null, status: outcome.status, detail: outcome.detail };
  }

  if (!outcome.data?.data?.length) {
    log.warn("dailyMessage.empty", { date: today });
    return {
      data: null,
      status: "empty",
      detail: FETCH_FAILURE_COPY.empty.detail,
    };
  }

  const entry = outcome.data.data[0];
  log.debug("dailyMessage.loaded", { date: today });
  return {
    data: {
      message: entry.message,
      source: entry.source,
      reflection: entry.reflection,
    },
    status: "success",
  };
}

/**
 * Fetch all events from Strapi, sorted by date.
 */
export async function getEvents(): Promise<Event[] | null> {
  const { data: response } = await fetchAPI<StrapiResponse<StrapiEventFields>>(
    "/events",
    {
      sort: "date:asc",
      populate: "image",
      "pagination[limit]": "50",
    }
  );

  if (!response?.data?.length) return null;

  return response.data.map((entry) => ({
    id: entry.id,
    title: entry.title,
    date: entry.date,
    time: entry.time,
    location: entry.location,
    type: entry.type,
    description: entry.description,
    image: toMediaUrl(entry.image),
    featured: entry.featured,
  }));
}

/**
 * Fetch all videos from Strapi, sorted by published date descending.
 */
export async function getVideos(): Promise<Video[] | null> {
  const { data: response } = await fetchAPI<StrapiResponse<StrapiVideoFields>>(
    "/videos",
    {
      sort: "publishedDate:desc",
      populate: "thumbnail",
      "pagination[limit]": "50",
    }
  );

  if (!response?.data?.length) return null;

  return response.data.map((entry) => ({
    id: entry.id,
    title: entry.title,
    youtubeUrl: entry.youtubeUrl,
    description: entry.description,
    category: entry.category,
    publishedDate: entry.publishedDate,
    thumbnail: toMediaUrl(entry.thumbnail),
  }));
}
