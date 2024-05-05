import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails'
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Checkout from './pages/Checkout';
import { SnackbarContext } from './contexts/SnackbarContext';
const App = () => {
  const { message, isOpen } = useContext(SnackbarContext);
  return <div className='overflow-hidden'>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/checkout' element={<Checkout />} />
      </Routes>
      <Sidebar />
      <Footer />
      <div className={`fixed z-50 ${isOpen ? 'bottom-4' : '-bottom-12'} w-full flex justify-center items-center transition-all duration-300`}>
        <div className='w-min-[300px] h-12 bg-green-500 flex justify-center items-center rounded-lg px-4 text-white'>
          {message}
        </div>
      </div>
    </Router>
  </div>;
};

export default App;
