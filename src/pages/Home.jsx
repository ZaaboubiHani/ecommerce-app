import React, { useContext, useState, useEffect, useRef } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { CategoryContext } from "../contexts/CategoryContext";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { LanguageContext } from "../contexts/LanguageContext";
import ClipLoader from "react-spinners/ClipLoader";
import BestsellingCarousel from "../components/BestsellingCarousel";
import SingleCarousel from "../components/SingleCarousel";
import TitleCard from "../components/TitleCard";
const Home = () => {
  const { loadingProducts, newProducts ,randomProducts,bestsellings} = useContext(ProductContext);

  const { language } = useContext(LanguageContext);
  

  return (
    <div className="bg-cover bg-gray-100">
      <Hero />
      <TitleCard
        title={
          language === "ar"
            ? "مجموعة جديدة"
            : language === "fr"
            ? "Nouvelle Collection"
            : "New Collection"
        }
      />

      <SingleCarousel products={newProducts} />
      <TitleCard
        title={
          language === "ar"
            ? "مقترحات"
            : language === "fr"
            ? "Recommandations"
            : "Recommendations"
        }
      />

      <section >
        <div >
          <div className="flex flex-row"></div>
          {loadingProducts ? (
            <section className="h-screen flex justify-center items-center ">
              <ClipLoader />
            </section>
          ) : (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[16px] max-auto max-w-none md:mx-0 p-4">
                {randomProducts.map((product) => {
                  return <Product product={product} key={product._id} />;
                })}
              </div>
            </div>
          )}
        </div>
      </section>
      <TitleCard
        title={
          language === "ar"
            ? "الأكثر مبيعا"
            : language === "fr"
            ? "Best-Seller"
            : "Bestselling"
        }
      />
      <BestsellingCarousel products={bestsellings} />
    </div>
  );
};

export default Home;
