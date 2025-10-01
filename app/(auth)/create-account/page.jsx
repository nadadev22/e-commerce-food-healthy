"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Api from "@/app/_utils/Api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

function CreateAccount() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");

    if (jwt) {
      router.push("/");
    }
  }, []);
  const onCreateAccount = () => {
    Api.registerUser(username, email, password).then(
      (resp) => {
        console.log(resp.data.user);
        console.log(resp.data.jwt);
        sessionStorage.setItem("user", JSON.stringify(resp.data.user));
        sessionStorage.setItem("jwt", resp.data.jwt);
        toast("account created successfully.");
        router.push("/");
      },
      (e) => {
        toast("Error while creating account.");
      }
    );
  };
  return (
    <div className="items-baseline flex m-20 justify-center">
      <div className="flex flex-col items-center  bg-gray-100 w-100 p-5">
        <Image width={200} height={200} alt="icon" src="/logo.png" />
        <h2 className="mb-5  text-gray-500"> Create New Account</h2>
        <div className="flex flex-col w-full gap-5">
          <Input
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white"
            type="text"
            placeholder="username"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white"
            type="email"
            placeholder="Email"
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white"
            type="password"
            placeholder="password"
          />
          <Button
            disabled={!username || !email || !password}
            onClick={() => onCreateAccount()}
          >
            Create new Account
          </Button>
          <p>
            already Have an Account{" "}
            <Link className="text-blue-500" href={"/sign-in"}>
              {" "}
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
