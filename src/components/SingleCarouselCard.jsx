import React, { useContext } from "react";
import { Link } from "react-router-dom/dist";
import { BsEyeFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { LanguageContext } from "../contexts/LanguageContext";

const SingleCarouselCard = ({ product }) => {
  const { language } = useContext(LanguageContext);
  const {
    _id,
    category,
    arName,
    frName,
    engName,
    price,
    colors,
    createdAt,
  } = product;
  const isAvailable = colors?.some(color =>
    color.sizes.some(size => size.inStock)
  );
  return (
    <div className="bg-white relative rounded-lg shadow-md w-[350px] h-[450px]">
      <div className="border border-[#e4e4e4] w-[350px] h-[450px] mb-4 relative overflow-hidden group transition rounded-lg">
        <div className="w-full h-full flex justify-center items-center">
          {/* Image */}
          <div className="w-full mx-auto flex justify-center items-center">
            <Link to={`/product/${_id}`}>
              <img
                className="object-contain group-hover:scale-110 transition duration-[2000ms] rounded-lg"
                src={colors[0].images.urls[0]}
                alt=""
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCarouselCard;
