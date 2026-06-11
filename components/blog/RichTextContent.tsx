import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { RichText } from "@payloadcms/richtext-lexical/react";

type UploadDoc = {
  alt?: string | null;
  filename?: string | null;
  height?: number | null;
  mimeType?: string | null;
  url?: string | null;
  width?: number | null;
};

type UploadNode = {
  fields?: {
    alt?: string | null;
  };
  value?: unknown;
};

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

    // Payload's default JSX converter emits <source> tags from generated image
    // sizes. With Vercel Blob random suffixes those size URLs can point to
    // non-existent objects, while the canonical upload URL points at the real
    // blob. Render the canonical image directly to avoid broken responsive
    // sources on published blog posts.
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Payload/Vercel Blob size URLs can 404 with random suffixes; use the canonical blob URL directly.
      <img
        alt={uploadNode.fields?.alt ?? upload.alt ?? ""}
        height={upload.height ?? undefined}
        loading="lazy"
        src={url}
        width={upload.width ?? undefined}
      />
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
