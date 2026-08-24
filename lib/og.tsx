import type { ReactElement } from 'react'

/**
 * The shared share-card layout.
 *
 * `opengraph-image` is a per-segment convention — it is NOT inherited by nested
 * routes — so every top-level route needs its own file. They all render through
 * this one function so the cards stay a set rather than five near-misses.
 *
 * Satori rules that shape the markup below:
 * - every element with more than one child needs an explicit `display`
 * - each text node must be a single string, so figures are interpolated whole
 * - only inline styles; no classes, no custom properties
 */
export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

const INK = '#f5f5f7'
const MUTED = '#a7b6ae'
const ACCENT = '#34d399'
const SURFACE = '#05100c'

/** The wordmark, with the site's signature ring. */
function Brand({ scale = 1 }: { scale?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 * scale }}>
      <div
        style={{
          width: 38 * scale,
          height: 38 * scale,
          borderRadius: '50%',
          border: `${5 * scale}px solid ${ACCENT}`,
          borderRightColor: 'transparent',
          transform: 'rotate(-45deg)',
        }}
      />
      <div style={{ fontSize: 30 * scale, fontWeight: 700, letterSpacing: -0.5 }}>SkillForge</div>
    </div>
  )
}

export function OgCard({
  eyebrow,
  title,
  subtitle,
  facts,
}: {
  /** Small pill at the top right — the section this card is for. */
  eyebrow: string
  title: string
  subtitle: string
  /** Short chips along the bottom. Keep to four or fewer. */
  facts: string[]
}): ReactElement {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 70,
        background: SURFACE,
        backgroundImage: `radial-gradient(circle at 80% 10%, rgba(52,211,153,0.2) 0%, transparent 55%)`,
        color: INK,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Brand />
        <div
          style={{
            padding: '10px 22px',
            borderRadius: 999,
            background: 'rgba(52,211,153,0.16)',
            color: '#6ee7b7',
            fontSize: 24,
            fontWeight: 600,
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.06, letterSpacing: -2.2 }}>
          {title}
        </div>
        <div style={{ fontSize: 30, color: MUTED, lineHeight: 1.36, maxWidth: 900 }}>
          {subtitle}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          {facts.map((fact) => (
            <div
              key={fact}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                border: '1px solid rgba(245,245,247,0.18)',
                color: '#cdd8d2',
                fontSize: 23,
              }}
            >
              {fact}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 23, color: '#7f8d86' }}>skillforge.vivekkumarsingh.in</div>
      </div>
    </div>
  )
}
