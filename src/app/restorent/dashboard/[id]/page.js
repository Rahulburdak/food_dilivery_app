"use client"
import RestorentHeader from "@/app/_components/RestorentHeader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Addfood=({params})=>{
    let id=params.id
    console.log(id)
    const [foodname,setfoodName]=useState()
    const [price,setPrice]=useState()
    const [image,setImage]=useState()
    const [description,setDes]=useState()
    const [data,setData]=useState([])
    const router=useRouter();

    async function handleClick(){
        if(!foodname || ! price || !image || !description){
            alert("Enter Valid details")
            return false
        }     
        // console.log(foodname,price,image,description)
        let response=await fetch("http://localhost:3000/api/resorent/foods/edit/"+id,{
            method:"put",
            body:JSON.stringify({foodname,price,image,description})
        })
        response=await response.json()
        console.log(response)
        if(response.success){
            alert("Successfully edited")
            router.push("../dashboard")
        }
        else{
            alert("please enter the proper details")
        }

    }

    useEffect(()=>{getdata()
       
    },[])
    async function getdata(){
        let responce=await fetch("http://localhost:3000/api/resorent/foods/edit/"+id)
        responce=await responce.json()
        setData(responce.result)
        setfoodName(responce.result.foodname)
        setImage(responce.result.image)
        setPrice(responce.result.price)
        setDes(responce.result.description)   
    }



    return(
    <>
    <div className="container" style={{marginBottom:"20px"}}>
        <RestorentHeader/>
    <h1>
        Edit {data.foodname}
    </h1>
     <div>
        <div>
            <input className="input-wrapper" type="text" placeholder="food name" value={foodname}  onChange={(e)=>setfoodName(e.target.value)} ></input>
        </div>
        
        <div>
            <input className="input-wrapper" type="text" placeholder="Price" value={price} onChange={(e)=>setPrice(e.target.value)}></input>
        </div>
        <div>
            <input className="input-wrapper" type="text" placeholder="image" value={image}  onChange={(e)=>setImage(e.target.value)}></input>
        </div>
        <div>
            <input className="input-wrapper" type="text" placeholder="discription" value={description} onChange={(e)=>setDes(e.target.value)}></input>
        </div>
        <div>
            <button  className="btn-wrapper" onClick={handleClick}>EDIT</button>
        </div>
        <div>
            <button  className="btn-wrapper" onClick={()=>router.push("../dashboard")}>Go to food list</button>
        </div>
     </div>
    
    </div>
    </>
   )
}
export default Addfood;