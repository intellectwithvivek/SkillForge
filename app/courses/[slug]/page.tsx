import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
// Accordion is a client component, and the parts it hangs off itself
// (Accordion.Item and friends) do not survive the server → client reference
// boundary — only real module exports do. Importing the flat exports instead is
// what keeps this whole page a server component.
import {
  Accordion as AccordionRoot,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  Badge,
  Breadcrumb,
  Card,
  Container,
  Divider,
  FeatureGrid,
  Flex,
  Grid,
  Heading,
  Progress,
  Prose,
  Rating,
  RelativeTime,
  Section,
  Stack,
  Text,
  Timeline,
} from '@the_viveksingh/vivek-ui'
import { PieChart } from '@the_viveksingh/vivek-ui/charts'

import { CourseCard } from '@/components/site/course-card'
import { JsonLd } from '@/components/site/json-ld'
import { RingBullet } from '@/components/site/ring-bullet'
import { DemoPlayer } from '@/components/courses/demo-player'
import { EnrollCard } from '@/components/courses/enroll-card'
import {
  allLessons,
  averageRating,
  categoryName,
  contentMix,
  courseSlugs,
  formatDuration,
  formatLearners,
  getCourse,
  handsOnPercent,
  instructorFor,
  lessonCount,
  ratingDistribution,
  ratingsCount,
  relatedCourses,
  sectionMinutes,
  totalHours,
} from '@/data/courses'
import { breadcrumbLd, courseLd, pageMetadata } from '@/lib/seo'

