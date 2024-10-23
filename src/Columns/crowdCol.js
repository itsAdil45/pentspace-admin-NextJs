import ChangeFund from "@/components/crowdfund/ChangeFund";
import ChangeReport from "@/components/report/ChangeReport";
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
import { formatDateTime } from "@/lib/Dateformater";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const Actioncells = ({ row }) => {
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState();
  const [change, setChange] = useState();
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    setDetails(row?.original);
    setStatus(row?.original?.fund_status);
  }, []);

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
            {status !== "activated" && (
              <DropdownMenuItem
              onClick={() => {setOpen(true);
                setChange("activated")
              }}
                className="flex justify-center group "
              >
                <span className="group-hover:bg-blue-primary  group-hover:text-white cursor-pointer w-full h-full text-center py-2">
                  Activate
                </span>
              </DropdownMenuItem>
            )}

            {status !== "removed" && (
              <DropdownMenuItem
                onClick={() => {setOpen(true);
                  setChange("removed")
                }}
                className="flex justify-center group "
              >
                <span className="group-hover:bg-blue-primary  group-hover:text-white cursor-pointer w-full h-full text-center py-2">
                  Removed
                </span>
              </DropdownMenuItem>
            )}

            {status !== "suspended" && (
              <DropdownMenuItem
              onClick={() => {setOpen(true);
                setChange("suspended")
              }}
                className="flex justify-center group "
              >
                <span className="group-hover:bg-blue-primary  group-hover:text-white cursor-pointer w-full h-full text-center py-2">
                  Suspended
                </span>
              </DropdownMenuItem>
            )}
            {status !== "deleted" && (
              <DropdownMenuItem
              onClick={() => {setOpen(true);
                setChange("deleted")
              }}
                className="flex justify-center group "
              >
                <span className="group-hover:bg-blue-primary  group-hover:text-white cursor-pointer w-full h-full text-center py-2">
                  Deleted
                </span>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {open && (
        <Popup open={open} setOpen={setOpen}>
          <ChangeFund id={details?.id} loader={loader} setLoader={setLoader} setOpen={setOpen} status={change}/>
        </Popup>
      )}
    </>
  );
};

const renderStatus = (status) => {
  switch (status) {
    case "activated":
      return (
        <span
          style={{ color: "#008000" }}
          className="font-semibold text-green-primary"
        >
          Activated
        </span>
      );
    case "suspended":
      return (
        <span
          style={{ color: "#D48A1A" }}
          className="font-semibold text-yellow-600"
        >
          Suspended
        </span>
      );
    case "removed":
      return (
        <span
          style={{ color: "#008000" }}
          className="font-semibold text-red-primary"
        >
          Removed
        </span>
      );
    case "deleted":
      return <span className="font-semibold text-red-primary">Deleted</span>;
    default:
      return <span>{status}</span>;
  }
};

const crowdColumns = [
  // {
  //   accessorKey: "id",
  //   header: "Report Id",
  //   enableColumnFilter: false,
  //   cell: ({ row }) => (
  //     <div className=" flex justify-center w-full ">{row.getValue("id")}</div>
  //   ),
  // },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className=" w-full flex justify-center">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (

        <div
          style={{
            display: "-webkit-box",
            margin: "auto",
            maxWidth:"600px",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textAlign: "center"

          }}
          dangerouslySetInnerHTML={{__html: row.getValue("description")}}
        />
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="capitalize w-full flex justify-center ">
        {`$${row.getValue("amount")}`}
      </div>
    ),
  },
  {
    accessorKey: "raised_so_far",
    header: "Raised",
    cell: ({ row }) => (
      <div className="capitalize w-full flex justify-center">
        {`$${row.getValue("raised_so_far")}`}
      </div>
    ),
  },
  // {
  //   accessorKey: "fund_status",
  //   header: "User Status",
  //   cell: ({ row }) => (
  //     <div className="capitalize w-full flex justify-center">
  //       {renderStatus(row.getValue("fund_status"))}
  //     </div>
  //   ),
  // },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: Actioncells,
  // },
];

export { crowdColumns };
