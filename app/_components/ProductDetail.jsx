"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBasket } from "lucide-react";
import { useRouter } from "next/navigation";
import Api from "../_utils/Api";
import { toast } from "sonner";
import { CartContext } from "../_context/CartContext";

function ProductDetail({ product  }) {
  const [productTotalPrice, setProductTotalPrice] = useState(
    product.sellingPrice ? product.sellingPrice : product.realPrice
  );

  const [quantity, setQuantity] = useState(1);
  const jwt = sessionStorage.getItem("jwt");
  const router = useRouter();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { updateCart, setUpdateCart } = useContext(CartContext);
  const addToCart = () => {
    if (!jwt) {
      router.push("/sign-in");
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_user: user.id,
        userId: user.id,
      },
    };
    console.log(data);
    Api.addToCart(data, jwt)
      .then((resp) => {
        console.log("Response:", resp);
        if (resp?.status === 200 || resp?.status === 201) {
          // تأكد من الحالة التي يعيدها الخادم
          toast("Added to cart");
          setUpdateCart(!updateCart);
        } else {
          toast("Failed to add to cart: " + resp?.statusText);
        }
      })
      .catch((e) => {
        console.error("Error:", e);
        toast("Error while adding to cart");
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <Image
        src={`http://localhost:1337${product?.image[0]?.url}`}
        width={300}
        height={300}
        alt="img"
      />

      <div className="flex flex-col gap-3 p-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <h2 className="text-sm text-gray-500">{product.description}</h2>

        <div className="flex gap-3">
          <h2 className="font-bold text-2xl">{product.realPrice} $</h2>
          <del className=" text-red-600 text-2xl">{product.sellingPrice} $</del>
        </div>

        <div className="flex flex-col items-baseline">
          <div className=" gap-1 ">
            <div className="flex border gap-10 items-center p-5">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h1>{quantity}</h1>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="text-xl font-bold">
              {(productTotalPrice * quantity).toFixed(2)} $
            </h2>
          </div>
          <Button onClick={() => addToCart()} className="flex gap-3 mt-5">
            <ShoppingBasket /> Add To Cart
          </Button>
        </div>

        <h2>
          <span className="font-bold text-[#ffcc00]">Category:</span>{" "}
          {product.categories[0].name}
        </h2>
      </div>
    </div>
  );
}

export default ProductDetail;
