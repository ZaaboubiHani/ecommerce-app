import React, { useContext, useEffect } from 'react'
import Product from '../components/Product'
import ClipLoader from 'react-spinners/ClipLoader'
import { ProductContext } from '../contexts/ProductContext'
import { LanguageContext } from '../contexts/LanguageContext'
import PromotionCard from '../components/PromotionCard'

const Promotion = () => {
  const { promotions, loadingProducts, getPromotions } =
    useContext(ProductContext)
  const { language } = useContext(LanguageContext)

  useEffect(() => {
    const fetchData = async () => {
      await getPromotions()
    }
    fetchData()
  }, [])

  // Helper function for localized titles
  const getTitle = (ar, fr, en) => {
    return language === 'ar' ? ar : language === 'fr' ? fr : en
  }

  return (
    <div>
      {/* Discounts Title Section */}

      <section className='py-16 bg-[#ffd3c2] mt-8'>
        {/* <PromotionCard title={getTitle('تخفيضات', 'Promotions', 'Discounts')} /> */}
        <div className='container mx-auto px-2 sm:px-4'>
          {loadingProducts ? (
            <section className='h-screen flex justify-center items-center'>
              <ClipLoader />
            </section>
          ) : promotions.length > 0 ? (
            <div>
              {/* Products Grid - Same Grid Layout as Products Component */}
              <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mt-4'>
                {promotions.map((product) => (
                  <div key={product._id} className='px-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1 className='text-center text-2xl'>
              {getTitle('لا عروض ترويجية', 'Aucune promotion', 'No promotions')}
            </h1>
          )}
        </div>
      </section>
    </div>
  )
}

export default Promotion
