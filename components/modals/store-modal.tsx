"use client"

import * as z from 'zod'
import React, { useState } from 'react'
import { Modal } from '../ui/modal'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import axios from "axios";
import toast from 'react-hot-toast'

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters."
  })
})

export const StoreModal = () => {

  const storeModal = useStoreModal();
  const [isLoading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>)=>{
    try {
      setLoading(true);
      const res = await axios.post('/api/stores', values)
      //redirect to store page if the current page is the dashboard of other store
      window.location.assign(`/${res.data.id}`)
      toast.success("Store created successfully.")
      console.log(res.data)
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error)
    } finally {
      setLoading(false)
    }
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
                    <Input disabled={isLoading} placeholder='Your Store Name. eg: Janice&apos;s Cosmetic' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your store name. No worries, it can be changed anytime.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-4 justify-end items-center flex space-x-2 w-full">
              <Button disabled={isLoading} type='button' variant={'outline'} onClick={storeModal.onClose} >Cancel</Button>
              {!isLoading ? <Button disabled={isLoading} type='submit'>Continue</Button>
              :<Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>}
            </div>
            
          </form>
        </Form>
      </div>
    </Modal>
  )
}

