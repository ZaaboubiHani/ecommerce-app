// SearchProvider component
import React, { createContext, useState } from 'react'

export const SearchContext = createContext()

const SearchProvider = ({ children }) => {
  const [text, setText] = useState('')

  const changeSearch = (newText) => {
    setText(newText)
  }

  return (
    <SearchContext.Provider value={{ text, changeSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
