import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ 
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Friends of Nyina wa Jambo",
  description: "Spreading the Message of Our Lady of Kibeho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} antialiased`}>
        <header className="bg-primary text-white py-4 text-center text-2xl font-semibold">
          Friends of Nyina wa Jambo
        </header>
        {children}
      </body>
    </html>
  );
}
