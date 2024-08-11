import { useRouter } from "next/navigation";
import { useState } from "react";

const Addfood=()=>{
    const [foodname,setfoodName]=useState()
    const [price,setPrice]=useState()
    const [image,setImage]=useState()
    const [description,setDes]=useState()
    const router=useRouter();

    async function handleClick(){
        if(!foodname || ! price || !image || !description){
            alert("Enter Valid details")
            return false
        }
        let restro_id;
        let userData=JSON.parse(localStorage.getItem("restorentuser"))
        console.log(userData);
        if(!userData){
            router.push("/resorent")
            
        }
        if(userData){
            restro_id =userData._id
        }
       
       
        console.log(restro_id)
        let response= await fetch("http://localhost:3000/api/resorent/foods",{
            method:"POST",
            body:JSON.stringify({foodname,price,image,description,restro_id})
        })
        response=await response.json()
        if(response.success){
            alert("Item added sucessfully")
        }
    }


   return(
    <>
    <div className="container">
    <h1>
        Add food Items
    </h1>
     <div>
        <div>
            <input className="input-wrapper" type="text" placeholder="food name" onChange={(e)=>setfoodName(e.target.value)} ></input>
        </div>
        
        <div>
            <input className="input-wrapper" type="text" placeholder="Price"  onChange={(e)=>setPrice(e.target.value)}></input>
        </div>
        <div>
            <input className="input-wrapper" type="text" placeholder="image"  onChange={(e)=>setImage(e.target.value)}></input>
        </div>
        <div>
            <input className="input-wrapper" type="text" placeholder="discription"  onChange={(e)=>setDes(e.target.value)}></input>
        </div>
        <div>
            <button  className="btn-wrapper" onClick={handleClick}>ADD</button>
        </div>
     </div>
    
    </div>
    </>
   )
}
export default Addfood;