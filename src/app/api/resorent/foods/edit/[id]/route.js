import { connectionStr } from "@/app/lib/db"
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose"
import { NextResponse } from "next/server";


export async function GET(request,content){
    let edit_id=content.params.id;
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result=await foodSchema.findOne({_id:edit_id})
    if(result){
        success=true;
    }
    return NextResponse.json({result,success})
}

export async function PUT(request,content){
    let id = content.params.id
    const payload=await request.json()
    let success=true;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result=await foodSchema.findByIdAndUpdate({_id:id},payload)
    if(result){
        success=true
    }
    return NextResponse.json({result,success});
}