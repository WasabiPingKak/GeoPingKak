import React from "react";
import { REGION_VIEWS, type RegionKey } from "@/data/coverageData";
import RegionCoverageMap from "./RegionCoverageMap";

interface CoverageSection {
  type: "full" | "limited" | "none";
  title: string;
  items: string[];
}

interface CoverageRegionCardProps {
  title: string;
  region: RegionKey;
  sections: CoverageSection[];
  notes?: React.ReactNode;
  /** stacked：地圖在上、清單在下；side：桌機版地圖與清單左右並排（非洲） */
  layout?: "stacked" | "side";
}

const styleMap: Record<CoverageSection["type"], string> = {
  full: "bg-[#1d7374]/30",
  limited: "bg-blue-800/30",
  none: "bg-zinc-800",
};

function SectionList({ sections, notes }: Pick<CoverageRegionCardProps, "sections" | "notes">) {
  return (
    <>
      {sections.map((section, idx) => (
        <div key={idx} className={`${styleMap[section.type]} rounded-md p-3 mb-4`}>
          <h4 className="text-white font-semibold mb-2">{section.title}</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {section.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      {notes && <div className="text-sm text-muted-foreground">{notes}</div>}
    </>
  );
}

export default function CoverageRegionCard({
  title,
  region,
  sections,
  notes,
  layout = "stacked",
}: CoverageRegionCardProps) {
  const view = REGION_VIEWS[region];

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

      {layout === "side" ? (
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <RegionCoverageMap view={view} maxHeight={600} />
          </div>
          <div className="w-full md:w-1/2">
            <SectionList sections={sections} notes={notes} />
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <RegionCoverageMap view={view} maxHeight={300} />
          </div>
          <SectionList sections={sections} notes={notes} />
        </>
      )}
    </div>
  );
}
