import { Checkbox, Spin } from 'antd'
import { useEffect, useState } from 'react'
import api from '@/api/api'
import type { CheckboxGroupProps, CheckboxOptionType } from 'antd/es/checkbox'

interface EnvClusterCheckboxProps extends Omit<CheckboxGroupProps, 'options' | 'loading'> {
  envUid: string | undefined
}

export default ({ envUid, value, onChange, ...rest }: EnvClusterCheckboxProps) => {
  const [options, setOptions] = useState<CheckboxOptionType<string>[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .QueryEnv({ Model: { Uid: envUid } })
      .then((res) => {
        if (res.Code === 0) {
          if (res.Data.List.length && res.Data.List[0].Clusters) {
            const opts: CheckboxOptionType[] = res.Data.List[0].Clusters.map((item: any) => ({ value: item.Uid, label: `${item.Title}(${item.Name})` }))
            setOptions(opts)
            onChange?.(opts.map((item) => item.value))
          }
        }
      })
      .finally(() => setLoading(false))
    return setOptions([])
  }, [envUid])

  return (
    <Spin spinning={loading}>
      <Checkbox.Group options={options} value={value} onChange={onChange} {...rest} />
    </Spin>
  )
}
