import React, { useContext, useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { IoMdRemove, IoMdAdd } from "react-icons/io";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import BestsellingCarousel from "../components/BestsellingCarousel";
import TitleCard from "../components/TitleCard";
const ProductDetails = () => {
  const { id } = useParams();
  const { products,fetchSingleProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const { handleOpenSidebar, handleCloseSidebar } = useContext(SidebarContext);

  const [imageIndex, setImageIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState();
  const [amount, setAmount] = useState(1);
  const [validateAttempt, setValidateAttempt] = useState(false);
  const [product, setProduct] = useState();
  
  useEffect(()=>{
    initData();
  },[]);
  const initData = async()=>{
    setProduct(await fetchSingleProduct(id))
  }

  return (
    !product  ? <section className="h-screen flex justify-center items-center">
    <ClipLoader />
  </section>:
    <div className="bg-gray-100">
      <section
        className={`pt-32 pb-10 md:px-16 lg:px-16 xl:px-64 lg:py-32 flex items-center bg-hero bg-cover `}
      >
        <div className="container mx-auto">
          {/*image & text wrapper*/}
          <div
            className={`flex flex-col items-center lg:items-start ${
              language === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"
            }`}
          >
            {/* side images */}
            <div className="hidden lg:flex flex-col mx-2 min-w-[100px] max-h-[510px] max-w-[350px] overflow-auto">
              {product.images?.urls.map((url, i) => {
                return (
                  <img
                    onClick={() => setImageIndex(i)}
                    key={i}
                    src={url}
                    style={{
                      cursor: "pointer",
                      height: "150px",
                      width: "100px",
                      border: imageIndex === i ? "2px solid black" : "none",
                      objectFit: "cover",
                    }}
                  />
                );
              })}
            </div>
            {/*image */}
            <div className="relative ">
              <img
                className="max-w-sm"
                src={product?.images?.urls[imageIndex]}
                alt=""
              />
              {/* botton images */}
              <div className="flex lg:hidden mx-2 min-w-[100px] max-h-[510px] max-w-[350px] overflow-auto">
                {product.images?.urls.map((url, i) => {
                  return (
                    <img
                      onClick={() => setImageIndex(i)}
                      key={i}
                      src={url}
                      style={{
                        cursor: "pointer",
                        height: "150px",
                        width: "100px",
                        border: imageIndex === i ? "2px solid black" : "none",
                        objectFit: "cover",
                      }}
                    />
                  );
                })}
              </div>
              <div className="flex w-full justify-center my-2">
                {product.images?.urls.map((url, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full cursor-pointer mr-4
                  ${imageIndex === i ? "bg-black" : "bg-gray-400"}`}
                    onClick={() => {
                      setImageIndex(i);
                    }}
                  ></div>
                ))}
              </div>
              <div
                className="absolute h-full top-0 flex items-center right-0"
                onClick={() => {
                  if (imageIndex < product.images?.urls.length - 1) {
                    setImageIndex(imageIndex + 1);
                  }
                }}
              >
                <MdOutlineArrowForwardIos
                  className={`text-4xl text-white 
                  ${
                    imageIndex < product.images?.urls.length - 1
                      ? "opacity-100"
                      : "opacity-25"
                  }`}
                />
              </div>
              <div
                className="absolute h-full top-0 flex items-center left-0"
                onClick={() => {
                  if (imageIndex > 0) {
                    setImageIndex(imageIndex - 1);
                  }
                }}
              >
                <MdArrowBackIosNew
                  className={`text-4xl text-white 
                  ${imageIndex > 0 ? "opacity-100" : "opacity-25"}`}
                />
              </div>
            </div>
            {/* config panel */}
            <div
              className={`flex  flex-1 flex-col text-center items-center p-4 w-full lg:max-w-[500px]
              ${language === "ar" ? "lg:items-end" : "lg:items-start"}`}
            >
              <div
                className={`flex justify-center lg:justify-start h-8 ${
                  language === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className={language === "ar" ? "text-right" : "text-left"}>
                  {language === "ar"
                    ? ": حجم"
                    : language === "fr"
                    ? "Taille: "
                    : "Size: "}
                </div>
                <div
                  className={`flex mb-6 ml-2 max-w-[310px] overflow-y-auto h-[50px] ${
                    language === "ar" ? "justify-end" : "justify-start"
                  }`}
                >
                  {product.sizes.map((size, i) => {
                    return (
                      <button
                        className="flex-shrink-0"
                        onClick={size.inStock ? () => setSizeIndex(i) : undefined}
                        key={size._id}
                        style={{
                          opacity: size.inStock ? "1" : "0.5",
                          cursor: size.inStock ? "pointer" : "not-allowed",
                          height: "30px",
                          width: "30px",
                          borderRadius: "4px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "8px",
                          backgroundColor: sizeIndex === i ? "black" : "white",
                          color: sizeIndex === i ? "white" : "black",
                          border:
                            sizeIndex === i
                              ? "3px solid black"
                              : "1px solid black",
                          boxSizing: "border-box",
                        }}
                      >
                        {size.size}
                      </button>
                    );
                  })}
                </div>
              </div>
              {validateAttempt && sizeIndex === undefined && (
                <div
                  className={`text-red-500 text-sm text-center ${
                    language === "ar" ? "lg:text-right" : "lg:text-left"
                  }`}
                >
                  {language === "ar"
                    ? "الرجاء تحديد حجم"
                    : language === "fr"
                    ? "Veuillez choisir une taille"
                    : "Please select a size"}
                </div>
              )}

              {/*text */}
              <h1
                className={`text-[26px] font-sedan my-2 lg:mx-0 
                text-center ${
                  language === "ar" ? "lg:text-right" : "lg:text-left"
                }`}
              >
                {language === "ar"
                  ? product.arName
                  : language === "fr"
                  ? product.frName
                  : product.engName}
              </h1>
              <div
                className={`flex ${
                  language === "ar" ? "flex-row-reverse" : "flex-row"
                } `}
              >
                <div
                  className={`text-xl  font-medium mb-6 
                  text-center ${
                    language === "ar"
                      ? "lg:text-right ml-4"
                      : "lg:text-left mr-4"
                  }
                  ${product.isSale ? "line-through text-gray-400" : "text-pink-300"}`}
                >
                  {language === "ar"
                    ? "دج "
                    : language === "fr"
                    ? "DA "
                    : "DZD "}
                  {product.price}
                </div>
                {product.isSale ? (
                  <div
                    className={`font-semibold text-pink-300 ${
                      language === "ar" ? "text-right" : "text-left"
                    }`}
                  >
                    {language === "ar"
                      ? "دج "
                      : language === "fr"
                      ? "DA "
                      : "DZD "}
                    {product.salePrice}
                  </div>
                ) : null}
              </div>
              <p
                className={`mb-8  break-words text-center w-full
                ${language === "ar" ? "lg:text-right" : "lg:text-left"}`}
              >
                {language === "ar"
                  ? product.arDescription
                  : language === "fr"
                  ? product.frDescription
                  : product.engDescription}
              </p>

              {/* quantity */}
              <div
                className={`flex items-center w-[200px] h-[60px] mb-2 mr-4 ${
                  language === "ar" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {language === "ar"
                  ? ": كمية"
                  : language === "fr"
                  ? "Quantité: "
                  : "Quantity: "}
                <div
                  className={`flex flex-1 w-[100px] items-center h-full 
                  border-2 border-primary text-primary font-medium mx-4 rounded-2xl
                  ${language === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"}
                  ${language === "ar" ? "flex-row-reverse" : "flex-row"}
                  `}
                >
                  {/*minus icon */}
                  <button
                    onClick={() => setAmount((prev) => prev - 1)}
                    disabled={amount === 1}
                    className="flex-1 h-full flex justify-center items-center cursor-pointer "
                  >
                    <IoMdRemove
                      className={`${
                        amount === 1 ? "text-gray-300" : "text-black"
                      }`}
                    />
                  </button>
                  {/*amount*/}
                  <div className="h-full flex justify-center items-center px-2">
                    {amount}
                  </div>
                  {/*plus icon */}
                  <div
                    onClick={() => setAmount((prev) => prev + 1)}
                    className="flex-1 h-full flex justify-center items-center cursor-pointer"
                  >
                    <IoMdAdd />
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col items-center ${
                  language === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <button
                  onClick={() => {
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
                        isSale: product.isSale,
                        salePrice: product.salePrice,
                        img: product.images?.urls[imageIndex],
                        size: product.sizes[sizeIndex].size,
                        amount: amount,
                      });
                      setAmount(1);
                      handleOpenSidebar();
                      setTimeout(() => {
                        handleCloseSidebar();
                      }, 3000);
                    } else {
                      setValidateAttempt(true);
                    }
                  }}
                  className="bg-primary py-4 px-8 text-white mb-2 items-center lg:mx-4 rounded-2xl"
                >
                  {language === "ar"
                    ? "أضف إلى السلة"
                    : language === "fr"
                    ? "Ajouter au panier"
                    : "Add to cart"}
                </button>
                <Link to={sizeIndex !== undefined ? "/checkout" : null}>
                  <button
                    onClick={() => {
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
                          isSale: product.isSale,
                          salePrice: product.salePrice,
                          img: product.images?.urls[imageIndex],
                          size: product.sizes[sizeIndex].size,
                          color: product.hex,
                          amount: amount,
                        });
                        setAmount(1);
                        handleOpenSidebar();
                        setTimeout(() => {
                          handleCloseSidebar();
                        }, 3000);
                      } else {
                        setValidateAttempt(true);
                      }
                    }}
                    className="bg-pink-300 py-4 px-8 text-white mb-2 items-center rounded-2xl"
                  >
                    {language === "ar"
                      ? "اشتري الان"
                      : language === "fr"
                      ? "Achetez maintenant"
                      : "Buy now"}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
};

export default ProductDetails;
