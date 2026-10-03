import type { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { NovenasContent } from "@/components/novenas-content";

export const metadata: Metadata = {
  title: "Novenas | Friends of Nyina wa Jambo",
  description:
    "Pray the Novena to Our Lady of Kibeho. Nine days of dedicated prayer, Scripture readings, reflections, and intercessions.",
  alternates: { canonical: "/novenas" },
};

export default function NovenasPage(): React.JSX.Element {
  return (
    <PageLayout>
      <PageHero
        title="Novenas"
        subtitle="Nine days of devoted prayer"
        description="Unite with fellow devotees in a nine-day novena to Our Lady of Kibeho, reflecting on her messages and seeking her powerful intercession."
      />
      <NovenasContent />
    </PageLayout>
  );
}
