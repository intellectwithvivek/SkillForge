import Link from 'next/link'
import { Button, Flex, Footer, Stack, Text } from '@the_viveksingh/vivek-ui'
import { ProgressRing } from '@the_viveksingh/vivek-ui/charts'
import { CloneCommand, InstallCommand } from './install-command'
import { GitHubMark } from './github-mark'
import { SITE, VIVEKUI, utm } from '@/lib/site'

/**
 * The site footer, and the template's attribution.
 *
 * A server component: nothing here is interactive except the CopyButton inside
 * `InstallCommand`, which carries its own client boundary.
 */
export function SiteFooter() {
  const year = 2026

  return (
    <Footer
      navLabel="Footer"
      columns={[
        {
          title: 'Learn',
          links: [
            { label: 'All courses', href: '/courses' },
            { label: 'Free courses', href: '/courses?free=1' },
            { label: 'Your dashboard', href: '/dashboard' },
            { label: 'Built with VivekUI', href: '/built-with' },
          ],
        },
        {
          title: 'VivekUI',
          links: [
            { label: 'Documentation', href: utm(VIVEKUI.docs, 'footer'), target: '_blank' },
            { label: 'Components', href: utm(VIVEKUI.components, 'footer'), target: '_blank' },
            { label: 'npm package', href: VIVEKUI.npm, target: '_blank' },
            { label: 'GitHub', href: VIVEKUI.github, target: '_blank' },
          ],
        },
        {
          title: 'This template',
          links: [
            { label: 'Source on GitHub', href: SITE.repo, target: '_blank' },
            { label: 'Report an issue', href: `${SITE.repo}/issues`, target: '_blank' },
            { label: 'Use this template', href: `${SITE.repo}/generate`, target: '_blank' },
            { label: 'Author — Vivek Kumar Singh', href: utm(VIVEKUI.author, 'footer'), target: '_blank' },
            { label: 'llms.txt', href: '/llms.txt' },
          ],
        },
      ]}
      brand={
        <Stack gap={4}>
          <Link
            href="/"
            className="sf-ring-inline sf-badge-link"
            style={{ color: 'inherit', fontWeight: 600 }}
          >
            <ProgressRing value={68} size={22} thickness={3} aria-hidden="true" />
            SkillForge
          </Link>

          <Text tone="muted" size="sm" className="sf-prose-narrow">
            Built with ❤️ using VivekUI — 91 React components · 6 SVG charts · zero runtime
            dependencies. One install, one CSS import, no config.
          </Text>

          <Stack gap={2}>
            <Text as="span" size="sm" weight="semibold">
              Install the library
            </Text>
            <InstallCommand size="sm" />
          </Stack>

          {/* The template itself is MIT and public — make taking it away one copy. */}
          <Stack gap={2}>
            <Text as="span" size="sm" weight="semibold">
              Clone this template
            </Text>
            <CloneCommand size="sm" />
            <Flex gap={3} wrap>
              <Button variant="outline" size="sm" className="sf-nav-repo" asChild>
                <a href={SITE.repo} target="_blank" rel="noopener noreferrer">
                  <GitHubMark />
                  Star on GitHub
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={`${SITE.repo}/generate`} target="_blank" rel="noopener noreferrer">
                  Use this template
                </a>
              </Button>
            </Flex>
          </Stack>
        </Stack>
      }
      copyright={`© ${year} SkillForge — a free, open-source Next.js template. MIT licensed.`}
    />
  )
}
