import type { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { sitePhotos } from "@/lib/site-photos";
import { NovenasContent } from "@/components/novenas-content";

export const metadata: Metadata = {
  title: "Novena to Our Lady of Kibeho",
  description:
    "Pray the Novena to Our Lady of Kibeho, Mother of the Word. Nine days of prayer to the Virgin Mary with Scripture readings, reflections, and intercessions.",
  alternates: { canonical: "/novenas" },
};

export default function NovenasPage(): React.JSX.Element {
  return (
    <PageLayout>
      <PageHero
        photo={sitePhotos.cloudsAndLight}
        title="Novenas"
        subtitle="Nine days of devoted prayer"
        description="Unite with fellow devotees in a nine-day novena to Our Lady of Kibeho, reflecting on her Message and seeking her powerful intercession."
      />
      <NovenasContent />
    </PageLayout>
  );
}
