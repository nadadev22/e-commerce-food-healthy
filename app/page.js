import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider"
import Api from "./_utils/Api";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";
export default async function Home() {
  const sliderList = await Api.getSlider()
  console.log(sliderList)
  
  const categoryList = await Api.getCategoryList()
  console.log("categoryList",categoryList)

  const productList = await Api.getProductList()
  console.log("productList",productList)

  return (
    <div className="p-10 px-16">
     <Slider sliderList= {sliderList}/>
     <CategoryList categoryList={categoryList}/>
    <ProductList productList={productList} />
        <Image 
     
      src="/footerImg.png" 
      
      width={1000} 
      height={300} 
      alt="icon" 
      layout="responsive" 
      className="mt-8"
    
    />
    <Footer/>
    </div>
  );
}
