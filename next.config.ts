import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    /*
      Resize at the source CDN rather than through `/_next/image`.

      Vercel meters Image Optimization transforms, and a project that runs out
      gets `402 Payment Required` on every single image — the whole site's
      artwork disappears at once. This template is meant to be cloned and
      deployed on a Hobby plan, so it does not depend on that quota: Unsplash's
      own CDN does the resizing and format negotiation for free.

      See lib/image-loader.ts. Delete these two lines to go back to the built-in
      optimizer; `remotePatterns` below is what it needs and is kept for that.
    */
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',

    /*
      Next's default `deviceSizes` tops out at 3840, which becomes the plain
      `src` fallback on every image. For this site that is a 1.17 MB rendition
      of a card that paints at about 336 px — and Unsplash spends ten seconds
      encoding it the first time anyone asks.

      The largest image here is the course preview at roughly 700 px CSS, so
      1920 still covers a 2x display with room to spare. Raise it if you add a
      full-bleed hero.
    */
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920],

    // Next.js 16: `images.domains` is deprecated — remotePatterns only.
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
}

export default nextConfig
