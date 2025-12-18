import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMessageOfTheDay } from "@/lib/strapi";

export default async function Home(): Promise<React.ReactElement> {
  const messageOfTheDay = await getMessageOfTheDay();
  const message = messageOfTheDay?.message || "Coming soon...";

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
