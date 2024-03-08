"use client"
import * as z from 'zod'
import React from 'react'
import { Modal } from '../ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
  name: z.string().min(1)
})
export const StoreModal = () => {

  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  return (
    <Modal
        title='Create Store'
        description='Add a new store'
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    />
  )
}

