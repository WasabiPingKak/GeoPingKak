import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/show-proposals'],
    },
    sitemap: 'https://geopingkak.web.app/sitemap.xml',
  };
}
