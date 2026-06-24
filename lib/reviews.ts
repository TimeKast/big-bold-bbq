import type { GoogleReview } from "@/payload-types";
import { reviews as fallbackReviews } from "@/lib/content/reviews";
import { getPayloadClient } from "@/lib/payload";
import { site } from "@/lib/site";

export type GoogleReviewDisplay = {
  author: string;
  date: string;
  eventType?: string;
  googleUrl?: string;
  id: string;
  rating: number;
  text: string;
};

export type GoogleReviewStats = {
  average: number;
  count: number;
};

export type GoogleReviewsData = {
  reviewStats: GoogleReviewStats;
  reviews: GoogleReviewDisplay[];
  source: "cms" | "fallback";
};

type GooglePlacesResponse = {
  googleMapsUri?: string;
  rating?: number;
  userRatingCount?: number;
};

function getReviewStats(reviews: GoogleReviewDisplay[]): GoogleReviewStats {
  return {
    count: reviews.length,
    average:
      reviews.length > 0
        ? Math.round(
            (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length) * 10,
          ) / 10
        : 0,
  };
}

function normalizeStats(stats: Partial<GoogleReviewStats> | null | undefined): GoogleReviewStats | null {
  if (!stats) {
    return null;
  }

  const count =
    typeof stats.count === "number" && Number.isFinite(stats.count)
      ? Math.max(0, Math.round(stats.count))
      : 0;
  const average =
    typeof stats.average === "number" && Number.isFinite(stats.average)
      ? Math.min(5, Math.max(0, Math.round(stats.average * 10) / 10))
      : 0;

  if (count <= 0 || average <= 0) {
    return null;
  }

  return { average, count };
}

async function getLiveGoogleStats(): Promise<GoogleReviewStats | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return null;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri",
        },
        next: { revalidate: 60 * 60 * 12 },
      },
    );

    if (!response.ok) {
      console.error("Failed to load Google Places review stats", {
        status: response.status,
        statusText: response.statusText,
      });
      return null;
    }

    const place = (await response.json()) as GooglePlacesResponse;

    return normalizeStats({
      average: place.rating,
      count: place.userRatingCount,
    });
  } catch (error) {
    console.error("Failed to load Google Places review stats", error);
    return null;
  }
}

function toDateOnly(value: string) {
  return value.includes("T") ? value.split("T")[0] : value;
}

function normalizeRating(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 5;
  }

  return Math.min(5, Math.max(1, value));
}

async function resolveReviewStats(reviews: GoogleReviewDisplay[]): Promise<GoogleReviewStats> {
  const liveStats = await getLiveGoogleStats();

  return liveStats ?? normalizeStats(site.googleReviews.fallbackStats) ?? getReviewStats(reviews);
}

async function fallbackReviewsData(): Promise<GoogleReviewsData> {
  const reviews = fallbackReviews.map((review, index) => ({
    author: review.author,
    date: review.date,
    eventType: review.eventType,
    googleUrl: review.googleUrl,
    id: `fallback-${index}`,
    rating: review.rating,
    text: review.text,
  }));

  return {
    reviewStats: await resolveReviewStats(reviews),
    reviews,
    source: "fallback",
  };
}

function formatCmsReview(review: GoogleReview): GoogleReviewDisplay {
  return {
    author: review.author,
    date: toDateOnly(review.reviewDate),
    eventType: review.eventType || undefined,
    googleUrl: review.googleUrl || undefined,
    id: String(review.id),
    rating: normalizeRating(review.rating),
    text: review.reviewText,
  };
}

export async function getGoogleReviewsData(): Promise<GoogleReviewsData> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "google-reviews",
      limit: 20,
      overrideAccess: false,
      pagination: false,
      sort: ["sortOrder", "-reviewDate"],
      where: {
        isFeatured: {
          equals: true,
        },
      },
    });
    const reviews = result.docs.map((review) => formatCmsReview(review as GoogleReview));

    if (!reviews.length) {
      return fallbackReviewsData();
    }

    return {
      reviewStats: await resolveReviewStats(reviews),
      reviews,
      source: "cms",
    };
  } catch (error) {
    console.error("Failed to load CMS Google reviews", error);
    return fallbackReviewsData();
  }
}
