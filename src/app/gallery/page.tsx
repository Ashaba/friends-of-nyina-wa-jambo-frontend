import type { Metadata } from "next";
import { getGalleryPhotos } from "@/lib/strapi";
import { sitePhotos } from "@/lib/site-photos";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { GalleryContent } from "@/components/gallery-content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A look at the Friends of Nyina wa Jambo in pictures; pilgrimages, retreats, prayers, journeys, and missions",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage(): Promise<React.JSX.Element> {
  const photos = await getGalleryPhotos();

  return (
    <PageLayout>
      <PageHero
        photo={sitePhotos.shrineGarden}
        title="Gallery"
        subtitle="Moments of faith and devotion to Our Lady"
        description="Photos of the Friends of Nyina wa Jambo spreading the message of Kibeho and bringing God's children closer to Christ through Her intercession."
      />
      <GalleryContent photos={photos} />
    </PageLayout>
  );
}
