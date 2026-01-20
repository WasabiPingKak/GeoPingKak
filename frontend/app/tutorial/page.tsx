// app/tutorial/page.tsx (Server Component)

import Script from "next/script";
import { generateMetadata } from "./metadata";
import ClientPage from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      {/* HowTo 結構化資料 */}
      <Script id="tutorial-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "GeoGuessr 新手入門攻略 - 六大辨識原則",
          "description": "教你如何透過街景覆蓋、車牌、國旗、道路方向、太陽位置等六大原則，快速辨識 GeoGuessr 中的國家位置",
          "inLanguage": "zh-TW",
          "step": [
            {
              "@type": "HowToStep",
              "name": "了解街景覆蓋國家",
              "text": "全球只有約 100 個國家有 Google 街景，掌握這個範圍就能快速縮小可能性"
            },
            {
              "@type": "HowToStep",
              "name": "辨識國旗與網域",
              "text": "觀察路邊標誌、廣告、網址中的國旗和網域後綴"
            },
            {
              "@type": "HowToStep",
              "name": "識別車牌特徵",
              "text": "不同國家的車牌顏色、形狀、文字有明顯差異"
            },
            {
              "@type": "HowToStep",
              "name": "觀察道路通行方向",
              "text": "靠左行駛的國家相對少數，是重要的判斷依據"
            },
            {
              "@type": "HowToStep",
              "name": "判斷太陽位置",
              "text": "太陽方位可以判斷南北半球與緯度範圍"
            }
          ]
        })}
      </Script>

      <ClientPage />
    </>
  );
}
