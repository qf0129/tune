import { Skeleton, Space } from 'antd'
import Link from 'antd/es/typography/Link'
import { useNavigate } from 'react-router'

export interface BreadcrumbItem {
  title?: string
  path?: string
}
export interface BreadcrumbProps {
  items: Array<BreadcrumbItem>
}
export default function Breadcrumb({ items }: BreadcrumbProps) {
  const nav = useNavigate()
  return (
    <Space align="center" style={{ height: 40 }}>
      {items.map((item, index) => (
        <>
          {item.path ? (
            <Link type="secondary" onClick={() => nav(item.path || '')}>
              {item.title || <Skeleton.Input size="small" />}
            </Link>
          ) : (
            <span style={{ fontSize: 16, lineHeight: '16px' }}>{item.title || <Skeleton.Input size="small" />}</span>
          )}
          {index !== items.length - 1 && <span>/</span>}
        </>
      ))}
    </Space>
  )
}
