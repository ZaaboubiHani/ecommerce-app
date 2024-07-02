import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import CartItem from './CartItem';
import { SidebarContext } from '../contexts/SidebarContext';
import { CartContext } from '../contexts/CartContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const navigate = useNavigate();
  const { sidebarIsOpen, handleCloseSidebar } = useContext(SidebarContext);
  const { language } = useContext(LanguageContext);
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return <div className={`${sidebarIsOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full 
  shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-50 px-4 lg:px-[35px]`}>
    <div className='flex items-center justify-between py-6 border-b'>
      <div className='uppercase text-sm font-semibold'>
        {language === 'ar' ? `السلة: (${itemAmount})` : language === 'fr' ? `Panier: (${itemAmount})` : `Cart: (${itemAmount})`}
      </div>
      <div onClick={handleCloseSidebar} className='cursor-pointer w-8 h-8 flex justify-center items-center'>
        <IoMdArrowForward className='text-2xl' />
      </div>
    </div>
    <div className='flex flex-col gap-y-2 h-[330px] lg:h-[400px] overflow-y-auto overflow-x-hidden border-b'>
      {cart.map((item, i) => {
        return <CartItem item={item} key={i} />
      })}</div>
    <div className='flex flex-col gap-y-3 py-4'>
      <div className={`flex w-full justify-between items-center ${language === 'ar' ? 'flex-row-reverse' : 'flex-row' }`}>
        {/* total */}
        <div className='uppercase font-semibold'>
          <span className='mr-2'>
            {language === 'ar' ? 'المجموع: ' : language === 'fr' ? 'Total: ' : 'Total: '}
          </span>
          {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA  ' : 'DZD '}
          {parseFloat(total).toFixed(2)}
        </div>
        {/* clear cart icon */}
        <div onClick={() => {
          clearCart();
          navigate('/products');
        }} className='cursor-pointer py-4 bg-red-500 text-white 
        w-12 h-12 flex justify-center items-center text-xl rounded-2xl'>
          <FiTrash2 />
        </div>
      </div>
      <Link to='/' className='bg-gray-500 w-full flex p-4 justify-center items-center text-white font-medium text-nowrap rounded-2xl'>
                                    {language === 'ar' ? 'اشتري اكثر' : language === 'fr' ? 'Acheter plus' : 'Buy more'}
                                </Link>
      <Link to={cart.length > 0 ? '/checkout' : null} onClick={() => {
        if (cart.length > 0) {
          handleClose();
        }
      }} className={`bg-primary flex p-4 justify-center items-center text-white w-full font-medium rounded-2xl
      ${cart.length > 0 ? 'opacity-100' : 'opacity-50'} ${cart.length > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
        {language === 'ar' ? 'طلب' : language === 'fr' ? 'Commande' : 'Order'}
      </Link>
    </div>
  </div>;
};

export default Sidebar;
