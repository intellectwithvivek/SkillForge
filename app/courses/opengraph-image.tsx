import { ImageResponse } from 'next/og'
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@/lib/og'
import { CATALOGUE, COURSES } from '@/data/courses'

export const alt = 'The SkillForge course catalogue — eight hands-on courses, two of them free'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

const FREE = COURSES.filter((course) => course.price === 0).length

export default function CoursesOpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Catalogue"
        title="Every course, filtered how you like"
        subtitle="Category, level, price and rating filters that run instantly — nothing here needs a round trip to the server."
        facts={[
          `${CATALOGUE.courses} courses`,
          `${CATALOGUE.hours} hours`,
          `${FREE} free forever`,
          '6 categories',
        ]}
      />
    ),
    { ...size },
  )
}
