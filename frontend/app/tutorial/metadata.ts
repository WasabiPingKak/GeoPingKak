import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 新手入門攻略 | 車牌、國旗、街景覆蓋完整教學 - GeoPingKak",
    description: "從零開始學 GeoGuessr！六大基本原則教你快速辨識國家：街景覆蓋範圍、車牌特徵、國旗與網域、道路通行方向、太陽位置。適合新手的完整中文攻略，不靠死背也能推理。",
    openGraph: {
      title: "GeoGuessr 新手攻略 | 六大辨識技巧完整教學 - GeoPingKak",
      description: "街景覆蓋、車牌、國旗、通行方向、太陽位置...從觀察世界開始，建立你的推理邏輯。適合新手的 GeoGuessr 中文教學。",
      url: "https://geopingkak.web.app/tutorial",
      siteName: "GeoPingKak",
      locale: "zh_TW",
      type: "article",
      images: [
        {
          url: "https://geopingkak.web.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "GeoGuessr 新手入門攻略 - GeoPingKak",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GeoGuessr 新手入門攻略 - GeoPingKak",
      description: "六大基本原則教你快速辨識國家，不靠死背也能推理。適合新手的完整中文教學。",
      images: ["https://geopingkak.web.app/og-image.png"],
    },
    alternates: {
      canonical: "https://geopingkak.web.app/tutorial",
    },
  };
}
