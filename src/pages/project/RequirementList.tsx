import PageView from '@/components/PageView'
import api from '@/api/api'
import type { Requirement } from '@/util/type'
import { useNavigate, useParams } from 'react-router'
import { Button, Flex, Input, Table } from 'antd'
import { useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { EditFilled, SearchOutlined } from '@ant-design/icons'

const ExtraClass = createGlobalStyle`
  .tableRow {
    td {
      padding: 0 6px !important;
    }
  }
`
const TitleCell = styled.div`
  line-height: 48px;
  text-align: left;
  cursor: pointer;
  &:hover .linkBtn {
    color: var(--main-color);
  }
  &:hover .editBtn {
    visibility: visible;
  }
`
const LinkBtn = styled.div`
  padding: 0 11px;
  color: var(--text-color-1);
`
const EditBtn = styled(EditFilled)`
  visibility: hidden;
  padding: 8px;
  color: var(--text-color-9);
  &:hover {
    color: var(--main-color);
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

  const [titleEditing, setTitleEditing] = useState(false)
  const [editUid, setEditUid] = useState('')
  const [editValue, setEditValue] = useState('')
  const renderTitle = (_: any, record: Requirement) => {
    return (
      <TitleCell>
        {titleEditing && editUid === record.Uid ? (
          <Input
            autoFocus
            variant="underlined"
            value={editValue}
            onBlur={() => {
              setTitleEditing(false)
              setEditUid('')
              setEditValue('')
            }}
            style={{ width: '100%' }}
            onChange={(e) => setEditValue(e.target.value)}
          />
        ) : (
          <LinkBtn className="linkBtn" onClick={() => nav(`/project/${projectUid}/requirement/${record.Uid}`)}>
            {record.Title}
            <EditBtn
              className="editBtn"
              onClick={(e) => {
                e.stopPropagation()
                setTitleEditing(true)
                setEditUid(record.Uid || '')
                setEditValue(record.Title || '')
              }}
            />
          </LinkBtn>
        )}
      </TitleCell>
    )
  }

  return (
    <PageView padding="10px" margin="10px">
      <ExtraClass />
      <Flex style={{ marginBottom: 12 }}>
        <Button type="primary">新建需求</Button>
        <div style={{ flex: 1 }} />
        <Input
          value={searchKey}
          prefix={<SearchOutlined />}
          onChange={(e) => changeSearchKey(e.target.value)}
          style={{ width: '400px' }}
          allowClear
          placeholder="搜索需求"
        />
      </Flex>
      <Table<Requirement>
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
          { title: '标题', dataIndex: 'Title', key: 'Title', width: 240, render: renderTitle },
          { title: '需求分类', dataIndex: ['Category', 'Name'], key: 'Category.Name' },
          { title: '优先级', dataIndex: 'Priority', key: 'Priority' },
          { title: '状态', dataIndex: 'Status', key: 'Status' },
          { title: '创建人', dataIndex: ['Creator', 'Nickname'], key: 'Creator.Nickname' },
          { title: '产品负责人', dataIndex: ['Pm', 'Nickname'], key: 'Pm.Nickname' },
          { title: '开发负责人', dataIndex: ['Developer', 'Nickname'], key: 'Developer.Nickname' },
          { title: '测试负责人', dataIndex: ['Tester', 'Nickname'], key: 'Tester.Nickname' },
        ]}
        rowClassName={() => 'tableRow'}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       nav(`/project/${projectUid}/requirement/${record.Uid}`)
        //     },
        //   }
        // }}
      />
    </PageView>
  )
}
