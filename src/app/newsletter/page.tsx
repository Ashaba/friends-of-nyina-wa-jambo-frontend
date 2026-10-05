import type { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { sitePhotos } from "@/lib/site-photos";
import { NewsletterContent } from "@/components/newsletter-content";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Subscribe to the Friends of Nyina wa Jambo newsletter for reflections on the Message of Our Lady of Kibeho, pilgrimages to Rwanda, events, and prayer intentions.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage(): React.JSX.Element {
  return (
    <PageLayout>
      <PageHero
        photo={sitePhotos.pathToTheShrine}
        title="Newsletter"
        subtitle="Stay connected in faith"
        description="Receive reflections on the Message of Our Lady, events, prayer intentions, and community news directly in your inbox."
      />
      <NewsletterContent />
    </PageLayout>
  );
}
