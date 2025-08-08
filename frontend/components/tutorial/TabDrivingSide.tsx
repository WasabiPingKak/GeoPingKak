// components/tutorial/TabDrivingSide.tsx

import React from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function TabDrivingSide() {
  return (
    <div className="text-muted-foreground text-base leading-relaxed space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">道路通行方向</h2>

      <p>
        確認通行方向後，通常能立刻排除世界上約一半的國家，是極具價值的第一步線索。
      </p>
      <p>
        有很多方法可以用來分辨左右駕，但遊戲中通常我們要找的是<span className="font-bold text-blue-500">靠左駕駛的國家(相對比較少)</span>
      </p>
      <p>
        這是 GeoGuessr 內有街景的國家的各個通行方向的示意圖。
      </p>

      <div className="bg-muted/30 p-4 rounded-xl border border-border space-y-4">
        <div>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/driving_side/driving_side_map.png?v=20250808"
              alt="世界道路通行方向地圖"
              className="w-full rounded-xl shadow-md border border-border"
            />
          </Zoom>
          <p className="text-xs text-center mt-2 text-muted-foreground">
            圖片來源：{" "}
            <a
              href="https://www.plonkit.net/beginners-guide-2"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary"
            >
              https://www.plonkit.net/beginners-guide-2
            </a>
          </p>
        </div>

        <p>
          <span className="font-bold text-green-600">綠色的國家</span>都是街景有限覆蓋的國家，幾乎都是徒步街景 (Trekker) 或定點腳架街景，沒有駕駛方向的問題。
        </p>

        <p>
          在亞洲，東亞與南亞<strong>幾乎都是</strong>跟英國一樣，
          <span className="font-bold text-blue-500">靠左駕駛</span>。<br />
          除了以下幾個國家是
          <span className="font-bold text-red-500">靠右駕駛</span>：南韓、台灣、菲律賓、寮國、柬埔寨。
        </p>

        <p>
          在非洲，東非與南部非洲都是
          <span className="font-bold text-blue-500">靠左駕駛</span>，
          <strong>除了一個例外</strong>：盧安達。
        </p>
      </div>

      <h2 className="text-2xl font-bold text-white mt-8 mb-2">道路上有行進中的車</h2>
      <div>
        <p className="text-base mb-2 text-muted-foreground">
          非常明顯，不需要解釋。
        </p>
        <Zoom>
          <img
            src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/driving_side/driving_side_car.jpg?v=20250808"
            alt="道路通行方向"
            className="max-w-[700px] w-full h-auto rounded-xl shadow-md border border-border cursor-zoom-in"
          />
        </Zoom>
      </div>

      <h2 className="text-2xl font-bold text-white mt-10 mb-4">沒有行進中的車</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-base mb-2 text-muted-foreground">
            觀察順向停車的方向。
          </p>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/driving_side/driving_side_parking_01.jpg?v=20250808"
              alt="停車方向"
              className="w-full h-auto rounded-xl shadow-md border border-border"
            />
          </Zoom>
        </div>

        <div>
          <p className="text-base mb-2 text-muted-foreground">
            觀察駕駛座位置。
          </p>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/driving_side/driving_side_parking_02.jpg?v=20250808"
              alt="停車方向"
              className="w-full h-auto rounded-xl shadow-md border border-border"
            />
          </Zoom>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mt-10 mb-4">沒有車</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-base mb-2 text-muted-foreground">
            觀察停止線的位置。
          </p>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/driving_side/driving_side_lines.jpg?v=20250808"
              alt="道路標線"
              className="w-full h-auto rounded-xl shadow-md border border-border"
            />
          </Zoom>
        </div>
        <div>
          <p className="text-base mb-2 text-muted-foreground">
            觀察路標面對的方向，路標在道路左側面對駕駛：靠左駕駛的國家。
          </p>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/driving_side/driving_side_sign.jpg?v=20250808"
              alt="停車方向"
              className="w-full h-auto rounded-xl shadow-md border border-border"
            />
          </Zoom>
        </div>
      </div>
    </div>
  );
}
