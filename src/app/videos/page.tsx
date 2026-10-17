import type { Metadata } from "next";
import { getVideos } from "@/lib/strapi";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { sitePhotos } from "@/lib/site-photos";
import { VideosContent } from "@/components/videos-content";

export const metadata: Metadata = {
  title: "Kibeho Videos and Testimonies",
  description:
    "Watch pilgrimages to Kibeho, Rwanda, talks with the visionaries, guided Seven Sorrows Rosary prayers, and testimonies about Our Lady of Kibeho.",
  alternates: { canonical: "/videos" },
};

export default async function VideosPage(): Promise<React.JSX.Element> {
  const videos = await getVideos();

  return (
    <PageLayout>
      <PageHero
        photo={sitePhotos.shrineChurch}
        title="Videos"
        subtitle="Watch, learn, and be inspired"
        description="Explore our collection of pilgrimage recordings, visionary encounters, guided prayers, and testimonies of faith from the Kibeho community."
      />
      <VideosContent cmsVideos={videos} />
    </PageLayout>
  );
}
