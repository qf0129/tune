import { Button, Flex, Space, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import type { App, Release } from '@/util/type'
import NiceModal from '@ebay/nice-modal-react'
import CreateReleaseModal from '@/components/modal/CreateReleaseModal'
import EnvSegmented from '@/components/select/EnvSegmented'
import Column from 'antd/es/table/Column'
import { useParams } from 'react-router'
import useApp from 'antd/es/app/useApp'
import Link from 'antd/es/typography/Link'
import api from '@/api/api'

export default () => {
  const [data, setData] = useState<Release[]>()
  const [envUid, setEnvUid] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { uid: appUid } = useParams()
  const [app, setApp] = useState<App>()
  const ap = useApp()

  useEffect(() => {
    api.QueryApp({ Model: { Uid: appUid } }).then((res) => {
      if (res.Code === 0) {
        if (res.Data.List.length > 0) {
          setApp(res.Data.List[0])
        } else {
          ap.message.error('未找到应用')
        }
      } else {
        ap.message.error(res.Msg)
      }
    })
    return () => setApp(undefined)
  }, [appUid])

  const descriptions = [
    {
      label: '应用名称',
      key: 'name',
      children: app?.Name,
    },
    {
      label: '负责人',
      key: 'owners',
      children: (
        <>
          {app?.Owners?.map((user) => (
            <Tag key={user.Uid}>{user.Nickname || user.Username}</Tag>
          ))}
        </>
      ),
    },
    {
      label: '开发者',
      key: 'developers',
      children: (
        <>
          {app?.Developers?.map((user) => (
            <Tag key={user.Uid}>{user.Nickname || user.Username}</Tag>
          ))}
        </>
      ),
    },
    {
      label: '应用描述',
      key: 'description',
      children: app?.Description,
    },
    {
      label: 'Git仓库',
      key: 'git',
      children: (
        <Link href={app?.GitUrl} target="_blank">
          {app?.GitUrl}
        </Link>
      ),
    },
  ]

  useEffect(() => {
    setLoading(true)
    api
      .QueryRelease({ Model: { AppUid: appUid, EnvUid: envUid } })
      .then((res) => {
        if (res.Code === 0) {
          setData(res.Data.List)
        }
      })
      .finally(() => {
        setLoading(false)
      })
    return setData(undefined)
  }, [envUid])

  return (
    <div style={{ padding: '0 ' }}>
      <Flex style={{ paddingBottom: 16 }}>
        <Flex flex={1}>
          <EnvSegmented showAll onChange={setEnvUid} />
        </Flex>
        <Button type="primary" onClick={() => NiceModal.show(CreateReleaseModal, {})}>
          新建发布
        </Button>
      </Flex>
      <Table<Release> dataSource={data} loading={loading}>
        <Column
          title="环境"
          key="EnvTitle"
          dataIndex={['Env', 'Title']}
          render={(_: any, record: Release) => (
            <Space direction="vertical" align="center">
              <div>{record.Env?.Title}</div>
              <Tag>
                {record.Cluster?.Title}({record.Cluster?.Name})
              </Tag>
            </Space>
          )}
        />
        <Column title="分支" key="Branch" dataIndex="Branch" />
        <Column title="描述" key="Description" dataIndex="Description" />
        <Column title="副本数量" key="ReplicaCount" dataIndex="ReplicaCount" />
        <Column title="上次构建时间" key="ImageBuildTime" dataIndex={['Image', 'BuildTime']} />
        <Column title="状态" key="Status" dataIndex="Status" />
        <Column title="操作" key="operate" />
      </Table>
    </div>
  )
}
