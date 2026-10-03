import type { Metadata } from "next";
import { getDailyMessage } from "@/lib/strapi";
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  alternateName: "Nyina wa Jambo",
  url: siteUrl.href,
  description: siteDescription,
};

export default async function Home(): Promise<React.JSX.Element> {
  const dailyMessage = await getDailyMessage();

  return (
    <>
      <script
        type="application/ld+json"
        // Escaping "<" stops the JSON from closing the script tag early.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
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
        <AboutSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
