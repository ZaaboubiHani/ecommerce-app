import React, { createContext, useState, useEffect, useContext } from 'react';
export const ProductContext = createContext();
import Api from '../api/api.source';
const apiInstance = Api.instance;
import { CategoryContext } from './CategoryContext';
import { PaginationContext } from './PaginationContext';

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { assignLimit, page } = useContext(PaginationContext);
  const { category } = useContext(CategoryContext);
  const fetchProducts = async () => {
    setLoadingProducts(true);
    apiInstance.getAxios().get(`/products`,
      {
        params: {
          page: page,
          limit: 1,
        }
      }
    )
      .then(response => {
        console.log('response: ', response.data);
        assignLimit(response.data.totalPages)
        setProducts(response.data.docs);
        setLoadingProducts(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoadingProducts(false);
      });

  };
  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page]);
  return <ProductContext.Provider value={{ products, loadingProducts }}>
    {children}
  </ProductContext.Provider>;
};

export default ProductProvider;
