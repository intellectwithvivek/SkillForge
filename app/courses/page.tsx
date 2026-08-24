import type { Metadata } from 'next'
import { Breadcrumb, Section } from '@the_viveksingh/vivek-ui'

import { CourseCard } from '@/components/site/course-card'
import { JsonLd } from '@/components/site/json-ld'
import { CourseCatalogue, type CatalogueItem } from '@/components/courses/course-catalogue'
import {
  CATALOGUE,
  CATEGORIES,
  COURSES,
  LEVELS,
  averageRating,
  type CategorySlug,
  type Level,
} from '@/data/courses'
import { breadcrumbLd, courseListLd, pageMetadata } from '@/lib/seo'

export const metadata: Metadata = pageMetadata({
  title: 'All courses — browse 8 free and paid tech courses',
  description:
    'Filter the SkillForge catalogue by category, level, price and rating. Eight hands-on courses on Next.js, TypeScript, Postgres, CSS, accessibility, delivery and LLMs — two of them free.',
  path: '/courses',
})

const MAX_PRICE = Math.max(...COURSES.map((course) => course.price))
const FREE_COUNT = COURSES.filter((course) => course.price === 0).length

/** Cards are rendered here, on the server, and handed to the client filter as elements. */
const ITEMS: CatalogueItem[] = COURSES.map((course, index) => ({
  meta: {
    slug: course.slug,
    title: course.title,
    subtitle: course.subtitle,
    category: course.category,
    level: course.level,
    price: course.price,
    rating: averageRating(course),
    learners: course.learners,
    tags: course.tags,
  },
  card: <CourseCard course={course} priority={index < 3} />,
}))

const CATEGORY_SLUGS = new Set(CATEGORIES.map((c) => c.slug))

export default async function CoursesPage(props: PageProps<'/courses'>) {
  // Next.js 16: searchParams is a Promise and must be awaited.
  const params = await props.searchParams

  const categoryParam = typeof params.category === 'string' ? params.category : ''
  const levelParam = typeof params.level === 'string' ? params.level : ''
  const queryParam = typeof params.q === 'string' ? params.q : ''

  const initialCategory = CATEGORY_SLUGS.has(categoryParam as CategorySlug)
    ? (categoryParam as CategorySlug)
    : 'all'
  const initialLevel = (LEVELS as string[]).includes(levelParam) ? (levelParam as Level) : 'all'
  const initialFreeOnly = params.free === '1' || params.free === 'true'

  return (
    <Section padding="lg" size="xl">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Courses' },
        ]}
        style={{ marginBlockEnd: 'var(--vk-space-6)' }}
      />

      <Section.Header
        headingLevel={1}
        titleSize="2xl"
        eyebrow="Catalogue"
        title="Every course, filtered how you like"
        description={`${CATALOGUE.courses} courses, ${CATALOGUE.hours} hours, ${FREE_COUNT} of them free forever. Filters run instantly — nothing here needs a round trip.`}
        align="start"
      />

      <CourseCatalogue
        items={ITEMS}
        categories={CATEGORIES.map((c) => ({ slug: c.slug, name: c.name }))}
        levels={LEVELS}
        maxPrice={MAX_PRICE}
        initialCategory={initialCategory}
        initialLevel={initialLevel}
        initialFreeOnly={initialFreeOnly}
        initialQuery={queryParam}
      />

      <JsonLd data={courseListLd(COURSES)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Courses', path: '/courses' },
        ])}
      />
    </Section>
  )
}
