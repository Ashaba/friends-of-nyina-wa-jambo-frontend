import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { NewsletterContent } from "@/components/newsletter-content";

export const metadata = {
  title: "Newsletter | Friends of Nyina wa Jambo",
  description:
    "Subscribe to the Friends of Nyina wa Jambo newsletter and stay connected with the latest messages, events, and prayer intentions.",
};

export default function NewsletterPage() {
  return (
    <PageLayout>
      <PageHero
        title="Newsletter"
        subtitle="Stay connected in faith"
        description="Receive updates on messages, events, prayer intentions, and community news directly in your inbox."
      />
      <NewsletterContent />
    </PageLayout>
  );
}
