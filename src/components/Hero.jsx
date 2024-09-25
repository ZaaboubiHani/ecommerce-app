import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LanguageContext } from '../contexts/LanguageContext'
import { HeroContext } from '../contexts/HeroContext'
import ClipLoader from 'react-spinners/ClipLoader'
import Snowfall from 'react-snowfall'
const doubleStruckMap = {
  A: '𝔸',
  B: '𝔹',
  C: 'ℂ',
  D: '𝔻',
  E: '𝔼',
  F: '𝔽',
  G: '𝔾',
  H: 'ℍ',
  I: '𝕀',
  J: '𝕁',
  K: '𝕂',
  L: '𝕃',
  M: '𝕄',
  N: 'ℕ',
  O: '𝕆',
  P: 'ℙ',
  Q: 'ℚ',
  R: 'ℝ',
  S: '𝕊',
  T: '𝕋',
  U: '𝕌',
  V: '𝕍',
  W: '𝕎',
  X: '𝕏',
  Y: '𝕐',
  Z: 'ℤ',
  a: '𝕒',
  b: '𝕓',
  c: '𝕔',
  d: '𝕕',
  e: '𝕖',
  f: '𝕗',
  g: '𝕘',
  h: '𝕙',
  i: '𝕚',
  j: '𝕛',
  k: '𝕜',
  l: '𝕝',
  m: '𝕞',
  n: '𝕟',
  o: '𝕠',
  p: '𝕡',
  q: '𝕢',
  r: '𝕣',
  s: '𝕤',
  t: '𝕥',
  u: '𝕦',
  v: '𝕧',
  w: '𝕨',
  x: '𝕩',
  y: '𝕪',
  z: '𝕫',
}

const snowflake2 = document.createElement('img')
snowflake2.src = 'src/img/snowflake.png'
const images = [snowflake2]

const toDoubleStruck = (text) => {
  return text
    .split('')
    .map((char) => doubleStruckMap[char] || char)
    .join('')
}

const Hero = () => {
  const { language } = useContext(LanguageContext)
  const { fetchHeros, heros } = useContext(HeroContext)

  useEffect(() => {
    fetchHeros()
  }, [fetchHeros])

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
    <section className='relative h-screen bg-winter3 bg-no-repeat bg-cover bg-center flex items-center'>
      {/* Overlay */}
      <div className='absolute inset-0 bg-black opacity-50'>
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
            {toDoubleStruck(getHeroText(0))}
          </div>

          {/* Title */}
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6'>
            {getHeroText(1)}
          </h1>

          {/* Subtitle */}
          <p className='text-lg sm:text-xl md:text-2xl text-white mb-8'>
            {getHeroText(2)}
          </p>

          {/* CTA Button */}
          <Link
            to='/products'
            className='bg-black text-white px-6 py-3 rounded-full uppercase font-semibold
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
