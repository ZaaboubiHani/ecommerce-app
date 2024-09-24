import { createContext, useState, useEffect } from 'react'
import Api from '../api/api.source'
export const CategoryContext = createContext()
const apiInstance = Api.instance

const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState()

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    apiInstance
      .getAxios()
      .get('/categories')
      .then((response) => {
        setCategories(response.data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const changeCategory = (category) => {
    setCategory(category)
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        category,
        changeCategory,
        fetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryProvider
