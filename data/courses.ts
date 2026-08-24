/**
 * Mock catalogue for the SkillForge template.
 *
 * Two deliberate choices about shape:
 *
 * 1. **The content mix is derived, never declared.** Each lesson carries a `kind`, so
 *    the "What's inside" pie is computed from the curriculum itself. A declared
 *    hours-per-kind field would be a second source of truth that drifts the moment
 *    someone edits a lesson.
 * 2. **The star average is derived from the distribution.** Storing both an average and
 *    a breakdown lets them disagree; here the bars and the headline figure cannot.
 */

export type Level = 'Beginner' | 'Intermediate' | 'Advanced'

export type CategorySlug = 'frontend' | 'backend' | 'fullstack' | 'devops' | 'design' | 'ai'

export interface Category {
  slug: CategorySlug
  name: string
  blurb: string
}

/** Video, quiz or hands-on project — the three things a lesson can be. */
export type LessonKind = 'video' | 'quiz' | 'project'

export interface Lesson {
  id: string
  title: string
  /** Runtime in minutes. Feeds both the section total and the content-mix pie. */
  minutes: number
  kind: LessonKind
  /** Free to watch before enrolling. Everything else shows a lock badge. */
  preview?: boolean
}

export interface CurriculumSection {
  id: string
  title: string
  summary: string
  lessons: Lesson[]
}

export interface Credential {
  year: string
  title: string
  detail: string
}

export interface Instructor {
  id: string
  name: string
  role: string
  avatar: string
  bio: string
  credentials: Credential[]
}

export interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  /** ISO 8601. Rendered with RelativeTime, which needs a machine-readable instant. */
  postedAt: string
  body: string
}

/** Counts for 5, 4, 3, 2 and 1 stars, in that order. */
export type RatingBreakdown = readonly [number, number, number, number, number]

/** A learning outcome: a scannable heading and the sentence that fills it in. */
export interface Outcome {
  title: string
  detail: string
}

export interface Course {
  slug: string
  title: string
  subtitle: string
  category: CategorySlug
  level: Level
  /** US dollars. `0` means free. */
  price: number
  /** Struck-through list price, when the course is discounted. */
  listPrice?: number
  learners: number
  ratingBreakdown: RatingBreakdown
  cover: string
  coverAlt: string
  instructorId: string
  /** ISO 8601 date of the last content refresh. */
  updatedAt: string
  tags: string[]
  outcomes: Outcome[]
  includes: string[]
  curriculum: CurriculumSection[]
  reviews: Review[]
}

/* ------------------------------------------------------------------------ */
/* Categories                                                                */
/* ------------------------------------------------------------------------ */

export const CATEGORIES: Category[] = [
  { slug: 'frontend', name: 'Frontend', blurb: 'Browsers, components and the pixels people touch.' },
  { slug: 'backend', name: 'Backend', blurb: 'Data, queries and the code behind the request.' },
  { slug: 'fullstack', name: 'Full-stack', blurb: 'One codebase, both ends, shipped.' },
  { slug: 'devops', name: 'DevOps', blurb: 'Getting it off your laptop and keeping it up.' },
  { slug: 'design', name: 'Design', blurb: 'Craft, type, colour and access.' },
  { slug: 'ai', name: 'AI', blurb: 'Models in production, not in notebooks.' },
]

export const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced']

export function categoryName(slug: CategorySlug): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug
}

/* ------------------------------------------------------------------------ */
/* Instructors                                                               */
/* ------------------------------------------------------------------------ */

export const INSTRUCTORS: Record<string, Instructor> = {
  'maya-okonkwo': {
    id: 'maya-okonkwo',
    name: 'Maya Okonkwo',
    role: 'Principal engineer · ex-platform lead at Northwind',
    avatar: 'https://i.pravatar.cc/160?img=45',
    bio: 'Maya has spent eleven years on the boring half of frontend: the render path, the cache, the deploy. She teaches the way she reviews code — by asking what happens on the slow connection, on the old phone, on the day the API is down. Her courses ship a real repository, not a starter kit, and every lesson ends with something running.',
    credentials: [
      { year: '2015', title: 'Joined Northwind Commerce', detail: 'Built the checkout that still handles 40k orders an hour.' },
      { year: '2019', title: 'Platform lead', detail: 'Moved 240 engineers onto a single React build without a freeze week.' },
      { year: '2022', title: 'Independent', detail: 'Consulting on render performance for retail and media teams.' },
      { year: '2024', title: 'First course on SkillForge', detail: '31,000 learners and a 4.8 average across three titles.' },
    ],
  },
  'dev-raghunathan': {
    id: 'dev-raghunathan',
    name: 'Dev Raghunathan',
    role: 'Staff engineer · type systems and developer tooling',
    avatar: 'https://i.pravatar.cc/160?img=68',
    bio: 'Dev maintains three widely-used TypeScript codemods and has opinions about all of them. He came to teaching after watching the same four type errors block the same four teams, and now spends his time turning compiler messages into things a human can act on.',
    credentials: [
      { year: '2017', title: 'Compiler infrastructure at Lumen', detail: 'Owned the build for a 900-package monorepo.' },
      { year: '2021', title: 'Open source', detail: 'Author of ts-migrate-strict, 8k stars.' },
      { year: '2023', title: 'Conference circuit', detail: 'Talks at TSConf, JSNation and Frontend Masters.' },
    ],
  },
  'ines-marchetti': {
    id: 'ines-marchetti',
    name: 'Inês Marchetti',
    role: 'Design engineer · accessibility specialist',
    avatar: 'https://i.pravatar.cc/160?img=32',
    bio: 'Inês sits between design and engineering and refuses to pick a side. She audits for WCAG by day and rebuilds the offending components by night, which is why her lessons always come with the fixed version next to the broken one.',
    credentials: [
      { year: '2016', title: 'Design systems at Aurora Health', detail: 'A component library used across 60 clinical products.' },
      { year: '2020', title: 'IAAP CPACC', detail: 'Certified Professional in Accessibility Core Competencies.' },
      { year: '2023', title: 'Public audits', detail: 'Published teardowns of 40 popular component libraries.' },
    ],
  },
  'tomas-lindqvist': {
    id: 'tomas-lindqvist',
    name: 'Tomás Lindqvist',
    role: 'Database engineer · Postgres since 8.4',
    avatar: 'https://i.pravatar.cc/160?img=14',
    bio: 'Tomás has been paged by more Postgres instances than he can count and has written the post-mortem for most of them. He teaches query planning the way a mechanic teaches engines: with the cover off and the thing running.',
    credentials: [
      { year: '2014', title: 'DBA at Kestrel Financial', detail: 'A 14 TB primary with a four-nine SLA.' },
      { year: '2019', title: 'Consulting practice', detail: 'Index and plan reviews for 70+ product teams.' },
      { year: '2022', title: 'Contributor', detail: 'Patches to pg_stat_statements and the EXPLAIN output format.' },
    ],
  },
  'aisha-benali': {
    id: 'aisha-benali',
    name: 'Aisha Benali',
    role: 'Site reliability engineer · platform and delivery',
    avatar: 'https://i.pravatar.cc/160?img=41',
    bio: 'Aisha runs the pipeline that runs everything else. She teaches deployment as a design problem rather than a checklist, starting from the question most tutorials skip: what does rolling this back actually look like at 3am?',
    credentials: [
      { year: '2018', title: 'SRE at Halcyon Media', detail: 'Cut deploy time from 40 minutes to 4.' },
      { year: '2021', title: 'Incident command', detail: 'Wrote the on-call handbook now used company-wide.' },
      { year: '2024', title: 'Teaching', detail: 'Delivery workshops for 30 engineering orgs.' },
    ],
  },
  'jonah-price': {
    id: 'jonah-price',
    name: 'Jonah Price',
    role: 'ML engineer · applied language models',
    avatar: 'https://i.pravatar.cc/160?img=59',
    bio: 'Jonah builds language-model features that survive contact with real users — which mostly means evaluation, cost control and knowing when not to call the model at all. He is refreshingly unromantic about the technology and it makes the course better.',
    credentials: [
      { year: '2019', title: 'Research engineering at Vellum Labs', detail: 'Retrieval systems for legal search.' },
      { year: '2023', title: 'Head of applied AI, Corvid', detail: 'Shipped four LLM features to 2M users.' },
      { year: '2025', title: 'Open source', detail: 'Author of evalkit, a harness for prompt regression tests.' },
    ],
  },
}

