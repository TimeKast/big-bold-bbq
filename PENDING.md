# PENDING — Chef Dee's Big Bold BBQ Site

> Items waiting on the client (Chef Dee / business owner) before specific milestones can ship. Share this file directly with the client — each item has the question, why it matters, and what blocks if missing.

**Last updated:** 2026-06-24 (Google reviews carousel + dynamic rating/count support ready; Payload CMS + Vercel Blob ready, production domain live)
**Plan reference:** `/Users/bob/.claude/plans/big-bold-bbq-client-revisions-20260530.md`

---

## ✅ Resolved in client revisions round 1 (deck 05282026, applied 2026-05-30)

- **Phone number** → real **(702) 879-4977** wired everywhere (was placeholder).
- **Real Chef Dee photo** → live on home (Meet Chef Dee) + About. ✅ **Hi-res upgrade done (2026-05-30):** pulled the original 1122×1402 image embedded in the client's PPTX (replaces the earlier 478px slide export). Optimized to a 186KB progressive JPG. Plenty sharp for the framed card; a studio shoot would still give more flexibility for full-bleed/large crops (see P2 #15).
- **About copy** → full McCullough family rewrite applied.
- **Menu page** → built (`/menu`) with the client's full menu copy.
- **Privacy + Terms** → client's full legal copy applied; pages moved into the main nav shell.
- **Souper Bowl win** → confirmed via About doc; award framing live.
- **Nav reorder** → Home > About > Menu > Pricing > Contact > Blog.
- **Domain** → `bigboldbbq.com` + `www` resolve to Vercel and serve the production app. `lib/site.ts` now uses `https://bigboldbbq.com` for canonical / OG / JSON-LD URLs.
- **Payload media storage** → Vercel Blob store `big-bold-bbq-media` connected to Production, Preview, and Development via `BLOB_READ_WRITE_TOKEN`. Payload media uploads are configured for Blob with client uploads enabled.

### Still open after round 1
- **Email provider for chef@bigboldbbq.com** — needed to give you MX/SPF/DKIM. Options: Google Workspace (paid mailbox), Zoho Mail (free tier), or Cloudflare/ImprovMX forwarding (free, forwards to an existing inbox). Tell us which and we'll send the exact records. We cannot create the mailbox for you (it's tied to your provider account).
- **Footer slogan** still reads "Big flavor. Real smoke. Done right." — the hero dropped "Done right" but the footer keeps the brand tagline. Keep or drop? (Your call.)
- Google Business reviews, social handles, full photoshoot — unchanged from below.

---

## 🔴 P0 — Blocks M0 (Discovery freeze, day 1)

### 1. Phone number + CallRail account
- **Question:** What is the official business phone? Is a CallRail account already provisioned, or do we set it up?
- **Why it matters:** Phone is the #1 conversion channel. Sticky call bar, every CTA, JSON-LD `telephone`, NAP consistency, GMB — all depend on this. CallRail provides DNI swap for attribution.
- **Blocks:** Layout shell, every page CTA, JSON-LD, GA4 attribution.
- **Default if missing:** placeholder `(702) XXX-XXXX` — but blocks production deploy.

### 2. Domain
- **Question:** Is `bigboldbbq.com` purchased and DNS-controllable? If not, what's the production domain?
- **Why it matters:** `metadataBase`, OpenGraph, canonical URLs, JSON-LD `url`, Resend sending domain (DKIM/SPF), email `chef@<domain>`, video CDN custom domain.
- **Blocks:** Vercel domain config, email setup, OG images.
- **Default if missing:** Vercel preview URL `bbq-bbq.vercel.app` — works for dev only.

### 3. Logo SVG/AI source file
- **Question:** Do you have the original SVG or Adobe Illustrator file for the oval badge logo? The PDF only has a flattened raster.
- **Why it matters:** Need vector for hero, header (small), footer, favicon, OG image, mobile app icon, embroidery (uniforms), print collateral. Raster only = pixelated at large sizes.
- **Blocks:** Brand assets in `/public/brand/`, header logo component, OG image generator.
- **Default if missing:** trace from PDF (lossy, limited) or commission designer (extra cost).

### 4. Foto real de Chef Dee
- **Question:** Do you have at least 1 real, decent portrait of Chef Dee (high resolution, well-lit, ideally documentary-style with kitchen/pit context)?
- **Why it matters:** Codex adversarial review flagged AI-generated portraits of a real person (with explicit racial/native identity) as ethically and legally risky without consent. Plan says NO AI portraits. Need real photo for: Acto 2 (Meet Chef Dee, sticky portrait), About hero, footer signature, JSON-LD `Person.image`.
- **Blocks:** M2 hero (Acto 2), About page hero.
- **Options:**
  - (a) You have ≥1 usable portrait now → ship M2/M3 on schedule
  - (b) Schedule 4-hour photoshoot in Vegas before M2 (~$800-1500 local food/portrait photographer) — adds 1 week
  - (c) Ship without Chef Dee's face (typography + texture + macros only) — works but loses humanizing trust signal

