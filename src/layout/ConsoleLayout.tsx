import { NavLink, Outlet } from 'react-router'
import styled from 'styled-components'
import { Flex } from 'antd'
import { consoleRoutes } from '../routes'

const MenuList = styled.div`
  width: 240px;
  height: 100%;
  padding: 10px 10px;
`
const MenuItem = styled(NavLink)`
  display: block;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 2px;
  color: var(--main-text-color);
  transition: all 0.2s;
  &:hover {
    background-color: #f3f3f3;
    color: var(--main-text-color);
  }
  &.active {
    color: var(--main-color);
    background-color: #eee;
  }
`

export default () => {
  return (
    <Flex style={{ maxWidth: '1680px', margin: '0 auto' }}>
      <MenuList>
        {consoleRoutes.map(
          (route) =>
            route.handle && (
              <MenuItem to={route.path || ''} key={route.path}>
                {route.handle.title || route.path}
              </MenuItem>
            )
        )}
      </MenuList>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </Flex>
  )
}
