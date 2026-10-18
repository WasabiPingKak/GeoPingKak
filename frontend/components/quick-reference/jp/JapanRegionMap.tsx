import React from "react";
import clsx from "clsx";
import {
  JP_CITIES,
  JP_MAP_SIZE,
  JP_OKINAWA_INSET,
  JP_PREFECTURES,
  JP_REGIONS,
} from "./jpRegionMapData";
import { MAP_INK as INK, codeColor, regionFill, regionInk } from "./jpMapColors";

const SUB_INK = "oklch(0.45 0.01 240)";
const REGION_BY_KEY = new Map(JP_REGIONS.map((r) => [r.key, r]));

// 原設計稿輸出的完整解析度圖檔，給想存起來看的人下載
const FULL_PNG = {
  href: "/quick-reference/jp/japan-regions-area-codes.png",
  filename: "日本地方區分與電話區碼.png",
  size: "3200×3800",
};

// 字型只向 Google Fonts 要地圖上用到的字，檔案很小
const FONT_TEXT = Array.from(
  new Set([...JP_REGIONS.map((r) => r.name), "日本地方區分", "0123456789/–"].join("")),
).join("");
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900" +
  `&family=Roboto+Condensed:wght@800&text=${encodeURIComponent(FONT_TEXT)}&display=swap`;
const SERIF = '"Noto Serif TC", "Noto Serif CJK TC", "PMingLiU", serif';
const CONDENSED = '"Roboto Condensed", "Arial Narrow", sans-serif';

// 字級（SVG 單位）。地圖寬 1600，桌機上約縮成 0.6～0.7 倍
const NAME_SIZE = 20;
const CODE_SIZE = 25;

function CodeText({ code, ...props }: { code: string } & React.SVGProps<SVGTextElement>) {
  return (
    <text fontFamily={CONDENSED} fontWeight={800} fontSize={CODE_SIZE} {...props}>
      {code.split(/(\/)/).map((part, i) => (
        <tspan key={i} fill={part === "/" ? INK : codeColor(part)}>
          {part}
        </tspan>
      ))}
    </text>
  );
}

