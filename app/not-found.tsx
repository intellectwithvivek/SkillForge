import type { Metadata } from 'next'
import Link from 'next/link'
import { Button, EmptyState, Flex, Section } from '@the_viveksingh/vivek-ui'
import { ProgressRing } from '@the_viveksingh/vivek-ui/charts'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'That page is not part of the SkillForge catalogue.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <Section padding="xl" size="md">
      <EmptyState
        headingLevel={1}
        size="lg"
        icon={<ProgressRing value={4} size={72} thickness={5} aria-hidden="true" />}
        title="This page never got finished"
        description="The link is broken or the course has been retired. The catalogue is the fastest way back."
        actions={
          <Flex gap={3} wrap justify="center">
            <Button asChild>
              <Link href="/courses">Browse courses</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go home</Link>
            </Button>
          </Flex>
        }
      />
    </Section>
  )
}
