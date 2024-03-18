import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

//update store name
export const PATCH = async (req: Request, {params}:{params:{storeId: string}}) => {
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

//delete store
export const DELETE = async (req: Request, {params}:{params:{storeId: string}}) => {
    try {
        const {userId} = auth();
        if(!userId){
        return new NextResponse("Unauthorized", {status: 401})
        }
        if(!params.storeId){
            return new NextResponse("Store ID is required", {status: 400})
        }
        const deletedStore = await prismadb.store.delete({
            where: {
                id: params.storeId
            }
        })
        return NextResponse.json(deletedStore)
    
    } catch (error) {
        console.log("[STOREID_DELETE]",error)
    
    }
    
}