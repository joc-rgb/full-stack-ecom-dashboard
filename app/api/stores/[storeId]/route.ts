import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export const PUT = async (req: Request, {params}:{params:{storeId: string}}) => {
  try {
    const {userId} = auth();
    const {name} = await req.json();
    if(!userId){
      return new NextResponse("Unauthorized", {status: 401})
    }
    if (!name){
      return new NextResponse("Name is required", {status: 400})
    }

    if(!params.storeId){
        return new NextResponse("Store ID is required", {status: 400})
    }
    const updatedStore = await prismadb.store.update({
        where: {
            id: params.storeId
        },
        data: name
        })
    return NextResponse.json(updatedStore)
    
  } catch (error) {
    console.log("[STOREID_PUT]",error)

  }

}
