import type { ReactNode } from 'react'
import { ProgressRing } from '@the_viveksingh/vivek-ui/charts'

/**
 * The site's signature glyph.
 *
 * Every bullet on SkillForge is a thin ProgressRing rather than a disc or a tick — the
 * same primitive that reports a completion figure on a dashboard card, shrunk to
 * punctuation. It ties the whole identity to one idea: everything here is a degree of
 * progress.
 *
 * The ring is decorative wherever a bullet would be, so it is hidden from assistive
 * technology and the list item's own text carries the meaning.
 */
export function RingBullet({
  value = 100,
  size = 18,
  thickness = 2,
}: {
  /** Fill of the arc, 0–100. A partial ring reads as "in progress". */
  value?: number
  /**
   * Diameter in px. Keep it **above 16**: ProgressRing treats `size <= 16` as
   * invalid input and silently falls back to its 96px default, which turns a
   * bullet into a dinner plate. 18 sits right beside 16px body text.
   */
  size?: number
  thickness?: number
}) {
  return (
    <span className="sf-ring-glyph" aria-hidden="true">
      <ProgressRing value={value} diameter={size} thickness={thickness} />
    </span>
  )
}

/** A `<ul>` whose markers are ring glyphs. Renders a real list, so counts are announced. */
export function RingList({
  items,
  value = 100,
  className,
}: {
  items: ReactNode[]
  value?: number
  className?: string
}) {
  return (
    <ul className={className ? `sf-ring-list ${className}` : 'sf-ring-list'}>
      {items.map((item, index) => (
        <li className="sf-ring-item" key={index}>
          <RingBullet value={value} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
