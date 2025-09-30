import { Tag, Tooltip } from 'antd'
import type { Image } from '@/util/type'
import { InfoCircleOutlined } from '@ant-design/icons'
import { StatusColor, StatusLabel } from '@/util/const'

export default ({ image }: { image: Image | undefined }) => {
  if (!image) {
    return <Tag>--</Tag>
  }
  return (
    <Tooltip title={image.ErrMsg || ''}>
      <Tag icon={image.ErrMsg && <InfoCircleOutlined />} color={StatusColor[image.Status || '']}>
        {StatusLabel[image.Status || '']}
      </Tag>
    </Tooltip>
  )
}
