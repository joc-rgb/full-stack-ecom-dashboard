'use client'

import { Store } from '@prisma/client'
import React, { useState } from 'react'
import Heading from '../../../../../../components/ui/heading'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../../components/ui/form'
import { Input } from '../../../../../../components/ui/input'
import { Button } from '../../../../../../components/ui/button'
import { Trash2Icon } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import WarningModal from '@/components/modals/warning-modal'

interface SettingsProps {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 characters."
  })
})

type SettingsFormValues = z.infer<typeof formSchema>

const SettingsForm: React.FC<SettingsProps> = ({initialData}) => {
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()
  const onSubmit = async (values: SettingsFormValues) =>{
    try {
      setLoading(true)
      // send request to update store
      const res = await axios.patch(`/api/stores/${initialData.id}`, values)
      //redirect to store page
      window.location.assign(`${res.data.id}`)
      router.refresh()
      toast.success("Store updated successfully.")
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error)
    }finally{
      setLoading(false)
    
    }
  }

  const onDelete = async () =>{
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${initialData.id}`) 
      router.refresh();
      router.push('/');
      toast.success("Store deleted successfully.")
    } catch (error) {
      toast.error("Something went wrong.");
    } finally{
      setLoading(false)
      setOpen(false)
    }
  }

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:initialData
  })
  return (
    <>
    <WarningModal isLoading={isLoading} isOpen={isOpen} onClose={()=>setOpen(false)} onConfirm={onDelete} />
    <div className='w-full'>
      <div className="flex justify-between w-full">
      <Heading title='Store Settings' description='Edit your store settings'/>
      <Button
          disabled={isLoading}
          variant="destructive"
          size="sm"
          onClick={()=>setOpen(true)}
        >
          Delete Store
          <Trash2Icon className="h-4 w-4 ml-2" />
        </Button>
        </div>
      <div className='py-8'>
         <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
            control={form.control}
            name = 'name'
            render={({field})=>(
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input placeholder='Store Name' {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
           )}
            />
            <Button disabled={isLoading} className='mt-4' type='submit'>Save Changes</Button>
          </form>
          
         </Form>
      </div>
    </div>
    </>
  )
}

export default SettingsForm
