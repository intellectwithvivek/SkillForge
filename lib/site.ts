/**
 * Site-wide constants and the UTM helper every outbound VivekUI link goes through.
 *
 * Attribution links are built here rather than written by hand so the campaign tag
 * cannot drift between the navbar, the footer and the /built-with table.
 */

export const SITE = {
  name: 'SkillForge',
  tagline: 'Learn by shipping',
  description:
    'A free, open-source Next.js 16 course marketplace and LMS template. Eight mock tech courses, a learner dashboard, curriculum accordions and SVG charts — built entirely with VivekUI.',
  url: 'https://skillforge.vivekkumarsingh.in',
  locale: 'en_US',
  repo: 'https://github.com/intellectwithvivek/SkillForge',
  repoName: 'intellectwithvivek/SkillForge',
} as const

export const VIVEKUI = {
  package: '@the_viveksingh/vivek-ui',
  install: 'npm i @the_viveksingh/vivek-ui',
  docs: 'https://ui.vivekkumarsingh.in/docs',
  components: 'https://ui.vivekkumarsingh.in/docs/components',
  npm: 'https://www.npmjs.com/package/@the_viveksingh/vivek-ui',
  github: 'https://github.com/intellectwithvivek/vivek_UI',
  author: 'https://vivekkumarsingh.in/',
  authorName: 'Vivek Kumar Singh',
  blurb:
    'Built with love using VivekUI — 91 React components · 6 SVG charts · zero runtime dependencies. One install, one CSS import, no config.',
} as const

/** The campaign slug for this template. Every outbound link carries it. */
export const UTM_CAMPAIGN = 'lms'

export type UtmMedium = 'navbar' | 'footer' | 'builtwith' | 'readme' | 'hero' | 'content'

/** Appends the template's UTM triplet to a VivekUI URL. */
export function utm(url: string, medium: UtmMedium): string {
  const joiner = url.includes('?') ? '&' : '?'
  return `${url}${joiner}utm_source=vivekui-template&utm_campaign=${UTM_CAMPAIGN}&utm_medium=${medium}`
}

/** Deep link to one component's documentation page, tagged for /built-with. */
export function componentDocs(name: string, medium: UtmMedium = 'builtwith'): string {
  return utm(`${VIVEKUI.components}/${name}`, medium)
}

/** An absolute URL on this site — needed by JSON-LD, which cannot use relative paths. */
export function absolute(path: string): string {
  return new URL(path, SITE.url).toString()
}
