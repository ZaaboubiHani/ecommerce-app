import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import Logo from '../img/ARELA CLOTHSY.png';
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
const Footer = () => {
  const { language } = useContext(LanguageContext);
  return <footer className='bg-white py-8 w-full bottom-0'>
    <div className="container mx-auto flex flex-col items-center">
      <img className='h-[100px]' src={Logo} alt="" />
      <p className='text-center flex items-center my-2'>
        <FaPhoneFlip className='mr-2' />
        {language === 'ar' ? 'الهاتف : ' : language === 'fr' ? 'Téléphone: ' : 'Phone: '}
        0663457855
      </p>
      <p className='text-center flex items-center my-2'>
        <MdEmail className='mr-2' />
        {language === 'ar' ? 'البريد الإلكتروني : ' : language === 'fr' ? 'E-mail: ' : 'Email: '}
        example05@gmail.com
      </p>
      <p className='text-center flex items-center my-2'>
        <FaInstagramSquare className='mr-2' />
        instagram
      </p>
      <p className='text-center my-2'>
        {language === 'ar' ? '.جميع الحقوق محفوظة' : language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
      </p>
    </div>
  </footer>;

};

export default Footer;
