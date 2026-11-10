import React from "react";
import FullBleedMapFrame from "../FullBleedMapFrame";
import {
  NTPC_BORDERS,
  NTPC_DISTRICTS,
  NTPC_MAP_SIZE,
  NTPC_NEIGHBORS,
  NTPC_ZONES,
} from "./ntpcLampMapData";
import {
  MAP_INK as INK,
  MAP_PAPER,
  NEIGHBOR_FILL,
  NEIGHBOR_INK,
  digitFill,
  digitInk,
} from "./ntpcMapColors";

const TITLE = "新北市路燈編號";

// 字型只向 Google Fonts 要地圖上用到的字，檔案很小
const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@900" +
  `&family=Roboto+Condensed:wght@800&text=${encodeURIComponent(`${TITLE}0123456789–、`)}` +
  "&display=swap";
const SERIF = '"Noto Serif TC", "Noto Serif CJK TC", "PMingLiU", serif';
const CONDENSED = '"Roboto Condensed", "Arial Narrow", sans-serif';

// 字級（SVG 單位）。地圖寬 1600，桌機上約縮成 0.6～0.7 倍
const NAME_SIZE = 20;
const CODE_SIZE = 26;
const DIGIT_SIZE = 150;

const shortName = (name: string) => name.replace(/區$/, "");

/** 新北市各區路燈編號第一碼與前兩碼地圖 */
export default function NtpcLampMap() {
  return (
    <div>
      <link rel="stylesheet" href={FONT_HREF} precedence="default" />

      <FullBleedMapFrame background={MAP_PAPER}>
        <svg
          viewBox={`0 0 ${NTPC_MAP_SIZE.width} ${NTPC_MAP_SIZE.height}`}
          className="block h-auto w-full"
          role="img"
          aria-label="新北市 29 區路燈編號第一碼與前兩碼對照地圖"
          fontFamily="system-ui, sans-serif"
        >
          {/* 周邊縣市 */}
          <g fill={NEIGHBOR_FILL} stroke="#fff" strokeWidth={1.6}>
            {NTPC_NEIGHBORS.map((n) => (
              <path key={n.name} d={n.d} />
            ))}
          </g>

          {/* 各區底色 */}
          <g>
            {NTPC_DISTRICTS.map((t) => (
              <path key={t.name} d={t.d} fill={digitFill(t.digit)}>
                <title>{`${t.name} ${t.prefixes.join("、")}`}</title>
              </path>
            ))}
          </g>

          {/* 邊界：同一碼的區之間細線，不同碼之間粗線 */}
          <g fill="none" stroke="#fff" strokeLinejoin="round" strokeLinecap="round">
            <path d={NTPC_BORDERS.town} strokeWidth={1.4} strokeDasharray="5 4" />
            <path d={NTPC_BORDERS.zone} strokeWidth={4} />
          </g>

          {/* 第一碼大字 */}
          <g
            fontFamily={CONDENSED}
            fontWeight={800}
            fontSize={DIGIT_SIZE}
            textAnchor="middle"
            dominantBaseline="central"
            pointerEvents="none"
          >
            {NTPC_ZONES.map((z) => (
              <text key={z.digit} x={z.label.x} y={z.label.y} fill={digitInk(z.digit)} opacity={0.3}>
                {z.digit}
              </text>
            ))}
          </g>

          {/* 周邊縣市名稱 */}
          <g fontSize={24} fontWeight={700} fill={NEIGHBOR_INK} textAnchor="middle">
            {NTPC_NEIGHBORS.map((n) => (
              <text key={n.name} x={n.label.x} y={n.label.y}>
                {n.name}
              </text>
            ))}
          </g>

          {/* 各區標籤：區名＋前兩碼 */}
          <g pointerEvents="none">
            {NTPC_DISTRICTS.map((t) => {
              const { x, y, anchor } = t.label;
              return (
                <g key={t.name}>
                  {t.callout && (
                    <>
                      <line
                        x1={t.callout.from[0]}
                        y1={t.callout.from[1]}
                        x2={t.callout.to[0]}
                        y2={t.callout.to[1]}
                        stroke={INK}
                        strokeWidth={1.2}
                        opacity={0.55}
                      />
                      <circle cx={t.callout.from[0]} cy={t.callout.from[1]} r={3} fill={INK} />
                    </>
                  )}
                  <text
                    x={x}
                    y={y - 6}
                    textAnchor={anchor}
                    fontSize={NAME_SIZE}
                    fontWeight={500}
                    fill={INK}
                  >
                    {shortName(t.name)}
                  </text>
                  <text
                    x={x}
                    y={y + 20}
                    textAnchor={anchor}
                    fontFamily={CONDENSED}
                    fontWeight={800}
                    fontSize={CODE_SIZE}
                    fill={digitInk(t.digit)}
                  >
                    {t.prefixes.join("、")}
                  </text>
                </g>
              );
            })}
          </g>

          {/* 標題 */}
          <g transform="translate(70 110)">
            <text fontFamily={SERIF} fontWeight={900} fontSize={72} fill={INK}>
              {TITLE}
            </text>
            <text y={52} fontSize={26} fontWeight={500} fill="oklch(0.45 0.01 240)">
              大字為第一碼，各區標示前兩碼
            </text>
          </g>

          <text
            x={NTPC_MAP_SIZE.width - 50}
            y={NTPC_MAP_SIZE.height - 30}
            textAnchor="end"
            fontSize={20}
            fontWeight={500}
            letterSpacing="0.04em"
            fill="oklch(0.5 0.01 240)"
          >
            @wasabi_pingkak
          </text>
        </svg>
      </FullBleedMapFrame>
    </div>
  );
}
