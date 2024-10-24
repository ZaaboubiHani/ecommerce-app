// src/components/Footer.jsx

import { useContext } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'
import Logo from '../img/ARELA CLOTHSY.png'
import { FaPhoneSquare, FaInstagramSquare } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const Footer = () => {
  const { language } = useContext(LanguageContext)
  const isArabic = language === 'ar'

  // Define translations in a separate object for scalability
  const translations = {
    navigation: {
      en: 'Navigation',
      fr: 'Navigation',
      ar: 'التنقل',
    },
    home: {
      en: 'Home',
      fr: 'Accueil',
      ar: 'الصفحة الرئيسية',
    },
    shop: {
      en: 'Shop',
      fr: 'Boutique',
      ar: 'المتجر',
    },
    discounts: {
      en: 'Discounts',
      fr: 'Promotions',
      ar: 'تخفيضات',
    },
    about: {
      en: 'About Us',
      fr: 'À Propos',
      ar: 'معلومات عنا',
    },
    contact: {
      en: 'Contact',
      fr: 'Contact',
      ar: 'اتصال',
    },
    phone: {
      en: 'Phone: 06 55 73 83 53',
      fr: 'Téléphone: 06 55 73 83 53',
      ar: 'الهاتف: <span dir="ltr">06 55 73 83 53</span>',
    },
    email: {
      en: 'Email: arelaclothsy@gmail.com',
      fr: 'E-mail: arelaclothsy@gmail.com',
      ar: 'Arelaclothsy@gmail.com : البريد الإلكتروني',
    },
    followUs: {
      en: 'Follow Us',
      fr: 'Suivez-nous',
      ar: 'تابعنا',
    },
    rights: {
      en: 'All rights reserved.',
      fr: 'Tous droits réservés.',
      ar: 'جميع الحقوق محفوظة.',
    },
    privacyPolicy: {
      en: 'Privacy Policy',
      fr: 'Politique de confidentialité',
      ar: 'سياسة الخصوصية',
    },
    terms: {
      en: 'Terms & Conditions',
      fr: 'Termes et Conditions',
      ar: 'الشروط والأحكام',
    },
    instagram: {
      en: 'Instagram',
      fr: 'Instagram',
      ar: 'إنستجرام',
    },
  }

  return (
    <footer
      dir={isArabic ? 'rtl' : 'ltr'}
      className='bg-main text-white py-12 w-full mt-auto'
    >
      <div
        className={`container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 ${
          isArabic ? 'md:grid-flow-col-dense' : ''
        }`}
      >
        {/* Logo and Branding */}
        <div
          className={`flex flex-col items-center md:items-${
            isArabic ? 'end' : 'start'
          }`}
        >
          <img className='h-24 mb-4' src={Logo} alt='ARELA CLOTHSY Logo' />
          <p
            className={`text-gray-400 ${isArabic ? 'text-right' : 'text-left'}`}
          >
            {language === 'ar'
              ? 'نحن نقدم أجود الملابس التي تعكس أناقتك.'
              : language === 'fr'
              ? 'Nous proposons des vêtements de qualité supérieure qui reflètent votre élégance.'
              : 'We offer high-quality clothing that reflects your elegance.'}
          </p>
        </div>

        {/* Navigation Links */}
        <div
          className={`flex flex-col ${isArabic ? 'text-right' : 'text-left'}`}
        >
          <h3 className='text-lg font-semibold mb-4 text-white'>
            {translations.navigation[language] || translations.navigation.en}
          </h3>
          <ul>
            <li className='mb-2'>
              <a
                href='/'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                {translations.home[language] || translations.home.en}
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='/products'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                {translations.shop[language] || translations.shop.en}
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='/promotion'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                {translations.discounts[language] || translations.discounts.en}
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='/about'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                {translations.about[language] || translations.about.en}
              </a>
            </li>
            <li className='mb-2'>
              <a
                href='/contact'
                className='text-gray-400 hover:text-white transition-colors duration-200'
              >
                {translations.contact[language] || translations.contact.en}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div
          className={`flex flex-col ${isArabic ? 'text-right' : 'text-left'}`}
        >
          <h3 className='text-lg font-semibold mb-4 text-white'>
            {language === 'ar'
              ? 'اتصل بنا'
              : language === 'fr'
              ? 'Contactez-nous'
              : 'Contact Us'}
          </h3>
          <p className='flex items-center mb-2'>
            <FaPhoneSquare
              className={`mr-2 text-gray-400 ${isArabic ? 'ml-2 mr-0' : ''}`}
              aria-hidden='true'
            />
            <span
              dangerouslySetInnerHTML={{
                __html:
                  language === 'ar'
                    ? translations.phone.ar
                    : translations.phone[language] || translations.phone.en,
              }}
            />
          </p>
          <p className='flex items-center mb-2'>
            <MdEmail
              className={`mr-2 text-gray-400 ${isArabic ? 'ml-2 mr-0' : ''}`}
              aria-hidden='true'
            />
            <a
              href='mailto:arelaclothsy@gmail.com'
              className='text-gray-400 hover:text-white transition-colors duration-200'
            >
              {translations.email[language] || translations.email.en}
            </a>
          </p>
          {/* Instagram Link */}
          <p className='flex items-center mt-4'>
            <FaInstagramSquare
              className={`mr-2 text-gray-400 ${isArabic ? 'ml-2 mr-0' : ''}`}
              aria-hidden='true'
            />
            <a
              href='https://www.instagram.com/arela_clothsy'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-white transition-colors duration-200'
            >
              {translations.instagram[language] || translations.instagram.en}
            </a>
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className='my-8 border-gray-700' />

      {/* Footer Bottom */}
      <div
        className={`container mx-auto px-4 flex flex-col md:flex-row justify-between items-center ${
          isArabic ? 'md:flex-row-reverse' : ''
        }`}
      >
        <p className='text-gray-400 mb-4 md:mb-0'>
          {translations.rights[language] || translations.rights.en}
        </p>
        <p className='text-gray-400 flex items-center'>
          Made with <span className='text-red-500 mx-1'>❤️</span> by{' '}
          <a
            href='https://www.instagram.com/abdou_bougherara/'
            target='_blank'
            rel='noopener noreferrer'
            className='text-gray-400 hover:text-white transition-colors duration-200 flex items-center underline ml-1'
          >
            Abdelali Bougherara <FaInstagramSquare className='ml-2' />
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
