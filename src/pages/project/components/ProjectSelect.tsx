import { Select } from 'antd'
import { useEffect, useState } from 'react'
import type { Project } from '@/util/type'
import api from '@/api/api'
import type { DefaultOptionType, SelectProps } from 'antd/es/select'

interface ProjectSelectProps extends SelectProps<string> {}

export default ({ value, ...rest }: ProjectSelectProps) => {
  const [options, setOptions] = useState<DefaultOptionType[]>()
  useEffect(() => {
    api.QueryProject({ Model: {} }).then((res) => {
      if (res.Code === 0) {
        setOptions(
          res.Data.List.map((item: Project) => ({
            label: `${item.Name}`,
            value: item.Uid,
          }))
        )
      }
    })
    return setOptions(undefined)
  }, [])
  return <Select options={options} value={value} {...rest} />
}