### 5. Twilio A2P 10DLC SMS registration
- **Question:** Do we initiate Twilio A2P 10DLC registration on day 1?
- **Required to start:** legal business name, EIN, business address, sample message text, opt-in flow description, privacy policy URL, terms of service URL.
- **Why it matters:** A2P 10DLC approval realistically takes **10-15 days**, not 3-7 as originally estimated. SMS to Chef Dee on lead submit is a feature in the plan but should NOT block launch.
- **Decision needed:** Either (a) launch email-only at M5, enable SMS in M7+ once approved (recommended), or (b) push entire launch back ~2 weeks waiting on Twilio.

---

## 🟠 P1 — Blocks M2/M3/M5

### 6. Press mentions — does Chef Dee actually have any?
- **Question:** What press, podcasts, TV, magazines, or industry features have actually covered Chef Dee or her business? (Names + dates + URLs ideal.)
- **Why this is here:** I searched online (Las Vegas Review-Journal, Eater Vegas, KTNV, Vegas Magazine, Las Vegas Weekly, Google News) and could not find ANY press coverage for "Chef Dee's Big Bold BBQ" or "Chef Dee" + Las Vegas BBQ. This may mean: (a) the business is too new to have press yet, (b) press exists but not indexed online (local TV segments, print-only), or (c) the brand name online differs from what we have.
- **Blocks:** "As featured in" press section in Acto 2/About. Without verified press, that section stays hidden (no fake placeholders).
- **Default if missing:** remove press section entirely until real mentions exist.

### 7. Souper Bowl of Caring win — verify
- **Question:** What year did Chef Dee win the Souper Bowl of Caring? What was the exact event name, venue, and organizer? Do you have a photo of the trophy/award, a press release, or a link to the event's official results?
- **Why this is here:** This is a centerpiece trust signal in the plan (award badge appears in 4 locations + JSON-LD). I could not find any public record of a "Souper Bowl of Caring" event in Las Vegas around Super Bowl LVIII (Feb 2024) where Chef Dee placed first. This may be: (a) a local/charity event without web footprint (legitimate), (b) a different event name we have wrong, or (c) something to re-verify with the client.
- **Risk:** publishing an unverifiable award claim in JSON-LD `award` field is reputational risk if Google or a competitor checks.
- **Blocks:** Award badge component, Acto 2 stop 3, About authority section, JSON-LD `award` property.
- **Default if missing:** show the badge with subtler copy (e.g., "Award-winning gumbo" without specific event name) until we have proof to cite.

### 8. Google Business Profile + real reviews ⬅️ NOW THE #1 CONTENT GAP
- **Question:** Does Chef Dee have an active Google Business Profile? What's the **share link** (the `g.page/...` or `maps.app.goo.gl/...` URL)? For fully dynamic rating/count, we also need the Google **Place ID** and a Places API key configured in Vercel as `GOOGLE_PLACE_ID` + `GOOGLE_PLACES_API_KEY`. As real 5-star reviews come in, send us the **reviewer name + the review text + the date** for each.
- **What's built (2026-06-24):** The homepage reviews section is now a horizontal auto-scrolling carousel. Payload's `googleUrl` field is surfaced on each card as a clickable Google review link. The public aggregate text reads from Google Places when credentials are configured; until then it uses the confirmed manual fallback `5.0 from 17 Google reviews`.
- **Why it matters:** Reviews drive both conversion and local SEO. We will never fabricate them.
- **What we need from you:** (a) the GBP share link, (b) Google Place ID / API credentials for live count sync, (c) real 5-star reviews as they arrive (text + name + date).

### 9. Social media handles
- **Question:** Instagram, TikTok, Facebook, YouTube, Twitter/X — what handles exist?
- **Why it matters:** Footer social links, JSON-LD `Organization.sameAs`, OG/Twitter card metadata.
- **Default if missing:** no social section in footer, simpler page.

### 10. Email address for lead notifications
- **Question:** What email receives lead notifications? Is it `chef@<domain>`, a Gmail, both?
- **Why it matters:** Resend `to:` for lead notifications. If using a custom domain email, need DKIM/SPF records on the domain.
- **Default if missing:** ship to a Gmail temporarily, swap once domain email is set up.

---

## 🟡 P2 — Affects launch quality, not blocking

