"use client";
import { Input } from "@/components/ui/input";
import { ArrowBigRight, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Api from "@/app/_utils/Api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Checkout() {
  const userId = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartIItem, setTotalCartItem] = useState(0);
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total = total + item.amount;
    });
    setSubTotal(total);
  }, [cartItemList]);

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const cartItems = await Api.getCartItems(userId.id, jwt);
    console.log("cartItems", cartItems);
    setTotalCartItem(cartItems?.length);
    setCartItemList(cartItems);
  };

  const allAmount = () => {
    const calculateallAmount = subTotal + subTotal * 0.09 + 15;
    return calculateallAmount.toFixed(2);
  };

  const handlePayment = async () => {
    if (!username || !email || !phone || !address || !zip) {
      toast.error("order places successfully.");
      return;
    }

    const data = {
      data: {
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        totalOrderAmount: Math.round(allAmount()),
        userId: userId.id,
        orderItemList: cartItemList.map((item) => ({
          quantity: item.quantity,
          amount: Math.round(item.amount),
          product: item.product,
        })),
      },
    };

    Api.createOrder(data, jwt).then((resp) => {
      console.log(resp);
      toast("order places successfully");
      router.push("/");
    });
  };

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
            Total Cart({totalCartIItem})
          </h2>

          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>{subTotal}$</span>
            </h2>
            <hr />
            <h2 className="flex justify-between">
              Delivery: <span>15 $</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%): <span>{(subTotal * 0.09).toFixed(2)} $</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total <span>{allAmount()}$</span>
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
