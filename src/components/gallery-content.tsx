import Image from "next/image";
import type { GalleryPhoto } from "@/types/strapi";

interface GalleryContentProps {
  photos: GalleryPhoto[];
}

// takenOn is a calendar date, so format it in UTC to keep the visitor's time
// zone from moving it to the day before.
const takenOnFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeZone: "UTC",
});

export function GalleryContent({
  photos,
}: GalleryContentProps): React.JSX.Element {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {photos.length ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {photos.map((photo) => (
              <li key={photo.id}>
                <figure className="overflow-hidden rounded-lg border border-border bg-card">
                  <div className="relative aspect-[3/2] bg-secondary">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1152px) 368px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="flex flex-col gap-1 p-4">
                    <span className="text-sm leading-relaxed text-foreground">
                      {photo.caption}
                    </span>
                    <time
                      dateTime={photo.takenOn}
                      className="text-xs text-muted-foreground"
                    >
                      {takenOnFormat.format(new Date(photo.takenOn))}
                    </time>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border border-border bg-secondary p-10 text-center leading-relaxed text-muted-foreground">
            Photos from our pilgrimages and gatherings will appear here soon.
          </p>
        )}
      </div>
    </section>
  );
}
