import React, { useState, useRef, useEffect } from "react";
import BestsellingCard from "./BestsellingCard";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import SingleCarouselCard from "./SingleCarouselCard";

const SingleCarousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector(".card");
      if (card) {
        setCardWidth(card.offsetWidth + 16); // adding margin
      }
    }
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current && cardWidth) {
        const index = Math.round(carouselRef.current.scrollLeft / cardWidth);
        setCurrentIndex(index);
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => {
        carousel.removeEventListener("scroll", handleScroll);
      };
    }
  }, [cardWidth]);

  const scrollToIndex = (index) => {
    if (carouselRef.current && cardWidth) {
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
    }
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < products.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center mb-4">
      <div className="relative w-[350px] h-[450px]">
        <div
          ref={carouselRef}
          className="flex flex-row overflow-x-auto scroll-smooth items-center snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div key={product._id} className="card snap-start">
              <SingleCarouselCard product={product} />
            </div>
          ))}
        </div>
        <div className="flex w-full justify-center mt-2">
          {products.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full cursor-pointer mr-4 ${
                i === currentIndex ? "bg-black" : "bg-gray-400"
              }`}
              onClick={() => scrollToIndex(i)}
            ></div>
          ))}
        </div>
        <div className="absolute h-full top-0 flex items-center right-0">
          <MdOutlineArrowForwardIos
            className={`text-4xl text-white cursor-pointer ${
              currentIndex === products.length - 1
                ? "opacity-50"
                : "opacity-100"
            }`}
            onClick={handleNext}
          />
        </div>
        <div className="absolute h-full top-0 flex items-center left-0">
          <MdArrowBackIosNew
            className={`text-4xl text-white cursor-pointer ${
              currentIndex === 0 ? "opacity-50" : "opacity-100"
            }`}
            onClick={handlePrev}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCarousel;
