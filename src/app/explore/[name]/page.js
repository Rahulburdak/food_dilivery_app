"use client"
import HeaderCustumer from "@/app/_components/Custmerheader";
import Footer from "@/app/_components/Footer";
import { useEffect, useState } from "react";


export default function Restrodata(props){
    let restroName=props.params.name
    let id=props.searchParams.id;
    const [fooditemlist,setfooditemlist]=useState([])
    const [restorentname,setRestorentname]=useState([])
    const [cartdata,setCartdata]=useState()
    const [cartlocal,setCartlocal]=useState(JSON.parse(localStorage.getItem('cart')))
    const [cartids,setCartids]=useState(cartlocal?cartlocal.map((item)=>{
        return  item._id
        }):[])
    const[removecart,SetRemovecart]=useState()

    
    useEffect(()=>{
        foodlist()
    },[])
    async function foodlist(){
        let response=await fetch("http://localhost:3000/api/custmers/"+id)
        response=await response.json()
        console.log("response",response.fooditems);
        console.log("response",response.result);
        setfooditemlist(response.fooditems)
        setRestorentname(response.result)
        
    }
    function addtoCart(item){
        
        setCartdata(item)
        let cartlocalid=cartids;
        cartlocalid.push(item._id)
        setCartids(cartlocalid)
        SetRemovecart()
    }
    function removeFromcart(id){

        var localremovecart=cartids;
        localremovecart=localremovecart.filter(item=>item!=id)
        console.log("localremovecart",localremovecart);
        setCartids(localremovecart)
        SetRemovecart(id)
        setCartdata()
    }
    console.log("cartids",cartids)
    return(
        <>
        <div>
            <HeaderCustumer cartdetails={cartdata} removeCart={removecart}/>
            <div className="restorent-page-wrapper">
                <h1>{decodeURIComponent(restroName)}</h1>
            </div>
            <div>
                <div className="restorent-details">
                    
                    <h3>{restorentname.email}</h3>
                    <h3>{restorentname.phn}</h3>
                    <h3>{restorentname.city} </h3>
                    <h3>{restorentname.location} </h3>
                </div> 
            </div>
            <div className="food-items-wrapper">
                {fooditemlist.map((item)=>(
                    <div className="food-item">
                    <div className="food-image">
                        <img src={item.image} width={100} ></img>
                    </div>
                    <div className="food-details">
                        <h5>{item.foodname}</h5>
                        <h5>{item.price}</h5>
                        <h5 className="description">{item.description}</h5>

                        {
                            cartids.includes(item._id)?<button onClick={()=>removeFromcart(item._id)} >remove from cart</button>
                            :<button onClick={()=>addtoCart(item)}>add to cart</button>
                        }
                        
                    </div>
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
        </>
    )
}