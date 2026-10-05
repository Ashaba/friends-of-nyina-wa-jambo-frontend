import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { EventBanner } from "@/components/event-banner";
import { todayInKibeho } from "@/lib/countdowns";
import { hideDismissedEventBannerScript } from "@/lib/event-banner-dismissal";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import { getEvents } from "@/lib/strapi";
import "./globals.css";

// Left unset in local and preview environments so their traffic never reaches
// the production property.
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// Canonical URLs are set per page: a canonical here would be inherited by every
// page and point them all at the homepage.
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: `${siteName} | Our Lady of Kibeho`,
  description: siteDescription,
  openGraph: { siteName, type: "website", locale: "en" },
  twitter: { card: "summary_large_image" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): Promise<React.ReactElement> {
  const events = await getEvents();

  // The banner script marks <html> before React loads.
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: hideDismissedEventBannerScript }}
        />
      </head>
      <body className="font-sans antialiased">
        <EventBanner events={events ?? []} builtOn={todayInKibeho()} />
        {children}
        <SpeedInsights />
        {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
      </body>
    </html>
  );
}
