"use client";

import { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, STEPS, type QuoteInput } from "@/lib/schemas/quote";
import { CtaButton } from "@/components/shared/CtaButton";
import { PhoneLink } from "@/components/shared/PhoneLink";
import { ChevronLeft, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Multi-step quote funnel — V1 stub.
 * Validates per-step with zod, persists nothing yet, on submit logs to console.
 * M5 wires this to /api/quote (Node runtime) → Supabase + Resend + Turnstile.
 */
export function QuoteFunnelStub() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const methods = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      eventType: "wedding",
      eventDate: "",
      guestCount: 50,
      eventLocation: "",
      cateringStyle: "buffet",
      preferredMeats: "",
      preferredSides: "",
      specialRequests: "",
      website: "",
    },
  });

  const stepFields = STEPS[step].fields;

  async function next() {
    const ok = await methods.trigger([...stepFields]);
    if (!ok) return;
    if (step < STEPS.length - 1) setStep(step + 1);
    else methods.handleSubmit(onSubmit)();
  }

  function back() {
    setStep(Math.max(0, step - 1));
  }

  async function onSubmit(data: QuoteInput) {
    if (data.website) return; // honeypot
    // V1 stub: console.log only. M5 hooks /api/quote.
    console.log("[quote] submitted", data);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-charcoal text-parchment p-8 sm:p-12 text-center">
        <Check className="size-14 text-warmgold mx-auto mb-6" aria-hidden />
        <h2 className="font-display text-3xl md:text-4xl mb-4 text-balance">
          Thank you. We&apos;ll be in touch shortly.
        </h2>
        <p className="text-parchment/85 max-w-md mx-auto mb-8">
          We come back the same day with a custom menu and a clear quote. While you
          wait, feel free to call directly.
        </p>
        <PhoneLink source="cta-band" variant="ghost" />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8" noValidate>
        {/* Progress */}
        <div className="flex items-center gap-2" aria-label="Form progress">
          {STEPS.map((s, idx) => (
            <span
              key={s.id}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                idx <= step ? "bg-firebrick" : "bg-hickory/20"
              )}
              aria-current={idx === step ? "step" : undefined}
            />
          ))}
        </div>
        <p className="text-sm text-hickory/65">
          Step {step + 1} of {STEPS.length} · {STEPS[step].title} · ~90 seconds total
        </p>

        {/* Honeypot */}
        <input
          type="text"
          {...methods.register("website")}
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] opacity-0 pointer-events-none"
          aria-hidden
        />

        {/* Steps */}
        <div className="rounded-2xl bg-parchment-grain border border-hickory/15 p-6 sm:p-10">
          {step === 0 && <StepBasics />}
          {step === 1 && <StepEvent />}
          {step === 2 && <StepLocation />}
          {step === 3 && <StepMenu />}
        </div>

        {/* Nav */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <button
            type="button"
            onClick={back}
            disabled={step === 0}
            className="inline-flex items-center gap-1 text-hickory/75 hover:text-firebrick disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="size-4" aria-hidden />
            Back
          </button>

          <div className="flex items-center gap-3">
            <PhoneLink source="cta-band" variant="inline" label="Or call now" showIcon />
            <CtaButton
              variant="primary"
              size="lg"
              onClick={next}
              type="button"
            >
              {step === STEPS.length - 1 ? "Get My Quote" : "Continue"}
            </CtaButton>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

// ---- Step components --------------------------------------------------------

function Field({
  label,
  name,
  type = "text",
  placeholder,
  as = "input",
  options,
}: {
  label: string;
  name: keyof QuoteInput;
  type?: string;
  placeholder?: string;
  as?: "input" | "textarea" | "select";
  options?: { value: string; label: string }[];
}) {
  const { register, formState } = useFormContext<QuoteInput>();
  const error = formState.errors[name]?.message as string | undefined;

  const inputCls =
    "w-full rounded-md bg-parchment border-2 border-hickory/15 px-4 py-3 text-base text-hickory placeholder:text-hickory/40 focus:border-firebrick focus:outline-none transition-colors";

  return (
    <label className="flex flex-col gap-2">
      <span className="font-display text-sm uppercase tracking-wider text-hickory/85">
        {label}
      </span>
      {as === "textarea" ? (
        <textarea
          {...register(name)}
          placeholder={placeholder}
          rows={4}
          className={inputCls}
        />
      ) : as === "select" && options ? (
        <select {...register(name)} className={inputCls}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          {...register(name, type === "number" ? { valueAsNumber: true } : undefined)}
          placeholder={placeholder}
          className={inputCls}
        />
      )}
      {error && (
        <span className="text-firebrick text-sm" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function StepBasics() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Field label="Full name" name="fullName" placeholder="Jordan Rivers" />
      <Field label="Phone" name="phone" type="tel" placeholder="(702) 555-0100" />
      <div className="md:col-span-2">
        <Field label="Email" name="email" type="email" placeholder="you@example.com" />
      </div>
    </div>
  );
}

function StepEvent() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Field
        label="Event type"
        name="eventType"
        as="select"
        options={[
          { value: "wedding", label: "Wedding" },
          { value: "corporate", label: "Corporate Event" },
          { value: "private-party", label: "Private Party" },
          { value: "other", label: "Other" },
        ]}
      />
      <Field label="Event date" name="eventDate" type="date" />
      <div className="md:col-span-2">
        <Field
          label="Estimated guest count"
          name="guestCount"
          type="number"
          placeholder="50"
        />
      </div>
    </div>
  );
}

function StepLocation() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Field
        label="Event location (city / venue)"
        name="eventLocation"
        placeholder="Las Vegas Strip"
      />
      <Field
        label="Service style"
        name="cateringStyle"
        as="select"
        options={[
          { value: "drop-off", label: "Drop-off" },
          { value: "buffet", label: "Buffet" },
          { value: "on-site", label: "On-site BBQ Experience" },
        ]}
      />
    </div>
  );
}

function StepMenu() {
  return (
    <div className="grid gap-6">
      <Field label="Preferred meats (optional)" name="preferredMeats" placeholder="Brisket, ribs..." />
      <Field label="Preferred sides (optional)" name="preferredSides" placeholder="Mac & cheese, dirty rice..." />
      <Field
        label="Anything else?"
        name="specialRequests"
        as="textarea"
        placeholder="Dietary needs, venue notes, dream menu items..."
      />
      <p className="text-xs text-hickory/55 mt-2">
        By submitting, you agree to be contacted about your event. See our{" "}
        <a href="/privacy" className="underline hover:text-firebrick">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
