import { connectionStr } from "@/app/lib/db";
import { resorentSchema } from "@/app/lib/resorentsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result=await resorentSchema.find()
    result=result.map((item)=>item.city.charAt(0).toUpperCase()+item.city.slice(1))
    result=[...new Set(result.map((item)=>item))] 
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}