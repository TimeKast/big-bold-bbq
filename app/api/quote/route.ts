import { quoteSchema, type QuoteInput } from "@/lib/schemas/quote";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const resendEndpoint = "https://api.resend.com/emails";
const defaultFromEmail = `Big Bold BBQ <${site.email}>`;

const eventTypeLabels: Record<QuoteInput["eventType"], string> = {
  corporate: "Corporate Event",
  wedding: "Wedding",
  "private-party": "Private Party",
  other: "Other",
};

const cateringStyleLabels: Record<QuoteInput["cateringStyle"], string> = {
  "drop-off": "Drop-off",
  buffet: "Buffet",
  "on-site": "On-site BBQ Experience",
};

type ResendFailure = {
  error?: string;
  message?: string;
  name?: string;
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: "Invalid quote request." },
      { status: 400 }
    );
  }

  if (hasHoneypotValue(body)) {
    return Response.json({ ok: true });
  }

  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        ok: false,
        message: "Please check the quote form fields.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipients = getRecipients();
  const from = process.env.QUOTE_FROM_EMAIL || defaultFromEmail;

  if (!apiKey || recipients.length === 0) {
    console.error("[quote] Missing quote email configuration.");
    return Response.json(
      {
        ok: false,
        message: "Quote email notifications are not configured yet. Please call us directly.",
      },
      { status: 500 }
    );
  }

  const quote = parsed.data;
  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      reply_to: quote.email,
      subject: `New catering quote request from ${quote.fullName}`,
      html: renderQuoteHtml(quote),
      text: renderQuoteText(quote),
      tags: [{ name: "source", value: "quote_form" }],
    }),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as ResendFailure | null;
    console.error("[quote] Resend email failed.", {
      status: response.status,
      error: error?.message || error?.error || error?.name || response.statusText,
    });

    return Response.json(
      {
        ok: false,
        message: "We could not send your quote request. Please call us directly.",
      },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}

function getRecipients() {
  const configured = process.env.QUOTE_TO_EMAIL || process.env.NOTIFICATION_EMAIL_TO || site.email;

  return configured
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function hasHoneypotValue(value: unknown) {
  if (!value || typeof value !== "object" || !("website" in value)) {
    return false;
  }

  const website = (value as { website?: unknown }).website;
  return typeof website === "string" && website.trim().length > 0;
}

function renderQuoteHtml(quote: QuoteInput) {
  return `
    <div style="font-family:Arial,sans-serif;color:#2b1e16;line-height:1.5">
      <h1 style="font-size:24px;margin:0 0 16px">New catering quote request</h1>
      <p style="margin:0 0 24px">A new request was submitted through ${escapeHtml(site.name)}.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px">
        ${renderRow("Name", quote.fullName)}
        ${renderRow("Phone", quote.phone)}
        ${renderRow("Email", quote.email)}
        ${renderRow("Event type", eventTypeLabels[quote.eventType])}
        ${renderRow("Event date", quote.eventDate)}
        ${renderRow("Guest count", quote.guestCount.toLocaleString("en-US"))}
        ${renderRow("Event location", quote.eventLocation)}
        ${renderRow("Service style", cateringStyleLabels[quote.cateringStyle])}
        ${renderRow("Preferred meats", quote.preferredMeats || "Not provided")}
        ${renderRow("Preferred sides", quote.preferredSides || "Not provided")}
        ${renderRow("Special requests", quote.specialRequests || "Not provided")}
      </table>
    </div>
  `;
}

function renderRow(label: string, value: string | number) {
  return `
    <tr>
      <td style="border-top:1px solid #e7d4b8;padding:10px 12px;font-weight:700;vertical-align:top;width:180px">
        ${escapeHtml(label)}
      </td>
      <td style="border-top:1px solid #e7d4b8;padding:10px 12px;white-space:pre-line">
        ${escapeHtml(value)}
      </td>
    </tr>
  `;
}

function renderQuoteText(quote: QuoteInput) {
  return [
    "New catering quote request",
    "",
    `Name: ${quote.fullName}`,
    `Phone: ${quote.phone}`,
    `Email: ${quote.email}`,
    `Event type: ${eventTypeLabels[quote.eventType]}`,
    `Event date: ${quote.eventDate}`,
    `Guest count: ${quote.guestCount.toLocaleString("en-US")}`,
    `Event location: ${quote.eventLocation}`,
    `Service style: ${cateringStyleLabels[quote.cateringStyle]}`,
    `Preferred meats: ${quote.preferredMeats || "Not provided"}`,
    `Preferred sides: ${quote.preferredSides || "Not provided"}`,
    `Special requests: ${quote.specialRequests || "Not provided"}`,
  ].join("\n");
}

function escapeHtml(value: string | number) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const escapes: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return escapes[char];
  });
}
