"use client";
import Link from "next/link";
import "@/app/restorent/style.css";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
export default function RestorentHeader() {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const data = localStorage.getItem("restorentuser");
    if (!data) {
      router.push("/restorent");
    } else if (!data && pathname == "/restorent/dashboard") {
      router.push("/restorent");
    } else {
      setDetails(JSON.parse(data));
      console.log("new details",details);
    }
  },[]);
  function Logout(){
    localStorage.removeItem("restorentuser")
    router.push("/restorent");
    alert("logout")
  }
  return (
    <>
      <div className="Header-wrapper">
        <div>
          <img src="/logo.jpg" style={{ width: 50, borderRadius: "50%" }}></img>
        </div>
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>

          {details ? (
            <>
              <li>
                <button className="btn-logout" onClick={Logout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <Link href={"/restorent"}>Login</Link>
            </li>
          )}

          <li>
            <Link href={"/"}>Profile</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
