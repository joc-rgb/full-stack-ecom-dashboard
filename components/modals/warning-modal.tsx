import React from 'react'
import { Modal } from '../ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import { Button } from '../ui/button';

interface WarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

const WarningModal: React.FC<WarningModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading
}) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if(!isMounted) return null

  return (
    <Modal title='Are you sure?' isOpen={isOpen} description='This action cannot be undone.' onClose={onClose}  >

        <div className="flex justify-end space-x-4">
            <Button variant={'outline'} disabled={isLoading} onClick={onClose}>Cancel</Button>
            <Button variant={'destructive'} disabled={isLoading} onClick={onConfirm} >Yes, Continue</Button>
        </div>
    </Modal>
  )
}

export default WarningModal
