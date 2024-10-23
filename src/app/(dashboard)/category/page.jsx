'use client'
import Heading from '@/components/general/Heading'
import React, { useState ,useEffect} from 'react'
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
import {  } from '@/data/users';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Loader } from 'lucide-react';
import Tablepagination from '@/components/ui/Tablepagination';
import Input from '@/components/ui/Input';
import { categoryData } from '@/data/categories';
import { categoryColumns } from '@/Columns/categoryCol';
import { Button } from '@/components/ui/Button';
import AddCategory from '@/components/category/AddCategory';
import Popup from '@/components/ui/Popup';
import { API } from '@/api';

export default function Page() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [loader, setLoader] = useState(false)
  const [num, setNum] = useState(true)
  const [open, setOpen] = useState(false)
  const [category,setCategory] = useState([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
const totPage = Math.ceil((categoryData.length)/(pagination?.pageSize))
const [page, setPage]= useState(1)

  const table = useReactTable({
    data: category,
    columns : categoryColumns,
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
  const getCategory = async () => {
    try {
      setLoader(true);
      const res = await API.getCategories();
      console.log('-----res-----',res?.data)
      setCategory(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  
  useEffect(() => {
    getCategory()
  }, []);
  return (
    <div className='flex flex-col gap-6 h-full'>
      <Heading heading={"Business Categories"} />

      {/* table */}
      <div className="flex-1">
      <div className="flex flex-col gap-6  rounded-md border overflow-y-auto px-4">
        <div className='flex justify-between items-center w-[90%]'>
      <div className=' max-w-[200px]'>  
      <Input
          placeholder="Filter name"
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>{
            if(event.target.value){
              setPagination((prev)=>({
                ...prev,pageIndex:0
              }));
              setNum(false)
            }else{
              setNum(true)
            }
            table.getColumn("name")?.setFilterValue(event.target.value)}
          }
        />
      </div>
      <Button text={"Add Category"} variant={"add"} onClick={()=>setOpen(true)}></Button>
      {open && 
      <Popup open={open} setOpen={setOpen} cross={true} >
          <AddCategory setOpen={setOpen} getCategory={getCategory}/>
      </Popup>
      }
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
                <TableCell colSpan={categoryData.length} className="h-24 ">
                  <div className="w-full flex justify-center">
                    <Loader
                      className={"h-6 w-6 text-primary animate-spin transition-all ease-in-out duration-300"}
                      loading={loader.toString()}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) :  categoryData && table.getRowModel().rows?.length ? (
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
                  colSpan={categoryData.length}
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
      <div className='w-[90%] pr-10'>
      <Tablepagination page={page} setPage={setPage} totPage={totPage} setPagination={setPagination} num={num} tab={table}/>
      </div>
    </div>
  )
}
