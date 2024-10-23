'use client'
import Heading from '@/components/general/Heading'
import React, { useState } from 'react'
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Loader } from 'lucide-react';
import Tablepagination from '@/components/ui/Tablepagination';
import Input from '@/components/ui/Input';
import { campaignColumns } from '@/Columns/campaigCol';
import { financeData } from '@/data/finance';
import { Button } from '@/components/ui/Button';

export default function Page() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loader, setLoader] = useState(false)
  const [num, setNum] = useState(true)

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
const totPage = Math.ceil((financeData?.campaign_feeds?.length)/(pagination?.pageSize))
const [page, setPage]= useState(1)

  const table = useReactTable({
    data: financeData?.campaign_feeds,
    columns : campaignColumns,
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

  return (
    <div className='flex flex-col gap-6 h-full '>
      <Heading heading={"Finance"} />

      <div className=' max-w-[200px]'>  
      <Input
          placeholder="Filter Campaign"
          value={table.getColumn("campaign")?.getFilterValue() ?? ""}
          onChange={(event) =>{
            if(event.target.value){
              setPagination((prev)=>({
                ...prev,pageIndex:0
              }));
              setNum(false)
            }else{
              setNum(true)
            }
            table.getColumn("campaign")?.setFilterValue(event.target.value)}
          }
        />
      </div>
      <div className="flex-1">
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 h-full '>

        {/* withdraw funds */}
        <div className=' flex flex-row lg:flex-col gap-4 order-first lg:order-last'>
          {/* withdraw card */}
          <div className='flex flex-col justify-center items-center gap-4 p-8 bg-white rounded-2xl w-full'>
            <h3 className='text-blue-primary text-4xl font-bold'>{`$${financeData?.total_gains}`}</h3>
            <p className='text-blue-primary'>Total Gains</p>
            <Button variant={"add"} text={"Withdraw Fund"}/>
          </div>

          {/* promotionCard */}
          <div className='flex flex-col justify-center items-center gap-4 p-8 bg-white rounded-2xl w-full'>
            <p className='text-blue-primary text-4xl font-bold'>{financeData?.campaign_feeds.length}</p>
            <p className='text-blue-primary'>Total Promotions</p>
          </div>
        </div>

      {/* table */}
      <div className=' col-span-1 lg:col-span-2 flex flex-col gap-6 h-full '>
        <div className="flex-1">

      <div className="flex flex-col gap-6  rounded-md border overflow-y-auto">
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
                <TableCell colSpan={campaignColumns.length} className="h-24 ">
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
                  colSpan={campaignColumns.length}
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

      <div className='w-[90%] pr-10 pt-5'>
      <Tablepagination page={page} setPage={setPage} totPage={totPage} setPagination={setPagination} num={num} tab={table}/>
      </div>

      </div>
      </div>
      </div>

    </div>
  )
}

