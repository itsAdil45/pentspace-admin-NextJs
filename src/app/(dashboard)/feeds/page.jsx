'use client'
import FeedsTable from '@/components/feeds/FeedsTable'
import GoBack from '@/components/general/GoBack'
import React, { useState } from 'react'

export default function page() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  })
  return (
    <div className='flex flex-col gap-6 '>
      <GoBack/>
      <FeedsTable pagination={pagination} setPagination={setPagination} pagi={true} search={true}/>
    </div>
  )
}
