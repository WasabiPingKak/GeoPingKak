import React from "react";

// 電桿牌與分區位置的示意圖（Server Component，純 SVG）。範例取自實拍的電桿牌：B7658 DA14

const TAG_BLUE = "#1d4ed8";
const ACCENT = "#facc15";
const ARROW = "#3f3f46";
// 跟互動地圖同色：陸地底色、分區紅框、細格藍線
const LAND = "#f5f3f0";
const ZONE_RED = "#dc2626";
const CELL = "#2563eb";

/** 藍色電桿牌，標出最下面兩行是座標 */
function PoleTag() {
  const lines = [
    { text: "工館幹", y: 58, size: 17 },
    { text: "121", y: 100, size: 30 },
    { text: "R31", y: 138, size: 22 },
    { text: "B7658", y: 178, size: 24 },
    { text: "DA14", y: 214, size: 24 },
  ];
  return (
    <svg viewBox="0 0 230 260" className="h-auto w-full max-w-[230px]" role="img" aria-label="電線桿牌子示意圖，最下面兩行 B7658、DA14 是座標">
      {/* 綁牌子的鐵線 */}
      <line x1="0" y1="30" x2="230" y2="26" stroke="#71717a" strokeWidth="2" />
      <rect x="20" y="20" width="110" height="220" rx="10" fill={TAG_BLUE} stroke="#93c5fd" strokeWidth="2" />
      {lines.map((l) => (
        <text
          key={l.text}
          x="75"
          y={l.y}
          textAnchor="middle"
          fontSize={l.size}
          fontWeight="700"
          fill="#ffffff"
          fontFamily="Arial, 'Noto Sans TC', sans-serif"
        >
          {l.text}
        </text>
      ))}
      {/* 座標那兩行 */}
      <rect x="28" y="154" width="94" height="70" rx="6" fill="none" stroke={ACCENT} strokeWidth="3" />
      <path d="M 130 189 L 150 189" stroke={ACCENT} strokeWidth="3" />
      <text x="156" y="184" fontSize="18" fontWeight="700" fill={ACCENT}>
        座標
      </text>
      <text x="156" y="206" fontSize="13" fill="#d4d4d8">
        看這兩行
      </text>
    </svg>
  );
}

/** 分區框：B7658 就是 B 區往右 76%、往上 58%。配色跟互動地圖一致 */
function ZonePosition() {
  // 分區東西 80 km、南北 50 km，框也照 1.6 : 1
  const x0 = 24;
  const y0 = 20;
  const w = 352;
  const h = 220;
  const right = 0.76;
  const up = 0.58;
  const px = x0 + w * right;
  const py = y0 + h * (1 - up);
  // 每 10% 一條淡格線，跟地圖放大後的粗格線一樣
  const ticks = Array.from({ length: 9 }, (_, i) => (i + 1) / 10);
  return (
    <svg
      viewBox="0 0 400 260"
      className="h-auto w-full max-w-[420px]"
      role="img"
      aria-label="分區示意圖，B7658 是 B 區往右 76%、往上 58% 的位置"
    >
      <defs>
        <marker
          id="taipower-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={ARROW} />
        </marker>
      </defs>
      <rect x={x0} y={y0} width={w} height={h} fill={LAND} />
      {ticks.map((t) => (
        <React.Fragment key={t}>
          <line x1={x0 + w * t} y1={y0} x2={x0 + w * t} y2={y0 + h} stroke={CELL} strokeOpacity="0.35" />
          <line x1={x0} y1={y0 + h * t} x2={x0 + w} y2={y0 + h * t} stroke={CELL} strokeOpacity="0.35" />
        </React.Fragment>
      ))}
      <rect
        x={x0}
        y={y0}
        width={w}
        height={h}
        fill="none"
        stroke={ZONE_RED}
        strokeWidth="3"
        strokeDasharray="6 5"
      />
      <text
        x={x0 + 40}
        y={y0 + 46}
        textAnchor="middle"
        fontSize="36"
        fontWeight="800"
        fill={ZONE_RED}
        stroke="#ffffff"
        strokeWidth="5"
        paintOrder="stroke"
        fontFamily="Arial, sans-serif"
      >
        B
      </text>
      <line x1={x0} y1={py} x2={px - 9} y2={py} stroke={ARROW} strokeWidth="2.5" markerEnd="url(#taipower-arrow)" />
      <line x1={px} y1={y0 + h} x2={px} y2={py + 9} stroke={ARROW} strokeWidth="2.5" markerEnd="url(#taipower-arrow)" />
      <rect x={px - 7} y={py - 7} width="14" height="14" fill={ACCENT} fillOpacity="0.6" stroke={ACCENT} strokeWidth="2" />
      <text
        x={(x0 + px) / 2}
        y={py - 12}
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#18181b"
        fontFamily="Arial, sans-serif"
      >
        76%
      </text>
      <text
        x={px - 12}
        y={py + (y0 + h - py) / 2 + 8}
        textAnchor="end"
        fontSize="22"
        fontWeight="700"
        fill="#18181b"
        fontFamily="Arial, sans-serif"
      >
        58%
      </text>
    </svg>
  );
}

