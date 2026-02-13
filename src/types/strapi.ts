// Strapi API response types for Friends of Nyina wa Jambo CMS

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

export interface StrapiEntry<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
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

export interface StrapiDailyMessageAttributes {
  message: string;
  source: string;
  reflection: string;
  date: string;
  active: boolean;
}

export interface StrapiEventAttributes {
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
  image?: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    } | null;
  };
  featured: boolean;
}

export interface StrapiVideoAttributes {
  title: string;
  youtubeUrl: string;
  description: string;
  category: "Pilgrimages" | "Visionary Encounters" | "Testimonies" | "Prayers";
  publishedDate: string;
  thumbnail?: {
    data: {
      attributes: {
        url: string;
        alternativeText?: string;
      };
    } | null;
  };
}

export interface StrapiNewsletterSubscriberAttributes {
  firstName: string;
  lastName?: string;
  email: string;
  preferences: string[];
}

export interface StrapiPrayerRequestAttributes {
  name?: string;
  email?: string;
  category: string;
  intention: string;
  isPublic: boolean;
}

// --- Legacy single-item response (message-of-the-day endpoint) ---

export interface MessageOfTheDay {
  id: number;
  documentId: string;
  title: string;
  message: string;
  author?: string;
  displayDate?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
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
