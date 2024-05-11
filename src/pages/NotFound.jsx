import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { MdOutlineWifiTetheringErrorRounded } from "react-icons/md";
const NotFound = () => {
 
  const { language } = useContext(LanguageContext);

  return <div className='h-[800px] bg-gray-100 flex justify-center items-center text-2xl'>
     {language === 'ar' ? 'غير موجود' : language === 'fr' ? 'Non trouvé' : 'Not Found'}
     <MdOutlineWifiTetheringErrorRounded  className='ml-4'/>
     
  </div>;
};

export default NotFound;
