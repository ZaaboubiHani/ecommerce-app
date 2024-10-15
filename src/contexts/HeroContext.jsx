import React, { createContext, useState, useEffect } from 'react'
export const HeroContext = createContext()
import axios from 'axios'
import Api from '../api/api.source'

const apiInstance = Api.instance

const HeroProvider = ({ children }) => {
  const [heros, setHeros] = useState([])

  // Fetch heros only once when the component mounts
  const fetchHeros = async () => {
    try {
      const response = await apiInstance.getAxios().get(`/heroes`)
      setHeros(response.data)
    } catch (error) {
      console.error('Error fetching heroes:', error)
    }
  }

  // Use useEffect to call fetchHeros once
  useEffect(() => {
    fetchHeros()
  }, []) // The empty dependency array ensures this runs only once

  return (
    <HeroContext.Provider value={{ fetchHeros, heros }}>
      {children}
    </HeroContext.Provider>
  )
}

export default HeroProvider
