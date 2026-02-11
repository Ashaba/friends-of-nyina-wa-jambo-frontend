const STRAPI_API_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}

type StrapiResult<T> = StrapiResponse<T> | StrapiError;

function isError<T>(result: StrapiResult<T>): result is StrapiError {
  return "error" in result && result.error !== undefined;
}

async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {},
  revalidateSeconds: number = 60 // Revalidate cache every 60 seconds
): Promise<T> {
  const url = `${STRAPI_API_URL}/api${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (STRAPI_API_TOKEN) {
    (headers as Record<string, string>)["Authorization"] =
      `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
    next: { revalidate: revalidateSeconds }, // ISR: revalidate cached data
  });

  const result: StrapiResult<T> = await response.json();

  if (isError(result)) {
    throw new Error(result.error.message);
  }

  return result.data;
}

// Message of the Day types
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

export async function getMessageOfTheDay(): Promise<MessageOfTheDay | null> {
  try {
    const data = await fetchStrapi<MessageOfTheDay>("/message-of-the-day");
    return data;
  } catch (error) {
    console.error("Failed to fetch message of the day:", error);
    return null;
  }
}
