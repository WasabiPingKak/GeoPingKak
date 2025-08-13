// app/recommend_settings/page.tsx

export default function RecommendSettingsPage() {
  return (
    <div className="max-w-4xl p-4">
      <h1 className="text-2xl font-bold mb-6">推薦設定</h1>
      <p className="text-muted-foreground mb-8">
        遊戲中的預設設定可以更改，推薦打開圖形化指南針。
      </p>

      <h1 className="text-2xl font-bold mb-6">快捷鍵</h1>
      <p className="text-muted-foreground mb-4">
        遊戲中有幾個常用的快捷鍵可以幫助你更好地定位與操作：
      </p>
      <ul className="text-muted-foreground list-disc list-inside space-y-2 mb-8">
        <li>
          <kbd className="px-2 py-0.5 bg-zinc-700 text-white rounded">R</kbd>：回到起始位置（重生點），要作答的位置即是起始位置。
        </li>
        <li>
          <kbd className="px-2 py-0.5 bg-zinc-700 text-white rounded">Z</kbd>：回到上一步，有時候誤撞牆壁會導致攝影機角度異常，可以連續使用。
        </li>
        <li>
          <kbd className="px-2 py-0.5 bg-zinc-700 text-white rounded">N</kbd>：將鏡頭對準正北方；連按兩次會先面北再垂直向下。
        </li>
      </ul>

      <div className="flex flex-col gap-12">
        {/* 🔹 第一組說明區塊 */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/settings/UI_01.jpg"
              alt="圖形化指南針設定"
              className="rounded-lg border border-zinc-700 shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 text-sm leading-relaxed text-muted-foreground">
            <h2 className="text-lg font-semibold mb-2">圖形化指南針</h2>
            <p className="mb-2">
              在 Geoguessr 中，預設沒有這個指南針，打開圖形化指南針的方式在左下角介面的齒輪中。
            </p>
          </div>
        </div>

        {/* 🔹 第二組說明區塊 */}
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/settings/settings.jpg"
              alt="推薦設定項目"
              className="rounded-lg border border-zinc-700 shadow-md"
            />
          </div>

          {/* 說明文字區塊 */}
          <div className="w-full md:w-1/2 text-sm leading-relaxed text-muted-foreground">
            <h2 className="text-xl font-bold mb-4 text-white">推薦設定項目</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">COMPASS 指南針</h3>
                <p>
                  推薦選擇 <strong>CLASSIC & MODERN</strong>，會同時有左下角的圖形化指南針與頭頂的方位標示。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-1">MAP QUALITY 地圖品質</h3>
                <p>
                  推薦選擇 <strong>BALANCED (RASTER)</strong>，<strong>HIGH (VECTOR)</strong> 可能會有地標或地名無法渲染的問題。
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-1">ANIMATIONS OFF 關閉動畫</h3>
                <p>
                  遊戲 UI 中會出現一些與地圖、街景無關的 3D 動畫，如果你玩起來覺得卡頓或出現效能問題，建議關閉 3D 動畫。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
