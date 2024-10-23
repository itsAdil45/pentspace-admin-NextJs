import React, { useEffect, useState } from 'react'
import Heading from '../general/Heading'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {  categorySchema } from '@/lib/validation'
import TextArea from '../ui/TextArea'
import { Button } from '../ui/Button'
import { upload } from '@/images'
import Input from '../ui/Input'
import Image from 'next/image'
import { API } from '@/api'

export default function AddCategory ({setOpen, getCategory}) {
  const {
      register,
      handleSubmit,
      reset,
      watch,
      formState:{errors}
  } = useForm({resolver: yupResolver(categorySchema)})
  
  const [loader, setLoader] = useState(false)
  const [upImg, setUpImg] = useState(null)

  const addCategory = async (data) => {
    const payload = new FormData();
    payload.append('name', data?.name);
    payload.append('description', data.description);
    payload.append('service_category_image', data.picture[0]);

    try {
      setLoader(true)
      const res = await API.addCategory(payload)
      console.log('Add category response:', res)

      // Call getCategory after successful category addition
      
      // Reset form and close the modal
      setTimeout(() => {
        reset()
        getCategory();
        setLoader(false)
        setOpen(false)
      }, 2000)
    } catch (err) {
      setLoader(false)
      console.error(err)
    }
  }

  const pictureFile = watch("picture")

  useEffect(() => {
    let fileURL;
    if (pictureFile && pictureFile.length > 0 && pictureFile[0] instanceof File) {
      fileURL = URL.createObjectURL(pictureFile[0]);
      setUpImg(fileURL);
    }
    return () => {
      setUpImg(null)
    };
  }, [pictureFile]);

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl xl:text-2xl font-bold pb-2 xl:pb-4'>Add Category</h2>
      <form onSubmit={handleSubmit(addCategory)} className='flex flex-col justify-center p-2 gap-2'>
        <div className='flex flex-col justify-center items-center'>
          <label htmlFor='img' className={`flex flex-col justify-center items-center gap-4 rounded-lg cursor-pointer ${upImg ? "" : "bg-blue-primary/20 p-4 max-w-[300px]"}`}>
            { !upImg && <p className='font-bold'>Upload Image</p> }
          </label>
          <Input name={"picture"} type={"file"} register={register} customClass={"hidden !p-1"} id={"img"} errors={errors} />
        </div>
        <Input name={"name"} register={register} placeholder={"Service Name"} customClass={"w-full"} errors={errors}/>
        <TextArea name={"description"} register={register} placeholder={"Description"} customClass={"w-full !h-[60px]"} errors={errors}/>
        <Button type={"submit"} text={"Save"} variant={"add"} loading={loader}/>
      </form>
    </div>
  )
}
