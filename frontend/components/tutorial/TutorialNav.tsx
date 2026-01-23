"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { TUTORIAL_SECTIONS } from "./tutorialSections";

export default function TutorialNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 flex-wrap">
      {TUTORIAL_SECTIONS.map((section) => {
        const href = `/tutorial/${section.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={section.slug}
            href={href}
            className={clsx(
              "px-4 py-2 rounded-full border transition-colors duration-200 font-medium text-sm",
              isActive
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-muted text-muted-foreground hover:bg-accent hover:text-white"
            )}
          >
            {section.shortTitle}
          </Link>
        );
      })}
    </div>
  );
}
