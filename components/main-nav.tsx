"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import {  Blocks, HomeIcon, Images, PackageSearch, Settings} from 'lucide-react';
import React from 'react'

const MainNav = ({className, ...props}:React.HTMLAttributes<HTMLElement>) => {
    
    //Get the current parameters
    const params = useParams()
    //Get the current path name
    const pathName = usePathname()
    const routes = [
        {
            label: 'Overview',
            href: `/${params.storeId}/overview`,
            active: pathName === `/${params.storeId}`,
            icon: <HomeIcon />
        },
        {
            label: 'Billboards',
            href: `/${params.storeId}/billboards`,
            active: pathName === `/${params.storeId}/billboards`,
            icon: <Images />
        },
        {
            label: 'Products',
            href: `/${params.storeId}/products`,
            active: pathName === `/${params.storeId}/products`,
            icon: <PackageSearch />
        },
        {
            label: 'Categories',
            href: `/${params.storeId}/categories`,
            active: pathName === `/${params.storeId}/categories`,
            icon: <Blocks />
        },
        {
            label: 'Settings',
            href: `/${params.storeId}/settings`,
            active: pathName === `/${params.storeId}/settings`,
            icon: <Settings />
        },

    ]
    return (
    <nav className={cn("flex-col justify-center items-center space-4 w-full pl-2", className)}>
        {routes.map(route=>
            <Link href={route.href} key={route.href} className={cn("flex text-sm ", route.active?"text-black dark:text-white":"text-muted-foreground")} >
                
                <p className='flex text-center items-center '>{route.icon}&nbsp;{route.label}</p>
            </Link>
        )}
    </nav>
  )
}

export default MainNav
