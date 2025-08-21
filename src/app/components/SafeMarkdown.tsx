// components/SafeMarkdown.tsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = { children: string; className?: string };

export default function SafeMarkdown({ children, className }: Props) {
  return (
    <ReactMarkdown
      className={className}
      remarkPlugins={[remarkGfm]}
      // You can also map elements to add classes
      components={{
        a: ({...props }) => (
          <a {...props} rel="noopener noreferrer" target="_blank" />
        ),
      }}
    >
      {children || ""}
    </ReactMarkdown>
  );
}
