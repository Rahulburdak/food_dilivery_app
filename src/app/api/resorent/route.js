import { resorentSchema } from "@/app/lib/resorentsModel"
import mongoose from "mongoose"
import { connectionStr } from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function GET(){
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    const data=await resorentSchema.find()
    console.log(data);
    return NextResponse.json({result:data})
}
export async function POST(request){
    const payload=await request.json()
    let result;
    let succes=false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    if(payload.login){
        result=await resorentSchema.findOne({email:payload.email,password:payload.password})
        if(result){
            succes=true
        }
    }
    else{
        const restaurent=await resorentSchema(payload)
        result=await restaurent.save()
        if(result){
            succes=true
        }
    }
    return NextResponse.json({result,succes})
}
