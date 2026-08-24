import Link from 'next/link'
import {
  AnimatedCounter,
  Avatar,
  Badge,
  Button,
  Card,
  FAQ,
  Flex,
  Grid,
  Heading,
  Prose,
  Section,
  Stack,
  Stats,
  Stepper,
  Testimonials,
  Text,
  Timeline,
} from '@the_viveksingh/vivek-ui'
import { ProgressRing } from '@the_viveksingh/vivek-ui/charts'

import { CourseCard } from '@/components/site/course-card'
import { HeroSearch } from '@/components/site/hero-search'
import { NewsletterSignup } from '@/components/site/newsletter-signup'
import { PricingSection } from '@/components/site/pricing-section'
import { RingList } from '@/components/site/ring-bullet'
import { JsonLd } from '@/components/site/json-ld'
import { CATALOGUE, CATEGORIES, COURSES, INSTRUCTORS, featuredCourses } from '@/data/courses'
import { FAQ_ITEMS, faqForSchema } from '@/data/faq'
import { faqLd } from '@/lib/seo'

const featured = featuredCourses(4)
const spotlight = INSTRUCTORS['maya-okonkwo']
const FREE_COUNT = COURSES.filter((course) => course.price === 0).length

const STEPS = [
  {
    label: 'Pick something you want to exist',
    description: 'Not a topic — a thing. A dashboard, a CLI, a search box that is actually fast.',
  },
  {
    label: 'Build it lesson by lesson',
    description: 'Every module ends with working code in your own repository, not a finished video.',
  },
  {
    label: 'Break it on purpose',
    description: 'Projects include the failure: the slow query, the bad deploy, the hydration mismatch.',
  },
  {
    label: 'Ship it and read the numbers',
    description: 'You finish with something deployed and the evidence that it works.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section className="sf-hero" padding="xl" size="lg" align="center">
        <Stack gap={6} align="center">
          <Badge tone="primary" variant="soft" pill>
            {CATALOGUE.courses} courses · {CATALOGUE.hours} hours · {FREE_COUNT} of them free
          </Badge>

          <Heading level={1} size="hero" align="center">
            Learn by shipping
          </Heading>

          <Text size="xl" tone="muted" align="center" className="sf-prose-narrow">
            Courses that end with something deployed. Every module leaves working code in your
            own repository — no starter kits, no finished-video-shaped learning.
          </Text>

          <HeroSearch />

          <div className="sf-chip-row">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                className="sf-chip"
                href={`/courses?category=${category.slug}`}
              >
                <Badge tone="neutral" variant="outline" pill>
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>

          <Flex gap={3} wrap justify="center">
            <Button size="lg" asChild>
              <Link href="/courses">Browse all courses</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses/css-without-a-framework">Start a free one</Link>
            </Button>
          </Flex>
        </Stack>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Featured courses                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section padding="xl" size="xl">
        <Section.Header
          eyebrow="Most enrolled"
          title="Start with one of these"
          description="Ranked by how many people are working through them right now."
        />
        <Grid minItemWidth="17rem" gap={6}>
          {featured.map((course, index) => (
            <CourseCard key={course.slug} course={course} priority={index < 2} />
          ))}
        </Grid>
        <Flex justify="center" style={{ marginBlockStart: 'var(--vk-space-10)' }}>
          <Button variant="outline" asChild>
            <Link href="/courses">See all {CATALOGUE.courses} courses</Link>
          </Button>
        </Flex>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Stats                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Stats
        background="muted"
        padding="lg"
        columns={{ base: 2, md: 4 }}
        items={[
          {
            id: 'learners',
            value: <AnimatedCounter value={CATALOGUE.learners} locale="en-US" suffix="+" />,
            label: 'Learners enrolled',
            description: 'Across every course since launch',
          },
          {
            id: 'courses',
            value: <AnimatedCounter value={CATALOGUE.courses} locale="en-US" />,
            label: 'Courses',
            description: `${CATALOGUE.hours} hours of material`,
          },
          {
            id: 'completion',
            value: <AnimatedCounter value={CATALOGUE.completionRate} locale="en-US" suffix="%" />,
            label: 'Completion rate',
            description: 'Industry average is nearer 13%',
          },
          {
            id: 'instructors',
            value: <AnimatedCounter value={CATALOGUE.instructors} locale="en-US" />,
            label: 'Instructors',
            description: 'All still working engineers',
          },
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* How it works                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section padding="xl" size="lg">
        <Section.Header
          eyebrow="How it works"
          title="Four steps, and none of them are “watch”"
          description="The format is the same in every course, because it is the part that makes the learning stick."
        />
        <Stepper steps={STEPS} activeStep={3} orientation="vertical" size="lg" label="How SkillForge courses work" />
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Instructor spotlight                                             */}
      {/* ---------------------------------------------------------------- */}
      <Section background="muted" padding="xl" size="xl">
        <Section.Header eyebrow="Instructor spotlight" title="Taught by people who still ship" />

        <div className="sf-instructor">
          <Stack gap={6}>
            <Flex gap={4} align="center">
              <Avatar src={spotlight.avatar} name={spotlight.name} size="xl" />
              <Stack gap={1}>
                <Heading level={3} size="lg">
                  {spotlight.name}
                </Heading>
                <Text tone="muted" size="sm">
                  {spotlight.role}
                </Text>
              </Stack>
            </Flex>

            <Prose>
              <p>{spotlight.bio}</p>
            </Prose>

            <Flex gap={3} wrap>
              <Button variant="outline" asChild>
                <Link href="/courses/ship-it-nextjs-16">Ship It: Next.js 16</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/courses/react-server-components-properly">
                  React Server Components
                </Link>
              </Button>
            </Flex>
          </Stack>

          <Card variant="outline" padding="lg">
            <Card.Header>
              <Heading level={3} size="sm">
                Credentials
              </Heading>
            </Card.Header>
            <Card.Body>
              <Timeline>
                {spotlight.credentials.map((credential, index) => (
                  <Timeline.Item
                    key={credential.year}
                    title={credential.title}
                    description={credential.detail}
                    timestamp={credential.year}
                    status={index === spotlight.credentials.length - 1 ? 'current' : 'complete'}
                    headingLevel={4}
                  />
                ))}
              </Timeline>
            </Card.Body>
          </Card>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* What you get                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section padding="xl" size="lg">
        <div className="sf-instructor">
          <Stack gap={6}>
            <Heading level={2} size="xl">
              What a SkillForge course actually includes
            </Heading>
            <Text tone="muted">
              The same five things every time, so you know what you are buying before you click.
            </Text>
            <RingList
              items={[
                <>
                  <strong>A repository you keep.</strong> Not a zip of finished code — the one you
                  built, commit by commit.
                </>,
                <>
                  <strong>Projects, not exercises.</strong> A third to a half of every course is
                  hands-on, and the split is shown on each course page.
                </>,
                <>
                  <strong>Lifetime access, including updates.</strong> Instructors re-record when
                  the tooling moves; you get the revision free.
                </>,
                <>
                  <strong>A certificate with a verification link.</strong> On free courses too.
                </>,
                <>
                  <strong>Thirty days to change your mind.</strong> No questions, and you keep the
                  certificate.
                </>,
              ]}
            />
          </Stack>

          <Card variant="elevated" padding="lg">
            <Card.Body>
              <Stack gap={6} align="center">
                <ProgressRing
                  value={68}
                  size={168}
                  thickness={10}
                  label="Average course completion rate"
                >
                  <Stack gap={1} align="center">
                    <span style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>68%</span>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--vk-color-muted)' }}>
                      finish rate
                    </span>
                  </Stack>
                </ProgressRing>
                <Text align="center" tone="muted" size="sm">
                  Most online courses are abandoned around lesson three. Ours are finished because
                  each one is building a specific thing, and stopping halfway leaves it broken.
                </Text>
              </Stack>
            </Card.Body>
          </Card>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Testimonials                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Testimonials
        background="muted"
        padding="xl"
        size="xl"
        eyebrow="Learners"
        title="What people said afterwards"
        columns={{ base: 1, md: 3 }}
        items={[
          {
            id: 't1',
            quote:
              'I had been "learning React" for two years and had nothing to show anyone. Six weeks here and I have a deployed app with real users. The difference is that every lesson ends with something running.',
            author: 'Priya Nandakumar',
            role: 'Frontend engineer, Meridian',
            avatar: 'https://i.pravatar.cc/96?img=26',
          },
          {
            id: 't2',
            quote:
              'The Postgres course paid for itself in one afternoon. I found an index we had been missing for a year and cut our slowest endpoint from nine seconds to under two hundred milliseconds.',
            author: 'Clara Bergström',
            role: 'Product engineer, Fathom',
            avatar: 'https://i.pravatar.cc/96?img=24',
          },
          {
            id: 't3',
            quote:
              'We put four engineers through the delivery course. CI went from twenty-two minutes to five, and we now rehearse rollbacks monthly. That was not on the syllabus — it came out of the projects.',
            author: 'Peter Nkemelu',
            role: 'Engineering manager, Halcyon',
            avatar: 'https://i.pravatar.cc/96?img=13',
          },
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Pricing                                                          */}
      {/* ---------------------------------------------------------------- */}
      <PricingSection />

      {/* ---------------------------------------------------------------- */}
      {/* FAQ — the visible copy and the FAQPage schema share one array    */}
      {/* ---------------------------------------------------------------- */}
      <FAQ
        padding="xl"
        size="md"
        name="skillforge-faq"
        eyebrow="Questions"
        title="Before you enrol"
        defaultOpen={0}
        items={FAQ_ITEMS.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        }))}
      />
      <JsonLd data={faqLd(faqForSchema())} />

      {/* ---------------------------------------------------------------- */}
      {/* Newsletter                                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section background="muted" padding="xl" size="md">
        <NewsletterSignup />
      </Section>
    </>
  )
}
