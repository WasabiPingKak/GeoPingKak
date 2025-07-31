// components/shared/CommonTabs.tsx

import React from "react";

interface CommonTabsProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function CommonTabs({
  options,
  selected,
  onSelect,
}: CommonTabsProps) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-4 py-2 rounded-full border transition-colors duration-200 font-medium
            ${selected === option
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-white"
            }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
