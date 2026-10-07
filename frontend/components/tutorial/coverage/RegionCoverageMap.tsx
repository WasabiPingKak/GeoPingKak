"use client";

import React, { memo, useEffect, useMemo, useState } from "react";
import { geoContains, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import {
  ALL_SMALL_NATIONS,
  COVERAGE_COLORS,
  DEFAULT_COUNTRY_COLOR,
  type RegionView,
  type SmallNationMarker,
} from "@/data/coverageData";
import { GEO_URL_50M, useGeoData } from "./useGeoData";
import { CoverageTooltip, useCountryLookup, useCoverageTooltip } from "./CoverageTooltip";
import { REGION_MAP_WIDTH, fitRegionProjection, intersectsBounds } from "./regionProjection";

interface RegionCoverageMapProps {
  view: RegionView;
  /** 地圖的最大高度（px），寬度依長寬比計算並受卡片寬度限制 */
  maxHeight: number;
}

// 地圖資料畫在別國底下的海外領地，依所屬國家 id 分組
const OVERSEAS_PARTS = new Map<string, SmallNationMarker[]>();
for (const nation of ALL_SMALL_NATIONS) {
  if (!nation.partOf) continue;
  OVERSEAS_PARTS.set(nation.partOf, [...(OVERSEAS_PARTS.get(nation.partOf) ?? []), nation]);
}

// TopoJSON 轉成 GeoJSON 的結果，同一份地圖資料只轉一次
const featureCache = new WeakMap<object, GeoJSON.Feature[]>();

function toFeatures(topology: unknown): GeoJSON.Feature[] {
  const topo = topology as Topology<{ countries: GeometryCollection }>;
  let features = featureCache.get(topo);
  if (!features) {
    features = feature(topo, topo.objects.countries).features;
    featureCache.set(topo, features);
  }
  return features;
}

/**
 * 各洲的街景覆蓋地圖：固定取景、不可縮放，捲動到附近才下載地圖資料並繪製。
 *
 * 國家形狀用 d3-geo 自己算，沒有用地圖套件的 Geographies。套件會依「國家清單 + 投影函式
 * 原始碼前 50 字」快取算好的形狀，多張 Mercator 地圖會互相拿到對方的形狀。
 */
function RegionCoverageMap({ view, maxHeight }: RegionCoverageMapProps) {
  const lookup = useCountryLookup();
  const { containerRef, tooltip, hide, hideOutsideShapes, bind } = useCoverageTooltip();

  // 進入畫面前 300px 才開始載入，避免一進頁面就下載與繪製所有地圖
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef, visible]);

  const topology = useGeoData(GEO_URL_50M, visible);
  const { projection, height } = useMemo(() => fitRegionProjection(view.bounds), [view.bounds]);

  const shapes = useMemo(() => {
    if (!topology) return [];
    const path = geoPath(projection);
    return toFeatures(topology)
      .filter((f) => intersectsBounds(f, view.bounds))
      .flatMap((f) => {
        const id = String(f.id);
        const info = lookup(id, f.properties?.name);
        const parts = OVERSEAS_PARTS.get(id);
        if (!parts || f.geometry.type !== "MultiPolygon") {
          return [{ key: id, d: path(f) ?? "", info }];
        }
        // 海外領地：拆成一塊一塊，包含領地座標的那塊改用領地自己的資料
        return f.geometry.coordinates.map((polygon, idx) => {
          const part: GeoJSON.Feature = {
            type: "Feature",
            properties: {},
            geometry: { type: "Polygon", coordinates: polygon },
          };
          const territory = parts.find((t) => geoContains(part, t.coordinates));
          return { key: `${id}-${idx}`, d: path(part) ?? "", info: territory ?? info };
        });
      });
  }, [topology, projection, view.bounds, lookup]);

  const markers = useMemo(
    () =>
      ALL_SMALL_NATIONS.flatMap((nation) => {
        const point = projection(nation.coordinates);
        if (!point) return [];
        const [x, y] = point;
        if (x < 0 || x > REGION_MAP_WIDTH || y < 0 || y > height) return [];
        return [{ nation, x, y }];
      }),
    [projection, height],
  );

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className="relative rounded-lg border border-zinc-700 bg-zinc-900 overflow-hidden"
        style={{
          // 寬度受限於卡片寬度與最大高度，兩者取小，長寬比固定
          width: `min(100%, ${Math.round((maxHeight * REGION_MAP_WIDTH) / height)}px)`,
          aspectRatio: `${REGION_MAP_WIDTH} / ${height}`,
        }}
        onMouseMove={hideOutsideShapes}
        onTouchStart={hideOutsideShapes}
        onMouseLeave={hide}
      >
        {!topology ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-zinc-500 text-sm">地圖載入中…</span>
          </div>
        ) : (
          <svg
            viewBox={`0 0 ${REGION_MAP_WIDTH} ${height}`}
            className="block w-full h-full"
            role="img"
            aria-label={`${view.titleTw}街景覆蓋地圖`}
          >
            {shapes.map(({ key, d, info }) => (
              <path
                key={key}
                d={d}
                fill={info ? COVERAGE_COLORS[info.status] : DEFAULT_COUNTRY_COLOR}
                stroke="#3f3f46"
                strokeWidth={0.6}
                className={info ? "cursor-pointer transition-opacity hover:opacity-80" : undefined}
                {...bind(info)}
              />
            ))}
            {markers.map(({ nation, x, y }) => (
              <circle
                key={nation.id}
                cx={x}
                cy={y}
                r={9}
                fill={COVERAGE_COLORS[nation.status]}
                stroke="#fff"
                strokeWidth={1.5}
                className="cursor-pointer"
                {...bind(nation)}
              />
            ))}
          </svg>
        )}
        <CoverageTooltip tooltip={tooltip} />
      </div>
    </div>
  );
}

export default memo(RegionCoverageMap);
