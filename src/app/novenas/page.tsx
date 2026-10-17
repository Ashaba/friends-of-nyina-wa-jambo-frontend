import type { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { sitePhotos } from "@/lib/site-photos";
import { NovenasContent } from "@/components/novenas-content";

export const metadata: Metadata = {
  title: { absolute: "Novenas" },
  description:
    "Join us in praying novenas for the seasons and feasts of the Church year: nine days of prayer, reflection, and intercession, united with fellow devotees.",
  alternates: { canonical: "/novenas" },
};

export default function NovenasPage(): React.JSX.Element {
  return (
    <PageLayout>
      <PageHero
        photo={sitePhotos.cloudsAndLight}
        title="Novenas"
        subtitle="Nine days of devoted prayer"
        description="Pray together each day of the novena, reflecting on Scripture and bringing our intentions before God."
      />
      <NovenasContent />
    </PageLayout>
  );
}
