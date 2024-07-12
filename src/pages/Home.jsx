import React, { useContext, useState, useEffect, useRef } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { CategoryContext } from "../contexts/CategoryContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { LanguageContext } from "../contexts/LanguageContext";
import ClipLoader from "react-spinners/ClipLoader";
import BestsellingCarousel from "../components/BestsellingCarousel";
const Home = () => {
  const { products, loadingProducts, recommends } = useContext(ProductContext);

  const { language } = useContext(LanguageContext);
  const limitedProducts = products.slice(0, 5);

  return (
    <div className="bg-cover">
      <Hero />
      <section className="py-16 ">
        <div className="">
          <div className="flex flex-row"></div>
          {loadingProducts ? (
            <section className="h-screen flex justify-center items-center ">
              <ClipLoader />
            </section>
          ) : (
            <div>
              <div className="grid grid-cols-2 mt-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[16px] max-auto max-w-none md:mx-0 p-4">
                {limitedProducts.map((product) => {
                  return <Product product={product} key={product._id} />;
                })}
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="w-full flex justify-center ">
        <div className=" m-6 p-8 w-[500px] shadow-md">
          <h1 className="text-3xl text-center  uppercase ">
            {language === "ar"
              ? "الأكثر مبيعا"
              : language === "fr"
              ? "Besy-Seller"
              : "Bestselling"}
          </h1>
          <div
            className="border border-b-1 border-b-black mt-4
          "
          />
        </div>
      </div>

      <BestsellingCarousel products={recommends} />
    </div>
  );
};

export default Home;
