import React, { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import Product from '../components/Product'
import Hero from '../components/Hero'
import { LanguageContext } from '../contexts/LanguageContext'
import ClipLoader from 'react-spinners/ClipLoader'
import BestsellingCarousel from '../components/BestsellingCarousel'
import TitleCard from '../components/TitleCard'

const Home = () => {
  const { loadingProducts, newProducts, randomProducts, bestsellings } =
    useContext(ProductContext)
  const { language } = useContext(LanguageContext)

  // Helper function to get localized titles
  const getTitle = (ar, fr, en) => {
    return language === 'ar' ? ar : language === 'fr' ? fr : en
  }

  return (
    <div className='bg-cover bg-white'>
      <Hero />

      {/* New Collection Section */}
      <TitleCard
        title={getTitle(
          'مجموعة جديدة',
          'Nouvelle Collection',
          'New Collection'
        )}
      />
      <section className=''>
        {loadingProducts ? (
          <section className='h-screen flex justify-center items-center '>
            <ClipLoader />
          </section>
        ) : (
          <div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 my-4 lg:mx-16'>
              {newProducts.map((product) => (
                <div key={product._id} className='px-1'>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Recommendations Section */}
      <TitleCard
        title={getTitle('مقترحات', 'Recommandations', 'Recommendations')}
      />
      <section>
        {loadingProducts ? (
          <section className='h-screen flex justify-center items-center '>
            <ClipLoader />
          </section>
        ) : (
          <div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 my-4 lg:mx-16'>
              {randomProducts.map((product) => (
                <div key={product._id} className='px-1'>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Bestselling Section */}
      <TitleCard
        title={getTitle('الأكثر مبيعا', 'Best-Seller', 'Bestselling')}
      />
      <BestsellingCarousel products={bestsellings} />
    </div>
  )
}

export default Home
