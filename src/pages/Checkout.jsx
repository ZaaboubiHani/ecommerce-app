import React, { useContext, useState, useEffect, useRef } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import data from '../../public/data/wilayas.json';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CartContext } from '../contexts/CartContext';
import { SnackbarContext } from '../contexts/SnackbarContext';
import Api from '../api/api.source';
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from 'react-router-dom';
const apiInstance = Api.instance;
const Checkout = () => {
    const navigate = useNavigate();
    const { language } = useContext(LanguageContext);
    const { cart, total, clearCart } = useContext(CartContext);
    const { handleOpen } = useContext(SnackbarContext);

    const uniqueWilayaNames = {};
    data.forEach(entry => {
        uniqueWilayaNames[entry.wilaya_name_ascii] = entry.wilaya_name;
    });
    const uniqueWilayaNamesArray = Object.keys(uniqueWilayaNames).map(key => ({
        wilaya_name_ascii: key,
        wilaya_name: uniqueWilayaNames[key]
    }));
    const [wilayasData, setWilayasData] = useState([]);
    const [isWilayasOpen, setIsWilayasOpen] = useState(false);
    const [isCommunesOpen, setIsCommunesOpen] = useState(false);
    const [isShippingTypeOpen, setIsShippingTypeOpen] = useState(false);
    const [selectedWilaya, setSelectedWilaya] = useState();
    const [selectedCommune, setSelectedCommune] = useState();
    const [selectedShippingType, setSelectedShippingType] = useState();
    const [note, setNote] = useState();
    const [fullName, setFullName] = useState();
    const [address, setAddress] = useState();
    const [phoneNumber1, setPhoneNumber1] = useState();
    const [phoneNumber2, setPhoneNumber2] = useState();
    const [validateAttempt, setValidateAttempt] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [loading, setLoading] = useState(true);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsWilayasOpen(false);
            setIsCommunesOpen(false);
            setIsShippingTypeOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
            setLoading(false);
        }
    };


    const createOrder = async () => {
        if (phoneNumber2 !== undefined && phoneNumber2?.length > 0) {
            if (phoneNumber2?.length !== 10 || !/^(05|06|07)\d{8}$/.test(phoneNumber2)) {
                setValidateAttempt(true);
            }
        }
        if (fullName === undefined || fullName?.length === 0 ||
            address === undefined || address?.length === 0 ||
            phoneNumber1 === undefined || phoneNumber1?.length !== 10 || !/^(05|06|07)\d{8}$/.test(phoneNumber1) ||
            selectedWilaya === undefined || selectedCommune === undefined || selectedShippingType === undefined) {
            setValidateAttempt(true);
        }
        else {
            if (phoneNumber2 !== undefined && phoneNumber2?.length > 0) {
                if (phoneNumber2?.length === 10 && /^(05|06|07)\d{8}$/.test(phoneNumber2)) {
                    setValidateAttempt(false);
                    setIsValidating(true);
                    const response = await apiInstance.getAxios().post(`/orders`,
                        {
                            note: note,
                            fullName: fullName,
                            address: address,
                            wilaya: selectedWilaya.frWilaya,
                            commune: selectedCommune.frCommune,
                            phoneNumber1: phoneNumber1,
                            phoneNumber2: phoneNumber2,
                            shippingType: selectedShippingType.enType.toLowerCase(),
                            shippingPrice: selectedShippingType.enType === 'Home' ? selectedWilaya.homePrice : selectedWilaya.deskPrice,
                            total: total,
                            orderItems: cart.map(item => ({
                                product: item.id,
                                quantity: item.amount,
                                price: item.price,
                                hex: item.color,
                                size: item.size,
                            }))
                        });
                    if (response.status === 201) {
                        setIsValidating(false);
                        handleOpen(language === 'ar' ? 'تم إرسال الطلب بنجاح' : language === 'fr' ? 'commande envoyé avec succès' : 'Order sent successfully', 3000);
                        clearCart();
                        navigate('/products');
                    }
                }
            }
            else {
                setValidateAttempt(false);
                setIsValidating(true);
                const response = await apiInstance.getAxios().post(`/orders`,
                    {
                        note: note,
                        fullName: fullName,
                        address: address,
                        wilaya: selectedWilaya.frWilaya,
                        commune: selectedCommune.frCommune,
                        phoneNumber1: phoneNumber1,
                        phoneNumber2: phoneNumber2,
                        shippingType: selectedShippingType.enType.toLowerCase(),
                        shippingPrice: selectedShippingType.enType === 'Home' ? selectedWilaya.homePrice : selectedWilaya.deskPrice,
                        total: total,
                        orderItems: cart.map(item => ({
                            product: item.id,
                            quantity: item.amount,
                            price: item.price,
                            hex: item.color,
                            size: item.size,
                        }))
                    });
                if (response.status === 201) {
                    setIsValidating(false);
                    handleOpen(language === 'ar' ? 'تم إرسال الطلب بنجاح' : language === 'fr' ? 'commande envoyé avec succès' : 'Order sent successfully', 3000);
                    clearCart();
                    navigate('/products');
                }
            }
        }
    };

    return <div className='p-4 lg:p-32 bg-gray-100'>
        {
            loading ?
                <div className='h-[100vh] w-full flex justify-center items-center'>
                    <ClipLoader />
                </div> :
                isValidating ? <div className='h-[100vh] w-full flex justify-center items-center'>
                    <ClipLoader />
                </div> :
                    <div className={`flex flex-col lg:px-24 ${language === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div className={`w-full mx-4 bg-white px-12 py-8 flex flex-col ${language === 'ar' ? 'items-end' : 'items-start'}`}>
                            <section className='grid grid-cols-1 mt-4 gap-[30px] w-full max-auto md:max-w-none md:mx-0 lg:w-2/3 xl:w-1/2 '>
                                <h1 className={`font-bold text-lg m-0 p-0 ${language === 'ar' ? 'text-end' : 'text-start'}`}>
                                    {language === 'ar' ? 'اتصال' : language === 'fr' ? 'Contact' : 'Contact'}</h1>
                                <div key={'fullName'} className={`${language === 'ar' ? 'text-end' : 'text-start'}`}>
                                    <div className="relative flex flex-row items-center  border border-1 border-black rounded-lg">
                                        <input
                                            onChange={(event) => setFullName(event.target.value)}
                                            className='bg-white p-2 w-full flex items-center justify-between
                        text-l focus:border-transparent focus:ring-0 outline-none rounded-lg'
                                            placeholder={language === 'ar' ? 'الإسم واللقب' : language === 'fr' ? 'Nom et Prénom' : 'First and Last name'}
                                            type="text">
                                        </input>
                                    </div>
                                    {validateAttempt && (fullName === undefined || fullName?.length === 0) && (
                                        <div className="text-red-500 text-sm">
                                            {language === 'ar' ? 'من فضلك أدخل الإسم واللقب' : language === 'fr' ? 'Veuillez entrer votre Nom et Prénom' : 'Please enter your First and Last name'}
                                        </div>
                                    )}

                                </div>
                                <div key={'phoneNumber1'} className={`${language === 'ar' ? 'text-end' : 'text-start'}`}>
                                   
                                    <div className="relative flex flex-row items-center border border-1 border-black rounded-lg">
                                        <input
                                            onChange={(event) => setPhoneNumber1(event.target.value)}
                                            className='bg-white p-2 w-full flex items-center justify-between
                            text-l focus:border-transparent focus:ring-0 outline-none rounded-lg'
                                            placeholder={language === 'ar' ? 'رقم الهاتف 1' : language === 'fr' ? 'Numéro de téléphone 1' : 'Phone number 1'}
                                            type="phone">
                                        </input>
                                    </div>
                                    {validateAttempt && (phoneNumber1 === undefined || phoneNumber1?.length !== 10 || !/^(05|06|07)\d{8}$/.test(phoneNumber1)) && (
                                        <div className="text-red-500 text-sm">
                                            {language === 'ar' ? 'الرجاء إدخال رقم هاتف صحيح' : language === 'fr' ? 'Veuillez entrer un numéro de téléphone valide' : 'Please enter a valid Phone number'}
                                        </div>
                                    )}
                                </div>
                                <div key={'phoneNumber2'} className={`${language === 'ar' ? 'text-end' : 'text-start'}`}>
                                   
                                    <div className="relative flex flex-row items-center border border-1 border-black rounded-lg">
                                        <input
                                            onChange={(event) => setPhoneNumber2(event.target.value)}
                                            className='bg-white p-2 w-full flex items-center justify-between
                                            text-l focus:border-transparent focus:ring-0 outline-none rounded-lg'
                                            placeholder={language === 'ar' ? '(اختياري) رقم الهاتف 2' : language === 'fr' ? 'Numéro de téléphone 2 (optional)' : 'Phone number 2 (optional)'}
                                            type="text">
                                        </input>
                                    </div>
                                    {validateAttempt && (phoneNumber2?.length > 0 && !/^(05|06|07)\d{8}$/.test(phoneNumber2)) && (
                                        <div className="text-red-500 text-sm">
                                            {language === 'ar' ? 'الرجاء إدخال رقم هاتف صحيح' : language === 'fr' ? 'Veuillez entrer un numéro de téléphone valide' : 'Please enter a valid Phone number'}
                                        </div>
                                    )}
                                </div>
                                <h1 className={`font-bold text-lg m-0 p-0 ${language === 'ar' ? 'text-end' : 'text-start'}`}>
                                {language === 'ar' ? 'مكان' : language === 'fr' ? 'Localisation' : 'Location'}</h1>
                                <div key={'adresse'} className={`${language === 'ar' ? 'text-end' : 'text-start'}`}>
                                  
                                    <div className="relative flex flex-row items-center border border-1 border-black rounded-lg">
                                        <input
                                            onChange={(event) => setAddress(event.target.value)}
                                            className='bg-white p-2 w-full flex items-center justify-between
                        text-l focus:border-transparent focus:ring-0 outline-none rounded-lg'
                                            placeholder={language === 'ar' ? 'العنوان' : language === 'fr' ? 'Adresse' : 'Address'}
                                            type="text" >
                                        </input>
                                    </div>
                                    {validateAttempt && (address === undefined || address?.length === 0) && (
                                        <div className="text-red-500 text-sm">
                                            {language === 'ar' ? 'من فضلك أدخل عنوانك' : language === 'fr' ? 'Veuillez entrer votre Addresse' : 'Please enter your Address'}
                                        </div>
                                    )}
                                </div>
                                
                                <div key={'ًwilaya'} 
                                className={`relative flex flex-col ${language === 'ar' ? 'items-end' : 'items-start'}`}
                                ref={dropdownRef}>
                                   
                                    <button onClick={() => {
                                        setIsWilayasOpen((prev) => !prev);
                                        setIsCommunesOpen(false);
                                        setIsShippingTypeOpen(false);
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
                                                            setSelectedCommune(undefined);
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
                                <div key={'commune'} 
                                className={`relative flex flex-col ${language === 'ar' ? 'items-end' : 'items-start'}`}
                                ref={dropdownRef}>
                                  
                                    <button onClick={() => {
                                        setIsCommunesOpen((prev) => !prev);
                                        setIsWilayasOpen(false);
                                        setIsShippingTypeOpen(false);
                                    }} className='bg-white p-2 w-full flex items-center justify-between
                                    text-l tracking-wider border border-1 border-black h-11 rounded-lg
                    duration-300'>
                                        <div className={`${selectedCommune?.arCommune ? 'text-black' : 'text-gray-500'}`}>
                                            {language === 'ar' ? selectedCommune?.arCommune ?? 'البلدية' : language === 'fr' ? selectedCommune?.frCommune ?? 'Commune' : selectedCommune?.enCommune ?? 'Commune'}
                                        </div>
                                        {!isCommunesOpen ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}
                                    </button>
                                    {
                                        isCommunesOpen && (
                                            <div className='bg-white absolute top-[50px] flex flex-col items-start p-1 w-full z-10
                                            border border-1 border-black max-h-[400px] overflow-x-hidden overflow-y-auto rounded-lg shadow-md
                                            '>
                                                {
                                                    data.filter(c => c.wilaya_name_ascii === selectedWilaya?.frWilaya).map((commune) => (<div
                                                        onClick={() => {
                                                            setSelectedCommune({
                                                                arCommune: commune.commune_name,
                                                                frCommune: commune.commune_name_ascii,
                                                                enCommune: commune.commune_name_ascii,
                                                            });
                                                            setIsCommunesOpen(false);
                                                        }}

                                                        key={commune.id}
                                                        className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'>
                                                        <h3>
                                                            {language === 'ar' ? commune.commune_name : language === 'fr' ? commune.commune_name_ascii : commune.commune_name_ascii}
                                                        </h3>
                                                    </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                    {validateAttempt && (selectedCommune === undefined) && (
                                        <div className="text-red-500 text-sm">
                                            {language === 'ar' ? 'يرجى تحديد بلديتك' : language === 'fr' ? 'Veuillez sélectionner votre Commune' : 'Please select your Commune'}
                                        </div>
                                    )}
                                </div>
                                <h1 className={`font-bold text-lg m-0 p-0 ${language === 'ar' ? 'text-end' : 'text-start'}`}>
                                {language === 'ar' ? 'الشحن' : language === 'fr' ? 'Livraison' : 'Delivery'}</h1>
                                <div key={'shippingType'} className={`relative flex flex-col ${language === 'ar' ? 'items-end' : 'items-start'}`}>
                                  
                                    <button onClick={() => {
                                        setIsShippingTypeOpen((prev) => !prev);
                                        setIsWilayasOpen(false);
                                        setIsCommunesOpen(false);
                                    }} className='bg-white p-2 w-full flex items-center justify-between
                                    text-l tracking-wider border border-1 border-black h-11 rounded-lg
                                    duration-300'
                                    ref={dropdownRef}>
                                        <div className={`${selectedShippingType?.arType ? 'text-black' : 'text-gray-500'}`}>
                                            {language === 'ar' ? selectedShippingType?.arType ?? 'نوع الشحن' : language === 'fr' ? selectedShippingType?.frType ?? 'Type de livraison' : selectedShippingType?.enType ?? 'Shipping type'}
                                        </div>
                                        {!isShippingTypeOpen ? (<IoMdArrowDropdown />) : (<IoMdArrowDropup />)}
                                    </button>
                                    {
                                        isShippingTypeOpen && (
                                            <div className='bg-white absolute top-[50px] flex flex-col items-start p-1 w-full z-10
                                            border border-1 border-black max-h-[400px] overflow-x-hidden overflow-y-auto rounded-lg
                                            shadow-md
                        '>
                                                <div
                                                    onClick={() => {
                                                        setSelectedShippingType({
                                                            arType: 'بيت',
                                                            frType: 'Maison',
                                                            enType: 'Home',
                                                        });
                                                        setIsShippingTypeOpen(false);
                                                    }}

                                                    className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'>
                                                    <h3> {language === 'ar' ? 'بيت' : language === 'fr' ? 'Maison' : 'Home'}</h3>
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        setSelectedShippingType({
                                                            arType: 'مكتب',
                                                            frType: 'Bureau',
                                                            enType: 'Desk',
                                                        });
                                                        setIsShippingTypeOpen(false);
                                                    }}

                                                    className='flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent'>
                                                    <h3>{language === 'ar' ? 'مكتب' : language === 'fr' ? 'Bureau' : 'Desk'}</h3>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {validateAttempt && (selectedShippingType === undefined) && (
                                        <div className="text-red-500 text-sm">
                                            {language === 'ar' ? 'يرجى تحديد نوع الشحن' : language === 'fr' ? 'Veuillez sélectionner un Type de livraison' : 'Please select a Shipping type'}
                                        </div>
                                    )}
                                </div>
                                <h1 className={`font-bold text-lg m-0 p-0 ${language === 'ar' ? 'text-end' : 'text-start'}`}>
                                {language === 'ar' ? 'ملاحظة' : language === 'fr' ? 'Note' : 'Note'}</h1>
                                <div key={'note'} className={`${language === 'ar' ? 'text-end' : 'text-start'}`}>
                                    <div className="relative flex flex-row items-center border border-1 border-black rounded-lg">
                                        <input
                                            onChange={(event) => setNote(event.target.value)}
                                            className='bg-white p-2 w-full flex items-center justify-between
                                            text-l focus:border-transparent focus:ring-0 outline-none rounded-lg'
                                            placeholder={language === 'ar' ? '(اختياري) ملاحظة' : language === 'fr' ? 'Note (optional)' : 'Note (optional)'}
                                            type="text">
                                        </input>
                                    </div>
                                </div>
                            </section>

                            <div className={`flex w-full flex-col items-center justify-stretch mt-4 ${language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                                <Link to='/' className='bg-primary w-full flex p-4 justify-center items-center text-white max-w-[200px] font-medium mx-2 text-nowrap rounded-2xl'>
                                    {language === 'ar' ? 'اشتري اكثر' : language === 'fr' ? 'Acheter plus' : 'Buy more'}
                                </Link>
                                <button
                                    disabled={cart.length === 0}
                                    onClick={() => {
                                        createOrder();

                                    }}
                                    className='bg-gray-500 w-full flex p-4 justify-center items-center text-white max-w-[200px] font-medium m-2 rounded-2xl'>
                                    {language === 'ar' ? 'تأكيد' : language === 'fr' ? 'Valider' : 'Validate'}
                                </button>
                            </div>
                        </div>
                        <div className='flex items-start justify-center h-fit w-full md:w-[500px] lg:w-[500px] xl:w-[500px] pr-2 bg-white py-4 mt-4 md:mt-0'>
                            <div className={`flex flex-col items-center w-[230px]  pl-2 ${language === 'ar' ? 'md:items-end' : 'md:items-start'}`}>
                                <div className='font-bold'>
                                    {language === 'ar' ? 'المشتريات' : language === 'fr' ? 'Achats' : 'Purchases'}
                                </div>
                                <div className='flex overflow-y-auto overflow-x-hidden max-h-[1000px] lg:max-h-[700px] w-[230px] border-y-2 my-4'>
                                    <div className='flex flex-col'>
                                        {cart.map((item, i) =>
                                            <div key={i} className={`w-[230px] m-4 flex ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                <img className='h-[100px] object-fit' src={item.img} alt="" />
                                                <div className='mx-4'>
                                                    <div className={`flex mt-2 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                        <div
                                                            style={{
                                                                cursor: 'pointer',
                                                                height: '25px',
                                                                width: '25px',
                                                                borderRadius: '4px',
                                                                margin: '0px 4px',
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
                                                                height: '25px',
                                                                width: '25px',
                                                                borderRadius: '4px',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                border: '1px solid black',
                                                                backgroundColor: item.color,
                                                            }} />
                                                    </div>
                                                    <div className={`flex items-center text-center text-sm text-gray-400 ${language === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                        {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                                                        {item.price} X {item.amount}
                                                    </div>
                                                    <div>
                                                        {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                                                        {item.price * item.amount}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        }
                                    </div>
                                </div>
                                <div className='my-2 font-bold'>
                                    {language === 'ar' ? 'السعر الإجمالي : ' : language === 'fr' ? 'Prix total: ' : 'Total price: '}
                                    {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                                    {total}
                                </div>
                                <div className='my-2 font-bold'>
                                    {language === 'ar' ? 'رسوم الشحن : ' : language === 'fr' ? 'Frais de livraison: ' : 'Shipping fees: '}
                                    {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                                    {selectedShippingType?.enType === 'Home' ? selectedWilaya?.homePrice : selectedWilaya?.deskPrice ?? 0}
                                </div>
                                <div className='my-2 font-bold'>
                                    {language === 'ar' ? 'مجموع المدفوعات : ' : language === 'fr' ? 'Total à payer: ' : 'Total to pay: '}
                                    {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                                    {total + (selectedShippingType?.enType === 'Home' ? selectedWilaya?.homePrice : selectedWilaya?.deskPrice ?? 0)}
                                </div>

                            </div>
                        </div>
                    </div>
        }
    </div>;
};

export default Checkout;
