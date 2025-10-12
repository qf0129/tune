import PageView from '@/components/PageView'
import api from '@/api/api'
import type { App, Requirement } from '@/util/type'
import { useNavigate, useParams } from 'react-router'
import { Empty, Input, Table } from 'antd'
import { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { SearchOutlined } from '@ant-design/icons'

const ExtraClass = createGlobalStyle`
  .tableRow {
    cursor: pointer;
  }
`

export default () => {
  const nav = useNavigate()
  const [searchKey, setSearchKey] = useState('')
  const [data, setData] = useState<Requirement[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const { projectUid } = useParams()

  useEffect(() => {
    queryData(page, pageSize)
  }, [])
  const changeSearchKey = (k: string) => {
    console.log(111, k)
    setSearchKey(k)
    queryData(page, pageSize, k)
  }
  const queryData = (page: number, pageSize: number, searchKey?: string) => {
    setLoading(true)
    let queryFilter = {}
    if (searchKey !== '') {
      queryFilter = { project_uid: projectUid, 'Title:ct': searchKey }
    }
    api
      .QueryRequirement({ Page: page, PageSize: pageSize, Filter: queryFilter })
      .then((res) => {
        if (res.Code === 0) {
          setData(res.Data.List)
          setTotal(res.Data.Total)
          setPage(res.Data.Page)
          setPageSize(res.Data.PageSize)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <PageView
      padding="10px"
      breadcrumbs={[{ title: '需求列表' }]}
      breadcrumbAction={
        <Input
          value={searchKey}
          prefix={<SearchOutlined />}
          onChange={(e) => changeSearchKey(e.target.value)}
          style={{ width: '400px' }}
          allowClear
          placeholder="搜索应用"
          // size="large"
        />
      }
    >
      <ExtraClass />

      {data.length > 0 ? (
        <Table
          dataSource={data}
          loading={loading}
          style={{ width: '100%' }}
          rowKey={(record) => record.Uid || ''}
          rowHoverable
          pagination={{
            total: total,
            pageSize,
            current: page,
            onChange: (page, pageSize) => {
              queryData(page, pageSize)
            },
            showTotal: (total) => `共 ${total} 条`,
          }}
          columns={[
            { title: '标题', dataIndex: 'Title', key: 'Title' },
            { title: '创建人', key: 'Creator.Username', render: (_, record) => record?.Creator?.Username || '' },
            { title: '创建时间', dataIndex: 'Ctime', key: 'Ctime' },
          ]}
          rowClassName={() => 'tableRow'}
          onRow={(record) => {
            return {
              onClick: () => {
                nav(`/requirement/${record.Uid}`)
              },
            }
          }}
        />
      ) : (
        <Empty description={'没有数据'} />
      )}
    </PageView>
  )
}
