import { type ReactNode } from 'react'

type PageViewProp = {
  limitWidth?: boolean
  padding?: string
  children: ReactNode
}

export default ({ limitWidth, padding, children }: PageViewProp) => {
  return (
    <div
      style={{
        height: '100%',
        margin: 'auto',
        padding: padding || '20px 10px',
        maxWidth: limitWidth ? '1440px' : '',
      }}
    >
      {children}
    </div>
  )
}
