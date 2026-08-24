import type { MetadataRoute } from 'next'
import { COURSES } from '@/data/courses'
import { absolute } from '@/lib/site'

/**
 * Every indexable URL.
 *
 * Course pages carry their own `updatedAt` as `lastModified`, so a re-recorded module
 * is a real signal to a crawler rather than a build timestamp that changes on every
 * deploy whether anything changed or not.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absolute('/'), changeFrequency: 'weekly', priority: 1 },
    { url: absolute('/courses'), changeFrequency: 'weekly', priority: 0.9 },
    { url: absolute('/built-with'), changeFrequency: 'monthly', priority: 0.6 },
    { url: absolute('/dashboard'), changeFrequency: 'monthly', priority: 0.4 },
  ]

  const courseRoutes: MetadataRoute.Sitemap = COURSES.map((course) => ({
    url: absolute(`/courses/${course.slug}`),
    lastModified: course.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
    images: [course.cover],
  }))

  return [...staticRoutes, ...courseRoutes]
}
