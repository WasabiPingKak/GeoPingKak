"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const navItems = [
  { href: "/", label: "首頁" },
  { href: "/daily-challenge", label: "每日題目" },
  { href: "/special-maps", label: "特殊主題地圖" },
  { divider: true },
  { href: "/recommend_settings", label: "推薦設定" },
  { href: "/tutorial", label: "入門教學" },
  { href: "/community-maps", label: "社群地圖推薦" },
  { href: "/source", label: "進階學習資源" },
  { divider: true },
  { href: "/show-proposals", label: "直播企劃提案" },
  { href: "/qna", label: "Q&A" },
  { href: "/about", label: "關於我" },
];

type SidebarMenuProps = {
  isMobile?: boolean;
  onClickLink?: () => void;
};

export default function SidebarMenu({ isMobile = false, onClickLink }: SidebarMenuProps) {
  const pathname = usePathname();

  return (
    <aside
      className={clsx(
        isMobile
          ? "w-full h-full p-4"
          : "w-60 min-h-screen p-4 border-r border-zinc-700",
        "bg-zinc-800 text-white flex flex-col justify-between"
      )}
    >
      {/* 上方導覽 */}
      <div>
        <h1 className="text-xl font-bold mb-6">GeoPingKak</h1>
        <nav className="space-y-2">
          {navItems.map((item, index) =>
            "divider" in item ? (
              <hr key={`divider-${index}`} className="border-zinc-600 my-4" />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClickLink}
                className={clsx(
                  "block px-4 py-2 rounded-lg transition",
                  {
                    "bg-zinc-700 font-semibold": pathname === item.href,
                    "hover:bg-zinc-700": pathname !== item.href,
                    "bg-green-900/80 border border-green-700 text-green-300 hover:bg-green-800/80": item.href === '/daily-challenge',
                  }
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* 下方版權區 */}
      <div className="mt-8 text-sm text-zinc-400 text-center">
        © Wasabi PingKak
      </div>
    </aside>
  );
}