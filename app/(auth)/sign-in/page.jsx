"use client"
import React , {useEffect, useState} from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import Api from '@/app/_utils/Api'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

function SignIn() {



      const [email,setEmail] = useState()
      const [password,setPassword] = useState()
          const router = useRouter()

          useEffect(() =>{
            const jwt = sessionStorage.getItem("jwt")

            if(jwt){
              router.push("/")
            }
          },[])
      
      const onSignIn=() => {
        Api.signIn(email,password).then(resp => {
          console.log(resp.data.user)
          console.log(resp.data.jwt)
          sessionStorage.setItem("user",JSON.stringify(resp.data.user))
                sessionStorage.setItem("jwt",resp.data.jwt)
                toast("Singed In successfully.")
                router.push("/")

        },(e) => {
          toast("Error while signing in .")
        })
      }
  
  return (
    <div className='items-baseline flex m-20 justify-center'>
        <div className='flex flex-col items-center  bg-gray-100 w-100 p-5'>
            <Image width={200} height={200} alt='icon' src="/logo.png"/>
            <h2 className='mb-5  text-gray-500'> Sign In</h2>
            <div className='flex flex-col w-full gap-5'>
                
                <Input  onChange ={(e) => setEmail(e.target.value)} className="bg-white" type="email" placeholder="Email"/>
                <Input onChange ={(e) => setPassword(e.target.value)} className="bg-white" type="password" placeholder="password"/>
                <Button  disabled={ !email || !password}  onClick={() => onSignIn()}>Sign In</Button>
                <p>Don"t Have an Account ?  <Link className='text-blue-500' href={"/create-account"}> Create new Account</Link></p>
               

            </div>
        </div>

    </div>
  )
}

export default SignIn