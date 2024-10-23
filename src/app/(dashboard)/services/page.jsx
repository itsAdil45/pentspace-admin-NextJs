"use client";

import { API } from "@/api";
import Heading from "@/components/general/Heading";
import AddService from "@/components/service/AddService";
import ServiceCard from "@/components/service/ServiceCard";
import { Button } from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";
import { serviceData } from "@/data/services";
import { serviceIcon } from "@/images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState,useEffect } from "react";

export default function Page() {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [service, setService] = useState([]);
  const quantity = 12;
  const totPage = Math.ceil(service.length / quantity);
  const pageArr = Array.from({ length: totPage }, (_, index) => index + 1)
  const getService = async () => {
    try {
      setLoader(true);
      const res = await API.getServices();
      console.log('-----res-----',res?.data)
      setService(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  
  useEffect(() => {
    getService()
  }, []);
  const nextfunc = (page) => {
    if(page<=totPage){
      setPage(page)
    }
  };
  const prevfunc = (page) => {
    if (page > 0) {
      setPage(page);
    }
  };
  return (
    <div className="flex flex-col gap-6 h-full">
      <Heading heading={"Services"} />

      {/* add buttons */}
      {/* <div className="flex flex-row gap-2 lg:gap-4 justify-end">
        <Button text={"Import Service"} variant={"trans"} />
        <Button
          text={"Add Service"}
          onClick={() => setOpen(true)}
          variant={"add"}
        />
      </div> */}
      {/* service cards */}
      <div className="flex-1">

      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-4">
        {service
          .slice((page - 1) * quantity, page * quantity)
          .map((item, index) => {
            return (
              <ServiceCard
                id={item?.id}
                img={item?.service_images[0]?.image}
                icon={serviceIcon}
                name={item?.service_name}
                location={item?.country}
                category={item?.category?.id}
                key={index}
              />
            );
          })}
      </div>
      </div>

{/* pagination */}
{
  service?.length > 0 &&
  <div className="">
    <Pagination totPage={totPage} page={page} setPage={setPage}/>
  </div>
}

      {/* addservice modal */}
      {open && <AddService open={open} setOpen={setOpen} />}
    </div>
  );
}
