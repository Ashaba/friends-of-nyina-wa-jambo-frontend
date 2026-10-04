import Image from "next/image";
import type { SitePhoto } from "@/types/site-photo";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  photo: SitePhoto;
}

export function PageHero({
  title,
  subtitle,
  description,
  photo,
}: PageHeroProps): React.JSX.Element {
  return (
    <section className="relative isolate overflow-hidden bg-primary px-6 py-20">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-primary/85 via-primary/75 to-primary/90" />
      <div className="mx-auto max-w-4xl text-center">
        {subtitle && (
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.15em] text-primary-foreground/80">
            {subtitle}
          </p>
        )}
        <h1 className="text-balance font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/90">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
