import React, { useContext, useState, useEffect, useRef } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Hero';
import CategoryDropdown from '../components/CategoryDropdown';
import { LanguageContext } from '../contexts/LanguageContext';
import SearchField from '../components/SearchField';
const Home = () => {
  const { products,
    loadingProducts,
    limitReached,
    fetchMoreProducts,
  } = useContext(ProductContext);
  const { language } = useContext(LanguageContext);
  const loadingRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (
        loadingRef.current &&
        loadingRef.current.getBoundingClientRect().top <= window.innerHeight
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  let [loadingMoreProducts, setLoadingMoreProducts] = useState(false);
  const loadMore = async () => {
    if (!loadingMoreProducts) {
      setLoadingMoreProducts(true);
      loadingMoreProducts = true;
      await fetchMoreProducts();
      loadingMoreProducts = false;
      setLoadingMoreProducts(false);
    }
  };


  return <div className='mb-8'>
    <Hero />
    <section className='py-16 bg-gray-100'>
      <div className="container mx-auto">
        <div className='flex flex-row'>
          <CategoryDropdown />
          <SearchField />
        </div>
        {
          loadingProducts ? <section className='h-screen flex justify-center items-center '>
            {language === 'ar' ? '...تحميل' : language === 'fr' ? 'Chargement...' : 'Loading...'}
          </section> :
            <div>
              <div className='grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm max-auto md:max-w-none md:mx-0 '>
                {products.map(product => {
                  return <Product product={product} key={product._id} />
                })}
              </div>
              {!limitReached ?
                <div ref={loadingRef} className="text-center mt-4">
                  {language === 'ar' ? '...تحميل' : language === 'fr' ? 'Chargement...' : 'Loading...'}
                </div>
                : <div className="text-center mt-4"></div>
              }
            </div>
        }

      </div>
    </section>
  </div>;
};

export default Home;
