import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { PrayerRequestForm } from "@/components/prayer-request-form";

export const metadata = {
  title: "Prayer Requests | Friends of Nyina wa Jambo",
  description:
    "Submit your prayer intentions to the Friends of Nyina wa Jambo community. We will pray for you through the intercession of Our Lady of Kibeho.",
};

export default function PrayerRequestsPage() {
  return (
    <PageLayout>
      <PageHero
        title="Prayer Requests"
        subtitle="We are here to pray with you"
        description="Share your intentions and let our community lift them in prayer through the intercession of Our Lady of Kibeho, Nyina wa Jambo — Mother of the Word."
      />
      <PrayerRequestForm />
    </PageLayout>
  );
}
