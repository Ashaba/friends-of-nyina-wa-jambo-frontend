import Link from "next/link";
import { ArrowRight, CalendarHeart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getFeastSeason,
  getUpcomingPilgrimages,
  type FeastSeason,
} from "@/lib/countdowns";
import { describeEventDates, formatCalendarDate } from "@/lib/event-dates";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/strapi";

interface CountdownSectionProps {
  /** Today's date in Kibeho, as YYYY-MM-DD. */
  today: string;
  events: Event[];
}

const days = (count: number): string =>
  count === 1 ? "1 day" : `${count} days`;

export function CountdownSection({
  today,
  events,
}: CountdownSectionProps): React.JSX.Element {
  const pilgrimages = getUpcomingPilgrimages(events, today);

  return (
    <section className="px-6 py-20">
      <div
        className={cn(
          "mx-auto grid grid-cols-1 gap-6",
          pilgrimages.length > 0 ? "max-w-5xl md:grid-cols-2" : "max-w-2xl"
        )}
      >
        <FeastCountdown season={getFeastSeason(today)} />

        {pilgrimages.length > 0 && (
          <div className="flex flex-col rounded-lg border border-border bg-card p-8">
            <p className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-primary">
              <MapPin className="h-4 w-4" />
              Upcoming Pilgrimages
            </p>
            <ul className="flex flex-1 flex-col gap-5">
              {pilgrimages.map(({ event, daysUntilStart }) => (
                <li key={event.id}>
                  <p className="font-serif text-xl font-bold text-foreground">
                    {event.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {describeEventDates(event)}, in {days(daysUntilStart)}
                  </p>
                </li>
              ))}
            </ul>
            <CountdownLink href="/events">See all events</CountdownLink>
          </div>
        )}
      </div>
    </section>
  );
}

function FeastCountdown({
  season,
}: {
  season: FeastSeason;
}): React.JSX.Element {
  return (
    <div className="flex flex-col rounded-lg border border-border bg-secondary p-8">
      <p className="mb-6 flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-primary">
        <CalendarHeart className="h-4 w-4" />
        Feast of Our Lady of Kibeho
      </p>
      <FeastSeasonDetails season={season} />
    </div>
  );
}

function FeastSeasonDetails({
  season,
}: {
  season: FeastSeason;
}): React.JSX.Element {
  const feastDate = formatCalendarDate(season.feastDate);

  switch (season.kind) {
    case "countdown":
      return (
        <>
          <p className="font-serif text-5xl font-bold text-foreground md:text-6xl">
            {days(season.daysUntilFeast)}
          </p>
          <p className="mt-3 flex-1 leading-relaxed text-foreground/75">
            until the feast on {feastDate}. The novena to prepare for it begins
            on {formatCalendarDate(season.novenaStartDate)}.
          </p>
          <CountdownLink href="/novenas">Read the novena</CountdownLink>
        </>
      );
    case "novena":
      return (
        <>
          <p className="font-serif text-5xl font-bold text-foreground md:text-6xl">
            Day {season.novenaDay} of 9
          </p>
          <p className="mt-3 flex-1 leading-relaxed text-foreground/75">
            The novena has begun. Pray with pilgrims around the world as we
            prepare for the feast on {feastDate}.
          </p>
          <CountdownLink href="/novenas">
            Pray day {season.novenaDay}
          </CountdownLink>
        </>
      );
    case "feastDay":
      return (
        <>
          <p className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Today is the feast
          </p>
          <p className="mt-3 flex-1 leading-relaxed text-foreground/75">
            On this day in 1981, Our Lady first appeared to Alphonsine Mumureke
            at Kibeho. Pilgrims gather at the shrine to celebrate.
          </p>
          <CountdownLink href="/events">See feast day events</CountdownLink>
        </>
      );
  }
}

function CountdownLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <Button
      asChild
      className="mt-6 self-start bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <Link href={href}>
        {children}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}
