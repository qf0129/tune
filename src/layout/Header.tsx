import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, type MenuProps } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import styled from 'styled-components'
import api from '../api/api'
import useApp from 'antd/es/app/useApp'

const Header = styled.div`
  /* position: sticky;
  top: 0; */
  z-index: 100;
  background-color: #fff;
  color: var(--main-color);
  height: 50px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
`
const Logo = styled.div`
  padding: 0 20px;
  font-size: 18px;
  font-weight: bold;
`
const MenuGroup = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
  height: 100%;
  padding-left: 100px;
`
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.2s;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  user-select: none;
  color: #333;
  &:hover {
    background-color: #eaeaea;
  }
  &.active {
    color: var(--main-color);
    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-thickness: 2px;
  }
`

const UserBtn = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 20px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
  }
`

export default () => {
  const app = useApp()
  const nav = useNavigate()
  const menus = [
    { path: '/app', title: '应用部署' },
    { path: '/console', title: '控制台' },
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
          <MenuItem key={item.path} onClick={() => nav(item.path)} className={useLocation().pathname.startsWith(item.path) ? 'active' : ''}>
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
