"use client";
import { Input } from "@/components/ui/input";
import { ArrowBigRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Api from "@/app/_utils/Api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Checkout() {
  const router = useRouter();
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [jwt, setJwt] = useState(null);
  const [userId, setUserId] = useState(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    // جلب sessionStorage في المتصفح بس
    if (typeof window !== "undefined") {
      const storedJwt = sessionStorage.getItem("jwt");
      const storedUser = sessionStorage.getItem("user");
      setJwt(storedJwt);
      setUserId(storedUser ? JSON.parse(storedUser)?.id : null);
    }
  }, []);

  useEffect(() => {
    // جلب عناصر السلة لو فيه jwt و userId
    if (jwt && userId) {
      const getCartItems = async () => {
        try {
          const cartItems = await Api.getCartItems(userId, jwt);
          console.log("cartItems", cartItems);
          setCartItemList(cartItems || []);
          setTotalCartItem(cartItems?.length || 0);
          let total = 0;
          cartItems.forEach((item) => {
            total += item.amount || 0;
          });
          setSubTotal(total);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching cart items:", error);
          toast.error("Failed to fetch cart items");
          setIsLoading(false);
        }
      };
      getCartItems();
    } else {
      setIsLoading(false);
    }
  }, [jwt, userId]);

  const allAmount = () => {
    const calculateAllAmount = subTotal + subTotal * 0.09 + 15;
    return calculateAllAmount.toFixed(2);
  };

  const handlePayment = async () => {
    if (!username || !email || !phone || !address || !zip) {
      toast.error("Please fill in all billing details");
      return;
    }

    if (!jwt || !userId) {
      toast.error("Please log in to proceed with checkout");
      router.push("/sign-in");
      return;
    }

    const data = {
      data: {
        username,
        email,
        phone,
        zip,
        address,
        totalOrderAmount: Math.round(allAmount()),
        userId,
        orderItemList: cartItemList.map((item) => ({
          quantity: item.quantity,
          amount: Math.round(item.amount),
          product: item.product,
        })),
      },
    };

    try {
      const resp = await Api.createOrder(data, jwt);
      console.log("Create order response:", resp);
      toast.success("Order placed successfully");
      router.push("/myOrders");
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order");
    }
  };

  if (isLoading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (!jwt || !userId) {
    return (
      <div className="text-center p-5">
        <h2>Please log in to proceed with checkout</h2>
        <a href="/sign-in" className="text-blue-500 underline">
          Log In
        </a>
      </div>
    );
  }

  return (
    <div>
      <h2 className="p-3 bg-[#ffcc00] text-xl font-bold text-center">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Name"
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <Input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Zip"
            />
          </div>
          <div className="mt-3">
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
        </div>
        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>${subTotal.toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>$15.00</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%): <span>${(subTotal * 0.09).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${allAmount()}</span>
            </h2>
            <Button onClick={handlePayment}>
              Payment <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
