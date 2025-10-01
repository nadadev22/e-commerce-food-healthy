import Api from '@/app/_utils/Api'
import React from 'react'
import TopCategoryList from './_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList'
async function ProductCategory({params}) {
const  productList = await Api.getProductByCategory(params.categoryName)
console.log(productList)
 const categoryList = await Api.getCategoryList()
   

    
  return (
    <div>
     <h2 className='bg-[#ffcc00] text-black font-bold p-4 text-center text-2xl capitalize '> {decodeURIComponent(params.categoryName)}</h2>   
      <TopCategoryList categoryList={categoryList} selectedCategory={params.categoryName}/>
      <ProductList productList={productList}/>
     
    </div>
  )
}

export default ProductCategory