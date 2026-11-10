// 產生 SVG 地圖資料的共用工具（給 scripts/generate-*.mjs 用）。
//
// 做法：在 TopoJSON 的弧線上投影並簡化，相鄰區域共用同一條弧，邊界不會裂開。
// 路徑輸出成相對座標並取到小數一位，檔案比 d3 預設輸出小很多。

/** 取到小數一位 */
export const round = (n) => Math.round(n * 10) / 10;

/** 把量化、delta 編碼的弧線還原成經緯度 */
export function decodeArcs(topo) {
  const { scale, translate } = topo.transform;
  return topo.arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
}

/** Douglas–Peucker 簡化 */
export function simplify(points, tolerance) {
  if (points.length <= 2) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = points[a];
    const [bx, by] = points[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let maxD = -1;
    let maxI = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = points[i];
      let d;
      if (len2 === 0) {
        d = Math.hypot(px - ax, py - ay);
      } else {
        d = Math.abs(dy * px - dx * py + bx * ay - by * ax) / Math.sqrt(len2);
      }
      if (d > maxD) {
        maxD = d;
        maxI = i;
      }
    }
    if (maxD > tolerance) {
      keep[maxI] = 1;
      stack.push([a, maxI], [maxI, b]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

/**
 * 回傳一份「弧線已投影成平面座標並簡化」的拓撲（沒有 transform），
 * 可以直接丟給 topojson-client 的 feature() / mesh() / merge()。
 */
export function projectTopologyArcs(topo, projection, tolerance) {
  const arcs = decodeArcs(topo).map((arc) =>
    simplify(arc.map((ll) => projection(ll)), tolerance),
  );
  return { type: "Topology", objects: topo.objects, arcs };
}

// 數字取到小數一位，去掉多餘的 0，例如 0.5 → .5、-0.5 → -.5、3.0 → 3
const fmt = (n) => {
  const s = (Math.round(n * 10) / 10).toString();
  return s.replace(/^(-?)0\./, "$1.");
};

// 第一點用絕對座標，之後用相對位移（l），比 d3 預設的絕對座標短很多。
// 先把每個點四捨五入成絕對座標再相減，避免誤差累積
function pointsPath(points, closed) {
  const pts = (closed ? points.slice(0, -1) : points).map(([x, y]) => [
    Math.round(x * 10),
    Math.round(y * 10),
  ]);
  let out = `M${fmt(pts[0][0] / 10)} ${fmt(pts[0][1] / 10)}l`;
  let prev = pts[0];
  let first = true;
  for (const p of pts.slice(1)) {
    const dx = p[0] - prev[0];
    const dy = p[1] - prev[1];
    if (dx === 0 && dy === 0) continue;
    const part = `${fmt(dx / 10)}${dy < 0 ? "" : " "}${fmt(dy / 10)}`;
    out += first || part.startsWith("-") ? part : ` ${part}`;
    first = false;
    prev = p;
  }
  return closed ? `${out}z` : out;
}

/** 平面座標的多邊形環 → SVG 路徑 */
export const ringPath = (ring) => pointsPath(ring, true);

/** 平面座標的 MultiPolygon → SVG 路徑 */
export const planarPath = (multi) =>
  multi.coordinates.flatMap((poly) => poly.map(ringPath)).join("");

/** 平面座標的 MultiLineString → SVG 路徑 */
export const planarLinePath = (multi) =>
  multi.coordinates
    .filter((line) => line.length >= 2)
    .map((line) => pointsPath(line, false))
    .join("");

/** 平面座標的環面積（不分方向） */
export const ringArea = (ring) => {
  let s = 0;
  for (let i = 0, n = ring.length; i < n; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[(i + 1) % n];
    s += x0 * y1 - x1 * y0;
  }
  return Math.abs(s / 2);
};

// 點到線段的距離平方
function segDist2(px, py, [ax, ay], [bx, by]) {
  let dx = bx - ax;
  let dy = by - ay;
  if (dx !== 0 || dy !== 0) {
    const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)));
    ax += dx * t;
    ay += dy * t;
  }
  dx = px - ax;
  dy = py - ay;
  return dx * dx + dy * dy;
}

/** 點到多邊形（含洞）邊界的帶號距離，在裡面為正 */
function signedDistance(px, py, polygon) {
  let inside = false;
  let min = Infinity;
  for (const ring of polygon) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const a = ring[i];
      const b = ring[j];
      if (a[1] > py !== b[1] > py && px < ((b[0] - a[0]) * (py - a[1])) / (b[1] - a[1]) + a[0]) {
        inside = !inside;
      }
      min = Math.min(min, segDist2(px, py, a, b));
    }
  }
  return (inside ? 1 : -1) * Math.sqrt(min);
}

/**
 * 多邊形裡離邊界最遠的點（pole of inaccessibility），用來放標籤。
 * 先粗格點找最佳位置，再在附近逐步細找。平面座標，回傳 [x, y]。
 */
export function innerPoint(polygon, step = 4) {
  const xs = polygon[0].map((p) => p[0]);
  const ys = polygon[0].map((p) => p[1]);
  let best = [0, 0];
  let bestD = -Infinity;
  const scan = (x0, x1, y0, y1, s) => {
    for (let x = x0; x <= x1; x += s) {
      for (let y = y0; y <= y1; y += s) {
        const d = signedDistance(x, y, polygon);
        if (d > bestD) {
          bestD = d;
          best = [x, y];
        }
      }
    }
  };
  scan(Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys), step);
  for (let s = step / 4; s >= 0.25; s /= 4) {
    const [bx, by] = best;
    scan(bx - step, bx + step, by - step, by + step, s);
  }
  return best;
}
