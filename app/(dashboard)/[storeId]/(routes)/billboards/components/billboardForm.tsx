'use client'
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import ImgUpload from '@/components/ui/img-upload';
import toast from 'react-hot-toast';

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name must be at least 1 characters."
    }),
    imgUrl: z.string().min(1, {
        message: "Image is required."
    })
    })

type BillboardFormValues = z.infer<typeof formSchema>

const BillboardForm = () => {

    const [isLoading, setLoading] = useState(false)

    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (values: BillboardFormValues) => {
        try {
            setLoading(true)
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setLoading(false)
        }
    }

  return (
    <div >
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField name='name' control={form.control} render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Title
                    </FormLabel>
                    <FormControl>
                        <Input type='text' {...field} placeholder='Your Billboard Title'/>
                    </FormControl>
                    <FormMessage />
                </FormItem>            
            
            )}/>

            <FormField name='imgUrl' control={form.control} render={({field})=>(
                <FormItem>
                    <FormLabel>
                        Background Image
                    </FormLabel>
                    <FormControl>
                        <ImgUpload value={field.value?field.value:''} disabled={isLoading} onChange={url=>field.onChange(url)} onRemove={()=>field.onChange('')} />
                    </FormControl>
                    <FormMessage />
                </FormItem>            
            
            )}/>
               <Button type='submit'>Create</Button>
        </form>
      </Form>
    </div>
  )
}

export default BillboardForm
