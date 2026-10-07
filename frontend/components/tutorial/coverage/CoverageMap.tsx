"use client";

import React, { useState, useEffect, memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  type Coordinates,
} from "@vnedyalk0v/react19-simple-maps";
import {
  ALL_SMALL_NATIONS,
  COVERAGE_COLORS,
  BORDER_COLOR,
  DEFAULT_COUNTRY_COLOR,
  WORLD_VIEW,
} from "@/data/coverageData";
import type { Topology } from "topojson-specification";
import CoverageLegend from "./CoverageLegend";
import { GEO_URL_110M, useGeoData, type GeoFeature } from "./useGeoData";
import { CoverageTooltip, useCountryLookup, useCoverageTooltip } from "./CoverageTooltip";

interface CoverageMapProps {
  height?: number;
}

/** 頂端的世界地圖：可縮放、拖曳 */
function CoverageMap({ height = 350 }: CoverageMapProps) {
  const lookup = useCountryLookup();
  const { containerRef, tooltip, hide, hideOutsideShapes, bind } = useCoverageTooltip();
  const geographyData = useGeoData(GEO_URL_110M);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState<[number, number]>(WORLD_VIEW.center);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // 攔截滾輪預設行為，讓 d3-zoom 負責縮放（頁面不捲動）
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [containerRef]);

  const handleZoom = (direction: "in" | "out" | "reset") => {
    if (direction === "reset") {
      setZoom(1);
      setCenter(WORLD_VIEW.center);
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
      onMouseMove={hideOutsideShapes}
      onTouchStart={hideOutsideShapes}
      onMouseLeave={hide}
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: WORLD_VIEW.center,
          scale: WORLD_VIEW.scale,
        } as unknown as { center: Coordinates; scale: number }}
        width={800}
        height={height}
        style={{ width: "100%", height: "auto", background: "transparent" }}
      >
        <ZoomableGroup
          key={mapKey}
          center={center as unknown as Coordinates}
          zoom={zoom}
          onMoveEnd={((pos: any) => {
            if (pos?.coordinates) setCenter(pos.coordinates);
            if (pos?.zoom) setZoom(pos.zoom);
          }) as any}
        >
          <Geographies geography={geographyData as Topology}>
            {({ geographies }: { geographies: GeoJSON.Feature[] }) =>
              (geographies as GeoFeature[]).map((geo) => {
                const info = lookup(geo.id, geo.properties?.name);
                const fillColor = info ? COVERAGE_COLORS[info.status] : DEFAULT_COUNTRY_COLOR;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke={BORDER_COLOR}
                    strokeWidth={1}
                    vectorEffect="non-scaling-stroke"
                    {...bind(info)}
                    style={{
                      default: { outline: "none" },
                      hover: {
                        outline: "none",
                        fill: info ? `${fillColor}cc` : fillColor,
                        cursor: info ? "pointer" : "default",
                      },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {ALL_SMALL_NATIONS.map((nation) => (
            <Marker key={nation.id} coordinates={nation.coordinates as unknown as Coordinates}>
              {/* 半徑除以縮放倍率，放大地圖時圓點維持同樣大小，不會蓋住國家 */}
              <circle
                r={2.5 / zoom}
                fill={COVERAGE_COLORS[nation.status]}
                stroke="#fff"
                strokeWidth={0.4 / zoom}
                style={{ cursor: "pointer" }}
                {...(bind(nation) as React.SVGProps<SVGCircleElement>)}
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* 縮放按鈕 */}
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

      {/* 圖例 - 右下角 */}
      <CoverageLegend />

      <CoverageTooltip tooltip={tooltip} />
    </div>
  );
}

export default memo(CoverageMap);
