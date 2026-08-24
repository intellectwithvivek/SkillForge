import { ImageResponse } from 'next/og'

/**
 * The favicon: the site's signature progress ring, generated rather than shipped
 * as a binary so it re-themes with one hex change.
 */
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#047857',
          borderRadius: 7,
        }}
      >
        <div
          style={{
            width: 19,
            height: 19,
            borderRadius: '50%',
            border: '4px solid #ffffff',
            borderRightColor: 'transparent',
            transform: 'rotate(-45deg)',
          }}
        />
      </div>
    ),
    { ...size },
  )
}
