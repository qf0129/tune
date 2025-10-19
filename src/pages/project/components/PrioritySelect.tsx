import { Select } from 'antd'
import type { SelectProps } from 'antd/es/select'

interface PrioritySelectProps extends SelectProps<string> {}

export default function PrioritySelect({ value, ...rest }: PrioritySelectProps) {
  return (
    <Select
      options={Array.from({ length: 10 }, (_, i) => i + 1).map((i) => {
        return { label: '' + i, value: i }
      })}
      value={value}
      placeholder="选择优先级"
      allowClear
      {...rest}
    />
  )
}
