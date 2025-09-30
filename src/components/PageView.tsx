import { Breadcrumb } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { type ReactNode } from 'react'
import './PageView.css'
import { Link } from 'react-router'

type PageViewProp = {
  limitWidth?: string
  margin?: string
  padding?: string
  background?: string
  breadcrumbs?: ItemType[]
  children: ReactNode
}

export default ({ limitWidth, margin, padding, background, breadcrumbs, children }: PageViewProp) => {
  return (
    <div
      style={{
        height: '100%',
        margin: margin,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: limitWidth ? limitWidth : '1440px',
      }}
      className="page-fade-in"
    >
      {breadcrumbs && (
        <Breadcrumb
          items={breadcrumbs}
          style={{ padding: '12px 8px' }}
          itemRender={(item) => (item.href ? <Link to={item.href}>{item.title || '-'}</Link> : item.title)}
        />
      )}
      <div style={{ backgroundColor: background || '#fff', padding: padding || '16px' }}>{children}</div>
    </div>
  )
}
