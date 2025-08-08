import React from "react";

interface ReferenceSource {
  label: string;
  url: string;
}

interface ReferenceSourcesProps {
  sources: ReferenceSource[];
}

export default function ReferenceSources({ sources }: ReferenceSourcesProps) {
  return (
    <div className="mb-10 text-sm text-muted-foreground">
      <p className="font-semibold mb-1">參考資料來源：</p>
      <ul className="list-disc list-inside space-y-1">
        {sources.map((source, idx) => (
          <li key={idx}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
