/**
 * The signed-in learner the /dashboard route renders.
 *
 * All of it is static mock data — this template has no auth and no database — but the
 * shapes are the ones a real implementation would return, so swapping in a fetch is a
 * one-line change per figure.
 */

import { COURSES, getCourse, type Course } from './courses'

export interface Enrollment {
  slug: string
  /** Percent complete, 0–100. Drives the ProgressRing on each card. */
  progress: number
  /** The lesson the resume button jumps to. */
  nextLesson: string
  /** Minutes left at the learner's current pace. */
  minutesLeft: number
  lastOpened: string
}

export interface WeeklyMinutes {
  /** Week-ending label, oldest first. */
  week: string
  minutes: number
}

export const LEARNER = {
  name: 'Alex Rivera',
  avatar: 'https://i.pravatar.cc/160?img=33',
  joined: '2025-11-04',
  /** Consecutive days with at least one lesson. */
  streakDays: 23,
  certificates: 0,
} as const

export const ENROLLMENTS: Enrollment[] = [
  {
    slug: 'ship-it-nextjs-16',
    progress: 72,
    nextLesson: 'Partial prerendering in practice',
    minutesLeft: 218,
    lastOpened: '2026-08-23T19:40:00.000Z',
  },
  {
    slug: 'typescript-for-teams',
    progress: 45,
    nextLesson: 'Branded types for ids that must not mix',
    minutesLeft: 341,
    lastOpened: '2026-08-22T08:15:00.000Z',
  },
  {
    slug: 'css-without-a-framework',
    progress: 91,
    nextLesson: 'Capstone: theme an entire marketing site',
    minutesLeft: 75,
    lastOpened: '2026-08-24T07:05:00.000Z',
  },
  {
    slug: 'postgres-for-app-developers',
    progress: 12,
    nextLesson: 'Keys, constraints and letting the database say no',
    minutesLeft: 623,
    lastOpened: '2026-08-17T21:30:00.000Z',
  },
]

/** Eight weeks of learning minutes, oldest first — the LineChart on the dashboard. */
export const WEEKLY_MINUTES: WeeklyMinutes[] = [
  { week: '30 Jun', minutes: 145 },
  { week: '7 Jul', minutes: 210 },
  { week: '14 Jul', minutes: 178 },
  { week: '21 Jul', minutes: 296 },
  { week: '28 Jul', minutes: 254 },
  { week: '4 Aug', minutes: 331 },
  { week: '11 Aug', minutes: 289 },
  { week: '18 Aug', minutes: 374 },
]

/**
 * Minutes for each of the last 30 days, oldest first — the streak Sparkline.
 * Two zeroes early on are deliberate: a streak counter that never breaks is a
 * chart nobody believes.
 */
export const DAILY_MINUTES: number[] = [
  0, 12, 0, 25, 31, 18, 42, 27, 35, 21, 48, 39, 26, 55, 33, 29, 44, 61, 38, 30, 47, 52, 36, 41, 58,
  49, 34, 62, 45, 71,
]

export function enrolledCourses(): { enrollment: Enrollment; course: Course }[] {
  return ENROLLMENTS.map((enrollment) => ({ enrollment, course: getCourse(enrollment.slug)! })).filter(
    (entry) => Boolean(entry.course),
  )
}

/** Sorted by most recently opened — "Continue learning" only makes sense in that order. */
export function continueLearning(limit = 4) {
  return enrolledCourses()
    .sort((a, b) => Date.parse(b.enrollment.lastOpened) - Date.parse(a.enrollment.lastOpened))
    .slice(0, limit)
}

export function totalMinutesLearned(): number {
  return WEEKLY_MINUTES.reduce((sum, week) => sum + week.minutes, 0)
}

export function averageWeeklyMinutes(): number {
  return Math.round(totalMinutesLearned() / WEEKLY_MINUTES.length)
}

/** Mean completion across everything the learner is enrolled in. */
export function overallProgress(): number {
  if (ENROLLMENTS.length === 0) return 0
  return Math.round(ENROLLMENTS.reduce((sum, e) => sum + e.progress, 0) / ENROLLMENTS.length)
}

/** Courses the learner has not started — the "keep going" rail. */
export function recommended(limit = 3): Course[] {
  const enrolled = new Set(ENROLLMENTS.map((e) => e.slug))
  return COURSES.filter((course) => !enrolled.has(course.slug)).slice(0, limit)
}
