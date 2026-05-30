/**
 * Real, hand-curated Google reviews.
 *
 * Only genuine 5-star reviews with a written comment belong here. As the team
 * collects them from the Google Business Profile, paste each one below. When
 * this array is non-empty:
 *   - the homepage Reviews section renders the cards + an aggregate rating
 *   - JSON-LD emits valid AggregateRating + Review structured data
 * While it's empty, the section shows an honest "gathering reviews" state —
 * never invented quotes.
 *
 * Note: Google generally does NOT render star rich-results for a business's
 * own self-hosted reviews (only third-party/aggregator pages get stars). The
 * markup is still valid, truthful structured data that helps Google understand
 * the entity — we just don't bank on stars showing in search.
 *
 * To add a review: copy the reviewer's first name + last initial, the review
 * text verbatim, and the date from Google. Keep `rating: 5`. `eventType` is
 * optional context shown as a small label under the name.
 */

export type Review = {
  author: string;
  rating: 5;
  text: string;
  date: string; // ISO yyyy-mm-dd
  eventType?: string; // e.g. "Wedding · 180 guests"
};

export const reviews: Review[] = [
  // Paste real 5-star Google reviews here, e.g.:
  // {
  //   author: "Marcus T.",
  //   rating: 5,
  //   text: "Best brisket in Vegas, hands down. Chef Dee catered our office...",
  //   date: "2026-05-12",
  //   eventType: "Corporate lunch · 60 guests",
  // },
];

export const reviewStats = {
  count: reviews.length,
  average:
    reviews.length > 0
      ? Math.round(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10,
        ) / 10
      : 0,
};
