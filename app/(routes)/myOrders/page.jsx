"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Api from '@/app/_utils/Api';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import moment from 'moment';
import MyOrderList from './MyOrderList';
  

function myOrders() {

    const userId = JSON.parse(sessionStorage.getItem("user"));
    const jwt = sessionStorage.getItem("jwt");
    const router = useRouter()
    const[orderLists, setOrderLists] = useState([])
   
   useEffect(()=>{
    if(!jwt){
        router.push("/sign-in")
    }
    getMyOrder()
   })
   

    const getMyOrder=async()=>{
        const orderList = await Api.myOrders(userId.id,jwt)
        console.log(orderList)
        setOrderLists(orderList)
    }

  return (
    <div>
        <h2 className='bg-[#ffcc00] text-xl font-bold text-center p-3'>my Orders</h2>
        <div className='py-8 mx-7 md:mx-20'>
            <h2 className=' p-3 text-3xl font-bold text-primary'>Order History</h2>
           
           <div>

            {orderLists.map((order,index)=>(

                <Collapsible>
                <CollapsibleTrigger>
                <div className="w-full  border p-2 bg-slate-100 flex justify-between gap-20">
                <h2> <span className='font-bold mt-3'> Order Date:</span>   {moment(order?.createdAt).format("DD/MM/YY")} </h2> 
                    <h2>    <span className='font-bold mt-3'>Total Amount :</span> {order?.
                    totalOrderAmount}</h2>

                    <h2>    <span className='font-bold mt-3'>Status :</span> PENDING</h2>
                    
                     </div>

                </CollapsibleTrigger>
                <CollapsibleContent>
  {order.orderItemList.map((item, index) => (
    <MyOrderList 
      key={index} 
      orderItem={item} 
     
    />
  ))}
</CollapsibleContent>
                </Collapsible>

                ))}
           
            </div>
        
        </div>
    </div>
  )
}

export default myOrders