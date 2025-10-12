import PageView from '@/components/PageView'
import type { App, Pod, Release } from '@/util/type'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '@/api/api'
import useApp from 'antd/es/app/useApp'
import ModelTable from '@/components/ModelTable'
import NiceModal from '@ebay/nice-modal-react'
import PodLogModal from '@/components/modal/PodLogModal'
import { Button, Card, Descriptions, Space } from 'antd'

export default () => {
  const ap = useApp()
  const { appUid, releaseUid } = useParams()
  const [app, setApp] = useState<App>()
  const [release, setRelease] = useState<Release>()

  useEffect(() => {
    queryApp()
    queryRelease()
    return () => setApp(undefined)
  }, [appUid])

  const queryApp = () => {
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
  }
  const queryRelease = () => {
    api.QueryRelease({ Model: { Uid: releaseUid } }).then((res) => {
      if (res.Code === 0) {
        if (res.Data.List.length > 0) {
          setRelease(res.Data.List[0])
        } else {
          ap.message.error('未找到部署信息')
        }
      } else {
        ap.message.error(res.Msg)
      }
    })
  }

  return (
    <PageView
      background="transparent"
      padding="0"
      breadcrumbs={[{ title: '应用列表', path: '/app' }, { title: app?.Name, path: `/app/${appUid}/release` }, { title: '部署详情' }]}
    >
      <Card variant="borderless" size="small">
        <Descriptions
          size="small"
          bordered
          items={[
            { label: '部署名称', children: release?.Name },
            { label: '应用名称', children: app?.Name },
            { label: '部署状态', children: release?.Status },
            { label: '应用分支', children: release?.Branch },
            { label: '部署描述', children: release?.Description },
            { label: '自动构建', children: release?.AutoBuild ? '是' : '否' },
            { label: '环境', children: release?.Env?.Name },
          ]}
        />
        <Space style={{ marginTop: 16 }}>
          <Button type="primary">{release?.ImageUid ? '重新构建' : '构建'}</Button>
          <Button type="primary">部署</Button>
          <Button>更新</Button>
          <Button>重启</Button>
          <Button type="text" danger>
            下线
          </Button>
        </Space>
      </Card>
      <Card title="Pod列表" variant="borderless" style={{ marginTop: 16 }}>
        <ModelTable<Pod>
          modelName="Pod"
          tableColumns={[
            { title: '节点IP', dataIndex: 'HostIp', key: 'HostIp' },
            { title: 'Pod IP', dataIndex: 'PodIp', key: 'PodIp' },
            { title: '启动时间', dataIndex: 'StartTime', key: 'StartTime' },
            { title: '状态', dataIndex: 'Phase', key: 'Phase' },
          ]}
          queryFields={[{ title: 'Pod IP', key: 'PodIp' }]}
          operateBtns={[
            {
              title: '重启',
              onClick: (record) => {},
            },
            {
              title: '日志',
              onClick: (record) => {
                NiceModal.show(PodLogModal, { podUid: record.Uid })
              },
            },
          ]}
          QueryFunc={(req) => api.QueryPod({ Page: req.Page, PageSize: req.PageSize, Model: { ReleaseUid: releaseUid, ...req.Model } })}
        />
      </Card>
    </PageView>
  )
}
