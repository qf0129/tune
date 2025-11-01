import PageView from '@/components/PageView'
import RequirementForm from './components/RequirementForm'
import { useParams } from 'react-router'
import { useEffect } from 'react'

export default () => {
  const { projectUid, requirementUid } = useParams()
  useEffect(() => {
    if (requirementUid) {
    }
  }, [requirementUid])
  return (
    <PageView breadcrumbs={[{ title: 'xx' }]}>
      <RequirementForm projectUid={projectUid} requirementUid={requirementUid} />
    </PageView>
  )
}
