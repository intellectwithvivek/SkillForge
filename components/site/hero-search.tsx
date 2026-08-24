'use client'

import { useRouter } from 'next/navigation'
import { Combobox } from '@the_viveksingh/vivek-ui'
import { searchOptions } from '@/data/courses'

const OPTIONS = searchOptions()

/** The hero's course search. Client-side only because selecting one navigates. */
export function HeroSearch() {
  const router = useRouter()

  return (
    <div className="sf-hero-search">
      <Combobox
        options={OPTIONS}
        size="lg"
        placeholder="What do you want to build?"
        aria-label="Search the course catalogue"
        emptyState="No course matches that yet — try “React”, “SQL” or “deploy”."
        onValueChange={(slug) => {
          if (slug) router.push(`/courses/${slug}`)
        }}
      />
    </div>
  )
}
