import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-lg mx-auto mt-10 text-center">
          <CardHeader>
            <CardTitle>Message of the Day</CardTitle>
          </CardHeader>
          <CardContent>Coming soon...</CardContent>
        </Card>
      </main>
    </div>
  );
}
