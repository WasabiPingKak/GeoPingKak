"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/daily-challenge", label: "每日挑戰" },
  { href: "/special-maps", label: "特殊主題地圖(籌備中)" },
  { divider: true },
  { href: "/tutorial", label: "教學(籌備中)" },
  { href: "/source", label: "其它學習資源(籌備中)" },
  { divider: true },
  { href: "/show-proposals", label: "節目企劃與建議(籌備中)" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-zinc-800 border-r border-zinc-700 p-4 min-h-screen">
      <h1 className="text-xl font-bold mb-6">GeoPingKak</h1>
      <nav className="space-y-2">
        {navItems.map((item, index) =>
          "divider" in item ? (
            <hr key={`divider-${index}`} className="border-zinc-600 my-4" />
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition ${pathname === item.href
                ? "bg-zinc-700 font-semibold"
                : "hover:bg-zinc-700"
                }`}
            >
              {item.label}
            </Link>
          )
        )}
      </nav>
    </aside>
  );
}
