import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";

export function RichTextContent({ data }: { data: SerializedEditorState }) {
  return (
    <div className="bbq-rich-text">
      <RichText data={data} />
    </div>
  );
}
