import FeedPopoup from "@/components/feeds/FeedPopup";
const { avatar } = require("@/images");

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/Dropdown";
  import Popup from "@/components/ui/Popup";
import { useToast } from "@/components/ui/use-toast";
  import CrowdPopoup from "@/components/user/CrowdPopup";
  import UserPopoup from "@/components/user/UserPopoup";
  import UserSend from "@/components/user/UserSend";
import { formatDateTime } from "@/lib/Dateformater";
  import { DotsHorizontalIcon } from "@radix-ui/react-icons";
  import Image from "next/image";
  import { useEffect, useState } from "react";
  
  const Actioncells = ({ row }) => {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState("");
    const [status, setStatus] = useState();
    const [loader, setLoader] = useState(false);
    const {toast} = useToast()
    useEffect(() => {
      setDetails(row?.original);
      setStatus(row?.original?.feed_status);
    }, []);
  
    const changeStatus = async (id, status) => {
      try {
        setLoader(true);
        console.log(id, status, "change user status");
        setTimeout(() => {
          toast({
            variant: "",
            title: "Request Successful.",
            description: "Feed status changed.",
          });
          setLoader(false);
          setOpen(false);
        }, 2000);
      } catch (err) {
        console.log(err)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong..",
          description: "Error in changing Feed status.",
        });
      } finally {
      }
    };
  
  
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <DotsHorizontalIcon className="cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className={"bg-white"}>
            <DropdownMenuLabel className="flex justify-center">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator className={"bg-black-primary/20"} />
            <DropdownMenuGroup className="">
              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="flex justify-center group "
              >
                {status ? (
                  <span className=" group-hover:bg-blue-primary group-hover:text-white cursor-pointer w-full h-full text-center p-2">
                    Remove Feed
                  </span>
                ) : (
                  <span className="group-hover:bg-blue-primary  group-hover:text-white cursor-pointer w-full h-full text-center p-2">
                    Activate Feed
                  </span>
                )}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
  
        {open && (
          <Popup open={open} setOpen={setOpen}>
            <FeedPopoup
              changeStatus={changeStatus}
              id={details?.id}
              status={details?.feed_status}
              loader={loader}
              setOpen={setOpen}
            />
          </Popup>
        )}
  
      </>
    );
  };
  const formatS3Url = (url) => {
    if (!url) return ''; 
    return url
        .replace(/>/g, '') 
        .replace(/</g, '') 
        .replace(/([^:]\/)\/+/g, "$1") 
};
  const feedColumns = [
    {
      accessorKey: "profile_picture",
      header: "User Image",
      cell: ({ row }) => (
        <div className=" flex justify-center w-full ">
          <Image
          style={{width:"80px", height:"80px" ,borderRadius:"50%" }}
            src={formatS3Url(row.getValue("profile_picture")) || avatar }
            alt="profile"
            className=" w-20 h-20 rounded-lg"
            width={1000}
            height={1000}
          />
        </div>
      ),
    },
    {
      accessorKey: "user_name",
      header: "User Name",
      cell: ({ row }) => (
        <div className="capitalize w-full flex justify-center">
          {row.getValue("user_name")}
        </div>
      ),
    },
    { 
      accessorKey: "image",
      header: "Feed",
      cell: ({ row }) => (
        <div className=" flex justify-center w-full ">
          <Image
          style={{width:"80px", height:"80px" ,borderRadius:"50%" }}
            src={formatS3Url(row.getValue("profile_picture")) || avatar }
            alt="profile"
            className=" w-20 h-20 rounded-lg"
            width={1000}
            height={1000}
          />
        </div>
      ),
    },
    {
      accessorKey: "about",
      header: "About",
      cell: ({ row }) => (
        <div style={{
          display: "-webkit-box",
          margin: "auto",
          maxWidth:"600px",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textAlign:"center"
        }} className=" w-full flex justify-center">{row.getValue("about")}</div>
      ),
    },
    {
      accessorKey: "total_comments",
      header: "Comments",
      cell: ({ row }) => (
        <div className="capitalize w-full flex justify-center">
          {row.getValue("total_comments")}
        </div>
      ),
    },
    {
      accessorKey: "total_likes",
      header: "Likes",
      cell: ({ row }) => (
        <div className="capitalize w-full flex justify-center">
          {row.getValue("total_likes")}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <div className="capitalize w-full flex justify-center">
          {formatDateTime(row.getValue("createdAt"))}
        </div>
      ),
    },
    // {
    //   accessorKey: "feed_status",
    //   header: "Feed Status",
    //   cell: ({ row }) => (
    //     <p className="w-full flex justify-center">
    //       {row.getValue("feed_status") ? (
    //         <span style={{ color: "green" }} className=" font-semibold capitalize">
    //           active
    //         </span>
    //       ) : (
    //         <span className="text-red-primary font-semibold capitalize">removed</span>
    //       )}
    //     </p>
    //   ),
    // },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: Actioncells,
    // },
  ];
  
  export { feedColumns };