import { ImageResponse } from 'next/og'
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@/lib/og'
import { CATALOGUE } from '@/data/courses'

export const alt =
  'SkillForge — a free, open-source Next.js 16 course marketplace and LMS template built with VivekUI'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Free · MIT · open source"
        title="Learn by shipping"
        subtitle="A course marketplace and LMS template for Next.js 16, built entirely with VivekUI — 91 components and 6 SVG charts, zero runtime dependencies."
        facts={[
          `${CATALOGUE.courses} courses`,
          `${CATALOGUE.hours} hours`,
          'Learner dashboard',
          '0 runtime deps',
        ]}
      />
    ),
    { ...size },
  )
}
