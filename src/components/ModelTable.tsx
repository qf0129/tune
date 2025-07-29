import { Button, Flex, Form, Input, Modal, Popconfirm, Space, Table } from 'antd'
import { useEffect, useState, type ReactNode } from 'react'
import type { PageObject, Response } from '../api/request'
import type { ColumnsType } from 'antd/es/table'
import type { ReqPage } from '../api/api'
import { useForm } from 'antd/es/form/Form'
import { SearchOutlined } from '@ant-design/icons'
import useApp from 'antd/es/app/useApp'
import type { FormInstance, Rule } from 'antd/es/form'
import Link from 'antd/es/typography/Link'

type ModelField<T> = {
  title: string
  key: string
  render?: (form: FormInstance<T>) => ReactNode
  rules?: Rule[]
}

type OperateBtn<T> = {
  title?: string
  render?: ReactNode
  onClick?: (record: T) => void
}

type ModelTableProps<T> = {
  modelName: string
  tableColumns: ColumnsType<T>
  queryFields?: ModelField<T>[]
  createFields?: ModelField<T>[]
  operateBtns?: OperateBtn<T>[]
  QueryFunc: (data: ReqPage<T>) => Promise<Response<PageObject<T>>>
  CreateFunc?: (data: T) => Promise<Response<T>>
  UpdateFunc?: (data: T) => Promise<Response<T>>
  DeleteFunc?: (data: T) => Promise<Response<T>>
}

export default function ModelTable<T>(props: ModelTableProps<T>) {
  const app = useApp()
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [queryForm] = useForm<T>()
  const [createForm] = useForm<T>()
  const [showCreateModal, setShowCreateModal] = useState(false)

  const [columns, setColumns] = useState<ColumnsType<T>>([])

  useEffect(() => {
    setColumns([
      ...props.tableColumns,
      {
        title: '操作',
        key: 'operate',
        render: (record) => (
          <Space>
            {props.operateBtns?.map((btn) => (btn.render ? btn.render : <Link onClick={() => btn.onClick && btn.onClick(record)}>{btn.title || '按钮'}</Link>))}
            {props.DeleteFunc !== undefined && (
              <Popconfirm title="确定删除此记录吗？" onConfirm={() => deleteRequest(record)} okText="确定" cancelText="取消">
                <Link>删除</Link>
              </Popconfirm>
            )}
          </Space>
        ),
      },
    ])
    queryData(page, pageSize)
    return () => {
      setColumns([])
      setData([])
    }
  }, [])

  const queryData = async (page?: number, pageSize?: number) => {
    try {
      setLoading(true)
      const res = await props.QueryFunc({ Page: page, PageSize: pageSize, Model: queryForm.getFieldsValue() })
      if (res.Code === 0) {
        setData(res.Data.List)
        setTotal(res.Data.Total)
        setPage(res.Data.Page)
        setPageSize(res.Data.PageSize)
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const submitCreate = async () => {
    if (!props.CreateFunc) return
    try {
      await createForm.validateFields()
      const res = await props.CreateFunc(createForm.getFieldsValue())
      if (res.Code === 0) {
        app.message.success('新增成功')
        closeCreate()
        queryData()
      }
    } catch (error) {}
  }

  const closeCreate = () => {
    createForm.resetFields()
    setShowCreateModal(false)
  }

  const deleteRequest = async (record: T) => {
    if (!props.DeleteFunc) return
    try {
      const res = await props.DeleteFunc(record)
      if (res.Code === 0) {
        app.message.success('删除成功')
        queryData()
      }
    } catch (error) {}
  }

  return (
    <Flex style={{ flexDirection: 'column' }}>
      <Flex justify="space-between">
        {props.queryFields && props.queryFields.length > 0 ? (
          <Form form={queryForm} onFinish={() => queryData()} layout="inline" style={{ gap: 5 }}>
            {props.queryFields.map((item) => (
              <Form.Item key={item.key} name={item.key}>
                {item.render ? item.render(queryForm) : <Input addonBefore={item.title} allowClear onClear={() => queryData()} />}
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="default" htmlType="submit">
                <SearchOutlined />
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div />
        )}
        {props.createFields && props.createFields.length > 0 && (
          <Button type="primary" onClick={() => setShowCreateModal(true)}>
            新增{props.modelName}
          </Button>
        )}
      </Flex>
      <Table
        style={{ width: '100%', marginTop: '20px' }}
        bordered
        pagination={{
          total: total,
          pageSize,
          current: page,
          onChange: (page, pageSize) => {
            queryData(page, pageSize)
          },
          showTotal: (total) => `共 ${total} 条`,
        }}
        dataSource={data}
        columns={columns}
        loading={loading}
      />
      <Modal
        title={'新增' + props.modelName}
        open={showCreateModal}
        okText="提交"
        okButtonProps={{ disabled: props.CreateFunc === undefined }}
        cancelText="取消"
        onOk={submitCreate}
        onCancel={closeCreate}
        width={800}
      >
        {props.createFields && props.createFields.length > 0 && (
          <Form form={createForm} labelCol={{ span: 4 }} style={{ margin: '20px 0' }} size="large">
            {props.createFields.map((item) => (
              <Form.Item key={item.key} name={item.key} label={item.title} rules={item.rules}>
                {item.render ? item.render(createForm) : <Input allowClear />}
              </Form.Item>
            ))}
          </Form>
        )}
      </Modal>
    </Flex>
  )
}
