import type {
  Article,
  About,
  GlobalSettings,
  Category,
  Author,
  StrapiResponse,
  StrapiCollectionResponse,
  StrapiError,
} from '@/types/strapi';

/**
 * Strapi API Client
 *
 * Provides typed functions for fetching content from the Strapi backend.
 * Uses Next.js 15+ fetch with proper caching and revalidation.
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

type FetchOptions = {
  revalidate?: number | false;
  tags?: string[];
};

/**
 * Base fetch function for Strapi API
 */
async function fetchStrapi<T>(
  endpoint: string,
  query?: Record<string, string>,
  options: FetchOptions = {}
): Promise<T> {
  const url = new URL(`/api${endpoint}`, STRAPI_URL);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(url.toString(), {
    headers,
    next: {
      revalidate: options.revalidate ?? 60, // Default: revalidate every 60 seconds
      tags: options.tags,
    },
  });

  if (!response.ok) {
    const error: StrapiError = await response.json();
    throw new Error(
      error.error?.message || `Failed to fetch ${endpoint}: ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Build populate query string for Strapi
 */
function buildPopulate(fields: string[]): Record<string, string> {
  const populate: Record<string, string> = {};
  fields.forEach((field, index) => {
    populate[`populate[${index}]`] = field;
  });
  return populate;
}

// ============================================
// Global Settings
// ============================================

export async function getGlobalSettings(
  options?: FetchOptions
): Promise<GlobalSettings | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<GlobalSettings>>(
      '/global',
      {
        'populate[favicon]': 'true',
        'populate[defaultSeo][populate][shareImage]': 'true',
      },
      { ...options, tags: ['global'] }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch global settings:', error);
    return null;
  }
}

// ============================================
// About Page
// ============================================

export async function getAboutPage(options?: FetchOptions): Promise<About | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<About>>(
      '/about',
      { 'populate[blocks][populate]': '*' },
      { ...options, tags: ['about'] }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch about page:', error);
    return null;
  }
}

// ============================================
// Articles
// ============================================

export async function getArticles(
  options?: FetchOptions & {
    page?: number;
    pageSize?: number;
    categorySlug?: string;
  }
): Promise<StrapiCollectionResponse<Article>> {
  const query: Record<string, string> = {
    'populate[cover]': 'true',
    'populate[author][populate][avatar]': 'true',
    'populate[category]': 'true',
    'sort[0]': 'publishedAt:desc',
  };

  if (options?.page) {
    query['pagination[page]'] = options.page.toString();
  }
  if (options?.pageSize) {
    query['pagination[pageSize]'] = options.pageSize.toString();
  }
  if (options?.categorySlug) {
    query['filters[category][slug][$eq]'] = options.categorySlug;
  }

  try {
    return await fetchStrapi<StrapiCollectionResponse<Article>>(
      '/articles',
      query,
      { ...options, tags: ['articles'] }
    );
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return { data: [], meta: {} };
  }
}

export async function getArticleBySlug(
  slug: string,
  options?: FetchOptions
): Promise<Article | null> {
  try {
    const response = await fetchStrapi<StrapiCollectionResponse<Article>>(
      '/articles',
      {
        'filters[slug][$eq]': slug,
        'populate[cover]': 'true',
        'populate[author][populate][avatar]': 'true',
        'populate[category]': 'true',
        'populate[blocks][populate]': '*',
      },
      { ...options, tags: ['articles', `article-${slug}`] }
    );
    return response.data[0] || null;
  } catch (error) {
    console.error(`Failed to fetch article with slug "${slug}":`, error);
    return null;
  }
}

export async function getArticleById(
  id: number,
  options?: FetchOptions
): Promise<Article | null> {
  try {
    const response = await fetchStrapi<StrapiResponse<Article>>(
      `/articles/${id}`,
      {
        'populate[cover]': 'true',
        'populate[author][populate][avatar]': 'true',
        'populate[category]': 'true',
        'populate[blocks][populate]': '*',
      },
      { ...options, tags: ['articles'] }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch article with id ${id}:`, error);
    return null;
  }
}

// ============================================
// Categories
// ============================================

export async function getCategories(
  options?: FetchOptions
): Promise<StrapiCollectionResponse<Category>> {
  try {
    return await fetchStrapi<StrapiCollectionResponse<Category>>(
      '/categories',
      { 'sort[0]': 'name:asc' },
      { ...options, tags: ['categories'] }
    );
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return { data: [], meta: {} };
  }
}

export async function getCategoryBySlug(
  slug: string,
  options?: FetchOptions
): Promise<Category | null> {
  try {
    const response = await fetchStrapi<StrapiCollectionResponse<Category>>(
      '/categories',
      { 'filters[slug][$eq]': slug },
      { ...options, tags: ['categories', `category-${slug}`] }
    );
    return response.data[0] || null;
  } catch (error) {
    console.error(`Failed to fetch category with slug "${slug}":`, error);
    return null;
  }
}

// ============================================
// Authors
// ============================================

export async function getAuthors(
  options?: FetchOptions
): Promise<StrapiCollectionResponse<Author>> {
  try {
    return await fetchStrapi<StrapiCollectionResponse<Author>>(
      '/authors',
      {
        'populate[avatar]': 'true',
        'sort[0]': 'name:asc',
      },
      { ...options, tags: ['authors'] }
    );
  } catch (error) {
    console.error('Failed to fetch authors:', error);
    return { data: [], meta: {} };
  }
}

// ============================================
// Utility Functions
// ============================================

/**
 * Get the full URL for a Strapi media asset
 */
export function getStrapiMediaUrl(url: string | undefined): string | null {
  if (!url) return null;

  // If it's already an absolute URL, return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
}

/**
 * Revalidate Strapi content by tag
 * Call this from a webhook handler or server action
 */
export async function revalidateStrapiContent(tag: string): Promise<void> {
  const { revalidateTag } = await import('next/cache');
  revalidateTag(tag);
}
