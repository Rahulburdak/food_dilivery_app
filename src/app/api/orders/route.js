import { connectionStr } from "@/app/lib/db"
import { orderSchema } from "@/app/lib/ordersModel"
import { resorentSchema } from "@/app/lib/resorentsModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(request){
    let payload=await request.json()
    let success=false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let orderObj=await orderSchema(payload)
    let result=await orderObj.save()
    if(result){
        success=true;
    }
    return NextResponse.json({result,success})
}
export async function GET(request){ 
    let success=false
    let user_id=request.nextUrl.searchParams.get("id")
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let result=await orderSchema.find({user_Id:user_id})
    if(result){
        let restroData=await Promise.all(
            result.map(async (item)=>{
                let restroInfo={};
                restroInfo.data=await resorentSchema.findOne({_id:item.restro_Id})
                restroInfo.status=item.status
                restroInfo.amount=item.amount
                return restroInfo
            }
        )
            
        ) 
        result=restroData;
        success=true;
        
    }
    
    return NextResponse.json({result,success})
}