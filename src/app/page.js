"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import HeaderCustumer from "./_components/Custmerheader";
import { useEffect, useState } from "react";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [initialdata,setInitialdata]=useState([])
  const [selectlocation,setSelectLocation]=useState('')
  const [showlocation,setShowlocation]=useState(false)
  const router =useRouter()
  useEffect(() =>{ getLocation();loaddata()}, []);
  async function getLocation() {
    let response = await fetch("http://localhost:3000/api/custmers/locations");
    response = await response.json();
    setLocations(response.result);
  }
  function handleLocation(item){
      setShowlocation(false)
      setSelectLocation(item);
      loaddata({location:item})
     
  }
  async function loaddata(params){
    let url="http://localhost:3000/api/custmers"
    if(params?.location){
      url=url+"?location="+params.location
    }
    else if(params?.restorent){
      url=url+"?restorent="+params.restorent
    }

    let data =await fetch(url)
    data=await data.json()
    setInitialdata(data.result)
    console.log("initialdata",initialdata)
    console.log("data",data);
    
  } 
  return (
    <>
      <HeaderCustumer />
      <div className="main-page-wrapper">
        <h1>Restro App</h1>
        <div className="input-main-wrapper">
          <input
            className="location-input"
            type="text"
            value={selectlocation}
            placeholder="
            🚩location"
            onClick={()=>setShowlocation(true)}
          >
            
          </input>
          {
          showlocation ? <ul className="locations-select">
              {
                locations.map((item)=>(
                  <li onClick={()=>handleLocation(item)} className="list">
                    {item}
                  </li>
                ))
              }
            </ul>:null}
          <input
            className="search-wrapper"
            type="text"
            placeholder="Enter food or restaurent"
            onChange={(e)=> loaddata({restorent:e.target.value})}
          ></input>
        </div>
      </div>

      <div className="initial-wrapper">
       
              {
                initialdata.map((item)=>(
                  <div className="card-wrapper" onClick={()=>router.push("/explore/"+item.name+"/?id="+item._id)}>
                  <div className="heading-wrapper">
                    <h3>{item.name}</h3>
                    <h6>{item.phn}</h6>
                  </div>
                  <div className="address-wrapper">
                    <div>{item.location}, {item.city}</div>
                    <div> {item.email} </div>
                    </div>
                    </div>
                ))
              }
        
      
      </div>

        <Footer/>

    </>
  );
}
