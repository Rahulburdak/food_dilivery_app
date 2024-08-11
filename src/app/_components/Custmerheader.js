
import Link from "next/link";
import "@/app/restorent/style.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";


export default function HeaderCustumer(props){
  console.log("props",props)
  const userStorage=JSON.parse(localStorage.getItem('user'))
  const [user,setUser]=useState(userStorage?userStorage:null)
  let cartstorage=JSON.parse(localStorage.getItem('cart'))
  const [cartnumber,setCartnumber]=useState(cartstorage?.length)
  const [cartItem,setCartitem]=useState(cartstorage)
  const router=useRouter()
  useEffect(()=>{
    if(props.cartdetails){
      console.log(props)
      
      if(cartnumber){
        if(cartItem[0].restro_id!=props.cartdetails.restro_id){
          localStorage.removeItem('cart')
          setCartnumber(1)
          setCartitem([props.cartdetails])
          localStorage.setItem('cart',JSON.stringify([props.cartdetails]))
        }else{
          setCartnumber(cartnumber+1)
          let localcartitem=cartItem
          localcartitem.push(JSON.parse(JSON.stringify(props.cartdetails)))
          setCartitem(localcartitem)
           localStorage.setItem('cart',JSON.stringify(localcartitem))
        }
        
      }else{
        setCartnumber(1)
        setCartitem([props.cartdetails])
        localStorage.setItem('cart',JSON.stringify([props.cartdetails]))
      }
      
    } 
  },[props.cartdetails])

  useEffect(()=>{
    if(props.removeCartData){
      setCartnumber(0)
      localStorage.removeItem('cart')
      setCartitem([])

    }
  },[props.removeCartData])


  useEffect(()=>{
    if(props.removeCart){
      let localcartremove=cartItem
      localcartremove=localcartremove.filter((item)=>{
        return item._id!=props.removeCart
      });
      setCartitem(localcartremove);
      setCartnumber(cartnumber-1)
      localStorage.setItem('cart',JSON.stringify(localcartremove))
      if(localcartremove.length==0){
        localStorage.removeItem('cart')
      }
    }
  },[props.removeCart])


  function Logout(){
    localStorage.removeItem('user')
    router.push('/user-auth')
  }

    return(
        <>
      <div className="Header-wrapper">
        <div>
          <img src="/logo.jpg" style={{ width: 50, borderRadius: "50%" }}></img>
        </div>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
            
          </li>
          {
            user?<>
              <li>
            <Link href={"/profile"}>{user?.name}</Link>
            
          </li>
            <li>
              <button className="btn-logout" onClick={Logout}>
                Logout
              </button>
            </li>
            </>:<>
            <li>
            <Link href={'/user-auth'}>Sign up</Link>
            
          </li>
          <li>
            <Link href={'/user-auth'}>Login</Link>
            
          </li>
            </>
          }
          
          <li>
            <Link href={cartnumber?"/cartitem":"#"}>🔔Cart({cartnumber?cartnumber+"🔴":0})</Link>
            
          </li>
          <li>
            <Link href={"/restorent"}>Restaurent Login</Link>
            
          </li>
        </ul>
      </div>
    </>
    )
}