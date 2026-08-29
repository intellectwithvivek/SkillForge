'use client'

import { useMemo, useState, type ReactNode } from 'react'
import {
  Button,
  EmptyState,
  Field,
  Grid,
  Pagination,
  Rating,
  Select,
  Slider,
  Stack,
  Switch,
  Text,
} from '@the_viveksingh/vivek-ui'
import { ProgressRing } from '@the_viveksingh/vivek-ui/charts'
import type { CategorySlug, Level } from '@/data/courses'

/**
 * Everything the filters need to decide whether a course is shown.
 *
 * Deliberately separate from the rendered card: the card itself arrives already
 * rendered from the server (see `CourseCatalogue`), so the client bundle carries the
 * filtering logic and nothing else.
 */
export interface CourseMeta {
  slug: string
  title: string
  subtitle: string
  category: CategorySlug
  level: Level
  price: number
  rating: number
  learners: number
  tags: string[]
}

export interface CatalogueItem {
  meta: CourseMeta
  /** A server-rendered <CourseCard>, handed across the boundary as an element. */
  card: ReactNode
}

interface Props {
  items: CatalogueItem[]
  categories: { slug: CategorySlug; name: string }[]
  levels: Level[]
  maxPrice: number
  initialCategory: CategorySlug | 'all'
  initialLevel: Level | 'all'
  initialFreeOnly: boolean
  initialQuery: string
  pageSize?: number
}

const ALL = 'all'

/**
 * The filtered course grid.
 *
 * A client component because the controls are interactive — but the cards it lays out
 * were rendered on the server and passed in as elements, so filtering ships the
 * predicate rather than the markup.
 */
export function CourseCatalogue({
  items,
  categories,
  levels,
  maxPrice,
  initialCategory,
  initialLevel,
  initialFreeOnly,
  initialQuery,
  pageSize = 6,
}: Props) {
  const [category, setCategory] = useState<CategorySlug | 'all'>(initialCategory)
  const [level, setLevel] = useState<Level | 'all'>(initialLevel)
  const [priceCap, setPriceCap] = useState(maxPrice)
  const [minRating, setMinRating] = useState(0)
  const [freeOnly, setFreeOnly] = useState(initialFreeOnly)
  const [page, setPage] = useState(1)

  const query = initialQuery.trim().toLowerCase()

  const filtered = useMemo(() => {
    return items.filter(({ meta }) => {
      if (category !== ALL && meta.category !== category) return false
      if (level !== ALL && meta.level !== level) return false
      if (freeOnly && meta.price !== 0) return false
      if (!freeOnly && meta.price > priceCap) return false
      if (minRating > 0 && meta.rating < minRating) return false
      if (query) {
        const haystack = `${meta.title} ${meta.subtitle} ${meta.tags.join(' ')}`.toLowerCase()
        if (!haystack.includes(query)) return false
      }
      return true
    })
  }, [items, category, level, freeOnly, priceCap, minRating, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const isFiltered =
    category !== ALL || level !== ALL || freeOnly || minRating > 0 || priceCap < maxPrice || Boolean(query)

  function reset() {
    setCategory(ALL)
    setLevel(ALL)
    setPriceCap(maxPrice)
    setMinRating(0)
    setFreeOnly(false)
    setPage(1)
  }

  /** Any filter change invalidates the current page number. */
  function change<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      setPage(1)
    }
  }

  return (
    <Stack gap={8}>
      <div className="sf-filter-bar">
        {/*
          Field owns the label/htmlFor wiring. It clones its single child with the
          generated id, and Slider puts that id on the real <input type="range"> — so
          the label points at the control, not at a wrapper div.
        */}
        <div className="sf-filters">
          <Field label="Category">
            <Select
              value={category}
              onChange={(event) =>
                change(setCategory)(event.currentTarget.value as CategorySlug | 'all')
              }
              options={[
                { value: ALL, label: 'All categories' },
                ...categories.map((c) => ({ value: c.slug, label: c.name })),
              ]}
            />
          </Field>

          <Field label="Level">
            <Select
              value={level}
              onChange={(event) => change(setLevel)(event.currentTarget.value as Level | 'all')}
              options={[
                { value: ALL, label: 'All levels' },
                ...levels.map((l) => ({ value: l, label: l })),
              ]}
            />
          </Field>

          <Stack gap={3}>
            <Field
              label="Maximum price"
              help={freeOnly ? 'Ignored while “Free only” is on.' : undefined}
            >
              {/* `lg` is not decoration: it is the size whose thumb is 24px, which is
                  what WCAG 2.2 SC 2.5.8 asks of a touch target. */}
              <Slider
                size="lg"
                min={0}
                max={maxPrice}
                step={5}
                value={priceCap}
                onValueChange={change(setPriceCap)}
                showValue
                disabled={freeOnly}
                formatValue={(value) => (value === 0 ? 'Free' : `$${value}`)}
              />
            </Field>
            <Switch
              checked={freeOnly}
              onChange={(event) => change(setFreeOnly)(event.currentTarget.checked)}
              label="Free only"
              size="sm"
            />
          </Stack>

          {/* Rating names its own group through a <legend>, so no Field here. */}
          <Rating
            label="Minimum rating"
            value={minRating}
            onValueChange={change(setMinRating)}
            size="sm"
          />
        </div>
      </div>

      <div className="sf-result-line">
        <Text tone="muted" size="sm" aria-live="polite">
          {filtered.length === items.length
            ? `Showing all ${items.length} courses`
            : `${filtered.length} of ${items.length} courses match`}
        </Text>
        {isFiltered ? (
          <Button variant="ghost" size="sm" onClick={reset}>
            Clear filters
          </Button>
        ) : null}
      </div>

      {visible.length > 0 ? (
        <>
          <Grid minItemWidth="17rem" gap={6}>
            {visible.map((item) => (
              <div key={item.meta.slug}>{item.card}</div>
            ))}
          </Grid>

          {pageCount > 1 ? (
            <Stack align="center">
              <Pagination
                page={currentPage}
                pageCount={pageCount}
                onPageChange={setPage}
                showFirstLast
              />
            </Stack>
          ) : null}
        </>
      ) : (
        <EmptyState
          icon={<ProgressRing value={0} diameter={56} thickness={4} aria-hidden="true" />}
          title="Nothing matches those filters"
          description="Nobody has built that course yet. Widen the price range or clear a filter and try again."
          actions={<Button onClick={reset}>Clear all filters</Button>}
          size="lg"
        />
      )}
    </Stack>
  )
}
