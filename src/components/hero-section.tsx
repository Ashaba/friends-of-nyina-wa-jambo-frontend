import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { sitePhotos } from "@/lib/site-photos";

export function HeroSection(): React.JSX.Element {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={sitePhotos.shrineGroundsSky.src}
          alt={sitePhotos.shrineGroundsSky.alt}
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="object-cover object-[center_70%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/70 via-primary/55 to-foreground/75" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-background/80">
          Friends of Nyina wa Jambo
        </p>
        <h1 className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight text-background sm:text-5xl md:text-6xl lg:text-7xl">
          Our Lady of Kibeho
        </h1>
        <p className="mt-3 font-serif text-xl italic text-background/90 md:text-2xl">
          Mother of the Word
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-background/85 md:text-xl">
          &ldquo;The world is in danger. It is on the verge of falling into a
          deep ditch. Repent, repent, repent!&rdquo;
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-accent px-8 text-base font-semibold text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/messages">
              Discover the Messages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-background/40 bg-background/10 px-8 text-base font-semibold text-background hover:bg-background/20 hover:text-background"
          >
            <Link href="/prayer-requests">Request a Prayer</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
