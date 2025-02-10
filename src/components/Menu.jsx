import React, { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdArrowBack } from 'react-icons/io'
import { FaHome } from 'react-icons/fa'
import { GiLoincloth } from 'react-icons/gi'
import { BsFillInfoCircleFill } from 'react-icons/bs'
import { RiDiscountPercentFill } from 'react-icons/ri'
import { MenuContext } from '../contexts/MenuContext'
import { LanguageContext } from '../contexts/LanguageContext'
import { CategoryContext } from '../contexts/CategoryContext'

const Menu = () => {
  const navigate = useNavigate()
  const { menuIsOpen, handleCloseMenu } = useContext(MenuContext)
  const { language } = useContext(LanguageContext)
  const { categories, changeCategory } = useContext(CategoryContext)

  return (
    <>
      {/* Overlay */}
      {menuIsOpen && (
        <div
          onClick={handleCloseMenu}
          className='fixed inset-0 bg-black opacity-50 z-20'
        ></div>
      )}

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#ffd3c2] text-[#714920] shadow-2xl z-30 transform ${
          menuIsOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out px-4 py-6 flex flex-col`}
      >
        {/* Close Button */}
        <div
          onClick={handleCloseMenu}
          className='cursor-pointer mb-8 self-start'
          aria-label='Close Menu'
        >
          <IoMdArrowBack className='text-2xl text-[#714920]' />
        </div>

        {/* Navigation Links */}
        <nav className='flex flex-col space-y-4'>
          <Link
            to='/'
            onClick={handleCloseMenu}
            className='flex items-center p-2 hover:bg-[#f7b89d] rounded transition-colors duration-300'
          >
            <FaHome className='text-2xl mr-4 text-[#714920]' />
            <span>
              {language === 'ar'
                ? 'إستقبال'
                : language === 'fr'
                ? 'ACCUEIL'
                : 'HOME'}
            </span>
          </Link>

          <Link
            to='/products'
            onClick={handleCloseMenu}
            className='flex items-center p-2 hover:bg-[#f7b89d] rounded transition-colors duration-300'
          >
            <GiLoincloth className='text-2xl mr-4 text-[#714920]' />
            <span>
              {language === 'ar'
                ? 'منتجات'
                : language === 'fr'
                ? 'PRODUITS'
                : 'PRODUCTS'}
            </span>
          </Link>

          {/* Category Links */}
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => {
                changeCategory(category)
                navigate('/products')
                handleCloseMenu()
              }}
              className='text-left pl-8 py-2 hover:bg-[#f7b89d] rounded transition-colors duration-300'
            >
              {language === 'ar'
                ? category.arName
                : language === 'fr'
                ? category.frName
                : category.engName}
            </button>
          ))}

          <Link
            to='/promotion'
            onClick={handleCloseMenu}
            className='flex items-center p-2 hover:bg-[#f7b89d] rounded transition-colors duration-300'
          >
            <RiDiscountPercentFill className='text-3xl mr-3 text-[#714920]' />
            <span>
              {language === 'ar'
                ? 'تخفيضات'
                : language === 'fr'
                ? 'PROMOTION'
                : 'PROMOTION'}
            </span>
          </Link>

          <Link
            to='/about'
            onClick={handleCloseMenu}
            className='flex items-center p-2 hover:bg-[#f7b89d] rounded transition-colors duration-300'
          >
            <BsFillInfoCircleFill className='text-2xl mr-4 text-[#714920]' />
            <span>
              {language === 'ar'
                ? 'عنا'
                : language === 'fr'
                ? 'QUI SOMMES-NOUS'
                : 'ABOUT US'}
            </span>
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Menu
