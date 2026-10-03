import { Lora } from "next/font/google";

// Only prayer text uses Lora, so it is applied per page instead of in the root
// layout, where Next.js would preload it on every page.
export const lora = Lora({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-lora",
});
