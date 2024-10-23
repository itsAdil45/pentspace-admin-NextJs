'use client';
import { createContext, useState } from 'react';

const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
  const [menu, setMenu] = useState(true);

  return (
    <SideBarContext.Provider value={{ menu, setMenu }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SideBarContext;