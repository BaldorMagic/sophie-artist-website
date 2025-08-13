// components/SafeMarkdown.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";

type Props = { children: string; className?: string };

// Optional: allow a very small subset beyond default
const schema: any = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [
      ...(defaultSchema.attributes?.a || []),
      ["target", "rel"], // allow target + rel on links
    ],
  },
};

export default function SafeMarkdown({ children, className }: Props) {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeSanitize, schema]]}
      // You can also map elements to add classes
      components={{
        a: ({ node, ...props }) => (
          <a {...props} rel="noopener noreferrer" target="_blank" />
        ),
      }}
    >
      {children || ""}
    </ReactMarkdown>
  );
}
