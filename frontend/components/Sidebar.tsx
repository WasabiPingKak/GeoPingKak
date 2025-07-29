// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/daily-challenge", label: "每日挑戰" },
  { href: "/tutorial", label: "教學" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-zinc-800 border-r border-zinc-700 p-4 min-h-screen">
      <h1 className="text-xl font-bold mb-6">GeoPingKak</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
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
        ))}
      </nav>
    </aside>
  );
}
