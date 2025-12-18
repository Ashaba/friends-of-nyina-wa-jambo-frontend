import React from 'react';
import type { Metadata } from 'next';
import { getGlobalSettings, getStrapiMediaUrl } from '@/lib/strapi';
import './globals.css';

/**
 * Generate metadata from Strapi global settings
 */
export async function generateMetadata(): Promise<Metadata> {
  const globalSettings = await getGlobalSettings();

  const defaultSeo = globalSettings?.defaultSeo;
  const faviconUrl = getStrapiMediaUrl(globalSettings?.favicon?.url);

  return {
    title: {
      default: defaultSeo?.metaTitle || globalSettings?.siteName || 'Friends of Nyina wa Jambo',
      template: `%s | ${globalSettings?.siteName || 'Friends of Nyina wa Jambo'}`,
    },
    description: defaultSeo?.metaDescription || globalSettings?.siteDescription || '',
    openGraph: {
      title: defaultSeo?.metaTitle || globalSettings?.siteName,
      description: defaultSeo?.metaDescription || globalSettings?.siteDescription,
      images: defaultSeo?.shareImage ? [getStrapiMediaUrl(defaultSeo.shareImage.url)!] : [],
      type: 'website',
    },
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
