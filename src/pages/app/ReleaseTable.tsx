import { Button, Col, Descriptions, Flex, Input, Row, Space, Table, Tag } from 'antd'
import { useEffect, useState } from 'react'
import type { Release } from '@/util/type'
import api from '@/api/api'
import NiceModal from '@ebay/nice-modal-react'
import CreateReleaseModal from '@/components/modal/CreateReleaseModal'
import EnvSelect from '@/components/select/EnvSelect'
import EnvRadio from '@/components/select/EnvRadio'
import EnvSegmented from '@/components/select/EnvSegmented'
import type { ColumnsType } from 'antd/es/table'
import Column from 'antd/es/table/Column'

// Id?: number
// Ctime?: string
// Mtime?: string
// Uid?: string
// Branch?: string
// Name?: string
// Status?: string
// ErrMsg?: string
// Description?: string
// ReplicaCount?: number
// AutoBuild?: boolean
// AutoDeploy?: boolean
// CreatorUid?: string
// EnvUid?: string
// AppUid?: string
// ImageUid?: string
// Creator?: User
// Image?: Image
// App?: App
// Env?: Env

export default () => {
  const [data, setData] = useState<Release[]>()
  const [envUid, setEnvUid] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api
      .QueryRelease({ Model: { EnvUid: envUid } })
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
