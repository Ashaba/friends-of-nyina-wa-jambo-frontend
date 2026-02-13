import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Mail } from "lucide-react";

export function CtaSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Prayer Request CTA */}
          <div className="flex flex-col gap-6 rounded-lg bg-primary p-10 md:p-12">
            <Heart className="h-8 w-8 text-primary-foreground/80" />
            <h3 className="text-balance font-serif text-2xl font-bold text-primary-foreground md:text-3xl">
              Request a Prayer
            </h3>
            <p className="leading-relaxed text-primary-foreground/75">
              Share your prayer intentions with the Friends of Nyina wa Jambo.
              We pray together for all who seek Our Lady&apos;s intercession and
              the grace of God in their lives.
            </p>
            <Link href="/prayer-requests" className="mt-2">
              <Button
                size="lg"
                className="bg-accent font-semibold text-accent-foreground hover:bg-accent/90"
              >
                Submit Your Intention
              </Button>
            </Link>
          </div>

          {/* Newsletter CTA */}
          <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-10 md:p-12">
            <Mail className="h-8 w-8 text-primary" />
            <h3 className="text-balance font-serif text-2xl font-bold text-foreground md:text-3xl">
              Stay Connected
            </h3>
            <p className="leading-relaxed text-muted-foreground">
              Receive daily messages, upcoming event notifications, prayer
              reflections, and community updates delivered to your inbox.
            </p>
            <Link href="/newsletter" className="mt-2">
              <Button
                size="lg"
                variant="outline"
                className="border-primary font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Subscribe to Newsletter
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
