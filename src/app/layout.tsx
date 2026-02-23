import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Friends of Nyina wa Jambo | Our Lady of Kibeho",
  description:
    "Friends of Nyina wa Jambo - A movement spreading the messages of Our Lady of Kibeho, Mother of the Word. Join us in prayer, novenas, and sharing the message of hope, repentance, and peace to the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
