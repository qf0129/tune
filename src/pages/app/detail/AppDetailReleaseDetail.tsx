import PageView from '@/components/PageView'
import type { App, Pod } from '@/util/type'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import api from '@/api/api'
import useApp from 'antd/es/app/useApp'
import ModelTable from '@/components/ModelTable'
import NiceModal from '@ebay/nice-modal-react'
import PodLogModal from '@/components/modal/PodLogModal'

export default () => {
  const ap = useApp()
  const { appUid, releaseUid } = useParams()
  const [app, setApp] = useState<App>()

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

  return (
    <PageView breadcrumbs={[{ title: '应用列表', href: '/app' }, { title: app?.Name, href: `/app/${appUid}/release` }, { title: '部署详情' }]}>
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
    </PageView>
  )
}