export function instructorFor(course: Course): Instructor {
  return INSTRUCTORS[course.instructorId]
}

/* ------------------------------------------------------------------------ */
/* Courses                                                                   */
/* ------------------------------------------------------------------------ */

export const COURSES: Course[] = [
  {
    slug: 'ship-it-nextjs-16',
    title: 'Ship It: Next.js 16 from Zero to Production',
    subtitle:
      'Build and deploy a real application on the App Router — async request APIs, streaming, caching and the deploy that follows.',
    category: 'fullstack',
    level: 'Intermediate',
    price: 89,
    listPrice: 149,
    learners: 18420,
    ratingBreakdown: [2841, 612, 118, 34, 21],
    cover: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    coverAlt:
      'A laptop and an external monitor on a bright white desk, both showing an open code editor',
    instructorId: 'maya-okonkwo',
    updatedAt: '2026-07-14',
    tags: ['Next.js', 'React', 'App Router', 'Deployment'],
    outcomes: [
      {
        title: 'Structure an app that scales',
        detail:
          'Model a real product with the App Router — layouts, nested routes and route groups that are still readable at fifty pages.',
      },
      {
        title: 'Get the async request APIs right',
        detail:
          'params, searchParams, cookies and headers are all promises in Next.js 16. Handle them correctly instead of chasing the errors later.',
      },
      {
        title: 'Choose server or client deliberately',
        detail:
          'Place the boundary on evidence — bundle size and interaction cost — rather than on habit.',
      },
      {
        title: 'Stream the slow parts',
        detail:
          'Put Suspense where it pays off, so the fast half of a page paints immediately instead of waiting on the slow half.',
      },
      {
        title: 'Debug a production build',
        detail:
          'Bundle analysis, hydration mismatches, and finding the render you did not expect.',
      },
      {
        title: 'Deploy and read the numbers',
        detail:
          'Ship it, roll it back, and know afterwards whether it actually got faster.',
      },
    ],
    includes: [
      '14 hours of video',
      '9 hands-on projects',
      'A finished repository you keep',
      'Lifetime access',
      'Certificate of completion',
    ],
    curriculum: [
      {
        id: 'foundations',
        title: 'Foundations you will actually use',
        summary: 'The mental model first: what runs where, and when.',
        lessons: [
          { id: 'f1', title: 'What the App Router changed, and why', minutes: 18, kind: 'video', preview: true },
          { id: 'f2', title: 'The request lifecycle, end to end', minutes: 24, kind: 'video' },
          { id: 'f3', title: 'Server components are the default — living with that', minutes: 31, kind: 'video' },
          { id: 'f4', title: 'Async params, searchParams, cookies and headers', minutes: 27, kind: 'video' },
          { id: 'f5', title: 'Check your model', minutes: 12, kind: 'quiz' },
        ],
      },
      {
        id: 'routing',
        title: 'Routing that survives a redesign',
        summary: 'Layouts, groups, parallel routes and the file conventions worth knowing.',
        lessons: [
          { id: 'r1', title: 'Layouts, templates and where state survives', minutes: 26, kind: 'video' },
          { id: 'r2', title: 'Route groups and private folders', minutes: 19, kind: 'video' },
          { id: 'r3', title: 'Loading, error and not-found, done properly', minutes: 22, kind: 'video' },
          { id: 'r4', title: 'Parallel and intercepting routes for a photo modal', minutes: 34, kind: 'video' },
          { id: 'r5', title: 'Project: route the whole application', minutes: 75, kind: 'project' },
        ],
      },
      {
        id: 'data',
        title: 'Data, caching and revalidation',
        summary: 'The part everyone gets wrong twice before getting it right.',
        lessons: [
          { id: 'd1', title: 'Fetching in a server component', minutes: 21, kind: 'video' },
          { id: 'd2', title: 'What is cached, for how long, and how to find out', minutes: 38, kind: 'video' },
          { id: 'd3', title: 'Revalidating by tag and by path', minutes: 29, kind: 'video' },
          { id: 'd4', title: 'Server actions and the mutation round trip', minutes: 33, kind: 'video' },
          { id: 'd5', title: 'Project: a dashboard that revalidates on write', minutes: 90, kind: 'project' },
          { id: 'd6', title: 'Caching quiz', minutes: 14, kind: 'quiz' },
        ],
      },
      {
        id: 'performance',
        title: 'Streaming and performance',
        summary: 'Make the fast part fast and stop waiting on the slow part.',
        lessons: [
          { id: 'p1', title: 'Suspense boundaries where they pay off', minutes: 28, kind: 'video' },
          { id: 'p2', title: 'Partial prerendering in practice', minutes: 25, kind: 'video' },
          { id: 'p3', title: 'next/image, fonts and the layout shift budget', minutes: 30, kind: 'video' },
          { id: 'p4', title: 'Reading a bundle analysis without panicking', minutes: 23, kind: 'video' },
          { id: 'p5', title: 'Project: take a page from 4.1s to under 1s', minutes: 85, kind: 'project' },
        ],
      },
      {
        id: 'shipping',
        title: 'Shipping and living with it',
        summary: 'Deploy, observe, roll back, repeat.',
        lessons: [
          { id: 's1', title: 'Environment variables and the secrets you almost leaked', minutes: 20, kind: 'video' },
          { id: 's2', title: 'Deploying, previewing and rolling back', minutes: 26, kind: 'video' },
          { id: 's3', title: 'Instrumentation and the four numbers worth watching', minutes: 24, kind: 'video' },
          { id: 's4', title: 'Capstone: ship the app and defend the numbers', minutes: 120, kind: 'project' },
        ],
      },
    ],
    reviews: [
      {
        id: 'rv1',
        author: 'Priya Nandakumar',
        avatar: 'https://i.pravatar.cc/96?img=26',
        rating: 5,
        postedAt: '2026-07-30T09:12:00.000Z',
        body: 'The caching module alone was worth the price. I had been guessing for eight months and I stopped guessing in an afternoon. The bit where she deliberately breaks revalidation and then reads the logs to find it is the best teaching I have seen on this.',
      },
      {
        id: 'rv2',
        author: 'Marcus Feld',
        avatar: 'https://i.pravatar.cc/96?img=53',
        rating: 5,
        postedAt: '2026-06-18T16:40:00.000Z',
        body: 'I came in already using the App Router at work and still learned a lot, mostly about what I had been doing for no reason. The async request API section saved me a day on the 16 upgrade.',
      },
      {
        id: 'rv3',
        author: 'Sofia Alvarez',
        avatar: 'https://i.pravatar.cc/96?img=20',
        rating: 4,
        postedAt: '2026-05-02T11:05:00.000Z',
        body: 'Excellent, though the last project assumes more comfort with SQL than the description suggests. I paused and did the Postgres course first, came back, and it clicked. Docking a star for the prerequisite, not the teaching.',
      },
    ],
  },

  {
    slug: 'typescript-for-teams',
    title: 'TypeScript for Teams',
    subtitle:
      'Types that catch real bugs and stay out of the way — for codebases with more than one author.',
    category: 'frontend',
    level: 'Intermediate',
    price: 69,
    listPrice: 99,
    learners: 24310,
    ratingBreakdown: [3980, 1104, 231, 58, 27],
    cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80',
    coverAlt:
      'A close-up, sharply angled view of syntax-highlighted source code on a dark screen',
    instructorId: 'dev-raghunathan',
    updatedAt: '2026-08-02',
    tags: ['TypeScript', 'Tooling', 'Monorepo', 'Refactoring'],
    outcomes: [
      {
        title: 'Read an error to its cause',
        detail:
          'Work a compiler message back to what is actually wrong, instead of reaching for any and moving on.',
      },
      {
        title: 'Design types for other people',
        detail:
          'Write types a teammate can extend without asking you first — types that document the API rather than obstruct it.',
      },
      {
        title: 'Turn on strict mode safely',
        detail:
          'Migrate a large codebase file by file with a ratchet, and never stop shipping to do it.',
      },
      {
        title: 'Use generics where they earn it',
        detail:
          'Generics and conditional types cost readability. Learn where that price is worth paying and where it is not.',
      },
      {
        title: 'Make the boundary honest',
        detail:
          'Type an API edge so a backend change breaks the build rather than production.',
      },
    ],
    includes: ['11 hours of video', '7 hands-on projects', 'A migration playbook', 'Lifetime access', 'Certificate of completion'],
    curriculum: [
      {
        id: 'ground',
        title: 'Ground rules',
        summary: 'What the compiler is actually doing, so the errors stop being mysterious.',
        lessons: [
          { id: 'g1', title: 'Structural typing, and why it surprises people', minutes: 22, kind: 'video', preview: true },
          { id: 'g2', title: 'Reading an error from the bottom up', minutes: 26, kind: 'video' },
          { id: 'g3', title: 'Narrowing: the feature you use most and understand least', minutes: 31, kind: 'video' },
          { id: 'g4', title: 'Ground rules quiz', minutes: 10, kind: 'quiz' },
        ],
      },
      {
        id: 'design',
        title: 'Designing types for other people',
        summary: 'The difference between a type that documents and one that obstructs.',
        lessons: [
          { id: 'ds1', title: 'Discriminated unions as an API design tool', minutes: 34, kind: 'video' },
          { id: 'ds2', title: 'Generics: when, and how far', minutes: 29, kind: 'video' },
          { id: 'ds3', title: 'Conditional and mapped types without the write-only code', minutes: 37, kind: 'video' },
          { id: 'ds4', title: 'Branded types for ids that must not mix', minutes: 21, kind: 'video' },
          { id: 'ds5', title: 'Project: type a component library API', minutes: 80, kind: 'project' },
        ],
      },
      {
        id: 'boundaries',
        title: 'Boundaries',
        summary: 'Where the types stop being true and what to do about it.',
        lessons: [
          { id: 'b1', title: 'Parsing, not casting, at the network edge', minutes: 28, kind: 'video' },
          { id: 'b2', title: 'Typing a REST client so the backend cannot lie', minutes: 32, kind: 'video' },
          { id: 'b3', title: 'unknown, never, and the honest use of any', minutes: 24, kind: 'video' },
          { id: 'b4', title: 'Project: a fully typed data layer', minutes: 70, kind: 'project' },
          { id: 'b5', title: 'Boundaries quiz', minutes: 12, kind: 'quiz' },
        ],
      },
      {
        id: 'migration',
        title: 'Strict mode in a codebase you did not write',
        summary: 'Incremental, reviewable, and nobody has to stop shipping.',
        lessons: [
          { id: 'm1', title: 'Measuring the real size of the problem', minutes: 19, kind: 'video' },
          { id: 'm2', title: 'File-by-file strictness with a ratchet', minutes: 27, kind: 'video' },
          { id: 'm3', title: 'Codemods that are safe to review', minutes: 30, kind: 'video' },
          { id: 'm4', title: 'Project: migrate a 400-file package', minutes: 95, kind: 'project' },
        ],
      },
    ],
    reviews: [
      {
        id: 'rv1',
        author: 'Elena Duarte',
        avatar: 'https://i.pravatar.cc/96?img=25',
        rating: 5,
        postedAt: '2026-08-09T08:20:00.000Z',
        body: 'The "when NOT to reach for a generic" lesson has already improved two code reviews on my team. Dev is unusually good at explaining the cost of a clever type, which nobody else does.',
      },
      {
        id: 'rv2',
        author: 'Ben Kowalski',
        avatar: 'https://i.pravatar.cc/96?img=51',
        rating: 5,
        postedAt: '2026-07-01T13:33:00.000Z',
        body: 'We used the ratchet approach from module 4 on a genuinely horrible legacy package. Six weeks, no freeze, strict everywhere. I have sent this course to every engineer we hire.',
      },
      {
        id: 'rv3',
        author: 'Hana Sato',
        avatar: 'https://i.pravatar.cc/96?img=9',
        rating: 4,
        postedAt: '2026-04-22T19:55:00.000Z',
        body: 'Very strong on design and migration. A little thin on decorators and older config styles, which I still have to deal with. Worth it anyway.',
      },
    ],
  },

  {
    slug: 'react-server-components-properly',
    title: 'React Server Components, Properly',
    subtitle:
      'The boundary, the payload and the render — what actually happens between the server and the browser.',
    category: 'frontend',
    level: 'Advanced',
    price: 99,
    learners: 9640,
    ratingBreakdown: [1512, 361, 74, 19, 8],
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    coverAlt: 'A laptop screen filled with nested component markup in a dark editor',
    instructorId: 'maya-okonkwo',
    updatedAt: '2026-06-27',
    tags: ['React', 'RSC', 'Performance', 'Architecture'],
    outcomes: [
      {
        title: 'Explain the boundary exactly',
        detail:
          'Describe what a client boundary is precisely enough to place one on purpose rather than by trial and error.',
      },
      {
        title: 'Read the RSC payload',
        detail: 'Open the wire format and see exactly what crossed it.',
      },
      {
        title: 'Compose without prop-drilling',
        detail:
          'Use children as the escape hatch, so server data does not have to be threaded through every client component.',
      },
      {
        title: 'Avoid the data waterfall',
        detail:
          'Get server data into client state in one round trip, with promises as props and use().',
      },
      {
        title: 'Spot accidental client trees',
        detail:
          'Four common patterns quietly turn a whole subtree into client code. Learn to recognise all four on sight.',
      },
    ],
    includes: ['9 hours of video', '5 hands-on projects', 'Payload inspection tooling', 'Lifetime access', 'Certificate of completion'],
    curriculum: [
      {
        id: 'model',
        title: 'The model',
        summary: 'What a server component is, stated exactly once and precisely.',
        lessons: [
          { id: 'mo1', title: 'Two renders, one tree', minutes: 25, kind: 'video', preview: true },
          { id: 'mo2', title: 'Reading the RSC payload by hand', minutes: 33, kind: 'video' },
          { id: 'mo3', title: 'Serialisation: what can cross the boundary', minutes: 27, kind: 'video' },
          { id: 'mo4', title: 'Model quiz', minutes: 11, kind: 'quiz' },
        ],
      },
      {
        id: 'composition',
        title: 'Composition patterns',
        summary: 'Keeping the client bundle small without contorting the code.',
        lessons: [
          { id: 'c1', title: 'children as the escape hatch', minutes: 29, kind: 'video' },
          { id: 'c2', title: 'The four accidental client trees', minutes: 36, kind: 'video' },
          { id: 'c3', title: 'Context in a server-first app', minutes: 24, kind: 'video' },
          { id: 'c4', title: 'Project: cut a bundle in half without removing a feature', minutes: 85, kind: 'project' },
        ],
      },
      {
        id: 'data-flow',
        title: 'Data flow',
        summary: 'Server data reaching client state without a waterfall.',
        lessons: [
          { id: 'df1', title: 'Hoisting fetches above the boundary', minutes: 26, kind: 'video' },
          { id: 'df2', title: 'Promises as props, and use()', minutes: 31, kind: 'video' },
          { id: 'df3', title: 'Optimistic updates that reconcile honestly', minutes: 34, kind: 'video' },
          { id: 'df4', title: 'Project: a live-updating table', minutes: 78, kind: 'project' },
          { id: 'df5', title: 'Data flow quiz', minutes: 13, kind: 'quiz' },
        ],
      },
      {
        id: 'edges',
        title: 'Edges and failure modes',
        summary: 'Hydration, third-party libraries and the errors with unhelpful messages.',
        lessons: [
          { id: 'e1', title: 'Hydration mismatches: finding the real cause', minutes: 32, kind: 'video' },
          { id: 'e2', title: 'Wrapping a library that has never heard of RSC', minutes: 28, kind: 'video' },
          { id: 'e3', title: 'Capstone: audit and re-architect a client-heavy app', minutes: 110, kind: 'project' },
        ],
      },
    ],
    reviews: [
      {
        id: 'rv1',
        author: 'Theo Brandt',
        avatar: 'https://i.pravatar.cc/96?img=60',
        rating: 5,
        postedAt: '2026-07-19T10:02:00.000Z',
        body: 'Reading the payload by hand in lesson two rewired how I think about the boundary. Everything after that felt obvious, which is the mark of a good explanation.',
      },
      {
        id: 'rv2',
        author: 'Nadia Rahman',
        avatar: 'https://i.pravatar.cc/96?img=44',
        rating: 5,
        postedAt: '2026-06-05T14:47:00.000Z',
        body: 'The "four accidental client trees" lesson found three of them in our codebase within an hour. Genuinely advanced material, and it assumes you can already write React well — which I appreciated.',
      },
      {
        id: 'rv3',
        author: 'Owen Fitzgerald',
        avatar: 'https://i.pravatar.cc/96?img=12',
        rating: 4,
        postedAt: '2026-03-11T07:29:00.000Z',
        body: 'Dense in the best way, but pace yourself — I tried two modules in an evening and retained none of it. Second pass at half speed was much better.',
      },
    ],
  },

  {
    slug: 'css-without-a-framework',
    title: 'CSS Without a Framework',
    subtitle:
      'Modern layout, custom properties and container queries — the browser is the framework now.',
    category: 'design',
    level: 'Beginner',
    price: 0,
    learners: 41280,
    ratingBreakdown: [5210, 1487, 302, 71, 44],
    cover: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&q=80',
    coverAlt:
      'Browser developer tools showing HTML markup beside a panel of CSS style rules',
    instructorId: 'ines-marchetti',
    updatedAt: '2026-08-11',
    tags: ['CSS', 'Layout', 'Design systems', 'Free'],
    outcomes: [
      {
        title: 'Choose grid or flexbox instantly',
        detail:
          'A decision procedure that takes ten seconds, instead of trying one and then the other.',
      },
      {
        title: 'Build a theme from custom properties',
        detail:
          'One layer of tokens a dark-mode toggle can flip, with no build step and no JavaScript.',
      },
      {
        title: 'Make components respond to themselves',
        detail:
          'Container queries let a card react to its own width, so it stacks correctly in a sidebar even on a wide screen.',
      },
      {
        title: 'Keep specificity flat',
        detail:
          'Wrapping library selectors in :where() gives you overrides that simply work, with no !important anywhere.',
      },
      {
        title: 'Write CSS that can be deleted',
        detail:
          'Structure a stylesheet so a teammate can remove a component six months later without breaking three others.',
      },
    ],
    includes: ['8 hours of video', '6 hands-on projects', 'A token starter sheet', 'Lifetime access', 'Certificate of completion'],
    curriculum: [
      {
        id: 'layout',
        title: 'Layout, decided',
        summary: 'A decision procedure, not a list of properties.',
        lessons: [
          { id: 'l1', title: 'Flexbox or grid: choosing in ten seconds', minutes: 20, kind: 'video', preview: true },
          { id: 'l2', title: 'Intrinsic sizing and why min-width matters', minutes: 26, kind: 'video' },
          { id: 'l3', title: 'Subgrid for aligned cards', minutes: 23, kind: 'video' },
          { id: 'l4', title: 'Logical properties, and RTL for free', minutes: 18, kind: 'video' },
          { id: 'l5', title: 'Project: a responsive pricing page, no media queries', minutes: 65, kind: 'project' },
        ],
      },
      {
        id: 'tokens',
        title: 'Custom properties as a design system',
        summary: 'One layer of variables that a whole product can theme from.',
        lessons: [
          { id: 't1', title: 'Naming tokens so they survive a rebrand', minutes: 22, kind: 'video' },
          { id: 't2', title: 'Colour with oklch and color-mix', minutes: 28, kind: 'video' },
          { id: 't3', title: 'Dark mode with one attribute', minutes: 21, kind: 'video' },
          { id: 't4', title: 'Fluid type without a plugin', minutes: 24, kind: 'video' },
          { id: 't5', title: 'Tokens quiz', minutes: 10, kind: 'quiz' },
        ],
      },
      {
        id: 'components',
        title: 'Components that respond to themselves',
        summary: 'Container queries change how you write a card.',
        lessons: [
          { id: 'cq1', title: 'Container queries from first principles', minutes: 27, kind: 'video' },
          { id: 'cq2', title: ':has() and the parent selector we waited for', minutes: 25, kind: 'video' },
          { id: 'cq3', title: 'Cascade layers for predictable overrides', minutes: 23, kind: 'video' },
          { id: 'cq4', title: 'Project: one card, four contexts', minutes: 60, kind: 'project' },
        ],
      },
      {
        id: 'polish',
        title: 'Polish and restraint',
        summary: 'Motion, focus and the things that make it feel finished.',
        lessons: [
          { id: 'pl1', title: 'Focus styles worth keeping', minutes: 19, kind: 'video' },
          { id: 'pl2', title: 'Motion that respects prefers-reduced-motion', minutes: 22, kind: 'video' },
          { id: 'pl3', title: 'Capstone: theme an entire marketing site', minutes: 75, kind: 'project' },
        ],
      },
    ],
    reviews: [
      {
        id: 'rv1',
        author: 'Grace Whitfield',
        avatar: 'https://i.pravatar.cc/96?img=31',
        rating: 5,
        postedAt: '2026-08-15T12:14:00.000Z',
        body: 'Free, and better than two paid CSS courses I have taken. The container query module changed how I build components — I have not written a component-level media query since.',
      },
      {
        id: 'rv2',
        author: 'Rafael Monteiro',
        avatar: 'https://i.pravatar.cc/96?img=57',
        rating: 5,
        postedAt: '2026-07-08T17:41:00.000Z',
        body: 'I came from a utility-class background and was sceptical. The token lesson made the case better than any argument on the internet has. Now I do both, deliberately.',
      },
      {
        id: 'rv3',
        author: 'Lucy Chen',
        avatar: 'https://i.pravatar.cc/96?img=5',
        rating: 4,
        postedAt: '2026-05-19T09:08:00.000Z',
        body: 'Great for the modern stuff. If you have to support older browsers at work you will still need to check support tables yourself — the course assumes evergreen.',
      },
    ],
  },

  {
    slug: 'postgres-for-app-developers',
    title: 'Postgres for Application Developers',
    subtitle:
      'Schema, indexes and query plans — enough database to stop the 3am page.',
    category: 'backend',
    level: 'Intermediate',
    price: 79,
    listPrice: 119,
    learners: 15730,
    ratingBreakdown: [2360, 590, 121, 30, 14],
    cover: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=1200&q=80',
    coverAlt:
      'Overhead view of a person working at a keyboard between two bright light panels in a darkened room',
    instructorId: 'tomas-lindqvist',
    updatedAt: '2026-05-30',
    tags: ['Postgres', 'SQL', 'Indexes', 'Performance'],
    outcomes: [
      {
        title: 'Design a schema that lasts',
        detail:
          'Make the decisions that are cheap now and expensive in a year, so you are not migrating every sprint.',
      },
      {
        title: 'Read a query plan',
        detail:
          'Work through EXPLAIN ANALYZE line by line and find the one that is costing you the request.',
      },
      {
        title: 'Pick the right index',
        detail:
          'B-tree, GIN, GiST or BRIN — plus how to recognise the four indexes you should delete.',
      },
      {
        title: 'Reason about concurrency',
        detail:
          'Understand isolation levels well enough to predict a race before it reaches production.',
      },
      {
        title: 'Fix N+1 at the query level',
        detail:
          'Solve it in SQL rather than in ORM configuration, where the fix tends not to survive a refactor.',
      },
    ],
    includes: ['12 hours of video', '8 hands-on projects', 'A seeded 5M-row playground database', 'Lifetime access', 'Certificate of completion'],
    curriculum: [
      {
        id: 'schema',
        title: 'Schema first',
        summary: 'Decisions that are cheap now and expensive in a year.',
        lessons: [
          { id: 'sc1', title: 'Normalising far enough and no further', minutes: 24, kind: 'video', preview: true },
          { id: 'sc2', title: 'Keys, constraints and letting the database say no', minutes: 29, kind: 'video' },
          { id: 'sc3', title: 'Choosing types: text, numeric, timestamptz, jsonb', minutes: 31, kind: 'video' },
          { id: 'sc4', title: 'Migrations that do not lock the table', minutes: 27, kind: 'video' },
          { id: 'sc5', title: 'Project: model a marketplace', minutes: 80, kind: 'project' },
        ],
      },
      {
        id: 'query',
        title: 'Queries and plans',
        summary: 'The planner is not a mystery once you can read its output.',
        lessons: [
          { id: 'q1', title: 'EXPLAIN, ANALYZE, BUFFERS — line by line', minutes: 38, kind: 'video' },
          { id: 'q2', title: 'Joins, and why the planner picked that one', minutes: 33, kind: 'video' },
          { id: 'q3', title: 'CTEs, window functions and lateral joins', minutes: 36, kind: 'video' },
          { id: 'q4', title: 'Project: take a 9-second report under 200ms', minutes: 95, kind: 'project' },
          { id: 'q5', title: 'Plan-reading quiz', minutes: 15, kind: 'quiz' },
        ],
      },
      {
        id: 'indexes',
        title: 'Indexes',
        summary: 'Which one, on what, and what it costs you on write.',
        lessons: [
          { id: 'i1', title: 'B-tree, GIN, GiST and BRIN — a decision tree', minutes: 30, kind: 'video' },
          { id: 'i2', title: 'Composite indexes and column order', minutes: 26, kind: 'video' },
          { id: 'i3', title: 'Partial and expression indexes', minutes: 24, kind: 'video' },
          { id: 'i4', title: 'Finding indexes nobody uses', minutes: 21, kind: 'video' },
          { id: 'i5', title: 'Project: index a slow write-heavy table', minutes: 70, kind: 'project' },
        ],
      },
      {
        id: 'concurrency',
        title: 'Concurrency and the real world',
        summary: 'Locks, isolation and the failure you will meet in production.',
        lessons: [
          { id: 'cc1', title: 'Isolation levels, demonstrated with two terminals', minutes: 34, kind: 'video' },
          { id: 'cc2', title: 'Deadlocks: causing one, then fixing it', minutes: 28, kind: 'video' },
          { id: 'cc3', title: 'Connection pooling and why you ran out', minutes: 25, kind: 'video' },
          { id: 'cc4', title: 'Capstone: diagnose a production slowdown', minutes: 105, kind: 'project' },
        ],
      },
    ],
    reviews: [
      {
        id: 'rv1',
        author: 'Idris Mahmoud',
        avatar: 'https://i.pravatar.cc/96?img=52',
        rating: 5,
        postedAt: '2026-08-01T15:26:00.000Z',
        body: 'The two-terminal isolation demo is the first time transaction isolation has ever made sense to me, and I have read the docs three times. Tomás just shows you the anomaly happening.',
      },
      {
        id: 'rv2',
        author: 'Clara Bergström',
        avatar: 'https://i.pravatar.cc/96?img=24',
        rating: 5,
        postedAt: '2026-06-22T11:19:00.000Z',
        body: 'I am a frontend engineer who kept getting handed slow endpoints. I can now read a plan and tell the backend team exactly which index is missing. Worth every hour.',
      },
      {
        id: 'rv3',
        author: 'Yusuf Demir',
        avatar: 'https://i.pravatar.cc/96?img=15',
        rating: 3,
        postedAt: '2026-04-03T20:02:00.000Z',
        body: 'Content is excellent but the playground database took me most of an evening to get running on Windows. The Docker path in the notes is the one to use — I wish that were said up front.',
      },
    ],
  },

  {
    slug: 'laptop-to-load-balancer',
    title: 'From Laptop to Load Balancer',
    subtitle:
      'Containers, pipelines and the deploy you can undo — delivery for people who build the product.',
    category: 'devops',
    level: 'Intermediate',
    price: 95,
    listPrice: 139,
    learners: 11260,
    ratingBreakdown: [1690, 448, 96, 28, 12],
    cover: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80',
    coverAlt:
      'Numbered ports on a network patch panel with grey and blue ethernet cables plugged in',
    instructorId: 'aisha-benali',
    updatedAt: '2026-07-05',
    tags: ['Docker', 'CI/CD', 'Observability', 'Infrastructure'],
    outcomes: [
      {
        title: 'Build images in seconds',
        detail:
          'Multi-stage builds and correct layer ordering turn a six-minute build into a forty-second one.',
      },
      {
        title: 'Design a pipeline people trust',
        detail:
          'A red build should mean something. Stages, gates and quarantined flaky tests are how you get there.',
      },
      {
        title: 'Deploy behind a load balancer',
        detail:
          'Health checks that report readiness honestly, and migrations ordered so a deploy cannot half-apply.',
      },
      {
        title: 'Roll back in under a minute',
        detail:
          'Rehearse the rollback before you need it, because 3am is the wrong time to discover it does not work.',
      },
      {
        title: 'Instrument for the next incident',
        detail:
          'Logs, metrics and traces that produce evidence rather than a room full of theories.',
      },
    ],
    includes: ['10 hours of video', '7 hands-on projects', 'Pipeline templates', 'Lifetime access', 'Certificate of completion'],
    curriculum: [
      {
        id: 'containers',
        title: 'Containers that build fast',
        summary: 'Layer caching is most of the win.',
        lessons: [
          { id: 'co1', title: 'What an image actually is', minutes: 21, kind: 'video', preview: true },
          { id: 'co2', title: 'Multi-stage builds and the 40MB image', minutes: 28, kind: 'video' },
          { id: 'co3', title: 'Cache layers, and the line order that breaks them', minutes: 26, kind: 'video' },
          { id: 'co4', title: 'Project: a 6-minute build in 40 seconds', minutes: 70, kind: 'project' },
        ],
      },
      {
        id: 'pipeline',
        title: 'Pipelines',
        summary: 'Fast, honest feedback — and nothing that everybody learns to ignore.',
        lessons: [
          { id: 'pi1', title: 'Stages, gates and what blocks a merge', minutes: 25, kind: 'video' },
          { id: 'pi2', title: 'Parallelism and test sharding', minutes: 24, kind: 'video' },
          { id: 'pi3', title: 'Flaky tests: quarantine, then fix', minutes: 27, kind: 'video' },
          { id: 'pi4', title: 'Secrets in CI without leaking them into logs', minutes: 23, kind: 'video' },
          { id: 'pi5', title: 'Pipeline quiz', minutes: 12, kind: 'quiz' },
        ],
      },
      {
        id: 'deploy',
        title: 'Deploys you can undo',
        summary: 'Rolling, blue-green and the rollback you rehearsed.',
        lessons: [
          { id: 'de1', title: 'Health checks that are not just 200 OK', minutes: 26, kind: 'video' },
          { id: 'de2', title: 'Rolling versus blue-green, with numbers', minutes: 29, kind: 'video' },
          { id: 'de3', title: 'Migrations and deploys in the right order', minutes: 31, kind: 'video' },
          { id: 'de4', title: 'Feature flags as a deploy strategy', minutes: 24, kind: 'video' },
          { id: 'de5', title: 'Project: ship, break it, roll back in 60 seconds', minutes: 85, kind: 'project' },
        ],
      },
      {
        id: 'observe',
        title: 'Knowing what happened',
        summary: 'Logs, metrics and traces that answer a question.',
        lessons: [
          { id: 'ob1', title: 'Structured logs worth grepping', minutes: 22, kind: 'video' },
          { id: 'ob2', title: 'The four signals, and alerting on symptoms', minutes: 30, kind: 'video' },
          { id: 'ob3', title: 'Tracing one slow request end to end', minutes: 28, kind: 'video' },
          { id: 'ob4', title: 'Capstone: run an incident, write the post-mortem', minutes: 100, kind: 'project' },
        ],
      },
    ],
    reviews: [
      {
        id: 'rv1',
        author: 'Peter Nkemelu',
        avatar: 'https://i.pravatar.cc/96?img=13',
        rating: 5,
        postedAt: '2026-07-25T08:55:00.000Z',
        body: 'The rollback drill is the most useful hour in any course I have taken. We now rehearse it monthly because of this. Aisha treats deployment as a design problem and it completely reframed it for me.',
      },
      {
        id: 'rv2',
        author: 'Mei Ling Tan',
        avatar: 'https://i.pravatar.cc/96?img=36',
        rating: 5,
        postedAt: '2026-06-11T18:12:00.000Z',
        body: 'Our CI went from 22 minutes to 5 following module 1 and 2. That is a real, measurable return on a $95 course.',
      },
      {
        id: 'rv3',
        author: 'Andreas Vogel',
        avatar: 'https://i.pravatar.cc/96?img=54',
        rating: 4,
        postedAt: '2026-02-27T10:40:00.000Z',
        body: 'Solid and vendor-neutral, which I liked. If you specifically need Kubernetes depth this is not that course — it is deliberately one level below it.',
      },
    ],
  },

  {
    slug: 'accessible-by-default',
    title: 'Accessible by Default',
    subtitle:
      'Semantics, keyboard and ARIA — building interfaces that work for everyone, from the first commit.',
    category: 'design',
    level: 'Beginner',
    price: 0,
    learners: 33150,
    ratingBreakdown: [4420, 906, 142, 31, 19],
    cover: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?w=1200&q=80',
    coverAlt:
      'Two people at a glass table, one typing on a laptop while the other points at the screen',
    instructorId: 'ines-marchetti',
    updatedAt: '2026-08-18',
    tags: ['Accessibility', 'WCAG', 'ARIA', 'Free'],
    outcomes: [
      {
        title: 'Reach for the element first',
        detail:
          'The platform already solved most of this. Learn what the right tag gives you before adding a role.',
      },
      {
        title: 'Test with the keyboard',
        detail:
          'Operate your own interface without a mouse, and find the trap, the skipped stop and the invisible focus ring.',
      },
      {
        title: 'Use ARIA sparingly',
        detail:
          'The small number of places it is genuinely needed — live regions, composite widgets — and nowhere else.',
      },
      {
        title: 'Meet WCAG 2.2 AA',
        detail:
          'Colour contrast, focus appearance and target size, hit without redesigning the product.',
      },
      {
        title: 'Audit into a fix list',
        detail:
          'Produce something a team can ship this sprint, rather than a score nobody acts on.',
      },
    ],
    includes: ['7 hours of video', '6 hands-on projects', 'An audit checklist', 'Lifetime access', 'Certificate of completion'],
    curriculum: [
      {
        id: 'semantics',
        title: 'Semantics carry most of the weight',
        summary: 'The platform already solved a lot of this.',
        lessons: [
          { id: 'se1', title: 'The accessibility tree, seen in the inspector', minutes: 23, kind: 'video', preview: true },
          { id: 'se2', title: 'Headings, landmarks and a document outline', minutes: 26, kind: 'video' },
          { id: 'se3', title: 'Names, roles and values, demonstrated', minutes: 28, kind: 'video' },
          { id: 'se4', title: 'Semantics quiz', minutes: 11, kind: 'quiz' },
        ],
      },
      {
        id: 'keyboard',
        title: 'The keyboard path',
        summary: 'If it works on a keyboard it usually works everywhere.',
        lessons: [
          { id: 'k1', title: 'Focus order, focus visible, focus trapped', minutes: 27, kind: 'video' },
          { id: 'k2', title: 'Building a menu with the real keyboard model', minutes: 34, kind: 'video' },
          { id: 'k3', title: 'Dialogs: inert, return focus, escape', minutes: 29, kind: 'video' },
          { id: 'k4', title: 'Project: make a component library keyboard-complete', minutes: 75, kind: 'project' },
        ],
      },
      {
        id: 'aria',
        title: 'ARIA, sparingly',
        summary: 'The first rule of ARIA is not to use ARIA.',
        lessons: [
          { id: 'a1', title: 'When a role is the right answer', minutes: 24, kind: 'video' },
          { id: 'a2', title: 'Live regions that announce once', minutes: 26, kind: 'video' },
          { id: 'a3', title: 'The patterns people get wrong most often', minutes: 30, kind: 'video' },
          { id: 'a4', title: 'ARIA quiz', minutes: 12, kind: 'quiz' },
        ],
      },
      {
        id: 'audit',
        title: 'Auditing and fixing',
        summary: 'From a report nobody reads to a list somebody ships.',
        lessons: [
          { id: 'au1', title: 'Automated tools: what they catch and miss', minutes: 22, kind: 'video' },
          { id: 'au2', title: 'A manual pass in twenty minutes', minutes: 25, kind: 'video' },
          { id: 'au3', title: 'Colour, contrast and WCAG 2.2 target size', minutes: 21, kind: 'video' },
          { id: 'au4', title: 'Capstone: audit a real site and fix the top ten', minutes: 90, kind: 'project' },
        ],
      },
    ],
    reviews: [
      {
        id: 'rv1',
        author: 'Dawn Ellery',
        avatar: 'https://i.pravatar.cc/96?img=49',
        rating: 5,
        postedAt: '2026-08-20T07:34:00.000Z',
        body: 'I run a small agency and made this required viewing. It is free, it is four evenings, and it removed an entire category of bug from our work. The dialog lesson alone.',
      },
      {
        id: 'rv2',
        author: 'Samuel Adeyemi',
        avatar: 'https://i.pravatar.cc/96?img=11',
        rating: 5,
        postedAt: '2026-07-13T16:08:00.000Z',
        body: 'Inês shows the broken version and the fixed version side by side every single time. That format is why it sticks. I have stopped adding role attributes to things that already had a role.',
      },
      {
        id: 'rv3',
        author: 'Tessa Lindgren',
        avatar: 'https://i.pravatar.cc/96?img=47',
        rating: 4,
        postedAt: '2026-05-26T13:50:00.000Z',
        body: 'Really good introduction. I would have liked more on screen reader testing across NVDA, JAWS and VoiceOver — it covers one and mentions the others.',
      },
    ],
  },

  {
    slug: 'llm-apps-in-production',
    title: 'LLM Apps in Production',
    subtitle:
      'Evaluation, retrieval and cost control — the unglamorous work that makes a model feature reliable.',
    category: 'ai',
    level: 'Advanced',
    price: 129,
    listPrice: 189,
    learners: 7890,
    ratingBreakdown: [1204, 318, 82, 24, 11],
    cover: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80',
    coverAlt: 'Columns of glowing green characters cascading down a black screen',
    instructorId: 'jonah-price',
    updatedAt: '2026-08-06',
    tags: ['LLM', 'Evaluation', 'Retrieval', 'Cost'],
    outcomes: [
      {
        title: 'Evaluate before you build',
        detail:
          'A golden set drawn from real traffic, and prompt regression tests that run in CI like any other test.',
      },
      {
        title: 'Make retrieval actually help',
        detail:
          'Chunking, hybrid search and reranking that improve the answer rather than padding the context window.',
      },
      {
        title: 'Handle mid-stream failure',
        detail:
          'Much of what goes wrong in production goes wrong after the first token. Stream a response that survives it.',
      },
      {
        title: 'Control cost and latency',
        detail:
          'Caching, model routing, and the underrated skill of knowing when not to call the model at all.',
      },
      {
        title: 'Ship guardrails that fail closed',
        detail:
          'Safety checks that default to refusing, and logging detailed enough to debug the refusal afterwards.',
      },
    ],
    includes: ['13 hours of video', '8 hands-on projects', 'An evaluation harness', 'Lifetime access', 'Certificate of completion'],
    curriculum: [
      {
        id: 'eval',
        title: 'Evaluation first',
        summary: 'You cannot improve what you have not defined.',
        lessons: [
          { id: 'ev1', title: 'Why prompt tinkering plateaus', minutes: 24, kind: 'video', preview: true },
          { id: 'ev2', title: 'Building a golden set from real traffic', minutes: 32, kind: 'video' },
          { id: 'ev3', title: 'Model-graded evaluation, and its limits', minutes: 35, kind: 'video' },
          { id: 'ev4', title: 'Regression tests for prompts in CI', minutes: 29, kind: 'video' },
          { id: 'ev5', title: 'Project: an eval harness for your own feature', minutes: 90, kind: 'project' },
        ],
      },
      {
        id: 'retrieval',
        title: 'Retrieval that helps',
        summary: 'Most RAG problems are retrieval problems, not model problems.',
        lessons: [
          { id: 're1', title: 'Chunking decisions that change the answer', minutes: 30, kind: 'video' },
          { id: 're2', title: 'Hybrid search: vectors plus keywords', minutes: 33, kind: 'video' },
          { id: 're3', title: 'Reranking, and measuring whether it helped', minutes: 27, kind: 'video' },
          { id: 're4', title: 'Citations users can actually verify', minutes: 25, kind: 'video' },
          { id: 're5', title: 'Project: lift answer accuracy 18 points', minutes: 95, kind: 'project' },
          { id: 're6', title: 'Retrieval quiz', minutes: 14, kind: 'quiz' },
        ],
      },
      {
        id: 'runtime',
        title: 'Runtime behaviour',
        summary: 'Streaming, tools and the failures that happen halfway through.',
        lessons: [
          { id: 'ru1', title: 'Streaming a response into a real interface', minutes: 28, kind: 'video' },
          { id: 'ru2', title: 'Tool calls, retries and partial failure', minutes: 34, kind: 'video' },
          { id: 'ru3', title: 'Structured output you can parse with confidence', minutes: 26, kind: 'video' },
          { id: 'ru4', title: 'Project: a tool-using agent with a budget', minutes: 88, kind: 'project' },
        ],
      },
      {
        id: 'economics',
        title: 'Cost, latency and safety',
        summary: 'The three constraints that decide whether it ships.',
        lessons: [
          { id: 'ec1', title: 'Caching: exact, semantic and prefix', minutes: 29, kind: 'video' },
          { id: 'ec2', title: 'Routing between a small model and a large one', minutes: 31, kind: 'video' },
          { id: 'ec3', title: 'Guardrails that fail closed', minutes: 27, kind: 'video' },
          { id: 'ec4', title: 'Capstone: halve the cost, hold the quality', minutes: 115, kind: 'project' },
        ],
      },
    ],
    reviews: [
      {
        id: 'rv1',
        author: 'Ravi Chandrasekhar',
        avatar: 'https://i.pravatar.cc/96?img=17',
        rating: 5,
        postedAt: '2026-08-12T09:47:00.000Z',
        body: 'Refreshingly unhyped. Jonah spends the first three hours on evaluation before touching a prompt, which is exactly the right order and exactly what nobody else teaches.',
      },
      {
        id: 'rv2',
        author: 'Johanna Meyer',
        avatar: 'https://i.pravatar.cc/96?img=23',
        rating: 5,
        postedAt: '2026-07-04T14:22:00.000Z',
        body: 'The routing lesson cut our inference bill by 61% in a fortnight. I did the maths twice because I did not believe it. Advanced, and it does expect you to know your way around a backend.',
      },
      {
        id: 'rv3',
        author: 'Kwame Asante',
        avatar: 'https://i.pravatar.cc/96?img=8',
        rating: 4,
        postedAt: '2026-04-16T21:03:00.000Z',
        body: 'Very strong on the engineering. Moves fast through the model fundamentals, so brush up first if that is new to you. The eval harness is now part of our repo.',
      },
    ],
  },
]

