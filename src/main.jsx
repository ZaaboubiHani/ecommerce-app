import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import ProductProvider from './contexts/ProductContext'
import SidebarProvider from './contexts/SidebarContext'
import CartProvider from './contexts/CartContext'
import LanguageProvider from './contexts/LanguageContext'
import CategoryProvider from './contexts/CategoryContext'
import SearchProvider from './contexts/SearchContext'
import SnackbarProvider from './contexts/SnackbarContext'
import MenuProvider from './contexts/MenuContext'
import HeroProvider from './contexts/HeroContext'
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HeroProvider>
    <LanguageProvider>
      <MenuProvider>
        <CategoryProvider>
          <SearchProvider>
            <SidebarProvider>
              <CartProvider>
                <SnackbarProvider>
                  <ProductProvider>
                    <App />
                  </ProductProvider>
                </SnackbarProvider>
              </CartProvider>
            </SidebarProvider>
          </SearchProvider>
        </CategoryProvider>
      </MenuProvider>
    </LanguageProvider>
  </HeroProvider>
)
