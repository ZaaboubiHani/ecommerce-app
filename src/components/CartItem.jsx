import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose, IoMdRemove, IoMdAdd } from 'react-icons/io';
import { CartContext } from '../contexts/CartContext';
import { LanguageContext } from '../contexts/LanguageContext';
const CartItem = ({ item }) => {
  const { id, title, image, price, amount } = item;
  const { removeFromCart, increaseAmount, decreaseAmount } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  return <div className='flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500'>
    <div className='w-full min-h-[150px] flex items-center gap-x-4'>
      {/* image */}
      <Link to={`/product/${id}`}>
        <img className='max-w-[80px]' src={image} alt="" />
      </Link>
      <div className='w-full flex flex-col'>
        {/* title and remove icon */}
        <div className='flex justify-between mb-2'>
          {/*title */}
          <Link
            className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline'
            to={`/product/${id}`}>{title}</Link>
          {/*remove icon */}
          <div onClick={() => removeFromCart(id)} className='text-xl cursor-pointer'>
            <IoMdClose className='text-gray-500 hover:text-red-500 transition' />
          </div>
        </div>
        <div className='flex gap-x-2 h-[36px] text-sm'>
          {/*  quantity */}
          <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium'>
            {/*minus icon */}
            <button onClick={() => decreaseAmount(id)}
              disabled={amount === 1}
              className='flex-1 h-full flex justify-center items-center cursor-pointer '>
              <IoMdRemove className={`${amount === 1 ? 'text-gray-300' : 'text-black'}`} />
            </button>
            {/*amount*/}
            <div className='h-full flex justify-center items-center px-2'>
              {amount}
            </div>
            {/*plus icon */}
            <div onClick={() => increaseAmount(id)}
              className='flex-1 h-full flex justify-center items-center cursor-pointer'>
              <IoMdAdd />
            </div>
          </div>
          {/*  item price */}
          <div className='flex-1 flex justify-around items-center'>
            {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}  
            {parseFloat(price).toFixed(2)}</div>
          {/*  final price */}
          <div className='flex-1 flex justify-end items-center text-primary font-medium'>
            {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '} 
            {parseFloat(price * amount).toFixed(2)}</div>
        </div>
      </div>
    </div>
  </div>;
};

export default CartItem;