/* ------------------------------------------------------------------------ */
/* Derived values                                                            */
/* ------------------------------------------------------------------------ */

const STAR_VALUES = [5, 4, 3, 2, 1] as const

/** Total ratings — the sum of the distribution, so the bars and the count agree. */
export function ratingsCount(course: Course): number {
  return course.ratingBreakdown.reduce((total, n) => total + n, 0)
}

/** Weighted mean of the distribution, to one decimal place. */
export function averageRating(course: Course): number {
  const total = ratingsCount(course)
  if (total === 0) return 0
  const weighted = course.ratingBreakdown.reduce((sum, n, i) => sum + n * STAR_VALUES[i], 0)
  return Math.round((weighted / total) * 10) / 10
}

/** Share of ratings at each star level, 5 down to 1. */
export function ratingDistribution(course: Course): { stars: number; count: number; percent: number }[] {
  const total = ratingsCount(course)
  return STAR_VALUES.map((stars, i) => {
    const count = course.ratingBreakdown[i]
    return { stars, count, percent: total === 0 ? 0 : Math.round((count / total) * 100) }
  })
}

export function allLessons(course: Course): Lesson[] {
  return course.curriculum.flatMap((section) => section.lessons)
}

export function lessonCount(course: Course): number {
  return allLessons(course).length
}

