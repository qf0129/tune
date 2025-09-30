import { Tag } from 'antd'
import type { Env } from '@/util/type'

export default ({ env }: { env: Env | undefined }) => {
  return (
    <Tag style={{ fontSize: 14 }} color={env?.Color}>
      {env?.Title || env?.Name}
    </Tag>
  )
}
