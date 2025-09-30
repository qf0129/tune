import PageView from '@/components/PageView'
import api from '@/api/api'
import type { App } from '@/util/type'
import ModelTable from '@/components/ModelTable'
import { useNavigate } from 'react-router'

export default () => {
  const nav = useNavigate()
  return (
    <PageView margin="10px">
      <ModelTable<App>
        modelName="应用"
        tableColumns={[
          { title: '应用名', dataIndex: 'Name', key: 'Name' },
          { title: '描述', dataIndex: 'Description', key: 'Description' },
          { title: 'Git仓库', dataIndex: 'GitUrl', key: 'GitUrl' },
        ]}
        queryFields={[
          { title: '应用名', key: 'Name' },
          { title: '描述', key: 'Description' },
        ]}
        createFields={[
          { title: '应用名', key: 'Name', rules: [{ required: true, message: '请输入应用名' }] },
          { title: '描述', key: 'Description' },
          { title: 'Git仓库', key: 'GitUrl' },
        ]}
        operateBtns={[
          {
            title: '详情',
            onClick: (record) => {
              nav(`/app/${record.Uid}`)
            },
          },
        ]}
        QueryFunc={(req) => api.QueryApp(req)}
        CreateFunc={(data) => api.CreateApp(data)}
      />
    </PageView>
  )
}
