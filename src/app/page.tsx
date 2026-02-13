import { getDailyMessage } from "@/lib/strapi";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { DailyMessage } from "@/components/daily-message";
import { AboutSection } from "@/components/about-section";
import { FeaturesSection } from "@/components/features-section";
import { CtaSection } from "@/components/cta-section";

export default async function Home() {
  const cmsMessage = await getDailyMessage();

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <HeroSection />
        <DailyMessage cmsMessage={cmsMessage} />
        <AboutSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
