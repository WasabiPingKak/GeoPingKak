// 將 JSON-LD 結構化資料直接輸出在初始 HTML 裡，不靠瀏覽器端 JS 注入，
// 讓不執行 JS 的爬蟲與 Rich Results Test 的「原始 HTML」視角也讀得到。
// 不要改回 next/script：它會等 hydration 之後才插入，初始 HTML 裡看不到。
type JsonLdProps = {
  data: object;
};

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // 把 < 跳脫成 <，避免資料內容出現 </script> 提早關閉標籤
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
