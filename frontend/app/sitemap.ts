import { MetadataRoute } from 'next';
import { PAGE_MODIFIED, type PagePath } from '@/data/pageDates';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://geopingkak.web.app';

  // /tutorial 本身是 308 轉址到 /tutorial/intro（見 next.config.ts），不列入
  const routes: PagePath[] = [
    '/',
    '/daily-challenge',
    '/tutorial/intro',
    '/tutorial/street-coverage',
    '/tutorial/flags-domains',
    '/tutorial/driving-side',
    '/tutorial/sun-position',
    '/tutorial/license-plates',
    '/special-maps',
    '/glossary',
    '/qna',
    '/quick-reference/br',
    '/quick-reference/id',
    '/recommend_settings',
    '/source',
    '/community-maps',
    '/about',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: PAGE_MODIFIED[route],
    changeFrequency: route === '/daily-challenge' ? 'daily' : 'weekly',
    priority: priorityOf(route),
  }));
}

function priorityOf(route: PagePath): number {
  if (route === '/') return 1.0;
  if (route.startsWith('/tutorial')) return 0.9;
  // 作者頁只是給搜尋引擎確認作者實體用，不需要高優先度
  if (route === '/about') return 0.5;
  return 0.8;
}
