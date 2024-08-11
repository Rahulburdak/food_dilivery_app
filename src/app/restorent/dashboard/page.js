"use client"
import RestorentHeader from "@/app/_components/RestorentHeader";
import { useEffect, useState } from "react";

import Addfood from "@/app/_components/addfood";
import FoodList from "@/app/_components/footlist";

export default function Dashboard(){
    const [addfood,setAddfood]=useState(false)

    
    return(
        <>
        <RestorentHeader/>
        <button className="btn-wrapper" onClick={()=>setAddfood(true)}>Add food item</button>
        <button className="btn-wrapper" onClick={()=>setAddfood(false)}>Dashboard</button>
        <br/>
        {
            addfood?<Addfood/>:<FoodList/>
        }
        
        
        </>
    )
}