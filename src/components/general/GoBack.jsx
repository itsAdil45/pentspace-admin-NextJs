'use client'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBack() {
  const router = useRouter()
  return (
    <div className='h-full '>
      <div 
      onClick={()=>router.push('/')}
      className=' flex flex-row items-center gap-3 lg:gap-4 cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 pl-1'>
      <MoveLeft />
      <p className='font-bold'>Go Back</p>
      </div>
    </div>
  )
}
