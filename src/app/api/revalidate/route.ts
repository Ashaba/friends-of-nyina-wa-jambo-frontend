import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";

const log = createLogger("revalidate");

// Webhook secret to verify requests from Strapi
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

// Map Strapi model names to cache tags
const MODEL_TO_TAG: Record<string, string> = {
  "daily-message": "strapi-daily-message",
  event: "strapi-events",
  video: "strapi-videos",
  "newsletter-subscriber": "strapi-newsletter",
  "prayer-request": "strapi-prayer-requests",
};

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Verify the webhook secret
    const secret = request.headers.get("x-webhook-secret");

    if (!REVALIDATION_SECRET) {
      log.error("secret.missing");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (secret !== REVALIDATION_SECRET) {
      log.warn("secret.invalid");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the Strapi webhook payload
    const body = await request.json();
    const model = body.model as string;

    if (!model) {
      return NextResponse.json(
        { error: "Missing model in webhook payload" },
        { status: 400 }
      );
    }

    // Get the cache tag for this model
    const tag = MODEL_TO_TAG[model];

    if (tag) {
      // Revalidate the specific tag
      revalidateTag(tag, "default");
      log.info("tag.revalidated", { model, tag });
    } else {
      // If no specific tag, revalidate all strapi content
      revalidateTag("strapi", "default");
      log.info("tag.revalidated", { model, tag: "strapi", fallback: true });
    }

    return NextResponse.json({
      revalidated: true,
      model,
      tag: tag || "strapi",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    log.error("request.failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}
