"use client"
import { useState } from "react";
import HeaderCustumer from "../_components/Custmerheader";
import Footer from "../_components/Footer";
import { DILIVERY_CHARGES, TAX } from "../lib/charges";
import { useRouter } from "next/navigation";
export default function Cart() {
    let [cartdata,setCartData]=useState(JSON.parse(localStorage.getItem('cart')))
    
    let [userdata,setUserdata]=useState(JSON.parse(localStorage.getItem('user')));
    const foodtotal=()=>{
      let totalamount=0
      cartdata.map((item)=>{
          console.log("item.price",typeof item.price)
          totalamount+=parseInt(item.price)
      })
      console.log(totalamount)
      return totalamount
  }
    const [total]=useState(cartdata.length==1?cartdata[0].price:foodtotal())
    const router=useRouter()
    function orderNow(){
      if(userdata){
        router.push("/order")
      }
     
    else{
        router.push("/user-auth?order=true")
    }
    }
  

    console.log(cartdata);
    console.log(total);
    
  return (
    <>
      <div>
        <HeaderCustumer/>
        <div className="food-items-wrapper">
          {cartdata.map((item) => (
            <div className="food-item">
              <div className="food-image" id="item-block1">
                <img src={item.image} width={150} height={120}></img>
              </div>
              <div className="food-details" id="item-block2">
                <h4>{item.foodname}</h4>
                
                <h4 className="description">{item.description}</h4>

                <button onClick={() => removeFromcart(item._id)}>
                  remove from cart
                </button>
               
                </div>
                <div id="item-block3">
                <h4>Price : {item.price}</h4>
              </div>
            </div>
          ))}
        </div>
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
            <button onClick={orderNow}>Order now</button>
          </div>
          </div>
        <Footer />
      </div>
    </>
  );
}
