import { Outlet } from 'react-router'
import styled from 'styled-components'
import ProjectList from './components/ProjectList'
import { Flex } from 'antd'

const ProjectContent = styled.div`
  flex: 1;
  overflow: hidden;
  flex-direction: column;
`

export default () => {
  return (
    <Flex>
      <ProjectList />
      <ProjectContent>
        <Outlet />
      </ProjectContent>
    </Flex>
  )
}
