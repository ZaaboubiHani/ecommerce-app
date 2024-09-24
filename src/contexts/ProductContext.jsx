import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react'
export const ProductContext = createContext()
import axios from 'axios'
import Api from '../api/api.source'
const apiInstance = Api.instance
import { CategoryContext } from './CategoryContext'
import { SearchContext } from './SearchContext'

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [newProducts, setNewProducts] = useState([])
  const [randomProducts, setRandomProducts] = useState([])
  const [bestsellings, setBestsellings] = useState([])
  const [promotions, setPromotions] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [limitReached, setLimitReached] = useState(false)

  const page = useRef(1)
  const pageLimit = useRef(1)
  const localLoadingProducts = useRef(false)
  const source = useRef(null)

  // Context values
  const { category, fetchCategories } = useContext(CategoryContext)
  const { text } = useContext(SearchContext)

  // Persist category in a ref to ensure it is available across renders
  const categoryRef = useRef(category)

  // Update categoryRef whenever the category changes
  useEffect(() => {
    categoryRef.current = category
  }, [category])

  // Fetch products based on category and other filters
  const fetchProducts = async () => {
    await fetchCategories()

    const response = await apiInstance.getAxios().get('/products', {
      params: {
        page: 1,
        limit: 10,
        category: categoryRef.current?._id, // Use categoryRef for consistent value
      },
      cancelToken: source?.current?.token,
    })

    if (response.status === 200) {
      const totalPages = response.data.totalPages
      pageLimit.current = totalPages
      setProducts(response.data.docs)
      setLoadingProducts(false)
      if (response.data.docs.length < 10) {
        page.current = pageLimit.current + 1
        setLimitReached(true)
      }
    }
  }

  // Fetch single product
  const fetchSingleProduct = async (id) => {
    await fetchCategories()

    const response = await apiInstance.getAxios().get(`/products/${id}`)

    if (response.status === 200) {
      return response.data
    }
  }

  // Get new products
  const getNewProducts = async () => {
    const response = await apiInstance.getAxios().get('/products', {
      params: {
        page: 1,
        limit: 10,
        new: true,
      },
      cancelToken: source?.current?.token,
    })
    setNewProducts(response.data.docs)
  }

  // Get random products
  const getRandomProducts = async () => {
    const response = await apiInstance.getAxios().get('/products/random', {
      params: {
        number: 5,
      },
      cancelToken: source?.current?.token,
    })

    setRandomProducts(response.data)
  }

  // Get products on sale
  const getPromotions = async () => {
    const response = await apiInstance.getAxios().get('/products', {
      params: {
        page: 1,
        limit: 10,
        isSale: true,
      },
      cancelToken: source?.current?.token,
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
      cancelToken: source?.current?.token,
    })

    setBestsellings(response.data.docs)
  }

  // Reload products when category or search text changes
  const reloadProducts = async () => {
    try {
      setLoadingProducts(true)
      localLoadingProducts.current = true
      page.current = 1
      setLimitReached(false)
      if (source.current) {
        source.current.cancel('Operation canceled due to new request.')
      }

      source.current = axios.CancelToken.source()
      const response = await apiInstance.getAxios().get('/products', {
        params: {
          page: 1,
          limit: 10,
          category: categoryRef.current?._id, // Use categoryRef for consistent value
          name: text,
        },
        cancelToken: source?.current?.token,
      })
      if (response.status === 200) {
        pageLimit.current = response.data.totalPages
        setProducts([...response.data.docs])
        setLoadingProducts(false)
        localLoadingProducts.current = false
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message)
      } else {
        console.error('Error:', error.message)
      }
      setLoadingProducts(false)
      localLoadingProducts.current = false
    }
  }

  // Fetch more products for pagination
  const fetchMoreProducts = async () => {
    if (page.current <= pageLimit.current && !localLoadingProducts.current) {
      page.current = page.current + 1

      const response = await apiInstance.getAxios().get('/products', {
        params: {
          page: page.current,
          limit: 10,
          category: categoryRef.current?._id, // Use categoryRef for consistent value
          name: text,
        },
        cancelToken: source?.current?.token,
      })

      if (response.status === 200) {
        pageLimit.current = response.data.totalPages
        setProducts((prev) => [...prev, ...response.data.docs])
      }
    }
    if (pageLimit.current < page.current && !localLoadingProducts.current) {
      setLimitReached(true)
    }
  }

  // Fetch products, new products, random products, etc. on initial load
  useEffect(() => {
    fetchProducts()
    getNewProducts()
    getRandomProducts()
    getBestsellings()
    getPromotions()
  }, [])

  // Reload products when category or search text changes
  useEffect(() => {
    reloadProducts()
  }, [category, text])

  return (
    <ProductContext.Provider
      value={{
        products,
        newProducts,
        promotions,
        randomProducts,
        bestsellings,
        loadingProducts,
        limitReached,
        fetchMoreProducts,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
