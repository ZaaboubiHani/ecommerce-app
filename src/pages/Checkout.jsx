import React, { useContext, useState } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { CartContext } from '../contexts/CartContext'
import { SnackbarContext } from '../contexts/SnackbarContext'
import Api from '../api/api.source'
import ClipLoader from 'react-spinners/ClipLoader'
import WilayaDropdown from '../components/WilayaDropdow'
import CommuneDropdown from '../components/CommuneDropdown'
import ShippingTypeDropdown from '../components/ShippingTypeDropdown'
import { ProductContext } from '../contexts/ProductContext'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import BestsellingCarousel from '../components/BestsellingCarousel'
import TitleCard from '../components/TitleCard'

const apiInstance = Api.instance

const Checkout = () => {
  const navigate = useNavigate()
  const { language } = useContext(LanguageContext)
  const { cart, total, clearCart } = useContext(CartContext)
  const { handleOpen } = useContext(SnackbarContext)
  const { randomProducts } = useContext(ProductContext)

  const [selectedWilaya, setSelectedWilaya] = useState()
  const [selectedCommune, setSelectedCommune] = useState()
  const [selectedShippingType, setSelectedShippingType] = useState()
  const [note, setNote] = useState('')
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber1, setPhoneNumber1] = useState('')
  const [phoneNumber2, setPhoneNumber2] = useState('')
  const [validateAttempt, setValidateAttempt] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const validateForm = () => {
    return (
      fullName &&
      address &&
      phoneNumber1.length === 10 &&
      /^(05|06|07)\d{8}$/.test(phoneNumber1) &&
      selectedWilaya &&
      selectedCommune &&
      selectedShippingType &&
      (!phoneNumber2 || /^(05|06|07)\d{8}$/.test(phoneNumber2))
    )
  }

  const createOrder = async () => {
    if (!validateForm()) {
      setValidateAttempt(true)
      return
    }

    setValidateAttempt(false)
    setIsValidating(true)

    const orderData = {
      note,
      fullName,
      address,
      wilaya: selectedWilaya.frWilaya,
      commune: selectedCommune.frCommune,
      phoneNumber1,
      phoneNumber2,
      shippingType: selectedShippingType.enType.toLowerCase(),
      shippingPrice:
        selectedShippingType.enType === 'Home'
          ? selectedWilaya.homePrice
          : selectedWilaya.deskPrice,
      total,
      orderItems: cart.map((item) => ({
        product: item.id,
        quantity: item.amount,
        price: item.price,
        salePrice: item.salePrice,
        isSale: item.isSale,
        size: item.size,
      })),
    }

    try {
      const response = await apiInstance.getAxios().post(`/orders`, orderData)
      if (response.status === 201) {
        setIsValidating(false)
        handleOpen(
          language === 'ar'
            ? 'تم إرسال الطلب بنجاح'
            : language === 'fr'
            ? 'commande envoyé avec succès'
            : 'Order sent successfully',
          3000
        )
        clearCart()
        navigate('/products')
      }
    } catch (error) {
      setIsValidating(false)
      handleOpen(
        language === 'ar'
          ? 'فشل إرسال الطلب'
          : language === 'fr'
          ? "Échec de l'envoi de la commande"
          : 'Order sending failed',
        3000
      )
    }
  }

  return (
    <div className='p-4 lg:p-32 bg-gray-100'>
      {isValidating ? (
        <div className='h-[100vh] w-full flex justify-center items-center'>
          <ClipLoader />
        </div>
      ) : (
        <div
          className={`flex flex-col lg:px-24 ${
            language === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          <div
            className={`w-full mx-4 bg-white px-12 py-8 flex flex-col ${
              language === 'ar' ? 'items-end' : 'items-start'
            }`}
          >
            <section className='grid grid-cols-1 mt-4 gap-[30px] w-full max-auto md:max-w-none md:mx-0 lg:w-2/3 xl:w-1/2'>
              <h1
                className={`font-bold text-lg m-0 p-0 ${
                  language === 'ar' ? 'text-end' : 'text-start'
                }`}
              >
                {language === 'ar'
                  ? 'اتصال'
                  : language === 'fr'
                  ? 'Contact'
                  : 'Contact'}
              </h1>
              <InputField
                label={
                  language === 'ar'
                    ? 'الإسم واللقب'
                    : language === 'fr'
                    ? 'Nom et Prénom'
                    : 'First and Last name'
                }
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={validateAttempt && !fullName}
                errorMessage={
                  language === 'ar'
                    ? 'من فضلك أدخل الإسم واللقب'
                    : language === 'fr'
                    ? 'Veuillez entrer votre Nom et Prénom'
                    : 'Please enter your First and Last name'
                }
                language={language}
              />
              <InputField
                label={
                  language === 'ar'
                    ? 'رقم الهاتف 1'
                    : language === 'fr'
                    ? 'Numéro de téléphone 1'
                    : 'Phone number 1'
                }
                value={phoneNumber1}
                onChange={(e) => setPhoneNumber1(e.target.value)}
                error={
                  validateAttempt &&
                  (phoneNumber1.length !== 10 ||
                    !/^(05|06|07)\d{8}$/.test(phoneNumber1))
                }
                errorMessage={
                  language === 'ar'
                    ? 'الرجاء إدخال رقم هاتف صحيح'
                    : language === 'fr'
                    ? 'Veuillez entrer un numéro de téléphone valide'
                    : 'Please enter a valid Phone number'
                }
                language={language}
              />
              <InputField
                label={
                  language === 'ar'
                    ? '(اختياري) رقم الهاتف 2'
                    : language === 'fr'
                    ? 'Numéro de téléphone 2 (optional)'
                    : 'Phone number 2 (optional)'
                }
                value={phoneNumber2}
                onChange={(e) => setPhoneNumber2(e.target.value)}
                error={
                  validateAttempt &&
                  phoneNumber2.length > 0 &&
                  !/^(05|06|07)\d{8}$/.test(phoneNumber2)
                }
                errorMessage={
                  language === 'ar'
                    ? 'الرجاء إدخال رقم هاتف صحيح'
                    : language === 'fr'
                    ? 'Veuillez entrer un numéro de téléphone valide'
                    : 'Please enter a valid Phone number'
                }
                language={language}
              />
              <h1
                className={`font-bold text-lg m-0 p-0 ${
                  language === 'ar' ? 'text-end' : 'text-start'
                }`}
              >
                {language === 'ar'
                  ? 'مكان'
                  : language === 'fr'
                  ? 'Localisation'
                  : 'Location'}
              </h1>
              <InputField
                label={
                  language === 'ar'
                    ? 'العنوان'
                    : language === 'fr'
                    ? 'Adresse'
                    : 'Address'
                }
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                error={validateAttempt && !address}
                errorMessage={
                  language === 'ar'
                    ? 'من فضلك أدخل عنوانك'
                    : language === 'fr'
                    ? 'Veuillez entrer votre Addresse'
                    : 'Please enter your Address'
                }
                language={language}
              />
              <WilayaDropdown
                onSelect={(wilaya) => setSelectedWilaya(wilaya)}
                validateAttempt={validateAttempt}
              />
              <CommuneDropdown
                onSelect={(commune) => setSelectedCommune(commune)}
                selectedWilaya={selectedWilaya}
                validateAttempt={validateAttempt}
              />
              <h1
                className={`font-bold text-lg m-0 p-0 ${
                  language === 'ar' ? 'text-end' : 'text-start'
                }`}
              >
                {language === 'ar'
                  ? 'الشحن'
                  : language === 'fr'
                  ? 'Livraison'
                  : 'Delivery'}
              </h1>
              <ShippingTypeDropdown
                onSelect={(type) => setSelectedShippingType(type)}
                validateAttempt={validateAttempt}
              />
              <h1
                className={`font-bold text-lg m-0 p-0 ${
                  language === 'ar' ? 'text-end' : 'text-start'
                }`}
              >
                {language === 'ar'
                  ? 'ملاحظة'
                  : language === 'fr'
                  ? 'Note'
                  : 'Note'}
              </h1>
              <InputField
                label={
                  language === 'ar'
                    ? '(اختياري) ملاحظة'
                    : language === 'fr'
                    ? 'Note (optional)'
                    : 'Note (optional)'
                }
                value={note}
                onChange={(e) => setNote(e.target.value)}
                language={language}
              />
            </section>
            <div
              className={`flex w-full flex-col items-center justify-stretch mt-4 ${
                language === 'ar' ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              <Link
                to='/'
                className='bg-primary w-full flex p-4 justify-center items-center text-white max-w-[200px] font-medium mx-2 text-nowrap rounded-2xl'
              >
                {language === 'ar'
                  ? 'اشتري اكثر'
                  : language === 'fr'
                  ? 'Acheter plus'
                  : 'Buy more'}
              </Link>
              <button
                disabled={cart.length === 0}
                onClick={createOrder}
                className='bg-gray-500 w-full flex p-4 justify-center items-center text-white max-w-[200px] font-medium m-2 rounded-2xl'
              >
                {language === 'ar'
                  ? 'تأكيد'
                  : language === 'fr'
                  ? 'Valider'
                  : 'Validate'}
              </button>
            </div>
          </div>
          <div className='flex items-start justify-center h-fit w-full md:w-[500px] lg:w-[500px] xl:w-[500px] pr-2 bg-white py-4 mt-4 md:mt-0'>
            <div
              className={`flex flex-col items-center w-[230px] pl-2 ${
                language === 'ar' ? 'md:items-end' : 'md:items-start'
              }`}
            >
              <div className='font-bold'>
                {language === 'ar'
                  ? 'المشتريات'
                  : language === 'fr'
                  ? 'Achats'
                  : 'Purchases'}
              </div>
              <div className='flex overflow-y-auto overflow-x-hidden max-h-[1000px] lg:max-h-[700px] w-[230px] border-y-2 my-4'>
                <div className='flex flex-col'>
                  {cart.map((item, i) => (
                    <div
                      key={i}
                      className={`w-[230px] m-4 flex ${
                        language === 'ar' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <img
                        className='h-[100px] object-fit'
                        src={item.img}
                        alt=''
                      />
                      <div className='mx-4'>
                        <div
                          className={`flex mt-2 ${
                            language === 'ar' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
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
                            }}
                          >
                            {item.size}
                          </div>
                        </div>
                        <div
                          className={`flex items-center text-center text-sm text-gray-400 ${
                            language === 'ar' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          {language === 'ar'
                            ? 'دج '
                            : language === 'fr'
                            ? 'DA '
                            : 'DZD '}
                          {item.isSale ? item.salePrice : item.price} X{' '}
                          {item.amount}
                        </div>
                        <div>
                          {language === 'ar'
                            ? 'دج '
                            : language === 'fr'
                            ? 'DA '
                            : 'DZD '}
                          {item.isSale
                            ? item.salePrice * item.amount
                            : item.price * item.amount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='my-2 font-bold'>
                {language === 'ar'
                  ? 'السعر الإجمالي : '
                  : language === 'fr'
                  ? 'Prix total: '
                  : 'Total price: '}
                {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                {total}
              </div>
              <div className='my-2 font-bold'>
                {language === 'ar'
                  ? 'رسوم الشحن : '
                  : language === 'fr'
                  ? 'Frais de livraison: '
                  : 'Shipping fees: '}
                {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                {selectedShippingType?.enType === 'Home'
                  ? selectedWilaya?.homePrice
                  : selectedWilaya?.deskPrice ?? 0}
              </div>
              <div className='my-2 font-bold'>
                {language === 'ar'
                  ? 'مجموع المدفوعات : '
                  : language === 'fr'
                  ? 'Total à payer: '
                  : 'Total to pay: '}
                {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
                {total +
                  (selectedShippingType?.enType === 'Home'
                    ? selectedWilaya?.homePrice
                    : selectedWilaya?.deskPrice ?? 0)}
              </div>
            </div>
          </div>
        </div>
      )}
      <TitleCard
        title={
          language === 'ar'
            ? 'الأكثر مبيعا'
            : language === 'fr'
            ? 'Besy-Seller'
            : 'Bestselling'
        }
      />
      <BestsellingCarousel products={randomProducts} />
    </div>
  )
}

const InputField = ({
  label,
  value,
  onChange,
  error,
  errorMessage,
  language,
}) => (
  <div className={`${language === 'ar' ? 'text-end' : 'text-start'}`}>
    <div className='relative flex flex-row items-center border border-1 border-black rounded-lg'>
      <input
        value={value}
        onChange={onChange}
        className='bg-white p-2 w-full flex items-center justify-between text-l focus:border-transparent focus:ring-0 outline-none rounded-lg'
        placeholder={label}
        type='text'
      />
    </div>
    {error && <div className='text-red-500 text-sm'>{errorMessage}</div>}
  </div>
)

export default Checkout