### 11. Real testimonials (with name + city + event type)
- **Question:** Can we get 6-8 real testimonials with first name, last initial, city, and what event they catered? Can we get 2-3 with permission to use their photo?
- **Status (2026-05-30):** The home reviews section now uses the real-curation system from #8 (`lib/content/reviews.ts`) with an honest empty state — no placeholders. Direct Google reviews are the priority source; standalone testimonials (non-Google) can also be dropped into the same file. Each card supports an optional `eventType` label (e.g. "Wedding · 180 guests").
- **Default if missing:** the honest "gathering reviews" state stays until real entries exist.

### 12. Service area photos / venue logistics per city
- **Question:** Have you actually catered events in Henderson, Summerlin, North Las Vegas, Boulder City? Photos? Venue names you can mention?
- **Why it matters:** Codex flagged risk of doorway pages if `/catering/{city}` LPs share boilerplate copy. Each LP needs 600-800 unique words referencing real local venues, real events catered, real local logistics.
- **Default if missing:** ship 1-2 city pages with real material (probably just `/catering/las-vegas`), drop the rest until material exists. ONE strong `/service-area` page > 5 thin ones.

### 13. Real menu — full list with descriptions and photos
- **Question:** Beyond the 6-item preview in the PDF, is there a full menu? Pricing tiers? Photos of each dish?
- **Why it matters:** PDF only lists 6 highlight items. Full menu page deferred unless content exists.
- **Default if missing:** ship without `/menu` page. Use 6 PDF items only on home preview.

### 14. Pricing ranges or anchors
- **Question:** Even if you don't publish exact prices, do you want to give a "starting at $X per person" anchor? Range like "$25-$75 per person depending on package"?
- **Why it matters:** PDF says no prices, custom quotes. Codex flagged risk of frustrating users when zero pricing guidance exists. A subtle range builds trust without locking in.
- **Default if missing:** follow PDF (zero pricing on page).

### 15. Press kit / brand photoshoot timeline
- **Question:** When can we schedule a real photoshoot for: Chef Dee portrait (multiple), action shots cooking, food still life, event coverage?
- **Why it matters:** AI macro food shots cover the gap, but real photos are stronger trust + Schema.org `image` integrity.
- **Default if missing:** ship with AI macros + real Chef Dee portrait only, schedule shoot for week 4-5 post-launch.

### 16. Existing assets inventory
- **Question:** Anything else exists? Existing website, business cards, old logo iterations, video clips from past events, recipe blog posts, customer-shot photos with permission?
- **Why it matters:** could shortcut content production.
- **Default if missing:** generate everything from scratch.

---

## 🟢 P3 — Nice to have

### 17. Email/SMS templates copy review
- **Question:** Once Resend templates are drafted, do you (Chef Dee or designated person) want to review the wording before they go live?
- **Default if missing:** ship our drafts.

### 18. Privacy / Terms / SMS opt-in legal review
- **Question:** Will you have a lawyer review the Privacy Policy, Terms of Service, and SMS terms before launch?
- **Why it matters:** CCPA + TCPA + Cloudflare Turnstile Privacy Addendum. Off-the-shelf templates work for small business but can have gaps.
- **Default if missing:** ship Termly/iubenda generated, swap when reviewed.

---

## ✅ Resolved / Decided

| # | Question | Resolution | Date |
|---|----------|-----------|------|
| Lang | English or es-MX? | **English only** | 2026-05-08 |
| Quote form | Custom or PDF spec? | **Follow PDF literally** | 2026-05-08 |
| Video gen | Sora 2 fallback or Seedance only? | **Seedance via Segmind only** (skill: `segmind-video`) | 2026-05-08 |
| Skin family | Cinematic Documentary vs Hearth | **Cinematic Documentary × Hearth (hybrid)** | 2026-05-08 |
| `/api/quote` runtime | Edge or Node | **Node** (Twilio SDK incompat with Edge) | 2026-05-08 |
| Video CDN | R2 vs Vercel Blob | **Vercel Blob** for MVP | 2026-05-08 |
| Map | Mapbox / SVG / Google embed | **Live Google Maps embed** (client chose 2026-05-30, replacing the illustrated SVG) | 2026-05-30 |
| Blog CMS | Contentlayer or simpler | **`@next/mdx` + `gray-matter`** | 2026-05-08 |
| Monitoring | Full stack | **Sentry + GA4 + CallRail + Vercel Speed Insights only** (drop BetterStack + Vercel Analytics) | 2026-05-08 |

---

## How to use this file

- **Client (Chef Dee):** scan P0 first. Replying to those 5 unblocks the first sprint. P1 unblocks weeks 2-3. P2/P3 affect launch quality but not the schedule.
- **Dev (Bob/Claude):** every time the client answers, move the item to "Resolved" with date and resolution. Keep this file as the single source of pending items so the team never loses track.
