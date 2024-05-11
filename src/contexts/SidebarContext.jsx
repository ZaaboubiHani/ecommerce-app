import React, { createContext, useState } from 'react';
export const SidebarContext = createContext();
const SidebarProvider = ({ children }) => {
  const [sidebarIsOpen, setIsOpen] = useState(false);
  const handleCloseSidebar = () => {
    setIsOpen(false);
  };
  const handleOpenSidebar = () => {
    setIsOpen(true);
  };
  return <SidebarContext.Provider value={{sidebarIsOpen,handleOpenSidebar,handleCloseSidebar}}>
    {children}
  </SidebarContext.Provider>;
};

export default SidebarProvider;
