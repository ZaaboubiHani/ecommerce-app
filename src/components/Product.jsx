import React, { useContext } from 'react';
import { Link } from 'react-router-dom/dist';
import { BsEyeFill } from 'react-icons/bs';
import { LanguageContext } from '../contexts/LanguageContext';
const Product = ({ product }) => {
  const { language } = useContext(LanguageContext);
  const { _id, category, arName, frName, engName, price, colors } = product;
  return <div>
    <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition'>
      <div className='w-full h-full flex justify-center items-center'>
        {/* Image */}
        <div className='w-[200px] mx-auto flex justify-center items-center'>
          <img className='max-h-[160px] group-hover:scale-110 transition duration-300' src={colors[0].images.urls[0]} alt="" />
        </div>
      </div>
      {/* Buttons */}
      <div className='absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
        <Link to={`/product/${_id}`} className='w-12 h-12 bg-red-500 flex justify-center items-center text-primary drop-shadow-xl'>
          <BsEyeFill />
        </Link>
      </div>
    </div>
    {/* catergory title and price */}
    <div>
      <div className='flex'>
        {
          colors.map(col => {
            return <div key={col._id}
              style={{
                height: '20px',
                width: '20px',
                backgroundColor: col.hex,
                marginLeft: '8px',
                border:'1px solid black'
              }} />
          })
        }
      </div>
      <div className='text-sm capitalize text-gray-500'>
        {language === 'ar' ? category.arName : language === 'fr' ? category?.frName : category.engName}
      </div>
      <Link to={`/product/${_id}`} >F
        <h2 className='font-semibold mb-1'>
          {language === 'ar' ? arName : language === 'fr' ? frName : engName}
        </h2>
      </Link>
      <div className='font-semibold'>
        {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}{price}
      </div>
    </div>
  </div>;
};

export default Product;