export function totalMinutes(course: Course): number {
  return allLessons(course).reduce((sum, lesson) => sum + lesson.minutes, 0)
}

export function sectionMinutes(section: CurriculumSection): number {
  return section.lessons.reduce((sum, lesson) => sum + lesson.minutes, 0)
}

/** Whole hours, rounded — what the cards and badges show. */
export function totalHours(course: Course): number {
  return Math.round(totalMinutes(course) / 60)
}

export const KIND_LABEL: Record<LessonKind, string> = {
  video: 'Video lessons',
  quiz: 'Quizzes',
  project: 'Hands-on projects',
}

/**
 * Hours of video, quizzes and projects — summed from the curriculum, which is why
 * the pie on a course page can never disagree with the lesson list below it.
 */
export function contentMix(course: Course): { label: string; kind: LessonKind; hours: number; minutes: number }[] {
  const order: LessonKind[] = ['video', 'project', 'quiz']
  return order.map((kind) => {
    const minutes = allLessons(course)
      .filter((lesson) => lesson.kind === kind)
      .reduce((sum, lesson) => sum + lesson.minutes, 0)
    return { kind, label: KIND_LABEL[kind], minutes, hours: Math.round((minutes / 60) * 10) / 10 }
  })
}

/** Share of the course spent on projects and quizzes — the "how hands-on is it?" figure. */
export function handsOnPercent(course: Course): number {
  const total = totalMinutes(course)
  if (total === 0) return 0
  const practical = allLessons(course)
    .filter((lesson) => lesson.kind !== 'video')
    .reduce((sum, lesson) => sum + lesson.minutes, 0)
  return Math.round((practical / total) * 100)
}

