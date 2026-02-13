import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image
              src="/images/our-lady.svg"
              alt="Our Lady of Kibeho"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary">
              Nyina wa Jambo &mdash; The Apparitions
            </p>
            <h2 className="text-balance font-serif text-3xl font-bold text-foreground md:text-4xl">
              A Mother&apos;s Call to Her Children
            </h2>
            <div className="flex flex-col gap-4 leading-relaxed text-foreground/75">
              <p>
                Between November 28, 1981 and November 28, 1989, the Blessed
                Virgin Mary appeared to three young students at Kibeho College
                in Rwanda, Africa. These apparitions were officially approved by
                the Catholic Church on June 29, 2001.
              </p>
              <p>
                Our Lady identified herself as the{" "}
                <strong className="text-foreground">
                  &ldquo;Mother of the Word&rdquo;
                </strong>{" "}
                and delivered urgent messages calling all humanity to prayer,
                repentance, conversion of hearts, and reconciliation.
              </p>
              <p>
                The three visionaries &mdash; Alphonsine Mumureke, Nathalie
                Mukamazimpaka, and Marie Claire Mukangango &mdash; each received
                distinct messages that together form a powerful call for the
                entire world.
              </p>
            </div>
            <Link href="/messages" className="mt-2">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Read the Full Messages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
