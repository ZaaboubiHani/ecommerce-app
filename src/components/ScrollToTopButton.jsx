import React from 'react';

import { FaArrowUp } from "react-icons/fa";

const ScrollToTopButton = () => {
    return <div
        onClick={() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }}
        className='fixed cursor-pointer z-50 right-4 bottom-8 bg-pink-100 shadow-xl p-4 rounded-full border border-pink-300
  hover:bottom-10 transition-all duration-300'>
        <FaArrowUp />
    </div>;
};

export default ScrollToTopButton;
