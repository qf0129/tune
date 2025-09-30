import { Radio, Spin, type RadioGroupProps } from 'antd'
import { useEffect, useState } from 'react'
import api from '@/api/api'
import type { CheckboxOptionType } from 'antd/es/checkbox'

interface EnvRadioProps extends Omit<RadioGroupProps, 'options'> {
  showAll?: boolean
}

export default ({ showAll, value, onChange, ...rest }: EnvRadioProps) => {
  const [options, setOptions] = useState<CheckboxOptionType<string>[]>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    api
      .QueryEnv({})
      .then((res) => {
        if (res.Code === 0) {
          if (res.Data.List.length > 0) {
            const opts = res.Data.List.map((item: any) => ({ value: item.Uid, label: `${item.Title}(${item.Name})` }))
            if (showAll) {
              opts.unshift({ value: '', label: '所有环境' })
            }
            setOptions(opts)
            onChange?.(opts[0].value)
          }
        }
      })
      .finally(() => setLoading(false))
    return setOptions([])
  }, [])

  return (
    <Spin spinning={loading}>
      <Radio.Group options={options} value={value} onChange={onChange} optionType="button" {...rest} />
    </Spin>
  )
}
