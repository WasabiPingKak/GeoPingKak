/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://geopingkak.web.app",
  generateRobotsTxt: true, // 自動產生 robots.txt
  generateIndexSitemap: false,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [], // 若有不想收錄的頁面可列在這
};
