import React, { useState, useContext } from 'react';
import { CiSearch } from "react-icons/ci";
import { LanguageContext } from '../contexts/LanguageContext';
import { SearchContext } from '../contexts/SearchContext';
const SearchField = () => {

    const { language } = useContext(LanguageContext);
    const { changeSearch } = useContext(SearchContext);
    return <div className="relative flex flex-row items-center w-[180px] border border-1 border-black mx-2 bg-white rounded-lg">
        <input
        onChange={(event)=>changeSearch(event.target.value.length === 0 ? undefined : event.target.value)}
        className='bg-white p-2 w-full flex items-center justify-between
    text-l focus:border-transparent focus:ring-0 outline-none rounded-lg'
            type="text"
            placeholder={language === 'ar' ? 'بحث' : language === 'fr' ? 'Recherche' : 'Search'} >
        </input>
        <CiSearch className='mx-4 text-xl ' />
    </div>;
};

export default SearchField;