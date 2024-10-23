import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react'

export default function Tablepagination({totPage, page, setPage, setPagination, num, tab }) {
    
    const pageArr = Array.from({ length: totPage }, (_, index) => index + 1)

    const nextfunc = (page) => {
        if(page<=totPage){
          setPage(page)
          setPagination((prev)=>({
            ...prev,pageIndex:page-1 }))
        }
      };
      const prevfunc = (page) => {
        if (page > 0) {
          setPage(page);
          setPagination((prev)=>({
            ...prev, pageIndex:page-1
          }))
        }
    }
    const onNumber = (page)=>{
        setPage(page)
        setPagination((prev)=>({
            ...prev, pageIndex:page-1 
        }))
    }
  return (
    <div className="flex flex-row gap-2 justify-end items-center">
        {/* prev */}
        <button
        disabled={!tab.getCanPreviousPage()}
            onClick={()=>prevfunc(page-1)}
        >
        <ChevronLeft
          className="hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer "
        />
        </button>

        {/* numbers */}
        <>
        {
            num &&
            <>
        { totPage>3
        ?
        // greater than 3
        <>
        {page<totPage-1 ?
        <>
        {pageArr.slice(page-1, page+1).map((item) => {
          return <div 
   
        onClick={()=>onNumber(item)}
          className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        <div>...</div>
        {pageArr.slice(-1).map((item) => {
          return <div 
        onClick={()=>onNumber(item)}
          className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        </>
        :
        <>
        {pageArr.slice(0,1).map((item) => {
          return <div 
        onClick={()=>{onNumber(item)}}
          className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        <div>...</div>
        {pageArr.slice(-2).map((item) => {
          return <div 
        onClick={()=>{onNumber(item)}} 
          className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        </>
        }
        </>
        :
        // less than 4
        <>
        {pageArr.map((item, key) => {
          return <div key={key} onClick={()=>onNumber(item)} className={`p-2 rounded-md hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer  ${item == page ? "font-bold bg-black-primary/20" : ''}`}>{item}</div>;
        })}
        </>
        
      }
            </>
        }
        </>

        {/* next */}
        <button
        disabled={!tab.getCanNextPage()}
            onClick={()=>nextfunc(page+1)}
        >
        <ChevronRight
          className="hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer"
        />
        </button>
      </div>
  )
}