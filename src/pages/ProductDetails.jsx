import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { ProductContext } from '../contexts/ProductContext'
import { LanguageContext } from '../contexts/LanguageContext'
import { SidebarContext } from '../contexts/SidebarContext'
import { IoMdRemove, IoMdAdd } from 'react-icons/io'
import ClipLoader from 'react-spinners/ClipLoader'
import { MdOutlineArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md'
import BestsellingCarousel from '../components/BestsellingCarousel'
import TitleCard from '../components/TitleCard'

const ProductDetails = () => {
  const { id } = useParams()
  const { fetchSingleProduct } = useContext(ProductContext)
  const { addToCart } = useContext(CartContext)
  const { language } = useContext(LanguageContext)
  const { handleOpenSidebar, handleCloseSidebar } = useContext(SidebarContext)

  const [imageIndex, setImageIndex] = useState(0)
  const [sizeIndex, setSizeIndex] = useState()
  const [amount, setAmount] = useState(1)
  const [validateAttempt, setValidateAttempt] = useState(false)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initData = async () => {
      const fetchedProduct = await fetchSingleProduct(id)
      setProduct(fetchedProduct)
      setLoading(false)
    }
    initData()
  }, [fetchSingleProduct, id])

  useEffect(() => {
    console.log('Current Image Index:', imageIndex)
  }, [imageIndex])

  if (loading) {
    return (
      <section className='h-screen flex justify-center items-center bg-gray-100'>
        <ClipLoader size={50} color='#4A90E2' />
      </section>
    )
  }

  if (!product) {
    return (
      <section className='h-screen flex justify-center items-center bg-gray-100'>
        <p className='text-xl text-gray-500'>
          {language === 'ar'
            ? 'المنتج غير موجود'
            : language === 'fr'
            ? 'Produit non trouvé'
            : 'Product not found'}
        </p>
      </section>
    )
  }

  return (
    <div className='bg-slate-100'>
      <section className='py-12 px-4 md:px-8 lg:px-16 xl:px-32'>
        <div className='container mx-auto'>
          <div
            className={`flex flex-col lg:flex-row items-center ${
              language === 'ar' ? 'lg:flex-row-reverse' : ''
            } gap-8`}
          >
            {/* Image Gallery */}
            <div className='w-full lg:w-1/2 flex flex-col items-center'>
              <div className='relative w-full max-w-md lg:max-w-lg'>
                {/* Main Image */}
                <img
                  src={product.images.urls[imageIndex]}
                  alt={
                    language === 'ar'
                      ? product.arName
                      : language === 'fr'
                      ? product.frName
                      : product.engName
                  }
                  className='w-full h-auto rounded-lg object-contain'
                />

                {/* Navigation Arrows */}
                <button
                  onClick={() => {
                    setImageIndex((prev) => {
                      const newIndex = Math.max(prev - 1, 0)
                      console.log('Navigating to previous image:', newIndex)
                      return newIndex
                    })
                  }}
                  className={`absolute top-1/2 left-2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition ${
                    imageIndex === 0 ? 'hidden' : 'flex'
                  }`}
                  aria-label='Previous Image'
                >
                  <MdArrowBackIosNew className='text-xl text-gray-700' />
                </button>
                <button
                  onClick={() => {
                    setImageIndex((prev) => {
                      const newIndex = Math.min(
                        prev + 1,
                        product.images.urls.length - 1
                      )
                      console.log('Navigating to next image:', newIndex)
                      return newIndex
                    })
                  }}
                  className={`absolute top-1/2 right-2 transform -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition ${
                    imageIndex === product.images.urls.length - 1
                      ? 'hidden'
                      : 'flex'
                  }`}
                  aria-label='Next Image'
                >
                  <MdOutlineArrowForwardIos className='text-xl text-gray-700' />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className='flex mt-4 space-x-2 overflow-x-auto justify-center lg:justify-start'>
                {product.images.urls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`${
                      language === 'ar'
                        ? product.arName
                        : language === 'fr'
                        ? product.frName
                        : product.engName
                    } ${idx + 1}`}
                    onClick={() => {
                      setImageIndex(idx)
                      console.log('Thumbnail clicked, set image index to:', idx)
                    }}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                      imageIndex === idx
                        ? 'border-primary'
                        : 'border-transparent'
                    } hover:border-primary transition`}
                  />
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className='w-full lg:w-1/2 flex flex-col'>
              {/* Product Title */}
              <h1 className='text-2xl md:text-3xl font-semibold mb-4 text-center lg:text-left'>
                {language === 'ar'
                  ? product.arName
                  : language === 'fr'
                  ? product.frName
                  : product.engName}
              </h1>

              {/* Price */}
              <div className='flex items-center justify-center lg:justify-start mb-4'>
                {product.isSale ? (
                  <>
                    <span className='text-xl line-through text-gray-500 mr-2'>
                      {language === 'ar'
                        ? `دج ${product.price}`
                        : language === 'fr'
                        ? `DA ${product.price}`
                        : `DZD ${product.price}`}
                    </span>
                    <span className='text-2xl font-bold text-primary'>
                      {language === 'ar'
                        ? `دج ${product.salePrice}`
                        : language === 'fr'
                        ? `DA ${product.salePrice}`
                        : `DZD ${product.salePrice}`}
                    </span>
                  </>
                ) : (
                  <span className='text-2xl font-bold text-primary'>
                    {language === 'ar'
                      ? `دج ${product.price}`
                      : language === 'fr'
                      ? `DA ${product.price}`
                      : `DZD ${product.price}`}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className='text-gray-700 mb-6 text-justify lg:text-left'>
                {language === 'ar'
                  ? product.arDescription
                  : language === 'fr'
                  ? product.frDescription
                  : product.engDescription}
              </p>

              {/* Size Selection */}
              <div className='mb-6'>
                <h2 className='text-lg font-medium mb-2'>
                  {language === 'ar'
                    ? 'الحجم'
                    : language === 'fr'
                    ? 'Taille'
                    : 'Size'}
                  :
                </h2>
                <div className='flex space-x-2 overflow-x-auto'>
                  {product.sizes.map((size, idx) => (
                    <button
                      key={size._id}
                      onClick={() => {
                        if (size.inStock) {
                          setSizeIndex(idx)
                          console.log('Selected size index:', idx)
                        }
                      }}
                      disabled={!size.inStock}
                      className={`px-4 py-2 rounded ${
                        sizeIndex === idx
                          ? 'bg-primary text-white'
                          : 'bg-white text-gray-700 border border-gray-300'
                      } ${
                        !size.inStock
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-primary hover:text-white transition'
                      }`}
                    >
                      {size.size}
                    </button>
                  ))}
                </div>
                {validateAttempt && sizeIndex === undefined && (
                  <p className='text-red-500 text-sm mt-2'>
                    {language === 'ar'
                      ? 'الرجاء تحديد حجم'
                      : language === 'fr'
                      ? 'Veuillez choisir une taille'
                      : 'Please select a size'}
                  </p>
                )}
              </div>

              {/* Quantity Selector */}
              <div className='mb-6 flex items-center'>
                <h2 className='text-lg font-medium mr-4'>
                  {language === 'ar'
                    ? 'الكمية'
                    : language === 'fr'
                    ? 'Quantité'
                    : 'Quantity'}
                  :
                </h2>
                <div className='flex items-center border border-gray-300 rounded-lg overflow-hidden'>
                  <button
                    onClick={() => {
                      setAmount((prev) => {
                        const newAmount = Math.max(prev - 1, 1)
                        console.log('Decreased amount to:', newAmount)
                        return newAmount
                      })
                    }}
                    disabled={amount === 1}
                    className={`px-3 py-1 ${
                      amount === 1
                        ? 'cursor-not-allowed text-gray-400'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    <IoMdRemove size={20} />
                  </button>
                  <span className='px-4 py-1'>{amount}</span>
                  <button
                    onClick={() => {
                      setAmount((prev) => {
                        const newAmount = prev + 1
                        console.log('Increased amount to:', newAmount)
                        return newAmount
                      })
                    }}
                    className='px-3 py-1 hover:bg-gray-200'
                  >
                    <IoMdAdd size={20} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col sm:flex-row gap-4'>
                <button
                  onClick={() => {
                    if (sizeIndex !== undefined) {
                      setValidateAttempt(false)
                      addToCart({
                        id: product._id,
                        price: product.isSale
                          ? product.salePrice
                          : product.price,
                        arDescription: product.arDescription,
                        frDescription: product.frDescription,
                        engDescription: product.engDescription,
                        arName: product.arName,
                        frName: product.frName,
                        engName: product.engName,
                        isSale: product.isSale,
                        salePrice: product.salePrice,
                        img: product.images.urls[imageIndex],
                        size: product.sizes[sizeIndex].size,
                        amount: amount,
                      })
                      setAmount(1)
                      handleOpenSidebar()
                      setTimeout(() => {
                        handleCloseSidebar()
                      }, 3000)
                      console.log('Added to cart:', product.engName)
                    } else {
                      setValidateAttempt(true)
                    }
                  }}
                  className='w-full sm:w-auto bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition'
                >
                  {language === 'ar'
                    ? 'أضف إلى السلة'
                    : language === 'fr'
                    ? 'Ajouter au panier'
                    : 'Add to Cart'}
                </button>
                <Link to={sizeIndex !== undefined ? '/checkout' : '#'}>
                  <button
                    onClick={() => {
                      if (sizeIndex !== undefined) {
                        setValidateAttempt(false)
                        addToCart({
                          id: product._id,
                          price: product.isSale
                            ? product.salePrice
                            : product.price,
                          arDescription: product.arDescription,
                          frDescription: product.frDescription,
                          engDescription: product.engDescription,
                          arName: product.arName,
                          frName: product.frName,
                          engName: product.engName,
                          isSale: product.isSale,
                          salePrice: product.salePrice,
                          img: product.images.urls[imageIndex],
                          size: product.sizes[sizeIndex].size,
                          amount: amount,
                        })
                        setAmount(1)
                        handleOpenSidebar()
                        setTimeout(() => {
                          handleCloseSidebar()
                        }, 3000)
                        console.log('Proceeding to checkout:', product.engName)
                      } else {
                        setValidateAttempt(true)
                      }
                    }}
                    className='w-full sm:w-auto bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition'
                  >
                    {language === 'ar'
                      ? 'اشتري الآن'
                      : language === 'fr'
                      ? 'Achetez maintenant'
                      : 'Buy Now'}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetails
