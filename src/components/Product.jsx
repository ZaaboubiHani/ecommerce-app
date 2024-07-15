import React, { useContext } from "react";
import { Link } from "react-router-dom/dist";
import { BsEyeFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { LanguageContext } from "../contexts/LanguageContext";
const Product = ({ product }) => {
  const { language } = useContext(LanguageContext);
  const {
    _id,
    category,
    arName,
    frName,
    engName,
    price,
    images,
    sizes,
    isSale,
    salePrice,
    new: isNew,
    createdAt,
  } = product;

  const isAvailable = sizes.some((size) => size.inStock);
  return (
    <div className="bg-white relative rounded-2xl shadow-md w-[180px] sm:w-[240px]">
      {/* Check if createdAt is at least a month old */}
      {isNew ? (
        <div
          className={`absolute bg-white top-2 rounded p-1 z-10 text-xs opacity-60
        ${language === "ar" ? "right-2" : "left-2"}`}
        >
          {language === "ar" ? "جديد" : language === "fr" ? "Nouveau" : "New"}
        </div>
      ) : null}
      {isAvailable ? (
        <div
          className={`absolute bg-white top-10 rounded p-1 z-10 flex items-center text-xs opacity-60
        ${language === "ar" ? "flex-row-reverse" : ""} ${
            language === "ar" ? "right-2" : "left-2"
          }`}
        >
          {language === "ar"
            ? "متوفر"
            : language === "fr"
            ? "Disponible"
            : "Available"}
          <IoCheckmark className="text-black" />
        </div>
      ) : (
        <div
          className={`absolute bg-white top-10 rounded p-1 z-10 flex items-center text-xs opacity-60
       ${language === "ar" ? "flex-row-reverse" : ""} ${
            language === "ar" ? "right-2" : "left-2"
          }`}
        >
          {language === "ar"
            ? "غير متوفر"
            : language === "fr"
            ? "Indisponible"
            : "Unvailable"}
          <IoClose className="text-black" />
        </div>
      )}
      <div className="border border-[#e4e4e4] h-[200] sm:h-[300px] mb-4 relative overflow-hidden group transition rounded-2xl">
        <div className="w-full h-full flex justify-center items-center">
          {/* Image */}
          <div className="w-full mx-auto flex justify-center items-center">
            <Link to={`/product/${_id}`}>
              <img
                className=" group-hover:scale-110 transition duration-[2000ms] rounded-2xl"
                src={images?.urls[0]}
                alt=""
              />
            </Link>
          </div>
        </div>
        {/* Buttons */}
        <div
          className={`absolute top-2 p-2 flex flex-col items-center justify-center 
        gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
          language === "ar"
            ? "-left-11 group-hover:left-4"
            : "-right-11 group-hover:right-4"
        }`}
        >
          <Link
            to={`/product/${_id}`}
            className="w-12 h-12 bg-white flex justify-center items-center drop-shadow-xl rounded-lg opacity-40"
          >
            <BsEyeFill className="text-black" />
          </Link>
        </div>
      </div>
      {/* catergory title and price */}
      <div className="px-4 pb-4">
        <div
          className={`text-sm capitalize text-gray-500 ${
            language === "ar" ? "text-right" : "text-left"
          } `}
        >
          {language === "ar"
            ? category.arName
            : language === "fr"
            ? category?.frName
            : category.engName}
        </div>
        <Link to={`/product/${_id}`}>
          <h2
            className={`font-semibold mb-1 ${
              language === "ar" ? "text-right" : "text-left"
            }`}
          >
            {language === "ar" ? arName : language === "fr" ? frName : engName}
          </h2>
        </Link>
        <div
          className={`flex ${
            language === "ar" ? "flex-row-reverse" : "flex-row"
          } `}
        >
          <div
            className={`font-semibold  ${
              language === "ar" ? "text-right ml-4" : "text-left mr-4"
            } 
            ${isSale ? "line-through text-gray-400" : ""}`}
          >
            {language === "ar" ? "دج " : language === "fr" ? "DA " : "DZD "}
            {price}
          </div>
          {isSale ? (
            <div
              className={`font-semibold ${
                language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {language === "ar" ? "دج " : language === "fr" ? "DA " : "DZD "}
              {salePrice}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Product;
