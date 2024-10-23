import React from 'react'
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils"
import { LoaderCircle } from 'lucide-react';

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md lg:text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
      variants: {
        variant: {
          default:
            "bg-black-primary text-white shadow hover:bg-black-primary/60",
          destructive:
            "bg-red-primary text-white shadow-sm hover:bg-red-primary/60",
          confirm:
          "bg-red-primary/30 text-red-primary shadow-sm hover:bg-red-primary/60 hover:text-white",
          cancel:
            "bg-grey-primary/30 text-black-primary shadow-sm hover:bg-grey-primary/40",
            add:
            "bg-blue-primary text-white shadow-sm hover:bg-blue-primary/60",
            trans:
            "bg-transparent text-blue-primary border-2 border-blue-primary shadow-sm hover:bg-blue-primary/60 hover:text-white",
            ghost :
            "bg-transparent text-black-primary  shadow-sm hover:bg-grey-primary/60 hover:text-white"
        },
        size: {
          default: " py-2 px-3 md:px-6",
          sm: "h-8 rounded-md px-3 text-xs",
          lg: "h-10 rounded-md px-8",
          icon: "h-9 w-9",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  )

const Button = ({
    className,
    text, 
    variant, 
    size,
    loading,
    disabled,

    ...props

}) =>{
  return (
    <button 
    disabled={loading || disabled}
    className={cn(buttonVariants({variant, size, className}))}
    {...props}>
        {loading &&
        <LoaderCircle  className='animate-spin mr-4'/>
        }
        {text}
    </button>
  )
}


export { Button, buttonVariants }