import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react'

export default function Pagination({totPage, page, setPage}) {
    const pageArr = Array.from({ length: totPage }, (_, index) => index + 1)

    const nextfunc = (page) => {
        if(page<=totPage){
          setPage(page)
        }
      };
      const prevfunc = (page) => {
        if (page > 0) {
          setPage(page);
        }
    }
  return (
    <div className="flex flex-row gap-2 justify-end items-center">
        <ChevronLeft
          onClick={()=>prevfunc(page-1)}
          className="hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer "
        />
        {totPage>3
        ?
        <>
        {page<totPage-1 ?
        <>
        {pageArr.slice(page-1, page+1).map((item , key) => {
          return <div key={key} onClick={()=>setPage(item)} className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        <div>...</div>
        {pageArr.slice(-1).map((item , key) => {
          return <div key={key} onClick={()=>setPage(item)} className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        </>
        :
        <>
        {pageArr.slice(0,1).map((item , key) => {
          return <div key={key} onClick={()=>setPage(item)} className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        <div>...</div>
        {pageArr.slice(-2).map((item , key) => {
          return <div key={key} onClick={()=>setPage(item)} className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        </>
        }
        </>
        :
        <>
        {pageArr.map((item , key) => {
          return <div key={key} onClick={()=>setPage(item)} className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        </>
        
      }
        
        
        <ChevronRight
          onClick={()=>nextfunc(page+1)}
          className="hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer"
        />
      </div>
  )
}
