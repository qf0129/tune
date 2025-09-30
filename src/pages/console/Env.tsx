import PageView from '@/components/PageView'
import api from '@/api/api'
import type { Env } from '@/util/type'
import ModelTable from '@/components/ModelTable'
import TextArea from 'antd/es/input/TextArea'

export default () => {
  return (
    <PageView>
      <ModelTable<Env>
        modelName="环境"
        tableColumns={[
          { title: 'ID', dataIndex: 'Id', key: 'Id' },
          { title: 'UID', dataIndex: 'Uid', key: 'Uid' },
          { title: '创建时间', dataIndex: 'Ctime', key: 'Ctime' },
          { title: '修改时间', dataIndex: 'Mtime', key: 'Mtime' },
          { title: '环境名', dataIndex: 'Name', key: 'Name' },
          { title: '标题', dataIndex: 'Title', key: 'Title' },
          { title: '描述', dataIndex: 'Description', key: 'Description' },
          { title: 'K8S配置', dataIndex: 'KubeConfig', key: 'KubeConfig' },
          { title: '域名', dataIndex: 'Domain', key: 'Domain' },
        ]}
        queryFields={[
          { title: '环境名', key: 'Name' },
          { title: '域名', key: 'Domain' },
        ]}
        createFields={[
          { title: '环境名', key: 'Name', rules: [{ required: true }] },
          { title: '标题', key: 'Title' },
          { title: '描述', key: 'Description' },
          { title: 'K8S配置', key: 'KubeConfig', render: () => <TextArea rows={4} /> },
          { title: '域名', key: 'Domain' },
        ]}
        QueryFunc={(req) => api.QueryEnv(req)}
        CreateFunc={(data) => api.CreateEnv(data)}
        DeleteFunc={(data) => api.DeleteEnv(data)}
      />
    </PageView>
  )
}
