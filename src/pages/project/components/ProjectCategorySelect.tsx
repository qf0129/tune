import { Select } from 'antd'
import { useEffect, useState } from 'react'
import type { RequirementCategory } from '@/util/type'
import api from '@/api/api'
import type { DefaultOptionType, SelectProps } from 'antd/es/select'

interface ProjectCategorySelectProps extends SelectProps<string> {
  projectUid: string | undefined
}

export default function ProjectCategorySelect({ projectUid, value, ...rest }: ProjectCategorySelectProps) {
  const [options, setOptions] = useState<DefaultOptionType[]>()
  useEffect(() => {
    handleSearch()
    return setOptions(undefined)
  }, [])

  const handleSearch = (value?: string) => {
    if (!projectUid) return
    api.QueryProjectCategory({ ProjectUid: projectUid, SearchKey: value }).then((res) => {
      if (res.Code === 0) {
        setOptions(
          res.Data.map((item: RequirementCategory) => ({
            label: item.Name,
            value: item.Uid,
          }))
        )
      }
    })
  }
  return <Select options={options} showSearch onSearch={handleSearch} value={value} placeholder="选择分类" allowClear filterOption={false} {...rest} />
}
