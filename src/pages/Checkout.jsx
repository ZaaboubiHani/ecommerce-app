import React, { useContext, useState, useEffect, useRef } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import wilayas from '../../public/data/wilayas.json';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CartContext } from '../contexts/CartContext';
const Checkout = () => {
    const { language } = useContext(LanguageContext);
    const { cart, total, itemAmount } = useContext(CartContext);
    const uniqueWilayas = [...new Set(wilayas.map(item => item.wilaya_name_ascii))];
    const [isWilayasOpen, setIsWilayasOpen] = useState(false);
    const [isCommunesOpen, setIsCommunesOpen] = useState(false);
    const [selectedWilaya, setSelectedWilaya] = useState();
    const [selectedCommune, setSelectedCommune] = useState();
    return <div className=' p-32'>
        <section className='grid grid-cols-1 mt-4 md:grid-cols-1 lg:grid-cols-2 gap-[30px] max-w-sm max-auto md:max-w-none md:mx-0'>
            <div className="relative flex flex-row items-center border border-1 border-black">
                <input
                    className='bg-white p-2 w-full flex items-center justify-between
    text-l focus:border-transparent focus:ring-0 outline-none'
                    type="text"
                    placeholder={language === 'ar' ? 'الإسم واللقب' : language === 'fr' ? 'Nom et Prénom' : 'First and Last name'} >
                </input>
            </div>
            <div className="relative flex flex-row items-center border border-1 border-black">
                <input
                    className='bg-white p-2 w-full flex items-center justify-between
    text-l focus:border-transparent focus:ring-0 outline-none'
                    type="text"
                    placeholder={language === 'ar' ? 'العنوان' : language === 'fr' ? 'Adresse' : 'Address'} >
                </input>
            </div>
            <div className="relative flex flex-row items-center border border-1 border-black">
                <input
                    className='bg-white p-2 w-full flex items-center justify-between
    text-l focus:border-transparent focus:ring-0 outline-none'
                    type="text"
                    placeholder={language === 'ar' ? 'رقم الهاتف 1' : language === 'fr' ? 'Numéro de téléphone 1' : 'Phone number 1'} >
                </input>
            </div>
            <div className="relative flex flex-row items-center border border-1 border-black">
                <input
                    className='bg-white p-2 w-full flex items-center justify-between
                    text-l focus:border-transparent focus:ring-0 outline-none'
                    type="text"

                    placeholder={language === 'ar' ? 'رقم الهاتف 2' : language === 'fr' ? 'Numéro de téléphone 2' : 'Phone number 2'} >
                </input>
            </div>
            <div className="relative flex flex-col items-start ">
                <div className='text-gray-400'>
                    Wilaya
                </div>
                <button onClick={() => {
                    setIsWilayasOpen((prev) => !prev);
                    setIsCommunesOpen(false);
                }} className='bg-white p-2 w-full flex items-center justify-between
    text-l tracking-wider border border-1 border-black
    duration-300'>
                    {selectedWilaya ?? 'Wilaya'}
                    {!isWilayasOpen ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}
                </button>
                {
                    isWilayasOpen && (
                        <div className='bg-white absolute top-[45px] flex flex-col items-start p-1 w-full z-10
                border border-1 border-black h-[400px] overflow-x-hidden overflow-y-scroll
                '>
                            {
                                uniqueWilayas.map((wilaya) => (<div
                                    onClick={() => {
                                        setSelectedWilaya(wilaya);
                                        setIsWilayasOpen(false);
                                        setSelectedCommune(undefined);
                                    }}
                                    key={wilaya}
                                    className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'>
                                    <h3>{wilaya}</h3>
                                </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className="relative flex flex-col items-start">
                <div className='text-gray-400'>
                    Commune
                </div>
                <button onClick={() => {
                    setIsCommunesOpen((prev) => !prev);
                    setIsWilayasOpen(false);
                }} className='bg-white p-2 w-full flex items-center justify-between
    text-l tracking-wider border border-1 border-black
    duration-300'>
                    {selectedCommune ?? 'Commune'}
                    {!isCommunesOpen ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}
                </button>
                {
                    isCommunesOpen && (
                        <div className='bg-white absolute top-[45px] flex flex-col items-start p-1 w-full z-10
                border border-1 border-black max-h-[400px] overflow-x-hidden overflow-y-scroll
                '>
                            {
                                wilayas.filter(c => c.wilaya_name_ascii === selectedWilaya).map((commune) => (<div
                                    onClick={() => {
                                        setSelectedCommune(commune.commune_name_ascii);
                                        setIsCommunesOpen(false);
                                    }}

                                    key={commune.id}
                                    className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'>
                                    <h3>{commune.commune_name_ascii}</h3>
                                </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className="relative flex flex-row items-center border border-1 border-black">
                <input
                    className='bg-white p-2 w-full flex items-center justify-between
    text-l focus:border-transparent focus:ring-0 outline-none'
                    type="text"
                    placeholder={language === 'ar' ? 'ملاحظة' : language === 'fr' ? 'Note' : 'Note'} >
                </input>
            </div>
        </section>
        <div className='hidden md:flex flex-col my-8 border-t pt-4 '>
            {language === 'ar' ? 'المشتريات' : language === 'fr' ? 'Achats' : 'Purchases'}
            <div className='flex overflow-x-scroll border border-gray-400 my-2  '>
                <div className='flex '>
                    {
                        cart.map(item =>
                            <div className='w-[150px] m-4'>
                                <img className='h-[200px] object-fit' src={item.img} alt="" />
                                <div className='flex mt-2'>
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            height: '20px',
                                            width: '20px',
                                            marginRight: '4px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '1px solid black',
                                            fontSize: '14px',
                                        }} >
                                        {item.size}
                                    </div>
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            height: '20px',
                                            width: '20px',
                                            marginRight: '8px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            border: '1px solid black',
                                            backgroundColor: item.color,
                                        }} />
                                    <div className='flex items-center text-center text-sm text-gray-400'>
                                        {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                                        {item.price} X {item.amount}
                                    </div>
                                </div>
                                <div>
                                    {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                                    {item.price * item.amount}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        <div className='my-4'>
            {language === 'ar' ? 'عدد المشتريات: ' : language === 'fr' ? 'Nombre d\'achats: ' : 'Number of purchases: '}
            {itemAmount}
        </div>
        <div className='my-4'>
            {language === 'ar' ? 'السعر الإجمالي: ' : language === 'fr' ? 'Prix total: ' : 'Total price: '}
            {total}
            {language === 'ar' ? ' دج' : language === 'fr' ? ' DA' : ' DZD'}
        </div>
        <div className='flex w-full flex-col lg:flex-row items-center justify-stretch'>
            <Link to='/' className='bg-primary w-full flex p-4 justify-center items-center text-white max-w-[200px] font-medium m-2'>
                {language === 'ar' ? 'اشتري اكثر' : language === 'fr' ? 'Acheter plus' : 'Buy more'}
            </Link>
            <button className='bg-gray-500 w-full flex p-4 justify-center items-center text-white max-w-[200px] font-medium m-2'>
                {language === 'ar' ? 'تأكيد' : language === 'fr' ? 'Valider' : 'Validate'}
            </button>
        </div>
    </div>;
};

export default Checkout;
