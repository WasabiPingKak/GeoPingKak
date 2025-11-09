"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const countryTabs = [
  { code: "印尼 (id)", href: "/quick-reference/id" },
  { code: "巴西 (br)", href: "/quick-reference/br" },
];

export default function QuickReferenceTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-3 mb-6">
      {countryTabs.map((tab) => (
        <Link
          key={tab.code}
          href={tab.href}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium border",
            pathname === tab.href
              ? "bg-green-800 text-green-100 border-green-500"
              : "bg-zinc-800 text-zinc-300 border-zinc-600 hover:bg-zinc-700"
          )}
        >
          {tab.code.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
