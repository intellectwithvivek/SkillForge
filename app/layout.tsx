import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider, ToastProvider, themeScript } from '@the_viveksingh/vivek-ui'

import '@the_viveksingh/vivek-ui/styles.css'
import '@the_viveksingh/vivek-ui/charts.css'
import './globals.css'

import { SiteNavbar } from '@/components/site/site-navbar'
import { SiteFooter } from '@/components/site/site-footer'
import { JsonLd } from '@/components/site/json-ld'
import { organisationLd, websiteLd } from '@/lib/seo'
import { SITE } from '@/lib/site'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Free Next.js Online Course / LMS Template — SkillForge | VivekUI',
    template: '%s | SkillForge',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: 'Vivek Kumar Singh', url: 'https://vivekkumarsingh.in/' }],
  creator: 'Vivek Kumar Singh',
  publisher: 'Vivek Kumar Singh',
  keywords: [
    'free nextjs online course template',
    'nextjs LMS template',
    'react course marketplace template',
    'open source LMS template',
    'nextjs 16 template',
    'VivekUI',
    'react component library',
    'free nextjs template',
  ],
  category: 'education',
  alternates: { canonical: SITE.url },
  openGraph: {
    type: 'website',
    url: SITE.url,
    siteName: SITE.name,
    locale: SITE.locale,
    title: 'Free Next.js Online Course / LMS Template — SkillForge | VivekUI',
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Next.js Online Course / LMS Template — SkillForge | VivekUI',
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/*
          Blocking, synchronous, and deliberately not React's job: the server cannot know
          this visitor's stored theme, so without this the first paint is the wrong colour.
        */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider defaultTheme="system">
          <ToastProvider position="bottom-end" duration={4500}>
            <a className="sf-skip" href="#sf-main">
              Skip to content
            </a>
            <SiteNavbar />
            <main id="sf-main">{children}</main>
            <SiteFooter />
          </ToastProvider>
        </ThemeProvider>
        <JsonLd data={organisationLd()} />
        <JsonLd data={websiteLd()} />
      </body>
    </html>
  )
}
