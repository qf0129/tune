import { NavLink, Outlet } from 'react-router'
import styled from 'styled-components'
import { consoleRoutes } from '../routes'

const ConsoleLayout = styled.div`
  display: flex;
`
const MenuList = styled.div`
  position: sticky;
  top: 0;
  flex-shrink: 0;
  width: 200px;
  height: 100%;
  padding: 10px;
`

const Content = styled.div`
  padding: 10px;
  flex: 1 0;
  overflow: hidden;
  flex-direction: column;
`

const MenuItem = styled(NavLink)`
  display: block;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 2px;
  color: var(--text-color);
  transition: all 0.2s;
  &:hover {
    background-color: #f3f3f3;
    color: var(--text-color);
  }
  &.active {
    color: var(--main-color);
    background-color: #eee;
  }
`

export default () => {
  return (
    <ConsoleLayout>
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
      <Content>
        <Outlet />
      </Content>
    </ConsoleLayout>
  )
}
