import React from "react";

interface CoverageSection {
  type: "full" | "limited" | "none";
  title: string;
  items: string[];
}

interface CoverageRegionCardProps {
  title: string;
  sections: CoverageSection[];
  notes?: React.ReactNode;
  imgSrc?: string;
}

const styleMap: Record<CoverageSection["type"], string> = {
  full: "bg-red-800/30",
  limited: "bg-blue-800/30",
  none: "bg-zinc-800",
};

export default function CoverageRegionCard({
  title,
  sections,
  notes,
  imgSrc,
}: CoverageRegionCardProps) {
  const isHorizontalLayout = title === "非洲";

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4">
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>

      {/* 非洲為左右排版，其餘為圖片在上 */}
      {imgSrc &&
        (isHorizontalLayout ? (
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={imgSrc}
                alt={`${title} 示意圖`}
                className="rounded-lg border border-zinc-700 shadow-md h-[600px] object-contain"
              />
            </div>
            <div className="w-full md:w-1/2">
              {sections.map((section, idx) => (
                <div
                  key={idx}
                  className={`${styleMap[section.type]} rounded-md p-3 mb-4`}
                >
                  <h4 className="text-white font-semibold mb-2">{section.title}</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground">
                    {section.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {notes && (
                <div className="text-sm text-muted-foreground">{notes}</div>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-4 flex justify-center">
            <img
              src={imgSrc}
              alt={`${title} 示意圖`}
              className="rounded-lg border border-zinc-700 shadow-md max-w-full h-[300px] object-contain"
            />
          </div>
        ))}

      {/* 非洲已在上方渲染，其他區域才需要補內容 */}
      {!isHorizontalLayout && (
        <>
          {sections.map((section, idx) => (
            <div
              key={idx}
              className={`${styleMap[section.type]} rounded-md p-3 mb-4`}
            >
              <h4 className="text-white font-semibold mb-2">
                {section.title}
              </h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground">
                {section.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
          {notes && (
            <div className="text-sm text-muted-foreground">{notes}</div>
          )}
        </>
      )}
    </div>
  );
}
