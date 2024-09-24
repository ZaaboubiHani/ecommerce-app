import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsEyeFill } from 'react-icons/bs'
import { IoClose, IoCheckmark } from 'react-icons/io5'
import { LanguageContext } from '../contexts/LanguageContext'

const Product = ({ product }) => {
  const { language } = useContext(LanguageContext)
  const {
    _id,
    category,
    arName,
    frName,
    engName,
    price,
    images,
    sizes,
    isSale,
    salePrice,
    new: isNew,
  } = product

  const isAvailable = sizes.some((size) => size.inStock)

  return (
    <div className='bg-white relative rounded-lg shadow-md flex flex-col h-full overflow-hidden'>
      {/* New Badge */}
      {isNew && (
        <div
          className={`absolute bg-white top-2 rounded p-1 z-10 text-xs opacity-60 ${
            language === 'ar' ? 'right-2' : 'left-2'
          }`}
        >
          {language === 'ar' ? 'جديد' : language === 'fr' ? 'Nouveau' : 'New'}
        </div>
      )}
      {/* Availability Badge */}
      <div
        className={`absolute bg-white top-10 rounded p-1 z-10 flex items-center text-xs opacity-60 ${
          language === 'ar' ? 'flex-row-reverse' : ''
        } ${language === 'ar' ? 'right-2' : 'left-2'}`}
      >
        {language === 'ar'
          ? isAvailable
            ? 'متوفر'
            : 'غير متوفر'
          : language === 'fr'
          ? isAvailable
            ? 'Disponible'
            : 'Indisponible'
          : isAvailable
          ? 'Available'
          : 'Unavailable'}
        {isAvailable ? (
          <IoCheckmark className='text-black ml-1' />
        ) : (
          <IoClose className='text-black ml-1' />
        )}
      </div>
      {/* Image Container */}
      <div className='relative overflow-hidden group rounded-lg'>
        <Link to={`/product/${_id}`}>
          <img
            className='w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-500'
            src={images?.urls[0]}
            alt={engName}
          />
        </Link>
        {/* Hover Button */}
        <div
          className={`absolute top-2 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
            language === 'ar'
              ? '-left-16 group-hover:left-4'
              : '-right-16 group-hover:right-4'
          }`}
        >
          <Link
            to={`/product/${_id}`}
            className='w-10 h-10 bg-white flex justify-center items-center shadow-lg rounded-full'
          >
            <BsEyeFill className='text-black' />
          </Link>
        </div>
      </div>
      {/* Details */}
      <div className='p-2 sm:p-4 flex flex-col flex-grow'>
        <div
          className={`text-xs sm:text-sm capitalize text-gray-500 ${
            language === 'ar' ? 'text-right' : 'text-left'
          }`}
        >
          {language === 'ar'
            ? category.arName
            : language === 'fr'
            ? category?.frName
            : category.engName}
        </div>
        <Link to={`/product/${_id}`}>
          <h2
            className={`font-semibold mb-1 text-sm sm:text-base ${
              language === 'ar' ? 'text-right' : 'text-left'
            }`}
          >
            {language === 'ar' ? arName : language === 'fr' ? frName : engName}
          </h2>
        </Link>
        {/* Price */}
        <div
          className={`flex items-center ${
            language === 'ar' ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <div
            className={`font-semibold ${
              isSale ? 'line-through text-gray-400' : ''
            } ${language === 'ar' ? 'ml-2' : 'mr-2'}`}
          >
            {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
            {price}
          </div>
          {isSale && (
            <div className='font-semibold text-red-500'>
              {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
              {salePrice}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Product
