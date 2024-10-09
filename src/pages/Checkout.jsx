// Checkout.js
import React, { useContext, useState } from 'react'
import { LanguageContext } from '../contexts/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { SnackbarContext } from '../contexts/SnackbarContext'
import Api from '../api/api.source'
import ClipLoader from 'react-spinners/ClipLoader'
import WilayaDropdown from '../components/WilayaDropdown' // Ensure correct import path
import CommuneDropdown from '../components/CommuneDropdown'
import ShippingTypeDropdown from '../components/ShippingTypeDropdown'
import { ProductContext } from '../contexts/ProductContext'
import BestsellingCarousel from '../components/BestsellingCarousel'
import TitleCard from '../components/TitleCard'
import { FaCircleCheck, FaSpinner } from 'react-icons/fa6'
import { useForm } from 'react-hook-form'

const apiInstance = Api.instance

const Checkout = () => {
  const navigate = useNavigate()
  const { language } = useContext(LanguageContext)
  const { total, clearCart } = useContext(CartContext)
  const { handleOpen } = useContext(SnackbarContext)
  const { randomProducts } = useContext(ProductContext)
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart') || '[]')
  )

  const [selectedWilaya, setSelectedWilaya] = useState()
  const [selectedCommune, setSelectedCommune] = useState()
  const [selectedShippingType, setSelectedShippingType] = useState()
  const [isOrderSuccessful, setIsOrderSuccessful] = useState(false)
  const [isValidating, setIsValidating] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const validateForm = (data) => {
    return (
      data.fullName &&
      data.address &&
      data.phoneNumber1.length === 10 &&
      /^(05|06|07)\d{8}$/.test(data.phoneNumber1) &&
      selectedWilaya &&
      selectedCommune &&
      selectedShippingType &&
      (!data.phoneNumber2 || /^(05|06|07)\d{8}$/.test(data.phoneNumber2))
    )
  }

  const onSubmit = async (data) => {
    if (!validateForm(data)) {
      return
    }

    setIsValidating(true)

    const orderData = {
      note: data.note,
      fullName: data.fullName,
      address: data.address,
      wilaya: selectedWilaya.frWilaya,
      commune: selectedCommune.frCommune,
      phoneNumber1: data.phoneNumber1,
      phoneNumber2: data.phoneNumber2,
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
            ? 'Commande envoyée avec succès'
            : 'Order sent successfully',
          3000
        )
        clearCart()
        setIsOrderSuccessful(true)
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

  const calculateTotal = () => {
    const subtotal = total
    const delivery =
      selectedShippingType?.enType === 'Home'
        ? selectedWilaya?.homePrice ?? 0
        : selectedWilaya?.deskPrice ?? 0
    const totalPrice = subtotal + delivery
    return { subtotal, delivery, total: totalPrice }
  }

  return (
    <div className='pt-16 lg:py-32 bg-white'>
      {isValidating ? (
        <div className='h-[100vh] w-full flex justify-center items-center'>
          <ClipLoader />
        </div>
      ) : (
        <div className='flex flex-col lg:px-24 md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
          {isOrderSuccessful ? (
            <div className='w-full min-h-[450px] border p-4 rounded-xl flex flex-col justify-center items-center gap-6'>
              <FaCircleCheck color='green' size={80} />
              <h2 className='font-bold text-4xl leading-10 text-center uppercase'>
                {language === 'ar'
                  ? 'تم إكمال الطلب بنجاح'
                  : language === 'fr'
                  ? 'Commande réussie'
                  : 'Order Completed Successfully'}
              </h2>
              <p className='text-lg leading-8 text-gray-500 text-center uppercase'>
                {language === 'ar'
                  ? 'شكرا لك'
                  : language === 'fr'
                  ? 'Merci'
                  : 'Thank You'}
              </p>
              <button className='border border-black p-2 rounded bg-black hover:opacity-75 text-white'>
                <Link to='/products'>
                  {language === 'ar'
                    ? 'العودة إلى المتجر'
                    : language === 'fr'
                    ? 'Retour à la boutique'
                    : 'Go back to shop'}
                </Link>
              </button>
            </div>
          ) : (
            <form
              className='w-full border p-4 rounded-xl'
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className='text-2xl font-semibold mb-4 text-center'>
                {language === 'ar'
                  ? 'الدفع'
                  : language === 'fr'
                  ? 'Paiement'
                  : 'Checkout'}
              </h2>

              {/* Full Name Field */}
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>
                  {language === 'ar'
                    ? 'الإسم واللقب'
                    : language === 'fr'
                    ? 'Nom et Prénom'
                    : 'First and Last name'}
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  {...register('fullName', { required: true })}
                  className={`w-full px-4 py-3 border rounded-md bg-white focus:border-white ${
                    errors.fullName ? 'border-red-500' : ''
                  }`}
                  placeholder={
                    language === 'ar'
                      ? 'أدخل اسمك الكامل'
                      : language === 'fr'
                      ? 'Entrez votre nom complet'
                      : 'Enter your full name'
                  }
                />
                {errors.fullName && (
                  <p className='text-red-500 text-sm'>
                    {language === 'ar'
                      ? 'من فضلك أدخل الإسم واللقب'
                      : language === 'fr'
                      ? 'Veuillez entrer votre Nom et Prénom'
                      : 'Please enter your First and Last name'}
                  </p>
                )}
              </div>

              {/* Address Field */}
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>
                  {language === 'ar'
                    ? 'العنوان'
                    : language === 'fr'
                    ? 'Adresse'
                    : 'Address'}
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  {...register('address', { required: true })}
                  className={`w-full px-4 py-3 border rounded-md bg-white focus:border-white ${
                    errors.address ? 'border-red-500' : ''
                  }`}
                  placeholder={
                    language === 'ar'
                      ? 'أدخل عنوانك'
                      : language === 'fr'
                      ? 'Entrez votre adresse'
                      : 'Enter your address'
                  }
                />
                {errors.address && (
                  <p className='text-red-500 text-sm'>
                    {language === 'ar'
                      ? 'من فضلك أدخل عنوانك'
                      : language === 'fr'
                      ? 'Veuillez entrer votre adresse'
                      : 'Please enter your address'}
                  </p>
                )}
              </div>

              {/* Phone Number 1 Field */}
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>
                  {language === 'ar'
                    ? 'رقم الهاتف 1'
                    : language === 'fr'
                    ? 'Numéro de téléphone 1'
                    : 'Phone number 1'}
                  <span className='text-red-500'>*</span>
                </label>
                <input
                  type='tel'
                  {...register('phoneNumber1', {
                    required: true,
                    pattern: /^(05|06|07)\d{8}$/,
                  })}
                  className={`w-full px-4 py-3 border rounded-md bg-white focus:border-white ${
                    errors.phoneNumber1 ? 'border-red-500' : ''
                  }`}
                  placeholder={
                    language === 'ar'
                      ? 'أدخل رقم هاتفك'
                      : language === 'fr'
                      ? 'Entrez votre numéro de téléphone'
                      : 'Enter your phone number'
                  }
                />
                {errors.phoneNumber1 && (
                  <p className='text-red-500 text-sm'>
                    {language === 'ar'
                      ? 'الرجاء إدخال رقم هاتف صحيح'
                      : language === 'fr'
                      ? 'Veuillez entrer un numéro de téléphone valide'
                      : 'Please enter a valid phone number'}
                  </p>
                )}
              </div>

              {/* Phone Number 2 Field */}
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>
                  {language === 'ar'
                    ? '(اختياري) رقم الهاتف 2'
                    : language === 'fr'
                    ? 'Numéro de téléphone 2 (optionnel)'
                    : 'Phone number 2 (optional)'}
                </label>
                <input
                  type='tel'
                  {...register('phoneNumber2', {
                    pattern: {
                      value: /^(05|06|07)\d{8}$/,
                      message:
                        language === 'ar'
                          ? 'الرجاء إدخال رقم هاتف صحيح'
                          : language === 'fr'
                          ? 'Veuillez entrer un numéro de téléphone valide'
                          : 'Please enter a valid phone number',
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-md bg-white focus:border-white ${
                    errors.phoneNumber2 ? 'border-red-500' : ''
                  }`}
                  placeholder={
                    language === 'ar'
                      ? 'أدخل رقم هاتفك الثاني'
                      : language === 'fr'
                      ? 'Entrez votre deuxième numéro de téléphone'
                      : 'Enter your second phone number'
                  }
                />
                {errors.phoneNumber2 && (
                  <p className='text-red-500 text-sm'>
                    {errors.phoneNumber2.message}
                  </p>
                )}
              </div>

              {/* Wilaya Dropdown */}
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>
                  {language === 'ar'
                    ? 'الولاية'
                    : language === 'fr'
                    ? 'Wilaya'
                    : 'Wilaya'}
                  <span className='text-red-500'>*</span>
                </label>
                <WilayaDropdown
                  onSelect={(wilaya) => setSelectedWilaya(wilaya)}
                  validateAttempt={Boolean(errors.selectedWilaya)}
                />
                {errors.selectedWilaya && (
                  <p className='text-red-500 text-sm'>
                    {language === 'ar'
                      ? 'يرجى تحديد ولايتك'
                      : language === 'fr'
                      ? 'Veuillez sélectionner votre wilaya'
                      : 'Please select your wilaya'}
                  </p>
                )}
              </div>

              {/* Commune Dropdown */}
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>
                  {language === 'ar'
                    ? 'البلدية'
                    : language === 'fr'
                    ? 'Commune'
                    : 'Commune'}
                  <span className='text-red-500'>*</span>
                </label>
                <CommuneDropdown
                  onSelect={(commune) => setSelectedCommune(commune)}
                  selectedWilaya={selectedWilaya}
                  validateAttempt={Boolean(errors.selectedCommune)}
                />
                {errors.selectedCommune && (
                  <p className='text-red-500 text-sm'>
                    {language === 'ar'
                      ? 'يرجى تحديد بلديتك'
                      : language === 'fr'
                      ? 'Veuillez sélectionner votre commune'
                      : 'Please select your commune'}
                  </p>
                )}
              </div>

              {/* Shipping Type Dropdown */}
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>
                  {language === 'ar'
                    ? 'نوع الشحن'
                    : language === 'fr'
                    ? 'Type de livraison'
                    : 'Shipping type'}
                  <span className='text-red-500'>*</span>
                </label>
                <ShippingTypeDropdown
                  onSelect={(type) => setSelectedShippingType(type)}
                  validateAttempt={Boolean(errors.selectedShippingType)}
                />
                {errors.selectedShippingType && (
                  <p className='text-red-500 text-sm'>
                    {language === 'ar'
                      ? 'يرجى تحديد نوع الشحن'
                      : language === 'fr'
                      ? 'Veuillez sélectionner un type de livraison'
                      : 'Please select a shipping type'}
                  </p>
                )}
              </div>

              {/* Note Field */}
              <div className='mb-4'>
                <label className='block mb-2 text-sm font-medium'>
                  {language === 'ar'
                    ? '(اختياري) ملاحظة'
                    : language === 'fr'
                    ? 'Note (optionnelle)'
                    : 'Note (optional)'}
                </label>
                <textarea
                  {...register('note')}
                  className='w-full px-4 py-3 border rounded-md bg-white focus:border-white'
                  placeholder={
                    language === 'ar'
                      ? 'أدخل ملاحظتك'
                      : language === 'fr'
                      ? 'Entrez votre note'
                      : 'Enter your note'
                  }
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full py-3 bg-black text-white font-semibold rounded-md hover:opacity-75'
                disabled={isValidating || cart.length === 0}
              >
                {isValidating ? (
                  <div className='flex items-center justify-center space-x-2'>
                    <FaSpinner className='animate-spin' />
                    <span>
                      {language === 'ar'
                        ? 'جار التحميل...'
                        : language === 'fr'
                        ? 'Chargement...'
                        : 'Loading...'}
                    </span>
                  </div>
                ) : language === 'ar' ? (
                  'تأكيد'
                ) : language === 'fr' ? (
                  'Valider'
                ) : (
                  'Validate'
                )}
              </button>
            </form>
          )}

          {/* Purchases Section */}
          <div className='w-full h-auto border p-4 rounded-xl'>
            <h2 className='text-2xl font-semibold mb-4 text-center'>
              {language === 'ar'
                ? 'المشتريات'
                : language === 'fr'
                ? 'Achats'
                : 'Purchases'}
            </h2>
            <div className='mt-8'>
              <div className='flow-root'>
                <ul
                  role='list'
                  className='-my-6 divide-y divide-gray-200 max-h-[400px] overflow-y-auto'
                >
                  {cart.map((item, i) => (
                    <li key={i} className='flex py-6'>
                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                        <img
                          src={item.img}
                          alt={item.name}
                          className='h-full w-full object-cover object-center'
                        />
                      </div>

                      <div className='ml-4 flex flex-1 flex-col'>
                        <div>
                          <div className='flex justify-between text-base font-medium'>
                            <h3 className='capitalize font-bold'>
                              {language === 'ar'
                                ? `${item.arName}`
                                : language === 'fr'
                                ? `${item.frName}`
                                : `${item.engName}`}
                            </h3>
                            <p className='ml-4 font-bold'>
                              {item.isSale ? item.salePrice : item.price}{' '}
                              <small>
                                <sup className='font-bold'>
                                  {language === 'ar'
                                    ? 'دج'
                                    : language === 'fr'
                                    ? 'DA'
                                    : 'DZD'}
                                </sup>
                              </small>
                            </p>
                          </div>
                          <p className='mt-1 text-sm text-gray-500'>
                            {language === 'ar'
                              ? 'الحجم'
                              : language === 'fr'
                              ? 'Taille'
                              : 'Size'}{' '}
                            {item.size}
                          </p>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-sm'>
                          <p className='text-gray-500'>
                            {language === 'ar'
                              ? 'الكمية'
                              : language === 'fr'
                              ? 'Qté'
                              : 'Qty'}{' '}
                            x{item.amount}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className='border-t border-gray-200 px-4 py-6 sm:px-6 mt-10'>
                  <div className='flex justify-between text-base font-medium'>
                    <p>
                      {language === 'ar'
                        ? 'السعر الإجمالي'
                        : language === 'fr'
                        ? 'Prix total'
                        : 'Subtotal'}
                    </p>
                    <p className='font-bold'>
                      {calculateTotal().subtotal}{' '}
                      <small className='ml-1 font-bold'>
                        <sup className=''>
                          {language === 'ar'
                            ? 'دج'
                            : language === 'fr'
                            ? 'DA'
                            : 'DZD'}
                        </sup>
                      </small>
                    </p>
                  </div>
                  <div className='flex justify-between text-base font-medium'>
                    <p>
                      {language === 'ar'
                        ? 'رسوم الشحن'
                        : language === 'fr'
                        ? 'Frais de livraison'
                        : 'Delivery'}
                    </p>
                    <p className='font-bold'>
                      {calculateTotal().delivery}{' '}
                      <small className='ml-1 font-bold'>
                        <sup>
                          {language === 'ar'
                            ? 'دج'
                            : language === 'fr'
                            ? 'DA'
                            : 'DZD'}
                        </sup>
                      </small>
                    </p>
                  </div>
                  <hr />
                  <div className='flex justify-between text-base font-medium'>
                    <p>
                      {language === 'ar'
                        ? 'مجموع المدفوعات'
                        : language === 'fr'
                        ? 'Total à payer'
                        : 'Total'}
                    </p>
                    <p className='font-bold'>
                      {calculateTotal().total}{' '}
                      <small className='ml-1'>
                        <sup className='font-bold'>
                          {language === 'ar'
                            ? 'دج'
                            : language === 'fr'
                            ? 'DA'
                            : 'DZD'}
                        </sup>
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Bestselling Carousel Section */}
      <div className='mt-8'>
        <TitleCard
          title={
            language === 'ar'
              ? 'الأكثر مبيعا'
              : language === 'fr'
              ? 'Plus vendu'
              : 'Bestselling'
          }
        />
        <BestsellingCarousel products={randomProducts} />
      </div>
    </div>
  )
}

export default Checkout
