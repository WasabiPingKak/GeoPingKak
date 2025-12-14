// glossary.ts
// Glossary(名詞解釋)資料來源：資料順序不重要，前端顯示時會自行做字典排序與搜尋 filter。

export type GlossaryImage = {
  /** 外部圖片 URL(使用 <img> 顯示，不走 next/image) */
  src: string;
  /** 圖片替代文字(無障礙/SEO) */
  alt: string;
  /** 選填：圖片說明文字(若未來需要可顯示在圖下方) */
  caption?: string;
};

export type GlossaryEntry = {
  /** 名詞(顯示用標題) */
  title: string;

  /**
   * 解釋內容(支援多段落與簡易 Markdown)
   * 建議使用 `\n\n` 分段；列表用 `-` 或 `1.`。
   */
  content: string;

  /** 圖片(0~n 張) */
  images?: GlossaryImage[];
};

/**
 * 名詞解釋清單
 * - 資料順序不重要(前端顯示會排序)
 * - content 支援簡易 markdown
 */
export const glossaryEntries: GlossaryEntry[] = [
  {
    title: "Map - ACW (A Community World)",
    content:
      "牌位賽中一張有名的競賽用地圖名稱，通常用於金牌以上的牌位。\n\n",
    images: [],
  },
  {
    title: "Map - The World",
    content:
      "牌位賽中一張有名的競賽用地圖名稱，只會出現大城市或首都，通常用於銅牌與銀牌。\n\n",
    images: [],
  },
  {
    title: "Map - An Informed World",
    content:
      "牌位賽中一張有名的競賽用地圖名稱，這張圖會把你放在 2 km 內有人居住的地方。\n\n",
    images: [],
  },
  {
    title: "Map - An Official World",
    content:
      "牌位賽中一張有名的競賽用地圖名稱，曾經使用於 2023 年的 GeoGuess 世界賽，現在通常用於金牌以上的牌位。\n\n",
    images: [],
  },
  {
    title: "Map - A Balanced {X}",
    content:
      "使用 **A Balanced** 開頭的社群地圖，通常代表這張地圖經過人工調整與平衡。\n\n" +
      "製作者會刻意控制出題分佈，避免題目過度集中在市中心或特定行政區，並在市區、郊區與不同區域之間分配較為平均的出題機率。\n\n" +
      "這類地圖的目標是減少極端偏題情況，讓每一局遊戲的整體體驗更加公平、穩定且具有一致性。",
    images: [],
  },
  {
    title: "Map - An Arbitrary Rural World (AARW)",
    content:
      "牌位賽中一張有名的競賽用地圖名稱，通常用於大師以上的牌位。\n\n" +
      "混合了 **An Arbitrary World** 與 **A Dirty World** 兩張地圖的題目特性。\n\n" +
      "這張地圖主打的是**全球範圍的鄉村與非城市地區**。\n\n",
  },
  {
    title: "Moving / Move / MV",
    content:
      "遊戲模式的一種，可以自由移動、旋轉、縮放鏡頭。\n\n",
    images: [],
  },
  {
    title: "No Move / NM",
    content:
      "遊戲模式的一種，不能移動，但是可以旋轉、縮放鏡頭。\n\n" +
      "NM 因為是遊戲中公認最公平的遊戲模式，因為所有人可以獲取的資訊量都是相同的，也不存在運氣成分。",
    images: [],
  },
  {
    title: "No Move Pan Zoom / NMPZ",
    content:
      "遊戲模式的一種，不能移動，不能旋轉、也不能縮放鏡頭，相當於看著一張靜態的照片。\n\n" +
      "螢幕的解析度會影響 NMPZ 可視範圍的邊界，超寬螢幕 (21:9、32:9) 會比傳統的寬螢幕 (16:9) 在橫向範圍看到更多資訊。",
    images: [],
  },
  {
    title: "5K",
    content:
      "在 GeoGuessr 中，**5K** 指的是單題可取得的**滿分 5000 分**。\n\n" +
      "是否能拿到 5K，取決於你放置標記的位置是否落在系統允許的**滿分判定範圍**內。這個可容許的最大誤差，會隨著地圖尺度有所不同。\n\n" +
      "能夠拿到 5K 的位置，通常也會被稱為 **Pinpointable**，代表該題目存在明確且可精確定位的參照點。",
  },
  {
    title: "Hedge",
    content:
      "當你**無法確定正確位置**，但大致知道答案落在哪個區域時，所採取的一種**保守猜測策略**。\n\n" +
      "與其冒險把標記放在可能完全錯誤的地方，Hedge 的做法是選擇一個「**就算猜錯，損失也不會太大的位置**」，例如整個推測範圍的中間或較安全的地點。\n\n" +
      "簡單來說，Hedge 不是為了拿高分，而是為了**避免一次猜錯就扣掉大量分數**。",
  },
  {
    title: "Gen 1 / Gen 2 / Gen 3 / Gen 4 (街景車世代)",
    content:
      "Street View 影像通常會被玩家用「街景車世代(Generation)」分類，方便描述畫質、色調、模糊方式、鏡頭特徵等。\n\n" +
      "每個世代都有屬於自己的畫面特色。",
  },
  {
    title: "Low Cam",
    content:
      "在日本與瑞士因應國家的隱私法規，街景車的相機高度會比其他國家還要來的更低，街景車本體打碼 (blur) 會更大。\n\n",
  },
  {
    title: "Small Cam",
    content:
      "Google 在 2025 年開始投入的相機世代，也有人視為第五代 (Gen 5)，但社群中一般都稱 Small Cam。\n\n" +
      "街景車本體打碼 (blur) 會接近正圓形，但車頭會有一塊突出。\n\n",
  },
  {
    title: "Shit Cam",
    content:
      "不屬於任何世代的街景車相機，通常是使用了第三方相機，或者參數調壞的相機。\n\n" +
      "最具代表性的 Shit Cam 為印度與黎巴嫩的街景。",
  },
  {
    title: "Trekker / Tripod (徒步街景 / 腳架)",
    content:
      "也就是由人背著相機拍攝的街景，blur會是較小的人形，可能背著任何世代的相機，也有可能使用腳架單點攝影。\n\n" +
      "通常是 Gen 2 / Gen 3 / Gen 4，2025 年開始有大量市區的 Gen 4。\n\n" +
      "Trekker 會出現在汽車無法抵達的區域，通常官方的 Trekker 會出現在具有歷史、地理意義的地點，或是室內。",
  },
  {
    title: "Blur",
    content:
      "通常是指街景車本身的模糊處理，又稱做打碼。\n\n" +
      "Blur 的形狀是 Car Meta 的一種。",
  },
  {
    title: "Bollard (路側反光柱 / 路樁)",
    content:
      "道路旁常見的反光柱或導引柱，玩家常用它來判斷國家或地區。\n\n",
  },
  {
    title: "Plate (車牌)",
    content:
      "路上的汽車車牌樣式與顏色通常可以用來判斷國家或地區，比如歐盟的車牌就有獨特的樣式。\n\n",
  },
  {
    title: "Poles (電線桿)",
    content:
      "這個詞專門指電線桿，而不是路樁 (bollard)。\n\n",
  },
  {
    title: "Meta",
    content:
      "廣義的 Meta 通常指「能用來判斷位置的線索集合」。\n\n" +
      "例如：車子樣式 (Car Meta)、電線桿、路牌字體、護欄端點、地面標線、郵遞區號格式等。\n\n" +
      "將任何可觀察到的資訊整理成「可重複使用的判斷方法」。\n\n" +
      "**而狹義的 Meta 指的通常是 Car Meta。**",
  },
  {
    title: "Car Meta",
    content:
      "指 Street View 街景車或車身痕跡 (如車頂、後照鏡、行李架、車身顏色、天線、涉水喉、blur 的形狀) 所提供的線索。\n\n" +
      "除了街景車車體本身，以下的資訊通常也會被視為 Car Meta：\n\n" +
      "- 相機世代：Gen 1~4 / Small Cam / Low Cam / Shit Cam / Trekker\n" +
      "- 街景車行駛的方向。\n" +
      "- 街景拍攝當下的天氣、季節。\n" +
      "- 街景照片上的浮水印年份。\n" +
      "- 鏡頭 / 照片上的瑕疵或汙漬。\n" +
      "\n\n**Car Meta 可能會隨著時間過去，被最新的街景資料覆蓋掉。**",
  },
  {
    title: "POI (Point of Interest)",
    content:
      "地圖上可辨識的地標或重要設施，例如加油站、超商、體育場、車站、橋梁、河流交會點等。\n\n" +
      "POI 常用於：\n" +
      "- 有明確地名或方向牌時，快速在地圖上定位\n" +
      "- 沒有地名時，靠地形/道路形狀去比對\n\n"
  },
  {
    title: "Region Guess",
    content:
      "在你已經確定國家之後，進一步縮小猜測範圍的判斷行為稱為 Region Guess。\n\n" +
      "這個步驟可能是定位到特定的行政區(例如省、州、縣)，也可能只是根據線索判斷大致位於該國家的東、西、南、北哪一側。"
  },
  {
    title: "Vibe (氛圍)",
    content:
      "當玩家對一個特定的區域、國家非常熟悉的時候，不需要具體的線索就靠畫面的氛圍 (vibe) 進行猜測。\n\n"
  },
  {
    title: "Urban / Rural (城市 / 鄉村)",
    content:
      "就是字面上的意思，但即使是同一個國家，在市區與鄉村能使用的線索與策略不同，所以還是會進行區分。\n\n"
  },
  {
    title: "Area Code (電話區碼)",
    content:
      "有時候你可以在街上看到帶著電話區碼的廣告，區碼通常可以定位區具體的行政區。\n\n"
  },
  {
    title: "Follow Car (保姆車)",
    content:
      "有些國家或地區會有隨行的警車或軍用車，Follow Car 最有名的國家為奈及利亞與突尼西亞。\n\n"
  },
  {
    title: "Copyright (版權浮水印)",
    content:
      "Google Street 的全景照片上都會有帶著 logo 與年份的版權浮水印。\n\n" +
      "Copyright 是 Car Meta 的一種。"
  },
  {
    title: "Pinpointable",
    content:
      "當我們說一張地圖或一個題目是 **Pinpointable**，代表該位置可以被**精確定位到地圖上的某一個點**；若無法做到這件事，則通常會稱為 **Unpinpointable**。\n\n" +
      "Pinpointable 的點通常具備以下特徵：\n" +
      "- 有明確結構的岔路或路口\n" +
      "- 道路與鐵路的交會點(平交道)\n" +
      "- 道路與河流的交會點(橋樑)\n" +
      "- 橋樑與平面道路的交會點\n" +
      "- 彎道的起點或終點\n" +
      "- 具有明確辨識度的建築物或地標作為參照\n\n" +
      "Unpinpointable 的點則通常具有以下特徵：\n" +
      "- 筆直且長距離沒有變化的道路\n" +
      "- 沒有道路結構的地點(例如公園或自然景觀內)\n" +
      "- 大型建築物的內部空間\n" +
      "- 地下結構的內部空間\n" +
      "- 船隻上拍攝的位置\n" +
      "- 空拍或無法對應地面結構的視角\n",
  },
  {
    title: "Official / Unofficial coverage (官方 / 非官方街景覆蓋) ",
    content:
      "GeoGuessr 是建立在 Google 街景(Google Street View)之上，因此所謂的 **官方街景覆蓋(Official coverage)**，指的是**由 Google 官方拍攝並發布的街景影像**。\n\n" +
      "此外，在 Google 地圖上也存在由使用者自行上傳的影像，這類影像通常被稱為 **非官方街景覆蓋(Unofficial coverage)**。其中最常見的形式是 **照片球(photospheres)**，也就是多半使用手機或簡易設備拍攝的 360 度全景照片。\n\n" +
      "你有時也會遇到所謂的 **非官方車輛覆蓋**，社群中常暱稱為「Ari」。這類影像的拍攝方式類似 Google 的街景車，但並非由 Google 官方製作，影像品質與穩定性通常明顯較低。\n\n" +
      "在 **競技型地圖(Competitive maps)** 中，為了確保公平性與一致性，**只會使用官方街景覆蓋**，不會包含任何非官方影像。",
  },
  {
    title: "Panorama (Pano)",
    content:
      "Panorama 通常簡稱為 **Pano**，指的是街景中**單一且精確的位置點**。\n\n" +
      "在街景畫面中，每一次向前移動或點擊，實際上都會切換到**另一個不同的 Panorama**，也就是另一個拍攝位置。\n\n" +
      "因此，Panorama 不只是畫面本身，而是代表街景影像在地圖上對應的**具體定位點**。",
  },
  {
    title: "Challenge Link",
    content:
      "Challenge Link 是 GeoGuessr 提供的一種**官方遊戲模式**。\n\n" +
      "由**付費訂閱的玩家**建立，並由建立者決定遊戲的各項設定，包括：\n" +
      "- 遊玩模式（Move / No Move / NMPZ）\n" +
      "- 每題的時間限制\n" +
      "- 使用的地圖\n\n" +
      "系統會依照這些設定產生一組**固定五題**的遊戲連結，任何玩家都可以透過該連結**免費遊玩**，即使沒有訂閱 GeoGuessr 也能參與。",
  },
  {
    title: "Rainbolt",
    content:
      "Rainbolt 是一位**知名的 GeoGuessr 頂尖玩家與內容創作者**，以極高的判斷速度與準確度聞名。\n\n" +
      "他擅長利用各種細微線索（例如道路樣式、路側設施、地形、植被、街景特徵等），在極短時間內判斷出拍攝地點，甚至能在數秒內完成高精度猜測。\n\n" +
      "Rainbolt 的影片與直播對 GeoGuessr 社群影響很大，也讓許多玩家開始學習與整理所謂的「meta 線索」。",
  }
];
