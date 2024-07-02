import React, { useState, useContext,useRef,useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CategoryContext } from '../contexts/CategoryContext';
import { LanguageContext } from '../contexts/LanguageContext';
const CategoryDropdown = ({onSelect}) => {
    const { categories, changeCategory, category } = useContext(CategoryContext);
    const { language } = useContext(LanguageContext);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return <div className="relative flex flex-col items-center w-[150px]" ref={dropdownRef}>
        <button onClick={() => setIsOpen((prev) => !prev)} className='bg-white p-2 w-full flex items-center justify-between
    text-l tracking-wider border border-1 border-black rounded-lg transition-all
    duration-300'>
            {language === 'ar' ? category?.arName ?? 'أصناف' : language === 'fr' ? category?.frName ?? 'Catégories' : category?.engName ?? 'Categories'}
            {!isOpen ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}
        </button>
        {
            isOpen && (
                <div className='bg-white absolute top-[45px] flex flex-col items-start p-1 w-full z-20
                border border-1 border-black shadow-md rounded-lg
                '>
                    <div
                        key={0}
                        onClick={() => {
                            changeCategory(undefined);
                            setIsOpen(false);
                            onSelect();
                        }} className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'>
                        <h3>{language === 'ar' ? 'كل شيء' : language === 'fr' ? 'Tout' : 'Everything'}</h3>
                    </div>
                    {
                        categories.map((category) => (<div
                            key={category._id}
                            onClick={() => {
                                changeCategory(category);
                                setIsOpen(false);
                                onSelect();
                            }} className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'>
                            <h3>{language === 'ar' ? category.arName : language === 'fr' ? category.frName : category.engName}</h3>
                        </div>
                        ))
                    }
                </div>
            )
        }
    </div>
        ;
};

export default CategoryDropdown;