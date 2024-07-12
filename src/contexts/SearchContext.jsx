import React, { createContext, useState, useEffect } from 'react';
export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [text, setText] = useState();
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const changeSearch = (text) => {
    setText(text);
  };

  return <SearchContext.Provider value={{text,changeSearch,searchDialogOpen,setSearchDialogOpen}}>
    {children}
  </SearchContext.Provider>;
};

export default SearchProvider;
