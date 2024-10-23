import React from "react";
import Heading from "../general/Heading";
import { Button } from "../ui/Button";

export default function ChangeReport({ status, setOpen, id, setLoader, loader }) {
  const changeReport = async (status, id) => {
    try {
      setLoader(true);
      console.log(status, id, "change report status");
      setTimeout(() => {
        setOpen(false);
        setLoader(false)
      }, 2000);
    } catch (err) {
      console.log(err);
    } finally {
      ;
    }
  };
  const txt = (status) => {
    switch (status) {
      case "activated":
        return "Active";
      case "removed":
        return "Remove";
      case "suspended":
        return "Suspend";
      case "deleted":
        return "Delete";
    }
  };
  const heading = txt(status)
  console.log(heading)
  return (
  <div className=" flex flex-col gap-6">
    <Heading heading={heading}/>
    <p>{`Completing this action means you have decided to have this report  ${status}... Do you still want to proceed ?`}</p>
    <div className="flex flex-row justify-center gap-4 items-center">
        <Button onClick={()=>setOpen(false)} text={"No, I Do Not"} variant={"confirm"} className={"w-full"}/>
        <Button text={"Yes, I want To"} variant={"add"} className={"w-full"} loading={loader} onClick={()=>changeReport(id, status)}/>
        </div>
  </div>
  );
}
