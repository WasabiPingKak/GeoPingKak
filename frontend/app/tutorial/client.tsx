"use client";

import Link from "next/link";
import { TUTORIAL_SECTIONS } from "@/components/tutorial/tutorialSections";

export default function TutorialLandingClient() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">入門教學</h1>
      <p className="text-muted-foreground mb-8">
        GeoGuessr 是一款結合觀察與推理的地理解謎遊戲，但多數教學僅著重在國家的細節辨識。<br />
        初學者需要先學會從一些通用的地理觀念切入，快速縮小範圍。<br />
        本教學將從「如何觀察世界」的角度出發，由六個基本原則出發，建立你的推理邏輯，而不是只靠死背。
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {TUTORIAL_SECTIONS.map((section, index) => (
          <Link
            key={section.slug}
            href={`/tutorial/${section.slug}`}
            className="block p-5 rounded-xl border border-zinc-700 bg-zinc-800/50 hover:border-blue-500/50 hover:bg-zinc-800 transition-all group"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl font-bold text-zinc-600 group-hover:text-blue-500 transition-colors">
                {index + 1}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {section.title}
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  {section.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
