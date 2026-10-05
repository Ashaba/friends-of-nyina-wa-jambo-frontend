import type { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { sitePhotos } from "@/lib/site-photos";
import { PrayersContent } from "@/components/prayers-content";

export const metadata: Metadata = {
  title: "Rosary of the Seven Sorrows",
  description:
    "Pray the Rosary of the Seven Sorrows of the Blessed Virgin Mary, which Our Lady of Kibeho asked the world to pray, along with other prayers to Our Lady of Sorrows.",
  alternates: { canonical: "/prayers" },
};

export default function PrayersPage(): React.JSX.Element {
  return (
    <PageLayout>
      <PageHero
        photo={sitePhotos.altarDuringMass}
        title="Prayers & Devotions"
        subtitle="Draw closer to God through prayer"
        description="Our Lady asked the visionaries to promote prayer, especially the Rosary of the Seven Sorrows. “Pray, pray, pray” was her constant refrain."
      />
      <PrayersContent />
    </PageLayout>
  );
}
