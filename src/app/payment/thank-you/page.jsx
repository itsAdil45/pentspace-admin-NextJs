import React from 'react'

export default function page() {
  return (
    <div className='max-h-screen flex flex-col gap-8'>
        <div className='h-[80px] bg-white flex items-center'>
          <h2 className='text-xl lg:text-2xl ml-10 font-bold'>PentSpace</h2>
        </div>
        <div className='bg-grey-primary/10 h-screen grid grid-cols-1 place-content-center place-items-center'>
        <div className='max-w-[800px] lg:w-[800px] bg-white rounded-lg p-14'> 
        <div className="flex flex-col gap-4 mt-8 text-center">
          <h3 className='font-bold text-2xl lg:text-4xl'>Thank you! </h3>
          <p className="">Successful Payment</p>


        </div>
      </div>
      </div>
      </div>
  )
}
