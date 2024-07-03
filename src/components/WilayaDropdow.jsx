import React, { useState, useContext,useRef,useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CategoryContext } from '../contexts/CategoryContext';
import { LanguageContext } from '../contexts/LanguageContext';
import data from '../../public/data/wilayas.json';
import Api from '../api/api.source';
const apiInstance = Api.instance;
const WilayaDropdown = ({onSelect,validateAttempt}) => {
    const [selectedWilaya, setSelectedWilaya] = useState();
    const { language } = useContext(LanguageContext);
    const [isWilayasOpen, setIsWilayasOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const [wilayasData, setWilayasData] = useState([]);

    const uniqueWilayaNames = {};
    data.forEach(entry => {
        uniqueWilayaNames[entry.wilaya_name_ascii] = entry.wilaya_name;
    });
    const uniqueWilayaNamesArray = Object.keys(uniqueWilayaNames).map(key => ({
        wilaya_name_ascii: key,
        wilaya_name: uniqueWilayaNames[key]
    }));

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const response = await apiInstance.getAxios().get(`/wilayas`);
        if (response.status === 200) {
            const combinedData = uniqueWilayaNamesArray.map(wilaya => {
                const priceData = response.data.find(price => price.name === wilaya.wilaya_name_ascii);
                return {
                    ...wilaya,
                    homePrice: priceData ? priceData.homePrice : null,
                    deskPrice: priceData ? priceData.deskPrice : null
                };
            });
            setWilayasData(combinedData);
        }
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsWilayasOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return <div key={'ًwilaya'} 
    className={`relative flex flex-col ${language === 'ar' ? 'items-end' : 'items-start'}`}
    ref={dropdownRef}>
       
        <button onClick={() => {
            setIsWilayasOpen((prev) => !prev);
        }} className='bg-white p-2 w-full flex items-center justify-between
        text-l tracking-wider border border-1 border-black h-11 rounded-lg
        duration-300'>
            <div className={`${selectedWilaya?.arWilaya ? 'text-black' : 'text-gray-500'}`}>
                {language === 'ar' ? selectedWilaya?.arWilaya ?? 'الولاية' : language === 'fr' ? selectedWilaya?.frWilaya ?? 'ًWilaya' : selectedWilaya?.enWilaya ?? 'ًWilaya'}
            </div>
            {!isWilayasOpen ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}
        </button>
        {
            isWilayasOpen && (
                <div className='bg-white absolute top-[50px] flex flex-col items-start p-1 w-full z-10
border border-1 border-black h-[400px] overflow-x-hidden overflow-y-scroll rounded-lg shadow-md
'>
                    {
                        wilayasData.map((wilaya) => (<div
                            onClick={() => {
                                setSelectedWilaya({
                                    arWilaya: wilaya.wilaya_name,
                                    frWilaya: wilaya.wilaya_name_ascii,
                                    enWilaya: wilaya.wilaya_name_ascii,
                                    homePrice: wilaya.homePrice,
                                    deskPrice: wilaya.deskPrice,
                                });
                                setIsWilayasOpen(false);
                                onSelect({
                                    arWilaya: wilaya.wilaya_name,
                                    frWilaya: wilaya.wilaya_name_ascii,
                                    enWilaya: wilaya.wilaya_name_ascii,
                                    homePrice: wilaya.homePrice,
                                    deskPrice: wilaya.deskPrice,
                                });
                            }}
                            key={wilaya.wilaya_name_ascii}
                            className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'>
                            <h3>
                                {language === 'ar' ? wilaya.wilaya_name : language === 'fr' ? wilaya.wilaya_name_ascii : wilaya.wilaya_name_ascii}
                            </h3>
                        </div>
                        ))
                    }
                </div>
            )
        }
        {validateAttempt && (selectedWilaya === undefined) && (
            <div className="text-red-500 text-sm">
                {language === 'ar' ? 'يرجى تحديد ولايتك' : language === 'fr' ? 'Veuillez sélectionner votre Wilaya' : 'Please select your Wilaya'}
            </div>
        )}
    </div>
        ;
};

export default WilayaDropdown;