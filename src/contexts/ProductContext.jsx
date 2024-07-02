import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
export const ProductContext = createContext();
import axios from 'axios';
import Api from '../api/api.source';
const apiInstance = Api.instance;
import { CategoryContext } from './CategoryContext';
import { SearchContext } from './SearchContext';

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [limitReached, setLimitReached] = useState(false);

  const page = useRef(1);
  const pageLimit = useRef(1);
  const localLoadingProducts = useRef(false);
  const { category } = useContext(CategoryContext);
  const { text } = useContext(SearchContext);
  const source = useRef(null);

  const fetchProducts = async () => {
    const response = await apiInstance.getAxios().get(`/products`, {
      params: {
        page: 1,
        limit: 10,
        category: category?._id,
      },
      cancelToken: source?.current?.token,
    });

    if (response.status === 200) {
      const totalPages = response.data.totalPages;
      pageLimit.current = totalPages;
      setProducts(response.data.docs);
      setLoadingProducts(false);
      if (response.data.docs.length < 10) {
        page.current = pageLimit.current + 1;
        setLimitReached(true);
      }
    }
  };

  const reloadProducts = async () => {
    try {


      setLoadingProducts(true);
      localLoadingProducts.current = true;
      page.current = 1;
      setLimitReached(false);
      if (source.current) {
        source.current.cancel('Operation canceled due to new request.');
      }

      source.current = axios.CancelToken.source();
      const response = await apiInstance.getAxios().get(`/products`, {
        params: {
          page: 1,
          limit: 10,
          category: category?._id,
          name: text,
        },
        cancelToken: source?.current?.token,
      });
      if (response.status === 200) {
        pageLimit.current = response.data.totalPages;
        setProducts(prev => ([...response.data.docs]));
        setLoadingProducts(false);
        localLoadingProducts.current = false;
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Error:', error.message);
      }
      setLoadingProducts(false); // Ensure loading state is set to false
      localLoadingProducts.current = false;
    }
  };


  const fetchMoreProducts = async () => {
    if (page.current <= pageLimit.current && !localLoadingProducts.current) {
      page.current = page.current + 1;
      const response = await apiInstance.getAxios().get(`/products`, {
        params: {
          page: page.current,
          limit: 10,
          category: category?._id,
          name: text,
        },
        cancelToken: source?.current?.token,
      });
      if (response.status === 200) {
        pageLimit.current = response.data.totalPages;
        setProducts(prev => ([...prev, ...response.data.docs]));
      }
    }
    if (pageLimit.current < page.current && !localLoadingProducts.current) {
      setLimitReached(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {

    reloadProducts();

  }, [category, text]);

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
