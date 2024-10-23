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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Loader } from 'lucide-react';
import Tablepagination from '@/components/ui/Tablepagination';
import Input from '@/components/ui/Input';
import { reportColumns } from '@/Columns/reportCol';
import { reportData } from '@/data/report';

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
const totPage = Math.ceil((reportData.length)/(pagination?.pageSize))
const [page, setPage]= useState(1)

  const table = useReactTable({
    data: reportData,
    columns : reportColumns,
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
    <div className='flex flex-col gap-6'>
      <Heading heading={"Reports"} />

      {/* table */}
      <div className="flex flex-col gap-6  rounded-md border overflow-y-auto px-4">
      <div className=' max-w-[200px]'>  
      <Input
          placeholder="Filter Title"
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>{
            if(event.target.value){
              setPagination((prev)=>({
                ...prev,pageIndex:0
              }));
              setNum(false)
            }else{
              setNum(true)
            }
            table.getColumn("title")?.setFilterValue(event.target.value)}
          }
        />
      </div>
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
                <TableCell colSpan={reportColumns.length} className="h-24 ">
                  <div className="w-full flex justify-center">
                    <Loader
                      className={"h-6 w-6 text-primary animate-spin transition-all ease-in-out duration-300"}
                      loading={loader.toString()}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : reportData && table.getRowModel().rows?.length ? (
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
                  colSpan={reportColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='w-[90%] pr-10'>
      <Tablepagination page={page} setPage={setPage} totPage={totPage} setPagination={setPagination} num={num} tab={table}/>
      </div>
    </div>
  )
}

