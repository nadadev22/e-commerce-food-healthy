import React from 'react'
import Image from 'next/image'
function MyOrderList({orderItem}) {
  return (
    <div className='grid grid-cols-5 w-[60%]'>

        <Image src={ `http://localhost:1337${orderItem?.product?.image[0].url}` }
            width={40}
            height={40}
            alt='icon'
            className=" mt-3 mb-3"
            style={{ borderRadius: "50%" }} 
        />

        <div className='col-span-2'>
            <h2 className='font-bold mb-3 mt-3'> name: <span className='text-slate-400 '>{orderItem?.product?.name}</span> </h2>
            <h2 className='font-bold mb-3  mt-3'> Selling Price: <span className='text-slate-400'>{orderItem?.product?.sellingPrice}</span> </h2>
        </div>

        <div className='col-span-2'>
            <h2 className='font-bold mb-3  mt-3'> quantity: <span className='text-slate-400'>{orderItem?.quantity}</span> </h2>
            <h2 className='font-bold mb-3  mt-3'> Amount: <span className='text-slate-400'>{orderItem?.amount}</span> </h2>
        </div>

      

        
    </div>
  )
}

export default MyOrderList