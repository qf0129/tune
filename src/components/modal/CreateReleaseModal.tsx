import { Form, Input, InputNumber, Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import type { Release } from '@/util/type'
import { useForm } from 'antd/es/form/Form'
import EnvRadio from '../select/EnvRadio'
import EnvClusterCheckbox from '../select/EnvClusterCheckbox'
import api from '@/api/api'
import useApp from 'antd/es/app/useApp'

type CreateReleaseModalProps = {
  appUid: string
  onClose?: () => void
}

export default NiceModal.create(({ appUid, onClose }: CreateReleaseModalProps) => {
  const modal = useModal()
  const app = useApp()
  const [form] = useForm<Release>()
  const envUid = Form.useWatch('EnvUid', form)

  const onFinish = async (values: Release) => {
    api.CreateRelease({ ...values, AppUid: appUid }).then((resp) => {
      if (resp.Code === 0) {
        app.message.success('创建成功')
        modal.hide()
        onClose?.()
      } else {
        app.message.error(resp.Msg)
      }
    })
  }

  return (
    <Modal title="新建发布单" onOk={() => form.submit()} open={modal.visible} onCancel={() => modal.hide()} afterClose={() => modal.remove()} width={700}>
      <Form form={form} onFinish={onFinish} style={{ padding: '30px 50px ' }} labelCol={{ span: 4 }}>
        <Form.Item label="应用分支" name="Branch">
          <Input />
        </Form.Item>
        <Form.Item label="发布描述" name="Description">
          <Input />
        </Form.Item>
        <Form.Item label="部署环境" name="EnvUid">
          <EnvRadio />
        </Form.Item>
        <Form.Item label="部署集群" name="ClusterUids">
          <EnvClusterCheckbox envUid={envUid} />
        </Form.Item>
        <Form.Item label="实例数量" name="ReplicaCount">
          <InputNumber min={0} max={1000} defaultValue={1} />
        </Form.Item>
      </Form>
    </Modal>
  )
})
