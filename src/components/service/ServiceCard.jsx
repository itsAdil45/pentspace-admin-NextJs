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

export default function ServiceCard({id, img, icon, name, location, category}) {
  const [open, setOpen] = useState(false)
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
    const formatS3Url = (url) => {
    if (!url) return ''; 
    return url
        .replace(/>/g, '') 
        .replace(/</g, '') 
        .replace(/([^:]\/)\/+/g, "$1") 
};
  useEffect(()=>{
    setValue('name', name)
    setValue("location", location)
    setValue("picture", [img])
    setValue('categoryId', category)
  },[open])


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
    <div className='w-full bg-white rounded-lg flex flex-col gap-2 p-4 shadow-inner shadow-grey-primary/60 hover:scale-105 transition-all ease-in-out duration-300'>
        <Image className='w-full h-[150px] rounded-lg object-cover object-center' alt='img' src={formatS3Url(img)} width={1000} height={1000} />
        <div className='flex flex-row gap-2'>
            <div className='p-3 rounded-full bg-blue-primary/40 w-12 h-12 flex justify-center items-center'>
                <Image alt='icon' src={icon} width={1000} height={1000} className='w-full h-full object-contain object-center'/>
            </div>
            <div className='flex flex-col gap-2 w-full'>
                <h3 className='text-lg lg:text-xl font-bold'>{name}</h3>
                <p className='lg:text-lg'>{location}</p>
            </div>
        </div> 
        {/* <div className='flex justify-end'>
            <Button text={"Edit"} onClick={()=>setOpen(true)}/>
        </div> */}

        {
          open &&
          <Popup open={open} setOpen={setOpen} cross={true}>
            <h2 className='text-xl lg:text-2xl font-bold pb-4'>Edit Service</h2>
            <form onSubmit={handleSubmit(updateService)} className=' flex flex-col justify-center p-4 gap-2'>
              <div className='flex flex-col justify-center items-center '>
              
              <label htmlFor='img' className={`flex flex-col justify-center items-center gap-4 rounded-lg  cursor-pointer  ${upImg || img ? "" : "bg-blue-primary/40 p-8 max-w-[300px]"}`}>
                <Image alt='img' src={upImg ? upImg :img??upload} width={1000} height={1000} className={`object-center object-cover ${upImg || img ? "w-full max-h-24" : "max-w-32 max-h-24"}`}/>
                { !upImg || !img
                &&

                <p className='font-bold'>Upload Image</p>
                }
              </label>
              <Input name={"picture"} type={"file"} register={register} customClass={"hidden"} id={"img"} errors={errors} />
              </div>
              <Input name={"name"} register={register} placeholder={"Service Name"} customClass={"w-full"} errors={errors}/>
              <Select name={"categoryId"} register={register} errors={errors}>
                <option value={""} >Select Type</option>
                {categoryData.map((item, key)=>{
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
        }
    </div>
  )
}
