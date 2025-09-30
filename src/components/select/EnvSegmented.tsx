import { Segmented, Spin } from 'antd'
import type { SegmentedOptions, SegmentedProps } from 'antd/es/segmented'
import { useEffect, useState } from 'react'
import api from '@/api/api'

interface EnvSegmentedProps extends Omit<SegmentedProps<string>, 'options'> {
  showAll?: boolean
}

export default ({ value, onChange, showAll, ...rest }: EnvSegmentedProps) => {
  const [options, setOptions] = useState<SegmentedOptions<string>>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .QueryEnv({ Model: {} })
      .then((res) => {
        if (res.Code === 0) {
          const opts = res.Data.List.map((item: any) => ({ value: item.Uid, label: <div>{`${item.Title} ${item.Name}`}</div> }))
          if (showAll) {
            opts.unshift({ value: '', label: <div>所有环境</div> })
          }
          setOptions(opts)
          onChange?.(opts[0].value)
        }
      })
      .finally(() => setLoading(false))
    return setOptions([])
  }, [])

  return (
    <Spin spinning={loading}>
      <Segmented options={options} value={value} onChange={onChange} {...rest} />
    </Spin>
  )
}
