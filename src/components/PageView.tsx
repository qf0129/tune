import { Flex } from 'antd'
import { type ReactNode } from 'react'
import './PageView.css'
import Breadcrumb, { type BreadcrumbItem } from './Breadcrumb'

type PageViewProp = {
  margin?: string
  padding?: string
  background?: string
  noShadow?: boolean
  breadcrumbs?: BreadcrumbItem[]
  breadcrumbAction?: ReactNode
  children: ReactNode
}

export default ({ margin, padding, background, noShadow, breadcrumbs, breadcrumbAction, children }: PageViewProp) => {
  return (
    <div
      style={{
        height: '100%',
        margin: margin,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      className="page-fade-in"
    >
      {(breadcrumbs || breadcrumbAction) && (
        <Flex style={{ padding: '8px' }} align="center">
          {breadcrumbs && <Breadcrumb items={breadcrumbs} />}
          <div style={{ flex: 1 }} />
          {breadcrumbAction && (
            <Flex justify="right" align="center" gap={10}>
              {breadcrumbAction}
            </Flex>
          )}
        </Flex>
      )}
      <div
        style={{
          backgroundColor: background || '#fff',
          padding: padding || '16px',
          boxShadow: noShadow ? 'none' : '0 1px 2px 0 rgba(0, 0, 0, 0.03),0 1px 6px -1px rgba(0, 0, 0, 0.02),0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        }}
      >
        {children}
      </div>
    </div>
  )
}
