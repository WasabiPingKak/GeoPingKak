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
          className={`px-4 py-2 rounded-full border transition-colors duration-200 font-medium
            ${selectedCountry === country
              ? "bg-blue-600 text-white border-blue-600 shadow-md"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-white"
            }`}
        >
          {country}
        </button>
      ))}
    </div>
  );
}
