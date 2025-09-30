import { Tabs } from 'antd'
import PageView from '@/components/PageView'
import type { App } from '@/util/type'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router'
import api from '@/api/api'
import useApp from 'antd/es/app/useApp'

export default () => {
  const ap = useApp()
  const { uid } = useParams()
  const [app, setApp] = useState<App>()
  const nav = useNavigate()
  const location = useLocation()

  useEffect(() => {
    api.QueryApp({ Model: { Uid: uid } }).then((res) => {
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
  }, [uid])

  return (
    <PageView breadcrumbs={[{ title: '应用列表', href: '/app' }, { title: app?.Name }]} background="transport" padding="0">
      <Tabs
        type="card"
        tabBarGutter={4}
        tabBarStyle={{ marginBottom: 0, marginLeft: -1 }}
        activeKey={location.pathname.split('/').pop()}
        items={[
          { key: 'release', label: '发布单' },
          { key: 'config', label: '配置列表' },
          { key: 'image', label: '镜像列表' },
          { key: 'pipeline', label: '流水线管理' },
          { key: 'setting', label: '应用设置' },
        ]}
        onChange={(key) => {
          nav(key)
        }}
      ></Tabs>
      <div style={{ backgroundColor: 'white', padding: '16px' }}>
        <Outlet />
      </div>
    </PageView>
  )
}