/**
 * 細碼 DA14：四位數字指到的那一格，東西切 8 段（A～H）、南北由下往上切 5 段（A～E），
 * DA 是往右第 4 段、最下面一段。那一小格再各切 10 份，14 是往右 1、往上 4
 */
function FinePosition() {
  const s = 32; // 大格裡一小段的邊長
  const gx = 36;
  const gy = 34;
  const cols = "ABCDEFGH";
  const rows = "ABCDE";
  const col = cols.indexOf("D");
  const row = rows.indexOf("A");
  const hx = gx + col * s;
  const hy = gy + (rows.length - 1 - row) * s;
  // 右邊放大的那一小格，切成 10 × 10
  const ix = 340;
  const iy = 40;
  const is = 130;
  const t = is / 10;
  const fx = 1;
  const fy = 4;
  const label = { fontFamily: "Arial, sans-serif", fontWeight: 700, fill: "#18181b" } as const;
  return (
    <svg
      viewBox="0 0 490 240"
      className="h-auto w-full max-w-[490px]"
      role="img"
      aria-label="細碼示意圖，DA 是格子裡往右第 4 段、最下面一段，14 是這一小段裡往右 1、往上 4"
    >
      <rect x="0" y="0" width="490" height="240" rx="8" fill={LAND} />
      {/* 大格：8 × 5 */}
      {Array.from({ length: cols.length + 1 }, (_, i) => (
        <line key={`c${i}`} x1={gx + i * s} y1={gy} x2={gx + i * s} y2={gy + rows.length * s} stroke={CELL} strokeOpacity="0.5" />
      ))}
      {Array.from({ length: rows.length + 1 }, (_, i) => (
        <line key={`r${i}`} x1={gx} y1={gy + i * s} x2={gx + cols.length * s} y2={gy + i * s} stroke={CELL} strokeOpacity="0.5" />
      ))}
      <rect x={gx} y={gy} width={cols.length * s} height={rows.length * s} fill="none" stroke={CELL} strokeWidth="2" />
      <rect x={hx} y={hy} width={s} height={s} fill={ACCENT} fillOpacity="0.7" stroke="#ca8a04" strokeWidth="2" />
      {[...cols].map((c, i) => (
        <text key={c} x={gx + i * s + s / 2} y={gy + rows.length * s + 20} textAnchor="middle" fontSize="15" {...label} fill={i === col ? "#b45309" : "#52525b"}>
          {c}
        </text>
      ))}
      {[...rows].map((r, i) => (
        <text key={r} x={gx - 12} y={gy + (rows.length - 1 - i) * s + s / 2 + 5} textAnchor="middle" fontSize="15" {...label} fill={i === row ? "#b45309" : "#52525b"}>
          {r}
        </text>
      ))}
      <text x={gx + (cols.length * s) / 2} y={gy - 12} textAnchor="middle" fontSize="16" {...label}>
        DA
      </text>
      {/* 放大線 */}
      <line x1={hx + s} y1={hy} x2={ix} y2={iy} stroke="#71717a" strokeDasharray="4 3" />
      <line x1={hx + s} y1={hy + s} x2={ix} y2={iy + is} stroke="#71717a" strokeDasharray="4 3" />
      {/* 放大的小格：10 × 10 */}
      <rect x={ix} y={iy} width={is} height={is} fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" />
      {Array.from({ length: 9 }, (_, i) => (
        <React.Fragment key={i}>
          <line x1={ix + (i + 1) * t} y1={iy} x2={ix + (i + 1) * t} y2={iy + is} stroke="#ca8a04" strokeOpacity="0.35" />
          <line x1={ix} y1={iy + (i + 1) * t} x2={ix + is} y2={iy + (i + 1) * t} stroke="#ca8a04" strokeOpacity="0.35" />
        </React.Fragment>
      ))}
      <rect x={ix + fx * t} y={iy + is - (fy + 1) * t} width={t} height={t} fill={ARROW} />
      <text x={ix + fx * t + t / 2} y={iy + is + 20} textAnchor="middle" fontSize="15" {...label}>
        1
      </text>
      <text x={ix - 10} y={iy + is - fy * t - t / 2 + 5} textAnchor="middle" fontSize="15" {...label}>
        4
      </text>
      <text x={ix + is / 2} y={iy - 12} textAnchor="middle" fontSize="16" {...label}>
        14
      </text>
    </svg>
  );
}

export default function TaipowerCodeDiagram() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
      <PoleTag />
      <ZonePosition />
      <FinePosition />
    </div>
  );
}
