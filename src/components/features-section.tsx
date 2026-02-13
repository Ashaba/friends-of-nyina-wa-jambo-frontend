import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const features = [
  {
    title: "Prayers",
    description:
      "A collection of powerful prayers including the Rosary of the Seven Sorrows, prayers for peace, and devotions to Our Lady.",
    href: "/prayers",
    image: "/images/rosary.svg",
  },
  {
    title: "Novenas",
    description:
      "Nine-day prayers to deepen your devotion and seek the intercession of Our Lady of Kibeho for your intentions.",
    href: "/novenas",
    image: "/images/candles.svg",
  },
  {
    title: "Events & Pilgrimages",
    description:
      "Join upcoming pilgrimages, retreats, feast day celebrations, and community gatherings honoring Our Lady.",
    href: "/events",
    image: "/images/pilgrimage.svg",
  },
];

export function FeaturesSection(): React.JSX.Element {
  return (
    <section className="bg-secondary px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
            Deepen Your Faith
          </p>
          <h2 className="text-balance font-serif text-3xl font-bold text-foreground md:text-4xl">
            Walk the Path of Devotion
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
                  {feature.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-all group-hover:gap-2">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
