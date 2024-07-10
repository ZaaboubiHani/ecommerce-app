import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import { HeroContext } from "../contexts/HeroContext";
import ClipLoader from "react-spinners/ClipLoader";

const Hero = () => {
  const { language } = useContext(LanguageContext);
  const { fetchHeros, heros } = useContext(HeroContext);

  useEffect(() => {
    fetchHeros();
  }, []);
  return (
    <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24">
      {heros.length > 0 ? (
        <div className="container mx-auto flex justify-around h-full transition-all duration-300">
          {/* text */}
          <div className="flex flex-col justify-center">
            {/* pretitle */}
            <div className="font-semibold flex items-center uppercase">
              <div className="w-10 h-[2px] bg-red-500 mr-3"></div>
              {language === "ar"
                ? heros[0].arName
                : language === "fr"
                ? heros[0].frName
                : heros[0].engName}
            </div>
            {/* title */}
            <h1 className="text-[70px] leading-[1.1] font-light mb-4">
              {language === "ar"
                ? heros[1].arName
                : language === "fr"
                ? heros[1].frName
                : heros[1].engName}
              <br />
            </h1>
            <Link
              to="/about"
              className="self-start uppercase font-semibold border-b-2 border-primary"
            >
              {language === "ar"
                ? heros[2].arName
                : language === "fr"
                ? heros[2].frName
                : heros[2].engName}
            </Link>
          </div>
        </div>
      ) : <ClipLoader />}
    </section>
  );
};

export default Hero;
