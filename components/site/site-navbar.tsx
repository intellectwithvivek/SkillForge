'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Badge, Button, Combobox, Navbar, ThemeToggle } from '@the_viveksingh/vivek-ui'
import { ProgressRing } from '@the_viveksingh/vivek-ui/charts'
import { searchOptions } from '@/data/courses'
import { GitHubMark } from '@/components/site/github-mark'
import { SITE, UTM_CAMPAIGN, VIVEKUI, utm } from '@/lib/site'

const NAV = [
  { href: '/courses', label: 'Courses' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/built-with', label: 'Built with' },
]

const OPTIONS = searchOptions()

/**
 * The site header.
 *
 * A client component because the course Combobox navigates on selection — everything
 * else in it would render happily on the server. The `asChild` escape hatch lets every
 * destination be a real `next/link` while keeping VivekUI's styling and `aria-current`.
 */
export function SiteNavbar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Navbar sticky container="xl" aria-label="Main">
      <Navbar.Brand asChild>
        <Link href="/">
          <span className="sf-ring-inline">
            <ProgressRing value={68} diameter={22} thickness={3} aria-hidden="true" />
            <strong>SkillForge</strong>
          </span>
        </Link>
      </Navbar.Brand>

      <Navbar.Links>
        {NAV.map((item) => (
          <Navbar.Link
            key={item.href}
            asChild
            active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
          >
            <Link href={item.href}>{item.label}</Link>
          </Navbar.Link>
        ))}
      </Navbar.Links>

      <Navbar.Actions>
        <div className="sf-nav-search">
          <Combobox
            options={OPTIONS}
            placeholder="Search courses…"
            size="sm"
            aria-label="Search courses"
            onValueChange={(slug) => {
              if (slug) router.push(`/courses/${slug}`)
            }}
          />
        </div>

        <a
          className="sf-nav-badge"
          href={utm(VIVEKUI.docs, 'navbar')}
          target="_blank"
          rel="noopener noreferrer"
          data-utm-campaign={UTM_CAMPAIGN}
        >
          <Badge tone="primary" variant="soft" pill>
            ⚡ Built with VivekUI
          </Badge>
        </a>

        {/*
          The repository is the point of this template, so cloning it is a
          first-class action in the bar rather than something buried in the
          footer. It keeps its label down to the icon on small screens.
        */}
        <Button variant="outline" size="sm" className="sf-nav-repo" asChild>
          {/*
            An explicit aria-label rather than a visually hidden span: the label
            has to make sense both when "Star" is visible and when the button is
            icon-only on a phone, and two concatenated text nodes would read as
            "StarSkillForge on GitHub".
          */}
          <a
            href={SITE.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star SkillForge on GitHub (opens in a new tab)"
          >
            <GitHubMark />
            <span className="sf-nav-repo-label">Star</span>
          </a>
        </Button>

        <ThemeToggle mode="cycle" />
        <Navbar.Toggle />
      </Navbar.Actions>
    </Navbar>
  )
}
