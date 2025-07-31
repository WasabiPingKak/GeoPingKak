// components/special-maps/SpecialCategoryDescription.tsx

import React from "react";

interface SpecialCategoryDescriptionProps {
  category: string;
}

export default function SpecialCategoryDescription({ category }: SpecialCategoryDescriptionProps) {
  const categoryText: Record<string, string> = {
    "台灣主題": "台灣為什麼有這麼多怪地方",
    "其他主題": "還沒做好，先挖一個欄位放著",
  };

  return (
    <div className="mb-6 text-sm text-muted-foreground">
      <p>{categoryText[category] || ""}</p>
    </div>
  );
}
