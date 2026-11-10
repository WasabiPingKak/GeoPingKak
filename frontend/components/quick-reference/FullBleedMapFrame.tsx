import React from "react";
import clsx from "clsx";

/** 速查筆記的大地圖外框：撐滿主內容區，不受頁面 max-w-4xl 限制 */
export default function FullBleedMapFrame({
  background,
  children,
}: {
  background: string;
  children: React.ReactNode;
}) {
  return (
    <div
      // 手機：外面三層各有 16px 左右內距（RootShell、速查筆記 layout、頁面），用負邊距抵掉，貼齊螢幕。
      // 桌機：主內容區寬度是 100vw 扣掉側欄 15rem 與 main 左右內距各 1.5rem，置中撐開。
      // 有傳統捲軸時 100vw 會多算捲軸寬度，平均分到兩側只吃掉一點 main 的內距，不會出現水平捲軸
      className={clsx(
        "-mx-12 overflow-hidden border-y border-zinc-700",
        "md:relative md:left-1/2 md:mx-0 md:w-[calc(100vw-18rem)] md:-translate-x-1/2",
        "md:rounded-lg md:border-x",
      )}
      style={{ background }}
    >
      {children}
    </div>
  );
}
