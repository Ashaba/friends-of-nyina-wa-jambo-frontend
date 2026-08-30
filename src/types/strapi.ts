// Strapi API response types for Friends of Nyina wa Jambo CMS.
//
// Shaped for Strapi 5 (see the backend's @strapi/strapi dependency). In v5 an
// entry is FLAT — its fields sit directly on the object alongside `id` and
// `documentId`. There is no `attributes` wrapper and no `data`/`attributes`
// nesting on relations or media; that was the v4 format.

export interface StrapiResponse<T> {
  data: StrapiEntry<T>[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: StrapiEntry<T>;
  meta: Record<string, unknown>;
}

/** A Strapi 5 entry: content fields flattened onto the entry itself. */
export type StrapiEntry<T> = T & {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

/** A Strapi 5 media field, returned flat when populated (null when empty). */
export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

export type StrapiResult<T> = StrapiResponse<T> | StrapiError;

// --- Content Type Attribute Interfaces ---

export interface StrapiDailyMessageFields {
  message: string;
  source: string;
  reflection: string;
  date: string;
  active: boolean;
}

export interface StrapiEventFields {
  title: string;
  date: string;
  time: string;
  location: string;
  type:
    | "Feast Day"
    | "Novena"
    | "Pilgrimage"
    | "Retreat"
    | "Recurring"
    | "Vigil";
  description: string;
  image?: StrapiMedia | null;
  featured: boolean;
}

export interface StrapiVideoFields {
  title: string;
  youtubeUrl: string;
  description: string;
  category: "Pilgrimages" | "Visionary Encounters" | "Testimonies" | "Prayers";
  publishedDate: string;
  thumbnail?: StrapiMedia | null;
}

export interface StrapiNewsletterSubscriberFields {
  firstName: string;
  lastName?: string;
  email: string;
  preferences: string[];
}

export interface StrapiPrayerRequestFields {
  name?: string;
  email?: string;
  category: string;
  intention: string;
  isPublic: boolean;
}

// --- Flattened types for use in components ---

export interface DailyMessage {
  message: string;
  source: string;
  reflection: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  description: string;
  image?: string;
  featured: boolean;
}

export interface Video {
  id: number;
  title: string;
  youtubeUrl: string;
  description: string;
  category: string;
  publishedDate: string;
  thumbnail?: string;
}

// --- Fetch diagnostics (used for logging CMS fetch attempts/failures) ---

export type StrapiFetchStatus =
  | "success"
  | "not-configured"
  | "empty"
  | "http-error"
  | "network-error";

export interface StrapiFetchOutcome<T> {
  data: T | null;
  status: StrapiFetchStatus;
  /** Human-readable reason, present whenever status is not "success". */
  detail?: string;
}

export type DailyMessageResult = StrapiFetchOutcome<DailyMessage>;
