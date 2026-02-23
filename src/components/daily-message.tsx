"use client";

import { useMemo } from "react";
import { BookOpen } from "lucide-react";
import type { DailyMessage as DailyMessageType } from "@/types/strapi";

const fallbackMessages: DailyMessageType[] = [
  {
    message:
      "Repent, repent, repent! When I tell you this, I am not addressing myself merely to you, child, but I am addressing myself to the whole world.",
    source: "Our Lady to Alphonsine, November 28, 1981",
    reflection:
      "Let us examine our hearts today and turn back to God with sincere repentance and love.",
  },
  {
    message:
      "The world is in rebellion against God. Too many sins are committed. There is no more love, no more peace. If you do not repent and convert your hearts, you will all fall into an abyss.",
    source: "Our Lady to Marie Claire, 1982",
    reflection:
      "Today, let us be instruments of love and peace in our families and communities.",
  },
  {
    message:
      "Pray, pray, pray! Never tire of praying. The Rosary is a powerful weapon against evil.",
    source: "Our Lady to the Visionaries",
    reflection:
      "Take time today to pray the Rosary and experience the power of Our Lady's intercession.",
  },
  {
    message:
      "I have come to calm you, because I have heard your prayers. I would like your companions also to have faith, because I have not come only for you, I have come for all my children.",
    source: "Our Lady to Alphonsine, November 28, 1981",
    reflection:
      "Remember that Mary's love extends to all her children. Share this message of hope with someone today.",
  },
  {
    message:
      "What I ask of you is to pray. Pray without ceasing. The world is going badly. If you want to know what is happening, listen: The world is in revolt against God.",
    source: "Our Lady to Nathalie, 1982",
    reflection:
      "Persevere in prayer today, even when it feels difficult. Your prayers are heard in heaven.",
  },
  {
    message:
      "No one arrives in Heaven without suffering. Do not be afraid of suffering. I am suffering along with you. I will help you if you desire.",
    source: "Our Lady to Alphonsine",
    reflection:
      "Offer your sufferings today in union with Christ and trust that Mary walks beside you.",
  },
  {
    message:
      "My children, I love you. Love one another as I love you. Forgive one another and ask God to forgive you.",
    source: "Our Lady of Kibeho",
    reflection:
      "Is there someone you need to forgive today? Let Mary's love inspire you to extend mercy.",
  },
];

interface DailyMessageProps {
  /** CMS-provided message for today. If null/undefined, falls back to rotating hardcoded messages. */
  cmsMessage?: DailyMessageType | null;
}

export function DailyMessage({
  cmsMessage,
}: DailyMessageProps): React.JSX.Element {
  const todayMessage = useMemo<DailyMessageType>(() => {
    if (cmsMessage) {
      return cmsMessage;
    }
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        86400000
    );
    const index = dayOfYear % fallbackMessages.length;
    return fallbackMessages[index];
  }, [cmsMessage]);

  return (
    <section className="bg-secondary px-6 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium uppercase tracking-[0.15em] text-primary">
            Message of the Day
          </p>
        </div>
        <blockquote className="text-balance font-serif text-2xl font-medium italic leading-relaxed text-foreground md:text-3xl">
          {`"${todayMessage.message}"`}
        </blockquote>
        <p className="mt-6 text-sm font-medium text-muted-foreground">
          {todayMessage.source}
        </p>
        <div className="mx-auto mt-8 max-w-xl rounded-lg border border-border bg-background p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Today&apos;s Reflection
          </p>
          <p className="leading-relaxed text-foreground/80">
            {todayMessage.reflection}
          </p>
        </div>
      </div>
    </section>
  );
}
