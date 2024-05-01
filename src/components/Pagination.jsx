import React, { useState, useContext } from 'react';
import { PaginationContext } from '../contexts/PaginationContext';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
const Pagination = () => {
    const { page, limit,increasePagination, decreasePagination } = useContext(PaginationContext);
    return <div className="relative flex flex-row items-center justify-between w-[150px]">
        <button 
        disabled={page === 1}
        onClick={() => decreasePagination()} 
        className='bg-white p-2 w-[45px] flex items-center justify-center
         text-l tracking-wider border border-1 border-black'>
            <FaArrowLeft className={page === 1 ? 'text-gray-300' : 'text-black'}/>
        </button>
        <div
            className='bg-white p-2 flex items-center justify-center
    text-l tracking-wider border border-1 border-black w-[50px]'>
            {page}
        </div>
        <button 
        disabled={page === limit}
        onClick={() => increasePagination()} 
        className='bg-white p-2 w-[45px] flex items-center justify-center
         text-l tracking-wider border border-1 border-black'>
            <FaArrowRight className={page === limit ? 'text-gray-300' : 'text-black'}/>
        </button>
    </div>
        ;
};

export default Pagination;