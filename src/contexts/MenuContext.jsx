import React, { createContext, useState } from 'react';

export const MenuContext = createContext();
const MenuProvider = ({ children }) => {
  const [menuIsOpen, setIsOpen] = useState(false);
  const handleCloseMenu = () => {
    setIsOpen(false);
  };
  const handleOpenMenu = () => {
    setIsOpen(true);
  };
  return <MenuContext.Provider value={{menuIsOpen,handleOpenMenu,handleCloseMenu}}>
    {children}
  </MenuContext.Provider>;
};

export default MenuProvider;
