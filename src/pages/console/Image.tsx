import PageView from '@/components/PageView'
import api from '@/api/api'
import type { Image } from '@/util/type'
import ModelTable from '@/components/ModelTable'

export default () => {
  return (
    <PageView>
      <ModelTable<Image>
        modelName="镜像"
        tableColumns={[
          { title: 'ID', dataIndex: 'Id', key: 'Id' },
          { title: 'UID', dataIndex: 'Uid', key: 'Uid' },
          { title: '创建时间', dataIndex: 'Ctime', key: 'Ctime' },
          { title: '修改时间', dataIndex: 'Mtime', key: 'Mtime' },

          { title: '镜像名', dataIndex: 'Name', key: 'Name' },
          { title: '标签', dataIndex: 'Tag', key: 'Tag' },
          { title: 'Digest', dataIndex: 'Digest', key: 'Digest' },
          { title: '描述', dataIndex: 'Description', key: 'Description' },
          { title: '状态', dataIndex: 'Status', key: 'Status' },
          { title: '错误信息', dataIndex: 'ErrMsg', key: 'ErrMsg' },
          { title: '构建时间', dataIndex: 'BuildTime', key: 'BuildTime' },
          { title: '分支', dataIndex: 'AppBranch', key: 'AppBranch' },
          { title: '应用UID', dataIndex: 'AppUid', key: 'AppUid' },
          { title: '创建者UID', dataIndex: 'CreatorUid', key: 'CreatorUid' },
        ]}
        queryFields={[
          { title: '镜像名', key: 'Name' },
          { title: '标签', key: 'Tag' },
          { title: 'Digest', key: 'Digest' },
          { title: '描述', key: 'Description' },
          { title: '状态', key: 'Status' },
          { title: '错误信息', key: 'ErrMsg' },
          { title: '构建时间', key: 'BuildTime' },
          { title: '分支', key: 'AppBranch' },
          { title: '应用UID', key: 'AppUid' },
          { title: '创建者UID', key: 'CreatorUid' },
        ]}
        createFields={[
          { title: '镜像名', key: 'Name', rules: [{ required: true }] },
          { title: '标签', key: 'Tag' },
          { title: 'Digest', key: 'Digest' },
          { title: '描述', key: 'Description' },
          { title: '状态', key: 'Status' },
          { title: '错误信息', key: 'ErrMsg' },
          { title: '构建时间', key: 'BuildTime' },
          { title: '分支', key: 'AppBranch' },
          { title: '应用UID', key: 'AppUid' },
          { title: '创建者UID', key: 'CreatorUid' },
        ]}
        QueryFunc={(req) => api.QueryImage(req)}
        CreateFunc={(data) => api.CreateImage(data)}
        DeleteFunc={(data) => api.DeleteImage(data)}
      />
    </PageView>
  )
}
