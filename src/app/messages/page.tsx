import { PageLayout } from "@/components/page-layout";
import { PageHero } from "@/components/page-hero";
import { MessagesContent } from "@/components/messages-content";

export const metadata = {
  title: "Messages | Friends of Nyina wa Jambo",
  description:
    "Explore the messages given by Our Lady of Kibeho to the three visionaries: Alphonsine, Nathalie, and Marie Claire.",
};

export default function MessagesPage() {
  return (
    <PageLayout>
      <PageHero
        title="Messages of Our Lady"
        subtitle="Words given to the visionaries of Kibeho"
        description="Our Lady appeared to three young students in Kibeho, Rwanda between 1981 and 1989, sharing urgent messages of prayer, repentance, and conversion for the whole world."
      />
      <MessagesContent />
    </PageLayout>
  );
}
