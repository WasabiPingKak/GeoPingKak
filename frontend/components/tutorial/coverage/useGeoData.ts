"use client";

import { useEffect, useState } from "react";

// 世界地圖用低精度（檔案小、首次載入快），各洲地圖用中精度（小國與島嶼才有形狀）
export const GEO_URL_110M = "/data/countries-110m.json";
export const GEO_URL_50M = "/data/countries-50m.json";

// 地圖套件解析 TopoJSON 後的國家形狀（rsmKey 由套件加上，id 為 ISO 3166-1 numeric）
export type GeoFeature = GeoJSON.Feature & {
  rsmKey: string;
  id: string;
  properties: { name: string };
};

// Module-level cache — 同一份地圖資料在所有地圖元件之間共用，只下載一次
const geoCache = new Map<string, unknown>();
const geoPromises = new Map<string, Promise<unknown>>();

function fetchGeoData(url: string): Promise<unknown> {
  const cached = geoCache.get(url);
  if (cached) return Promise.resolve(cached);
  let promise = geoPromises.get(url);
  if (!promise) {
    promise = fetch(url)
      .then((res) => res.json())
      .then((data) => {
        geoCache.set(url, data);
        return data;
      });
    geoPromises.set(url, promise);
  }
  return promise;
}

/** 載入地圖資料；enabled 為 false 時先不下載（用於延遲載入） */
export function useGeoData(url: string, enabled = true): unknown {
  const [data, setData] = useState<unknown>(() => geoCache.get(url) ?? null);

  useEffect(() => {
    if (data || !enabled) return;
    let cancelled = false;
    fetchGeoData(url).then((d) => {
      if (!cancelled) setData(d);
    });
    return () => {
      cancelled = true;
    };
  }, [url, enabled, data]);

  return data;
}
