// Products component
import React, { useContext, useEffect, useRef, useState } from 'react'
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
  const [loadingMore, setLoadingMore] = useState(false)

  const handleScroll = () => {
    if (
      loadingRef.current &&
      loadingRef.current.getBoundingClientRect().top <= window.innerHeight
    ) {
      loadMoreProducts()
    }
  }

  const loadMoreProducts = async () => {
    if (!loadingMore && !limitReached) {
      setLoadingMore(true)
      await fetchMoreProducts()
      setLoadingMore(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const renderLoading = () => (
    <section className='h-screen flex justify-center items-center'>
      <ClipLoader />
    </section>
  )

  const renderNoResults = () => (
    <section className='h-screen flex justify-center items-center text-2xl'>
      {language === 'ar'
        ? 'دون نتائج'
        : language === 'fr'
        ? 'Aucun résultat'
        : 'No results'}
      <TbMoodEmpty className='text-2xl mx-2' />
    </section>
  )

  const renderProducts = () => (
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mt-4'>
        {products.map((product) => (
          <div key={product._id} className='px-1'>
            <Product product={product} />
          </div>
        ))}
      </div>
      {!limitReached && (
        <div ref={loadingRef} className='flex justify-center mt-4'>
          <ClipLoader />
        </div>
      )}
    </div>
  )

  return (
    <div>
      <section className='py-16 bg-[#dbdee3] mt-12'>
        <div className='container mx-auto px-2 sm:px-4'>
          <div
            className={`flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 ${
              language === 'ar' ? 'sm:flex-row-reverse' : 'sm:flex-row'
            }`}
          >
            <CategoryDropdown />
            <SearchField />
          </div>
          {loadingProducts
            ? renderLoading()
            : products.length === 0
            ? renderNoResults()
            : renderProducts()}
        </div>
      </section>
    </div>
  )
}

export default Products
