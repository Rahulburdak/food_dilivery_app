import { connectionStr } from "@/app/lib/db";
import { resorentSchema } from "@/app/lib/resorentsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    let queryParams=request.nextUrl.searchParams
    console.log("queryParams",queryParams.get("location"));
    let filter;
    if(queryParams.get("location")){
        let city=queryParams.get("location")
        filter={city:{$regex:new RegExp(city,'i')}}
    }else if(queryParams.get("restorent")){
        let name=queryParams.get("restorent")
        filter={name:{$regex:new RegExp(name,'i')}}
    }
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true})
    let result=await resorentSchema.find(filter)
    return NextResponse.json({result,success:true})
}