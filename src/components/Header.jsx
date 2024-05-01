import React, { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { BsBag } from 'react-icons/bs'
import { CartContext } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import Logo from '../img/ARELA CLOTHSY.png';
import LanguageDropdown from './LaguageDropdown';
const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const { setIsOpen, isOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  }, []);

  return <header className={`${isActive ? 'bg-white shadow-md' : 'bg-none'}
  fixed w-full z-10 transition-all  
  `}>
    <div className='container mx-auto flex items-center justify-between h-full '>
      {/* logo */}
      <Link to='/'>
        <img className='h-[60px]' src={Logo} alt="" />
      </Link>
      <div className='flex items-center h-full'>
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
