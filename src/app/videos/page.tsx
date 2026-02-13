import { getVideos } from "@/lib/strapi";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { VideosContent } from "@/components/videos-content";

export const metadata = {
  title: "Videos | Friends of Nyina wa Jambo",
  description:
    "Watch pilgrimage recordings, visionary encounters, prayer guides, and testimonies from the Friends of Nyina wa Jambo community.",
};

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <PageLayout>
      <PageHero
        title="Videos"
        subtitle="Watch, learn, and be inspired"
        description="Explore our collection of pilgrimage recordings, visionary encounters, guided prayers, and testimonies of faith from the Kibeho community."
      />
      <VideosContent cmsVideos={videos} />
    </PageLayout>
  );
}
