import React, { useState, useRef, useEffect } from 'react'
import BestsellingCard from './BestsellingCard'
import { MdOutlineArrowForwardIos } from 'react-icons/md'
import { MdArrowBackIosNew } from 'react-icons/md'

const BestsellingCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const [cardWidth, setCardWidth] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector('.card')
      if (card) {
        setCardWidth(card.offsetWidth + 16) // Adding margin/padding if needed
      }
    }
  }, [products])

  const scrollToIndex = (index) => {
    if (carouselRef.current && cardWidth) {
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth',
      })
    }
    setCurrentIndex(index)
  }

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      scrollToIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    }
  }

  return (
    <div className='relative mb-4 pb-4'>
      <div
        ref={carouselRef}
        className='flex flex-row w-full overflow-x-auto scroll-smooth items-center no-scrollbar'
      >
        {products.map((product) => (
          <div key={product._id} className='m-2 card'>
            <BestsellingCard product={product} />
          </div>
        ))}
      </div>
      <div className='flex w-full justify-center mt-2'>
        {products.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full cursor-pointer mr-4 ${
              i === currentIndex ? 'bg-black' : 'bg-gray-400'
            }`}
            onClick={() => scrollToIndex(i)}
          ></div>
        ))}
      </div>
      <div className='absolute h-full top-0 flex items-center right-0'>
        <MdOutlineArrowForwardIos
          className={`text-4xl text-white cursor-pointer ${
            currentIndex === products.length - 1 ? 'opacity-50' : 'opacity-100'
          }`}
          onClick={handleNext}
        />
      </div>
      <div className='absolute h-full top-0 flex items-center left-0'>
        <MdArrowBackIosNew
          className={`text-4xl text-white cursor-pointer ${
            currentIndex === 0 ? 'opacity-50' : 'opacity-100'
          }`}
          onClick={handlePrev}
        />
      </div>
    </div>
  )
}

export default BestsellingCarousel
