"use client"
import UserSignup from "../_components/UserSignup"
import HeaderCustumer from "../_components/Custmerheader"
import { useState } from "react"
import UserLogin from "../_components/UserLogin"

export default function UserAuth(props){
    console.log(props)
    const [login,setLogin]=useState(false)
    return(
        <>
        <div>
            <HeaderCustumer/>
            <div>
                {
                    login?<UserSignup redirect={props.searchParams}/>:<UserLogin redirect={props.searchParams}/>
                }
            
            </div>
            <div>
                <button onClick={()=>setLogin(!login)}>{login?"already have an account":"not have an account"}</button>
            </div>
        </div>
        </>
    )
}