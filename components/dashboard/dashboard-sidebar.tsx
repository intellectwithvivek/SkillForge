'use client'

import Link from 'next/link'
import { Sidebar } from '@the_viveksingh/vivek-ui'

/**
 * The dashboard rail.
 *
 * Client-side because Sidebar owns its collapsed state. Every destination is a real
 * `next/link` through `asChild`, so cmd-click and "open in new tab" both work.
 */
export function DashboardSidebar({ enrolled }: { enrolled: number }) {
  return (
    <Sidebar label="Dashboard" defaultCollapsed={false}>
      <Sidebar.Section title="Learning">
        <Sidebar.Item asChild active icon={<span aria-hidden="true">◎</span>} badge={enrolled}>
          <Link href="/dashboard">In progress</Link>
        </Sidebar.Item>
        <Sidebar.Item asChild icon={<span aria-hidden="true">◍</span>}>
          <Link href="/dashboard#certificates">Certificates</Link>
        </Sidebar.Item>
        <Sidebar.Item asChild icon={<span aria-hidden="true">◌</span>}>
          <Link href="/dashboard#recommended">Recommended</Link>
        </Sidebar.Item>
      </Sidebar.Section>

      <Sidebar.Section title="Catalogue">
        <Sidebar.Item asChild icon={<span aria-hidden="true">◉</span>}>
          <Link href="/courses">All courses</Link>
        </Sidebar.Item>
        <Sidebar.Item asChild icon={<span aria-hidden="true">○</span>}>
          <Link href="/courses?free=1">Free courses</Link>
        </Sidebar.Item>
      </Sidebar.Section>

      <Sidebar.Toggle />
    </Sidebar>
  )
}
