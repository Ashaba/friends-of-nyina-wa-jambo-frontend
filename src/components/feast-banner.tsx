"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import {
  formatDayCount,
  getFeastBannerSeason,
  todayInKibeho,
  type FeastSeason,
} from "@/lib/countdowns";
import { dismissFeastBanner } from "@/lib/feast-banner-dismissal";

const subscribeToNothing = (): (() => void) => () => {};

interface FeastBannerProps {
  /** Today's date in Kibeho when the page was built, as YYYY-MM-DD. */
  builtOn: string;
}

export function FeastBanner({
  builtOn,
}: FeastBannerProps): React.JSX.Element | null {
  // A pre-built page can be a day or more old, so the browser's own date
  // replaces the build date once the page is running.
  const today = useSyncExternalStore(
    subscribeToNothing,
    () => todayInKibeho(),
    () => builtOn
  );
  const season = getFeastBannerSeason(today);
  if (!season) return null;

  return (
    <aside
      aria-label="Feast countdown"
      className="bg-primary text-primary-foreground in-data-feast-banner-dismissed:hidden"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-2.5 lg:px-8">
        <p className="flex-1 text-sm leading-snug">
          <FeastBannerMessage season={season} />
        </p>
        <button
          type="button"
          aria-label="Dismiss countdown"
          className="-mr-1.5 rounded-sm p-1.5 text-primary-foreground/80 transition-colors hover:text-primary-foreground"
          onClick={dismissFeastBanner}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}

function FeastBannerMessage({
  season,
}: {
  season: FeastSeason;
}): React.JSX.Element {
  switch (season.kind) {
    case "countdown":
      return (
        <>
          {formatDayCount(season.daysUntilFeast)} until the Feast of Our Lady of
          Kibeho. <BannerLink href="/novenas">Read the novena</BannerLink>
        </>
      );
    case "novena":
      return (
        <>
          Day {season.novenaDay} of the novena to Our Lady of Kibeho.{" "}
          <BannerLink href="/novenas">Pray day {season.novenaDay}</BannerLink>
        </>
      );
    case "feastDay":
      return (
        <>
          Today is the Feast of Our Lady of Kibeho.{" "}
          <BannerLink href="/events">See feast day events</BannerLink>
        </>
      );
  }
}

function BannerLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Link
      href={href}
      className="whitespace-nowrap font-semibold underline underline-offset-4"
    >
      {children} &rarr;
    </Link>
  );
}
