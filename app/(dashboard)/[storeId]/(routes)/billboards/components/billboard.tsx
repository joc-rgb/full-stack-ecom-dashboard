"use client";

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { PlusIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import BillboardForm from './billboardForm';

const Billboard = () => {
  const router = useRouter()
  const params = useParams()
  return (
    <div className='w-full flex-col p-10'>
      <div className="flex w-full justify-between ">
        <Heading title='Billboards (0)' description={'Manage all your billboards in the store.'} />
        <Button onClick={()=>router.push(`/${params.storeId}/billboards/new`)} >Add New <PlusIcon size={'16'} className='ml-2'/></Button>
        
      </div>
    </div>
  )
}

export default Billboard
