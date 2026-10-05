import type { Metadata } from "next";
import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { sitePhotos } from "@/lib/site-photos";
import { MessagesContent } from "@/components/messages-content";

export const metadata: Metadata = {
  title: "Message of Our Lady of Kibeho",
  description:
    "The Message of Our Lady of Kibeho, Mother of the Word: one call to love, repentance, and conversion of hearts, given in Rwanda to Alphonsine, Nathalie, and Marie Claire.",
  alternates: { canonical: "/messages" },
};

export default function MessagesPage(): React.JSX.Element {
  return (
    <PageLayout>
      <PageHero
        photo={sitePhotos.altarBanner}
        title="Message of Our Lady of Kibeho"
        subtitle="Given to the visionaries of Kibeho"
        description="Our Lady appeared to three young students in Kibeho, Rwanda between 1981 and 1989, with one urgent Message for the whole world: a call to love, repentance, and conversion of hearts."
      />
      <MessagesContent />
    </PageLayout>
  );
}
