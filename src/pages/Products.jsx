import React, { useContext, useState, useEffect, useRef } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import Product from '../components/Product'
import CategoryDropdown from '../components/CategoryDropdown'
import { LanguageContext } from '../contexts/LanguageContext'
import SearchField from '../components/SearchField'
import ClipLoader from 'react-spinners/ClipLoader'
import { TbMoodEmpty } from 'react-icons/tb'

const Products = () => {
  const { products, loadingProducts, limitReached, fetchMoreProducts } =
    useContext(ProductContext)
  const { language } = useContext(LanguageContext)
  const loadingRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (
        loadingRef.current &&
        loadingRef.current.getBoundingClientRect().top <= window.innerHeight
      ) {
        loadMore()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [loadingMoreProducts, setLoadingMoreProducts] = useState(false)
  const loadMore = async () => {
    if (!loadingMoreProducts) {
      setLoadingMoreProducts(true)
      await fetchMoreProducts()
      setLoadingMoreProducts(false)
    }
  }

  return (
    <div>
      <section className='py-16 bg-gray-100 mt-16'>
        <div className='container mx-auto px-2 sm:px-4'>
          <div
            className={`flex ${
              language === 'ar' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <CategoryDropdown />
            <SearchField />
          </div>
          {loadingProducts ? (
            <section className='h-screen flex justify-center items-center'>
              <ClipLoader />
            </section>
          ) : products.length === 0 ? (
            <section className='h-screen flex justify-center items-center text-2xl'>
              {language === 'ar'
                ? 'دون نتائج'
                : language === 'fr'
                ? 'Aucun résultat'
                : 'No results'}
              <TbMoodEmpty className='text-2xl mx-2' />
            </section>
          ) : (
            <div>
              <div className='grid grid-cols-2 gap-2 sm:gap-4 mt-4'>
                {products.map((product) => (
                  <div key={product._id} className='px-1'>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              {!limitReached ? (
                <div ref={loadingRef} className='text-center mt-4'>
                  <ClipLoader />
                </div>
              ) : (
                <div className='text-center mt-4'></div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Products
