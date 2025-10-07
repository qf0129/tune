import PageView from '@/components/PageView'
import api from '@/api/api'
import type { App } from '@/util/type'
import { useNavigate } from 'react-router'
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
  const [appKey, setAppKey] = useState('')
  const [data, setData] = useState<App[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    queryData(page, pageSize)
  }, [])
  const changeAppKey = (k: string) => {
    console.log(111, k)
    setAppKey(k)
    queryData(page, pageSize, k)
  }
  const queryData = (page: number, pageSize: number, appKey?: string) => {
    setLoading(true)
    let queryFilter = {}
    if (appKey !== '') {
      queryFilter = { 'Name:ct': appKey }
    }
    api
      .QueryApp({ Page: page, PageSize: pageSize, Filter: queryFilter })
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
      title="应用列表"
      padding="10px"
      titleAction={
        <Input
          value={appKey}
          prefix={<SearchOutlined />}
          onChange={(e) => changeAppKey(e.target.value)}
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
            { title: '应用名', dataIndex: 'Name', key: 'Name' },
            { title: '描述', dataIndex: 'Description', key: 'Description' },
            { title: 'Git仓库', dataIndex: 'GitUrl', key: 'GitUrl' },
          ]}
          rowClassName={() => 'tableRow'}
          onRow={(record) => {
            return {
              onClick: () => {
                nav(`/app/${record.Uid}`)
              },
            }
          }}
        />
      ) : (
        <Empty description={'没有找到应用'} />
      )}
    </PageView>
  )
}
