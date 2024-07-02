import React, { useContext, useState } from "react";
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
const ProductDetails = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const { handleOpenSidebar, handleCloseSidebar } = useContext(SidebarContext);
  const [colorIndex, setColorIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState();
  const [amount, setAmount] = useState(1);
  const [validateAttempt, setValidateAttempt] = useState(false);

  const product = products.find((item) => {
    return item._id === id;
  });
  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        <ClipLoader />
      </section>
    );
  }
  return (
    <section
      className={`pt-32 pb-10 md:px-16 lg:px-16 xl:px-64 lg:py-32 flex items-center bg-proDetails bg-cover `}
    >
      <div className="container mx-auto">
        {/*image & text wrapper*/}
        <div
          className={`flex flex-col items-center lg:items-start ${
            language === "ar" ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          <div className="flex lg:flex-col mx-2 min-w-[100px]">
            {product.colors[colorIndex].images?.urls.map((url, i) => {
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
          <div className="relative">
            <img
              className="max-w-sm"
              src={product?.colors[colorIndex].images?.urls[imageIndex]}
              alt=""
            />
            <div className="flex w-full justify-center mt-2">
              {product.colors[colorIndex].images?.urls.map((url, i) => (
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
                if (
                  imageIndex < product.colors[colorIndex].images?.urls.length -1
                ) {
                  setImageIndex(imageIndex + 1);
                }
              }}
            >
              <MdOutlineArrowForwardIos className={`text-4xl text-white 
                ${imageIndex < product.colors[colorIndex].images?.urls.length -1 ? 'opacity-100' : 'opacity-25'}`} />
            </div>
            <div
              className="absolute h-full top-0 flex items-center left-0"
              onClick={() => {
               
                if (
                  imageIndex > 0
                ) {
                  setImageIndex(imageIndex - 1);
                }
              }}
            >
              <MdArrowBackIosNew className={`text-4xl text-white 
                ${imageIndex > 0 ? 'opacity-100' : 'opacity-25'}`} />
            </div>
          </div>
          {/* config panel */}
          <div
            className={`flex  flex-1 flex-col text-center items-center p-4 w-full lg:max-w-[500px]
        ${language === "ar" ? "lg:items-end" : "lg:items-start"}`}
          >
            <div
              className={`flex justify-center lg:justify-start ${
                language === "ar" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className={language === "ar" ? "text-right" : "text-left"}>
                {language === "ar"
                  ? ": لون"
                  : language === "fr"
                  ? "Couleur: "
                  : "Color: "}
              </div>
              <div
                className={`flex mb-6 ml-2 ${
                  language === "ar" ? "justify-end" : "justify-start"
                }`}
              >
                {product.colors.length > 1
                  ? product.colors.map((col, i) => {
                      return (
                        <div
                          onClick={() => {
                            setImageIndex(0);
                            setColorIndex(i);
                          }}
                          key={col._id}
                          style={{
                            cursor: "pointer",
                            height: "30px",
                            width: "30px",
                            borderRadius: "6px",
                            backgroundColor: col.hex,
                            marginRight: "16px",
                            border:
                              colorIndex === i
                                ? "3px solid black"
                                : "1px solid black",
                          }}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
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
                className={`flex mb-6 ml-2 ${
                  language === "ar" ? "justify-end" : "justify-start"
                }`}
              >
                {product.colors[colorIndex].sizes.map((size, i) => {
                  return (
                    <button
                      onClick={() => setSizeIndex(i)}
                      key={size._id}
                      disabled={!size.inStock}
                      style={{
                        opacity: size.inStock ? "1" : "0.5",
                        cursor: size.inStock ? "pointer" : "not-allowed",
                        height: "30px",
                        width: "30px",
                        borderRadius: "4px",
                        marginRight: "16px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: sizeIndex === i ? "black" : "white",
                        color: sizeIndex === i ? "white" : "black",
                        border:
                          sizeIndex === i
                            ? "3px solid black"
                            : "1px solid black",
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
              className={`text-[26px] font-sedan mb-2 mx-auto lg:mx-0 
          text-center ${language === "ar" ? "lg:text-right" : "lg:text-left"}`}
            >
              {language === "ar"
                ? product.arName
                : language === "fr"
                ? product.frName
                : product.engName}
            </h1>
            <div
              className={`text-xl text-red-500 font-medium mb-6 
          text-center ${language === "ar" ? "lg:text-right" : "lg:text-left"}`}
            >
              {language === "ar" ? "دج " : language === "fr" ? "DA " : "DZD "}
              {product.price}
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
                      img: product.colors[colorIndex].images?.urls[imageIndex],
                      size: product.colors[colorIndex].sizes[sizeIndex].size,
                      color: product.colors[colorIndex].hex,
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
                        img: product.colors[colorIndex].images?.urls[
                          imageIndex
                        ],
                        size: product.colors[colorIndex].sizes[sizeIndex].size,
                        color: product.colors[colorIndex].hex,
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
                  className="bg-red-500 py-4 px-8 text-white mb-2 items-center rounded-2xl"
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
  );
};

export default ProductDetails;
