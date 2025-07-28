import PageView from '../../components/PageView'
import api from '../../api/api'
import type { App } from '../../util/type'
import ModelTable from '../../components/ModelTable'

export default () => {
  return (
    <PageView>
      <ModelTable<App>
        modelName="应用"
        tableColumns={[
          { title: '应用名', dataIndex: 'Name', key: 'Name' },
          { title: '描述', dataIndex: 'Description', key: 'Description' },
          { title: 'Git仓库', dataIndex: 'GitUrl', key: 'GitUrl' },
          // {
          //   title: '操作',
          //   key: 'operate',
          //   render: () => <a>Detail</a>,
          // },
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
        operateBtns={[{ title: 'aa' }, { title: 'bb' }]}
        QueryFunc={(req) => api.QueryApp(req)}
        CreateFunc={(data) => api.CreateApp(data)}
      />
    </PageView>
  )
}
