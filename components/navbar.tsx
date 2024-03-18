import { UserButton, auth } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'
import StoreSwitcher from './store-switcher'
import prismadb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const Navbar:React.FC<React.PropsWithChildren> = async ({children}) => {
  const {userId} = auth()
  if(!userId){
    redirect('/sign-in')
  }
  const stores = await prismadb.store.findMany({
    where:
    {
      userId
    }
  })
  return (
    <div className='flex'>
      <div className="flex-col h-screen border-r p-2 space-y-10">
        <StoreSwitcher items={stores}/>
        <MainNav className='space-y-6 w-full'/>
      </div>
      <div className='w-full'>
      <div className="flex px-2 h-16 w-full items-center border-b justify-around  mb-2" >
        <div>
          SearchBar
        </div>
        
        <div className="ml-auto flex items-center space-x-5">
            <div>
          Theme Mode
        </div>
        <UserButton afterSignOutUrl='/'/>
        </div>
      </div>
      {children}
      </div>
    </div>
    
  )
}

export default Navbar
