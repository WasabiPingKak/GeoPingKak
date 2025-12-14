// components/glossary/GlossaryCard.tsx
"use client";

import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import type { GlossaryEntry } from "@/data/glossary";

export default function GlossaryCard({
  entry,
  children,
}: {
  entry: GlossaryEntry;
  /**
   * 文字內容區（由外部決定如何 render，例如接 MarkdownRenderer）
   * GlossaryCard 只負責排版，不綁死 markdown 套件。
   */
  children: React.ReactNode;
}) {
  const images = entry.images ?? [];

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow space-y-4">
      {/* 標題 */}
      <h2 className="text-lg font-semibold text-white">{entry.title}</h2>

      {/* 文字內容（永遠在上） */}
      <div>{children}</div>

      {/* 圖片區（永遠在下，若有） */}
      {images.length > 0 && (
        <div className="flex flex-col gap-3 pt-2">
          {images.map((img, idx) => (
            <div key={`${img.src}-${idx}`} className="flex justify-center">
              {/* 限制縮圖最大寬度：桌機不滿版，手機仍可接近滿寬 */}
              <div className="w-full max-w-md md:max-w-lg">
                <Zoom>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="rounded-lg border border-zinc-700 shadow-md w-full"
                  />
                </Zoom>

                {img.caption && (
                  <div className="mt-1 text-xs text-muted-foreground text-center">
                    {img.caption}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
