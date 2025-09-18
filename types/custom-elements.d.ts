import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string
      }
      'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        loop?: boolean | ''
        autoplay?: boolean | ''
        background?: string
        speed?: string | number
      }
    }
  }
}
