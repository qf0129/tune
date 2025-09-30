import api from '@/api/api'
import type { App } from '@/util/type'
import ModelTable from '@/components/ModelTable'
import PageView from '@/components/PageView'
import NiceModal from '@ebay/nice-modal-react'
import AppUserModal from '@/components/modal/AppUserModal'

export default () => {
  return (
    <PageView>
      <ModelTable<App>
        modelName="应用"
        tableColumns={[
          { title: 'ID', dataIndex: 'Id', key: 'Id' },
          { title: 'UID', dataIndex: 'Uid', key: 'Uid' },
          { title: '创建时间', dataIndex: 'Ctime', key: 'Ctime' },
          { title: '修改时间', dataIndex: 'Mtime', key: 'Mtime' },
          { title: '应用名', dataIndex: 'Name', key: 'Name' },
          { title: '描述', dataIndex: 'Description', key: 'Description' },
          { title: 'Git仓库', dataIndex: 'GitUrl', key: 'GitUrl' },
        ]}
        queryFields={[
          { title: '应用名', key: 'Name' },
          { title: '描述', key: 'Description' },
        ]}
        createFields={[
          { title: '应用名', key: 'Name', rules: [{ required: true }] },
          { title: '描述', key: 'Description' },
          { title: 'Git仓库', key: 'GitUrl' },
        ]}
        operateBtns={[{ title: '用户管理', onClick: (record) => NiceModal.show(AppUserModal, { appUid: record.Uid }) }]}
        QueryFunc={(req) => api.QueryApp(req)}
        CreateFunc={(data) => api.CreateApp(data)}
        DeleteFunc={(data) => api.DeleteApp(data)}
      />
    </PageView>
  )
}
