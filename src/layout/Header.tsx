import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, type MenuProps } from 'antd'
import { useMatch, useNavigate } from 'react-router'
import styled from 'styled-components'
import api from '../api/api'
import useApp from 'antd/es/app/useApp'

const Header = styled.div`
  background-color: #f1f1f1;
  color: #333;
  height: 50px;
  display: flex;
  align-items: center;
`
const Logo = styled.div`
  padding: 0 20px;
  font-size: 18px;
  font-weight: bold;
`
const MenuGroup = styled.div`
  flex: 1;
  display: flex;
  height: 100%;
  padding-left: 100px;
`
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.3s;
  cursor: pointer;
  border-bottom: 4px solid transparent;
  user-select: none;
  &:hover {
    background-color: #eaeaea;
  }
  &.active {
    /* background-color: #ddd; */
    color: var(--main-color);
    border-bottom: 3px solid var(--main-color);
  }
`

const UserBtn = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
`

export default () => {
  const app = useApp()
  const nav = useNavigate()
  const menus = [
    { path: '/app', title: '应用发布' },
    { path: '/console', title: '数据管理' },
  ]

  const rightMenus: MenuProps['items'] = [
    {
      key: 'signout',
      label: 'Sign Out',
      icon: <LogoutOutlined />,
    },
  ]

  const onClickRightMenus: MenuProps['onClick'] = ({ key }) => {
    if (key === 'signout') {
      api.SignOut().then((res) => {
        if (res.Code === 0) {
          app.message.success('登出成功')
          nav('/signin')
        } else {
          app.message.warning(res.Msg)
        }
      })
    }
  }

  return (
    <Header>
      <Logo>TUNE</Logo>
      <MenuGroup>
        {menus.map((item) => (
          <MenuItem key={item.path} onClick={() => nav(item.path)} className={useMatch(item.path) ? 'active' : ''}>
            {item.title}
          </MenuItem>
        ))}
      </MenuGroup>
      <Dropdown menu={{ items: rightMenus, onClick: onClickRightMenus }}>
        <UserBtn>
          <UserOutlined />
        </UserBtn>
      </Dropdown>
    </Header>
  )
}
