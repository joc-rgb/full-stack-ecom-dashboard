"use client"
import { useStoreModal } from '@/hooks/use-store-modal'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Popover, PopoverContent } from './ui/popover'
import { Button } from './ui/button'
import { ChevronsUpDownIcon, CircleCheckIcon, StoreIcon } from 'lucide-react';
import { cn } from '@/lib/utils'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps{
    //Each item in the array is an object with string keys and any value type
    items: Record<string, any>[];
}
const StoreSwitcher = ({className, items = []}:StoreSwitcherProps) => {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map(item=>({
    label: item.name,
    value: item.id
  }))

  const currentStore = formattedItems.find(item=>item.value===params.storeId)
 
  const [open, setOpen] = useState(false)

  const onStoreSelect = (store: {value: string, label: string}) => {
    setOpen(false);
    router.push(`${store.value}}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant={'outline'} aria-expanded={open}
          aria-label="Select a store" role="combobox" className={cn('justify-between w-[200px] py-2 font-normal shadow-md rounded-3xl', className)}>
          <StoreIcon size={22} strokeWidth={0.75} />
          {currentStore?.label}
          <ChevronsUpDownIcon className='ml-6 h-4 w-4 opacity-55'/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
      <Command >
      <CommandList>
        <CommandInput placeholder="Search store..." />
      
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Stores">
          {formattedItems.map(store=>
          <CommandItem key={store.value} aria-selected={currentStore?.value===store.value} disabled={currentStore?.value===store.value} onSelect={()=>onStoreSelect(store)}>
            <StoreIcon size={22} strokeWidth={0.75} />
            {store.label}
            {currentStore?.value===store.value&&<CircleCheckIcon size={16} className='ml-8' strokeWidth={0.85} />}
          </CommandItem>)}
        </CommandGroup>
        </CommandList>
        <CommandSeparator />        
        <CommandList>
        <CommandGroup >
          
          <CommandItem onSelect={()=>
          {
            setOpen(false); 
            storeModal.onOpen();
          }}>
            Create a Store
          </CommandItem>
        </CommandGroup>
        </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default StoreSwitcher
