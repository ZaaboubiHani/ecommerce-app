import React, { useContext, useState, useEffect, useRef } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { CategoryContext } from "../contexts/CategoryContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { LanguageContext } from "../contexts/LanguageContext";
import ClipLoader from "react-spinners/ClipLoader";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  const { products, loadingProducts, recommends } = useContext(ProductContext);

  const { language } = useContext(LanguageContext);
  const limitedProducts = products.slice(0, 5);

  return (
    <div className="bg-proDetails bg-cover">
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
      <div className="flex flex-col items-center">
        {recommends.map((recommend) => {
          if (recommend.products.length === 0) {
            return null;
          }
          return (
            <div className="w-full">
              <div  className="w-full flex justify-center bg-white mb-4 p-2">
                <h1 className="text-2xl text-center max-w-[500px] font-bold uppercase ">
                  {language === "ar"
                    ? recommend.category?.arName
                    : language === "fr"
                    ? recommend.category?.frName
                    : recommend.category?.engName}
                </h1>
              </div>
              <Carousel
                key={recommend.category._id}
                className="w-full"
                autoPlay={true}
                infiniteLoop={true}
                centerMode={true}
              >
                {recommend.products.map((product) => {
                  return (
                    <div key={product._id}>
                      <Product product={product} key={product._id} />
                    </div>
                  );
                })}
              </Carousel>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
