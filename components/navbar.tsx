"use client"

import { UserButton } from '@clerk/nextjs'
import React from 'react'
import MainNav from './main-nav'

const Navbar = () => {
  return (
    <div className='border-b'>
      <div className="flex px-2 h-16 items-center">
        <div>
            This is a store switcher
        </div>
        <MainNav />
        <div className="ml-auto items-center space-x-4">
            <UserButton afterSignOutUrl='/'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
