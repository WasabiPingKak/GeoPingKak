// src/app/quick-reference/layout.tsx
import React from "react";
import QuickReferenceTabs from "@/components/QuickReferenceTabs";

export default function QuickReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">速查筆記</h1>
        <p className="text-zinc-400 mt-1 text-sm">
          快速查找 GeoGuessr 常見地名、方位詞、行政區、電話區碼等資訊。
        </p>
      </div>

      <QuickReferenceTabs /> {/* Tabs 為 client component */}

      <div>{children}</div>
    </div>
  );
}
