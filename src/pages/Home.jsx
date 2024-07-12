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
        <div className="container mx-auto">
          <div className="flex flex-row"></div>
          {loadingProducts ? (
            <section className="h-screen flex justify-center items-center ">
              <ClipLoader />
            </section>
          ) : (
            <div>
              <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm max-auto md:max-w-none md:mx-0 ">
                {limitedProducts.map((product) => {
                  return <Product product={product} key={product._id} />;
                })}
              </div>
            </div>
          )}
        </div>
      </section>
      <div className="w-full flex justify-center">
        <div className="bg-gray-800 m-6 p-8 w-[500px]">
          <h1 className="text-3xl  text-white  text-center  uppercase ">
            Bestselling
          </h1>
          <div
            className="border border-b-1 border-b-white-500 mt-4
          "
          />
        </div>
      </div>

      <BestsellingCarousel products={recommends}/>
    </div>
  );
};

export default Home;
