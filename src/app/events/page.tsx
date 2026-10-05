import type { Metadata } from "next";
import { getEvents } from "@/lib/strapi";
import { todayInKibeho } from "@/lib/countdowns";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { sitePhotos } from "@/lib/site-photos";
import { EventsContent } from "@/components/events-content";

export const metadata: Metadata = {
  title: "Kibeho Pilgrimages and Events",
  description:
    "Pilgrimages to the Kibeho shrine in Rwanda, the 28 November feast of Our Lady of Kibeho, retreats, and prayer gatherings organised by the Friends of Nyina wa Jambo.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage(): Promise<React.JSX.Element> {
  const events = await getEvents();

  return (
    <PageLayout>
      <PageHero
        photo={sitePhotos.pilgrimsAtTheChurch}
        title="Events & Gatherings"
        subtitle="Come together in faith and community"
        description="Join fellow devotees for pilgrimages, prayer gatherings, retreats, and celebrations honouring Our Lady of Kibeho."
      />
      <EventsContent cmsEvents={events} today={todayInKibeho()} />
    </PageLayout>
  );
}
