import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProductProvider from './contexts/ProductContext';
import SidebarProvider from './contexts/SidebarContext';
import CartProvider from './contexts/CartContext';
import LanguageProvider from './contexts/LanguageContext';
import CategoryProvider from './contexts/CategoryContext';
import SearchProvider from './contexts/SearchContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LanguageProvider>
    <CategoryProvider>
      <SearchProvider>
        <SidebarProvider>
          <CartProvider>
            <ProductProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </ProductProvider>
          </CartProvider>
        </SidebarProvider>
      </SearchProvider>
    </CategoryProvider>
  </LanguageProvider>
);
