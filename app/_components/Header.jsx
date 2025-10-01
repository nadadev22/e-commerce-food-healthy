"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Api from "../_utils/Api";
import CartItemList from "./CartItemList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "../_context/CartContext";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";

const Hedear = () => {
  const router = useRouter();
  const [category, setCategory] = useState([]);
  const [totalCartIItem, setTotalCartItem] = useState(0);
  const isLogin =
    typeof window !== "undefined" && sessionStorage.getItem("jwt")
      ? true
      : false;
  // const isLogin = sessionStorage.getItem("jwt") ? true : false;

  const userId = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const { updateCart, setUpdateCart } = useContext(CartContext);
  const [cartItemList, setCartItemList] = useState([]);

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  useEffect(() => {
    console.log("Updated cart items:", cartItemList);
  }, [cartItemList]);

  const getCategoryList = () => {
    Api.getCategory().then((resp) => {
      setCategory(resp.data.data);
      console.log(resp.data.data);
    });
  };

  const getCartItems = async () => {
    try {
      const cartItems = await Api.getCartItems(userId.id, jwt);
      console.log("Raw cart items from API:", cartItems); // تحقق من البيانات هنا
      setTotalCartItem(cartItems?.length);
      setCartItemList(cartItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  return (
    <div className="shadow-md flex justify-between p-2">
      <div className="flex items-center gap-8">
        <Image alt="" width={100} height={100} src="/logo.png" />

        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <h2 className=" cursor-pointer flex gap-2 items-center border rounded-full  p-2 bg-slate-200">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {category.map((cat) => (
              <DropdownMenuItem key={cat.id}>
                <Image
                  src={
                    cat?.icon?.[0]?.url
                      ? `http://localhost:1337${cat?.icon?.[0]?.url}`
                      : "/fallback-image.png"
                  }
                  width={23}
                  height={23}
                  unoptimized={true}
                  alt=""
                />
                <Link href={`/products-category/${cat.name} `}>
                  <p className="cursor-pointer text-lg">{cat.name}</p>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="hidden md:flex gap-3 items-center border rounded-full p-2">
          <Search />
          <input type="text" className="outline-none" placeholder="search" />
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            {" "}
            <h2 className="flex gap-2 items-center">
              <ShoppingBag /> <span>{totalCartIItem}</span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-[#ffcc00] font-bold  text-black p-2 mt-5">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList cartItemList={cartItemList} />
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <CircleUserIcon className="h-7 w-7 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile" className="font-bold ">
                  profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href="/myOrders">Orders</Link>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onSignOut()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Hedear;
