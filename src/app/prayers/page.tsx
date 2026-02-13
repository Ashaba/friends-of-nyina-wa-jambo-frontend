import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { PrayersContent } from "@/components/prayers-content";

export const metadata = {
  title: "Prayers | Friends of Nyina wa Jambo",
  description:
    "Pray the Rosary of the Seven Sorrows and other devotional prayers given through Our Lady of Kibeho.",
};

export default function PrayersPage(): React.JSX.Element {
  return (
    <PageLayout>
      <PageHero
        title="Prayers & Devotions"
        subtitle="Draw closer to God through prayer"
        description='Our Lady asked the visionaries to promote prayer, especially the Rosary of the Seven Sorrows. "Pray, pray, pray" was her constant refrain.'
      />
      <PrayersContent />
    </PageLayout>
  );
}
