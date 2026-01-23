"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { TUTORIAL_SECTIONS } from "./tutorialSections";

export default function TutorialNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {TUTORIAL_SECTIONS.map((section, index) => {
        const href = `/tutorial/${section.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={section.slug}
            href={href}
            className={clsx(
              "block px-3 py-2 rounded-lg text-sm transition-colors",
              isActive
                ? "bg-blue-600/20 text-blue-400 font-semibold border border-blue-600/30"
                : "text-zinc-300 hover:bg-zinc-700/50 hover:text-white"
            )}
          >
            <span className="text-zinc-500 mr-2">{index + 1}.</span>
            {section.shortTitle}
          </Link>
        );
      })}
    </nav>
  );
}
