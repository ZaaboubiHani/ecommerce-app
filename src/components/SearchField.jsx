import React, { useContext } from 'react'
import { CiSearch } from 'react-icons/ci'
import { LanguageContext } from '../contexts/LanguageContext'
import { SearchContext } from '../contexts/SearchContext'

const SearchField = () => {
  const { language } = useContext(LanguageContext)
  const { changeSearch } = useContext(SearchContext)

  return (
    <div className='relative flex items-center w-full sm:w-[200px] lg:w-[240px] border border-gray-300 mx-2 bg-white rounded-lg shadow-md'>
      <input
        onChange={(event) =>
          changeSearch(
            event.target.value.length === 0 ? undefined : event.target.value
          )
        }
        className='bg-gray-100 p-3 w-full text-base placeholder-black focus:outline-none focus:border-transparent focus:ring-0 rounded-lg transition-all duration-200 ease-in-out'
        type='text'
        placeholder={
          language === 'ar' ? 'بحث' : language === 'fr' ? 'Recherche' : 'Search'
        }
      />
      <CiSearch className='absolute right-4 text-xl text-black' />
    </div>
  )
}

export default SearchField
