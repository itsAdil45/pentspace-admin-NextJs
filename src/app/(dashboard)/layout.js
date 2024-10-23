"use client";
import SideBar from "@/components/general/SideBar";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SideBarProvider } from "@/context/SideBarContext";
import SudoSideBar from "@/components/general/SudoSideBar";

function RootLayout({ children }) {
  return (
    <div lang="en">
      <div >
    <SideBarProvider>
        <div className="flex flex-row overflow-x-hidden bg-grey-primary/25">
          <div className="z-40">
        <SideBar />
          </div>
          <Toaster/>
          <div className="flex flex-row h-screen overflow-y-auto gap-4 w-full">
            <SudoSideBar/>
          <div className="flex-1 -z-0 md:z-0 mr-5 lg:mr-10 mb-14 pt-10 xl:pt-24 ">{children}</div>
          </div>
        </div>
    </SideBarProvider>
      </div>
    </div>
  );
}

export default RootLayout;
