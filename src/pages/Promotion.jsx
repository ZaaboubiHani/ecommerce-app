import React, { useContext } from 'react'
import Product from '../components/Product'
import ClipLoader from 'react-spinners/ClipLoader'
import { ProductContext } from '../contexts/ProductContext'
import { LanguageContext } from '../contexts/LanguageContext'

const Promotion = () => {
  const { promotions, loadingProducts } = useContext(ProductContext)
  const { language } = useContext(LanguageContext)

  return (
    <div>
      <section className='py-16 bg-white mt-16'>
        <div className='container mx-auto px-2 sm:px-4'>
          {loadingProducts ? (
            <section className='h-screen flex justify-center items-center'>
              <ClipLoader />
            </section>
          ) : promotions.length > 0 ? (
            <div>
              <div className='grid grid-cols-2 gap-2 sm:gap-4 mt-4'>
                {promotions.map((product) => (
                  <div key={product._id} className='px-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1 className='text-center text-2xl'>
              {language === 'ar'
                ? 'لا عروض ترويجية'
                : language === 'fr'
                ? 'Aucune promotion'
                : 'No promotions'}
            </h1>
          )}
        </div>
      </section>
    </div>
  )
}

export default Promotion
