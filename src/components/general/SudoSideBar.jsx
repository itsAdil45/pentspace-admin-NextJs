'use client'
import SideBarContext from '@/context/SideBarContext';
import React, { useContext, useEffect } from 'react'

export default function SudoSideBar() {
    const { menu, setMenu } = useContext(SideBarContext);
    console.log(menu)
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
    <div className={`h-screen ${menu ? "w-[400px]" : "!w-32"} `}>
    </div>
  )
}
