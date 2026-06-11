import type { CSSProperties } from "react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { cn } from "@/lib/utils";

type BlogImageFit = "contain" | "cover";
type BlogImageAspectRatio = "auto" | "16:9" | "4:3" | "1:1";
type BlogImageDisplayWidth = "image" | "content" | "wide" | "full";

type UploadDoc = {
  alt?: string | null;
  caption?: string | null;
  filename?: string | null;
  height?: number | null;
  mimeType?: string | null;
  url?: string | null;
  width?: number | null;
};

type UploadNode = {
  fields?: {
    alt?: string | null;
    aspectRatio?: BlogImageAspectRatio | null;
    displayWidth?: BlogImageDisplayWidth | null;
    fit?: BlogImageFit | null;
  } | null;
  value?: unknown;
};

function getMediaStyle(upload: UploadDoc, aspectRatio: BlogImageAspectRatio): CSSProperties {
  const style = {
    "--bbq-media-natural-width": upload.width ? `${upload.width}px` : "100%",
  } as CSSProperties;

  if (aspectRatio === "auto") {
    return style;
  }

  return {
    ...style,
    "--bbq-media-aspect-ratio": aspectRatio.replace(":", " / "),
  } as CSSProperties;
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    const uploadNode = node as UploadNode;

    if (typeof uploadNode.value !== "object" || uploadNode.value === null) {
      return null;
    }

    const upload = uploadNode.value as UploadDoc;
    const url = upload.url;

    if (!url) {
      return null;
    }

    if (!upload.mimeType?.startsWith("image")) {
      return (
        <a href={url} rel="noopener noreferrer">
          {upload.filename ?? url}
        </a>
      );
    }

    const fit = uploadNode.fields?.fit ?? "contain";
    const aspectRatio = uploadNode.fields?.aspectRatio ?? "auto";
    const displayWidth = uploadNode.fields?.displayWidth ?? "content";
    const caption = upload.caption?.trim();

    // Payload's default JSX converter emits <source> tags from generated image
    // sizes. With Vercel Blob random suffixes those size URLs can point to
    // non-existent objects, while the canonical upload URL points at the real
    // blob. Render the canonical image directly and let editors control fit,
    // width, and optional aspect ratio per blog embed.
    return (
      <figure
        className={cn(
          "bbq-rich-media",
          `bbq-rich-media--${displayWidth}`,
          aspectRatio !== "auto" && "bbq-rich-media--framed",
        )}
        style={getMediaStyle(upload, aspectRatio)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Payload/Vercel Blob media uses canonical URLs; Next optimization can break on long /api/media paths. */}
        <img
          alt={uploadNode.fields?.alt ?? upload.alt ?? ""}
          className={cn("bbq-rich-media__image", `bbq-rich-media__image--${fit}`)}
          height={upload.height ?? undefined}
          loading="lazy"
          src={url}
          width={upload.width ?? undefined}
        />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </figure>
    );
  },
});

export function RichTextContent({ data }: { data: SerializedEditorState }) {
  return (
    <div className="bbq-rich-text">
      <RichText converters={converters} data={data} />
    </div>
  );
}
