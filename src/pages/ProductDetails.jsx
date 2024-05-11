import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { SidebarContext } from '../contexts/SidebarContext';
import { IoMdRemove, IoMdAdd } from 'react-icons/io';
import ClipLoader from "react-spinners/ClipLoader";
const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const { setIsOpen, handleClose } = useContext(SidebarContext);
  const [colorIndex, setColorIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState();
  const [amount, setAmount] = useState(1);
  const [validateAttempt, setValidateAttempt] = useState(false);

  const product = products.find(item => {
    return item._id === id;
  });
  if (!product) {
    return <section className='h-screen flex justify-center items-center'>
      <ClipLoader/>
    </section>
  }
  return <section className='pt-32 pb-10 px-32 lg:py-32 flex items-center bg-gray-100'>
    <div className="container mx-auto">
      {/*image & text wrapper*/}
      <div className='flex flex-col lg:flex-row items-center lg:items-start'>
        <div className='flex lg:flex-col h-full mr-2'>
          {
            product.colors[colorIndex].images?.urls.map((url, i) => {
              return <img
                onClick={() => setImageIndex(i)}
                key={i}
                src={url}
                style={{
                  cursor: 'pointer',
                  height: '150px',
                  border: imageIndex === i ? '2px solid black' : 'none',
                  objectFit: 'cover',
                }} />
            })
          }
        </div>
        {/*image */}
        <img className='max-h-[500px] lg:max-w-sm'
          src={product?.colors[colorIndex].images?.urls[imageIndex]} alt="" />
        {/* config panel */}
        <div className='flex-1 text-center lg:text-left bg-white p-4 ml-2'>
          <div>
            {language === 'ar' ? 'لون : ' : language === 'fr' ? 'Couleur: ' : 'Color: '}
          </div>
          <div className='flex mb-6'>

            {
              product.colors.length > 1 ? product.colors.map((col, i) => {
                return <div
                  onClick={() => {
                    setImageIndex(0);
                    setColorIndex(i);
                  }}
                  key={col._id}
                  style={{
                    cursor: 'pointer',
                    height: '30px',
                    width: '30px',
                    borderRadius: '20px',
                    backgroundColor: col.hex,
                    marginRight: '16px',
                    border: colorIndex === i ? '3px solid black' : '1px solid black'
                  }} />
              }) : null
            }
          </div>
          <div>
            {language === 'ar' ? 'حجم : ' : language === 'fr' ? 'Taille: ' : 'Size: '}
          </div>
          <div className='flex mb-6'>
            {
              product.colors[colorIndex].sizes.map((size, i) => {
                return <button
                  onClick={() => setSizeIndex(i)}
                  key={size._id}
                  disabled={!size.inStock}
                  style={{
                    opacity: size.inStock ? '1' : '0.5',
                    cursor: size.inStock ? 'pointer' : 'not-allowed',
                    height: '30px',
                    width: '30px',
                    borderRadius: '4px',
                    marginRight: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: sizeIndex === i ? '3px solid black' : '1px solid black'
                  }} >
                  {size.size}
                </button>
              })
            }
          </div>
          {validateAttempt && (sizeIndex === undefined) && (
            <div className="text-red-500 text-sm">
              {language === 'ar' ? 'الرجاء تحديد حجم' : language === 'fr' ? 'Veuillez choisir une taille' : 'Please select a size'}
            </div>
          )}
          {/* quantity */}
          <div className='flex'>
            {language === 'ar' ? 'كمية : ' : language === 'fr' ? 'Quantité: ' : 'Quantity: '}

            <div className='flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium ml-4'>
              {/*minus icon */}
              <button onClick={() => setAmount((prev) => (prev - 1))}
                disabled={amount === 1}
                className='flex-1 h-full flex justify-center items-center cursor-pointer '>
                <IoMdRemove className={`${amount === 1 ? 'text-gray-300' : 'text-black'}`} />
              </button>
              {/*amount*/}
              <div className='h-full flex justify-center items-center px-2'>
                {amount}
              </div>
              {/*plus icon */}

              <div onClick={() => setAmount((prev) => (prev + 1))}
                className='flex-1 h-full flex justify-center items-center cursor-pointer'>
                <IoMdAdd />
              </div>
            </div>
          </div>
          {/*text */}
          <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>
            {language === 'ar' ? product.arName : language === 'fr' ? product.frName : product.engName}
          </h1>
          <div className='text-xl text-red-500 font-medium mb-6'>
            {language === 'ar' ? 'دج ' : language === 'fr' ? 'DA ' : 'DZD '}
            {product.price}</div>
          <p className='mb-8'>
            {language === 'ar' ? product.arDescription : language === 'fr' ? product.frDescription : product.engDescription}
          </p>

          <button onClick={() => {
            if (sizeIndex !== undefined) {
              setValidateAttempt(false);
              addToCart({
                id: product._id,
                price: product.price,
                arDescription: product.arDescription,
                frDescription: product.frDescription,
                engDescription: product.engDescription,
                arName: product.arName,
                frName: product.frName,
                engName: product.engName,
                img: product.colors[colorIndex].images?.urls[imageIndex],
                size: product.colors[colorIndex].sizes[sizeIndex].size,
                color: product.colors[colorIndex].hex,
                amount:amount,
              });
              setAmount(1);
              setIsOpen(true);
              setTimeout(() => {
                handleClose();
              }, 3000);
            }
            else {
              setValidateAttempt(true);
            }
          }}
            className='bg-primary py-4 px-8 text-white'>
            {language === 'ar' ? 'أضف إلى السلة' : language === 'fr' ? 'Ajouter au panier' : 'Add to cart'}
          </button>
        </div>
      </div>

    </div>
  </section>;

};

export default ProductDetails;
