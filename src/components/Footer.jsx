import { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'
import Logo from '../img/ARELA CLOTHSY.png'
import { MdEmail } from 'react-icons/md'
import { FaPhoneFlip } from 'react-icons/fa6'
import { FaInstagramSquare } from 'react-icons/fa'

const Footer = () => {
  const { language } = useContext(LanguageContext)
  const isArabic = language === 'ar'

  return (
    <footer className='bg-white py-8 w-full bottom-0'>
      <div className='container mx-auto flex flex-col items-center'>
        <img className='h-[100px]' src={Logo} alt='Logo' />
        <p
          className={`flex items-center my-2 text-right`}
          dir={isArabic ? 'rtl' : 'ltr'}
        >
          <FaPhoneFlip className='mr-2' />
          {language === 'ar' ? (
            <span>
              الهاتف : <span dir='ltr'>06 55 73 83 53</span>
            </span>
          ) : language === 'fr' ? (
            'Téléphone: 06 55 73 83 53'
          ) : (
            'Phone: 06 55 73 83 53'
          )}
        </p>
        <p className='flex items-center my-2 text-left'>
          <MdEmail className='mr-2' />
          {language === 'ar'
            ? 'Arelaclothsy@gmail.com : البريد الإلكتروني'
            : language === 'fr'
            ? 'E-mail: Arelaclothsy@gmail.com'
            : 'Email: Arelaclothsy@gmail.com'}
        </p>
        <a
          href='https://www.instagram.com/arela_clothsy'
          className='text-center flex items-center my-2'
        >
          <FaInstagramSquare className='mr-2' />
          {language === 'ar'
            ? 'arela_clothsy : إنستغرام'
            : language === 'fr'
            ? 'Instagram: arela_clothsy'
            : 'Instagram: arela_clothsy'}
        </a>
        <p className='text-center my-2'>
          {language === 'ar'
            ? '.جميع الحقوق محفوظة'
            : language === 'fr'
            ? 'Tous droits réservés.'
            : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}

export default Footer
