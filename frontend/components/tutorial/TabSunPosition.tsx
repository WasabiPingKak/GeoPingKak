// components/tutorial/TabSunPosition.tsx

import React from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function TabSunPosition() {
  return (
    <div className="text-muted-foreground text-base leading-relaxed space-y-6">
      <h2 className="text-xl font-bold text-white mb-4">太陽</h2>

      {/* 概論段落 */}
      <p>
        太陽的位置是 GeoGuessr 中能分辨「南北半球」的重要線索。<br />
        此技巧在缺乏人造物的地區特別有用，例如非洲草原、南美山區等地。
      </p>

      {/* 通則強調區塊 */}
      <div className="bg-orange-900/30 border border-orange-600 text-orange-300 rounded-lg p-4 font-semibold space-y-4">
        <p>
          <strong>通則是：</strong>當你位在北半球時，太陽會出現在南方；
          當你位在南半球時，太陽則會在北方。
        </p>
        <p>
          換句話說，可以想像太陽大致位於赤道上方，因此你面向太陽時，其實就是面向赤道，也就與你所在的半球方向相反。
        </p>

        {/* 圖片說明排版 */}
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          {/* 北半球圖片 */}
          <div className="flex-1 text-center space-y-2">
            <Zoom>
              <img
                src="/sun_position/example_N.jpg"
                alt="北半球觀察太陽的位置"
                className="w-full rounded-md border border-orange-600 shadow-md"
              />
            </Zoom>
            <p className="text-sm text-orange-300">北半球時，太陽會出現在南方</p>
          </div>

          {/* 南半球圖片 */}
          <div className="flex-1 text-center space-y-2">
            <Zoom>
              <img
                src="/sun_position/example_S.jpg"
                alt="南半球觀察太陽的位置"
                className="w-full rounded-md border border-orange-600 shadow-md"
              />
            </Zoom>
            <p className="text-sm text-orange-300">南半球時，太陽會出現在北方</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">影子</h2>
      <div className="mt-6 space-y-4">
        <p>
          有時候太陽可能被遮蔽，或畫面角度無法直接看到天空，這時可以觀察物體的影子。
          <br />
          影子與光源方向相反，因此你可以透過影子的方向來推估太陽所在的位置。
          <br />
          這樣依然能判斷你面對的是赤道方向，進而推斷你所在的半球。
        </p>

        <div className="text-center">
          <Zoom>
            <img
              src="/sun_position/shadow.jpg"
              alt="透過影子判斷太陽位置"
              className="w-full md:w-2/3 mx-auto rounded-md border border-zinc-700 shadow-md"
            />
          </Zoom>
          <p className="mt-2 text-sm text-muted-foreground">透過影子的方向推斷太陽位置與赤道方位</p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-4">原因</h2>
      <div className="mt-4">
        <p>
          不過更精確來說，太陽的直射位置會在南北回歸線之間變動，所以當你位在回歸線以內的區域時，
          太陽的位置不一定能準確判斷你在的半球。
        </p>
        <p>
          此外，因為地球自轉軸有傾斜的關係，當你位在極圈內時，太陽的方位也會出現異常，
          無法作為可靠的方向依據。
        </p>
      </div>

      {/* 圖示說明引導 */}
      <div className="bg-zinc-800/40 border border-zinc-700 rounded-lg p-4 text-base text-muted-foreground space-y-2">
        <p className="font-semibold">以下是四個常見的「反例」情境：</p>
        <ul className="list-none space-y-2 pl-0">
          <li>1️⃣ 你在 <strong>北極圈內</strong>，但太陽在你的<strong>北邊</strong>，因為你在地球的另一頭。</li>
          <li>2️⃣ 你在 <strong>北半球</strong>，但太陽在你的<strong>北邊</strong>（直射 <strong>北回歸線</strong> 時）。</li>
          <li>3️⃣ 你在 <strong>南極圈內</strong>，但太陽在你的<strong>南邊</strong>，因為你在地球的另一頭。</li>
          <li>4️⃣ 你在 <strong>南半球</strong>，但太陽在你的<strong>南邊</strong>（直射 <strong>南回歸線</strong> 時）。</li>
        </ul>
      </div>
      <p>
        <strong>其餘的情況都能套用通則：</strong>當你位在北半球時，太陽會出現在南方；
        當你位在南半球時，太陽則會在北方。
      </p>
      <Zoom>
        <img
          src="/sun_position/sun_and_axial_tilt.jpg"
          alt="太陽直射位置與地軸傾角示意圖"
          className="mt-2 rounded-lg border border-zinc-700 shadow-md w-full"
        />
        <p className="mt-2 text-sm text-muted-foreground text-center">
          資料來源：{" "}
          <a
            href="https://en.wikipedia.org/wiki/Circle_of_latitude"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white "
          >
            Wikipedia - Circle of latitude
          </a>
        </p>
      </Zoom>

      <p className="mt-6">下圖是完整的緯度覆蓋範圍：</p>
      <Zoom>
        <img
          src="/sun_position/World_map_with_major_latitude_circles.png"
          alt="世界地圖與主要緯線（赤道、回歸線、極圈）"
          className="mt-2 w-full rounded-lg border border-zinc-700 shadow-md"
        />
      </Zoom>
      <p className="mt-2 text-sm text-muted-foreground text-center">
        資料來源：{" "}
        <a
          href="https://en.wikipedia.org/wiki/Circle_of_latitude"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white"
        >
          Wikipedia - Circle of latitude
        </a>
      </p>
      <h2 className="text-xl font-bold text-white mb-4">衛星接收器</h2>
      <div className="mt-4 space-y-4">
        <p>
          同步軌道通訊衛星（Geostationary Satellite）是指繞著地球赤道運行、且轉速與地球自轉一致的衛星。<br />
          它們位在赤道正上方約 35,786 公里的「地球同步軌道」（Geostationary Orbit）上，從地面看起來，就像是固定在天空中的某個位置。<br /><br />
          因為這些衛星全都排列在赤道上空的同一條圓環軌道上，地面上的接收天線要對準衛星，其實就是對準赤道方向。<br /><br />
          換句話說，只要你看到衛星天線面對的角度，其實就是赤道所在的方向。
        </p>

        {/* 左右並排圖片區塊 */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* 北半球接收器 */}
          <div className="flex-1 text-center space-y-2">
            <img
              src="/sun_position/satellite_dish_north.jpg"
              alt="北半球衛星接收器"
              className="w-full rounded-md border border-zinc-700 shadow-md"
            />
            <p className="text-sm text-muted-foreground">北半球：衛星接收器朝向南方（赤道方向）</p>
          </div>

          {/* 南半球接收器 */}
          <div className="flex-1 text-center space-y-2">
            <img
              src="/sun_position/satellite_dish_south.jpg"
              alt="南半球衛星接收器"
              className="w-full rounded-md border border-zinc-700 shadow-md"
            />
            <p className="text-sm text-muted-foreground">南半球：衛星接收器朝向北方（赤道方向）</p>
          </div>
        </div>
      </div>
    </div>
  );
}
