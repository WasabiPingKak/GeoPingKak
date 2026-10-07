import { geoBounds, geoMercator, type GeoProjection } from "d3-geo";
import type { GeoBounds } from "@/data/coverageData";

// 地圖畫布寬度（SVG viewBox），高度依範圍的長寬比計算
export const REGION_MAP_WIDTH = 800;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const mercatorY = (lat: number) => Math.log(Math.tan(Math.PI / 4 + toRad(lat) / 2));

/** 依經緯度範圍算出 Mercator 投影與畫布高度，範圍剛好填滿畫布 */
export function fitRegionProjection(bounds: GeoBounds): {
  projection: GeoProjection;
  height: number;
} {
  const [west, south, east, north] = bounds;
  const ratio = (mercatorY(north) - mercatorY(south)) / toRad(east - west);
  const height = Math.round(REGION_MAP_WIDTH * ratio);
  const projection = geoMercator().fitSize([REGION_MAP_WIDTH, height], {
    type: "MultiPoint",
    coordinates: [
      [west, south],
      [east, south],
      [west, north],
      [east, north],
    ],
  });
  return { projection, height };
}

/**
 * 國家形狀是否可能出現在範圍內（只畫看得到的國家，減少 SVG 節點）。
 * 跨越 180 度經線的國家（俄羅斯、斐濟等）一律保留。
 */
export function intersectsBounds(feature: GeoJSON.Feature, bounds: GeoBounds): boolean {
  const [[fw, fs], [fe, fn]] = geoBounds(feature);
  const [west, south, east, north] = bounds;
  if (fs > north || fn < south) return false;
  if (fw > fe) return true;
  return fw <= east && fe >= west;
}
