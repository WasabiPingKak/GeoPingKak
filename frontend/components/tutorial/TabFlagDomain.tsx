// components/tutorial/TabFlagDomain.tsx

import React from "react";

export default function TabFlagDomain() {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">國旗 / 網域</h2>

      <p>
        國旗和網址網域是 GeoGuessr 中最直觀的線索之一。許多政府機關、學校或公共建築都會掛上國旗，若能辨認出該國國旗，可以直接判斷所在國家。
      </p>

      <p>
        此外，網站連結、信箱或車體上的網址，也常包含國碼，例如：
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
        有些國家的國旗相似，像是羅馬尼亞與查德、印尼與摩納哥，因此需配合其他線索做交叉判斷。
      </p>

      <p>
        特別要注意的是，部分跨國企業可能使用國際域名（如
        <span className="inline-block bg-zinc-800 px-2 py-0.5 rounded ml-1">
          .com
        </span>
        ），這種情況就不能直接當作地理判斷依據。
      </p>
    </div>
  );
}
