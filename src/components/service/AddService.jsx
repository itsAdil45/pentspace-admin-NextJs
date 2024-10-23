'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import Popup from '../ui/Popup'
import Input from '../ui/Input'
import { upload } from '@/images'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { serviceSchema } from '@/lib/validation'
import Select from '../ui/Select'
import { categoryData } from '@/data/categories'

export default function AddService ({open, setOpen}) {
  const [upImg, setUpImg] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState:{errors}
  }=useForm({resolver : yupResolver(serviceSchema)})

  const updateService = async (data)=>{
    console.log(data,"data")
    try{
    }catch(err){
      console.log(err)
    }
  }

//   useEffect(()=>{
//     setValue('name', name)
//     setValue("location", location)
//     setValue("picture", [img])
//     setValue('categoryId', category)
//   },[open])


  const pictureFile = watch("picture")

  useEffect(() => {
    let fileURL;
    if (pictureFile && pictureFile.length > 0 && pictureFile[0] instanceof File) {
      fileURL = URL.createObjectURL(pictureFile[0]);
      setUpImg(fileURL);
    }
    return () => {
      // if (fileURL) {
      //   URL.revokeObjectURL(fileURL);
      // }
      setUpImg(null)
    };
  }, [pictureFile]);

  return (
          <Popup open={open} setOpen={setOpen} cross={true}>
            <h2 className='text-xl xl:text-2xl font-bold pb-2 xl:pb-4'>Add Service</h2>
            <form onSubmit={handleSubmit(updateService)} className=' flex flex-col justify-center p-2 gap-2'>
              <div className='flex flex-col justify-center items-center '>
              
              <label htmlFor='img' className={`flex flex-col justify-center items-center gap-4 rounded-lg  cursor-pointer  ${upImg ? "" : "bg-blue-primary/20 p-4 max-w-[300px]"}`}>
                <Image alt='img' src={upImg ? upImg : upload} width={1000} height={1000} className={`object-center object-contain ${upImg  ? "w-full max-h-24" : "max-w-32 max-h-24"}`}/>
                { !upImg
                &&
                <p className='font-bold'>Upload Image</p>
                }
              </label>
              <Input name={"picture"} type={"file"} register={register} customClass={"hidden !p-1"} id={"img"} errors={errors} />
              </div>
              <Input name={"name"} register={register} placeholder={"Service Name"} customClass={"w-full"} errors={errors}/>
              <Select name={"categoryId"} register={register} errors={errors}>
                <option value={""} >Select Type</option>
                {categoryData.map((item,key)=>{
                  return(   
                  <option key={key} value={item?.id}> 
                  {item?.name}
                  </option>
                  )
                })}
              </Select>
              <Input name={"location"} register={register} placeholder={"Location"} customClass={"w-full"} errors={errors}/>
              <Button type={"submit"} text={"Save"} variant={"add"}/>
            </form>
          </Popup>
  )
}
