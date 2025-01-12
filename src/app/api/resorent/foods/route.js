import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request){
    const payload=await request.json();
    let result;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    const food = new foodSchema(payload)  
    result=await food.save()
    if(result){
        return NextResponse.json({result,success:true})
    }
    else{
        return NextResponse.json({result,success:false})
    }
 
}