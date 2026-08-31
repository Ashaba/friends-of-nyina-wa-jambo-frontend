"use server";

import { headers } from "next/headers";
import { postAPI } from "@/lib/strapi";
import { createLogger } from "@/lib/logger";
import { createRateLimiter } from "@/lib/rate-limit";
import type {
  FormResult,
  NewsletterSubscription,
  PrayerRequestSubmission,
  SpamGuardFields,
  StrapiPostOutcome,
} from "@/types/strapi";

/**
 * Server actions behind the site's two public forms.
 *
 * The forms are client components and the content source is reached with a
 * secret API token, so the write cannot happen in the browser. These actions
 * are the seam: the component sends plain fields, the token stays on the
 * server, and the visitor gets back a result they can act on.
 *
 * This is also the only route to the write endpoints — the content source
 * forbids anonymous creates — which makes it the single place worth defending
 * against abuse. Three cheap layers apply before anything is stored: a
 * honeypot, a per-IP rate limit, and field validation.
 */

const log = createLogger("form-actions");

const GENERIC_FAILURE =
  "We couldn't send that just now. Please try again in a moment.";
const INVALID_FALLBACK = "Please check the details you entered and try again.";

// Five submissions per ten minutes per address. Comfortably above a person
// subscribing and then sending an intention, well below a script's appetite.
const SUBMISSION_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

// One limiter per form, so a busy prayer page cannot lock the newsletter.
const newsletterLimiter = createRateLimiter(SUBMISSION_LIMIT);
const prayerRequestLimiter = createRateLimiter(SUBMISSION_LIMIT);

/**
 * Best-effort caller identity for rate limiting.
 *
 * `x-forwarded-for` is client-supplied and therefore spoofable in principle;
 * in practice the hosting proxy appends the real peer last, and we read the
 * first entry, which is the convention Next.js deployments standardise on.
 * Callers we cannot identify share one bucket — a blunt instrument, but it
 * fails closed rather than handing anonymous traffic an unlimited allowance.
 */
async function callerKey(): Promise<string> {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  const address =
    forwarded?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip");

  if (!address) {
    log.debug("caller.unidentified");
    return "unidentified";
  }
  return address;
}

/** True when the honeypot was filled, which only automation does. */
function looksAutomated(input: SpamGuardFields): boolean {
  return Boolean(input.website && input.website.trim());
}

/** Turns a write outcome into copy for the visitor, logging the real reason. */
function toResult(form: string, outcome: StrapiPostOutcome): FormResult {
  if (outcome.ok) {
    log.info("submit.succeeded", { form });
    return { ok: true };
  }

  log.warn("submit.failed", { form, status: outcome.status });

  return {
    ok: false,
    error:
      outcome.status === "invalid"
        ? (outcome.message ?? INVALID_FALLBACK)
        : GENERIC_FAILURE,
  };
}

function tooManyAttempts(retryAfterSeconds: number): FormResult {
  const minutes = Math.max(1, Math.ceil(retryAfterSeconds / 60));
  return {
    ok: false,
    error: `That's a few submissions in a short time. Please try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
  };
}

// The content source validates too — this is the cheap first pass, so an
// obviously incomplete form never costs a round trip.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: string | undefined, maxLength: number): string {
  return (value ?? "").trim().slice(0, maxLength);
}

export async function subscribeToNewsletter(
  input: NewsletterSubscription
): Promise<FormResult> {
  // Report success to a bot rather than an error: a rejection tells whoever
  // wrote it which field gave them away, and nothing is stored either way.
  if (looksAutomated(input)) {
    log.warn("submit.rejected", { form: "newsletter", reason: "honeypot" });
    return { ok: true };
  }

  const verdict = newsletterLimiter.check(await callerKey());
  if (!verdict.allowed) {
    log.warn("submit.rejected", { form: "newsletter", reason: "rate-limit" });
    return tooManyAttempts(verdict.retryAfterSeconds);
  }

  const firstName = clean(input.firstName, 80);
  const email = clean(input.email, 254).toLowerCase();

  if (!firstName) {
    return { ok: false, error: "Please enter your first name." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const outcome = await postAPI("/newsletter-subscribers", {
    firstName,
    lastName: clean(input.lastName, 80) || undefined,
    email,
    preferences: (input.preferences ?? [])
      .map((preference) => clean(preference, 120))
      .filter(Boolean)
      .slice(0, 12),
  });

  return toResult("newsletter", outcome);
}

export async function submitPrayerRequest(
  input: PrayerRequestSubmission
): Promise<FormResult> {
  if (looksAutomated(input)) {
    log.warn("submit.rejected", { form: "prayer-request", reason: "honeypot" });
    return { ok: true };
  }

  const verdict = prayerRequestLimiter.check(await callerKey());
  if (!verdict.allowed) {
    log.warn("submit.rejected", {
      form: "prayer-request",
      reason: "rate-limit",
    });
    return tooManyAttempts(verdict.retryAfterSeconds);
  }

  const intention = clean(input.intention, 5000);
  // Name and email are optional by design: the form invites an anonymous
  // "please pray for me". An address is only checked once actually given.
  const email = clean(input.email, 254).toLowerCase();

  if (!intention) {
    return { ok: false, error: "Please share your prayer intention." };
  }
  if (email && !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const outcome = await postAPI("/prayer-requests", {
    name: clean(input.name, 80) || undefined,
    email: email || undefined,
    category: clean(input.category, 60) || "General",
    intention,
    isPublic: input.isPublic === true,
  });

  return toResult("prayer-request", outcome);
}
