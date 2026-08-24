import Image from 'next/image'
import Link from 'next/link'
import { Avatar, Badge, Card, Flex, Heading, Rating, Text } from '@the_viveksingh/vivek-ui'
import {
  averageRating,
  categoryName,
  formatLearners,
  formatPrice,
  instructorFor,
  lessonCount,
  ratingsCount,
  totalHours,
  type Course,
} from '@/data/courses'

const CARD_SIZES = '(min-width: 75rem) 21rem, (min-width: 48rem) 45vw, 100vw'

/**
 * One course in a grid.
 *
 * The title's link is stretched over the whole card with a pseudo-element, so the
 * entire tile is the hit area while the accessible name stays the course title — a
 * card wrapped in one big anchor would instead announce the cover image, the rating
 * and the price as part of the link text.
 */
export function CourseCard({
  course,
  priority = false,
  headingLevel = 3,
}: {
  course: Course
  /** Set on the first row above the fold so the LCP image is not lazy-loaded. */
  priority?: boolean
  headingLevel?: 2 | 3 | 4
}) {
  const instructor = instructorFor(course)
  const rating = averageRating(course)

  return (
    <Card variant="outline" padding="none" interactive className="sf-card">
      <div className="sf-cover">
        <Image
          src={course.cover}
          alt={course.coverAlt}
          fill
          sizes={CARD_SIZES}
          priority={priority}
        />
        <span className="sf-cover-badge">
          <Badge tone="primary" variant="solid" pill size="sm">
            {categoryName(course.category)}
          </Badge>
        </span>
      </div>

      <Card.Body className="sf-card-body">
        {/*
          Title and subtitle each reserve two lines, so a one-line title does not
          shunt the rating, badges and price out of alignment with the card next
          to it. Both clamp rather than overflow.
        */}
        <Heading level={headingLevel} size="sm" className="sf-card-title">
          <Link className="sf-card-link" href={`/courses/${course.slug}`}>
            {course.title}
          </Link>
        </Heading>

        <Text tone="muted" size="sm" lineClamp={2} className="sf-card-subtitle">
          {course.subtitle}
        </Text>

        <Flex gap={2} align="center">
          <Avatar src={instructor.avatar} name={instructor.name} size="xs" />
          <Text as="span" size="sm" tone="muted">
            {instructor.name}
          </Text>
        </Flex>

        {/*
          Two groups, each `nowrap`, so the row breaks between them rather than
          mid-figure — and there is no bare separator left dangling at the end of
          a wrapped line.
        */}
        <div className="sf-meta">
          <span className="sf-meta-group">
            {/* readOnly renders a single role="img" named "4.7 of 5" — not five radios. */}
            <Rating value={rating} readOnly allowHalf size="sm" />
            <span className="sf-tabular">
              {rating.toFixed(1)} ({formatLearners(ratingsCount(course))})
            </span>
          </span>
          <span className="sf-meta-group">{formatLearners(course.learners)} learners</span>
        </div>

        <Flex gap={2} wrap align="center">
          <Badge tone="neutral" variant="soft" size="sm">
            {totalHours(course)}h
          </Badge>
          <Badge tone="neutral" variant="soft" size="sm">
            {lessonCount(course)} lessons
          </Badge>
          <Badge tone="neutral" variant="outline" size="sm">
            {course.level}
          </Badge>
        </Flex>
      </Card.Body>

      {/* Card.Footer is already a wrapping flex row, so it lays this out itself —
          an inner Flex would not stretch and `justify="between"` would do nothing. */}
      <Card.Footer className="sf-card-footer">
        <span className="sf-price">
          {formatPrice(course.price)}
          {course.listPrice ? <span className="sf-price-was">${course.listPrice}</span> : null}
        </span>
        {course.price === 0 ? (
          <Badge tone="success" variant="soft" pill size="sm">
            Free forever
          </Badge>
        ) : null}
      </Card.Footer>
    </Card>
  )
}
