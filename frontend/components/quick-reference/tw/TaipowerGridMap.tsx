"use client";

import React, { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import type * as MapLibre from "maplibre-gl";
import type { Feature, FeatureCollection, LineString, Point, Polygon, Position } from "geojson";
import {
  CELL_HEIGHT,
  CELL_WIDTH,
  TAIPOWER_ZONES,
  type CentralMeridian,
  type TaipowerZone,
  ZONE_HEIGHT,
  ZONE_WIDTH,
  PENGHU_EAST_LON,
  findZone,
  lonLatToTaipower,
  lonLatToTwd67,
  twd67ToLonLat,
} from "./taipowerGrid";
import { BASE_STYLE_URL, toGoogleLikeStyle } from "./googleLikeStyle";

// 開場要看到的範圍：所有分區框（含澎湖、蘭嶼）的外框，由分區四角算出來
const TAIWAN_BOUNDS: MapLibre.LngLatBoundsLike = (() => {
  let west = Infinity;
  let south = Infinity;
  let east = -Infinity;
  let north = -Infinity;
  for (const { x0, y0, lon0 } of Object.values(TAIPOWER_ZONES)) {
    // 框邊在經緯度上微彎，邊的中點也算進來
    for (const fx of [0, 0.5, 1]) {
      for (const fy of [0, 0.5, 1]) {
        const [lon, lat] = twd67ToLonLat(x0 + ZONE_WIDTH * fx, y0 + ZONE_HEIGHT * fy, lon0);
        west = Math.min(west, lon);
        east = Math.max(east, lon);
        south = Math.min(south, lat);
        north = Math.max(north, lat);
      }
    }
  }
  return [
    [west, south],
    [east, north],
  ];
})();

// 放大到這個層級才畫 800 m × 500 m 的細格
const CELL_GRID_ZOOM = 11;
// 放大到這個層級才顯示細碼（BE08 那段）
const FINE_CODE_ZOOM = 13;
// 放大到這個層級，澎湖附近就只畫澎湖的分區框線（本島的收起來），本島附近反之
const OVERLAP_HIDE_ZOOM = 8.5;

const ZONE_COLOR = "#dc2626";
// 澎湖的 X、Y 跟本島 J、M 範圍重疊，換個顏色區分
const PENGHU_ZONE_COLOR = "#ea580c";
const CELL_COLOR = "#2563eb";
const HIGHLIGHT_COLOR = "#facc15";

const toLngLat = (x: number, y: number, lon0: CentralMeridian): Position =>
  twd67ToLonLat(x, y, lon0);

/** TWD67 線段 → 經緯度折線，多取幾個點讓長邊貼合投影 */
const segment = (
  ax: number,
  ay: number,
  bx: number,
  by: number,
  lon0: CentralMeridian,
  steps: number,
): Position[] =>
  Array.from({ length: steps + 1 }, (_, i) =>
    toLngLat(ax + ((bx - ax) * i) / steps, ay + ((by - ay) * i) / steps, lon0),
  );

const line = (coordinates: Position[], properties: Record<string, unknown>): Feature<LineString> => ({
  type: "Feature",
  geometry: { type: "LineString", coordinates },
  properties,
});

/**
 * 澎湖與本島的網格範圍重疊。以 PENGHU_EAST_LON 為界，線條落在「別人地盤」的部分
 * （本島網格在界線以西、澎湖網格在界線以東）切出來，放大後就不畫
 */
function splitByOwner(coords: Position[], lon0: CentralMeridian) {
  const isOwn = (p: Position) => (lon0 === 119 ? p[0] < PENGHU_EAST_LON : p[0] >= PENGHU_EAST_LON);
  const own: Position[][] = [];
  const other: Position[][] = [];
  let current: Position[] = [coords[0]];
  let currentOwn = isOwn(coords[0]);
  for (let i = 1; i < coords.length; i++) {
    const a = coords[i - 1];
    const b = coords[i];
    if (isOwn(b) !== currentOwn) {
      const t = (PENGHU_EAST_LON - a[0]) / (b[0] - a[0]);
      const cut: Position = [PENGHU_EAST_LON, a[1] + (b[1] - a[1]) * t];
      current.push(cut);
      (currentOwn ? own : other).push(current);
      current = [cut];
      currentOwn = !currentOwn;
    }
    current.push(b);
  }
  (currentOwn ? own : other).push(current);
  return { own, other };
}

/**
 * 分區框線拆成不重複的邊。相鄰分區共用的邊只畫一次，虛線才不會疊成實線。
 * 疊到另一套網格的部分標上 overlap，只在縮小看全島時畫
 */
function zoneEdges(): FeatureCollection<LineString> {
  const seen = new Set<string>();
  const features: Feature<LineString>[] = [];
  for (const { x0, y0, lon0 } of Object.values(TAIPOWER_ZONES)) {
    const x1 = x0 + ZONE_WIDTH;
    const y1 = y0 + ZONE_HEIGHT;
    for (const [ax, ay, bx, by] of [
      [x0, y0, x1, y0],
      [x0, y1, x1, y1],
      [x0, y0, x0, y1],
      [x1, y0, x1, y1],
    ]) {
      const key = `${lon0}:${ax},${ay},${bx},${by}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const { own, other } = splitByOwner(segment(ax, ay, bx, by, lon0, 16), lon0);
      const penghu = lon0 === 119;
      for (const c of own) features.push(line(c, { penghu, overlap: false }));
      for (const c of other) features.push(line(c, { penghu, overlap: true }));
    }
  }
  return { type: "FeatureCollection", features };
}

/**
 * 放大後框線在 PENGHU_EAST_LON 被切開，沿著這條經線補一條邊把框封起來。
 * 澎湖分區那段用橘色，只有本島分區的那段用紅色，同一段只畫一次
 */
function seamEdges(): FeatureCollection<LineString> {
  const features: Feature<LineString>[] = [];
  const eps = 1e-6;
  const kind = (lat: number) => {
    const [px, py] = lonLatToTwd67(PENGHU_EAST_LON - eps, lat, 119);
    if (findZone(px, py, 119)) return "penghu";
    const [mx, my] = lonLatToTwd67(PENGHU_EAST_LON + eps, lat, 121);
    if (findZone(mx, my, 121)) return "main";
    return null;
  };
  let run: Position[] = [];
  let runKind: string | null = null;
  const flush = () => {
    if (runKind && run.length > 1) {
      features.push(line(run, { penghu: runKind === "penghu", overlap: false }));
    }
  };
  // 每 0.001 度（約 110 m）取一點，邊界誤差遠小於畫面上的一個像素
  for (let lat = 22; lat <= 24.6; lat += 0.001) {
    const k = kind(lat);
    const p: Position = [PENGHU_EAST_LON, lat];
    if (k !== runKind) {
      if (runKind) run.push(p);
      flush();
      run = k ? [p] : [];
      runKind = k;
    } else if (k) {
      run.push(p);
    }
  }
  flush();
  return { type: "FeatureCollection", features };
}

/** 所有分區內的 800 m × 500 m 細格線。分區邊上的線交給分區框線畫，疊到另一套網格的部分不畫 */
function cellLines(): FeatureCollection<LineString> {
  const features: Feature<LineString>[] = [];
  const add = (coords: Position[], lon0: CentralMeridian, major: boolean) => {
    for (const c of splitByOwner(coords, lon0).own) features.push(line(c, { major }));
  };
  for (const { x0, y0, lon0 } of Object.values(TAIPOWER_ZONES)) {
    for (let i = 1; i < 100; i++) {
      const x = x0 + i * CELL_WIDTH;
      add(segment(x, y0, x, y0 + ZONE_HEIGHT, lon0, 4), lon0, i % 10 === 0);
      const y = y0 + i * CELL_HEIGHT;
      add(segment(x0, y, x0 + ZONE_WIDTH, y, lon0, 8), lon0, i % 10 === 0);
    }
  }
  return { type: "FeatureCollection", features };
}

// 本島最西一欄的字母往東移，避免壓到澎湖的 X、Y
const SHIFTED_LABELS = new Set(["J", "M", "P"]);
const labelPosition = (zone: string, z: TaipowerZone): Position =>
  toLngLat(
    z.x0 + ZONE_WIDTH * (SHIFTED_LABELS.has(zone) ? 0.8 : 0.5),
    z.y0 + ZONE_HEIGHT / 2,
    z.lon0,
  );

function zoneLabels(): FeatureCollection<Point> {
  return {
    type: "FeatureCollection",
    features: Object.entries(TAIPOWER_ZONES).map(([zone, z]) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: labelPosition(zone, z) },
      properties: { zone, penghu: z.lon0 === 119 },
    })),
  };
}

/** 格子西南角（TWD67）→ 經緯度多邊形 */
function cellPolygon(x0: number, y0: number, lon0: CentralMeridian): Feature<Polygon> {
  const ring = [
    toLngLat(x0, y0, lon0),
    toLngLat(x0 + CELL_WIDTH, y0, lon0),
    toLngLat(x0 + CELL_WIDTH, y0 + CELL_HEIGHT, lon0),
    toLngLat(x0, y0 + CELL_HEIGHT, lon0),
    toLngLat(x0, y0, lon0),
  ];
  return { type: "Feature", geometry: { type: "Polygon", coordinates: [ring] }, properties: {} };
}

const EMPTY: FeatureCollection = { type: "FeatureCollection", features: [] };
const byPenghu = (penghu: string, main: string): MapLibre.ExpressionSpecification => [
  "case",
  ["get", "penghu"],
  penghu,
  main,
];

function addGridLayers(map: MapLibre.Map) {
  map.addSource("taipower-cells", { type: "geojson", data: cellLines() });
  map.addSource("taipower-zones", { type: "geojson", data: zoneEdges() });
  map.addSource("taipower-seam", { type: "geojson", data: seamEdges() });
  map.addSource("taipower-labels", { type: "geojson", data: zoneLabels() });
  map.addSource("taipower-highlight", { type: "geojson", data: EMPTY });

  map.addLayer({
    id: "taipower-highlight-fill",
    type: "fill",
    source: "taipower-highlight",
    paint: { "fill-color": HIGHLIGHT_COLOR, "fill-opacity": 0.3 },
  });
  // 每 10 格（10%）畫粗一點，方便數格子
  map.addLayer({
    id: "taipower-cells",
    type: "line",
    source: "taipower-cells",
    minzoom: CELL_GRID_ZOOM,
    paint: {
      "line-color": CELL_COLOR,
      "line-width": ["case", ["get", "major"], 1.5, 0.6],
      "line-opacity": ["case", ["get", "major"], 0.8, 0.5],
    },
  });
  map.addLayer({
    id: "taipower-highlight-line",
    type: "line",
    source: "taipower-highlight",
    paint: { "line-color": HIGHLIGHT_COLOR, "line-width": 2 },
  });
  const zonePaint: MapLibre.LineLayerSpecification["paint"] = {
    "line-color": byPenghu(PENGHU_ZONE_COLOR, ZONE_COLOR),
    "line-width": 2,
    // 單位是線寬的倍數，2 px 寬就是 3 px 線段、3 px 空白
    "line-dasharray": [1.5, 1.5],
  };
  map.addLayer({
    id: "taipower-zones",
    type: "line",
    source: "taipower-zones",
    filter: ["!", ["get", "overlap"]],
    paint: zonePaint,
  });
  // 本島與澎湖網格重疊的部分，放大後就收起來，只留當地用的那套
  map.addLayer({
    id: "taipower-zones-overlap",
    type: "line",
    source: "taipower-zones",
    maxzoom: OVERLAP_HIDE_ZOOM,
    filter: ["get", "overlap"],
    paint: zonePaint,
  });
  // 重疊部分收起來後，沿切線補邊，框才是封閉的
  map.addLayer({
    id: "taipower-zones-seam",
    type: "line",
    source: "taipower-seam",
    minzoom: OVERLAP_HIDE_ZOOM,
    paint: zonePaint,
  });
  map.addLayer({
    id: "taipower-labels",
    type: "symbol",
    source: "taipower-labels",
    layout: {
      "text-field": ["get", "zone"],
      "text-font": ["Noto Sans Bold"],
      "text-size": 34,
      "text-allow-overlap": true,
      "text-ignore-placement": true,
    },
    paint: {
      "text-color": byPenghu(PENGHU_ZONE_COLOR, ZONE_COLOR),
      "text-halo-color": "#ffffff",
      "text-halo-width": 2,
    },
  });
}

interface HoverInfo {
  zone: string;
  digits: string;
  fine: string | null;
}

/** 台電電桿座標網格互動地圖 */
export default function TaipowerGridMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<HoverInfo | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let map: MapLibre.Map | null = null;
    let cancelled = false;
    let resizeObserver: ResizeObserver | null = null;

    // MapLibre 載入時會碰 window，只能在瀏覽器端動態載入
    Promise.all([
      import("maplibre-gl"),
      fetch(BASE_STYLE_URL).then((r) => r.json() as Promise<MapLibre.StyleSpecification>),
    ]).then(([{ default: maplibregl }, baseStyle]) => {
      if (cancelled) return;
      const fitOptions = { padding: 12, animate: false };
      map = new maplibregl.Map({
        container,
        style: toGoogleLikeStyle(baseStyle),
        bounds: TAIWAN_BOUNDS,
        fitBoundsOptions: fitOptions,
        minZoom: 5,
        maxZoom: 18,
        // 拖曳範圍。上下要留得夠寬，手機直立畫面縮到看見全部分區時才不會被擋住
        maxBounds: [
          [116, 17],
          [126, 29],
        ],
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false,
        attributionControl: { compact: true },
        // 中文字用系統字型畫，不必下載字型檔
        localIdeographFontFamily: '"Noto Sans TC", "Microsoft JhengHei", "PingFang TC", sans-serif',
      });
      map.touchZoomRotate.disableRotation();
      // 滾輪轉一格約放大三分之二級（預設一格只有三分之一級，太慢）
      map.scrollZoom.setWheelZoomRate(1 / 80);
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");

      // 容器尺寸會在載入後變動（捲軸出現、手機網址列收合），
      // 使用者還沒動過地圖前，每次變動都重新對準全島
      let userMoved = false;
      map.on("movestart", (e) => {
        if (e.originalEvent) userMoved = true;
      });
      resizeObserver = new ResizeObserver(() => {
        if (!map) return;
        map.resize();
        if (!userMoved) map.fitBounds(TAIWAN_BOUNDS, fitOptions);
      });
      resizeObserver.observe(container);

      map.on("load", () => {
        if (!map) return;
        addGridLayers(map);
      });

      let lastKey = "";
      const update = (e: MapLibre.MapMouseEvent) => {
        const highlight = map?.getSource<MapLibre.GeoJSONSource>("taipower-highlight");
        if (!map || !highlight) return;
        const code = lonLatToTaipower(e.lngLat.lng, e.lngLat.lat);
        const showFine = map.getZoom() >= FINE_CODE_ZOOM;
        const key = code ? `${code.zone}${code.digits}${showFine ? code.fine : ""}` : "";
        if (key === lastKey) return;
        lastKey = key;
        if (!code) {
          setInfo(null);
          highlight.setData(EMPTY);
          return;
        }
        setInfo({ zone: code.zone, digits: code.digits, fine: showFine ? code.fine : null });
        const [cx, cy] = code.cellOrigin;
        highlight.setData(cellPolygon(cx, cy, TAIPOWER_ZONES[code.zone].lon0));
      };
      map.on("mousemove", update);
      map.on("click", update);
    });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      map?.remove();
    };
  }, []);

  return (
    // 寬度跟文字同寬；台灣南北狹長，高度拉到接近整個螢幕，一開始就看得到所有分區
    <div className="relative isolate h-[92vh] min-h-[600px] w-full overflow-hidden rounded-lg border border-zinc-700">
      <div ref={containerRef} className="h-full w-full" aria-label="台電電線桿座標分區地圖" />
      <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-zinc-900/85 px-3 py-2 text-white shadow-lg">
        {info ? (
          <div className="font-mono text-2xl font-bold tracking-wide">
            <span className="text-red-400">{info.zone}</span>
            {info.digits}
            {info.fine && <span className="ml-2 text-yellow-300">{info.fine}</span>}
          </div>
        ) : (
          <div className="text-sm text-zinc-300">把滑鼠移到地圖上，或用手指點一下</div>
        )}
      </div>
    </div>
  );
}
