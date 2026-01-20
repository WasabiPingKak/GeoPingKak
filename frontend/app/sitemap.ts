import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://geopingkak.web.app';

  const routes = [
    '',
    '/daily-challenge',
    '/tutorial',
    '/special-maps',
    '/glossary',
    '/qna',
    '/quick-reference/br',
    '/quick-reference/id',
    '/recommend_settings',
    '/source',
    '/community-maps',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/daily-challenge' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/tutorial' ? 0.9 : 0.8,
  }));
}