/** 日本九大地方、都道府縣與市外電話區碼地圖 */
export default function JapanRegionMap() {
  return (
    <div>
      <link rel="stylesheet" href={FONT_HREF} precedence="default" />

      <div
        // 地圖撐滿主內容區，不受頁面 max-w-4xl 限制。
        // 手機：外面三層各有 16px 左右內距（RootShell、速查筆記 layout、頁面），用負邊距抵掉，貼齊螢幕。
        // 桌機：主內容區寬度是 100vw 扣掉側欄 15rem 與 main 左右內距各 1.5rem，置中撐開。
        // 有傳統捲軸時 100vw 會多算捲軸寬度，平均分到兩側只吃掉一點 main 的內距，不會出現水平捲軸
        className={clsx(
          "-mx-12 overflow-hidden border-y border-zinc-700",
          "md:relative md:left-1/2 md:mx-0 md:w-[calc(100vw-18rem)] md:-translate-x-1/2",
          "md:rounded-lg md:border-x",
        )}
        style={{ background: "oklch(0.985 0.004 230)" }}
      >
        <svg
          viewBox={`0 0 ${JP_MAP_SIZE.width} ${JP_MAP_SIZE.height}`}
          className="block h-auto w-full"
          role="img"
          aria-label="日本九大地方、47 都道府縣與市外電話區碼地圖"
          fontFamily="system-ui, sans-serif"
        >
          {/* 標題 */}
          <g transform="translate(80 120)">
            <text fontFamily={SERIF} fontWeight={900} fontSize={84} fill={INK}>
              日本地方區分
            </text>
            <text y={62} fontSize={30} fontWeight={500} fill={SUB_INK} letterSpacing="0.08em">
              各地方・都道府縣・市外電話區碼
            </text>
          </g>

          {/* 免付費電話說明 */}
          <g transform="translate(80 290)">
            <rect
              y={-38}
              width={560}
              height={104}
              rx={8}
              fill="none"
              stroke={INK}
              strokeOpacity={0.3}
            />
            <text x={24} fontSize={24} fill={INK}>
              <tspan fontFamily={CONDENSED} fontWeight={800} fontSize={28}>
                0120 / 0800
              </tspan>
              <tspan fontWeight={700}>　免付費電話</tspan>
            </text>
            <text x={24} y={42} fontSize={20} fill="oklch(0.42 0.01 240)">
              非地區區碼，全日本通用（通話費由受話方負擔）
            </text>
          </g>

          {/* 各縣形狀 */}
          <g stroke="#fff" strokeWidth={1.6} strokeLinejoin="round">
            {JP_PREFECTURES.map((p) => (
              <path key={p.id} d={p.d} fill={regionFill(REGION_BY_KEY.get(p.region)!.hue)}>
                <title>{`${p.name} ${p.code}`}</title>
              </path>
            ))}
          </g>

          {/* 各縣標籤 */}
          <g pointerEvents="none">
            {JP_PREFECTURES.map((p) => {
              const { x, y, anchor, compact } = p.label;
              if (compact) {
                return (
                  <text key={p.id} x={x} y={y + 6} textAnchor={anchor}>
                    <tspan fontSize={NAME_SIZE - 2} fontWeight={500} fill={INK}>
                      {p.name}
                    </tspan>
                    <tspan
                      dx={4}
                      fontFamily={CONDENSED}
                      fontWeight={800}
                      fontSize={CODE_SIZE - 3}
                      fill={codeColor(p.code)}
                    >
                      {p.code}
                    </tspan>
                  </text>
                );
              }
              return (
                <g key={p.id}>
                  {p.callout && (
                    <>
                      <line
                        x1={p.callout.from[0]}
                        y1={p.callout.from[1]}
                        x2={p.callout.to[0]}
                        y2={p.callout.to[1]}
                        stroke={INK}
                        strokeWidth={1.2}
                        opacity={0.55}
                      />
                      <circle cx={p.callout.from[0]} cy={p.callout.from[1]} r={3} fill={INK} />
                    </>
                  )}
                  <text
                    x={x}
                    y={y - 5}
                    textAnchor={anchor}
                    fontSize={NAME_SIZE}
                    fontWeight={500}
                    fill={INK}
                  >
                    {p.name}
                  </text>
                  <CodeText code={p.code} x={x} y={y + 21} textAnchor={anchor} />
                </g>
              );
            })}

            {/* 北海道的城市 */}
            {JP_CITIES.map((c) => (
              <g key={c.name}>
                <circle cx={c.x} cy={c.y} r={5} fill="#fff" stroke={INK} strokeWidth={2} />
                <text x={c.x + 11} y={c.y + 7}>
                  <tspan fontSize={NAME_SIZE} fontWeight={500} fill={INK}>
                    {c.name}
                  </tspan>
                  <tspan
                    dx={5}
                    fontFamily={CONDENSED}
                    fontWeight={800}
                    fontSize={CODE_SIZE}
                    fill={codeColor(c.code)}
                  >
                    {c.code}
                  </tspan>
                </text>
              </g>
            ))}
          </g>

          {/* 地方名稱 */}
          {JP_REGIONS.filter((r) => r.label).map((r) => (
            <g
              key={r.key}
              transform={`translate(${r.label!.x} ${r.label!.y})`}
              textAnchor="middle"
              fill={regionInk(r.hue)}
            >
              <text fontFamily={SERIF} fontWeight={900} fontSize={44}>
                {r.name}
              </text>
              <text y={36} fontSize={24} fontWeight={500} letterSpacing="0.18em">
                {r.en}
              </text>
            </g>
          ))}

          <OkinawaInset />

          <text x={80} y={1862} fontSize={18} fill="oklch(0.5 0.01 240)">
            ＊區碼為該縣主要市外局號開頭，部分地區另有細分。
          </text>
          <text
            x={1540}
            y={1880}
            textAnchor="end"
            fontSize={20}
            fontWeight={500}
            letterSpacing="0.04em"
            fill="oklch(0.5 0.01 240)"
          >
            @wasibi_pingkak
          </text>
        </svg>
      </div>

      <div className="mt-2 text-right">
        <a
          href={FULL_PNG.href}
          download={FULL_PNG.filename}
          className="text-sm text-green-400 underline underline-offset-2 hover:text-green-300"
        >
          下載完整地圖圖檔（PNG，{FULL_PNG.size}）
        </a>
      </div>
    </div>
  );
}

function OkinawaInset() {
  const { x, y, w, h, d, name, code } = JP_OKINAWA_INSET;
  const r = REGION_BY_KEY.get("ryukyu")!;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={w}
        height={h}
        fill="none"
        stroke={INK}
        strokeOpacity={0.35}
        strokeDasharray="4 4"
      />
      <path d={d} fill={regionFill(r.hue)} stroke="#fff" strokeWidth={1.2}>
        <title>{`${name} ${code}`}</title>
      </path>
      <g transform={`translate(185 ${h / 2 - 34})`}>
        <text fontFamily={SERIF} fontWeight={900} fontSize={38} fill={regionInk(r.hue)}>
          {r.name}
        </text>
        <text y={32} fontSize={22} letterSpacing="0.18em" fill={regionInk(r.hue)}>
          {r.en}
        </text>
        <text y={80} fontSize={NAME_SIZE} fontWeight={500} fill={INK}>
          {name}
        </text>
        <CodeText code={code} y={106} />
      </g>
    </g>
  );
}
