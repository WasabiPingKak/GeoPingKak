// src/app/quick-reference/br/page.tsx
import React from "react";

export const metadata = {
  title: "巴西電話區碼速查表 | GeoPingKak",
  description: "GeoGuessr 玩家速查筆記：巴西行政區區碼對照與首府整理。",
};

export default function BrazilQuickReferencePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 text-white">
      <div className="text-white">
        <h1 className="text-3xl font-semibold mb-4">巴西電話區碼速查表</h1>

        {/* 地圖圖片 */}
        <div className="mb-6">
          <img
            src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/quick-reference/br/br_area_code.png?v=20251109"
            alt="巴西區碼地圖"
            className="w-full max-w-xl mx-auto rounded-md border border-zinc-700"
          />
        </div>

        {/* 文案內容 */}
        <div className="space-y-2 text-sm text-zinc-300 leading-relaxed">
          <p>以下是每一個大區中「區碼尾數為 1」的城市，通常是該區的首府：</p>
          <ul className="list-none mt-2 space-y-1">
            <li>
              <span className="bg-purple-700 text-white rounded px-2 py-0.5">
                (11) 聖保羅 São Paulo
              </span>
            </li>
            <li>
              <span className="bg-yellow-400 text-black rounded px-2 py-0.5">
                (21) 里約熱內盧 Rio de Janeiro
              </span>
            </li>
            <li>
              <span className="bg-orange-600 text-white rounded px-2 py-0.5">
                (31) 美景市 Belo Horizonte
              </span>
            </li>
            <li>
              <span className="bg-cyan-700 text-white rounded px-2 py-0.5">
                (41) 古里提巴 Curitiba
              </span>
            </li>
            <li>
              <span className="bg-cyan-700 text-white rounded px-2 py-0.5">
                (51) 阿列格雷港 Porto Alegre
              </span>
            </li>
            <li>
              <span className="bg-yellow-400 text-black rounded px-2 py-0.5">
                (61) 巴西利亞 Brasília
              </span>
            </li>
            <li>
              <span className="bg-purple-700 text-white rounded px-2 py-0.5">
                (71) 薩爾瓦多 Salvador
              </span>
            </li>
            <li>
              <span className="bg-pink-700 text-white rounded px-2 py-0.5">
                (81) 勒西菲 Recife
              </span>
            </li>
            <li>
              <span className="bg-green-700 text-white rounded px-2 py-0.5">
                (91) 貝倫 Belém
              </span>
            </li>
          </ul>
        </div>

      </div>
    </main>
  );
}
