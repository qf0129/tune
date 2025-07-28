import PageView from '../../components/PageView'
import api from '../../api/api'
import type { User } from '../../util/type'
import ModelTable from '../../components/ModelTable'

export default () => {
  return (
    <PageView>
      <ModelTable<User>
        modelName="用户"
        tableColumns={[
          { title: 'ID', dataIndex: 'Id', key: 'Id' },
          { title: 'UID', dataIndex: 'Uid', key: 'Uid' },
          { title: '创建时间', dataIndex: 'Ctime', key: 'Ctime' },
          { title: '修改时间', dataIndex: 'Mtime', key: 'Mtime' },
          { title: '用户名', dataIndex: 'Username', key: 'Username' },
          { title: '手机号', dataIndex: 'Phone', key: 'Phone' },
          { title: '邮箱', dataIndex: 'Email', key: 'Email' },
          { title: '昵称', dataIndex: 'Nickname', key: 'Nickname' },
        ]}
        queryFields={[
          { title: '用户名', key: 'Username' },
          { title: '手机号', key: 'Phone' },
          { title: '邮箱', key: 'Email' },
          { title: '昵称', key: 'Nickname' },
        ]}
        createFields={[
          { title: '用户名', key: 'Username', rules: [{ required: true }] },
          { title: '手机号', key: 'Phone' },
          { title: '邮箱', key: 'Email' },
          { title: '昵称', key: 'Nickname' },
        ]}
        QueryFunc={(req) => api.QueryUser(req)}
        CreateFunc={(data) => api.CreateUser(data)}
        DeleteFunc={(data) => api.DeleteUser(data)}
      />
    </PageView>
  )
}
