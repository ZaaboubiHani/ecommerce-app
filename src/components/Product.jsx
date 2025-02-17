import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsEyeFill } from 'react-icons/bs'
import { IoClose, IoCheckmark } from 'react-icons/io5'
import { LanguageContext } from '../contexts/LanguageContext'
import flakes from '../img/flakes2.png'

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

  const isAvailable = sizes?.some((size) => size.inStock) ?? false

  // Function to capitalize the first letter
  const capitalize = (str) => {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  // Helper to get localized text
  const getLocalizedText = (text) => {
    switch (language) {
      case 'ar':
        return text.arName || text.frName || text.engName || ''
      case 'fr':
        return text.frName || text.engName || text.arName || ''
      default:
        return text.engName || text.frName || text.arName || ''
    }
  }

  // Helper to get currency symbol
  const getCurrencySymbol = () => {
    switch (language) {
      case 'ar':
        return 'دج'
      case 'fr':
        return 'DA'
      default:
        return 'DZD'
    }
  }

  return (
    <div
      className={`
        relative 
        bg-white
        text-white
         shadow-xl
        overflow-visible
        mt-4 rounded-lg
      `}
    >
      <Link to={`/product/${_id}`}>
        {/* Availability Badge */}
        <div
          className={`
          absolute bg-white font-bold border text-main border-gray-200 top-3  px-3 py-1 z-10 flex items-center text-xs shadow-sm opacity-90 
          ${language === 'ar' ? 'flex-row-reverse right-3' : 'left-3'}
        `}
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
            <IoCheckmark
              className='text-green-500 ml-1'
              aria-label='Available'
            />
          ) : (
            <IoClose className='text-red-500 ml-1' aria-label='Unavailable' />
          )}
        </div>

        {/* New Badge */}
        {isNew && (
          <div
            className={`
            absolute bg-green-600 text-white top-12  px-3 py-1 text-xs font-semibold shadow-sm opacity-90 z-10 
            ${language === 'ar' ? 'right-3' : 'left-3'}
          `}
          >
            {language === 'ar' ? 'جديد' : language === 'fr' ? 'Nouveau' : 'New'}
          </div>
        )}

        {/* Image Container */}
        <div className='relative overflow-hidden group '>
          <Link to={`/product/${_id}`}>
            <img
              className='w-full h-52 sm:h-60 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out '
              src={images?.urls?.[0] || ''}
              alt={getLocalizedText({ arName, frName, engName })}
              loading='lazy'
            />
          </Link>
          {/* Hover Button */}
          <div
            className={`
            absolute top-3 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
            ${
              language === 'ar'
                ? '-left-20 group-hover:left-3'
                : '-right-20 group-hover:right-3'
            }
          `}
          >
            <Link
              to={`/product/${_id}`}
              className='w-10 h-10 bg-white flex justify-center items-center shadow-md  hover:bg-gray-100 transition-colors duration-300 ease-in-out'
              aria-label='View Product'
            >
              <BsEyeFill className='text-black text-lg' />
            </Link>
          </div>
        </div>

        {/* Details */}
        <div className='p-4 flex flex-col flex-grow'>
          <div
            className={`
            text-xs sm:text-xs font-light text-gray-400 mb-1 capitalize 
            ${language === 'ar' ? 'text-right' : 'text-left'}
          `}
          >
            {capitalize(
              getLocalizedText({
                arName: category?.arName,
                frName: category?.frName,
                engName: category?.engName,
              })
            )}
          </div>

          <h2
            className={`font-bold font-lora mb-2 text-main capitalize ${
              language === 'ar' ? 'text-right' : 'text-left'
            } whitespace-nowrap overflow-hidden truncate text-xs sm:text-sm md:text-base lg:text-lg leading-tight`}
            style={
              {
                // textShadow: '1px 2px 0 #7f7f7f',
              }
            }
          >
            {capitalize(getLocalizedText({ arName, frName, engName }))}
          </h2>
          {/* Price */}
          <div
            className={`
            flex items-center mb-2 
            ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}
          `}
          >
            <div
              className={`
              font-bold font-lora text-lg sm:text-xl 
              ${isSale ? 'line-through text-gray-700' : 'text-main'}
              ${language === 'ar' ? 'ml-2' : 'mr-2'}
            `}
            >
              <sup className='text-xs'>{getCurrencySymbol()}</sup> {price}
            </div>
            {isSale && (
              <div className='font-semibold text-lg sm:text-xl text-main'>
                <sup className='text-sm'>{getCurrencySymbol()}</sup> {salePrice}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Product
