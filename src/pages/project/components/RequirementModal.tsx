import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import RequirementForm from './RequirementForm'

type RequirementModalProps = {
  projectUid?: string
  requirementUid?: string
  onSubmit?: () => void
}

export default NiceModal.create(({ projectUid, requirementUid, onSubmit }: RequirementModalProps) => {
  const modal = useModal()

  return (
    <Modal
      title={null}
      closable={false}
      open={modal.visible}
      onCancel={() => modal.hide()}
      afterClose={() => modal.remove()}
      footer={null}
      width="90%"
      style={{ top: '5vh' }}
      styles={{ content: { padding: 0, height: '90vh' }, body: { height: '100%' } }}
    >
      <RequirementForm
        projectUid={projectUid}
        requirementUid={requirementUid}
        onSubmit={() => {
          modal.hide()
          onSubmit?.()
        }}
        onClose={modal.hide}
      />
    </Modal>
  )
})
