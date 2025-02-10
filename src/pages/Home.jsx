import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import Product from '../components/Product'
import Hero from '../components/Hero'
import { LanguageContext } from '../contexts/LanguageContext'
import ClipLoader from 'react-spinners/ClipLoader'
import BestsellingCarousel from '../components/BestsellingCarousel'
import TitleCard from '../components/TitleCard'
import phoneBg from '../assets/phone.svg'
import screenBg from '../assets/screen.svg'

// Reusable section wrapper with clean background
const SectionWrapper = ({ children, extraClasses = '', id }) => (
  <section
    id={id} // <-- Forward the id prop here
    className={`relative py-16 bg-cover bg-center ${extraClasses}`}
    style={{ backgroundImage: `url(${phoneBg})`, transform: 'scale(1.01)' }}
  >
    {/* Clean screen background for md+ */}
    <div
      className='hidden md:block absolute inset-0 bg-cover bg-center z-0'
      style={{
        backgroundImage: `url(${screenBg})`,
        transform: 'scale(1.01)', // Crops off a few pixels to remove any white border
      }}
    />
    {/* Content container */}
    <div className='container mx-auto px-4 z-20 relative'>{children}</div>
  </section>
)

const Home = () => {
  const {
    loadingProducts,
    newProducts,
    randomProducts,
    bestsellings,
    getNewProducts,
    getRandomProducts,
    getBestsellings,
  } = useContext(ProductContext)
  const { language } = useContext(LanguageContext)

  // Helper function to get localized titles
  const getTitle = (ar, fr, en) =>
    language === 'ar' ? ar : language === 'fr' ? fr : en

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getNewProducts(),
        getRandomProducts(),
        getBestsellings(),
      ])
    }
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='bg-white'>
      <Hero />

      {/* New Collection Section */}
      <SectionWrapper extraClasses='min-h-[600px]' id='new-collection'>
        <TitleCard
          title={getTitle(
            'مجموعة جديدة',
            'Nouvelle Collection',
            'New Collection'
          )}
        />
        {loadingProducts ? (
          <div className='h-[300px] flex justify-center items-center'>
            <ClipLoader size={60} color='#714920' />
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 my-8 lg:mx-16'>
            {newProducts.map((product) => (
              <div
                key={product._id}
                className='px-2 transition-all duration-300'
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Recommendations Section */}
      <SectionWrapper extraClasses='min-h-[600px]'>
        <TitleCard title={getTitle('مقترحات', 'Sélection', 'Picks')} />
        {loadingProducts ? (
          <div className='h-[300px] flex justify-center items-center'>
            <ClipLoader size={60} color='#714920' />
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 my-8 lg:mx-16'>
            {randomProducts.map((product) => (
              <div
                key={product._id}
                className='px-2 transition-all duration-300'
              >
                <Product product={product} />
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      {/* Bestselling Section */}
      <SectionWrapper extraClasses='min-h-[600px]'>
        <TitleCard
          title={getTitle('الأكثر مبيعا', 'Best-Seller', 'Bestselling')}
        />
        {loadingProducts ? (
          <div className='h-[300px] flex justify-center items-center'>
            <ClipLoader size={60} color='#714920' />
          </div>
        ) : (
          <BestsellingCarousel products={bestsellings} />
        )}
      </SectionWrapper>
    </div>
  )
}

export default Home
