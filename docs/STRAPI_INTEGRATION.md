# Strapi Integration

This document describes how the frontend integrates with the Strapi CMS backend.

## Overview

The frontend uses Next.js 15+ Server Components to fetch content from Strapi at request time. Data is cached and revalidated using Next.js's built-in caching mechanism.

## Setup

### 1. Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```bash
cp .env.local.example .env.local
```

```bash
# Required: Strapi backend URL
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Optional: API token for authenticated requests
STRAPI_API_TOKEN=your-api-token-here
```

### 2. Start Both Services

```bash
# Terminal 1: Start Strapi backend
cd friends-of-nyina-wa-jambo-backend
npm run develop
# Runs on http://localhost:1337

# Terminal 2: Start Next.js frontend
cd friends-of-nyina-wa-jambo-frontend
npm run dev
# Runs on http://localhost:3000
```

### 3. Configure Strapi Permissions

1. Open Strapi admin: http://localhost:1337/admin
2. Go to Settings → Users & Permissions plugin → Roles
3. Click on "Public"
4. Enable `find` and `findOne` for:
   - Article
   - Category
   - Author
   - About
   - Global
5. Save changes

## Architecture

### Files

```
src/
├── lib/
│   └── strapi.ts       # API client with typed fetch functions
├── types/
│   └── strapi.ts       # TypeScript types matching Strapi schemas
└── app/
    ├── layout.tsx      # Root layout with dynamic metadata
    └── page.tsx        # Homepage fetching articles
```

### API Client (`src/lib/strapi.ts`)

The API client provides:
- **Typed fetch functions** for each content type
- **Automatic caching** with configurable revalidation
- **Tag-based revalidation** for on-demand cache invalidation
- **Error handling** with fallbacks

### Usage Example

```tsx
import { getArticles, getGlobalSettings } from '@/lib/strapi';

export default async function Page() {
  const [global, articles] = await Promise.all([
    getGlobalSettings(),
    getArticles({ pageSize: 10 }),
  ]);

  return (
    <div>
      <h1>{global?.siteName}</h1>
      {articles.data.map((article) => (
        <Article key={article.id} data={article} />
      ))}
    </div>
  );
}
```

## Caching Strategy

### Default Behavior

- **Revalidation**: 60 seconds (configurable per request)
- **Tags**: Each content type has its own cache tag

### On-Demand Revalidation

You can trigger cache revalidation using the `revalidateStrapiContent` function:

```tsx
// In a Server Action or API route
import { revalidateStrapiContent } from '@/lib/strapi';

export async function revalidateArticles() {
  await revalidateStrapiContent('articles');
}
```

### Webhook Integration

Create an API route to handle Strapi webhooks:

```tsx
// app/api/revalidate/route.ts
import { revalidateStrapiContent } from '@/lib/strapi';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { model } = await request.json();

  // Map Strapi model to cache tag
  const tagMap: Record<string, string> = {
    article: 'articles',
    category: 'categories',
    author: 'authors',
    about: 'about',
    global: 'global',
  };

  const tag = tagMap[model];
  if (tag) {
    await revalidateStrapiContent(tag);
  }

  return NextResponse.json({ revalidated: true });
}
```

## TypeScript Types

Types are defined in `src/types/strapi.ts` and match the Strapi content type schemas:

- `Article` - Blog articles with author, category, and dynamic blocks
- `Category` - Article categories
- `Author` - Content authors
- `About` - About page (single type)
- `GlobalSettings` - Site-wide settings (single type)
- `ContentBlock` - Dynamic zone blocks (media, quote, rich-text, slider)

## Image Handling

Strapi media URLs are relative. Use `getStrapiMediaUrl()` to get absolute URLs:

```tsx
import { getStrapiMediaUrl } from '@/lib/strapi';
import Image from 'next/image';

function ArticleImage({ article }) {
  const imageUrl = getStrapiMediaUrl(article.cover?.url);

  if (!imageUrl) return null;

  return (
    <Image
      src={imageUrl}
      alt={article.cover?.alternativeText || article.title}
      width={800}
      height={400}
    />
  );
}
```

The `next.config.ts` is configured to allow images from the Strapi domain.

## Troubleshooting

### CORS Errors

If you see CORS errors:
1. Make sure the backend PR is merged: enable CORS in `config/middlewares.ts`
2. Add `FRONTEND_URL=http://localhost:3000` to backend `.env`
3. Restart Strapi

### 404 Errors

1. Check Strapi is running: http://localhost:1337/api/articles
2. Verify public permissions are enabled in Strapi admin
3. Make sure content is published (not draft)

### Missing Images

1. Check `NEXT_PUBLIC_STRAPI_URL` is set correctly
2. Verify image domains in `next.config.ts`
3. Ensure media files exist in Strapi uploads
