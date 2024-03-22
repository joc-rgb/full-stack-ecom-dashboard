"use client";

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { PlusIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import BillboardForm from '../components/billboardForm';

const BillboardPage = () => {
  const router = useRouter()
  const params = useParams()
  return (
    <div className='w-full flex-col space-y-8 p-8'>
        <Heading title='Create New Billboard' description={'Add a new billboard to your store.'} />
        

      <BillboardForm />
    </div>
  )
}

export default BillboardPage
