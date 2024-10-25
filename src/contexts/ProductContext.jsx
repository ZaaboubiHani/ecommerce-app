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
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [limitReached, setLimitReached] = useState(false)

  const page = useRef(1)
  const pageLimit = useRef(1)
  const localLoadingProducts = useRef(false)
  const source = useRef(null)

  const { category, fetchCategories } = useContext(CategoryContext)
  const { text } = useContext(SearchContext)
  const categoryRef = useRef(category)

  useEffect(() => {
    categoryRef.current = category
  }, [category])

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories()
      await fetchProducts()
    }
    fetchData()
  }, [])

  const fetchProducts = async (resetPage = false) => {
    setLoadingProducts(true)
    if (resetPage) {
      page.current = 1
      setLimitReached(false)
    }

    if (source.current) {
      source.current.cancel('Operation canceled due to new request.')
    }
    source.current = axios.CancelToken.source()

    try {
      const response = await apiInstance.getAxios().get('/products', {
        params: {
          page: page.current,
          limit: 10,
          category: categoryRef.current?._id,
          name: text || undefined,
        },
        cancelToken: source.current.token,
      })

      if (response.status === 200) {
        pageLimit.current = response.data.totalPages
        setProducts((prev) =>
          resetPage ? response.data.docs : [...prev, ...response.data.docs]
        )
        setLimitReached(response.data.docs.length < 10)
      }
    } catch (error) {
      handleAxiosError(error)
    } finally {
      setLoadingProducts(false)
    }
  }

  const fetchMoreProducts = () => {
    if (page.current < pageLimit.current && !localLoadingProducts.current) {
      page.current += 1
      fetchProducts()
    }
  }

  const handleAxiosError = (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message)
    } else {
      console.error('Error:', error.message)
    }
  }

  useEffect(() => {
    fetchProducts(true)
  }, [category, text])

  return (
    <ProductContext.Provider
      value={{
        products,
        loadingProducts,
        limitReached,
        fetchMoreProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export default ProductProvider
