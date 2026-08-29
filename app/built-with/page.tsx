import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Prose,
  Section,
  Stack,
  Table,
  Text,
} from '@the_viveksingh/vivek-ui'
import { ProgressRing } from '@the_viveksingh/vivek-ui/charts'

import { InstallCommand } from '@/components/site/install-command'
import { JsonLd } from '@/components/site/json-ld'
import { RingList } from '@/components/site/ring-bullet'
import { SITE, VIVEKUI, componentDocs, utm } from '@/lib/site'
import { breadcrumbLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Built with VivekUI — every component on this site',
  description:
    'Every section of SkillForge mapped to the VivekUI component that renders it, deep-linked to its documentation. 91 React components and 6 SVG charts, zero runtime dependencies.',
  path: '/built-with',
})

/**
 * Section → component map.
 *
 * `name` is the docs slug, which is also what the deep link is built from — so a
 * renamed component surfaces here as a broken link rather than silently drifting.
 */
const USAGE: { area: string; component: string; name: string; role: string }[] = [
  { area: 'Site header', component: 'Navbar', name: 'navbar', role: 'Sticky bar, mobile sheet, brand and actions' },
  { area: 'Site header', component: 'Combobox', name: 'combobox', role: 'Course search that navigates on select' },
  { area: 'Site header', component: 'ThemeToggle', name: 'theme-toggle', role: 'Light / dark / system, cycling' },
  { area: 'Site header', component: 'Badge', name: 'badge', role: 'The “Built with VivekUI” chip' },
  { area: 'Everywhere', component: 'ThemeProvider', name: 'theme-provider', role: 'Theme state, storage and the anti-flash script' },
  { area: 'Everywhere', component: 'Section', name: 'section', role: 'Every page band, with its own header slot' },
  { area: 'Everywhere', component: 'Container', name: 'container', role: 'Width cap and responsive gutter' },
  { area: 'Everywhere', component: 'Stack / Flex', name: 'stack', role: 'Token-gapped layout, no utility classes' },
  { area: 'Everywhere', component: 'Grid', name: 'grid', role: 'Auto-fitting card grids at every width' },
  { area: 'Everywhere', component: 'Heading', name: 'heading', role: 'Level and size set separately, so the outline stays correct' },
  { area: 'Everywhere', component: 'Text', name: 'text', role: 'Body copy, tones and line clamping' },
  { area: 'Homepage', component: 'Stats', name: 'stats', role: 'Learners, courses, completion rate' },
  { area: 'Homepage', component: 'AnimatedCounter', name: 'animated-counter', role: 'Counts up on view; renders the final value on the server' },
  { area: 'Homepage', component: 'Stepper', name: 'stepper', role: 'The four-step “how it works” flow' },
  { area: 'Homepage', component: 'Timeline', name: 'timeline', role: 'Instructor credentials' },
  { area: 'Homepage', component: 'Testimonials', name: 'testimonials', role: 'Learner quotes as figure/blockquote' },
  { area: 'Homepage', component: 'Pricing', name: 'pricing', role: 'Free / Pro / Team, with a yearly Switch' },
  { area: 'Homepage', component: 'Switch', name: 'switch', role: 'Monthly ↔ yearly billing' },
  { area: 'Homepage', component: 'FAQ', name: 'faq', role: 'Native <details>; feeds the FAQPage schema' },
  { area: 'Homepage', component: 'Newsletter', name: 'newsletter', role: 'Email capture with a real busy state' },
  { area: 'Homepage', component: 'Prose', name: 'prose', role: 'The instructor biography' },
  { area: 'Catalogue', component: 'Select', name: 'select', role: 'Category and level filters' },
  { area: 'Catalogue', component: 'Slider', name: 'slider', role: 'Maximum price' },
  { area: 'Catalogue', component: 'Rating', name: 'rating', role: 'Minimum rating — a real radio group' },
  { area: 'Catalogue', component: 'Field', name: 'field', role: 'Label, hint and ARIA wiring for each filter' },
  { area: 'Catalogue', component: 'Pagination', name: 'pagination', role: 'Six courses a page' },
  { area: 'Catalogue', component: 'EmptyState', name: 'empty-state', role: 'When no course matches the filters' },
  { area: 'Course card', component: 'Card', name: 'card', role: 'Header / body / footer slots' },
  { area: 'Course card', component: 'Avatar', name: 'avatar', role: 'Instructor face, with initials fallback' },
  { area: 'Course page', component: 'Breadcrumb', name: 'breadcrumb', role: 'Trail, mirrored in BreadcrumbList JSON-LD' },
  { area: 'Course page', component: 'AspectRatio', name: 'aspect-ratio', role: 'Preview frame that cannot shift layout' },
  { area: 'Course page', component: 'IconButton', name: 'icon-button', role: 'Play control — aria-label required at the type level' },
  { area: 'Course page', component: 'Modal', name: 'modal', role: 'Demo player: focus trap, scroll lock, inert background' },
  { area: 'Course page', component: 'FeatureGrid', name: 'feature-grid', role: '“What you’ll learn”' },
  { area: 'Course page', component: 'Accordion', name: 'accordion', role: 'Curriculum sections, multiple open at once' },
  { area: 'Course page', component: 'Progress', name: 'progress', role: 'Per-star review distribution' },
  { area: 'Course page', component: 'RelativeTime', name: 'relative-time', role: 'Review dates, via Intl — no date library' },
  { area: 'Course page', component: 'Divider', name: 'divider', role: 'Labelled rules in the enrol panel' },
  { area: 'Course page', component: 'Toast', name: 'toast', role: 'Enrol confirmation, announced in a live region' },
  { area: 'Dashboard', component: 'Sidebar', name: 'sidebar', role: 'Collapsible navigation rail' },
  { area: 'Dashboard', component: 'Alert', name: 'alert', role: 'The “this is a template” note' },
  { area: 'Dashboard', component: 'EmptyState', name: 'empty-state', role: 'No certificates yet' },
  { area: 'Built with', component: 'Table', name: 'table', role: 'This table' },
  { area: 'Built with', component: 'CopyButton', name: 'copy-button', role: 'The install command' },
  { area: 'Built with', component: 'Code', name: 'code', role: 'Inline and block code' },
  { area: 'Footer', component: 'Footer', name: 'footer', role: 'Link columns inside one named nav' },
]

