import React, { useContext } from 'react'
import { CiSearch } from 'react-icons/ci'
import { LanguageContext } from '../contexts/LanguageContext'
import { SearchContext } from '../contexts/SearchContext'

const SearchField = () => {
  const { language } = useContext(LanguageContext)
  const { changeSearch } = useContext(SearchContext)

  const handleChange = (event) => {
    changeSearch(event.target.value || undefined)
  }

  return (
    <div className='relative flex items-center w-full sm:w-[200px] lg:w-[240px] border border-[#714920] bg-[#ffd3c2] rounded-lg shadow-md'>
      <input
        onChange={handleChange}
        className='bg-transparent p-3 w-full text-base placeholder-[#714920] text-[#714920] focus:outline-none focus:ring-2 focus:ring-[#714920] rounded-lg transition-all duration-200 ease-in-out'
        type='text'
        placeholder={
          language === 'ar' ? 'بحث' : language === 'fr' ? 'Recherche' : 'Search'
        }
      />
      <CiSearch className='absolute right-4 text-xl text-[#714920]' />
    </div>
  )
}

export default SearchField
