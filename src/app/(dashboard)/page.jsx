"use client";
import GoBack from "@/components/general/GoBack";
import Heading from "@/components/general/Heading";
import React, { useEffect, useRef, useState } from "react";
// import ApexCharts from 'apexcharts'
import dynamic from "next/dynamic";
import FeedsTable from "@/components/feeds/FeedsTable";
import Link from "next/link";

export default function Page() {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [options, setOptions] = useState({});
  const [optionsBar, setOptionsBar] = useState({});
  const barData = [
    { x: "category A", y: 10 },
    { x: "category B", y: 18 },
    { x: "category C", y: 13 },
    { x: "category D", y: 13 },
  ];
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  });

const chartfunc = ()=>{

  setOptions({
    series: [
      {
        name: "Sales",
        data: barData
      },
    ],
    tooltip: {
      enabled: false,
    },
    chart: {
      height: 400,
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
        horizontal: true,
      },
    },
    colors: ["#4CA0E5"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ["Sales", `Total Sales:`],
      markers: {
        fillColors: ["#4CA0E5"],
      },
    },
  });



setOptionsBar({
    series: [
      {
        name: "Sales",
        data: barData
      },
    ],
    tooltip: {
      enabled: false,
    },
    chart: {
      height: 400,
      type: "bar",
    },
    plotOptions: {
      bar: {
        columnWidth: "60%",
        horizontal : false
      },
    },
    colors: ["#FFFFFF"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      customLegendItems: ["Sales", `Total Sales:`],
      markers: {
        fillColors: ["#FFFFFF"],
      },
    },
  });
}
useEffect(()=>{
chartfunc()
},[])


  return (
    <div className="flex flex-col gap-6">
      {/* <GoBack/> */}
      <Heading heading={"Overview"} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className="col-span-2 bg-blue-primary rounded-2xl p-8"
        >
         <ApexCharts
        options={optionsBar}
        series={optionsBar?.series}
        type="bar"
        height={400}
        width={"100%"}

        /> 
        </div>
        <div className="bg-white p-8 rounded-2xl w-full">
        <ApexCharts
        options={options}
        series={options?.series}
        type="bar"
        height={400}
        width={"100%"}
        />
        </div>
      </div>
      <FeedsTable pagination={pagination} setPagination={setPagination} />

      <Link
        href="/feeds"
        className="self-end pr-20 md:pr-44 text-blue-primary font-bold text-lg hover:text-blue-primary/40"
      >
        view more
      </Link>
    </div>
  );
}
