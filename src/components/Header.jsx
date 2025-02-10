import React, { useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SidebarContext } from '../contexts/SidebarContext'
import { CartContext } from '../contexts/CartContext'
import { MenuContext } from '../contexts/MenuContext'
import { LanguageContext } from '../contexts/LanguageContext'
import { SearchContext } from '../contexts/SearchContext'
import Logo from '../img/ARELA CLOTHSY.png'
import LanguageDropdown from './LanguageDropdown'
import { GiHamburgerMenu } from 'react-icons/gi'
import { BsBag } from 'react-icons/bs'
import { CiSearch } from 'react-icons/ci'

const Header = () => {
  const { handleOpenSidebar } = useContext(SidebarContext)
  const { handleOpenMenu } = useContext(MenuContext)
  const { itemAmount } = useContext(CartContext)
  const { language } = useContext(LanguageContext)
  const { setSearchDialogOpen } = useContext(SearchContext)
  const location = useLocation()

  // Check if the current page is the home page
  const isHomePage = location.pathname === '/'

  // Function to render navigation links with an underline effect
  const renderNavLink = (to, label) => (
    <NavLink
      to={to}
      className='group relative h-full px-4 md:px-6 hidden md:block bg-transparent'
    >
      {({ isActive }) => (
        <>
          <span
            className={`text-[#573718] bold transition duration-300 
              ${isActive ? 'text-[#211509]' : ''}`}
          >
            {label}
          </span>
          <span
            className={`block max-w-0 group-hover:max-w-full ${
              isActive ? 'max-w-full' : ''
            } transition-all duration-500 h-0.5 bg-[#573718] mt-1`}
          ></span>
        </>
      )}
    </NavLink>
  )

  return (
    <header
      className={`text-black font-bold fixed w-full z-30 transition-all h-[60px] ${
        isHomePage ? 'bg-transparent' : 'bg-[#ffd3c2]'
      }`}
    >
      <div className='mx-auto flex items-center justify-between h-full px-4 lg:px-16 relative'>
        {/* Hamburger Menu for Mobile */}
        <div
          className='cursor-pointer flex relative md:hidden'
          onClick={handleOpenMenu}
          aria-label='Open menu'
        >
          <GiHamburgerMenu className='text-2xl' />
        </div>

        {/* Logo */}
        <NavLink
          to='/'
          className='absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none'
        >
          <img
            className='h-[60px] w-auto'
            src={Logo}
            alt='ARELA CLOTHSY Logo'
          />
        </NavLink>

        {/* Navigation Links and Icons */}
        <nav className='flex items-center font-fingerpaint'>
          {/* Navigation Links (hidden on mobile) */}
          {renderNavLink(
            '/',
            language === 'ar'
              ? 'إستقبال'
              : language === 'fr'
              ? 'ACCUEIL'
              : 'HOME'
          )}

          {renderNavLink(
            '/products',
            language === 'ar'
              ? 'منتجات'
              : language === 'fr'
              ? 'PRODUITS'
              : 'PRODUCTS'
          )}

          {renderNavLink(
            '/promotion',
            language === 'ar'
              ? 'تخفيضات'
              : language === 'fr'
              ? 'PROMOTION'
              : 'PROMOTION'
          )}

          {renderNavLink(
            '/about',
            language === 'ar'
              ? 'عنا'
              : language === 'fr'
              ? 'QUI SOMMES-NOUS'
              : 'ABOUT US'
          )}

          {/* Search Icon */}
          <CiSearch
            className='text-2xl cursor-pointer mx-2'
            onClick={() => setSearchDialogOpen(true)}
            aria-label='Search'
          />

          {/* Language Dropdown */}
          <LanguageDropdown />

          {/* Cart Icon */}
          <div
            className='cursor-pointer flex relative ml-4'
            onClick={handleOpenSidebar}
            aria-label='Open cart'
          >
            <BsBag className='text-2xl' color='#573718' size={30} />
            {itemAmount > 0 && (
              <div className='bg-black absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>
                {itemAmount}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
