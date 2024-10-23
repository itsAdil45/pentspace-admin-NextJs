import CategoryPopoup from "@/components/category/CategoryDelete";
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
import UserPopoup from "@/components/user/UserPopoup";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
const formatS3Url = (url) => {
  if (!url) return ''; 
  return url
      .replace(/>/g, '') 
      .replace(/</g, '') 
      .replace(/([^:]\/)\/+/g, "$1") 
};
const Actioncell = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setDetails(row?.original);
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoader(true);
      console.log(id, "Category is Deleted");
      setTimeout(() => {
        setLoader(false);
        setOpen(false);
      }, 2000);
    } catch (err) {
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
              <span className="group-hover:bg-blue-primary  group-hover:text-white cursor-pointer w-full h-full text-center p-2">
                Delete Category
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {open && (
        <Popup open={open} setOpen={setOpen}>
          <CategoryPopoup
            handleDelete={handleDelete}
            id={details?.id}
            loader={loader}
            setOpen={setOpen}
          />
        </Popup>
      )}
    </>
  );
};

const categoryColumns = [
  {
    accessorKey: "icon_image",
    header: "Category Image",
    cell: ({ row }) => (
      <div
        style={{
          height: "80px",
          width: "80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
        className=" flex justify-center bg-blue-primary rounded-full"
      >
        <Image 
        width={1000}
        height={1000}
          className="rounded-full w-20 h-20"
          src={formatS3Url(row.getValue("icon_image"))}
          alt="Italian Trulli"
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Category name",
    cell: ({ row }) => (
      <div className="capitalize w-full flex justify-center">
        {row.getValue("name")}
      </div>
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
          maxWidth: "600px",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
        dangerouslySetInnerHTML={{ __html: row.getValue("description") }}
      />
    ),
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: Actioncell,
  // },
];

export { categoryColumns, Actioncell };
