const DISMISSED_KEY = "eventBannerDismissed";

/** Set on <html> once the visitor closes the banner in this browser session. */
export const EVENT_BANNER_DISMISSED_ATTRIBUTE = "data-event-banner-dismissed";

/**
 * Runs in <head> before the page is painted. Pages are pre-built for every
 * visitor, so without it a banner the visitor closed would flash into view on
 * each page load until React caught up.
 */
export const hideDismissedEventBannerScript = `
if (sessionStorage.getItem("${DISMISSED_KEY}")) {
  document.documentElement.setAttribute("${EVENT_BANNER_DISMISSED_ATTRIBUTE}", "");
}`;

/** Hides the banner for the rest of this browser session. */
export function dismissEventBanner(): void {
  document.documentElement.setAttribute(EVENT_BANNER_DISMISSED_ATTRIBUTE, "");
  sessionStorage.setItem(DISMISSED_KEY, "true");
}
