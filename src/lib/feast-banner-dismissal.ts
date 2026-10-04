import { KIBEHO_TIME_ZONE } from "@/lib/countdowns";

const DISMISSED_FOR_FEAST_KEY = "feastBannerDismissedForFeast";

/** Set on <html> once the visitor closes the banner for this year's feast. */
export const FEAST_BANNER_DISMISSED_ATTRIBUTE = "data-feast-banner-dismissed";

/**
 * Runs in <head> before the page is painted. Pages are pre-built for every
 * visitor, so without it a banner the visitor closed would flash into view on
 * each page load until React caught up.
 */
export const hideDismissedFeastBannerScript = `
if ((localStorage.getItem("${DISMISSED_FOR_FEAST_KEY}") ?? "") >=
  new Intl.DateTimeFormat("en-CA", { timeZone: "${KIBEHO_TIME_ZONE}" }).format(new Date())) {
  document.documentElement.setAttribute("${FEAST_BANNER_DISMISSED_ATTRIBUTE}", "");
}`;

/** Hides the banner until the feast on `feastDate` has passed. */
export function dismissFeastBanner(feastDate: string): void {
  document.documentElement.setAttribute(FEAST_BANNER_DISMISSED_ATTRIBUTE, "");
  localStorage.setItem(DISMISSED_FOR_FEAST_KEY, feastDate);
}
