"use client";

import { useState } from "react";
import { ChevronDown, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const prayers = [
  {
    id: "seven-sorrows",
    title: "The Rosary of the Seven Sorrows",
    description:
      "The prayer Our Lady specifically asked Marie Claire to promote. This rosary meditates on the seven sorrows of the Blessed Virgin Mary.",
    featured: true,
    sections: [
      {
        heading: "How to Pray",
        content:
          "Begin with an Act of Contrition. Then, for each of the seven sorrows, meditate on the sorrow and pray one Our Father followed by seven Hail Marys. Conclude with three Hail Marys for the tears of Mary.",
      },
      {
        heading: "The First Sorrow: The Prophecy of Simeon",
        content:
          '"And Simeon blessed them and said to Mary his mother: Behold this child is set for the fall and for the resurrection of many in Israel, and for a sign which shall be contradicted. And thy own soul a sword shall pierce." (Luke 2:34-35)\n\nPray: 1 Our Father, 7 Hail Marys',
      },
      {
        heading: "The Second Sorrow: The Flight into Egypt",
        content:
          '"And after they were departed, behold an angel of the Lord appeared in sleep to Joseph, saying: Arise, and take the child and his mother, and fly into Egypt: and be there until I shall tell thee." (Matthew 2:13)\n\nPray: 1 Our Father, 7 Hail Marys',
      },
      {
        heading: "The Third Sorrow: The Loss of Jesus in the Temple",
        content:
          '"And not finding him, they returned into Jerusalem, seeking him... And seeing him, they wondered. And his mother said to him: Son, why hast thou done so to us? Behold thy father and I have sought thee sorrowing." (Luke 2:45-48)\n\nPray: 1 Our Father, 7 Hail Marys',
      },
      {
        heading: "The Fourth Sorrow: Mary Meets Jesus on the Way to Calvary",
        content:
          "Mary met her Son on the road to Calvary, carrying His cross. Her heart was pierced with sorrow seeing Him suffer, yet she walked with Him in courage and love.\n\nPray: 1 Our Father, 7 Hail Marys",
      },
      {
        heading: "The Fifth Sorrow: The Crucifixion and Death of Jesus",
        content:
          '"Now there stood by the cross of Jesus, his mother... When Jesus therefore had seen his mother and the disciple standing whom he loved, he saith to his mother: Woman, behold thy son." (John 19:25-26)\n\nPray: 1 Our Father, 7 Hail Marys',
      },
      {
        heading: "The Sixth Sorrow: Jesus Is Taken Down from the Cross",
        content:
          "The lifeless body of Jesus was placed in Mary's arms. She held her Son, the Savior of the world, as she had held Him as an infant in Bethlehem.\n\nPray: 1 Our Father, 7 Hail Marys",
      },
      {
        heading: "The Seventh Sorrow: The Burial of Jesus",
        content:
          "Jesus was laid in the tomb, and Mary's heart was buried with Him. Yet even in her deepest sorrow, she trusted in God's promise of resurrection.\n\nPray: 1 Our Father, 7 Hail Marys",
      },
      {
        heading: "Concluding Prayer",
        content:
          "Queen of Martyrs, your heart suffered so much. I beg you, by the merits of the tears you shed in these terrible and eternally precious moments, to obtain for me and all the sinners of the world the grace of complete sincerity and repentance. Amen.\n\nPray: 3 Hail Marys for the tears of Our Lady.",
      },
    ],
  },
  {
    id: "consecration",
    title: "Prayer of Consecration to Our Lady of Kibeho",
    description:
      "A prayer to entrust yourself to the maternal care of Our Lady of Kibeho.",
    featured: false,
    sections: [
      {
        heading: "",
        content:
          "O Blessed Virgin Mary, Mother of the Word, Mother of all those who believe in your Son and who receive Him into their hearts,\n\nI come before you today with the desire to consecrate my heart, my mind, my body, and my soul entirely to your Immaculate Heart.\n\nYou came to Kibeho to remind us of the urgency of prayer, repentance, and conversion. Help me to hear your call and to respond with a generous heart.\n\nMother of Sorrows, teach me to unite my sufferings to those of your Son. Give me the grace to pray without ceasing, to love without counting the cost, and to forgive as God has forgiven me.\n\nI entrust to your maternal care all my loved ones, my community, and the whole world. Through your intercession, may we receive the graces we need to live as faithful disciples of Christ.\n\nOur Lady of Kibeho, Mother of the Word, pray for us. Amen.",
      },
    ],
  },
  {
    id: "peace",
    title: "Prayer for Peace",
    description:
      "Inspired by the messages of Kibeho, a prayer for peace in our hearts, families, and the world.",
    featured: false,
    sections: [
      {
        heading: "",
        content:
          "Lord God of peace, hear our prayer.\n\nWe have tried many times and over many years to resolve our conflicts by our own powers and by the force of our arms. So many moments of horror and darkness have come upon us; so many lives have been shattered.\n\nBut our efforts have been in vain. Now, Lord, come to our aid. Grant us peace, teach us peace, guide us toward peace. Open our eyes and our hearts and give us the courage to say: never again war; with war everything is destroyed.\n\nThrough the intercession of Our Lady of Kibeho, who came with the message of peace and repentance, instill in our hearts the courage to embrace forgiveness, reconciliation, and love.\n\nMary, Queen of Peace, pray for us and for the whole world. Amen.",
      },
    ],
  },
  {
    id: "daily",
    title: "Daily Morning Offering to Our Lady",
    description:
      "Begin each day by offering it to God through the intercession of Our Lady of Kibeho.",
    featured: false,
    sections: [
      {
        heading: "",
        content:
          "O my God, through the Immaculate Heart of Mary, Mother of the Word, I offer You this day:\n\nAll my prayers, works, joys, and sufferings. I unite them to the Holy Sacrifice of the Mass throughout the world.\n\nI offer them for all the intentions of Your Sacred Heart: the salvation of souls, reparation for sin, and the reunion of all Christians.\n\nThrough the intercession of Our Lady of Kibeho, grant me the grace to live this day in faithfulness, prayer, and love.\n\nHoly Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.",
      },
    ],
  },
];

export function PrayersContent(): React.JSX.Element {
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(
    "seven-sorrows"
  );
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        {/* Featured Prayer */}
        {prayers
          .filter((p) => p.featured)
          .map((prayer) => (
            <div
              key={prayer.id}
              className="mb-12 overflow-hidden rounded-lg border-2 border-primary/20 bg-primary/5"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between p-8 text-left"
                onClick={() =>
                  setExpandedPrayer(
                    expandedPrayer === prayer.id ? null : prayer.id
                  )
                }
                aria-expanded={expandedPrayer === prayer.id}
              >
                <div className="flex items-start gap-4">
                  <Heart className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">
                      Featured Prayer
                    </p>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                      {prayer.title}
                    </h2>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {prayer.description}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "ml-4 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                    expandedPrayer === prayer.id && "rotate-180"
                  )}
                />
              </button>

              {expandedPrayer === prayer.id && (
                <div className="flex animate-fade-in flex-col gap-3 px-8 pb-8">
                  {prayer.sections.map((section) => {
                    const key = `${prayer.id}-${section.heading}`;
                    return (
                      <div
                        key={section.heading || "main"}
                        className="rounded-md border border-border bg-background"
                      >
                        {section.heading ? (
                          <>
                            <button
                              type="button"
                              className="flex w-full items-center justify-between p-4 text-left"
                              onClick={() =>
                                setExpandedSection(
                                  expandedSection === key ? null : key
                                )
                              }
                              aria-expanded={expandedSection === key}
                            >
                              <span className="text-sm font-semibold text-foreground">
                                {section.heading}
                              </span>
                              <ChevronDown
                                className={cn(
                                  "ml-4 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                                  expandedSection === key && "rotate-180"
                                )}
                              />
                            </button>
                            {expandedSection === key && (
                              <div className="px-4 pb-4">
                                <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/75">
                                  {section.content}
                                </p>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="p-4">
                            <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/75">
                              {section.content}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

        {/* Other Prayers */}
        <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
          More Prayers & Devotions
        </h2>
        <div className="flex flex-col gap-4">
          {prayers
            .filter((p) => !p.featured)
            .map((prayer) => (
              <div
                key={prayer.id}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-6 text-left"
                  onClick={() =>
                    setExpandedPrayer(
                      expandedPrayer === prayer.id ? null : prayer.id
                    )
                  }
                  aria-expanded={expandedPrayer === prayer.id}
                >
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground">
                      {prayer.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {prayer.description}
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "ml-4 h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                      expandedPrayer === prayer.id && "rotate-180"
                    )}
                  />
                </button>

                {expandedPrayer === prayer.id && (
                  <div className="animate-fade-in px-6 pb-6">
                    {prayer.sections.map((section) => (
                      <div key={section.heading || "main"}>
                        {section.heading && (
                          <h4 className="mb-2 text-sm font-semibold text-foreground">
                            {section.heading}
                          </h4>
                        )}
                        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/75">
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
