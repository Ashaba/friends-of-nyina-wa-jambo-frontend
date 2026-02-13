import { getEvents } from "@/lib/strapi";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { EventsContent } from "@/components/events-content";

export const metadata = {
  title: "Events | Friends of Nyina wa Jambo",
  description:
    "Discover upcoming pilgrimages, prayer gatherings, retreats, and community events organised by the Friends of Nyina wa Jambo.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <PageLayout>
      <PageHero
        title="Events & Gatherings"
        subtitle="Come together in faith and community"
        description="Join fellow devotees for pilgrimages, prayer gatherings, retreats, and celebrations honouring Our Lady of Kibeho."
      />
      <EventsContent cmsEvents={events} />
    </PageLayout>
  );
}
