# Why the site shows reviews the way it does

**Short version:** we show only real Google reviews with their written
comments, curated in Payload CMS so we keep full control over quality, speed,
and design. Here's the reasoning behind that choice.

## The goal

Display genuine five-star Google reviews — with the customer's actual words —
in a layout that matches the rest of the site, and never show anything less
than five stars or anything invented.

## The options we looked at

**1. Pull reviews automatically from Google (Places API).**
This sounds ideal but has real limits for a business like this:
- Google only returns a maximum of **five** reviews through the API.
- You **cannot filter to five-star only** — the API returns whatever Google
  considers "most relevant," which can include three- and four-star reviews
  you have no way to hide.
- It requires a Google Cloud account with an **API key and billing enabled**.
- Google's terms restrict how the data can be stored and displayed.

In other words, we'd be handing control of which reviews appear to Google,
with no guarantee they'd all be five-star.

**2. A third-party review widget (Elfsight, Trustindex, and similar).**
These auto-sync from Google, but:
- They carry a **monthly subscription fee**.
- They inject a large amount of **external JavaScript (200KB+)** that slows the
  page down and works against the site's speed and SEO.
- They show **their own branding** and give limited control over styling.
- They add extra cookie/privacy surface.

For a site built to feel premium and load fast, that's a poor trade.

**3. CMS-curated reviews (what we chose).**
Real reviews are added in Payload CMS as they come in.

## Why hand-curation is the right call here

- **Quality control:** only genuine five-star reviews with a written comment
  ever appear. Nothing lower, nothing fake.
- **Zero ongoing cost:** no API billing, no monthly widget fee.
- **Speed:** no third-party scripts and no live API calls, so the reviews
  section never slows the page.
- **Design:** reviews render in the site's own styling, not a generic widget.
- **SEO:** when real reviews are present, the site automatically outputs the
  proper structured data (AggregateRating + Review) that Google reads.
- **Honesty:** until real reviews are added, the section shows a truthful
  "we're gathering reviews" message — we never publish invented quotes.

## How it works day to day

1. As Google reviews come in, we add each one in Payload CMS with the name,
   rating, review text, date, and optional event context.
2. The section automatically switches from the "gathering reviews" state to a
   grid of review cards with a star rating.
3. Add the Google Business Profile link once, and a "Review us on Google"
   button appears to help collect more.

**The only trade-off** is that adding a review is a quick manual step rather
than an automatic sync — and that manual step is exactly what guarantees the
five-star-only quality we want.
