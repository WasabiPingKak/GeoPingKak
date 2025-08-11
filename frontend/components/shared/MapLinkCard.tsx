import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

interface MapLinkCardProps {
  label: string;
  url: string;
  description: string;
  className?: string;
}

export default function MapLinkCard({
  label,
  url,
  description,
  className = "",
}: MapLinkCardProps) {
  return (
    <div className={`w-full max-w-xs rounded-md border border-blue-500 bg-blue-900/30 p-4 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-blue-300 font-medium text-sm hover:underline"
      >
        {label}
        <FaExternalLinkAlt className="ml-2 h-3 w-3" />
      </a>
      <p className="text-sm text-muted-foreground mt-2">{description}</p>
    </div>
  );
}

