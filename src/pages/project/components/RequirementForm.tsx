import { Button, Col, Flex, Form, Input, InputNumber, Row, Select, Space } from 'antd'
import type { Requirement, RequirementTask } from '@/util/type'
import { useForm } from 'antd/es/form/Form'
import api from '@/api/api'
import useApp from 'antd/es/app/useApp'
import ProjectSelect from './ProjectSelect'
import { useEffect, useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import ProjectUserSelect from './ProjectUserSelect'
import PrioritySelect from './PrioritySelect'
import ProjectCategorySelect from './ProjectCategorySelect'
import { Option } from 'antd/es/mentions'
import { CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

type RequirementEditProps = {
  projectUid?: string
  requirementUid?: string
  onSubmit?: () => void
  onClose?: () => void
}

export default ({ projectUid, requirementUid, onSubmit, onClose }: RequirementEditProps) => {
  const app = useApp()
  const [form] = useForm<Requirement>()
  const [tasks, setTasks] = useState<RequirementTask[]>([])

  useEffect(() => {
    if (requirementUid) {
      queryRequirement()
    }
    if (projectUid) {
      form.setFieldValue('ProjectUid', projectUid)
    }
    form.setFieldValue('Tasks', [])
  }, [])

  const queryRequirement = async () => {
    api.QueryRequirement({ Model: { Uid: requirementUid } }).then((resp) => {
      if (resp.Code === 0) {
        const requirement = resp.Data.List[0]
        form.setFieldsValue(requirement)
        setTasks(requirement.Tasks || [])
      }
    })
  }
  const onFinish = async (values: Requirement) => {
    const formData = { ...values, Tasks: tasks }
    if (requirementUid) {
    } else {
      api.CreateRequirement(formData).then((resp) => {
        if (resp.Code === 0) {
          app.message.success('创建成功')
          onSubmit?.()
        } else {
          app.message.error(resp.Msg)
        }
      })
    }
  }

  const addTask = () => {
    setTasks([...tasks, { Title: form.getFieldValue('Title'), Type: 'backend' }])
  }

  const removeTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index)
    setTasks(newTasks)
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      labelCol={{ span: 6 }}
      colon={false}
      labelAlign="left"
      style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
    >
      <Flex style={{ height: '50px', padding: '0 6px', borderBottom: '1px solid #d9d9d9' }} align="center">
        <Form.Item name="Title" rules={[{ required: true, message: '请输入' }]} style={{ marginBottom: 0, flex: 1 }}>
          <Input style={{ fontSize: 18 }} size="large" placeholder="请输入需求标题" variant="borderless" allowClear />
        </Form.Item>
        <Button type="text" size="large" icon={<CloseOutlined />} onClick={onClose} />
      </Flex>
      <Flex style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
          <Form.Item label="需求描述" name="Content">
            <TextArea rows={14} placeholder="请输入需求描述" />
          </Form.Item>
          <Form.Item
            label={
              <Space align="center">
                <span>任务</span>
                <Button variant="text" color="primary" size="small" icon={<PlusOutlined />} onClick={addTask} />
              </Space>
            }
            name="Tasks"
          >
            {tasks?.map((task: RequirementTask, index: number) => (
              <Row key={index} style={{ padding: '6px 0', marginBottom: 6, borderBottom: '1px solid #d9d9d9' }} align="middle" gutter={4}>
                <Col>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Select
                      placeholder="类型"
                      value={task.Type}
                      onChange={(value) => {
                        const newTasks = [...tasks]
                        newTasks[index].Type = value
                        setTasks(newTasks)
                      }}
                      style={{ width: 120 }}
                      variant="filled"
                    >
                      <Option value="backend">后端任务</Option>
                      <Option value="frontend">前端任务</Option>
                      <Option value="test">测试任务</Option>
                      <Option value="design">设计任务</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col flex={1}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      placeholder="请输入任务标题"
                      value={task.Title}
                      onChange={(e) => {
                        const newTasks = [...tasks]
                        newTasks[index].Title = e.target.value
                        setTasks(newTasks)
                      }}
                      variant="borderless"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <ProjectUserSelect projectUid={projectUid} placeholder="执行人" variant="borderless" />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Select
                      placeholder="选择状态"
                      value={task.Status}
                      onChange={(value) => {
                        const newTasks = [...tasks]
                        newTasks[index].Status = value
                        setTasks(newTasks)
                      }}
                      style={{ width: 120 }}
                      variant="borderless"
                    >
                      <Option value="pending">待处理</Option>
                      <Option value="in_progress">进行中</Option>
                      <Option value="completed">已完成</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <InputNumber
                      placeholder="工时(天)"
                      min={0}
                      value={task.WorkDays}
                      onChange={(value) => {
                        const newTasks = [...tasks]
                        newTasks[index].WorkDays = value as number
                        setTasks(newTasks)
                      }}
                      variant="borderless"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeTask(index)} />
                </Col>
              </Row>
            ))}
          </Form.Item>
        </div>
        <div style={{ width: '360px', padding: '16px', borderLeft: '1px solid #e8e8e8' }}>
          <Form.Item label="优先级" name="Priority" layout="horizontal">
            <PrioritySelect variant="filled" />
          </Form.Item>
          <Form.Item label="需求分类" name="CategoryUid" layout="horizontal">
            <ProjectCategorySelect projectUid={projectUid} variant="filled" />
          </Form.Item>
          <Form.Item label="产品负责人" name="PmUid" layout="horizontal">
            <ProjectUserSelect projectUid={projectUid} variant="filled" />
          </Form.Item>
          <Form.Item label="开发负责人" name="DeveloperUid" layout="horizontal">
            <ProjectUserSelect projectUid={projectUid} variant="filled" />
          </Form.Item>
          <Form.Item label="测试负责人" name="TesterUid" layout="horizontal">
            <ProjectUserSelect projectUid={projectUid} variant="filled" />
          </Form.Item>
          <Form.Item label="归属项目" name="ProjectUid" layout="horizontal">
            <ProjectSelect variant="filled" />
          </Form.Item>
        </div>
      </Flex>
      <Flex style={{ height: '50px', padding: '0 10px', borderTop: '1px solid #d9d9d9' }} align="center">
        <Space>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
          <Button onClick={onClose}>取消</Button>
        </Space>
      </Flex>
    </Form>
  )
}
