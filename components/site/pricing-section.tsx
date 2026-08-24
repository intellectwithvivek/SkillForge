'use client'

import { useState } from 'react'
import { Badge, Button, Pricing, Stack, Switch, Text, useToast } from '@the_viveksingh/vivek-ui'

/**
 * Plans, with a yearly toggle.
 *
 * A client component because the switch changes the prices in place. The saving is
 * stated as a figure rather than a vague "save more" — two months free on each plan.
 */
export function PricingSection() {
  const [yearly, setYearly] = useState(true)
  const { toast } = useToast()

  const cycle = yearly ? '/year' : '/month'
  const price = (monthly: number) => (yearly ? `$${monthly * 10}` : `$${monthly}`)

  const start = (plan: string) => () =>
    toast({
      title: `${plan} selected`,
      description: 'This is a template — no payment provider is wired up.',
      tone: 'info',
    })

  return (
    <Pricing
      id="pricing"
      background="muted"
      eyebrow="Pricing"
      title="Pay per course, or take the lot"
      /*
        The toggle rides in `description` rather than in `children`: Pricing renders
        `children ?? plans`, so passing children would silently drop the plan cards.
      */
      description={
        <Stack align="center" gap={3}>
          <Text tone="muted" align="center">
            Every course can be bought once and kept forever. Pro exists for people who take
            more than three a year.
          </Text>
          <Switch
            checked={yearly}
            onChange={(event) => setYearly(event.currentTarget.checked)}
            label="Bill yearly"
          />
          <Text as="span" size="sm" tone="muted">
            {yearly ? (
              <>
                Two months free —{' '}
                <Badge tone="success" variant="soft" size="sm">
                  saving 17%
                </Badge>
              </>
            ) : (
              'Switch to yearly and two months are free.'
            )}
          </Text>
        </Stack>
      }
      columns={{ base: 1, md: 3 }}
      plans={[
        {
          id: 'free',
          name: 'Free',
          price: '$0',
          period: 'forever',
          description: 'Two full courses, no card, no trial clock.',
          features: [
            'CSS Without a Framework, in full',
            'Accessible by Default, in full',
            'First lesson of every paid course',
            'Progress tracking and streaks',
            'Certificates on completed courses',
          ],
          cta: (
            <Button variant="outline" fullWidth onClick={start('Free')}>
              Start free
            </Button>
          ),
        },
        {
          id: 'pro',
          name: 'Pro',
          price: price(29),
          period: cycle,
          description: 'The whole catalogue, plus everything added while you subscribe.',
          highlighted: true,
          badge: 'Most popular',
          features: [
            'All 8 courses, all future courses',
            'Downloadable project repositories',
            'Instructor Q&A within two working days',
            'Certificates with a verification link',
            'Cancel anytime; courses bought outright stay yours',
          ],
          cta: (
            <Button fullWidth onClick={start('Pro')}>
              Go Pro
            </Button>
          ),
        },
        {
          id: 'team',
          name: 'Team',
          price: price(24),
          period: `${cycle} per seat`,
          description: 'For five or more engineers learning the same stack.',
          features: [
            'Everything in Pro, per seat',
            'Shared progress dashboard',
            'Assign courses and set target dates',
            'SSO and invoiced billing',
            'A quarterly live session with an instructor',
          ],
          cta: (
            <Button variant="outline" fullWidth onClick={start('Team')}>
              Talk to us
            </Button>
          ),
        },
      ]}
    />
  )
}
