"use client";

import React, { useState, useMemo, useEffect, useRef, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  type Coordinates,
} from "@vnedyalk0v/react19-simple-maps";
import {
  COVERAGE_COLORS,
  COVERAGE_LABELS,
  DEFAULT_COUNTRY_COLOR,
  type RegionConfig,
  type CoverageStatus,
} from "@/data/coverageData";
import CoverageLegend from "./CoverageLegend";

const GEO_URL = "/data/countries-110m.json";

// Module-level singleton cache — shared across all CoverageMap instances
let geoDataCache: unknown = null;
let geoFetchPromise: Promise<unknown> | null = null;

function fetchGeoData(): Promise<unknown> {
  if (geoDataCache) return Promise.resolve(geoDataCache);
  if (!geoFetchPromise) {
    geoFetchPromise = fetch(GEO_URL)
      .then((res) => res.json())
      .then((data) => {
        geoDataCache = data;
        return data;
      });
  }
  return geoFetchPromise;
}

interface TooltipData {
  nameTw: string;
  status: CoverageStatus;
  note?: string;
  x: number;
  y: number;
}

interface CoverageMapProps {
  config: RegionConfig;
  height?: number;
}

function CoverageMap({ config, height = 350 }: CoverageMapProps) {
  const zoomable = config.key === "world";
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [geographyData, setGeographyData] = useState<unknown>(geoDataCache);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>(config.center as [number, number]);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (geographyData) return;
    fetchGeoData().then(setGeographyData);
  }, [geographyData]);

  const countryMap = useMemo(() => {
    const map = new Map<string, { nameTw: string; status: CoverageStatus; note?: string }>();
    for (const c of config.countries) {
      map.set(c.id, { nameTw: c.nameTw, status: c.status, note: c.note });
    }
    return map;
  }, [config.countries]);

  const showTooltip = (
    nameTw: string,
    status: CoverageStatus,
    note: string | undefined,
    event: React.MouseEvent | React.TouchEvent,
  ) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      "touches" in event ? event.touches[0].clientY : event.clientY;
    setTooltip({
      nameTw,
      status,
      note,
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const hideTooltip = () => setTooltip(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (zoomable) {
      // 世界地圖：攔截滾輪預設行為，讓 d3-zoom 負責縮放（頁面不捲動）
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
      };
      el.addEventListener("wheel", onWheel, { passive: false });
      return () => el.removeEventListener("wheel", onWheel);
    } else {
      // 區域地圖：在 capture 階段 stopPropagation，使 d3-zoom 收不到滾輪事件
      // 不呼叫 preventDefault，頁面捲動正常運作
      const onWheel = (e: WheelEvent) => {
        e.stopPropagation();
      };
      el.addEventListener("wheel", onWheel, { capture: true, passive: true });
      return () => el.removeEventListener("wheel", onWheel, true);
    }
  }, [zoomable]);

  const handleZoom = (direction: "in" | "out" | "reset") => {
    if (direction === "reset") {
      setZoom(1);
      setCenter(config.center as [number, number]);
      setMapKey((k) => k + 1);
      return;
    }
    if (direction === "in") {
      setZoom((z) => Math.min(z * 1.5, 10));
    } else {
      setZoom((z) => Math.max(z / 1.5, 1));
    }
  };

  if (!geographyData) {
    return (
      <div
        ref={containerRef}
        className="relative flex items-center justify-center bg-zinc-900 rounded"
        style={{ height }}
      >
        <span className="text-zinc-500 text-sm">地圖載入中…</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={(e) => {
        const tag = (e.target as Element).tagName.toLowerCase();
        if (tag !== "path" && tag !== "circle") {
          hideTooltip();
        }
      }}
      onMouseLeave={hideTooltip}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: config.center as [number, number],
          scale: config.scale,
        } as unknown as { center: Coordinates; scale: number }}
        width={800}
        height={height}
        style={{ width: "100%", height: "auto", background: "transparent" }}
      >
        <ZoomableGroup
          key={mapKey}
          center={center as unknown as Coordinates}
          zoom={zoom}
          onMoveEnd={zoomable
            ? (((pos: any) => {
                if (pos?.coordinates) setCenter(pos.coordinates);
                if (pos?.zoom) setZoom(pos.zoom);
              }) as any)
            : undefined
          }
        >
          <Geographies geography={geographyData}>
            {({ geographies }: { geographies: Array<{ rsmKey: string; id: string; properties: { name: string } }> }) =>
              geographies.map((geo) => {
                const country = countryMap.get(geo.id) ?? config.nameMap?.[geo.properties?.name];
                const fillColor = country
                  ? COVERAGE_COLORS[country.status]
                  : DEFAULT_COUNTRY_COLOR;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#3f3f46"
                    strokeWidth={0.5}
                    onMouseEnter={(e: React.MouseEvent) => {
                      if (country) {
                        showTooltip(country.nameTw, country.status, country.note, e);
                      }
                    }}
                    onMouseMove={(e: React.MouseEvent) => {
                      if (country) {
                        showTooltip(country.nameTw, country.status, country.note, e);
                      }
                    }}
                    onMouseLeave={hideTooltip}
                    onTouchStart={(e: React.TouchEvent) => {
                      if (country) {
                        showTooltip(country.nameTw, country.status, country.note, e);
                      }
                    }}
                    onTouchEnd={hideTooltip}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        outline: "none",
                        fill: country
                          ? `${COVERAGE_COLORS[country.status]}cc`
                          : DEFAULT_COUNTRY_COLOR,
                        cursor: country ? "pointer" : "default",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {config.smallNations.map((nation) => (
            <Marker key={nation.id} coordinates={nation.coordinates as unknown as Coordinates}>
              <circle
                r={2.5}
                fill={COVERAGE_COLORS[nation.status]}
                stroke="#fff"
                strokeWidth={0.4}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) =>
                  showTooltip(nation.nameTw, nation.status, nation.note, e as unknown as React.MouseEvent)
                }
                onMouseMove={(e) =>
                  showTooltip(nation.nameTw, nation.status, nation.note, e as unknown as React.MouseEvent)
                }
                onMouseLeave={hideTooltip}
                onTouchStart={(e) =>
                  showTooltip(nation.nameTw, nation.status, nation.note, e as unknown as React.TouchEvent)
                }
                onTouchEnd={hideTooltip}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* 縮放按鈕 — 僅世界地圖 */}
      {zoomable && (
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
          <button
            onClick={() => handleZoom("in")}
            className="flex items-center justify-center w-7 h-7 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors shadow text-white"
            title="放大地圖"
            aria-label="放大地圖"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button
            onClick={() => handleZoom("out")}
            className="flex items-center justify-center w-7 h-7 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors shadow text-white"
            title="縮小地圖"
            aria-label="縮小地圖"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <button
            onClick={() => handleZoom("reset")}
            className="flex items-center justify-center w-7 h-7 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors shadow text-white text-xs font-bold"
            title="重置地圖"
            aria-label="重置地圖"
          >
            ↺
          </button>
        </div>
      )}

      {/* 圖例 - 右下角 */}
      <CoverageLegend />

      {/* 工具提示 */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-10 bg-zinc-800 border border-zinc-600 rounded-lg px-3 py-2 text-sm shadow-lg"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 12,
            transform: "translateY(-100%)",
          }}
        >
          <div className="font-bold text-white">{tooltip.nameTw}</div>
          <div style={{ color: COVERAGE_COLORS[tooltip.status] }}>
            {COVERAGE_LABELS[tooltip.status]}
          </div>
          {tooltip.note && (
            <div className="text-muted-foreground text-xs mt-1">
              {tooltip.note}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default memo(CoverageMap);
