import { Checkbox, Spin } from 'antd'
import { useEffect, useState } from 'react'
import api from '@/api/api'
import type { CheckboxGroupProps, CheckboxOptionType } from 'antd/es/checkbox'

export default ({ value, onChange, ...rest }: Omit<CheckboxGroupProps, 'options' | 'loading'>) => {
  const [options, setOptions] = useState<CheckboxOptionType<string>[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .QueryEnv({ Model: {} })
      .then((res) => {
        if (res.Code === 0) {
          setOptions(res.Data.List.map((item: any) => ({ value: item.Uid, label: `${item.Title}(${item.Name})` })))
        }
      })
      .finally(() => setLoading(false))
    return setOptions([])
  }, [])
  return (
    <Spin spinning={loading}>
      <Checkbox.Group options={options} value={value} onChange={onChange} {...rest} />
    </Spin>
  )
}
