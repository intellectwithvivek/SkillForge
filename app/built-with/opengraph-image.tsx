import { ImageResponse } from 'next/og'
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@/lib/og'

export const alt = 'Built with VivekUI — every section of SkillForge mapped to the component that renders it'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function BuiltWithOpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Colophon"
        title="Built with VivekUI"
        subtitle="Every section of this site mapped to the component that renders it, deep-linked to its documentation. No Tailwind, no shadcn, no CSS-in-JS."
        facts={['91 components', '6 SVG charts', '0 runtime deps', '47.6 kB']}
      />
    ),
    { ...size },
  )
}
