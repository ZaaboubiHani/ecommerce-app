import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react'
import axios from 'axios'
import Api from '../api/api.source'

import { CategoryContext } from './CategoryContext'
import { SearchContext } from './SearchContext'

export const ProductContext = createContext()
const apiInstance = Api.instance

const ProductProvider = ({ children }) => {
  const [newProducts, setNewProducts] = useState([])
  const [randomProducts, setRandomProducts] = useState([])
  const [bestsellings, setBestsellings] = useState([])
  const [promotions, setPromotions] = useState([])

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1) // Current page
  const [hasNextPage, setHasNextPage] = useState(true) // Track if more data is available

  const { category } = useContext(CategoryContext)
  const { text } = useContext(SearchContext)

  useEffect(() => {
    fetchProducts() // Initial fetch on component mount
  }, [category, text])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setProducts([]) // Clear previous products
      setPage(1) // Reset to the first page

      const response = await apiInstance.getAxios().get(`/products?page=1`, {
        params: {
          limit: 12,
          name: text || '', // Add text filter if provided
          category: category?._id || '', // Add category filter if provided
        },
      })
      console.log('response', response.data)

      setProducts(response.data.docs) // Set initial products
      setPage(response.data.page)
      setHasNextPage(response.data.hasNextPage) // Update pagination state
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const paginateProducts = async () => {
    // Fetch additional products if available
    if (!hasNextPage || loading) return

    try {
      setLoading(true)
      const nextPage = page + 1 // Calculate the next page

      const response = await apiInstance
        .getAxios()
        .get(`/products?page=${nextPage}`, {
          params: {
            limit: 12,
            name: text || '', // Add text filter if provided
            category: category?._id || '', // Add category filter if provided
          },
        })

      setProducts((prevProducts) => [...prevProducts, ...response.data.docs]) // Append new products to the existing ones
      setPage(response.data.page)
      setHasNextPage(response.data.hasNextPage) // Update pagination state
    } catch (err) {
      console.error('Error fetching more products:', err)
    } finally {
      setLoading(false)
    }
  }

  const getNewProducts = async () => {
    const response = await apiInstance.getAxios().get('/products', {
      params: {
        page: 1,
        limit: 10,
        new: true,
      },
    })
    setNewProducts(response.data.docs)
  }

  // Get random products
  const getRandomProducts = async () => {
    const response = await apiInstance.getAxios().get('/products/random', {
      params: {
        number: 10,
      },
    })

    setRandomProducts(response.data)
  }

  // Get products on sale
  const getPromotions = async () => {
    const response = await apiInstance.getAxios().get('/products', {
      params: {
        page: 1,
        limit: 1000,
        isSale: true,
      },
    })

    setPromotions(response.data.docs)
  }

  // Get best-selling products
  const getBestsellings = async () => {
    const response = await apiInstance.getAxios().get('/products', {
      params: {
        page: 1,
        limit: 10,
        bestselling: true,
      },
    })

    setBestsellings(response.data.docs)
  }

  const fetchSingleProduct = async (id) => {
    try {
      const response = await apiInstance.getAxios().get(`/products/${id}`)

      if (response.status === 200) {
        return response.data
      } else {
        return null // Return null if the product is not found
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      return null // Return null in case of an error
    }
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        paginateProducts,
        hasNextPage,
        fetchProducts,
        getNewProducts,
        newProducts,
        randomProducts,
        bestsellings,
        promotions,
        getRandomProducts,
        getBestsellings,
        getPromotions,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
