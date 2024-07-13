import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../contexts/LanguageContext";
import { HeroContext } from "../contexts/HeroContext";
import ClipLoader from "react-spinners/ClipLoader";
const doubleStruckMap = {
  A: '𝔸', B: '𝔹', C:  'ℂ', D: '𝔻', E: '𝔼', F: '𝔽', G: '𝔾',
  H: 'ℍ', I: '𝕀', J: '𝕁', K: '𝕂', L: '𝕃', M: '𝕄', N: 'ℕ',
  O: '𝕆', P: 'ℙ', Q: 'ℚ', R: 'ℝ', S: '𝕊', T: '𝕋', U: '𝕌',
  V: '𝕍', W: '𝕎', X: '𝕏', Y: '𝕐', Z: 'ℤ', a: '𝕒', b: '𝕓',
  c: '𝕔', d: '𝕕', e: '𝕖', f: '𝕗', g: '𝕘', h: '𝕙', i: '𝕚',
  j: '𝕛', k: '𝕜', l: '𝕝', m: '𝕞', n: '𝕟', o: '𝕠', p: '𝕡',
  q: '𝕢', r: '𝕣', s: '𝕤', t: '𝕥', u: '𝕦', v: '𝕧', w: '𝕨',
  x: '𝕩', y: '𝕪', z: '𝕫'
};

const toDoubleStruck = (text) => {
  return text.split('').map(char => doubleStruckMap[char] || char).join('');
};


const Hero = () => {
  const { language } = useContext(LanguageContext);
  const { fetchHeros, heros } = useContext(HeroContext);

  useEffect(() => {
    fetchHeros();
  }, []);
  return (
    <section className="h-[800px] bg-hero lg:bg-hero1 bg-no-repeat bg-cover bg-center py-24">
      {heros.length > 0 ? (
        <div className="container mx-auto flex justify-around font-primary h-full transition-all duration-300">
          {/* text */}
          <div className="flex flex-col justify-center">
            {/* pretitle */}
            <div className="text-2xl flex items-center uppercase font-double-struck justify-center  ">
              
              {toDoubleStruck(language === "ar"
                ? heros[0].arName
                : language === "fr"
                ? heros[0].frName
                : heros[0].engName)}
            </div>
            {/* title */}
            <h1 className="text-[50px] md:text-[100px] lg:text-[120px] xl:text-[170px] leading-[1.1] font-title mb-4 whitespace-nowrap text-center">
              {language === "ar"
                ? heros[1].arName
                : language === "fr"
                ? heros[1].frName
                : heros[1].engName}
              <br />
            </h1>
            <h1
              className="uppercase font-primary font-light text-center text-sm"
            >
              {language === "ar"
                ? heros[2].arName
                : language === "fr"
                ? heros[2].frName
                : heros[2].engName}
            </h1>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex justify-center items-center">
          <ClipLoader />
        </div>
      )}
    </section>
  );
};

export default Hero;
