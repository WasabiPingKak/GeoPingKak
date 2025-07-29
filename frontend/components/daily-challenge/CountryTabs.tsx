// components/daily-challenge/CountryTabs.tsx

import React from "react";

interface CountryTabsProps {
  countries: string[];
  selectedCountry: string;
  onSelect: (country: string) => void;
}

export default function CountryTabs({
  countries,
  selectedCountry,
  onSelect,
}: CountryTabsProps) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => onSelect(country)}
          className={`px-4 py-2 rounded-full border transition ${selectedCountry === country
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
        >
          {country}
        </button>
      ))}
    </div>
  );
}
