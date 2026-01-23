"use client";

import { usePathname, useRouter } from "next/navigation";
import { TUTORIAL_SECTIONS } from "./tutorialSections";

export default function TutorialMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const currentSlug = pathname.replace("/tutorial/", "");

  return (
    <select
      value={currentSlug}
      onChange={(e) => router.push(`/tutorial/${e.target.value}`)}
      className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-600 text-white text-sm focus:outline-none focus:border-blue-500"
    >
      {TUTORIAL_SECTIONS.map((section, index) => (
        <option key={section.slug} value={section.slug}>
          {index + 1}. {section.title}
        </option>
      ))}
    </select>
  );
}
