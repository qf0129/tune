import { Select } from 'antd'
import { useEffect, useState } from 'react'
import type { User } from '@/util/type'
import api from '@/api/api'
import type { DefaultOptionType, SelectProps } from 'antd/es/select'

interface ProjectUserSelectProps extends SelectProps<string> {
  projectUid: string | undefined
}

export default function ProjectUserSelect({ projectUid, value, ...rest }: ProjectUserSelectProps) {
  const [options, setOptions] = useState<DefaultOptionType[]>()
  useEffect(() => {
    handleSearch()
    return setOptions(undefined)
  }, [])

  const handleSearch = (value?: string) => {
    if (!projectUid) return
    api.QueryProjectUser({ ProjectUid: projectUid, SearchKey: value }).then((res) => {
      if (res.Code === 0) {
        setOptions(
          res.Data.List.map((item: User) => ({
            label: `${item.Nickname}(${item.Username})`,
            value: item.Uid,
          }))
        )
      }
    })
  }
  return <Select options={options} showSearch onSearch={handleSearch} value={value} placeholder="选择用户" allowClear filterOption={false} {...rest} />
}
