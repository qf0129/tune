import api from '@/api/api'
import type { Project } from '@/util/type'
import { SearchOutlined } from '@ant-design/icons'
import { Input, Skeleton } from 'antd'
import useApp from 'antd/es/app/useApp'
import { use, useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router'
import styled from 'styled-components'

const MenuList = styled.div`
  position: sticky;
  top: 0;
  flex-shrink: 0;
  width: 240px;
  height: 100%;
  padding: 12px;
`

const MenuItem = styled(NavLink)`
  display: block;
  padding: 6px 20px;
  margin-top: 2px;
  cursor: pointer;
  border-radius: 2px;
  color: var(--text-color);
  transition: all 0.2s;
  &:hover {
    background-color: #f3f3f3;
    color: var(--text-color);
  }
  &.active {
    color: var(--main-color);
    background-color: #eee;
  }
`

interface ProjectListProps {}

export default ({}: ProjectListProps) => {
  const app = useApp()
  const nav = useNavigate()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Project[]>([])
  const { projectUid } = useParams()
  const [searchKey, setSearchKey] = useState('')

  useEffect(() => {
    queryList()
  }, [])

  useEffect(() => {
    if (!projectUid && list.length > 0) {
      nav(`/project/${list[0].Uid}`)
    }
  }, [projectUid])

  const changeSearchKey = (k: string) => {
    console.log(111, k)
    setSearchKey(k)
    queryList(k)
  }

  const queryList = (searchKey?: string) => {
    setLoading(true)
    let queryFilter = {}
    if (searchKey !== '') {
      queryFilter = { 'Name:ct': searchKey }
    }
    api
      .QueryProject({
        Page: 1,
        PageSize: 100,
        Filter: queryFilter,
      })
      .then((res) => {
        if (res.Code === 0) {
          setList(res.Data.List)
          if (!projectUid && res.Data.List.length > 0) {
            nav(`/project/${res.Data.List[0].Uid}`)
          }
        } else {
          app.message.error('查询项目列表失败：' + res.Msg)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <MenuList>
      <Input
        prefix={<SearchOutlined />}
        value={searchKey}
        placeholder="搜索项目"
        allowClear
        style={{ marginBottom: 10 }}
        onChange={(e) => changeSearchKey(e.target.value)}
      />
      {loading ? (
        <Skeleton active />
      ) : (
        <>
          {list.map((item) => (
            <MenuItem key={item.Uid} to={`/project/${item.Uid}`}>
              {item.Name}
            </MenuItem>
          ))}
        </>
      )}
    </MenuList>
  )
}
