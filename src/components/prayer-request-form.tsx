"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { HoneypotField } from "@/components/honeypot-field";
import { Heart, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitPrayerRequest } from "@/lib/form-actions";

const categories = [
  "Healing",
  "Family",
  "Peace",
  "Conversion",
  "Thanksgiving",
  "Guidance",
  "Protection",
  "Other",
];

export function PrayerRequestForm(): React.JSX.Element {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // Read the fields before awaiting: `currentTarget` is null once React
    // has moved past the event.
    const formData = new FormData(e.currentTarget);

    const result = await submitPrayerRequest({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      category: selectedCategory || "General",
      intention: String(formData.get("intention") ?? ""),
      isPublic: formData.get("isPublic") === "on",
      website: String(formData.get("website") ?? ""),
    });

    setIsSubmitting(false);

    // Only claim the intention was received once it actually was — a silent
    // failure here means someone believes they are being prayed for.
    if (!result.ok) {
      setError(result.error ?? null);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex flex-col items-center gap-6 rounded-lg border border-border bg-card p-12">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Your Prayer Has Been Received
            </h2>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              Thank you for sharing your intention. Our community will hold you
              in prayer. Remember the words of Our Lady: &ldquo;I have not come
              only for you; I have come for all my children.&rdquo;
            </p>
            <Button
              onClick={() => {
                setSubmitted(false);
                setSelectedCategory(null);
              }}
              variant="outline"
              className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Submit Another Intention
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-lg border border-border bg-secondary p-8">
              <Heart className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-4 font-serif text-xl font-bold text-foreground">
                Friends of Nyina wa Jambo
              </h3>
              <div className="flex flex-col gap-4 text-sm leading-relaxed text-foreground/75">
                <p>
                  Our Lady of Kibeho asked us to pray for one another. When you
                  submit your intention, the Friends of Nyina wa Jambo prayer
                  community will include it in their daily prayers.
                </p>
                <p>
                  You may share as much or as little as you wish. God knows the
                  details of every heart. Even a simple &ldquo;Please pray for
                  me&rdquo; is enough.
                </p>
                <p className="font-medium italic text-foreground">
                  &ldquo;Pray, pray, pray! Never tire of praying.&rdquo;
                  <br />
                  <span className="not-italic text-muted-foreground">
                    &mdash; Our Lady of Kibeho
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="relative flex flex-col gap-6"
            >
              <HoneypotField />

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Your Name{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="First name or initials"
                  className="bg-background"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-background"
                />
                <p className="text-xs text-muted-foreground">
                  We&apos;ll only use this to let you know your prayer is being
                  prayed for.
                </p>
              </div>

              {/* Category */}
              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium text-foreground">
                  Prayer Category
                </Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === cat ? null : cat
                        )
                      }
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        selectedCategory === cat
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground/70 hover:border-primary/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="intention"
                  className="text-sm font-medium text-foreground"
                >
                  Your Prayer Intention{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="intention"
                  name="intention"
                  required
                  rows={6}
                  placeholder="Share your prayer intention here... You may be as specific or general as you wish."
                  className="resize-none bg-background"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="public"
                  name="isPublic"
                  className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <Label
                  htmlFor="public"
                  className="text-sm font-normal leading-relaxed text-foreground/75"
                >
                  I give permission to share my intention (anonymously) so
                  others can pray for me as well.
                </Label>
              </div>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="leading-relaxed">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="mt-2 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Submitting..." : "Submit Prayer Intention"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
