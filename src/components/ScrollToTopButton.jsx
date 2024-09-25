import React from 'react'

import { FaArrowUp } from 'react-icons/fa'

const ScrollToTopButton = () => {
  return (
    <div
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }}
      className='fixed text-black text-l cursor-pointer z-50 right-4 bottom-8 
        bg-[#9ec3e3] shadow-xl p-4 rounded-full border border-white
  hover:bottom-10 transition-all duration-300'
    >
      <FaArrowUp />
    </div>
  )
}

export default ScrollToTopButton
