import type { Metadata } from "next";
import { getDailyMessage, getEvents } from "@/lib/strapi";
import { todayInKibeho } from "@/lib/countdowns";
import { CountdownSection } from "@/components/countdown-section";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { DailyMessage } from "@/components/daily-message";
import { AboutSection } from "@/components/about-section";
import { FeaturesSection } from "@/components/features-section";
import { CtaSection } from "@/components/cta-section";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const ourLadyOfKibeho = {
  "@type": "Thing",
  name: "Our Lady of Kibeho",
  alternateName: [
    "Nyina wa Jambo",
    "Mother of the Word",
    "Notre-Dame de Kibeho",
  ],
  sameAs: "https://en.wikipedia.org/wiki/Our_Lady_of_Kibeho",
};

const kibeho = {
  "@type": "Place",
  name: "Kibeho, Rwanda",
  sameAs: "https://en.wikipedia.org/wiki/Kibeho",
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      alternateName: "Nyina wa Jambo",
      url: siteUrl.href,
      description: siteDescription,
      knowsAbout: [ourLadyOfKibeho, kibeho, "Rosary of the Seven Sorrows"],
    },
    {
      "@type": "WebSite",
      name: siteName,
      alternateName: "Nyina wa Jambo",
      url: siteUrl.href,
      inLanguage: "en",
      about: ourLadyOfKibeho,
    },
  ],
};

export default async function Home(): Promise<React.JSX.Element> {
  const [dailyMessage, events] = await Promise.all([
    getDailyMessage(),
    getEvents(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        // Escaping "<" stops the JSON from closing the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection />
        <DailyMessage
          cmsMessage={dailyMessage.data}
          fetchStatus={dailyMessage.status}
          fetchDetail={dailyMessage.detail}
        />
        <CountdownSection today={todayInKibeho()} events={events ?? []} />
        <AboutSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
