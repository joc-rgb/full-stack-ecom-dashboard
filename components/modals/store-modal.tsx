"use client"

import * as z from 'zod'
import React from 'react'
import { Modal } from '../ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters."
  })
})

export const StoreModal = () => {

  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>)=>{
    console.log(values)
  }
  
  return (
    <Modal
        title='Create Store'
        description='Add a new store'
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
    >
      <div >
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8' >
            <FormField 
              control={form.control}
              name='name'
              render={({field})=>(
                <FormItem>
                  <FormLabel>Store Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Your Store Name. eg: Janice&apos;s Cosmetic' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your store name. No worries, it can be changed anytime.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4 justify-end items-center flex space-x-2 w-full">
              <Button type='button' variant={'outline'} onClick={storeModal.onClose} >Cancel</Button>
              <Button type='submit'>Continue</Button>
            </div>
            
          </form>
        </Form>
      </div>
    </Modal>
  )
}

