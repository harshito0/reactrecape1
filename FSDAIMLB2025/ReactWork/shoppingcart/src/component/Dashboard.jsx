import React, { useEffect, useState } from 'react'

function Dashboard() {
const[data,setData]=useState([]);
const[cart,setCart]=useState([]);
  useEffect(()=>{
         async function fetchData(){
            const serverResponse=await fetch('https://fakestoreapi.com/products');
                     const jsonData=await serverResponse.json();
                     setData(jsonData);
            console.log(jsonData)
          }
          fetchData();
  },[])

  function addToCart(ele){
     //alert(ele.title)
     setCart(item=>[...item,ele]);
     alert(cart.length);
  }

  return (
    <div>
   <div>{
    cart.length===0?(<h2>Cart is empty</h2>):
    (
     cart.map((ele)=>(
      <div>
        <h2>{ele.title}</h2>
      </div>
     ))
    )
    }</div>

   {
    data.length===0?(<h2>Data is not available</h2>):
    (
      data.map((ele)=>(
        <div style={{border:'2px solid green'}}>
          <img src={ele.image} height={100} width={100} />
         <h2>{ele.title}</h2>
         <h2>'$'{ele.price}</h2>
         <h4>{ele.description}</h4>
         <h3>{ele.category}</h3>
         <button onClick={()=>addToCart(ele)}>Add to Cart</button>
         </div>
      ))
    )
   }


      {/* {
        JSON.stringify(data)
      } */}
    </div>
  )
}

export default Dashboard