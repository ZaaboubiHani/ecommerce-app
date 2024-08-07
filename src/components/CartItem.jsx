import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdClose, IoMdRemove, IoMdAdd } from "react-icons/io";
import { CartContext } from "../contexts/CartContext";
import { LanguageContext } from "../contexts/LanguageContext";
const CartItem = ({ item }) => {
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  const { language } = useContext(LanguageContext);
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div
        className={`w-full min-h-[150px] flex items-center gap-x-4 ${
          language === "ar" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* image */}
        <Link to={`/product/${item.id}`}>
          <img className="max-w-[80px]" src={item.img} alt="" />
        </Link>
        <div
          className={`w-full flex flex-col ${
            language === "ar" ? "items-end" : "items-start"
          }`}
        >
          {/* title and remove icon */}
          <div
            className={`flex justify-between mb-2 w-full ${
              language === "ar" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/*title */}
            <Link
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
              to={`/product/${item.id}`}
            >
              {language === "ar"
                ? item.arName
                : language === "fr"
                ? item.frName
                : item.engName}
            </Link>
            {/*remove icon */}
            <div
              onClick={() => removeFromCart(item.id, item.size)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className={`flex w-full items-start ${language === "ar" ? "flex-row-reverse" : "flex-row"}`}>
            <div className={`${language === "ar" ? "ml-2" : "mr-2"}`}>
              {/*  quantity */}
              <div
                className={`flex flex-1 max-w-[100px] items-center h-[30px] border text-primary font-medium  mb-2 ${
                  language === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/*minus icon */}
                <button
                  onClick={() => decreaseAmount(item.id, item.size)}
                  disabled={item.amount === 1}
                  className="flex-1 h-full flex justify-center items-center cursor-pointer "
                >
                  <IoMdRemove
                    className={`${
                      item.amount === 1 ? "text-gray-300" : "text-black"
                    }`}
                  />
                </button>
                {/*amount*/}
                <div className="h-full flex justify-center items-center px-2">
                  {item.amount}
                </div>
                {/*plus icon */}
                <div
                  onClick={() => increaseAmount(item.id, item.size)}
                  className="flex-1 h-full flex justify-center items-center cursor-pointer"
                >
                  <IoMdAdd />
                </div>
              </div>
              {/* size */}
              <div
                style={{
                  cursor: "pointer",
                  height: "25px",
                  width: "25px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "4px",
                  border: "1px solid black",
                }}
              >
                {item.size}
              </div>
            </div>
            {/* prices labels */}
            <div className=" w-full">
              <div
                className={`flex gap-x-2 justify-start h-[36px] text-sm ${
                  language === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/*  item price */}
                <div
                  className={`flex items-center 
              ${item.isSale ? "line-through text-gray-400" : ""}`}
                >
                  {language === "ar"
                    ? "دج "
                    : language === "fr"
                    ? "DA "
                    : "DZD "}
                  {parseFloat(item.price).toFixed(2)}
                </div>
                {/*  final price */}
                <div
                  className={`flex items-center text-primary font-medium 
              ${item.isSale ? "line-through text-gray-400" : ""}`}
                >
                  {language === "ar"
                    ? "دج "
                    : language === "fr"
                    ? "DA "
                    : "DZD "}

                  {parseFloat(item.price * item.amount).toFixed(2)}
                </div>
              </div>
              {item.isSale ? (
                <div
                  className={`flex gap-x-2 h-[36px] text-sm  ${
                    language === "ar" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/*  item price */}
                  <div className="flex items-center">
                    {language === "ar"
                      ? "دج "
                      : language === "fr"
                      ? "DA "
                      : "DZD "}
                    {parseFloat(item.salePrice).toFixed(2)}
                  </div>
                  {/*  final price */}
                  <div className="flex items-center text-primary font-medium">
                    {language === "ar"
                      ? "دج "
                      : language === "fr"
                      ? "DA "
                      : "DZD "}
                    {parseFloat(item.salePrice * item.amount).toFixed(2)}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