const CHARTS: { component: string; name: string; role: string }[] = [
  { component: 'ProgressRing', name: 'progress-ring', role: 'Completion on every enrolled card — and every bullet glyph on the site' },
  { component: 'PieChart', name: 'pie-chart', role: '“What’s inside” content mix on each course page' },
  { component: 'LineChart', name: 'line-chart', role: 'Learning minutes over the last eight weeks' },
  { component: 'Sparkline', name: 'sparkline', role: 'Thirty-day streak beside the counter' },
]

export default function BuiltWithPage() {
  return (
    <>
      <Section padding="lg" size="lg">
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Built with' }]}
          style={{ marginBlockEnd: 'var(--vk-space-6)' }}
        />

        <Stack gap={6}>
          <Badge tone="primary" variant="soft" pill>
            ⚡ Colophon
          </Badge>

          <Heading level={1} size="2xl">
            Built with VivekUI
          </Heading>

          <Prose size="lg">
            <p>
              This entire website is built with VivekUI, a free React component library with
              zero runtime dependencies.
            </p>
            <p>
              There is no Tailwind here, no shadcn, no MUI and no CSS-in-JS. One package
              install, one stylesheet import in <code>app/layout.tsx</code>, and a handful of
              CSS custom properties to set the Emerald accent — that is the whole setup. Every
              chart on the site ships in the same package as every button.
            </p>
          </Prose>

          <InstallCommand />

          <Flex gap={3} wrap>
            <Button asChild>
              <a href={utm(VIVEKUI.docs, 'builtwith')} target="_blank" rel="noopener noreferrer">
                Read the Docs
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={VIVEKUI.github} target="_blank" rel="noopener noreferrer">
                Star on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`${SITE.repo}/generate`} target="_blank" rel="noopener noreferrer">
                Use this template
              </a>
            </Button>
          </Flex>

          <Text size="sm" tone="muted">
            Template repository: <code>{SITE.repoName}</code> · MIT licensed · the credit in the
            footer is removable, though a star is appreciated.
          </Text>
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Charts                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section background="muted" padding="xl" size="lg">
        <Section.Header
          align="start"
          title="Rings, bars, lines and sparks — one package"
          description="The charts are not a separate dependency and not a wrapper around Recharts. They are inline SVG in the same install, at a second import path, and each one renders a hidden data table so the numbers reach a screen reader."
        />

        <Grid minItemWidth="15rem" gap={6}>
          {CHARTS.map((chart) => (
            <Card key={chart.component} variant="outline" padding="lg">
              <Card.Body>
                <Stack gap={3}>
                  <Heading level={3} size="sm">
                    <a
                      href={componentDocs(chart.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {chart.component}
                    </a>
                  </Heading>
                  <Text size="sm" tone="muted">
                    {chart.role}
                  </Text>
                </Stack>
              </Card.Body>
            </Card>
          ))}
        </Grid>

        <Alert
          tone="info"
          variant="soft"
          title="Why the bullets are rings"
          style={{ marginBlockStart: 'var(--vk-space-8)' }}
        >
          Every bullet glyph on this site is a{' '}
          <a href={componentDocs('progress-ring')} target="_blank" rel="noopener noreferrer">
            ProgressRing
          </a>{' '}
          at 16 pixels — the same component that reports 72% on a dashboard card, shrunk to
          punctuation. Reusing one primitive for both is what makes the identity hold together.
        </Alert>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Component table                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section padding="xl" size="xl">
        <Section.Header
          align="start"
          title="Every section, and the component behind it"
          description="Each name links straight to its documentation page, props table included."
        />

        <Table striped hoverable size="sm" containerProps={{ 'data-testid': 'component-map' }}>
          <Table.Caption visuallyHidden>
            SkillForge sections mapped to the VivekUI components that render them
          </Table.Caption>
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Area</Table.HeaderCell>
              <Table.HeaderCell>Component</Table.HeaderCell>
              <Table.HeaderCell>What it does here</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {USAGE.map((row, index) => (
              <Table.Row key={`${row.area}-${row.component}-${index}`}>
                <Table.Cell label="Area">{row.area}</Table.Cell>
                <Table.Cell label="Component">
                  <a href={componentDocs(row.name)} target="_blank" rel="noopener noreferrer">
                    {row.component}
                  </a>
                </Table.Cell>
                <Table.Cell label="What it does here">{row.role}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why                                                              */}
      {/* ---------------------------------------------------------------- */}
      <Section background="muted" padding="xl" size="lg">
        <div className="sf-instructor">
          <Stack gap={6}>
            <Heading level={2} size="xl">
              What that bought us
            </Heading>
            <RingList
              items={[
                <>
                  <strong>No build configuration.</strong> No Tailwind, no PostCSS plugin, no
                  component CLI, no generated source in the repository.
                </>,
                <>
                  <strong>Server components by default.</strong> 49 of the 91 components carry no{' '}
                  <code>&apos;use client&apos;</code>, so most of this site is static HTML.
                </>,
                <>
                  <strong>Accessibility that was already there.</strong> Focus traps, live
                  regions and keyboard models ship with the components rather than being added
                  afterwards.
                </>,
                <>
                  <strong>Themeable from one block of CSS.</strong> The Emerald accent on this
                  site is nine custom properties in <code>globals.css</code>.
                </>,
                <>
                  <strong>Overrides that do not fight.</strong> Every library selector is wrapped
                  in <code>:where()</code>, so a single flat class of ours wins — there is no{' '}
                  <code>!important</code> anywhere in this project.
                </>,
              ]}
            />
          </Stack>

          <Card variant="elevated" padding="lg">
            <Card.Body>
              <Stack gap={6} align="center">
                <ProgressRing value={100} diameter={150} thickness={9} label="Runtime dependencies: zero">
                  <Stack gap={1} align="center">
                    <span style={{ fontSize: '2.5rem', fontWeight: 700, lineHeight: 1 }}>0</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--vk-color-muted)' }}>
                      runtime deps
                    </span>
                  </Stack>
                </ProgressRing>
                <Text align="center" size="sm" tone="muted">
                  91 components · 6 charts · 47.6 kB for the entire library, brotlied, with React
                  excluded. Verify it yourself:{' '}
                  <code>npm ls --omit=dev @the_viveksingh/vivek-ui</code>
                </Text>
                <Button variant="outline" asChild>
                  <a href={utm(VIVEKUI.npm, 'builtwith')} target="_blank" rel="noopener noreferrer">
                    View on npm
                  </a>
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </div>
      </Section>

      <Section padding="lg" size="lg">
        <Text tone="muted">
          Back to the <Link href="/">homepage</Link>, or browse the{' '}
          <Link href="/courses">course catalogue</Link>. Built by{' '}
          <a href={utm(VIVEKUI.author, 'builtwith')} target="_blank" rel="noopener noreferrer">
            {VIVEKUI.authorName}
          </a>
          .
        </Text>
      </Section>

      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Built with', path: '/built-with' },
        ])}
      />
    </>
  )
}
