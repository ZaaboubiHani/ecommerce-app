import React, { useContext } from 'react';
import { Link } from 'react-router-dom/dist';
import { BsEyeFill } from 'react-icons/bs';
import { LanguageContext } from '../contexts/LanguageContext';
const Product = ({ product }) => {
  const { language } = useContext(LanguageContext);
  const { _id, category, arName, frName, engName, price, colors, createdAt } = product;
  console.log();
  return <div className='bg-white relative rounded-2xl shadow-md'>
    {/* Check if createdAt is at least a month old */}
    {Math.floor((new Date(createdAt).getTime() - new Date(Date.now()).getTime()) / (1000 * 60 * 60 * 24)) <= 14 ? 
    <div className='absolute bg-yellow-500 text-white right-2 top-2 rounded p-1 z-10'>
       {language === 'ar' ? 'جديد' : language === 'fr' ? 'Nouveau' : 'New'}
    </div> : null}
    <div className='border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition rounded-2xl'>
      <div className='w-full h-full flex justify-center items-center'>
        {/* Image */}
        <div className='w-full mx-auto flex justify-center items-center'>
          <Link to={`/product/${_id}`}>
            <img className='max-h-[280px] m-2 group-hover:scale-110 transition duration-[2000ms] rounded-2xl' src={colors[0].images.urls[0]} alt="" />
          </Link>
        </div>
      </div>
      {/* Buttons */}
      <div className='absolute top-2 -left-11 group-hover:left-4 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
        <Link to={`/product/${_id}`} className='w-12 h-12 bg-red-500 flex justify-center items-center text-primary drop-shadow-xl rounded-lg'>
          <BsEyeFill className='text-white'/>
        </Link>
      </div>
    </div>
    {/* catergory title and price */}
    <div className='px-4 pb-4'>
      <div className={`flex ${ language === 'ar' ? 'justify-end' : 'justify-start' }`}>
        {
          colors.map(col => {
            return <div key={col._id}
              style={{
                height: '20px',
                width: '20px',
                borderRadius: '4px',
                backgroundColor: col.hex,
                margin: language === 'ar' ? '0px 0px 0px 8px' : '0px 8px 0px 0px' ,
                border: '1px solid black'
              }} />
          })
        }
      </div>
      <div className={`text-sm capitalize text-gray-500 ${ language === 'ar' ? 'text-right' : 'text-left' } `}>
        {language === 'ar' ? category.arName : language === 'fr' ? category?.frName : category.engName}
      </div>
      <Link to={`/product/${_id}`} >
        <h2 className={`font-semibold mb-1 ${ language === 'ar' ? 'text-right' : 'text-left' }`}>
          {language === 'ar' ? arName : language === 'fr' ? frName : engName}
        </h2>
      </Link>
      <div className={`font-semibold ${ language === 'ar' ? 'text-right' : 'text-left' }`}>
        {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}{price}
      </div>
    </div>
  </div>;
};

export default Product;
