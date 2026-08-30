import type { StrapiFetchStatus } from "@/types/strapi";

/**
 * Single source of truth for how each non-success fetch status is described.
 *
 * Both strings cross into the browser, so neither may name the CMS vendor, an
 * environment variable, or a host — see the redaction in `lib/strapi.ts`.
 *
 * - `detail` is returned by the data layer and serialized into the page.
 * - `reason` is the phrasing used mid-sentence in the browser console.
 */
export const FETCH_FAILURE_COPY: Record<
  Exclude<StrapiFetchStatus, "success">,
  { detail: string; reason: string }
> = {
  "not-configured": {
    detail: "Content source is not configured",
    reason: "the content source is not configured",
  },
  empty: {
    detail: "No message published for today",
    reason: "no message is published for today",
  },
  "http-error": {
    detail: "Content source returned an error response",
    reason: "the content source returned an error",
  },
  "network-error": {
    detail: "Content source could not be reached",
    reason: "the content source could not be reached",
  },
};
