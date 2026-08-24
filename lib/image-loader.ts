'use client'

/**
 * A custom `next/image` loader that resizes at the source CDN instead of at ours.
 *
 * Why this exists: the default loader routes every image through `/_next/image`,
 * which on Vercel is a metered Image Optimization transform. Once a project runs
 * out of them the endpoint answers `402 Payment Required` and every image on the
 * site breaks at once — a bad failure mode for a free template that people are
 * meant to clone and deploy on a Hobby plan.
 *
 * Unsplash serves its images through an imgix CDN that already does the work for
 * free: `w` resizes, `q` sets quality, and `auto=format` negotiates AVIF or WebP
 * from the browser's Accept header. So we hand Next the CDN URL for the exact
 * width it asked for, `srcset` stays fully responsive, and no transform is billed
 * to anyone.
 *
 * Configured globally through `images.loaderFile`, because the per-image `loader`
 * prop is a function and would force every card into a client component.
 *
 * Anything that is not a known transform-capable host is returned untouched, so a
 * local file in `/public` or an image from another origin still renders — just at
 * its natural size. Add a case here if you bring in a CDN of your own.
 */

interface LoaderArgs {
  src: string
  width: number
  quality?: number
}

/** Hosts whose CDN understands `w` / `q` / `auto=format`. */
const TRANSFORM_HOSTS = new Set(['images.unsplash.com'])

export default function imageLoader({ src, width, quality }: LoaderArgs): string {
  // Relative sources (`/cover.png`) have no origin to rewrite — serve them as-is.
  if (!src.startsWith('http://') && !src.startsWith('https://')) return src

  let url: URL
  try {
    url = new URL(src)
  } catch {
    return src
  }

  if (!TRANSFORM_HOSTS.has(url.hostname)) return src

  // `set` rather than `append`: the stored cover URLs already carry `?w=1200&q=80`,
  // and appending would leave the CDN reading whichever duplicate it saw first.
  url.searchParams.set('w', String(width))
  url.searchParams.set('q', String(quality ?? 75))
  url.searchParams.set('auto', 'format')
  url.searchParams.set('fit', 'crop')

  return url.toString()
}
