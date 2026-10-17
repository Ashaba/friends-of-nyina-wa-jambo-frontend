"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { sitePhotos } from "@/lib/site-photos";

const visionaries = [
  {
    name: "Alphonsine Mumureke",
    date: "November 28, 1981 - November 28, 1989",
    description:
      "The first visionary to receive apparitions. A 16-year-old student at Kibeho College, Alphonsine was in the school dining hall when she first heard a voice calling “My child.” Our Lady identified herself as “Nyina wa Jambo,” which means “Mother of the Word.”",
    messages: [
      {
        title: "The Call to Prayer",
        content:
          "Our Lady repeatedly asked for prayer, especially the Rosary. She said: “When I tell you to pray, I am not addressing myself merely to you, child, but I am addressing myself to the whole world. My children, pray, pray, pray.”",
      },
      {
        title: "The Call to Repentance",
        content:
          "“Repent, repent, repent! The world is in rebellion against God. Too many sins are committed. There is no more love, no more peace. If you do not repent and convert your hearts, you will all fall into an abyss.”",
      },
      {
        title: "A Mother’s Love",
        content:
          "“I have come to calm you because I have heard your prayers. I would like your companions also to have faith. I have not come only for you; I have come for all my children. Every person in the world is my child.”",
      },
    ],
  },
  {
    name: "Nathalie Mukamazimpaka",
    date: "January 12, 1982 - December 3, 1983",
    description:
      "Nathalie was a 17-year-old student who received apparitions calling for voluntary suffering and prayer as reparation for sin. Our Lady asked her to pray unceasingly and to embrace suffering.",
    messages: [
      {
        title: "Prayer Without Ceasing",
        content:
          "“What I ask of you is prayer. Pray without ceasing, pray, pray. The world is going badly. If you want to know what is happening, listen: the world is in revolt against God.”",
      },
      {
        title: "Voluntary Suffering",
        content:
          "Our Lady asked Nathalie to accept voluntary suffering and fasting as acts of reparation. Nathalie spent extended periods in prayer and fasting, becoming a model of penitential devotion.",
      },
      {
        title: "Hope in God",
        content:
          "“No one arrives in Heaven without suffering. Do not be afraid of suffering. I am suffering along with you. I will help you if you desire. Have courage.”",
      },
    ],
  },
  {
    name: "Marie Claire Mukangango",
    date: "March 2, 1982 - September 15, 1982",
    description:
      "Marie Claire was initially skeptical of the apparitions. When she began to experience them herself, Our Lady specifically asked her to promote the Rosary of the Seven Sorrows of the Blessed Virgin Mary.",
    messages: [
      {
        title: "The Rosary of the Seven Sorrows",
        content:
          "Our Lady asked Marie Claire to reintroduce the world to the Rosary of the Seven Sorrows, a powerful prayer meditating on Mary’s suffering. She said this rosary has the power to bring great graces and even avert disaster.",
      },
      {
        title: "Sincerity in Prayer",
        content:
          "“When you pray, do not just say words. Pray with your heart. Pray sincerely, with true devotion. God hears the prayer of the heart, not merely the movement of the lips.”",
      },
      {
        title: "Reconciliation",
        content:
          "Through Marie Claire, Our Lady stressed the need for reconciliation, forgiveness, and unity. This part of her Message proved prophetically significant in the years that followed in Rwanda.",
      },
    ],
  },
];

const keyThemes = [
  {
    theme: "Prayer",
    description:
      "Our Lady consistently called for prayer, especially the Holy Rosary and the Rosary of the Seven Sorrows. She emphasized praying with the heart, not just words.",
  },
  {
    theme: "Repentance",
    description:
      "Central to the Message is the urgent need for repentance and conversion. Our Lady warned that the world was on the edge of catastrophe due to sin and rebellion against God.",
  },
  {
    theme: "Suffering",
    description:
      "Mary spoke of the redemptive value of suffering, encouraging the faithful to unite their sufferings with those of Christ and to offer them for the salvation of souls.",
  },
  {
    theme: "Faith & Love",
    description:
      "Our Lady called for deeper faith, love of God and neighbor, and a return to living the Gospel authentically in everyday life.",
  },
];

// As summarised on the banner beside the shrine church at Kibeho.
const shrineMessage = [
  "I am the Mother of the Word.",
  "The child of Mary accepts his own sufferings.",
  "Repent without delay.",
  "Endure sufferings in order to help Jesus to save the world.",
  "Meditate the Rosary of sorrows of Virgin Mary.",
  "Pray always for the Church.",
  "Be strong in faith.",
  "Pray always for the world.",
  "\u201cRepent so that you may not fall in hell.\u201d",
  "Meditate the Rosary.",
  "Nobody will enter into heaven without suffering.",
  "Come back to God.",
];

