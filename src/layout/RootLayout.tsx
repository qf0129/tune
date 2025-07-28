import { Outlet } from 'react-router'
import Header from './Header'
import styled from 'styled-components'

export default () => {
  const RootLayout = styled.div`
    width: 100%;
    height: 100%;
  `

  return (
    <RootLayout>
      <Header />
      <div style={{ height: 'calc(100% - 50px)', width: '100%' }}>
        <Outlet />
      </div>
    </RootLayout>
  )
}
