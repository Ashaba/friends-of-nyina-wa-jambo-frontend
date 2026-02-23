"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Clock, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/strapi";

const fallbackEvents: Event[] = [
  {
    id: 1,
    title: "Feast of Our Lady of Kibeho",
    date: "November 28, 2026",
    time: "9:00 AM - 5:00 PM",
    location: "Kibeho Shrine, Rwanda",
    type: "Feast Day",
    description:
      "The annual feast day celebrating the first apparition of Our Lady to Alphonsine Mumureke. Join pilgrims from around the world for Holy Mass, processions, the Rosary of the Seven Sorrows, and all-day adoration.",
    image: "/images/pilgrimage.svg",
    featured: true,
  },
  {
    id: 2,
    title: "Novena to Our Lady of Kibeho",
    date: "November 19 - 27, 2026",
    time: "7:00 PM nightly",
    location: "Online & Local Parishes",
    type: "Novena",
    description:
      "A nine-day communal novena leading up to the Feast of Our Lady of Kibeho. Pray with the community online or organize a group at your local parish.",
    featured: false,
  },
  {
    id: 3,
    title: "Pilgrimage to Kibeho",
    date: "March 15 - 25, 2026",
    time: "Full Day",
    location: "Rwanda",
    type: "Pilgrimage",
    description:
      "A guided 10-day pilgrimage to the holy sites of Kibeho, including the apparition chapel, the Shrine, and the surrounding communities. Includes daily Mass, Rosary, and time for personal reflection.",
    featured: false,
  },
  {
    id: 4,
    title: "Rosary of the Seven Sorrows Retreat",
    date: "September 12 - 14, 2026",
    time: "Friday evening - Sunday afternoon",
    location: "Retreat Center TBD",
    type: "Retreat",
    description:
      "A weekend retreat focusing on the Rosary of the Seven Sorrows, as taught by Our Lady of Kibeho to Marie Claire. Includes talks, meditations, confession, and community prayer.",
    featured: false,
  },
  {
    id: 5,
    title: "Monthly First Saturday Devotion",
    date: "First Saturday of each month",
    time: "8:00 AM - 12:00 PM",
    location: "Various Parishes Worldwide",
    type: "Recurring",
    description:
      "A monthly gathering for the First Saturday devotion, including Holy Mass, the Rosary of the Seven Sorrows, confession, and a meditation on the messages of Kibeho.",
    featured: false,
  },
  {
    id: 6,
    title: "Youth Prayer Vigil",
    date: "August 15, 2026",
    time: "7:00 PM - 12:00 AM",
    location: "Online",
    type: "Vigil",
    description:
      "A special prayer vigil for young people on the Solemnity of the Assumption, reflecting on Our Lady's messages to the young visionaries of Kibeho and their relevance for youth today.",
    featured: false,
  },
];

const eventTypes = [
  "All",
  "Feast Day",
  "Novena",
  "Pilgrimage",
  "Retreat",
  "Recurring",
  "Vigil",
];

function getTypeColor(type: string): string {
  switch (type) {
    case "Feast Day":
      return "bg-accent text-accent-foreground";
    case "Pilgrimage":
      return "bg-primary text-primary-foreground";
    case "Retreat":
      return "bg-primary/80 text-primary-foreground";
    case "Novena":
      return "bg-accent/80 text-accent-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

interface EventsContentProps {
  cmsEvents?: Event[] | null;
}

export function EventsContent({
  cmsEvents,
}: EventsContentProps): React.JSX.Element {
  const events = cmsEvents && cmsEvents.length > 0 ? cmsEvents : fallbackEvents;
  const [filter, setFilter] = useState("All");
  const [expandedEvent, setExpandedEvent] = useState<number | null>(
    events[0]?.id ?? 1
  );

  const filteredEvents =
    filter === "All" ? events : events.filter((e) => e.type === filter);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-2">
          {eventTypes.map((type) => (
            <Button
              key={type}
              variant={filter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(type)}
              className={cn(
                filter === type
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-secondary"
              )}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Featured Event */}
        {filter === "All" &&
          events
            .filter((e) => e.featured)
            .map((event) => (
              <div
                key={event.id}
                className="mb-10 overflow-hidden rounded-lg border border-border bg-card"
              >
                {event.image && (
                  <div className="relative aspect-[21/9] w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-foreground/30" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span
                        className={cn(
                          "mb-3 inline-block rounded-full px-3 py-1 text-xs font-semibold",
                          getTypeColor(event.type)
                        )}
                      >
                        {event.type}
                      </span>
                      <h2 className="font-serif text-2xl font-bold text-background md:text-3xl">
                        {event.title}
                      </h2>
                    </div>
                  </div>
                )}
                <div className="p-8">
                  <div className="mb-4 flex flex-wrap gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </span>
                  </div>
                  <p className="leading-relaxed text-foreground/75">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}

        {/* Event List */}
        <div className="flex flex-col gap-4">
          {filteredEvents
            .filter((e) => (filter === "All" ? !e.featured : true))
            .map((event) => (
              <div
                key={event.id}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-6 text-left"
                  onClick={() =>
                    setExpandedEvent(
                      expandedEvent === event.id ? null : event.id
                    )
                  }
                  aria-expanded={expandedEvent === event.id}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-secondary">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-block rounded-full px-2 py-0.5 text-xs font-semibold",
                            getTypeColor(event.type)
                          )}
                        >
                          {event.type}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {event.date}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={cn(
                      "ml-4 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      expandedEvent === event.id && "rotate-90"
                    )}
                  />
                </button>

                {expandedEvent === event.id && (
                  <div className="animate-fade-in px-6 pb-6">
                    <div className="mb-4 flex flex-wrap gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                    </div>
                    <p className="leading-relaxed text-foreground/75">
                      {event.description}
                    </p>
                    <Button
                      className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90"
                      size="sm"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Register Interest
                    </Button>
                  </div>
                )}
              </div>
            ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No events found for this category. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
