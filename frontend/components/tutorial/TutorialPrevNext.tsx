"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TUTORIAL_SECTIONS } from "./tutorialSections";

export default function TutorialPrevNext() {
  const pathname = usePathname();
  const currentSlug = pathname.replace("/tutorial/", "");
  const currentIndex = TUTORIAL_SECTIONS.findIndex((s) => s.slug === currentSlug);

  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? TUTORIAL_SECTIONS[currentIndex - 1] : null;
  const next = currentIndex < TUTORIAL_SECTIONS.length - 1 ? TUTORIAL_SECTIONS[currentIndex + 1] : null;

  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t border-zinc-700">
      {prev ? (
        <Link
          href={`/tutorial/${prev.slug}`}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <span>←</span>
          <span>上一章：{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/tutorial/${next.slug}`}
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <span>下一章：{next.title}</span>
          <span>→</span>
        </Link>
      ) : (
        <Link
          href="/tutorial"
          className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <span>回到教學總覽</span>
          <span>→</span>
        </Link>
      )}
    </div>
  );
}
