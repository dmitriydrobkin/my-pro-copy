import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://malyshev.dev';
  
  const staticPaths = [
    '',
    '/about',
    '/contact',
    '/privacy'
  ];

  const routes = staticPaths.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  const allRoutes = [...routes];
  const ruRoutes = allRoutes.map(route => ({
    ...route,
    url: route.url.replace(baseUrl, `${baseUrl}/ru`),
  }));

  return [...allRoutes, ...ruRoutes];
}
