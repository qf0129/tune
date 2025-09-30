import PageView from '@/components/PageView'
import api from '@/api/api'
import type { Release } from '@/util/type'
import ModelTable from '@/components/ModelTable'

export default () => {
  return (
    <PageView>
      <ModelTable<Release>
        modelName="发布"
        tableColumns={[
          { title: 'ID', dataIndex: 'Id', key: 'Id' },
          { title: 'UID', dataIndex: 'Uid', key: 'Uid' },
          { title: '创建时间', dataIndex: 'Ctime', key: 'Ctime' },
          { title: '修改时间', dataIndex: 'Mtime', key: 'Mtime' },
          { title: '发布名称', dataIndex: 'Name', key: 'Name' },
          { title: '状态', dataIndex: 'Status', key: 'Status' },
          { title: '错误信息', dataIndex: 'ErrMsg', key: 'ErrMsg' },
          { title: '描述', dataIndex: 'Description', key: 'Description' },
          { title: '副本数', dataIndex: 'ReplicaCount', key: 'ReplicaCount' },
          { title: '创建者UID', dataIndex: 'CreatorUid', key: 'CreatorUid' },
          { title: '环境UID', dataIndex: 'EnvUid', key: 'EnvUid' },
          { title: '应用UID', dataIndex: 'AppUid', key: 'AppUid' },
          { title: '镜像UID', dataIndex: 'ImageUid', key: 'ImageUid' },
        ]}
        queryFields={[
          { title: '发布名称', key: 'Name' },
          { title: '状态', key: 'Status' },
          { title: '错误信息', key: 'ErrMsg' },
          { title: '描述', key: 'Description' },
          { title: '副本数', key: 'ReplicaCount' },
          { title: '创建者UID', key: 'CreatorUid' },
          { title: '环境UID', key: 'EnvUid' },
          { title: '应用UID', key: 'AppUid' },
          { title: '镜像UID', key: 'ImageUid' },
        ]}
        createFields={[
          { title: '发布名称', key: 'Name', rules: [{ required: true }] },
          { title: '状态', key: 'Status' },
          { title: '错误信息', key: 'ErrMsg' },
          { title: '描述', key: 'Description' },
          { title: '副本数', key: 'ReplicaCount' },
          { title: '创建者UID', key: 'CreatorUid' },
          { title: '环境UID', key: 'EnvUid' },
          { title: '应用UID', key: 'AppUid' },
          { title: '镜像UID', key: 'ImageUid' },
        ]}
        QueryFunc={(req) => api.QueryRelease(req)}
        CreateFunc={(data) => api.CreateRelease(data)}
        DeleteFunc={(data) => api.DeleteRelease(data)}
      />
    </PageView>
  )
}
