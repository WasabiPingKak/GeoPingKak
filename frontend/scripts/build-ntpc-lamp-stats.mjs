// 從新北市路燈開放資料 CSV 統計各區的燈桿編號，輸出 scripts/data/ntpc-lamp-stats.json。
//
// 原始 CSV 約 32 MB、28 萬筆，不放進 repo。資料來源：新北市政府資料開放平臺「新北市路燈資料」
// https://data.ntpc.gov.tw/datasets/39149fe0-85ab-4e6c-99e5-60657d44895f
// 欄位：town, seqno, address, power, x, y, countycode, height, longitude, latitude
//
// 用法（在 frontend/ 底下）：node scripts/build-ntpc-lamp-stats.mjs <CSV 路徑>
// 之後再跑 node scripts/generate-ntpc-lamp-map.mjs 產生地圖資料。

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(here, "data", "ntpc-lamp-stats.json");

const csvPath = process.argv[2];
if (!csvPath) {
  console.error("用法：node scripts/build-ntpc-lamp-stats.mjs <CSV 路徑>");
  process.exit(1);
}

// 簡單的 CSV 解析，支援雙引號包住的欄位（地址裡可能有逗號）
function parseLine(line) {
  const out = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') {
        quoted = false;
      } else {
        cur += c;
      }
    } else if (c === '"') {
      quoted = true;
    } else if (c === ",") {
      out.push(cur);
      cur = "";
    } else {
      cur += c;
    }
  }
  out.push(cur);
  return out;
}

const text = readFileSync(csvPath, "utf8").replace(/^﻿/, "");
const lines = text.split(/\r?\n/).filter((l) => l.length);
const header = parseLine(lines[0]);
const col = (name) => {
  const i = header.indexOf(name);
  if (i < 0) throw new Error(`CSV 缺少欄位 ${name}`);
  return i;
};
const TOWN = col("town");
const SEQ = col("seqno");

const bump = (obj, key) => (obj[key] = (obj[key] ?? 0) + 1);

// towns：各區的總數、各第一碼數量、6 位數編號的前兩碼數量
const towns = {};
const digits = {};
const lengths = {};
let total = 0;
for (const line of lines.slice(1)) {
  const r = parseLine(line);
  const town = r[TOWN];
  const seq = r[SEQ];
  if (!town || !/^\d+$/.test(seq)) continue;
  total++;
  const t = (towns[town] ??= { total: 0, digits: {}, prefixes: {} });
  t.total++;
  bump(t.digits, seq[0]);
  bump(digits, seq[0]);
  bump(lengths, seq.length);
  if (seq.length === 6) bump(t.prefixes, seq.slice(0, 2));
}

// key 排序讓輸出穩定，重跑時 diff 好讀
const sortKeys = (o) =>
  Object.fromEntries(Object.keys(o).sort().map((k) => [k, o[k]]));
const sortedTowns = Object.fromEntries(
  Object.keys(towns)
    .sort()
    .map((k) => [
      k,
      { ...towns[k], digits: sortKeys(towns[k].digits), prefixes: sortKeys(towns[k].prefixes) },
    ]),
);

const stats = {
  source: "https://data.ntpc.gov.tw/datasets/39149fe0-85ab-4e6c-99e5-60657d44895f",
  total,
  digits: sortKeys(digits),
  lengths: sortKeys(lengths),
  towns: sortedTowns,
};
writeFileSync(OUT_PATH, `${JSON.stringify(stats, null, 2)}\n`, "utf8");
console.log(`共 ${total} 筆，${Object.keys(towns).length} 個 town 值，寫入 ${OUT_PATH}`);
