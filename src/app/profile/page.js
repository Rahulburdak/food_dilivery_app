"use client";
import { useEffect, useState } from "react";
import HeaderCustumer from "../_components/Custmerheader";
import Footer from "../_components/Footer";

export default function Profile() {
  const [myOrder, setMyorder] = useState([]);
  useEffect(() => {
    GetmyOrderData();
  }, []);
  async function GetmyOrderData() {
    let userID=JSON.parse(localStorage.getItem('user'))._id
    console.log("userID",userID)
    let response = await fetch(
      "http://localhost:3000/api/orders?id="+userID
    );
    response = await response.json();
    setMyorder(response.result);
    console.log(response.result);
  }
  return (
    <>
      <div>
        <HeaderCustumer />
       
          <div className="order-item-wrapper">
           
            
              {myOrder?.map((item) => (
                <>
                 <div className="card">
                 <div className="card-1">
                    <span>Restorent :{item.data.name} </span>
                    </div>
                    <div className="card-2">
                    <span>status : {item.status} </span>
                    <span>      price :{item.amount} </span>
                    </div>
                  </div>
                </>
              ))}
            
          </div>
        </div>
      

      <Footer />
    </>
  );
}
