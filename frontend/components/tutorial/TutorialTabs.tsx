// components/tutorial/TutorialTabs.tsx

import React from "react";

interface TutorialTabsProps {
  tabs: string[];
  selectedTab: string;
  onSelectTab: (tab: string) => void;
}

export default function TutorialTabs({
  tabs,
  selectedTab,
  onSelectTab,
}: TutorialTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelectTab(tab)}
          className={`px-4 py-2 rounded-full border text-sm transition
            ${selectedTab === tab
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground hover:text-white hover:bg-accent"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
