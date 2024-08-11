import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RestrorentSignip() {
  const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [c_password,setC_password]=useState("")
    const [city,setCity]=useState("")
    const [location,setLocation]=useState("")
    const [phn,setPhn]=useState("")

    const[error,setError]=useState("")
    const[errorpass,setErrorpass]=useState("")
    const[errorname,setErrorname]=useState("")
    const[errorc_pass,setErrorc_pass]=useState("")
    const[errorcity,setErrorcity]=useState("")
    const[errorlocation,setErrorlocation]=useState("")
    const[errorphn,setErrorphn]=useState("")
    const[erroremail,setErroremail]=useState("")
    
    const useRoute=useRouter()

    async function getData(){
        // console.log(email,password,c_password,city,location,phn)
        if(!email || !password || !c_password || !city || !location || !phn){
          alert("Enter Valid details")
          return false
        }
        else if(password!==c_password){
          alert("confirm password")
          return false
        }
        let response = await fetch("http://localhost:3000/api/resorent",{
          method:'POST',
          body:JSON.stringify({name,email,password,city,location,phn})
        })
        response= await response.json();
        console.log("response",response)
        if(response.succes){
          console.log("response",response);
          const {result}=response
          delete result.password
          console.log("result",result)
          localStorage.setItem("restorentuser",JSON.stringify(result))
          useRoute.push("/restorent/dashboard")

        }

    }
    
    
  return (
    <>
      <div  className="login-wrapper">
      <h1>Sign up</h1>
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
          <input className="input-wrapper" type="text" placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}></input>
        </div>
        <div>
          <input className="input-wrapper" type="text" placeholder="Enter city" onChange={(e)=>setCity(e.target.value)}></input>
        </div>
        <div>
          <input className="input-wrapper" type="text" placeholder="Enter Location" onChange={(e)=>setLocation(e.target.value)}></input>
        </div>
        <div>
          <input className="input-wrapper" type="text" placeholder="Enter phone no." onChange={(e)=>setPhn(e.target.value)}></input>
        </div>
        <div>
          <button className="btn-wrapper" onClick={getData}>Sign up</button>
        </div>
      </div>
    </>
  );
}
