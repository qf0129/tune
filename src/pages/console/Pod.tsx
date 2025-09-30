import PageView from '@/components/PageView'
import api from '@/api/api'
import type { Pod } from '@/util/type'
import ModelTable from '@/components/ModelTable'

export default () => {
  return (
    <PageView>
      <ModelTable<Pod>
        modelName="Pod"
        tableColumns={[
          { title: 'ID', dataIndex: 'Id', key: 'Id' },
          { title: 'UID', dataIndex: 'Uid', key: 'Uid' },
          { title: '创建时间', dataIndex: 'Ctime', key: 'Ctime' },
          { title: '集群UID', dataIndex: 'ClusterUid', key: 'ClusterUid' },
          { title: '发布UID', dataIndex: 'ReleaseUid', key: 'ReleaseUid' },
          { title: '命名空间', dataIndex: 'Namespace', key: 'Namespace' },
          { title: 'Pod名称', dataIndex: 'PodName', key: 'PodName' },
          { title: '节点IP', dataIndex: 'HostIp', key: 'HostIp' },
          { title: 'Pod IP', dataIndex: 'PodIp', key: 'PodIp' },
          { title: '启动时间', dataIndex: 'StartTime', key: 'StartTime' },
          { title: '状态', dataIndex: 'Phase', key: 'Phase' },
          { title: '原始数据', dataIndex: 'Raw', key: 'Raw' },
        ]}
        queryFields={[
          { title: '集群UID', key: 'ClusterUid' },
          { title: '发布UID', key: 'ReleaseUid' },
          { title: '命名空间', key: 'Namespace' },
          { title: 'Pod名称', key: 'PodName' },
          { title: '节点IP', key: 'HostIp' },
          { title: 'Pod IP', key: 'PodIp' },
        ]}
        QueryFunc={(req) => api.QueryPod(req)}
      />
    </PageView>
  )
}
