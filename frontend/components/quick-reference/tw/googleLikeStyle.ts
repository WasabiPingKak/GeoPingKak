// 把 OpenFreeMap Liberty 樣式改成接近 Google 地圖的配色，地名改顯示中文。
// 只改顏色與文字欄位，圖層結構沿用 Liberty。
import type {
  ExpressionSpecification,
  LayerSpecification,
  StyleSpecification,
} from "maplibre-gl";

export const BASE_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

const C = {
  land: "#f5f3f0",
  urban: "#ebe9e5",
  park: "#cfe8d0",
  wood: "#d6ebd2",
  grass: "#dcefd7",
  sand: "#f4eedc",
  hospital: "#f8e3e3",
  water: "#aadaff",
  waterLabel: "#4b7fb8",
  building: "#e8e6e2",
  buildingLine: "#dad8d4",
  aeroway: "#e8eaed",
  motorway: "#fcd462",
  motorwayCase: "#e2b23d",
  trunk: "#fdecaa",
  trunkCase: "#e6cd78",
  road: "#ffffff",
  roadCase: "#dadce0",
  rail: "#c4c7cc",
  boundary: "#9aa0a6",
  county: "#80868b",
  label: "#3c4043",
  labelMinor: "#5f6368",
};

// 中文地名優先，沒有才用原名
const NAME: ExpressionSpecification = ["coalesce", ["get", "name:zh-Hant"], ["get", "name:nonlatin"], ["get", "name"]];

/** 依圖層 id 決定要改成什麼顏色，回傳 null 代表隱藏 */
function paintFor(layer: LayerSpecification): Record<string, unknown> | null | undefined {
  const id = layer.id;
  switch (layer.type) {
    case "background":
      return { "background-color": C.land };
    case "raster":
      return null; // 低縮放的地形暈渲，Google 風格不需要
    case "fill-extrusion":
      return { "fill-extrusion-color": C.building, "fill-extrusion-opacity": 1 };
    case "fill": {
      if (id === "water") return { "fill-color": C.water };
      if (id === "park") return { "fill-color": C.park, "fill-opacity": 1, "fill-outline-color": C.park };
      if (id === "landcover_wood") return { "fill-color": C.wood, "fill-opacity": 0.7 };
      if (id === "landcover_grass") return { "fill-color": C.grass, "fill-opacity": 0.6 };
      if (id === "landcover_sand") return { "fill-color": C.sand };
      if (id === "landuse_hospital") return { "fill-color": C.hospital };
      if (id === "landuse_residential") return { "fill-color": C.urban, "fill-opacity": 0.7 };
      if (id === "aeroway_fill") return { "fill-color": C.aeroway, "fill-opacity": 1 };
      if (id === "building") return { "fill-color": C.building, "fill-outline-color": C.buildingLine };
      if (/^landuse_/.test(id)) return { "fill-color": C.grass, "fill-opacity": 0.6 };
      return undefined;
    }
    case "line": {
      if (id === "park_outline") return null;
      if (/^waterway/.test(id)) return { "line-color": C.water };
      // 台灣的縣市界是 admin_level 4，落在這層。改成實線加粗，跟網格的紅色虛線分得開
      if (id === "boundary_3") {
        return {
          "line-color": C.county,
          "line-width": ["interpolate", ["linear"], ["zoom"], 5, 1, 8, 1.8, 12, 2.6],
        };
      }
      if (/^boundary/.test(id)) return { "line-color": C.boundary };
      if (/aeroway/.test(id)) return { "line-color": C.road };
      if (/rail/.test(id)) return { "line-color": C.rail };
      const casing = /casing/.test(id);
      if (/motorway/.test(id)) return { "line-color": casing ? C.motorwayCase : C.motorway };
      if (/trunk_primary/.test(id)) return { "line-color": casing ? C.trunkCase : C.trunk };
      if (/link/.test(id)) return { "line-color": casing ? C.trunkCase : C.trunk };
      if (/path_pedestrian/.test(id)) return casing ? { "line-color": C.roadCase } : { "line-color": C.road };
      return { "line-color": casing ? C.roadCase : C.road };
    }
    case "symbol": {
      if (/^water/.test(id)) return { "text-color": C.waterLabel, "text-halo-color": "#ffffff" };
      if (/^(poi|highway-name|airport)/.test(id)) {
        return { "text-color": C.labelMinor, "text-halo-color": "#ffffff", "text-halo-width": 1.2 };
      }
      if (/^label_/.test(id)) {
        return { "text-color": C.label, "text-halo-color": "#ffffff", "text-halo-width": 1.5 };
      }
      return undefined;
    }
    default:
      return undefined;
  }
}

/** Liberty 樣式 → 仿 Google 配色 */
export function toGoogleLikeStyle(style: StyleSpecification): StyleSpecification {
  const layers = style.layers.map((layer) => {
    // 樣式規格的型別太嚴，這裡當成一般物件改
    const next = { ...layer } as {
      id: string;
      type: string;
      paint?: Record<string, unknown>;
      layout?: Record<string, unknown>;
    };
    const paint = paintFor(layer);
    if (paint === null) {
      next.layout = { ...next.layout, visibility: "none" };
    } else if (paint) {
      next.paint = { ...next.paint, ...paint };
      // 原樣式的虛線留著會讓道路和縣市界看起來斷斷續續
      if (layer.type === "line" && !/tunnel|hatching|disputed/.test(layer.id)) {
        delete next.paint["line-dasharray"];
      }
    }
    if (layer.type === "symbol" && next.layout?.["text-field"] && /name|label|poi|airport/.test(layer.id)) {
      next.layout = { ...next.layout, "text-field": NAME };
    }
    return next as LayerSpecification;
  });
  return { ...style, layers };
}
