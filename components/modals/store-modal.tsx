"use client"

import React from 'react'
import { Modal } from '../ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'

export const StoreModal = () => {

    const storeModal = useStoreModal()
  return (
    <Modal
        title='Create Store'
        description='Add a new store'
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    />
  )
}

