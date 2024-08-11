import { connectionStr } from "@/app/lib/db";
import { userSchema } from "@/app/lib/usersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export  async function POST(request){
    const payload=await request.json()
    let success=false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    if(payload.login){
        let result=await userSchema.findOne({email:payload.email,password:payload.password})
        if(result){
            success=true
        }
        return NextResponse.json({result,success})
    }
    else{
        const user=await userSchema(payload)
        let result=await user.save()
        if(result){
            success=true
        }
        return NextResponse.json({result,success})
    }                         
    
}