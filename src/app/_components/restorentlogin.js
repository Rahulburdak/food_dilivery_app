import { useRouter } from "next/navigation"
// import { NextResponse } from "next/server"
import { useState } from "react"

export default function ResorentLogin(){
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [erremail,setErremail]=useState()
    const [errpass,setErrpass]=useState()
    const [error,setError]=useState();

    // const router=useRouter();
    const router =useRouter()

    const Login=async ()=>{
        console.log(email,password)
        if(!email && !password){
            setError(true)

            return false
        }
        else if(!email && password){
            setErremail(true)
            return false
        }
        else if(!password && email){
            setErrpass(true)
            return false
        }
        else{
            setError(false)
            setErremail(false)
            setErrpass(false)
        }
        let response=await fetch("http://localhost:3000/api/resorent",{
            method:'POST',
            body:JSON.stringify({email,password,login:true})
        })
        response=await response.json();
       if(response.succes){
        // alert("logged in")
        let {result}=response
        delete result.password
        localStorage.setItem("restorentuser",JSON.stringify(result))
        router.push("/restorent/dashboard")
       
    }else{
        alert("invalid details")
    }
        
    }
    return(
        <>
        <div className="login-wrapper" >
            <h1>Login</h1>
            <div>
                <input className="input-wrapper"type="text" placeholder="Enter user id" onChange={(e)=>setEmail(e.target.value)} ></input>
            </div>
            {
                erremail ?<span className="error-handle">Enter valid email</span>:null
            }
           
            <div>
                <input className="input-wrapper" type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} ></input>
            </div>
            {
                errpass ?<span className="error-handle">Enter valid password</span>:null
            }
            <div >
                <button className="btn-wrapper" onClick={Login}>Login</button>
                {
                    error?<span className="error-handle">Enter email and password</span>:null
                }
            </div>
        </div>
        </>
    )
}