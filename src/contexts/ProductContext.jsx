import React, { createContext, useState, useEffect, useContext } from 'react';
export const ProductContext = createContext();
import Api from '../api/api.source';
const apiInstance = Api.instance;
import { CategoryContext } from './CategoryContext';

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [limitReached, setLimitReached] = useState(false);

  let [page, setPage] = useState(1);
  let [pageLimit, setPageLimit] = useState(1);
  const { category } = useContext(CategoryContext);

  const fetchProducts = async () => {
    const response = await apiInstance.getAxios().get(`/products`, {
      params: {
        page: page,
        limit: 10,
        category: category?._id,
      }
    });

    if (response.status === 200) {
      const totalPages = response.data.totalPages;
      setPageLimit(prev => (totalPages));
      setProducts(response.data.docs);
      setLoadingProducts(false);
    }
  };


  const fetchMoreProducts = async () => {
    if (page <= pageLimit) {
      setPage(prev => (prev + 1));
      page = page + 1;
      const response = await apiInstance.getAxios().get(`/products`, {
        params: {
          page: page,
          limit: 10,
          category: category?._id,
        },
      });
      if (response.status === 200) {
        setPageLimit(response.data.totalPages);
        pageLimit = response.data.totalPages;
        setProducts(prev=>([...prev,...response.data.docs]));
      }

    }
    if(pageLimit < page){
      setLimitReached(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <ProductContext.Provider value={{
    products,
    loadingProducts,
    limitReached,
    fetchMoreProducts,
  }}>
    {children}
  </ProductContext.Provider>;
};

export default ProductProvider;
