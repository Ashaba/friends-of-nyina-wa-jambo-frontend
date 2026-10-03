import type { Metadata } from "next";
import { getVideos } from "@/lib/strapi";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { VideosContent } from "@/components/videos-content";

export const metadata: Metadata = {
  title: "Videos | Friends of Nyina wa Jambo",
  description:
    "Watch pilgrimage recordings, visionary encounters, prayer guides, and testimonies from the Friends of Nyina wa Jambo community.",
  alternates: { canonical: "/videos" },
};

export default async function VideosPage(): Promise<React.JSX.Element> {
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
