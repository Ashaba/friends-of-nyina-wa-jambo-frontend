/**
 * Strapi API Types
 *
 * These types match the content types defined in the Strapi backend.
 * Keep them in sync with the backend schema definitions.
 */

// Base Strapi response types
export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// Media types
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

// SEO Component
export interface SeoComponent {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage?: StrapiMedia;
}

// Shared Components (Dynamic Zone Blocks)
export interface MediaBlock {
  __component: 'shared.media';
  id: number;
  file: StrapiMedia;
}

export interface QuoteBlock {
  __component: 'shared.quote';
  id: number;
  title: string;
  body: string;
}

export interface RichTextBlock {
  __component: 'shared.rich-text';
  id: number;
  body: string;
}

export interface SliderBlock {
  __component: 'shared.slider';
  id: number;
  files: StrapiMedia[];
}

export type ContentBlock = MediaBlock | QuoteBlock | RichTextBlock | SliderBlock;

// Content Types
export interface Author {
  id: number;
  documentId: string;
  name: string;
  email: string | null;
  avatar?: StrapiMedia;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string | null;
  slug: string;
  cover?: StrapiMedia;
  author?: Author;
  category?: Category;
  blocks?: ContentBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface About {
  id: number;
  documentId: string;
  title: string;
  blocks?: ContentBlock[];
  createdAt: string;
  updatedAt: string;
}

export interface GlobalSettings {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription: string;
  favicon?: StrapiMedia;
  defaultSeo?: SeoComponent;
  createdAt: string;
  updatedAt: string;
}
