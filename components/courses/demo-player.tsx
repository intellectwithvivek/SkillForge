'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AspectRatio, Badge, Button, IconButton, Modal, Stack, Text } from '@the_viveksingh/vivek-ui'

/**
 * The course preview: a still with a play control that opens a demo modal.
 *
 * There is no video in a template, and pretending otherwise with a dead play button
 * would be worse than saying so — the modal is explicit about it.
 */
export function DemoPlayer({
  poster,
  posterAlt,
  courseTitle,
  previewLesson,
  previewMinutes,
}: {
  poster: string
  posterAlt: string
  courseTitle: string
  previewLesson: string
  previewMinutes: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="sf-player">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={poster}
            alt={posterAlt}
            fill
            sizes="(min-width: 64rem) 44rem, 100vw"
            priority
          />
          <div className="sf-player-scrim">
            <IconButton
              aria-label={`Play the free preview lesson: ${previewLesson}`}
              size="lg"
              round
              onClick={() => setOpen(true)}
            >
              <span aria-hidden="true" style={{ fontSize: '1.25rem', lineHeight: 1 }}>
                ▶
              </span>
            </IconButton>
            <Badge tone="neutral" variant="solid" pill size="sm">
              Free preview · {previewMinutes} min
            </Badge>
          </div>
        </AspectRatio>
      </div>

      <Modal open={open} onOpenChange={setOpen} title="Demo player" size="lg">
        <Modal.Body>
          <Stack gap={4}>
            <AspectRatio ratio={16 / 9}>
              <div
                style={{
                  display: 'grid',
                  placeItems: 'center',
                  blockSize: '100%',
                  borderRadius: 'var(--vk-radius-md)',
                  background: 'var(--vk-color-surface-sunken)',
                  color: 'var(--vk-color-muted)',
                }}
              >
                <Text tone="muted" align="center">
                  Video player would render here
                </Text>
              </div>
            </AspectRatio>
            <Text>
              <strong>{previewLesson}</strong> — the free opening lesson of {courseTitle}, {' '}
              {previewMinutes} minutes.
            </Text>
            <Text tone="muted" size="sm">
              SkillForge is an open-source template, so there is no video pipeline behind this
              button. Drop your own player component in here and the rest of the page works
              unchanged.
            </Text>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
