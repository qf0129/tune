import { Button, Form, Input } from 'antd'
import { type FormProps } from 'antd/es/form/Form'
import type { ReqAuth } from '../../api/api'
import api from '../../api/api'
import { useNavigate } from 'react-router'
import useApp from 'antd/es/app/useApp'
import styled from 'styled-components'

const SignInRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const SignInCard = styled.div`
  width: 600px;
  padding: 30px;
  padding-top: 60px;
  border-radius: 2px;
  background-color: #fff;
  text-align: right;
`

export default () => {
  const app = useApp()
  const nav = useNavigate()
  const onFinish: FormProps<ReqAuth>['onFinish'] = (values) => {
    api.SignIn(values).then((res) => {
      if (res.Code === 0) {
        app.message.success('登录成功')
        nav('/')
      } else {
        app.message.warning(res.Msg)
      }
    })
  }

  return (
    <SignInRoot>
      <SignInCard>
        <Form onFinish={onFinish} size="large" labelCol={{ span: 4 }}>
          <Form.Item<ReqAuth> label="Username" name="Username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item<ReqAuth> label="Password" name="Password" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              SignIn
            </Button>
          </Form.Item>
        </Form>
      </SignInCard>
    </SignInRoot>
  )
}
