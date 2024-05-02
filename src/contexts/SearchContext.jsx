import React, { createContext, useState, useEffect } from 'react';
export const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [text, setText] = useState();

  const changeSearch = (text) => {
    setText(text);
  };

  return <SearchContext.Provider value={{text,changeSearch}}>
    {children}
  </SearchContext.Provider>;
};

export default SearchProvider;
