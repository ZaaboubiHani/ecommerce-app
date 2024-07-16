import React, { useContext, useState, useEffect, useRef } from "react";
import Product from "../components/Product";
import ClipLoader from "react-spinners/ClipLoader";
import { ProductContext } from "../contexts/ProductContext";
import { LanguageContext } from "../contexts/LanguageContext";

const Promotion = () => {
  const { promotions,loadingProducts } = useContext(ProductContext);
  const { language } = useContext(LanguageContext);
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-200">
       <section >
        <div >
          <div className="flex flex-row"></div>
          {loadingProducts ? (
            <section className="h-screen flex justify-center items-center ">
              <ClipLoader />
            </section>
          ) : promotions.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[16px] max-auto max-w-none md:mx-0 p-4">
                {promotions.map((product) => {
                  return <Product product={product} key={product._id} />;
                })}
              </div>
            </div>
          ) : (<h1>
            {
                  language === "ar"
                  ? "لا عروض ترويجية"
                  : language === "fr"
                  ? "Aucune promotion"
                  : "No promotions"
            }
          </h1> )}
        </div>
      </section>
    </div>
  );
};

export default Promotion;
