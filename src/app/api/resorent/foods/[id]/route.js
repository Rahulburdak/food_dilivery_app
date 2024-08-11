import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,content){
    let id=content.params.id
    console.log("id",id);
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result =await foodSchema.find({ restro_id:id})
    console.log("result",result)
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}
export async function DELETE(request,content){
    let id=content.params.id
    console.log("ID",id)
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result=await foodSchema.deleteOne({_id:id})
    if(result.deletedCount>0){
        success=true;
    }
    return NextResponse.json({result,success})
}