import { Modal, Popconfirm, Space, Table } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import { useEffect, useState } from 'react'
import type { AppUser, User } from '@/util/type'
import type { ColumnsType } from 'antd/es/table'
import Link from 'antd/es/typography/Link'

type AppUserModalProps = {
  appUid: string
}

export default NiceModal.create(({ appUid }: AppUserModalProps) => {
  const modal = useModal()
  const [data, setData] = useState<User[]>([])

  const columns: ColumnsType<AppUser> = [
    {
      title: '角色',
      dataIndex: 'Role',
      key: 'Role',
    },
    {
      title: '用户名',
      dataIndex: 'Username',
      key: 'Username',
    },
    {
      title: '手机号',
      dataIndex: 'Phone',
      key: 'Phone',
    },
    {
      title: '邮箱',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: '操作',
      key: 'operate',
      render: (record) => (
        <Space size="middle">
          <Popconfirm title="确定删除此记录吗？" onConfirm={() => deleteRequest(record)} okText="确定" cancelText="取消">
            <Link>删除</Link>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const deleteRequest = async (record: AppUser) => {
    // await api.DeleteAppUser({ AppUid: record.Uid as string })
  }
  const queryRequest = async () => {
    // api.QueryAppUser({ AppUid: appUid }).then((res) => {
    //   if (res.Code === 0) {
    //     setData(res.Data)
    //   }
    // })
  }

  useEffect(() => {
    queryRequest()
    return () => setData([])
  }, [])

  return (
    <Modal title="用户管理" onOk={() => modal.hide()} open={modal.visible} onCancel={() => modal.hide()} afterClose={() => modal.remove()}>
      <Table dataSource={data} columns={columns} />
    </Modal>
  )
})
