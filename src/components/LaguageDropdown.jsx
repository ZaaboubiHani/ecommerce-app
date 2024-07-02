import React, { useState, useContext, useRef, useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { LanguageContext } from '../contexts/LanguageContext';
import DZ from '../img/dz.png';
import FR from '../img/fr.png';
import UK from '../img/uk.png';

const LanguageDropdown = () => {
    const { language, changeLanguage } = useContext(LanguageContext);
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

    return (
        <div className="relative flex flex-col items-center w-[120px]" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className='bg-white p-2 w-full flex items-center justify-between
                           font-bold text-l rounded-lg tracking-wider border-4 border-transparent active:border-white
                           duration-300 active:text-white'
            >
                <div></div>
                {language === 'ar' ? (<img className='h-[20px]' src={DZ} alt="" />) :
                    language === 'fr' ? (<img className='h-[20px]' src={FR} alt="" />) :
                        (<img className='h-[20px]' src={UK} alt="" />)
                }
                {!isOpen ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}
            </button>
            {isOpen && (
                <div className='bg-white absolute top-[50px] flex flex-col items-start rounded-lg p-1 w-full shadow-lg'>
                    <div
                        onClick={() => {
                            changeLanguage('ar');
                            setIsOpen(false);
                        }}
                        className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer rounded-l border-l-transparent'
                    >
                        <h3>العربية</h3>
                        <img className='h-[20px]' src={DZ} alt="" />
                    </div>
                    <div
                        onClick={() => {
                            changeLanguage('fr');
                            setIsOpen(false);
                        }}
                        className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer rounded-l border-l-transparent'
                    >
                        <h3>Français</h3>
                        <img className='h-[20px]' src={FR} alt="" />
                    </div>
                    <div
                        onClick={() => {
                            changeLanguage('en');
                            setIsOpen(false);
                        }}
                        className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer rounded-l border-l-transparent'
                    >
                        <h3>English</h3>
                        <img className='h-[20px]' src={UK} alt="" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageDropdown;
