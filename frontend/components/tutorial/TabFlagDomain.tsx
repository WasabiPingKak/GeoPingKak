import React, { useEffect, useState } from "react";
import FlagLovingGridByContinent from "@/components/tutorial/flags/FlagLovingGridByContinent";

// 將資料依照欄優先排序，分成每列 3 組（即 6 欄）
function columnFirstChunk(
  sorted: { domain: string; name: string }[],
  columnGroups = 3
) {
  const totalCells = sorted.length;
  const rows = Math.ceil(totalCells / columnGroups);

  // 初始化表格 [row][group]
  const table: ({ domain: string; name: string } | null)[][] = Array.from(
    { length: rows },
    () => Array(columnGroups).fill(null)
  );

  for (let i = 0; i < sorted.length; i++) {
    const col = Math.floor(i / rows);
    const row = i % rows;
    table[row][col] = sorted[i];
  }

  return table;
}

export default function TabFlagDomain() {
  const [countries, setCountries] = useState<{ domain: string; name: string }[]>([]);

  useEffect(() => {
    fetch("/data/countries.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort((a, b) =>
          a.domain.localeCompare(b.domain)
        );
        setCountries(sorted);
      })
      .catch(console.error);
  }, []);

  const highlightDomains = ["ch", "de", "rs", "hr", "kh", "sz", "ee", "es", "is", "ie", "za"];
  const highlightClass = "font-bold text-orange-400";

  const chunked = columnFirstChunk(countries, 3); // 分成每列 3 組（6欄）

  return (
    <div className="text-muted-foreground text-base leading-relaxed space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">國旗 / 網域</h2>

      <p>
        國旗和網址網域是 GeoGuessr 中最直觀的線索之一。許多政府機關、學校或公共建築都會掛上國旗，若能辨認出該國國旗，可以有效判斷所在國家。
      </p>

      <p>
        此外，網站連結、廣告看板、或車體上的網址，也常包含國碼，例如：
        <span className="inline-block bg-zinc-800 px-2 py-0.5 rounded ml-1">
          .br
        </span>{" "}
        表示巴西（Brazil），
        <span className="inline-block bg-zinc-800 px-2 py-0.5 rounded ml-1">
          .za
        </span>{" "}
        表示南非（South Africa）。
      </p>

      <p>
        國旗與網域也是不需要先背好才開始玩，隨著你常常在遊戲中看到，自然而然就會記住它們了。
      </p>

      <p>
        當然第一次看到可能要花一點功夫去查然後記住，但這畢竟是個遊戲，邊完邊學就足夠了，不用當作是考試一樣。
      </p>

      <p className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 font-semibold text-base text-orange-400">
        要特別注意的是，國旗與網域都是間接線索，你可能會在一個國家看到隔壁國家的廣告，而誤判你所在的區域。<br />
        比方說，會在義大利餐廳門口看到義大利國旗。
      </p>

      {/* 國旗特別常見的國家說明段落 */}
      <h2 className="text-2xl">國旗</h2>
      <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 space-y-2">
        <p className="font-semibold text-base text-white">
          以下是我在遊戲經驗中注意到，特別愛在路上掛國旗的國家。
        </p>
        <p className="text-sm text-muted-foreground">
          除了在街上很常看到國旗本身，街景中也常會看到有國旗元素的裝飾，值得留意一下先有個印象。
        </p>

        <FlagLovingGridByContinent countries={countries} />
      </div>

      <h2 className="text-2xl">網域</h2>
      <p className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 font-semibold text-base text-orange-400">
        橘色的網域是跟國家的英文名字有落差的網域，需要稍微注意
      </p>

      {/* 表格段落 */}
      <div className="overflow-x-auto border border-zinc-700 rounded-lg">
        <table>
          <tbody>
            {chunked.map((row, i) => (
              <tr key={i}>
                {row.map((country, j) =>
                  country ? (
                    <React.Fragment key={j}>
                      <td
                        className={`border px-2 py-1 align-top ${highlightDomains.includes(country.domain)
                          ? highlightClass
                          : ""
                          }`}
                      >
                        {country.domain}
                      </td>
                      <td
                        className={`border px-2 py-1 ${highlightDomains.includes(country.domain)
                          ? highlightClass
                          : ""
                          }`}
                      >
                        {country.name}
                      </td>
                    </React.Fragment>
                  ) : (
                    <React.Fragment key={`empty-${j}`}>
                      <td className="border px-2 py-1"></td>
                      <td className="border px-2 py-1"></td>
                    </React.Fragment>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}
