import React from "react";

// 國旗元件：每洲的國旗愛用國家清單（使用 Grid 呈現，RWD 友善）
export default function FlagLovingGridByContinent({
  countries,
}: {
  countries: { domain: string; name: string }[];
}) {
  const data = [
    {
      continent: "亞洲",
      domains: ["id", "my", "th", "kh"],
    },
    {
      continent: "歐洲",
      domains: ["no", "se", "fi", "dk", "is", "cz", "sk", "si", "hr", "rs", "me", "al", "mk", "tr"],
    },
    {
      continent: "美洲",
      domains: ["ca", "us", "mx", "pa", "br", "pe", "cl"],
    },
    {
      continent: "非洲",
      domains: ["tn", "ke", "sz", "ls", "za", "sn", "gh"],
    },
    {
      continent: "大洋洲",
      domains: ["au", "nz"],
    },
  ];

  return (
    <div className="space-y-8">
      {data.map(({ continent, domains }) => {
        const flagCountries = domains
          .map((d) => countries.find((c) => c.domain === d))
          .filter(Boolean) as { domain: string; name: string }[];

        return (
          <div key={continent} className="mb-6">
            <h3 className="text-lg font-bold text-white mb-2">{continent}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {flagCountries.map((country) => (
                <div
                  key={country.domain}
                  className="border border-zinc-700 rounded-lg p-4 text-center"
                >
                  <img
                    src={`/flags/${country.domain}.png`}
                    alt={`${country.name} 國旗`}
                    className="h-24 mx-auto mb-2"
                  />
                  <p className="text-base">{country.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
