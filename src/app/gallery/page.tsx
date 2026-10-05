import type { Metadata } from "next";
import { getGalleryPhotos } from "@/lib/strapi";
import { sitePhotos } from "@/lib/site-photos";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { GalleryContent } from "@/components/gallery-content";

export const metadata: Metadata = {
  title: "Photos of the Kibeho Shrine",
  description:
    "Photos of the shrine of Our Lady of Kibeho in Rwanda, pilgrimages to the place of the apparitions, and gatherings of the Friends of Nyina wa Jambo.",
  alternates: { canonical: "/gallery" },
};

export default async function GalleryPage(): Promise<React.JSX.Element> {
  const photos = await getGalleryPhotos();

  return (
    <PageLayout>
      <PageHero
        photo={sitePhotos.shrineGarden}
        title="Gallery"
        subtitle="Moments of faith and pilgrimage"
        description="Photos from pilgrimages to Kibeho and from our gatherings, shared by the Friends of Nyina wa Jambo community."
      />
      <GalleryContent photos={photos} />
    </PageLayout>
  );
}
