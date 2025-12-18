import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getGlobalSettings, getArticles, getStrapiMediaUrl } from '@/lib/strapi';
import type { Article } from '@/types/strapi';
import Image from 'next/image';

/**
 * Article Card Component
 */
function ArticleCard({ article }: { article: Article }) {
  const coverUrl = getStrapiMediaUrl(article.cover?.url);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {coverUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={coverUrl}
            alt={article.cover?.alternativeText || article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        {article.category && (
          <span className="text-sm text-muted-foreground">
            {article.category.name}
          </span>
        )}
      </CardHeader>
      {article.description && (
        <CardContent>
          <p className="text-muted-foreground line-clamp-2">
            {article.description}
          </p>
        </CardContent>
      )}
    </Card>
  );
}

/**
 * Home Page
 *
 * This is a Server Component that fetches data from Strapi at request time.
 * The data is cached and revalidated based on the options passed to the fetch functions.
 */
export default async function Home(): Promise<React.ReactElement> {
  // Fetch data from Strapi
  const [globalSettings, articlesResponse] = await Promise.all([
    getGlobalSettings(),
    getArticles({ pageSize: 6 }),
  ]);

  const articles = articlesResponse.data;
  const hasArticles = articles.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {globalSettings?.siteName || 'Friends of Nyina wa Jambo'}
          </h1>
          {globalSettings?.siteDescription && (
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
              {globalSettings.siteDescription}
            </p>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Articles Section */}
        <section>
          <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>

          {hasArticles ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <Card className="max-w-lg mx-auto text-center">
              <CardHeader>
                <CardTitle>No Articles Yet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Content is coming soon. Check back later!
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Make sure your Strapi backend is running and has published articles.
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            {globalSettings?.siteName || 'Friends of Nyina wa Jambo'}.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
