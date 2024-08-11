"use client"
import { useEffect, useState } from "react";
import HeaderCustumer from "../_components/Custmerheader";
import Footer from "../_components/Footer";
import { DILIVERY_CHARGES, TAX } from "../lib/charges";
import { useRouter } from "next/navigation";
export default function Cart() {
    let [cartdata,setCartData]=useState(JSON.parse(localStorage.getItem('cart')))
    const [userStorage,setUserstorage]=useState(JSON.parse(localStorage.getItem('user')))
    const foodtotal=()=>{
        let totalamount=0
        cartdata?.map((item)=>{
            console.log("item.price",typeof item.price)
            totalamount+=parseInt(item.price)
        })
        console.log(totalamount)
        return totalamount
    }
 
    const [total]=useState(cartdata?.length==1?cartdata[0].price:foodtotal());
    const [removeCartData,setRemoveCartData]=useState(false)
    const router=useRouter()
    useEffect(()=>{
      if(!total){
        router.push("/")
      }
  },[total])

      
    console.log(cartdata);
    console.log(total);
    async function placeOrder(){
        let user_Id=JSON.parse(localStorage.getItem('user'))._id;
        let cart=JSON.parse(localStorage.getItem('cart'))
        let restro_Id=cart[0].restro_id
        let food_items=cart?.map((item)=>item._id).toString()
        const diliverBoy_Id="669e6f850371b97c26d39ff9"
        const collection={
            user_Id,
            restro_Id,
            food_items,
            diliverBoy_Id,
            status:"confirm",
            amount:`${parseInt(total)+parseInt(TAX*total/100)+parseInt(DILIVERY_CHARGES)}`
        }
        let response=await fetch("http://localhost:3000/api/orders",{
            method:'post',
            body:JSON.stringify(collection)
        })
        response=await response.json()
        if(response.success){
            alert("order placed")
            setRemoveCartData(true)
            router.push("/profile")
        }
        else{
            error
        }
    }
    
  return (
    <>
      <div>
        <HeaderCustumer removeCartData={removeCartData}/>
        {
            userStorage? <><div>
                <h2>User details</h2>
                <div className="total-price-wrapper">
                <div className="block-1">
                <div className="row">
              <span>Name : </span>
              <span>{userStorage.name}</span>
            </div>
            <div className="row">
              <span>address : </span>
              <span>{userStorage.address}</span>
            </div>
            <div className="row">
              <span>Mobile no : </span>
              <span>{userStorage.phn}</span>
            </div>
            </div>
            </div>
            </div>
            <h2>Order details</h2>
            <div className="total-price-wrapper">
                
            <div className="block-1">
  
            
            <div className="row">
              <span>food price : </span>
              <span>{total}</span>
            </div>
            <div className="row">
              <span>Tax : </span>
              <span>{TAX*total/100}</span>
            </div>
            <div className="row">
              <span>Delivery charges : </span>
              <span>{DILIVERY_CHARGES}</span>
            </div>
            <div className="row">
              <span>Total : </span>
              <span>{parseInt(total)+parseInt(TAX*total/100)+parseInt(DILIVERY_CHARGES)}</span>
            </div>
          </div>
          
          <div className="block-2">
              <button onClick={placeOrder}>Place Order </button>
            </div>
            </div>
            </>:null
        }
       <div>
       <h2>Payment mode</h2>
       <div className="total-price-wrapper">
       
        <div className="block-1">
        <div className="row">
        
              <span>Cash on dilivery : </span>
              <span>{parseInt(total)+parseInt(TAX*total/100)+parseInt(DILIVERY_CHARGES)}</span>
            </div>
            </div>
            </div>
       </div>
        <Footer />
      </div>
    </>
  );
}
