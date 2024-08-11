"use client"
import { useState } from "react"
import ResorentLogin from "../_components/restorentlogin"
import RestrorentSignip from "../_components/restrorentsignup"
import RestorentHeader from "../_components/RestorentHeader"
import Footer from "../_components/Footer"

export default function Resotorent(){
    const [login,setLogin]=useState(true)
    return(
        <>
           <div >
            <RestorentHeader/>
            {
                login?<ResorentLogin></ResorentLogin>:<RestrorentSignip></RestrorentSignip>
            }
           </div>
           <div className="btn-no-border-div">
           <button className="btn-no-border" onClick={()=>setLogin(!login)}>{login?"Not Have account : sign up":"Have Account : Login"}</button>
           </div>
           <Footer/>
        </>
    )
}