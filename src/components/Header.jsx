import React, { useContext } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { BsBag } from 'react-icons/bs'
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Logo from '../img/ARELA CLOTHSY.png';
import LanguageDropdown from './LaguageDropdown';
import { LanguageContext } from '../contexts/LanguageContext';
const Header = () => {
  const { setIsOpen, isOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { language } = useContext(LanguageContext);

  return <header className='bg-white shadow-md
  fixed w-full z-30 transition-all  
  '>
    <div className='container mx-auto flex items-center justify-between h-full '>
      {/* logo */}
      <Link to='/'>
        <img className='h-[60px]' src={Logo} alt="" />
      </Link>
      <div className='flex items-center h-full'>
        <Link to='/' className='hover:bg-slate-100 transition-all duration-300 h-[60px] leading-[60px] px-6'>
        {language === 'ar' ? 'إستقبال' : language === 'fr' ? 'ACCUEIL' : 'HOME'}
        </Link>
        <Link to='/products' className='hover:bg-slate-100 transition-all duration-300 h-[60px] leading-[60px] px-6'>
        {language === 'ar' ? 'منتجات' : language === 'fr' ? 'PRODUITS' : 'PRODUCTS'}
        </Link>
        <Link to='/checkout' className='hover:bg-slate-100 transition-all duration-300 h-[60px] leading-[60px] px-6'>
        {language === 'ar' ? 'السلة' : language === 'fr' ?'Panier' : 'Cart'}
        </Link>
        <Link to='/about' className='hover:bg-slate-100 transition-all duration-300 h-[60px] leading-[60px] px-6'>
        {language === 'ar' ? 'عنا' : language === 'fr' ? 'QUI SOMMES-NOUS' : 'ABOUT US'}
        </Link>
        {/* language */}
        <LanguageDropdown />
        {/* cart */}
        <div className='cursor-pointer flex relative ml-4 lg:ml-16' onClick={() => setIsOpen(!isOpen)}>
          <BsBag className='text-2xl' />
          <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px]
      text-white rounded-full flex justify-center items-center
      '>{itemAmount}</div>
        </div>
      </div>
    </div>
  </header>;
};

export default Header;
