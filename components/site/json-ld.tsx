/**
 * Structured data, rendered as a plain `<script type="application/ld+json">`.
 *
 * `<` is escaped to `<` before it reaches the DOM, per the Next.js JSON-LD guide:
 * `JSON.stringify` does not sanitise a string that closes the script tag, and this
 * payload includes course titles and review text.
 *
 * A native script tag is correct here rather than `next/script` — this is data, not
 * executable code, so there is nothing to schedule or defer.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
