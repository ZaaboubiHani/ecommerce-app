import React, { useState, useContext, useRef } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { LanguageContext } from '../contexts/LanguageContext'

const ShippingTypeDropdown = ({ onSelect, validateAttempt }) => {
  const [selectedShippingType, setSelectedShippingType] = useState()
  const { language } = useContext(LanguageContext)
  const [isShippingTypeOpen, setIsShippingTypeOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleSelect = (type) => {
    setSelectedShippingType(type)
    onSelect(type) // This updates the parent state
    setIsShippingTypeOpen(false)
  }

  return (
    <div
      key={'shippingType'}
      className={`relative flex flex-col ${
        language === 'ar' ? 'items-end' : 'items-start'
      }`}
    >
      <button
        type='button'
        onClick={() => {
          setIsShippingTypeOpen((prev) => !prev)
        }}
        className='bg-white p-2 w-full flex items-center justify-between
                        text-l tracking-wider border border-1 border-black h-11 rounded-lg
                        duration-300'
        ref={dropdownRef}
      >
        <div
          className={`${
            selectedShippingType?.arType ? 'text-black' : 'text-gray-500'
          }`}
        >
          {language === 'ar'
            ? selectedShippingType?.arType ?? 'نوع الشحن'
            : language === 'fr'
            ? selectedShippingType?.frType ?? 'Type de livraison'
            : selectedShippingType?.enType ?? 'Shipping type'}
        </div>
        {!isShippingTypeOpen ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
      </button>
      {isShippingTypeOpen && (
        <div
          className='bg-white absolute top-[50px] flex flex-col items-start p-1 w-full z-10
            border border-1 border-black max-h-[400px] overflow-x-hidden overflow-y-auto rounded-lg shadow-md'
        >
          <div
            onClick={() =>
              handleSelect({
                arType: 'بيت',
                frType: 'Maison',
                enType: 'Home',
              })
            }
            className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'
          >
            <h3>
              {language === 'ar'
                ? 'بيت'
                : language === 'fr'
                ? 'Maison'
                : 'Home'}
            </h3>
          </div>
          <div
            onClick={() =>
              handleSelect({
                arType: 'مكتب',
                frType: 'Bureau',
                enType: 'Desk',
              })
            }
            className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'
          >
            <h3>
              {language === 'ar'
                ? 'مكتب'
                : language === 'fr'
                ? 'Bureau'
                : 'Desk'}
            </h3>
          </div>
        </div>
      )}
      {validateAttempt && selectedShippingType === undefined && (
        <div className='text-red-500 text-sm'>
          {language === 'ar'
            ? 'يرجى تحديد نوع الشحن'
            : language === 'fr'
            ? 'Veuillez sélectionner un Type de livraison'
            : 'Please select a Shipping type'}
        </div>
      )}
    </div>
  )
}

export default ShippingTypeDropdown
