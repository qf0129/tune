import { Button, Dropdown, Flex, Popconfirm, Space, Table } from 'antd'
import { useEffect, useState } from 'react'
import type { Release } from '@/util/type'
import api from '@/api/api'
import NiceModal from '@ebay/nice-modal-react'
import CreateReleaseModal from '@/components/modal/CreateReleaseModal'
import Column from 'antd/es/table/Column'
import { useNavigate, useParams } from 'react-router'
import EnvRadio from '@/components/select/EnvRadio'
import Link from 'antd/es/typography/Link'
import { EllipsisOutlined } from '@ant-design/icons'
import useApp from 'antd/es/app/useApp'
import ImageStatusTag from '@/components/tag/ImageStatusTag'
import EnvTag from '@/components/tag/EnvTag'

export default () => {
  const app = useApp()
  const [data, setData] = useState<Release[]>()
  const [envUid, setEnvUid] = useState<string>()
  const [loading, setLoading] = useState(false)
  const { appUid } = useParams()
  const nav = useNavigate()

  useEffect(() => {
    requestData()
    const timer = setInterval(requestData, 5000)
    return () => clearInterval(timer)
  }, [envUid])

  const requestData = () => {
    setLoading(true)
    api
      .QueryRelease({ Model: { AppUid: appUid, EnvUid: envUid }, OrderBy: 'id desc' })
      .then((res) => {
        if (res.Code === 0) {
          setData(res.Data.List)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div style={{ padding: '0 ' }}>
      <Flex style={{ paddingBottom: 16 }}>
        <Flex flex={1}>
          <EnvRadio showAll value={envUid} onChange={(e) => setEnvUid(e.target?.value || '')} />
        </Flex>
        <Button type="primary" onClick={() => NiceModal.show(CreateReleaseModal, { appUid, onClose: requestData })}>
          新建发布单
        </Button>
      </Flex>
      <Table<Release> dataSource={data} loading={loading}>
        <Column
          title="环境"
          key="EnvTitle"
          dataIndex={['Env', 'Title']}
          render={(_, record: Release) => (
            <Space direction="vertical" align="center">
              <EnvTag env={record.Env} />
              <div style={{ fontSize: '13px' }}>
                {record.Cluster?.Title}({record.Cluster?.Name})
              </div>
            </Space>
          )}
        />
        <Column
          title="分支"
          key="Branch"
          render={(record: Release) => (
            <Space direction="vertical" align="center">
              <div>{record.Branch}</div>
              <div style={{ color: 'var(--text-color-9)' }}>{record.Description}</div>
            </Space>
          )}
        />
        <Column
          title="镜像版本"
          key="Image"
          render={(record: Release) => (
            <Space direction="vertical" align="center">
              <div>{record.Image?.Tag}</div>
              {record.Image?.Tag && record.Image?.Status !== 'completed' && <ImageStatusTag image={record.Image} />}
            </Space>
          )}
        />
        <Column title="实例数量" key="ReplicaCount" dataIndex="ReplicaCount" />
        <Column title="状态" key="Status" dataIndex="Status" />
        <Column
          width={200}
          title="操作"
          key="operate"
          render={(_, record: Release) => (
            <Space>
              <Link onClick={() => nav(`/app/${appUid}/release/${record.Uid}`)}>详情</Link>
              <Popconfirm
                title="确认构建吗？"
                onConfirm={() => {
                  api.ReleaseBuild(record.Uid as string).then((res) => {
                    if (res.Code === 0) {
                      app.message.success('开始构建')
                      requestData()
                    } else {
                      app.message.error(res.Msg)
                    }
                  })
                }}
              >
                <Link>构建</Link>
              </Popconfirm>
              <Popconfirm
                title="确认部署吗？"
                onConfirm={() => {
                  api.ReleaseDeploy({ ReleaseUid: record.Uid }).then((res) => {
                    if (res.Code === 0) {
                      app.message.success('开始部署')
                      requestData()
                    } else {
                      app.message.error(res.Msg)
                    }
                  })
                }}
              >
                <Link>部署</Link>
              </Popconfirm>
              <Popconfirm
                title="确认下线吗？"
                onConfirm={() => {
                  api.ReleaseOffline(record.Uid as string).then((res) => {
                    if (res.Code === 0) {
                      app.message.success('开始下线')
                      requestData()
                    } else {
                      app.message.error(res.Msg)
                    }
                  })
                }}
              >
                <Link>下线</Link>
              </Popconfirm>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'update',
                      label: '更新',
                      onClick: () => {},
                    },
                  ],
                }}
              >
                <Link>
                  <EllipsisOutlined />
                </Link>
              </Dropdown>
            </Space>
          )}
        />
      </Table>
    </div>
  )
}
