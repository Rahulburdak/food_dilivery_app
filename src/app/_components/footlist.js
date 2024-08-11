import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FoodList() {
  const [list, setList] = useState([]);
  const [name,setName]=useState();
  const router=useRouter()
  useEffect(() => {
    GetDATA();
  }, []);
  async function GetDATA() {
    let data =localStorage.getItem("restorentuser")
    data=JSON.parse(data)
    if(!data){
      router.push("/restorent")
    }
    let restro_id=data._id
    setName(data.name)
    console.log("restro_id",restro_id)
    let response = await fetch(
      "http://localhost:3000/api/resorent/foods/"+restro_id
    );
    response = await response.json();
    console.log("response",response);
    if(response.result){
        setList(response.result);
    }
    
    console.log("list",list)
  }
  async function handleDelete(id){
    let data =localStorage.getItem("restorentuser")
    data=JSON.parse(data)
    let restro_id=data._id
    let response=await fetch("http://localhost:3000/api/resorent/foods/"+id,{
      method:"delete"
    });
    response=await response.json()
    if(response.success){
      GetDATA();
    }
    else{
      alert("can't Able to delete")
    }
  }
  return (
    <>
      <h1>Your food menu :{name}</h1>
      
        <table className="table" border={1} >
        <thead>
            <tr>
                <td>
                    Sr.no
                </td>

            
                <td>
                    Food item
                </td>
            
            
                <td>
                    Price
                </td>

                <td>
                    description
                </td>
          
                <td>
                    image
                </td>
           
                <td>
                    edit/delete
                </td>
        </tr>
        </thead>
        {
        list.map((item,key)=>(
            <tr>
                <td>
                    {key+1}.
                </td>
                <td>
                    {item.foodname}
                </td>
                <td>
                    {item.price}
                </td>
                <td>
                    {item.description}
                </td>
                <td>
                   <img style={{borderRadius:".6rem",border:"1px solid black"}} src={item.image} width={180}></img>
                </td>
                <td>
                    <button onClick={()=>handleDelete(item._id)}>delete</button>
                    <button onClick={()=>router.push("/restorent/dashboard/"+item._id)}>edit</button>
                </td>
                </tr>

        ))  
      }
      </table>

       
    </>
  );
}
