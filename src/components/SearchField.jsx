import React, { useState, useContext } from 'react';
import { CiSearch } from "react-icons/ci";
import { LanguageContext } from '../contexts/LanguageContext';
const SearchField = () => {

    const { language } = useContext(LanguageContext);
    return <div className="relative flex flex-row items-center w-[180px] border border-1 border-black ml-2">
        <input className='bg-white p-2 w-full flex items-center justify-between
    text-l tracking-wider border-transparent active:border-transparent
    duration-300' type="text" placeholder={language === 'ar' ? 'بحث' : language === 'fr' ? 'Recherche' : 'Search'} >

        
    </input>
    <CiSearch className='mx-2 text-xl'/>
    </div>
        ;
};

export default SearchField;