/** Eight courses, all known at build time — every page is static. */
export function generateStaticParams() {
  return courseSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(
  props: PageProps<'/courses/[slug]'>,
): Promise<Metadata> {
  // Next.js 16: params is a Promise.
  const { slug } = await props.params
  const course = getCourse(slug)

  if (!course) {
    return pageMetadata({
      title: 'Course not found',
      description: 'That course is not in the SkillForge catalogue.',
      path: `/courses/${slug}`,
    })
  }

  // No `image` here on purpose: an explicit openGraph.images would suppress the
  // generated card in opengraph-image.tsx, and the course cover is not a 1200x630
  // share image.
  return pageMetadata({
    title: `${course.title} — ${totalHours(course)}h ${course.level} course`,
    description: course.subtitle,
    path: `/courses/${course.slug}`,
    type: 'article',
  })
}

const KIND_BADGE: Record<string, { label: string; tone: 'primary' | 'neutral' | 'warning' }> = {
  video: { label: 'Video', tone: 'neutral' },
  quiz: { label: 'Quiz', tone: 'warning' },
  project: { label: 'Project', tone: 'primary' },
}

export default async function CoursePage(props: PageProps<'/courses/[slug]'>) {
  const { slug } = await props.params
  const course = getCourse(slug)

  if (!course) notFound()

  const instructor = instructorFor(course)
  const rating = averageRating(course)
  const distribution = ratingDistribution(course)
  const mix = contentMix(course)
  const preview = allLessons(course).find((lesson) => lesson.preview) ?? allLessons(course)[0]
  const related = relatedCourses(course, 3)

  return (
    <>
      <Section padding="lg" size="xl">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Courses', href: '/courses' },
            { label: categoryName(course.category), href: `/courses?category=${course.category}` },
            { label: course.title },
          ]}
          style={{ marginBlockEnd: 'var(--vk-space-6)' }}
        />

        {/* ------------------------------------------------------------ */}
        {/* Hero split: preview player + sticky enrol card               */}
        {/* ------------------------------------------------------------ */}
        <div className="sf-split">
          <Stack gap={6}>
            <Flex gap={2} wrap align="center">
              <Badge tone="primary" variant="soft" pill>
                {categoryName(course.category)}
              </Badge>
              <Badge tone="neutral" variant="outline" pill>
                {course.level}
              </Badge>
              {course.price === 0 ? (
                <Badge tone="success" variant="soft" pill>
                  Free forever
                </Badge>
              ) : null}
            </Flex>

            <Heading level={1} size="2xl">
              {course.title}
            </Heading>

            <Text size="lg" tone="muted">
              {course.subtitle}
            </Text>

            <div className="sf-meta">
              <Rating value={rating} readOnly allowHalf size="sm" />
              <span className="sf-tabular">
                {rating.toFixed(1)} · {ratingsCount(course).toLocaleString('en-US')} ratings
              </span>
              <span aria-hidden="true">·</span>
              <span>{formatLearners(course.learners)} learners</span>
              <span aria-hidden="true">·</span>
              <span>
                Updated{' '}
                <RelativeTime date={course.updatedAt} locale="en-GB" />
              </span>
            </div>

            <Flex gap={3} align="center">
              <Avatar src={instructor.avatar} name={instructor.name} size="sm" />
              <Text as="span" size="sm">
                Taught by <strong>{instructor.name}</strong>
              </Text>
            </Flex>

            <DemoPlayer
              poster={course.cover}
              posterAlt={course.coverAlt}
              courseTitle={course.title}
              previewLesson={preview.title}
              previewMinutes={preview.minutes}
            />
          </Stack>

          <EnrollCard
            title={course.title}
            price={course.price}
            listPrice={course.listPrice}
            includes={course.includes}
            handsOn={handsOnPercent(course)}
          />
        </div>
      </Section>

      {/* -------------------------------------------------------------- */}
      {/* What you'll learn                                              */}
      {/* -------------------------------------------------------------- */}
      <FeatureGrid
        background="muted"
        padding="lg"
        size="xl"
        title="What you'll learn"
        headingLevel={2}
        minItemWidth="20rem"
        features={course.outcomes.map((outcome, index) => ({
          id: `outcome-${index}`,
          icon: <RingBullet value={100} size={20} thickness={2} />,
          title: outcome.title,
          description: outcome.detail,
        }))}
      />

      {/* -------------------------------------------------------------- */}
      {/* Content mix + curriculum                                       */}
      {/* -------------------------------------------------------------- */}
      <Section padding="xl" size="xl">
        <Grid cols={{ base: 1, lg: 2 }} gap={12}>
          <Stack gap={6}>
            <Heading level={2} size="xl">
              What&rsquo;s inside
            </Heading>
            <Text tone="muted">
              Every figure below is summed from the lesson list, not estimated — so the chart and
              the curriculum can never disagree.
            </Text>
            {/*
              Values are minutes, not hours: slice angles keep full precision, and the
              chart's hidden data table names the unit it actually carries. The centre
              label rounds to hours because that is what a person wants to read.
            */}
            <div className="sf-chart-frame">
              <PieChart
                donut
                size={280}
                title={`Content mix for ${course.title}`}
                description={`How the ${totalHours(course)} hours split between video, hands-on projects and quizzes.`}
                xLabel="Content type"
                yLabel="Minutes"
                showLabels
                centerLabel={`${totalHours(course)}h`}
                centerSublabel="total"
                data={mix.map((entry) => ({ label: entry.label, value: entry.minutes }))}
              />
            </div>
            <Text size="sm" tone="muted">
              <strong>{handsOnPercent(course)}%</strong> of this course is hands-on.
            </Text>
          </Stack>

          <Stack gap={6}>
            <Heading level={2} size="xl">
              Curriculum
            </Heading>
            <Text tone="muted">
              {course.curriculum.length} sections · {lessonCount(course)} lessons ·{' '}
              {totalHours(course)}h total
            </Text>

            {/*
              Nested disclosure: sections open, lessons listed inside. `multiple` so a
              learner can compare two sections without one snapping shut.
            */}
            <AccordionRoot
              type="multiple"
              variant="separated"
              headingLevel={3}
              defaultValue={[course.curriculum[0].id]}
            >
              {course.curriculum.map((section) => (
                <AccordionItem key={section.id} value={section.id}>
                  <AccordionTrigger>
                    <span>
                      {section.title}
                      <span className="sf-visually-hidden">
                        , {section.lessons.length} lessons,{' '}
                        {formatDuration(sectionMinutes(section))}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      style={{
                        marginInlineStart: 'auto',
                        fontSize: 'var(--vk-text-sm)',
                        color: 'var(--vk-color-muted)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {section.lessons.length} · {formatDuration(sectionMinutes(section))}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent>
                    <Text size="sm" tone="muted" style={{ marginBlockEnd: 'var(--vk-space-3)' }}>
                      {section.summary}
                    </Text>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                      {section.lessons.map((lesson) => (
                        <li className="sf-lesson" key={lesson.id}>
                          <span className="sf-lesson-name">
                            <Badge
                              tone={KIND_BADGE[lesson.kind].tone}
                              variant="soft"
                              size="sm"
                            >
                              {KIND_BADGE[lesson.kind].label}
                            </Badge>
                            <span>{lesson.title}</span>
                          </span>
                          <span className="sf-lesson-meta">
                            {lesson.preview ? (
                              <Badge tone="success" variant="outline" size="sm" pill>
                                Free preview
                              </Badge>
                            ) : (
                              <Badge tone="neutral" variant="outline" size="sm" pill>
                                <span aria-hidden="true">🔒</span> Premium
                              </Badge>
                            )}
                            <span>{formatDuration(lesson.minutes)}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </AccordionRoot>
          </Stack>
        </Grid>
      </Section>

      {/* -------------------------------------------------------------- */}
      {/* Instructor                                                     */}
      {/* -------------------------------------------------------------- */}
      <Section background="muted" padding="xl" size="xl">
        <Section.Header eyebrow="Your instructor" title={instructor.name} align="start" />
        <div className="sf-instructor">
          <Stack gap={6}>
            <Flex gap={4} align="center">
              <Avatar src={instructor.avatar} name={instructor.name} size="xl" />
              <Text tone="muted">{instructor.role}</Text>
            </Flex>
            <Prose>
              <p>{instructor.bio}</p>
            </Prose>
          </Stack>

          <Card variant="outline" padding="lg">
            <Card.Body>
              <Timeline>
                {instructor.credentials.map((credential, index) => (
                  <Timeline.Item
                    key={credential.year}
                    title={credential.title}
                    description={credential.detail}
                    timestamp={credential.year}
                    status={index === instructor.credentials.length - 1 ? 'current' : 'complete'}
                    headingLevel={3}
                  />
                ))}
              </Timeline>
            </Card.Body>
          </Card>
        </div>
      </Section>

      {/* -------------------------------------------------------------- */}
      {/* Reviews                                                        */}
      {/* -------------------------------------------------------------- */}
      <Section padding="xl" size="xl">
        <Section.Header
          eyebrow="Reviews"
          title="What learners said"
          align="start"
          description={`${ratingsCount(course).toLocaleString('en-US')} ratings from people who bought this course.`}
        />

        <Grid cols={{ base: 1, lg: 2 }} gap={12}>
          <Stack gap={6}>
            <Flex gap={4} align="center">
              <span
                style={{
                  fontSize: 'var(--vk-text-3xl)',
                  fontWeight: 700,
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {rating.toFixed(1)}
              </span>
              <Stack gap={1}>
                <Rating value={rating} readOnly allowHalf />
                <Text size="sm" tone="muted">
                  {ratingsCount(course).toLocaleString('en-US')} ratings
                </Text>
              </Stack>
            </Flex>

            {/*
              A description list: each bar is a <dd> bound to the <dt> naming its star
              level, so a screen reader hears "5 stars, 79 percent" rather than a run of
              unlabelled progress bars. The wrapping <div> is the grouping element the
              HTML spec allows inside a <dl>.
            */}
            <Stack gap={3} as="dl" style={{ margin: 0 }}>
              {distribution.map((row) => (
                <div className="sf-dist-row" key={row.stars}>
                  <dt style={{ margin: 0 }}>
                    {row.stars} star{row.stars === 1 ? '' : 's'}
                  </dt>
                  <dd className="sf-dist-bar" style={{ margin: 0 }}>
                    <Progress
                      value={row.percent}
                      max={100}
                      size="sm"
                      label={`${row.percent}% of ratings gave ${row.stars} stars`}
                    />
                    <span className="sf-dist-count">{row.percent}%</span>
                  </dd>
                </div>
              ))}
            </Stack>
          </Stack>

          <div>
            {course.reviews.map((review) => (
              <article className="sf-review" key={review.id}>
                <div className="sf-review-head">
                  <Avatar src={review.avatar} name={review.author} size="sm" />
                  <Stack gap={1}>
                    <Text as="span" weight="semibold" size="sm">
                      {review.author}
                    </Text>
                    <Flex gap={2} align="center">
                      <Rating value={review.rating} readOnly size="sm" />
                      <Text as="span" size="sm" tone="muted">
                        <RelativeTime date={review.postedAt} locale="en-GB" />
                      </Text>
                    </Flex>
                  </Stack>
                </div>
                <Text size="sm">{review.body}</Text>
              </article>
            ))}
          </div>
        </Grid>
      </Section>

      {/* -------------------------------------------------------------- */}
      {/* Related                                                        */}
      {/* -------------------------------------------------------------- */}
      <Section background="muted" padding="xl" size="xl">
        <Section.Header
          title="Learners also took"
          align="start"
          description="Same category first, then whatever pairs well with it."
        />
        <Grid minItemWidth="17rem" gap={6}>
          {related.map((other) => (
            <CourseCard key={other.slug} course={other} />
          ))}
        </Grid>
      </Section>

      <Container size="xl" style={{ paddingBlockEnd: 'var(--vk-space-12)' }}>
        <Divider />
        <Text size="sm" tone="muted" style={{ marginBlockStart: 'var(--vk-space-6)' }}>
          Browse the full <Link href="/courses">course catalogue</Link>, or see how this page is
          put together on <Link href="/built-with">Built with VivekUI</Link>.
        </Text>
      </Container>

      <JsonLd data={courseLd(course)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
          { name: categoryName(course.category), path: `/courses?category=${course.category}` },
          { name: course.title, path: `/courses/${course.slug}` },
        ])}
      />
    </>
  )
}
