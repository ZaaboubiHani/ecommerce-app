import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../contexts/LanguageContext';
const Hero = () => {
  const { language } = useContext(LanguageContext);
  return <section className='h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
    <div className='container mx-auto flex justify-around h-full transition-all duration-300'>
      {/* text */}
      <div className='flex flex-col justify-center'>
        {/* pretitle */}
        <div className='font-semibold flex items-center uppercase'>
          <div className='w-10 h-[2px] bg-red-500 mr-3'></div>{language === 'ar' ? 'الاتجاه الجديد' : language === 'fr' ? 'Nouvelle Tendance' : 'New Trend'}
        </div>
        {/* title */}
        <h1 className='text-[70px] leading-[1.1] font-light mb-4'>{language === 'ar' ? 'أريلا كلوسي' : language === 'fr' ? 'Arela Clothsy' : 'Arela Clothsy'}<br />
          
        </h1>
        <Link to='/about' className='self-start uppercase font-semibold border-b-2 border-primary'>
        {language === 'ar' ? 'إكتشف أكثر' : language === 'fr' ? 'Découvrir Plus' : 'Discover More'}
        </Link>
      </div>
    </div>
  </section>;
};

export default Hero;
