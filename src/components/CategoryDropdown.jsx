import React, { useState, useContext, useRef, useEffect } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { CategoryContext } from '../contexts/CategoryContext'
import { LanguageContext } from '../contexts/LanguageContext'

const CategoryDropdown = () => {
  const { categories, changeCategory, category } = useContext(CategoryContext)
  const { language } = useContext(LanguageContext)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      className='relative flex flex-col items-center w-full sm:w-[200px] lg:w-[240px]'
      ref={dropdownRef}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className='bg-gray-100 p-3 w-full flex items-center justify-between
    text-base font-medium border border-gray-300 rounded-lg shadow-md transition-all
    duration-300 hover:shadow-lg hover:bg-gray-100'
      >
        {language === 'ar'
          ? category?.arName ?? 'أصناف'
          : language === 'fr'
          ? category?.frName ?? 'Catégories'
          : category?.engName ?? 'Categories'}
        {!isOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
      </button>
      {isOpen && (
        <div
          className='bg-gray-100 absolute top-[55px] w-full z-20 rounded-lg shadow-lg border border-gray-300 p-2 mt-1
          transition-all duration-300 transform origin-top'
        >
          {/* Option for "All Categories" */}
          <div
            key={0}
            onClick={() => {
              changeCategory(undefined)
              setIsOpen(false)
            }}
            className='flex w-full items-center justify-between px-2 py-1 hover:bg-gray-400 cursor-pointer rounded'
          >
            <h3 className='text-sm font-medium'>
              {language === 'ar'
                ? 'كل شيء'
                : language === 'fr'
                ? 'Tout'
                : 'Everything'}
            </h3>
          </div>
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => {
                changeCategory(category)
                setIsOpen(false)
              }}
              className='flex w-full items-center justify-between px-2 py-1 hover:bg-gray-400 cursor-pointer rounded'
            >
              <h3 className='text-sm font-medium'>
                {language === 'ar'
                  ? category.arName
                  : language === 'fr'
                  ? category.frName
                  : category.engName}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryDropdown
