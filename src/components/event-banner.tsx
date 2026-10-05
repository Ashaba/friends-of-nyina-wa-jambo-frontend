"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  formatDayCount,
  getBannerEvent,
  todayInKibeho,
  type BannerEvent,
} from "@/lib/countdowns";
import { dismissEventBanner } from "@/lib/event-banner-dismissal";
import type { Event } from "@/types/strapi";

const subscribeToNothing = (): (() => void) => () => {};

interface EventBannerProps {
  events: Event[];
  /** Today's date in Kibeho when the page was built, as YYYY-MM-DD. */
  builtOn: string;
}

export function EventBanner({
  events,
  builtOn,
}: EventBannerProps): React.JSX.Element | null {
  // A pre-built page can be out of date, so the browser's own date replaces
  // the build date once the page is running.
  const today = useSyncExternalStore(
    subscribeToNothing,
    () => todayInKibeho(),
    () => builtOn
  );
  const bannerEvent = getBannerEvent(events, today);
  if (!bannerEvent) return null;

  return (
    <aside
      aria-label="Event countdown"
      className="bg-primary text-primary-foreground in-data-event-banner-dismissed:hidden"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-2.5 lg:px-8">
        <p className="flex-1 text-sm leading-snug">
          <EventBannerMessage {...bannerEvent} />{" "}
          <Link
            href="/events"
            className="whitespace-nowrap font-semibold underline underline-offset-4"
          >
            See details &rarr;
          </Link>
        </p>
        <button
          type="button"
          aria-label="Dismiss countdown"
          className="-mr-1.5 rounded-sm p-1.5 text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          onClick={dismissEventBanner}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

function EventBannerMessage({
  event,
  countdown,
}: BannerEvent): React.JSX.Element {
  switch (countdown.kind) {
    case "upcoming":
      return (
        <>
          {formatDayCount(countdown.daysUntilStart)} until {event.title}.
        </>
      );
    case "startsToday":
      return <>Today: {event.title}.</>;
    case "underway":
      return (
        <>
          Day {countdown.dayOfEvent} of {countdown.lengthInDays}: {event.title}.
        </>
      );
  }
}
