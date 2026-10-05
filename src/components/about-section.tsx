import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { sitePhotos } from "@/lib/site-photos";

export function AboutSection(): React.JSX.Element {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src={sitePhotos.ourLadyStatue.src}
              alt={sitePhotos.ourLadyStatue.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary">
              The Apparitions of Nyina wa Jambo
            </p>
            <h2 className="text-balance font-serif text-3xl font-bold text-foreground md:text-4xl">
              A Mother&rsquo;s Call to Her Children
            </h2>
            <div className="flex flex-col gap-4 leading-relaxed text-foreground/75">
              <p>
                Between November 28, 1981 and November 28, 1989, the Blessed
                Virgin Mary appeared to three young students at Kibeho College
                in Rwanda, Africa. These apparitions were officially approved by
                the Catholic Church on June 29, 2001, and remain the only
                Church-approved Marian apparitions on the African continent.
              </p>
              <p>
                Our Lady identified herself as the{" "}
                <strong className="text-foreground">
                  &ldquo;Mother of the Word&rdquo;
                </strong>{" "}
                and delivered one urgent Message calling all humanity to love,
                prayer, repentance, conversion of hearts, and reconciliation.
              </p>
              <p>
                The three visionaries were Alphonsine Mumureke, Nathalie
                Mukamazimpaka, and Marie Claire Mukangango. Each received a part
                of the one Message of Our Lady of Kibeho, a call for the entire
                world.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/messages">
                Read the Full Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
