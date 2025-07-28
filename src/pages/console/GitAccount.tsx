import PageView from '../../components/PageView'
import api from '../../api/api'
import type { GitAccount } from '../../util/type'
import ModelTable from '../../components/ModelTable'
import { Select } from 'antd'

export default () => {
  return (
    <PageView>
      <ModelTable<GitAccount>
        modelName="Git账号"
        tableColumns={[
          { title: 'ID', dataIndex: 'Id', key: 'Id' },
          { title: 'UID', dataIndex: 'Uid', key: 'Uid' },
          { title: '创建时间', dataIndex: 'Ctime', key: 'Ctime' },
          { title: '修改时间', dataIndex: 'Mtime', key: 'Mtime' },
          { title: '域名', dataIndex: 'Host', key: 'Host' },
          { title: '平台', dataIndex: 'Platform', key: 'Platform' },
          { title: '描述', dataIndex: 'Description', key: 'Description' },
          { title: 'API令牌', dataIndex: 'Token', key: 'Token' },
        ]}
        queryFields={[
          { title: '域名', key: 'Host' },
          { title: '平台', key: 'Platform' },
        ]}
        createFields={[
          { title: '域名', key: 'Host', rules: [{ required: true }] },
          {
            title: '平台',
            key: 'Platform',
            rules: [{ required: true }],
            render: (form) => (
              <Select
                onChange={(value) => form.setFieldValue('Platform', value)}
                options={[
                  { value: 'github', label: 'GitHub' },
                  { value: 'gitlab', label: 'GitLab' },
                  { value: 'gitea', label: 'Gitea' },
                ]}
              />
            ),
          },
          { title: '描述', key: 'Description' },
          { title: 'API令牌', key: 'Token' },
        ]}
        QueryFunc={(req) => api.QueryGitAccount(req)}
        CreateFunc={(data) => api.CreateGitAccount(data)}
        DeleteFunc={(data) => api.DeleteGitAccount(data)}
      />
    </PageView>
  )
}
