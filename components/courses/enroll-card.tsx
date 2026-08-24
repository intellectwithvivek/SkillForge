'use client'

import { Badge, Button, Card, Divider, Flex, Stack, Text, useToast } from '@the_viveksingh/vivek-ui'
import { RingList } from '@/components/site/ring-bullet'

/**
 * The sticky enrol panel.
 *
 * Client-side for the toast. It stays sticky on wide screens and falls back to
 * ordinary flow on narrow ones, where a sticky panel would eat half the viewport.
 */
export function EnrollCard({
  title,
  price,
  listPrice,
  includes,
  handsOn,
}: {
  title: string
  price: number
  listPrice?: number
  includes: string[]
  handsOn: number
}) {
  const { toast } = useToast()
  const free = price === 0

  return (
    <Card variant="elevated" padding="lg" className="sf-sticky">
      <Card.Header>
        <Stack gap={2}>
          <Flex align="baseline" gap={2} wrap>
            <span className="sf-price">{free ? 'Free' : `$${price}`}</span>
            {listPrice ? <span className="sf-price-was">${listPrice}</span> : null}
          </Flex>
          {listPrice ? (
            <Badge tone="danger" variant="soft" size="sm" pill>
              {Math.round((1 - price / listPrice) * 100)}% off this month
            </Badge>
          ) : null}
        </Stack>
      </Card.Header>

      <Card.Body>
        <Stack gap={6}>
          <Button
            size="lg"
            fullWidth
            onClick={() =>
              toast({
                title: free ? 'You are in' : 'Enrolled',
                description: `${title} has been added to your dashboard.`,
                tone: 'success',
              })
            }
          >
            {free ? 'Start for free' : 'Enrol now'}
          </Button>

          <Button
            variant="outline"
            fullWidth
            onClick={() =>
              toast({
                title: 'Saved for later',
                description: 'Find it under Saved on your dashboard.',
                tone: 'info',
              })
            }
          >
            Save for later
          </Button>

          <Flex justify="center">
            <Badge tone="success" variant="soft" pill>
              30-day money-back guarantee
            </Badge>
          </Flex>

          <Divider label="Includes" />

          <RingList items={includes} />

          <Divider />

          <Text size="sm" tone="muted">
            <strong>{handsOn}%</strong> of the running time is hands-on — projects and quizzes
            rather than video.
          </Text>
        </Stack>
      </Card.Body>
    </Card>
  )
}
