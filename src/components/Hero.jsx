import { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../contexts/LanguageContext'
import { HeroContext } from '../contexts/HeroContext'
import ClipLoader from 'react-spinners/ClipLoader'
import heroImage from '../assets/heroimage.png'
import heroImage2 from '../assets/heroimage2.png'
import heroImage3 from '../assets/heroimage3.png'
import phoneBg from '../assets/phone.svg'
import screenBg from '../assets/screen.svg'
import newcollection from '../assets/newcollection.svg'

const Hero = () => {
  const { language } = useContext(LanguageContext)
  const { heros } = useContext(HeroContext)

  const images = [heroImage3, heroImage, heroImage2]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  if (!heros) {
    return (
      <div className='h-screen w-full flex justify-center items-center bg-gray-100'>
        <ClipLoader size={50} color='#123abc' />
      </div>
    )
  }

  const getHeroText = (index) => {
    if (!heros[index]) return ''
    return language === 'ar'
      ? heros[index].arName
      : language === 'fr'
      ? heros[index].frName
      : heros[index].engName
  }

  return (
    <section
      className='relative h-screen bg-cover bg-center flex flex-col justify-between overflow-hidden'
      style={{ backgroundImage: `url(${phoneBg})`, transform: 'scale(1.05)' }}
    >
      <div
        className='hidden md:block absolute inset-1 bg-cover bg-center z-0'
        style={{
          backgroundImage: `url(${screenBg})`,
          transform: 'scale(1.05)',
        }}
      ></div>
      <div className='absolute bg-gradient-to-t from-black via-transparent to-transparent opacity-30 z-10'></div>

      <div className='container mx-auto px-4 z-20 flex flex-col md:flex-row items-center justify-center flex-grow'>
        <div className='relative w-full md:w-1/2 flex justify-center items-center'>
          <img
            src={newcollection}
            alt='New Collection'
            className='absolute top-4 left-2 md:top-16 md:left-6 w-24 md:w-40 z-30'
          />
          <button
            onClick={prevSlide}
            className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#714920] text-white p-2 rounded-full z-40 hover:scale-110 transition-transform duration-300 shadow-lg'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 md:h-6 md:w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#714920] text-white p-2 rounded-full z-40 hover:scale-110 transition-transform duration-300 shadow-lg'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 md:h-6 md:w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </button>
          <div className='relative mt-12 md:mt-24 max-w-[300px] md:max-w-[450px] w-full h-auto'>
            <img
              src={images[currentImageIndex]}
              alt={`Hero Slide ${currentImageIndex + 1}`}
              className='w-full object-contain rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500'
              style={{
                filter:
                  'drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.7)) drop-shadow(0px 0px 5px rgba(255, 255, 255, 0.9))',
              }}
            />
            <div className='absolute inset-0 rounded-lg pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 animate-pulse'></div>
          </div>
          <div className='absolute bottom-2 md:bottom-4 flex space-x-2 z-40'>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                  index === currentImageIndex
                    ? 'bg-white scale-110 shadow-md'
                    : 'bg-gray-500'
                } transition-transform duration-300`}
              />
            ))}
          </div>
        </div>
        <div className='w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left p-4 md:p-8'>
          <h1 className='text-8xl md:text-9xl font-Calinastiya bg-clip-text text-transparent mb-4 animate-slideInLeft bg-gradient-to-r from-[#714920] to-[#9c704a]'>
            Arela Clothsy
          </h1>
          <div className='flex flex-col md:flex-row gap-4'>
            <Link
              to='/products'
              className='border-2 border-[#573718] text-[#573718] px-4 py-2 md:px-6 md:py-3 rounded-full uppercase font-semibold hover:text-white hover:bg-[#452d22] transition-all duration-300 shadow-md'
            >
              {language === 'ar'
                ? 'تسوق الآن'
                : language === 'fr'
                ? 'Achetez Maintenant'
                : 'Shop Now'}
            </Link>
            <a
              href='#new-collection'
              className='border-2 border-[#573718] text-[#573718] px-4 py-2 md:px-6 md:py-3 rounded-full uppercase font-semibold hover:bg-[#573718] hover:text-white transition-all duration-300 shadow-md'
            >
              {language === 'ar'
                ? 'استكشفي'
                : language === 'fr'
                ? 'Découvrez'
                : 'Explore'}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
