import { Col, Divider, Form, Input, Modal, Row } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import type { Requirement } from '@/util/type'
import { useForm } from 'antd/es/form/Form'
import api from '@/api/api'
import useApp from 'antd/es/app/useApp'
import ProjectSelect from './ProjectSelect'
import { useEffect } from 'react'
import TextArea from 'antd/es/input/TextArea'
import ProjectUserSelect from './ProjectUserSelect'
import PrioritySelect from './PrioritySelect'
import ProjectCategorySelect from './ProjectCategorySelect'

type RequirementEditProps = {
  projectUid?: string
  requirementUid?: string
  onClose?: () => void
}

export default NiceModal.create(({ projectUid, requirementUid, onClose }: RequirementEditProps) => {
  const modal = useModal()
  const app = useApp()
  const [form] = useForm<Requirement>()

  useEffect(() => {
    if (projectUid) {
      form.setFieldValue('ProjectUid', projectUid)
    }
  }, [])

  const onFinish = async (values: Requirement) => {
    let formData: Requirement = values
    if (requirementUid) {
    } else {
      api.CreateRequirement(formData).then((resp) => {
        if (resp.Code === 0) {
          app.message.success('创建成功')
          modal.hide()
          onClose?.()
        } else {
          app.message.error(resp.Msg)
        }
      })
    }
  }

  return (
    <Modal
      title="新建需求"
      onOk={() => form.submit()}
      open={modal.visible}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
      okText="创建"
      cancelText="取消"
      width="90%"
      style={{ top: '5%' }}
    >
      <Divider />
      <Form form={form} onFinish={onFinish} layout="vertical" labelCol={{ span: 6 }} colon={false} labelAlign="left">
        <Row gutter={24}>
          <Col span={18}>
            <Form.Item label="标题" name="Title" rules={[{ required: true }]}>
              <Input size="large" />
            </Form.Item>
            <Form.Item label="需求内容" name="Content">
              <TextArea rows={14} />
            </Form.Item>
          </Col>
          <Col span={6} style={{ borderLeft: '1px solid #e8e8e8' }}>
            <Form.Item label="优先级" name="Priority" layout="horizontal">
              <PrioritySelect variant="borderless" />
            </Form.Item>
            <Form.Item label="需求分类" name="CategoryUid" layout="horizontal">
              <ProjectCategorySelect projectUid={projectUid} variant="borderless" />
            </Form.Item>
            <Form.Item label="产品负责人" name="PmUid" layout="horizontal">
              <ProjectUserSelect projectUid={projectUid} variant="borderless" />
            </Form.Item>
            <Form.Item label="开发负责人" name="DeveloperUid" layout="horizontal">
              <ProjectUserSelect projectUid={projectUid} variant="borderless" />
            </Form.Item>
            <Form.Item label="测试负责人" name="TesterUid" layout="horizontal">
              <ProjectUserSelect projectUid={projectUid} variant="borderless" />
            </Form.Item>
            <Form.Item label="项目" name="ProjectUid" layout="horizontal">
              <ProjectSelect variant="borderless" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Divider />
    </Modal>
  )
})
