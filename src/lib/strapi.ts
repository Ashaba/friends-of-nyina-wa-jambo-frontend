import type {
  MessageOfTheDay,
  StrapiError,
  StrapiResult,
} from "@/types/strapi";

export type { MessageOfTheDay } from "@/types/strapi";

const STRAPI_API_URL = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

function isStrapiError<T>(result: StrapiResult<T>): result is StrapiError {
  return "error" in result && result.error !== undefined;
}

async function fetchStrapi<T>(
  endpoint: string,
  options: RequestInit = {},
  tags: string[] = ["strapi"]
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
    next: { tags },
  });

  const result: StrapiResult<T> = await response.json();

  if (isStrapiError(result)) {
    throw new Error(result.error.message);
  }

  return result.data;
}

export async function getMessageOfTheDay(): Promise<MessageOfTheDay | null> {
  try {
    const data = await fetchStrapi<MessageOfTheDay>("/message-of-the-day", {}, [
      "strapi",
      "strapi-message-of-the-day",
    ]);
    return data;
  } catch (error) {
    console.error("Failed to fetch message of the day:", error);
    return null;
  }
}
