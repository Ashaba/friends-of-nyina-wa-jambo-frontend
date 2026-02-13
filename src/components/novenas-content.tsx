"use client";

import { useState } from "react";
import { ChevronDown, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const novenadays = [
  {
    day: 1,
    theme: "Faith",
    scripture:
      "\"Blessed is she who believed that the Lord's promises to her would be fulfilled.\" — Luke 1:45",
    reflection:
      "On this first day, we ask Our Lady of Kibeho to strengthen our faith. She appeared to simple students and asked them to believe. Let us also open our hearts to the grace of deeper faith in God's promises.",
    prayer:
      "Our Lady of Kibeho, Mother of the Word, you called your children to faith. Help me to believe with all my heart, even when the path is unclear. Strengthen my trust in your Son, Jesus Christ. Through your intercession, may my faith be unwavering. Amen.",
  },
  {
    day: 2,
    theme: "Repentance",
    scripture:
      '"Repent, for the kingdom of heaven has come near." — Matthew 4:17',
    reflection:
      "Our Lady repeatedly called for repentance at Kibeho. Today, let us examine our consciences honestly and turn back to God with sincere sorrow for our sins and a firm resolve to amend our lives.",
    prayer:
      "Our Lady of Kibeho, you urgently called us to repentance. Help me to see my sins clearly, to be truly sorry for them, and to turn my heart completely back to God. Grant me the grace of a sincere and lasting conversion. Amen.",
  },
  {
    day: 3,
    theme: "Prayer",
    scripture: '"Pray without ceasing." — 1 Thessalonians 5:17',
    reflection:
      "Mary asked her children to pray, pray, pray. Prayer is our lifeline to God. Today, let us recommit to a life of faithful prayer, especially the Holy Rosary, which Our Lady so strongly encouraged.",
    prayer:
      "Our Lady of Kibeho, teach me to pray with my heart and not just my lips. Help me never to grow weary of prayer. Through the Holy Rosary and all my prayers, draw me ever closer to your Son. Amen.",
  },
  {
    day: 4,
    theme: "Suffering",
    scripture:
      '"I consider that our present sufferings are not worth comparing with the glory that will be revealed in us." — Romans 8:18',
    reflection:
      "Our Lady told the visionaries that no one arrives in Heaven without suffering. Today, let us offer our sufferings in union with Christ's sacrifice, trusting that they have redemptive value.",
    prayer:
      "Our Lady of Kibeho, Mother of Sorrows, you walked the way of the Cross with your Son. Help me to accept my sufferings with courage and to unite them with the suffering of Christ for the salvation of souls. Amen.",
  },
  {
    day: 5,
    theme: "Love",
    scripture:
      '"A new command I give you: Love one another. As I have loved you, so you must love one another." — John 13:34',
    reflection:
      "Our Lady reminded us that there is no more love in the world. Today, let us be instruments of God's love, choosing kindness, patience, and compassion in all our interactions.",
    prayer:
      "Our Lady of Kibeho, your heart overflows with love for all your children. Help me to love as Christ loves — selflessly, generously, and without condition. Remove all hatred and bitterness from my heart. Amen.",
  },
  {
    day: 6,
    theme: "Reconciliation",
    scripture: '"Forgive, and you will be forgiven." — Luke 6:37',
    reflection:
      "The messages of Kibeho carried a profound call to reconciliation, especially significant for Rwanda. Today, let us pray for the grace to forgive those who have hurt us and to seek forgiveness from those we have wounded.",
    prayer:
      "Our Lady of Kibeho, you foresaw the terrible violence that was to come and called for reconciliation. Give me the grace to forgive from my heart, to seek peace with all people, and to be an instrument of healing. Amen.",
  },
  {
    day: 7,
    theme: "Peace",
    scripture:
      '"Blessed are the peacemakers, for they will be called children of God." — Matthew 5:9',
    reflection:
      "Our Lady came as a messenger of peace. Today, let us pray for peace in our hearts, our families, our communities, and throughout the world, especially in places of conflict and suffering.",
    prayer:
      "Our Lady of Kibeho, Queen of Peace, bring your peace to our troubled world. Help me to be a peacemaker in my daily life, sowing harmony where there is discord and calm where there is anxiety. Amen.",
  },
  {
    day: 8,
    theme: "Perseverance",
    scripture:
      '"Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up." — Galatians 6:9',
    reflection:
      "Our Lady asked us never to tire of praying. The spiritual life requires perseverance. Today, let us ask for the grace to remain faithful even when the journey is long and difficult.",
    prayer:
      "Our Lady of Kibeho, give me the strength to persevere in faith, prayer, and good works. When I am tempted to give up, remind me of your loving presence and the eternal reward that awaits the faithful. Amen.",
  },
  {
    day: 9,
    theme: "Trust & Surrender",
    scripture:
      '"Trust in the Lord with all your heart and lean not on your own understanding." — Proverbs 3:5',
    reflection:
      "On this final day, let us place all our intentions, our lives, and our futures in the hands of God through Our Lady. She has promised to help all who call upon her. Let us surrender with total trust.",
    prayer:
      "Our Lady of Kibeho, Mother of the Word, I place my life and all my intentions in your loving hands. I trust in your intercession and in the mercy of your Son. Carry my prayers to the throne of God, and help me to live each day in faithful surrender to His holy will. Amen.\n\nOur Lady of Kibeho, pray for us.\nMother of the Word, pray for us.\nQueen of Peace, pray for us.",
  },
];

export function NovenasContent() {
  const [activeDay, setActiveDay] = useState<number | null>(1);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Instructions */}
        <div className="mb-12 rounded-lg border border-border bg-secondary p-8">
          <div className="flex items-start gap-4">
            <Calendar className="mt-1 h-6 w-6 shrink-0 text-primary" />
            <div>
              <h2 className="mb-3 font-serif text-xl font-bold text-foreground">
                How to Pray This Novena
              </h2>
              <div className="flex flex-col gap-2 text-sm leading-relaxed text-foreground/75">
                <p>
                  Begin each day by making the Sign of the Cross. Read the
                  Scripture passage slowly and prayerfully. Meditate on the
                  reflection, then pray the daily prayer with your heart.
                </p>
                <p>
                  You may add your own personal intentions after the prayer.
                  Conclude each day with three Hail Marys and the Glory Be.
                </p>
                <p className="font-medium text-foreground">
                  This novena may be prayed at any time, but is especially
                  meaningful during the days leading up to November 28, the
                  feast of Our Lady of Kibeho.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Day selector */}
        <div className="mb-8 flex flex-wrap gap-2">
          {novenadays.map((day) => (
            <Button
              key={day.day}
              variant={activeDay === day.day ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setActiveDay(activeDay === day.day ? null : day.day)
              }
              className={cn(
                "min-w-[48px]",
                activeDay === day.day
                  ? "bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:bg-secondary",
              )}
            >
              Day {day.day}
            </Button>
          ))}
        </div>

        {/* Days */}
        <div className="flex flex-col gap-4">
          {novenadays.map((day) => (
            <div
              key={day.day}
              className={cn(
                "overflow-hidden rounded-lg border bg-card transition-all",
                activeDay === day.day
                  ? "border-primary/30 shadow-md"
                  : "border-border",
              )}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between p-6 text-left"
                onClick={() =>
                  setActiveDay(activeDay === day.day ? null : day.day)
                }
                aria-expanded={activeDay === day.day}
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {day.day}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      Day {day.day}: {day.theme}
                    </h3>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "ml-4 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                    activeDay === day.day && "rotate-180",
                  )}
                />
              </button>

              {activeDay === day.day && (
                <div className="flex animate-fade-in flex-col gap-6 px-6 pb-8">
                  {/* Scripture */}
                  <blockquote className="border-l-4 border-accent py-2 pl-4 text-sm italic leading-relaxed text-foreground/80">
                    {day.scripture}
                  </blockquote>

                  {/* Reflection */}
                  <div>
                    <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                      Reflection
                    </h4>
                    <p className="leading-relaxed text-foreground/75">
                      {day.reflection}
                    </p>
                  </div>

                  {/* Prayer */}
                  <div className="rounded-md border border-border bg-secondary p-6">
                    <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                      Prayer
                    </h4>
                    <p className="whitespace-pre-line italic leading-relaxed text-foreground/80">
                      {day.prayer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