export function formatPrice(price: number): string {
  return price === 0 ? 'Free' : `$${price}`
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  return m === 0 ? `${h}h` : `${h}h ${m}m`
}

export function formatLearners(count: number): string {
  return count >= 1000 ? `${Math.round(count / 100) / 10}k` : String(count)
}

/* ------------------------------------------------------------------------ */
/* Lookups                                                                   */
/* ------------------------------------------------------------------------ */

export function getCourse(slug: string): Course | undefined {
  return COURSES.find((course) => course.slug === slug)
}

export function courseSlugs(): string[] {
  return COURSES.map((course) => course.slug)
}

/** Featured on the homepage: the four with the most learners. */
export function featuredCourses(limit = 4): Course[] {
  return [...COURSES].sort((a, b) => b.learners - a.learners).slice(0, limit)
}

/** Same category first, then anything else, never the course itself. */
export function relatedCourses(course: Course, limit = 3): Course[] {
  const sameCategory = COURSES.filter((c) => c.slug !== course.slug && c.category === course.category)
  const rest = COURSES.filter((c) => c.slug !== course.slug && c.category !== course.category)
  return [...sameCategory, ...rest].slice(0, limit)
}

/** Options for the navbar Combobox. */
export function searchOptions(): { value: string; label: string }[] {
  return COURSES.map((course) => ({ value: course.slug, label: course.title }))
}

/* ------------------------------------------------------------------------ */
/* Catalogue-wide figures                                                    */
/* ------------------------------------------------------------------------ */

export const CATALOGUE = {
  courses: COURSES.length,
  learners: COURSES.reduce((sum, course) => sum + course.learners, 0),
  hours: COURSES.reduce((sum, course) => sum + totalHours(course), 0),
  completionRate: 68,
  instructors: Object.keys(INSTRUCTORS).length,
} as const
