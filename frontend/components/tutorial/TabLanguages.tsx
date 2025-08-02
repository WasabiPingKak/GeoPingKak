// components/tutorial/TabLanguages.tsx

import React from "react";

export default function TabLanguages() {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">語言</h2>

      <p>
        遊戲中出現的文字是辨識地點的黃金線索之一，不論是路標、商店招牌、廣告看板還是車身標語，只要能辨認語言，就能大幅縮小範圍。
      </p>

      <p>
        常見例子包括：
        <ul className="list-disc list-inside ml-4">
          <li>西班牙文與葡萄牙文差異微妙，分辨兩者有助於判斷是拉丁美洲還是葡萄牙/巴西。</li>
          <li>英文在許多國家出現，但若搭配當地語言可判別是否為前英殖民地（如肯亞、菲律賓）。</li>
          <li>希臘文、泰文、韓文、日文等字母系統明確，可快速定錨地區。</li>
          <li>斯拉夫語系（如俄文、保加利亞文）使用西里爾字母，與拉丁字母明顯不同。</li>
        </ul>
      </p>

      <p>
        注意，有些國家存在多語併用，例如比利時使用荷蘭文與法文、瑞士則有德語、法語、義大利語，需留意地區性的變化。
      </p>

      <p>
        如果遇到不熟悉的語言，也可根據字形結構初步推測語系，再輔以其他線索交叉確認。
      </p>
    </div>
  );
}
