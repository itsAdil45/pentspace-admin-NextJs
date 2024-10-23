"use client";
import { logo } from "@/images";
import Popup from "../ui/Popup";
import {
  AlignHorizontalDistributeCenter,
  BriefcaseBusiness,
  DollarSign,
  Info,
  LayoutPanelLeft,
  LineChart,
  LogOut,
  Menu,
  UserRoundCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { useToast } from "../ui/use-toast";
import SideBarContext from "@/context/SideBarContext";

export default function SideBar() {
  const { menu, setMenu } = useContext(SideBarContext);
  const path = usePathname();
  const router = useRouter();
  const [active, setActive] = useState();
  const [open, setOpen] = useState(false)
  const [loader, setLoader]= useState(false)
  const {toast} = useToast()

  const logOut = async()=>{
    try{
      setLoader(true)
      setTimeout(()=>{
        toast({
          variant: "",
          title: "Request Successful.",
          description: "LogOut Successful",
        });
        router.push("/auth")
      },1000)
    }catch(err){
      console.log(err)
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "LogOut failed",
      });
    }finally{
      setLoader(false)
    }
  }
  const links = [
    {
      name: "Overview",
      icons: <LayoutPanelLeft />,
      route: "/",
      access: "overview",
    },
    {
      name: "Users",
      icons: <Users />,
      route: "/users",
      access: "users",
    },
    {
      name: "Categories",
      icons: <AlignHorizontalDistributeCenter />,
      route: "/category",
      access: "category",
    },
    {
      name: "Services",
      icons: <BriefcaseBusiness />,
      route: "/services",
      access: "services",
    },
    {
      name: "Providers",
      icons: <UserRoundCheck />,
      route: "/providers",
      access: "providers",
    },
    // {
    //   name: "Finance",
    //   icons: <DollarSign />,
    //   route: "/finance",
    //   access: "finance",
    // },
    {
      name: "Crowdfund",
      icons: <LineChart />,
      route: "/crowd-fund",
      access: "fund",
    },
    // {
    //   name: "Report",
    //   icons: <Info />,
    //   route: "/report",
    //   access: "report",
    // },
  ];

  useEffect(() => {
    if (path === "/" || path === "/feeds") {
      setActive("overview");
    } else if (path === "/users") {
      setActive("users");
    } else if (path === "/category") {
      setActive("category");
    } else if (path === "/services") {
      setActive("services");
    } else if (path === "/providers") {
      setActive("providers");
    } else if (path === "/finance") {
      setActive("finance");
    } else if (path === "/crowd-fund") {
      setActive("fund");
    } else if (path === "/report") {
      setActive("report");
    }
  }, [path]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window !=="undefined" && window.innerWidth < 1000) {
  //       setMenu(false);
  //     } else {
  //       setMenu(true);
  //     }
  //   };
  //   handleResize();
  //   window !=="undefined" && window.addEventListener("resize", handleResize);
  //   return () => {
  //     window !=="undefined" && window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth < 1030) {
          setMenu(false);
        } else {
          setMenu(true);
        }
      };


      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      className={` transition z-[101]  bg-black-primary fixed top-0 left-0 h-screen shadow-none ${
        menu ? "w-[300px]" : "w-20"
      }`}
    >
      <div className="flex flex-col gap-2 h-full relative">
        {/* logo */}
        <Link href={"/"} className=" flex flex-col justify-center">
          <Image
          alt="logo"
            src={logo}
            width={1000}
            height={1000}
            className={` mx-auto object-contain max-w-[60%] max-h-[80px]  ${menu ? "mt-8" : "mt-20" }`}
          />
          {menu && <h2 className="text-white text-center mt-2">PentSpace</h2>}
        </Link>

        {/* navigation */}
        <div className="flex flex-col gap-1 2xl:gap-4 justify-evenly">
          {links.map((item, index) => {
            return (
              <Link
                href={item?.route}
                key={index}
                className={`flex flex-row items-center gap-4 p-2 2xl:p-4 px-6 group ${
                  active === item?.access
                    ? "bg-white text-blue-primary"
                    : "text-white"
                }`}
              >
                <div
                  className={` p-1 2xl:p-2 rounded-md group-hover:bg-blue-primary group-hover:text-white ${
                    active === item?.access
                      ? "bg-blue-primary text-white"
                      : " bg-white text-blue-primary"
                  }`}
                >
                  {item?.icons}
                </div>
                {menu && <div>{item?.name}</div>}
              </Link>
            );
          })}
        </div>

{/* logout */}
        <div 
        onClick={()=>setOpen(true)}
        className="max-h-[80px] flex flex-row items-center px-6 p-2 2xl:p-4 gap-4 cursor-pointer group">
            <div className=" p-1 2xl:p-2 rounded-md bg-grey-primary/20 2xl:h-10 group-hover:bg-blue-primary group-hover:text-white">
                <LogOut />
            </div>
            {menu && <div className="text-white group-hover:text-blue-primary">LogOut</div>}
        </div>

        {
            open &&
            <Popup open={open} setOpen={setOpen}>
              <div className="flex flex-col gap-3">
                <p className="text-2xl font-bold">Log Out</p>
                <p>A log out has been requested for your account . Are you sure you want to log out from this account ?</p>
                <div className="flex flex-row justify-center gap-4 items-center">
                  <Button onClick={()=>setOpen(false)} text={"Cancel"} variant={"cancel"} className={"w-full"}/>
                  <Button text={"Yes, I want To"} variant={"destructive"} className={"w-full"} loading={loader} onClick={logOut}/>
                </div>
              </div>
            </Popup>
        }

        {/* hamburger */}
        <div
          onClick={() => setMenu(!menu)}
          className=" w-[46px] h-[46px] absolute top-4  flex items-center justify-center group hover:rotate-180 transition-all ease-in-out duration-300"
        >
          <Menu className=" rounded-l-xl 2xl:w-9 2xl:h-9 text-white cursor-pointer justify-center" />
        </div>
      </div>
    </div>
  );
}
