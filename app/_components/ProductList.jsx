import React from 'react'
import ProductItem from "./ProductItem"
function ProductList({productList}) {
  return (
    <div className='mt-10'>
    <h2 className='font-bold text-2xl text-amber-500 mb-5'>Popular Products</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {productList.map((product,index) =>index<8&& (
            <ProductItem product={product} key={index}/>
        ))}
    </div>

    </div>
  )
}

export default ProductList