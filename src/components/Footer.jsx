import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
const Footer = () => {
  const { language } = useContext(LanguageContext);
  return <footer className='bg-primary py-8 fixed w-full z-10 bottom-0'>
    <div className="container mx-auto">
      <p className='text-white text-center'>
        {language === 'ar' ? '.جميع الحقوق محفوظة' : language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
      </p>
    </div>
  </footer>;

};

export default Footer;
