import { ImageResponse } from 'next/og'
import {
  averageRating,
  categoryName,
  courseSlugs,
  formatPrice,
  getCourse,
  handsOnPercent,
  instructorFor,
  lessonCount,
  totalHours,
} from '@/data/courses'

export const alt = 'Course details on SkillForge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Prerender one card per course alongside the pages themselves. */
export function generateStaticParams() {
  return courseSlugs().map((slug) => ({ slug }))
}

/**
 * A per-course share card.
 *
 * Next.js 16 makes `params` a Promise inside image-generating functions, the same
 * change as everywhere else — awaiting it is not optional here.
 */
export default async function CourseOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = getCourse(slug)

  if (!course) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#05100c',
            color: '#f5f5f7',
            fontSize: 56,
            fontFamily: 'sans-serif',
          }}
        >
          SkillForge
        </div>
      ),
      { ...size },
    )
  }

  const instructor = instructorFor(course)
  const facts = [
    `${totalHours(course)} hours`,
    `${lessonCount(course)} lessons`,
    course.level,
    `${handsOnPercent(course)}% hands-on`,
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 68,
          background: '#05100c',
          backgroundImage:
            'radial-gradient(circle at 82% 8%, rgba(52,211,153,0.2) 0%, transparent 55%)',
          color: '#f5f5f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '5px solid #34d399',
                borderRightColor: 'transparent',
                transform: 'rotate(-45deg)',
              }}
            />
            <div style={{ fontSize: 27, fontWeight: 700 }}>SkillForge</div>
          </div>
          <div
            style={{
              padding: '9px 20px',
              borderRadius: 999,
              background: 'rgba(52,211,153,0.16)',
              color: '#6ee7b7',
              fontSize: 23,
              fontWeight: 600,
            }}
          >
            {categoryName(course.category)}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.8 }}>
            {course.title}
          </div>
          <div style={{ fontSize: 28, color: '#a7b6ae', lineHeight: 1.35, maxWidth: 940 }}>
            {course.subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            {facts.map((fact) => (
              <div
                key={fact}
                style={{
                  padding: '9px 18px',
                  borderRadius: 10,
                  border: '1px solid rgba(245,245,247,0.18)',
                  color: '#cdd8d2',
                  fontSize: 22,
                }}
              >
                {fact}
              </div>
            ))}
          </div>

          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ fontSize: 25, color: '#a7b6ae' }}>
              {`${instructor.name} · ${averageRating(course).toFixed(1)} out of 5`}
            </div>
            <div style={{ fontSize: 44, fontWeight: 700, color: '#34d399' }}>
              {formatPrice(course.price)}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
