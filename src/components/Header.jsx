import React, { useContext } from 'react'
import { SidebarContext } from '../contexts/SidebarContext'
import { BsBag } from 'react-icons/bs'
import { CartContext } from '../contexts/CartContext'
import { MenuContext } from '../contexts/MenuContext'
import { NavLink } from 'react-router-dom'
import Logo from '../img/ARELA CLOTHSY.png'
import LanguageDropdown from './LaguageDropdown' // Ensure correct filename
import { LanguageContext } from '../contexts/LanguageContext'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CiSearch } from 'react-icons/ci'
import { SearchContext } from '../contexts/SearchContext'

const Header = () => {
  const { handleOpenSidebar } = useContext(SidebarContext)
  const { handleOpenMenu } = useContext(MenuContext)
  const { itemAmount } = useContext(CartContext)
  const { language } = useContext(LanguageContext)
  const { setSearchDialogOpen } = useContext(SearchContext)

  // Function to render NavLink with underline
  const renderNavLink = (to, label) => (
    <NavLink
      to={to}
      className='group relative h-full px-4 md:px-6 hidden md:block'
    >
      {({ isActive }) => (
        <>
          <span
            className={`
              text-white transition duration-300 
              ${isActive ? 'text-black ' : ' '}
            `}
          >
            {label}
          </span>
          <span
            className={`
              block max-w-0 group-hover:max-w-full ${
                isActive ? 'max-w-full' : ''
              }
              transition-all duration-500 h-0.5 bg-white mt-1
            `}
          ></span>
        </>
      )}
    </NavLink>
  )

  return (
    <header className='bg-black text-white font-bold shadow-md fixed w-full z-30 transition-all h-[60px]'>
      <div className='mx-auto flex items-center justify-between h-full px-4 lg:px-16'>
        {/* Hamburger Menu for Mobile */}
        <div
          className='cursor-pointer flex relative md:hidden'
          onClick={handleOpenMenu}
          aria-label='Open menu'
        >
          <GiHamburgerMenu className='text-2xl' />
        </div>

        {/* Logo */}
        <NavLink to='/'>
          <img
            className='h-[60px] hidden md:block'
            src={Logo}
            alt='ARELA CLOTHSY Logo'
          />
        </NavLink>

        {/* Navigation Links */}
        <nav className='flex items-center'>
          {/* Home Link */}
          {renderNavLink(
            '/',
            language === 'ar'
              ? 'إستقبال'
              : language === 'fr'
              ? 'ACCUEIL'
              : 'HOME'
          )}

          {/* Products Link */}
          {renderNavLink(
            '/products',
            language === 'ar'
              ? 'منتجات'
              : language === 'fr'
              ? 'PRODUITS'
              : 'PRODUCTS'
          )}

          {/* Promotion Link */}
          {renderNavLink(
            '/promotion',
            language === 'ar'
              ? 'ترويج'
              : language === 'fr'
              ? 'PROMOTION'
              : 'PROMOTION'
          )}

          {/* About Us Link */}
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
            <BsBag className='text-2xl' />
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
