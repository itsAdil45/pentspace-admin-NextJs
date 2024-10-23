'use client'
import React, { useState } from 'react'
import { loginSchema } from '@/lib/validation'
import Input from '@/components/ui/Input'
import { set, useForm } from 'react-hook-form'
import PasswordInput from '@/components/ui/PasswordInput'
import {yupResolver} from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/Button'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import { API } from "@/api";
import { useToast } from "@/components/ui/use-toast";
export default function Page() {

  const {
    register,
    handleSubmit,
    formState:{ errors },
    reset
  } = useForm({resolver : yupResolver(loginSchema)}) 

  const router = useRouter()
  const[loader, setLoader ]=useState(false)
  const { toast } = useToast();
  const handleLogin = async(data)=>{
    try{
      setLoader(true)
      const res = await API.login(data);
      console.log('resresres',res)
      Cookies.set("token", res?.data?.data?.access_token);
      Cookies.set("adminProfile", res?.data)
      toast({
        variant: "",
        title: "Request Successfull.",
        description: "Admin Logged In.",    
      });
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }catch(err){
      console.log(err)
    }finally{
       setLoader(false)
    }
  }


  return (
    <div className='max-h-screen flex flex-col'>
      <div className='h-[80px] bg-white flex items-center'>
        <h2 className='text-xl lg:text-2xl ml-10 font-bold'>PentSpace</h2>
      </div>
      <div className='bg-grey-primary/10 h-screen grid grid-cols-1 place-content-center place-items-center'>
        <div className='max-w-[800px] lg:w-[800px] bg-white rounded-lg p-14'> 
          <h3 className='font-bold text-2xl lg:text-4xl'>Login to your account</h3>
          <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col gap-4 mt-8'>
            <Input register={register} name={"email"} label={"Email address"} placeholder={"Enter email address"} errors={errors}/>
            <PasswordInput register={register} name={"password"} type={"password"} label={"Password"} placeholder={"Enter password"} errors={errors}/>
            <Button text={"Get Started"} loading={loader} />
          </form>
        </div>
      </div>
    </div>
  )
}
