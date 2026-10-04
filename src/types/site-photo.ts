import type { StaticImageData } from "next/image";

/** A photo bundled with the site, with the alt text it is always shown with. */
export interface SitePhoto {
  src: StaticImageData;
  alt: string;
}
