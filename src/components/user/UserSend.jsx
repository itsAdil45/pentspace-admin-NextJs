import React, { useState } from 'react'
import Heading from '../general/Heading'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {  sendSchema } from '@/lib/validation'
import TextArea from '../ui/TextArea'
import { Button } from '../ui/Button'

export default function UserSend({id, setOpen}) {
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors}
    }=useForm({resolver:yupResolver(sendSchema)})
    const [loader, setLoader]=useState(false)

    const sendMessage = async (data)=>{
        try{
            setLoader(true)
            data.id = id
            console.log(data)
            setTimeout(() => {
                setLoader(false)
                setOpen(false)
            }, 2000);
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className='flex flex-col gap-6 '>
      <Heading heading={"Send Text"}/>
      <form onSubmit={handleSubmit(sendMessage)} className='flex flex-col gap-6'>
        <TextArea
        name={"message"}
        register={register}
        errors={errors}
        placeholder={"Input Message"}
        />
        <Button text={"Send Text"} variant={"add"} type={"submit"} loading={loader}/>
      </form>
    </div>
  )
}
