import type { MetadataRoute } from 'next'
import { absolute } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Filter permutations are the same eight courses in a different order.
        disallow: ['/api/', '/*?category=', '/*?level=', '/*?free='],
      },
    ],
    sitemap: absolute('/sitemap.xml'),
    host: absolute('/'),
  }
}
