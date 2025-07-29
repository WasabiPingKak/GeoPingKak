// components/daily-challenge/mockData.ts

export interface DailyChallengeEntry {
  country: string;
  mapId: string;
  challengeUrl: string;
  createdAt: string;
}

export const MOCK_DAILY_CHALLENGES: DailyChallengeEntry[] = [
  // 🌍 世界地圖 A
  {
    country: "世界",
    mapId: "world-a",
    challengeUrl: "https://geoguessr.com/challenge/123abc",
    createdAt: "2025-07-29",
  },
  {
    country: "世界",
    mapId: "world-a",
    challengeUrl: "https://geoguessr.com/challenge/aaa001",
    createdAt: "2025-07-28",
  },
  {
    country: "世界",
    mapId: "world-a",
    challengeUrl: "https://geoguessr.com/challenge/aaa002",
    createdAt: "2025-07-27",
  },

  // 🌍 世界地圖 B
  {
    country: "世界",
    mapId: "world-b",
    challengeUrl: "https://geoguessr.com/challenge/456def",
    createdAt: "2025-07-28",
  },
  {
    country: "世界",
    mapId: "world-b",
    challengeUrl: "https://geoguessr.com/challenge/bbb001",
    createdAt: "2025-07-27",
  },

  // 🇹🇼 台灣街景初級
  {
    country: "台灣",
    mapId: "tw-basic",
    challengeUrl: "https://geoguessr.com/challenge/789ghi",
    createdAt: "2025-07-29",
  },
  {
    country: "台灣",
    mapId: "tw-basic",
    challengeUrl: "https://geoguessr.com/challenge/ccc001",
    createdAt: "2025-07-28",
  },

  // 🇹🇼 台灣地標挑戰
  {
    country: "台灣",
    mapId: "tw-landmark",
    challengeUrl: "https://geoguessr.com/challenge/101jkl",
    createdAt: "2025-07-28",
  },
  {
    country: "台灣",
    mapId: "tw-landmark",
    challengeUrl: "https://geoguessr.com/challenge/ccc002",
    createdAt: "2025-07-27",
  },

  // 日本

  {
    country: "日本",
    mapId: "jp-urban",
    challengeUrl: "https://geoguessr.com/challenge/ccc002",
    createdAt: "2025-07-27",
  },
  {
    country: "日本",
    mapId: "jp-balanced",
    challengeUrl: "https://geoguessr.com/challenge/101jkl",
    createdAt: "2025-07-28",
  },

  // 🇲🇾 馬來西亞
  {
    country: "馬來西亞",
    mapId: "my-main",
    challengeUrl: "https://geoguessr.com/challenge/mymap",
    createdAt: "2025-07-29",
  },
  {
    country: "馬來西亞",
    mapId: "my-main",
    challengeUrl: "https://geoguessr.com/challenge/mymap2",
    createdAt: "2025-07-28",
  },

  // 🇭🇰 香港
  {
    country: "香港",
    mapId: "hk-main",
    challengeUrl: "https://geoguessr.com/challenge/hkmap",
    createdAt: "2025-07-29",
  },
  {
    country: "香港",
    mapId: "hk-main",
    challengeUrl: "https://geoguessr.com/challenge/hkmap2",
    createdAt: "2025-07-28",
  },
];
