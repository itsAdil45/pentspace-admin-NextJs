'use client'
import Heading from '@/components/general/Heading'
import React, { useEffect, useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { userData } from '@/data/users';
import { userColumns } from '@/Columns/userCol';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Loader } from 'lucide-react';
import Tablepagination from '@/components/ui/Tablepagination';
import Input from '@/components/ui/Input';

import { feedColumns } from '@/Columns/feedCol';
import { feedData } from '@/data/feeds';
import { API } from '@/api';

export default function FeedsTable({pagination, setPagination, pagi, search}) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loader, setLoader] = useState(false)
  const [num, setNum] = useState(true)
  const [feedData, setFeedData] = useState([])

//   const [pagination, setPagination] = useState({
//     pageIndex: 0,
//     pageSize: 10,
//   })
const totPage = Math.ceil((feedData.length)/(pagination?.pageSize))
const [page, setPage]= useState(1)

  const table = useReactTable({
    data: feedData,
    columns : feedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    },
  });
  const handleFeeds = async()=>{
    setLoader(true)
    try{
      const res = await API.getFeeds()
      setFeedData(res?.data?.data)
    }catch(err){
      console.log(err)
    }finally{
      setLoader(false)
    }
  }

  useEffect(()=>{
    handleFeeds()
  },[])

  return (
    <div className='flex flex-col gap-6 h-full'>
      <Heading heading={"Feed"} />

      {/* table */}
      <div className="flex-1">
      <div className="flex flex-col gap-6  rounded-md border overflow-y-auto px-4">
        {search &&
        
      <div className=' max-w-[200px]'>  
      <Input
          placeholder="Filter About"
          value={table.getColumn("about")?.getFilterValue() ?? ""}
          onChange={(event) =>{
            if(event.target.value){
              setPagination((prev)=>({
                ...prev,pageIndex:0
              }));
              setNum(false)
            }else{
              setNum(true)
            }
            table.getColumn("about")?.setFilterValue(event.target.value)}
          }
        />
      </div>
        }
        <Table>
          <TableHeader className={"py-4"} >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loader ? (
              <TableRow className=" text-center">
                <TableCell colSpan={feedColumns.length} className="h-24 ">
                  <div className="w-full flex justify-center">
                    <Loader
                      className={"h-6 w-6 text-primary animate-spin transition-all ease-in-out duration-300"}
                      loading={loader.toString()}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : userData && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={feedColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      </div>
      {
        pagi &&
      <div className='w-[90%] pr-10'>
      <Tablepagination page={page} setPage={setPage} totPage={totPage} setPagination={setPagination} num={num} tab={table}/>
      </div>
      }
    </div>
  )
}
