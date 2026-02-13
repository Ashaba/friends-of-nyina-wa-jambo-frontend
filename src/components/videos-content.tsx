"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Video } from "@/types/strapi";
import { getYouTubeThumbnail, getYouTubeEmbedUrl } from "@/lib/youtube";

const fallbackVideos: Video[] = [
  {
    id: 1,
    title: "Pilgrimage to the Kibeho Shrine 2025",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_1",
    description:
      "Join us on a spiritual journey to the holy shrine of Kibeho, Rwanda. Experience the prayerful atmosphere, the Rosary processions, and the testimonies of pilgrims whose lives have been touched by Our Lady.",
    category: "Pilgrimages",
    publishedDate: "2025-11-28",
  },
  {
    id: 2,
    title: "Encounter with the Visionary Alphonsine",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_2",
    description:
      "A rare and moving encounter with Alphonsine Mumureke, the first visionary of Kibeho, as she shares her experience of the apparitions and Our Lady's enduring messages for the world.",
    category: "Visionary Encounters",
    publishedDate: "2025-09-15",
  },
  {
    id: 3,
    title: "The Rosary of the Seven Sorrows - Full Prayer",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_3",
    description:
      "Pray the full Rosary of the Seven Sorrows as taught by Our Lady of Kibeho to Marie Claire. This guided prayer includes all seven meditations with Scripture readings.",
    category: "Prayers",
    publishedDate: "2025-08-20",
  },
  {
    id: 4,
    title: "Testimony: How Kibeho Changed My Life",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_4",
    description:
      "A powerful testimony from a pilgrim who visited Kibeho and experienced a profound conversion. Hear how the messages of Our Lady brought healing and renewed faith.",
    category: "Testimonies",
    publishedDate: "2025-07-10",
  },
  {
    id: 5,
    title: "Walking the Path of the Visionaries",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_5",
    description:
      "A documentary-style journey through the places where Our Lady appeared to the three visionaries, including the school grounds and the chapel of the apparitions.",
    category: "Pilgrimages",
    publishedDate: "2025-06-01",
  },
  {
    id: 6,
    title: "Interview with Nathalie Mukamazimpaka",
    youtubeUrl: "https://www.youtube.com/watch?v=VIDEO_ID_6",
    description:
      "An intimate interview with Nathalie, one of the three visionaries, as she recounts Our Lady's messages about prayer, penance, and the importance of faith in the modern world.",
    category: "Visionary Encounters",
    publishedDate: "2025-05-14",
  },
];

const videoCategories = [
  "All",
  "Pilgrimages",
  "Visionary Encounters",
  "Testimonies",
  "Prayers",
];

function getCategoryColor(category: string) {
  switch (category) {
    case "Pilgrimages":
      return "bg-primary text-primary-foreground";
    case "Visionary Encounters":
      return "bg-accent text-accent-foreground";
    case "Testimonies":
      return "bg-primary/80 text-primary-foreground";
    case "Prayers":
      return "bg-accent/80 text-accent-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
}

interface VideosContentProps {
  cmsVideos?: Video[] | null;
}

export function VideosContent({ cmsVideos }: VideosContentProps) {
  const videos =
    cmsVideos && cmsVideos.length > 0 ? cmsVideos : fallbackVideos;
  const [filter, setFilter] = useState("All");
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);

  const filteredVideos =
    filter === "All" ? videos : videos.filter((v) => v.category === filter);

  return (
    <>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {/* Filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {videoCategories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className={cn(
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "border-border text-foreground hover:bg-secondary",
                )}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => {
              const thumbnail =
                video.thumbnail || getYouTubeThumbnail(video.youtubeUrl);
              return (
                <button
                  key={video.id}
                  type="button"
                  className="group overflow-hidden rounded-lg border border-border bg-card text-left transition-all hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  onClick={() => setActiveVideo(video)}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    {thumbnail ? (
                      <Image
                        src={thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                        <Play className="h-12 w-12 text-primary/40" />
                      </div>
                    )}
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/20">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                        <Play className="ml-1 h-6 w-6 text-primary-foreground" />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-block rounded-full px-2 py-0.5 text-xs font-semibold",
                          getCategoryColor(video.category),
                        )}
                      >
                        {video.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(video.publishedDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <h3 className="mb-2 line-clamp-2 font-serif text-lg font-bold text-foreground">
                      {video.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {video.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {filteredVideos.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No videos found for this category. Check back soon!
              </p>
            </div>
          )}

          {/* YouTube Channel CTA */}
          <div className="mt-16 rounded-lg border border-border bg-secondary p-10 text-center">
            <h3 className="mb-3 font-serif text-xl font-bold text-foreground">
              Watch More on YouTube
            </h3>
            <p className="mx-auto mb-6 max-w-lg leading-relaxed text-muted-foreground">
              Subscribe to our YouTube channel for the latest pilgrimage videos,
              visionary encounters, prayer guides, and testimonies from the
              Friends of Nyina wa Jambo community.
            </p>
            <a
              href="https://www.youtube.com/@FriendsOfNyinaWaJambo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-[#c4302b] font-semibold text-background hover:bg-[#a82723]"
              >
                <Play className="mr-2 h-4 w-4" />
                Visit Our YouTube Channel
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Playing: ${activeVideo.title}`}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-lg bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/60 text-background transition-colors hover:bg-foreground/80"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>

            {/* YouTube iframe */}
            <div className="relative aspect-video">
              {getYouTubeEmbedUrl(activeVideo.youtubeUrl) ? (
                <iframe
                  src={getYouTubeEmbedUrl(activeVideo.youtubeUrl)!}
                  title={activeVideo.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted">
                  <Play className="h-16 w-16 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Video URL will be available soon
                  </p>
                </div>
              )}
            </div>

            {/* Video info below player */}
            <div className="p-6">
              <span
                className={cn(
                  "mb-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold",
                  getCategoryColor(activeVideo.category),
                )}
              >
                {activeVideo.category}
              </span>
              <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
                {activeVideo.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
