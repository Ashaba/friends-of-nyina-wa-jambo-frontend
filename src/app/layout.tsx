import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { FeastBanner } from "@/components/feast-banner";
import { todayInKibeho } from "@/lib/countdowns";
import { hideDismissedFeastBannerScript } from "@/lib/feast-banner-dismissal";
import { siteDescription, siteName, siteUrl } from "@/lib/site";
import "./globals.css";

// Rebuilds pages that never fetch from the CMS hourly too, so the feast banner
// in their pre-built HTML stays close to the real date.
export const revalidate = 3600;

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  // The banner script marks <html> before React loads.
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: hideDismissedFeastBannerScript }}
        />
      </head>
      <body className="font-sans antialiased">
        <FeastBanner builtOn={todayInKibeho()} />
        {children}
        <SpeedInsights />
        {gaMeasurementId ? <GoogleAnalytics gaId={gaMeasurementId} /> : null}
      </body>
    </html>
  );
}
