import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // 在 render 之前就回 308，Firebase Hosting 部署時會把這條轉成 CDN 層的 redirect。
  // 不能用 page.tsx 裡的 redirect()：靜態頁會退化成客戶端轉址，搜尋引擎看到的是 200。
  redirects: async () => [
    { source: "/tutorial", destination: "/tutorial/intro", permanent: true },
  ],
};

export default nextConfig;
