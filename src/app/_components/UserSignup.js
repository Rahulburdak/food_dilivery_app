import { useState } from "react"
import { useRouter } from "next/navigation"
export default function UserSignup(props){
    // console.log("params",params);
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [c_password,setC_password]=useState("")
    const [city,setCity]=useState("")
    const [address,setAddress]=useState("")
    const [phn,setPhn]=useState("")
    const router=useRouter()

    async function  getDAta(){
    console.log(name,email,password,city,address,phn)
    let response=await fetch("http://localhost:3000/api/users",{
        method:'POST',
        body:JSON.stringify({name,email,password,city,address,phn})
    })
    response=await response.json()
    if(response.success){
        let result=response.result
        delete result.password
        localStorage.setItem('user',JSON.stringify(result))
        if(props?.redirect?.order){
            router.push("/order")
        }else{
            router.push("/")
        }
        
    }
    else{
        alert("error")
    }
}

    return(
        <>
      <div  className="login-wrapper">
      <h1>Sign up</h1>
      <div>
          <input className="input-wrapper" type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}></input>
        </div>
        <div>
          <input className="input-wrapper" type="text" placeholder="Enter user id" onChange={(e)=>setEmail(e.target.value)}></input>
        </div>
        <div>
          <input className="input-wrapper" type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}></input>
        </div>
        <div>
          <input className="input-wrapper" type="password" placeholder="confirm password" onChange={(e)=>setC_password(e.target.value)}></input>
        </div>
        {
          password!==c_password?<span className="error-handle">confirm password</span>:null
        }
        
        <div>
          <input className="input-wrapper" type="text" placeholder="Enter city" onChange={(e)=>setCity(e.target.value)}></input>
        </div>
        <div>
          <input className="input-wrapper" type="text" placeholder="Enter Address" onChange={(e)=>setAddress(e.target.value)}></input>
        </div>
        <div>
          <input className="input-wrapper" type="text" placeholder="Enter phone no." onChange={(e)=>setPhn(e.target.value)}></input>
        </div>
        <div>
          <button className="btn-wrapper" onClick={getDAta}>Sign up</button>
        </div>
      </div>
    </>
    )
}