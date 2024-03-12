"use client"

import { UserButton } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'

const Navbar = () => {
  return (
    <div className='flex'>
      <div className="flex-col h-screen border-r p-2 space-y-10">
        <div>
            This is a store switcher
        </div>
        <MainNav className='space-y-6 w-full'/>
      </div>
      <div className="flex px-2 h-16 w-full items-center border-b justify-around">
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
    </div>
    
  )
}

export default Navbar
