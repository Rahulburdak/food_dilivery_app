import { connectionStr } from "@/app/lib/db";
import { diliverypartnerSchema } from "@/app/lib/diliverpartners";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){
    let payload = request.json()
    let success=false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    
    if(payload.login){
        let result=await diliverypartnerSchema.findOne({phn:payload.phn,password:payload.password})
        if(result){
            success=true
        }
        return NextResponse.json({result,success})
    }
    else{
        let dilivery=await diliverypartnerSchema(payload)
        let result=await dilivery.save()
        if(result){
            success=true
        }
        return NextResponse.json({result,success})
    }
   
} 