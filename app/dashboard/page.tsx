import type { Metadata } from 'next'
import Link from 'next/link'
import {
  AnimatedCounter,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  EmptyState,
  Flex,
  Grid,
  Heading,
  Section,
  Stack,
  Text,
} from '@the_viveksingh/vivek-ui'
import { LineChart, ProgressRing, Sparkline } from '@the_viveksingh/vivek-ui/charts'

import { CourseCard } from '@/components/site/course-card'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { JsonLd } from '@/components/site/json-ld'
import {
  DAILY_MINUTES,
  LEARNER,
  WEEKLY_MINUTES,
  averageWeeklyMinutes,
  continueLearning,
  overallProgress,
  recommended,
} from '@/data/learner'
import { formatDuration, totalHours } from '@/data/courses'
import { breadcrumbLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'Your dashboard — progress, streak and certificates',
  description:
    'A learner dashboard built with VivekUI: completion rings on every course in progress, an eight-week learning-minutes line chart, a 30-day streak sparkline and certificates.',
  path: '/dashboard',
})

const inProgress = continueLearning()
const suggestions = recommended(3)
const peakDay = Math.max(...DAILY_MINUTES)

export default function DashboardPage() {
  return (
    <Section padding="lg" size="xl">
      {/*
        The rail is deliberately SECOND in the DOM: on a phone that puts the
        learner's own dashboard first and the navigation after it, instead of
        making them scroll past a full-height nav to reach their courses. On a
        wide screen grid placement moves it back to the left-hand column, where
        a rail belongs. Both reading orders are coherent.
      */}
      <div className="sf-shell">
        <Stack gap={12} className="sf-shell-main">
          {/* ---------------------------------------------------------- */}
          {/* Greeting                                                   */}
          {/* ---------------------------------------------------------- */}
          <Stack gap={4}>
            <Flex gap={4} align="center" wrap>
              <Avatar src={LEARNER.avatar} name={LEARNER.name} size="lg" />
              <Stack gap={1}>
                <Heading level={1} size="xl">
                  Welcome back, {LEARNER.name.split(' ')[0]}
                </Heading>
                <Text tone="muted">
                  {overallProgress()}% through {inProgress.length} courses ·{' '}
                  {averageWeeklyMinutes()} minutes a week on average
                </Text>
              </Stack>
            </Flex>

            <Alert tone="info" variant="soft" title="This is a template">
              Every figure on this page comes from <code>data/learner.ts</code>. Point those
              exports at your own API and the charts, rings and streak all follow.
            </Alert>
          </Stack>

          {/* ---------------------------------------------------------- */}
          {/* Continue learning                                          */}
          {/* ---------------------------------------------------------- */}
          <Stack gap={6}>
            <Heading level={2} size="lg">
              Continue learning
            </Heading>

            <Grid minItemWidth="20rem" gap={6}>
              {inProgress.map(({ enrollment, course }) => (
                <Card key={course.slug} variant="outline" padding="lg">
                  <Card.Body>
                    <div className="sf-continue">
                      <ProgressRing
                        value={enrollment.progress}
                        size={78}
                        thickness={7}
                        showValue
                        label={`${course.title} — ${enrollment.progress}% complete`}
                      />
                      <Stack gap={2}>
                        <Heading level={3} size="sm">
                          <Link className="sf-card-link" href={`/courses/${course.slug}`}>
                            {course.title}
                          </Link>
                        </Heading>
                        <Text size="sm" tone="muted" lineClamp={2}>
                          Up next: {enrollment.nextLesson}
                        </Text>
                        <Text size="sm" tone="muted">
                          {formatDuration(enrollment.minutesLeft)} left of {totalHours(course)}h
                        </Text>
                      </Stack>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <Button fullWidth asChild>
                      <Link href={`/courses/${course.slug}`}>Resume</Link>
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </Grid>
          </Stack>

          {/* ---------------------------------------------------------- */}
          {/* Charts                                                     */}
          {/* ---------------------------------------------------------- */}
          <Grid cols={{ base: 1, lg: 3 }} gap={6}>
            <div className="sf-chart-frame sf-chart-wide">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Heading level={2} size="sm">
                    Your learning minutes
                  </Heading>
                  <Text size="sm" tone="muted">
                    Last 8 weeks. You are averaging {averageWeeklyMinutes()} minutes a week and
                    trending up.
                  </Text>
                </Stack>
                <LineChart
                  height={260}
                  showGrid
                  showAxes
                  curve="smooth"
                  tooltip
                  title="Learning minutes over the last eight weeks"
                  description="Weekly totals, oldest week first."
                  xLabel="Week ending"
                  yLabel="Minutes"
                  series={[
                    {
                      name: 'Minutes',
                      data: WEEKLY_MINUTES.map((week) => ({ x: week.week, y: week.minutes })),
                    },
                  ]}
                />
              </Stack>
            </div>

            <div className="sf-chart-frame">
              <Stack gap={4}>
                <Stack gap={1}>
                  <Heading level={2} size="sm">
                    Current streak
                  </Heading>
                  <Text size="sm" tone="muted">
                    Consecutive days with at least one lesson.
                  </Text>
                </Stack>

                <div className="sf-streak">
                  <span className="sf-streak-count">
                    <AnimatedCounter value={LEARNER.streakDays} locale="en-US" />
                  </span>
                  <Text as="span" tone="muted">
                    days
                  </Text>
                </div>

                <Sparkline
                  data={DAILY_MINUTES}
                  height={64}
                  fill
                  showLastPoint
                  curve="smooth"
                  title="Daily learning minutes, last 30 days"
                  description="One point per day, oldest first."
                  xLabel="Day"
                  yLabel="Minutes"
                />

                <Divider />

                <Flex justify="between" align="center">
                  <Text size="sm" tone="muted">
                    Best day
                  </Text>
                  <Badge tone="primary" variant="soft" pill>
                    {peakDay} min
                  </Badge>
                </Flex>
              </Stack>
            </div>
          </Grid>

          {/* ---------------------------------------------------------- */}
          {/* Certificates                                               */}
          {/* ---------------------------------------------------------- */}
          <Stack gap={6} id="certificates">
            <Heading level={2} size="lg">
              Certificates
            </Heading>
            <Card variant="outline" padding="lg">
              <Card.Body>
                <EmptyState
                  icon={<ProgressRing value={91} size={64} thickness={5} aria-hidden="true" />}
                  title="Finish a course to earn your first certificate"
                  description="You are 91% through CSS Without a Framework — one capstone project away. Certificates come with a verification link you can share."
                  actions={
                    <Button asChild>
                      <Link href="/courses/css-without-a-framework">
                        Finish CSS Without a Framework
                      </Link>
                    </Button>
                  }
                  size="lg"
                />
              </Card.Body>
            </Card>
          </Stack>

          {/* ---------------------------------------------------------- */}
          {/* Recommended                                                */}
          {/* ---------------------------------------------------------- */}
          <Stack gap={6} id="recommended">
            <Heading level={2} size="lg">
              Recommended next
            </Heading>
            <Grid minItemWidth="17rem" gap={6}>
              {suggestions.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </Grid>
          </Stack>
        </Stack>

        <div className="sf-shell-rail">
          <DashboardSidebar enrolled={inProgress.length} />
        </div>
      </div>

      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Dashboard', path: '/dashboard' },
        ])}
      />
    </Section>
  )
}
