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
  import CrowdPopoup from "@/components/user/CrowdPopup";
  import UserPopoup from "@/components/user/UserPopoup";
  import UserSend from "@/components/user/UserSend";
  import { DotsHorizontalIcon } from "@radix-ui/react-icons";
  import Image from "next/image";
  import { useEffect, useState } from "react";
  
//   const Actioncells = ({ row }) => {
//     const [open, setOpen] = useState(false);
//     const [details, setDetails] = useState("");
//     const [status, setStatus] = useState();
//     const [loader, setLoader] = useState(false);
//     const [crowdOpen, setCrowdOpen] = useState(false);
//     const [textOpen, setTextOpen] = useState(false);
  
//     useEffect(() => {
//       setDetails(row?.original);
//       setStatus(row?.original?.is_active);
//     }, []);
  
//     const changeUserStatus = async (id, status) => {
//       try {
//         setLoader(true);
//         console.log(id, status, "change user status");
//         setTimeout(() => {
//           setLoader(false);
//           setOpen(false);
//         }, 2000);
//       } catch (err) {
//       } finally {
//       }
//     };
  
//     const changeFundStatus = async (id, status) => {
//       try {
//         setLoader(true);
//         console.log(id, status, "change fund status");
//         setTimeout(() => {
//           setLoader(false);
//           setCrowdOpen(false);
//         }, 2000);
//       } catch (err) {
//       } finally {
//       }
//     };
  
//     return (
//       <>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <DotsHorizontalIcon className="cursor-pointer" />
//           </DropdownMenuTrigger>
//           <DropdownMenuContent className={"bg-white"}>
//             <DropdownMenuLabel className="flex justify-center">
//               Actions
//             </DropdownMenuLabel>
//             <DropdownMenuSeparator className={"bg-black-primary/20"} />
//             <DropdownMenuGroup className="">
//               <DropdownMenuItem
//                 onClick={() => setOpen(true)}
//                 className="flex justify-center group "
//               >
//                 {status ? (
//                   <span className=" group-hover:bg-blue-primary group-hover:text-white cursor-pointer w-full h-full text-center p-2">
//                     Deactivate User
//                   </span>
//                 ) : (
//                   <span className="group-hover:bg-blue-primary  group-hover:text-white cursor-pointer w-full h-full text-center p-2">
//                     Activate User
//                   </span>
//                 )}
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => setCrowdOpen(true)}
//                 className="flex justify-center group "
//               >
//                 <span className="group-hover:bg-blue-primary  group-hover:text-white cursor-pointer w-full h-full text-center py-2">
//                   Crowdfunding
//                 </span>
//               </DropdownMenuItem>
//               <DropdownMenuItem
//                 onClick={() => setTextOpen(true)}
//                 className="flex justify-center group "
//               >
//                 <span className="group-hover:bg-blue-primary  group-hover:text-white cursor-pointer w-full h-full text-center py-2">
//                   Sen Text
//                 </span>
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//           </DropdownMenuContent>
//         </DropdownMenu>
  
//         {open && (
//           <Popup open={open} setOpen={setOpen}>
//             <UserPopoup
//               changeStatus={changeUserStatus}
//               id={details?.id}
//               status={details?.is_active}
//               loader={loader}
//               setOpen={setOpen}
//             />
//           </Popup>
//         )}
  
//         {crowdOpen && (
//           <Popup open={crowdOpen} setOpen={setCrowdOpen}>
//             <CrowdPopoup
//               id={details?.id}
//               status={details?.crowd_funding}
//               loader={loader}
//               changeStatus={changeFundStatus}
//               setOpen={setCrowdOpen}
//             />
//           </Popup>
//         )}
  
//         {textOpen && (
//           <Popup open={textOpen} setOpen={setTextOpen} cross={true}>
//             <UserSend id={details?.id} setOpen={setTextOpen} />
//           </Popup>
//         )}
//       </>
//     );
//   };
  
  const campaignColumns = [
    {
      accessorKey: "campaign",
      header: "Campaign Feed",
      cell: ({ row }) => (
        <div className="capitalize w-full flex justify-center">
          {row.getValue("campaign")}
        </div>
      ),
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => (
        <div className=" w-full flex justify-center">{`$${row.getValue("budget").toFixed(2)}`}</div>
      ),
    },
    {
      accessorKey: "duration",
      header: "Duration",
      cell: ({ row }) => (
        <div className="capitalize w-full flex justify-center">
          {row.getValue("duration")}
        </div>
      ),
    },
    {
      accessorKey: "creator",
      header: "Creator",
      cell: ({ row }) => (
        <div className="capitalize w-full flex justify-center">
          {row.getValue("creator")}
        </div>
      ),
    },
    // {
    //   id: "actions",
    //   enableHiding: false,
    //   cell: Actioncells,
    // },
  ];
  
  export { campaignColumns };
  