export function MessagesContent(): React.JSX.Element {
  const [openVisionary, setOpenVisionary] = useState<number | null>(0);
  const [openMessage, setOpenMessage] = useState<string | null>(null);

  return (
    <>
      {/* About Section */}
      <section id="about" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-3xl font-bold text-foreground">
                About the Apparitions
              </h2>
              <div className="flex flex-col gap-4 leading-relaxed text-foreground/75">
                <p>
                  The apparitions of Kibeho are the first and, so far, only
                  officially approved Marian apparitions on the African
                  continent. They took place in the small village of Kibeho in
                  southwestern Rwanda.
                </p>
                <p>
                  Beginning on November 28, 1981, the Blessed Virgin Mary
                  appeared to three young students at Kibeho College. She
                  identified herself as{" "}
                  <strong className="text-foreground">
                    &ldquo;Nyina wa Jambo&rdquo;
                  </strong>
                  , which means &ldquo;Mother of the Word.&rdquo; She gave one
                  urgent Message, filled with a mother&rsquo;s love: a call to
                  love, repentance, and conversion of hearts.
                </p>
                <p>
                  On June 29, 2001, Bishop Augustin Misago of the Diocese of
                  Gikongoro officially declared the apparitions{" "}
                  <strong className="text-foreground">
                    &ldquo;worthy of belief&rdquo;
                  </strong>
                  , confirming the supernatural character of the apparitions to
                  Alphonsine, Nathalie, and Marie Claire.
                </p>
                <p>
                  Remarkably, during the visions on August 19, 1982, the
                  visionaries were shown terrifying images of Rwanda engulfed in
                  violence and bloodshed. This prophetic warning was tragically
                  fulfilled during the{" "}
                  <a
                    href="https://en.wikipedia.org/wiki/Rwandan_genocide"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-primary"
                  >
                    1994 Rwandan genocide
                  </a>
                  .
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src={sitePhotos.outdoorAltar.src}
                alt={sitePhotos.outdoorAltar.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visionaries */}
      <section className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
              The Three Visionaries
            </p>
            <h2 className="text-balance font-serif text-3xl font-bold text-foreground md:text-4xl">
              Chosen to Deliver Heaven&rsquo;s Message
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {visionaries.map((visionary, idx) => (
              <div
                key={visionary.name}
                className="overflow-hidden rounded-lg border border-border bg-background"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-6 text-left"
                  onClick={() =>
                    setOpenVisionary(openVisionary === idx ? null : idx)
                  }
                  aria-expanded={openVisionary === idx}
                >
                  <div>
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {visionary.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {visionary.date}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "ml-4 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      openVisionary === idx && "rotate-180"
                    )}
                  />
                </button>

                <div
                  hidden={openVisionary !== idx}
                  className="flex animate-fade-in flex-col gap-6 px-6 pb-6"
                >
                  <p className="leading-relaxed text-foreground/75">
                    {visionary.description}
                  </p>

                  <div className="flex flex-col gap-3">
                    {visionary.messages.map((msg) => {
                      const key = `${idx}-${msg.title}`;
                      return (
                        <div
                          key={msg.title}
                          className="rounded-md border border-border bg-secondary"
                        >
                          <button
                            type="button"
                            className="flex w-full items-center justify-between p-4 text-left"
                            onClick={() =>
                              setOpenMessage(openMessage === key ? null : key)
                            }
                            aria-expanded={openMessage === key}
                          >
                            <span className="text-sm font-semibold text-foreground">
                              {msg.title}
                            </span>
                            <ChevronDown
                              className={cn(
                                "ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                                openMessage === key && "rotate-180"
                              )}
                            />
                          </button>
                          <div
                            hidden={openMessage !== key}
                            className="px-4 pb-4"
                          >
                            <p className="text-sm leading-relaxed text-foreground/75">
                              {msg.content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Themes */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
              Core Themes
            </p>
            <h2 className="text-balance font-serif text-3xl font-bold text-foreground md:text-4xl">
              The Heart of Our Lady&rsquo;s Message
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {keyThemes.map((item) => (
              <div
                key={item.theme}
                className="rounded-lg border border-border bg-card p-8"
              >
                <h3 className="mb-3 font-serif text-xl font-bold text-primary">
                  {item.theme}
                </h3>
                <p className="leading-relaxed text-foreground/75">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The message as summarised at the shrine */}
      <section className="bg-secondary px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-primary">
              As Displayed at the Shrine
            </p>
            <h2 className="text-balance font-serif text-3xl font-bold text-foreground md:text-4xl">
              The Message of Our Lady of Kibeho, Mother of the Word
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-x-10 gap-y-4 rounded-lg border border-border bg-card p-8 md:grid-cols-2 md:p-10">
            {shrineMessage.map((line, index) => (
              <li key={line} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary font-serif text-sm font-bold text-primary-foreground"
                >
                  {index + 1}
                </span>
                <span className="pt-1 leading-relaxed text-foreground/85">
                  {line}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
