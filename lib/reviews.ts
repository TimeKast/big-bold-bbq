import type { GoogleReview } from "@/payload-types";
import { reviews as fallbackReviews } from "@/lib/content/reviews";
import { getPayloadClient } from "@/lib/payload";

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

function toDateOnly(value: string) {
  return value.includes("T") ? value.split("T")[0] : value;
}

function normalizeRating(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 5;
  }

  return Math.min(5, Math.max(1, value));
}

function fallbackReviewsData(): GoogleReviewsData {
  const reviews = fallbackReviews.map((review, index) => ({
    author: review.author,
    date: review.date,
    eventType: review.eventType,
    id: `fallback-${index}`,
    rating: review.rating,
    text: review.text,
  }));

  return {
    reviewStats: getReviewStats(reviews),
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
      reviewStats: getReviewStats(reviews),
      reviews,
      source: "cms",
    };
  } catch (error) {
    console.error("Failed to load CMS Google reviews", error);
    return fallbackReviewsData();
  }
}
