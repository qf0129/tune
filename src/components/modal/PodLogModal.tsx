import { Modal } from 'antd'
import NiceModal, { useModal } from '@ebay/nice-modal-react'
import api from '@/api/api'
import { useEffect, useState } from 'react'

type PodLogModalProps = {
  podUid: string
}

export default NiceModal.create(({ podUid }: PodLogModalProps) => {
  const modal = useModal()
  const [logs, setLogs] = useState('')

  useEffect(() => {
    api.QueryPodLog({ PodUid: podUid }).then((resp) => {
      if (resp.Code === 0) {
        setLogs(resp.Data)
      }
    })
  }, [podUid])

  return (
    <Modal title="查看日志" open={modal.visible} onCancel={() => modal.hide()} afterClose={() => modal.remove()} width={'70%'}>
      <code>{logs}</code>
    </Modal>
  )
})
