"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TUTORIAL_SECTIONS } from "./tutorialSections";

export default function TutorialBreadcrumb() {
  const pathname = usePathname();
  const currentSlug = pathname.replace("/tutorial/", "");
  const current = TUTORIAL_SECTIONS.find((s) => s.slug === currentSlug);

  if (!current) return null;

  return (
    <nav className="text-sm text-zinc-400 mb-4" aria-label="breadcrumb">
      <ol className="flex items-center gap-1">
        <li>
          <Link href="/" className="hover:text-white transition-colors">首頁</Link>
        </li>
        <li className="text-zinc-600">/</li>
        <li>
          <Link href="/tutorial" className="hover:text-white transition-colors">入門教學</Link>
        </li>
        <li className="text-zinc-600">/</li>
        <li className="text-zinc-200">{current.title}</li>
      </ol>
    </nav>
  );
}
