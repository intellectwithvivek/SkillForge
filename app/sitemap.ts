import type { MetadataRoute } from 'next'
import { COURSES } from '@/data/courses'
import { absolute } from '@/lib/site'

/**
 * Every indexable URL.
 *
 * Course pages carry their own `updatedAt` as `lastModified`, so a re-recorded
 * module is a real signal to a crawler rather than a build timestamp that changes
 * on every deploy whether anything changed or not.
 */

/**
 * Next interpolates sitemap values straight into the XML — `<loc>${url}</loc>`
 * and `<image:loc>${image}</image:loc>`, with no escaping anywhere. A single
 * raw `&` in a URL therefore makes the whole document unparseable, and nothing
 * warns you: the build succeeds and the file only fails when a crawler or a
 * validator reads it.
 *
 * So the contract is ours to keep. This throws at build time rather than
 * shipping a sitemap that silently cannot be parsed.
 */
function xmlSafe(url: string, field: string): string {
  const offender = /[&<>"']/.exec(url)

  if (offender) {
    throw new Error(
      `sitemap: ${field} contains ${JSON.stringify(offender[0])}, which Next writes into ` +
        `the XML unescaped and which makes the document malformed.\n  ${url}\n` +
        `Remove the character from the URL — see sitemapImage() for how the course ` +
        `covers drop their query string.`,
    )
  }

  return url
}

/**
 * The canonical form of a cover image, for the image sitemap.
 *
 * The stored URL carries Unsplash resize parameters (`?w=1200&q=80`) whose `&`
 * would break the XML. They are dropped rather than escaped: an image sitemap
 * should point at the canonical asset, not at one rendition of it, so there is
 * nothing to escape in the first place and no dependence on whether Next ever
 * starts escaping.
 */
function sitemapImage(src: string): string {
  const url = new URL(src)
  url.search = ''
  return xmlSafe(url.toString(), 'image')
}

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
    images: [sitemapImage(course.cover)],
  }))

  return [...staticRoutes, ...courseRoutes].map((entry) => ({
    ...entry,
    url: xmlSafe(entry.url, 'url'),
  }))
}
