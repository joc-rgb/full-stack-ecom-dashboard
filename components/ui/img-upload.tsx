"use client"

import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from './button';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ImgUploadProps {
    disabled: boolean;
    onChange: (url: string) => void;
    onRemove: () => void;
    value: string;
}

const ImgUpload:React.FC<ImgUploadProps> = ({disabled,onChange,onRemove,value}) => { 
    const onUpload = (res: any)=>{
        onChange(res.info.secure_url)
    }
  return (
    <div>
        <div className="mb-4">
            {value!=''&& (
                <div className="relative w-40 h-40 overflow-hidden rounded-md">
                   <Image src={value} layout='fill' objectFit='cover' alt='billboard background image' unoptimized/>
                    <Button onClick={()=>onRemove()} className='absolute top-0 right-0' variant='destructive' >
                    <X />
                    </Button>
                    
                </div>
            )}
            <CldUploadWidget uploadPreset="ughmivrr" onSuccess={onUpload}> 
                {({ open }) => {
                    return (
                    <Button onClick={() => open()} type='button' disabled={disabled} variant={'secondary'} >
                        Upload an Image
                    </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    </div>
  )
}

export default ImgUpload
