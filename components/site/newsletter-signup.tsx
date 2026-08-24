'use client'

import { Newsletter } from '@the_viveksingh/vivek-ui'
import { useToast } from '@the_viveksingh/vivek-ui'

/**
 * The mailing-list form.
 *
 * `onSubscribe` returns a promise, so the button holds a busy state until it settles
 * and a double submit is impossible. Nothing is actually sent anywhere — this is a
 * template — but the shape is the one a real handler would have.
 */
export function NewsletterSignup() {
  const { toast } = useToast()

  return (
    <Newsletter
      title="One email a fortnight"
      description="New courses, a short write-up of something we learned shipping them, and nothing else. Unsubscribe in one click."
      placeholder="you@company.com"
      buttonLabel="Subscribe"
      note="No spam, no sharing. This demo form does not store your address."
      successMessage="You are on the list — check your inbox to confirm."
      onSubscribe={async (email) => {
        await new Promise((resolve) => setTimeout(resolve, 700))
        toast({
          title: 'Almost there',
          description: `We sent a confirmation link to ${email}.`,
          tone: 'success',
        })
      }}
    />
  )
}
