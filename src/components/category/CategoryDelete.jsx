import React from 'react'
import Heading from '../general/Heading'
import { Button } from '../ui/Button'

export default function CategoryPopoup({id, handleDelete , loader, setOpen, type}) {
  return (
    <div className='flex flex-col gap-6'>
        <Heading heading={`Delete Category`}/>
        <p>{`Completing this action means you have decided to have this category deleted. Do you still want to proceed ?`}</p>
        <div className="flex flex-row justify-center gap-4 items-center">
        <Button onClick={()=>setOpen(false)} text={"No, I Do Not"} variant={"confirm"} className={"w-full"}/>
        <Button text={"Yes, I want To"} variant={"add"} className={"w-full"} loading={loader} onClick={()=>handleDelete(id)}/>
        </div>
    </div>
  )
}