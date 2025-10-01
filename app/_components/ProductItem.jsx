"use client"; // أضيفي ده عشان الكومبوننت يترندر على الـ Client-Side
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProductDetail from "./ProductDetail";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ProductItem({ product }) {
  return (
    <div className="p-2 md:p-6 flex flex-col items-center justify-center gap-3 border rounded-lg cursor-pointer hover:scale-105 hover:shadow-md transition-all">
      <Image
        className="w-100 h-100"
        src={
          product?.image?.[0]?.url
            ? `http://localhost:1337${product.image[0].url}`
            : "/fallback-image.png" // صورة افتراضية
        }
        width={500}
        height={300}
        alt={product?.name || "Product Image"} // أضفنا alt ديناميكي
        style={{ objectFit: "cover" }}
      />
      <h2 className="text-amber-500 font-bold">{product.name}</h2>
      <div className="flex gap-2">
        <del className="font-bold text-xl">{product.realPrice} $</del>
        <h2 className="text-red-600 font-bold text-xl">
          {product.sellingPrice} $
        </h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add To Cart</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription>
              <ProductDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
