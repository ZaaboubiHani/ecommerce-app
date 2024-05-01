import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Hero';
import CategoryDropdown from '../components/CategoryDropdown';
import { LanguageContext } from '../contexts/LanguageContext';
import Pagination from '../components/Pagination';
const Home = () => {
  const { products, loadingProducts } = useContext(ProductContext);
  const { language } = useContext(LanguageContext);
  return <div>
    <Hero />
    <section className='py-16'>
      <div className="container mx-auto">
        <CategoryDropdown />
        {
          loadingProducts ? <section className='h-screen flex justify-center items-center'>
             {language === 'ar' ? '...تحميل' : language === 'fr' ? 'Chargement...' : 'Loading...'}  
          </section> :
            <div className='grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm max-auto md:max-w-none md:mx-0'>
              {products.map(product => {
                return <Product product={product} key={product._id} />
              })}
            </div>
        }
        <Pagination />
      </div>
    </section>
  </div>;
};

export default Home;
