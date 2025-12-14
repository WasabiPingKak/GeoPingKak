// components/glossary/MarkdownRenderer.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * 簡易 Markdown Renderer（安全）
 * - 不允許 raw HTML（預設即不渲染 HTML）
 * - 圖片不從 markdown 處理（避免外部內容混入），圖片只走 GlossaryEntry.images
 */
export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // 禁止 markdown 內的 <img>，避免與 entry.images 混在一起
        disallowedElements={["img"]}
        unwrapDisallowed={true}
        // 統一處理常用標籤的樣式（保留簡潔）
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
          strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ href, children }) => (
            <a
              href={href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline underline-offset-2"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 my-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 my-2">{children}</ol>,
          li: ({ children }) => <li>{children}</li>,
          code: ({ children }) => (
            <code className="px-1 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-xs">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
