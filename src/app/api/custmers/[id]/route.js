import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { resorentSchema } from "@/app/lib/resorentsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    let id=content.params.id
    let success=false
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result = await resorentSchema.findOne({_id:id})
    if (result){
        success=true
    }  
    let fooditems=await foodSchema.find({restro_id:id})
    return NextResponse.json({result,fooditems,success:true})
} 