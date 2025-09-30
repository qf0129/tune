import { Select } from 'antd'
import { useEffect, useState } from 'react'
import type { Env } from '@/util/type'
import api from '@/api/api'
import type { DefaultOptionType } from 'antd/es/select'

export default () => {
  const [options, setOptions] = useState<DefaultOptionType[]>()
  const [value, setValue] = useState<string>()
  useEffect(() => {
    api.QueryEnv({ Model: {} }).then((res) => {
      if (res.Code === 0) {
        setOptions(
          res.Data.List.map((item: Env) => ({
            label: `${item.Title}(${item.Name})`,
            value: item.Uid,
          }))
        )
        setValue(res.Data.List[0]?.Uid)
      }
    })
    return setOptions(undefined)
  }, [])
  return <Select options={options} value={value} onChange={setValue} />
}
