import { useForm } from 'antd/es/form/Form'
import api from '@/api/api'
import type { Image } from '@/util/type'
import { Button, Flex, Form, Input, Table, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import { ReloadOutlined } from '@ant-design/icons'
import { GetDateInterval } from '@/util/date'
import ImageStatusTag from '@/components/tag/ImageStatusTag'

export default () => {
  const [data, setData] = useState<Image[]>()
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [queryForm] = useForm<Image>()

  const columns = [
    { title: 'UID', dataIndex: 'Uid', key: 'Uid' },
    { title: '应用UID', dataIndex: 'AppUid', key: 'AppUid' },
    { title: '创建者UID', dataIndex: 'CreatorUid', key: 'CreatorUid' },
    { title: '创建时间', dataIndex: 'Ctime', key: 'Ctime' },
    { title: '镜像名', dataIndex: 'Name', key: 'Name' },
    { title: '分支', dataIndex: 'AppBranch', key: 'AppBranch' },
    { title: '标签', dataIndex: 'Tag', key: 'Tag' },
    { title: '描述', dataIndex: 'Description', key: 'Description' },
    {
      title: '构建时间',
      dataIndex: 'StartTime',
      key: 'StartTime',
      render: (_: any, record: Image) => (
        <Tooltip title={record.StartTime + ' > ' + (record.EndTime || 'Now')}>
          {record.StartTime && GetDateInterval(new Date(record.StartTime), record.EndTime ? new Date(record.EndTime) : new Date())}
        </Tooltip>
      ),
    },
    {
      title: '状态',
      dataIndex: 'Status',
      key: 'Status',
      render: (_: any, record: Image) => <ImageStatusTag image={record} />,
    },
  ]

  const queryData = async (page?: number, pageSize?: number) => {
    try {
      setLoading(true)
      const res = await api.QueryImage({ Page: page, PageSize: pageSize, Model: queryForm.getFieldsValue(), OrderBy: 'id desc' })
      if (res.Code === 0) {
        setData(res.Data.List)
        setTotal(res.Data.Total)
        setPage(res.Data.Page)
        setPageSize(res.Data.PageSize)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    queryData()
  }, [])

  return (
    <>
      <Flex>
        <Form<Image> form={queryForm} onFinish={() => queryData()} layout="inline" style={{ marginBottom: 16 }} onChange={() => queryData()}>
          <Form.Item name="Name">
            <Input addonBefore="镜像名" />
          </Form.Item>
          <Form.Item name="AppBranch">
            <Input addonBefore="分支" />
          </Form.Item>
        </Form>
        <div style={{ flex: 1 }}></div>
        <Button onClick={() => queryData()} icon={<ReloadOutlined />} />
      </Flex>
      <Table<Image>
        dataSource={data}
        loading={loading}
        columns={columns}
        pagination={{
          total,
          pageSize,
          current: page,
          onChange: (page, pageSize) => {
            queryData(page, pageSize)
          },
          showTotal: (total) => `共 ${total} 条`,
        }}
      />
    </>
  )
}
