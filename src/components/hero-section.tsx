import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection(): React.JSX.Element {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-kibeho.svg"
          alt="The rolling hills of Kibeho, Rwanda"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-background/80">
          Friends of Nyina wa Jambo
        </p>
        <h1 className="text-balance font-serif text-4xl font-bold leading-tight tracking-tight text-background sm:text-5xl md:text-6xl lg:text-7xl">
          Our Lady of Kibeho
        </h1>
        <p className="mt-2 font-serif text-base italic text-background/70">
          Mother of the Word
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-background/85 md:text-xl">
          &ldquo;I have come to prepare the way for my Son, for his return. The
          world is on the edge of catastrophe. Repent, repent, repent!&rdquo;
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/messages">
            <Button
              size="lg"
              className="bg-accent px-8 text-base font-semibold text-accent-foreground hover:bg-accent/90"
            >
              Discover the Messages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/prayer-requests">
            <Button
              size="lg"
              variant="outline"
              className="border-background/40 bg-background/10 px-8 text-base font-semibold text-background hover:bg-background/20 hover:text-background"
            >
              Request a Prayer
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
