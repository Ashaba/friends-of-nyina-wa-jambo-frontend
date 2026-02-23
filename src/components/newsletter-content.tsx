"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  BookOpen,
  Calendar,
  Heart,
  Bell,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { postAPI } from "@/lib/strapi";

const benefits = [
  {
    icon: BookOpen,
    title: "Daily Message & Reflection",
    description:
      "Start each day with a message from Our Lady of Kibeho and a guided reflection to deepen your faith.",
  },
  {
    icon: Heart,
    title: "Prayer Intentions",
    description:
      "Receive community prayer intentions and join in praying for the needs of fellow devotees around the world.",
  },
  {
    icon: Calendar,
    title: "Event Announcements",
    description:
      "Be the first to know about upcoming pilgrimages, retreats, feast day celebrations, and prayer gatherings.",
  },
  {
    icon: Bell,
    title: "Novena Reminders",
    description:
      "Get timely reminders for communal novenas and special prayer campaigns throughout the year.",
  },
];

export function NewsletterContent(): React.JSX.Element {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const checkboxes = form.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]:checked'
    );
    const preferences = Array.from(checkboxes).map(
      (cb) => cb.nextSibling?.textContent || ""
    );

    await postAPI("/newsletter-subscribers", {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("nlEmail") as string,
      preferences,
    });

    setIsSubmitting(false);
    setSubmitted(true);
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Benefits */}
          <div>
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              What You&apos;ll Receive
            </h2>
            <div className="flex flex-col gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-border bg-secondary p-6">
              <p className="text-sm italic leading-relaxed text-foreground/75">
                &ldquo;My children, I love you. I have not come only for you; I
                have come for all my children. Spread this message to the whole
                world.&rdquo;
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                &mdash; Our Lady of Kibeho
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-center gap-6 rounded-lg border border-border bg-card p-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground">
                  Welcome, Friend of Nyina wa Jambo!
                </h2>
                <p className="leading-relaxed text-muted-foreground">
                  Thank you for joining the Friends of Nyina wa Jambo.
                  You&apos;ll receive your first message soon. May Our Lady of
                  Kibeho, Mother of the Word, bless you and your family.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Subscribe Another Email
                </Button>
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card p-10">
                <div className="mb-6 flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    Subscribe
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-medium text-foreground"
                      >
                        First Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Your first name"
                        className="bg-background"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="lastName"
                        className="text-sm font-medium text-foreground"
                      >
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Your last name"
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="nlEmail"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="nlEmail"
                      name="nlEmail"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="bg-background"
                    />
                  </div>

                  {/* Preferences */}
                  <div className="flex flex-col gap-3">
                    <Label className="text-sm font-medium text-foreground">
                      I&apos;m interested in:
                    </Label>
                    <div className="flex flex-col gap-2">
                      {[
                        "Daily Messages & Reflections",
                        "Event & Pilgrimage Announcements",
                        "Novena & Prayer Reminders",
                        "Community Prayer Intentions",
                      ].map((pref) => (
                        <label
                          key={pref}
                          className="flex cursor-pointer items-center gap-3 text-sm text-foreground/80"
                        >
                          <input
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          />
                          {pref}
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="mt-2 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="mr-2 h-4 w-4" />
                    )}
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
