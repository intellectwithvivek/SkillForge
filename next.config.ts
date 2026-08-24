import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
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
