import { useContext, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ProductContext } from '../contexts/ProductContext'
import Product from '../components/Product'
import CategoryDropdown from '../components/CategoryDropdown'
import { LanguageContext } from '../contexts/LanguageContext'
import SearchField from '../components/SearchField'
import ClipLoader from 'react-spinners/ClipLoader'
import { TbMoodEmpty } from 'react-icons/tb'

const Products = () => {
  const { products, loading, hasNextPage, fetchProducts, paginateProducts } =
    useContext(ProductContext)
  const { language } = useContext(LanguageContext)

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
        {products?.map((product) => (
          <div key={product._id} className='px-1'>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div>
      <section className='py-16 bg-[#ffd3c2] mt-12'>
        <div className='container mx-auto px-2 sm:px-4'>
          <div
            className={`flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 ${
              language === 'ar' ? 'sm:flex-row-reverse' : 'sm:flex-row'
            }`}
          >
            <CategoryDropdown />
            <SearchField />
          </div>

          {products.length === 0 && !loading ? (
            renderNoResults()
          ) : (
            <InfiniteScroll
              dataLength={products.length} // This is important to detect scroll position
              next={paginateProducts} // Function to fetch the next batch of products
              hasMore={hasNextPage} // Determines whether to load more data
              loader={
                <div className='flex justify-center items-center py-4'>
                  <ClipLoader />
                </div>
              }
            >
              {renderProducts()}
            </InfiniteScroll>
          )}
        </div>
      </section>
    </div>
  )
}

export default Products
