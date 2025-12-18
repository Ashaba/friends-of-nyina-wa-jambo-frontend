import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGlobalSettings } from "@/lib/strapi";

export default async function Home(): Promise<React.ReactElement> {
  const global = await getGlobalSettings();
  const message = global?.siteDescription || "Coming soon...";

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-lg mx-auto mt-10 text-center">
          <CardHeader>
            <CardTitle>Message of the Day</CardTitle>
          </CardHeader>
          <CardContent>{message}</CardContent>
        </Card>
      </main>
    </div>
  );
}
