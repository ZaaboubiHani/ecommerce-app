import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../contexts/LanguageContext'
import { HeroContext } from '../contexts/HeroContext'
import ClipLoader from 'react-spinners/ClipLoader'
import Snowfall from 'react-snowfall'
import snowflakeSrc from '../assets/snowflake.png'

const snowflake2 = new Image()
snowflake2.src = snowflakeSrc
const images = [snowflake2]

const Hero = () => {
  const { language } = useContext(LanguageContext)
  const { fetchHeros, heros } = useContext(HeroContext)

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
    <section className='relative h-screen bg-hero10 bg-no-repeat bg-cover bg-center flex items-center'>
      {/* Overlay */}
      <div className='absolute inset-0 bg-black opacity-15'>
        <Snowfall
          snowflakeCount={window.innerWidth > 768 ? 100 : 50}
          radius={[20, 20]}
          images={images}
        />
      </div>

      {heros.length > 0 && (
        <div className='container mx-auto px-4 z-10 flex flex-col items-center text-center'>
          {/* Pretitle */}
          <div className='text-2xl flex items-center uppercase font-double-struck text-white mb-4'>
            {getHeroText(0)}
          </div>

          {/* Title */}
          <h1 className='text-7xl sm:text-8xl md:text-9xl lg:text-10xl xl:text-12xl 2xl:text-14xl font-edu font-semibold bg-gradient-to-r from-blue-900 to-blue-400 bg-clip-text text-transparent mb-6 p-4'>
            {getHeroText(1)}
          </h1>

          {/* Subtitle */}
          <p className='font-sedan text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-8'>
            {getHeroText(2)}
          </p>

          {/* CTA Button */}
          <Link
            to='/products'
            className='bg-main text-white px-6 py-3 rounded-full uppercase font-semibold
    hover:bottom-2 transition-color duration-700 relative'
          >
            {language === 'ar'
              ? 'تسوق الآن'
              : language === 'fr'
              ? 'Achetez Maintenant'
              : 'Shop Now'}
          </Link>
        </div>
      )}
    </section>
  )
}

export default Hero
