import { Outlet } from 'react-router'
import Header from './Header'
import styled from 'styled-components'

export default () => {
  const RootLayout = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
  `
  const Body = styled.div`
    width: 100%;
    height: calc(100% - 50px);
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
    scrollbar-gutter: stable;
  `

  return (
    <RootLayout>
      <Header />
      <Body>
        <Outlet />
      </Body>
    </RootLayout>
  )
}
