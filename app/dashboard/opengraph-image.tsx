import { ImageResponse } from 'next/og'
import { OG_CONTENT_TYPE, OG_SIZE, OgCard } from '@/lib/og'

export const alt = 'The SkillForge learner dashboard — completion rings, a line chart and a streak sparkline'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default function DashboardOpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Dashboard"
        title="Progress you can actually read"
        subtitle="Completion rings on every enrolled course, eight weeks of learning minutes and a thirty-day streak — all pure SVG, no charting dependency."
        facts={['ProgressRing', 'LineChart', 'Sparkline', 'Zero deps']}
      />
    ),
    { ...size },
  )
}
