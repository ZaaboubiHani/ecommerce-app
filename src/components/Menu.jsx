import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MenuContext } from "../contexts/MenuContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { GiLoincloth } from "react-icons/gi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import CategoryDropdown from "../components/CategoryDropdown";
const Menu = () => {
  const navigate = useNavigate();
  const { menuIsOpen, handleCloseMenu } = useContext(MenuContext);
  const { language } = useContext(LanguageContext);

  return (
    <div
      className={`${
        menuIsOpen ? "left-0" : "-left-full"
      } flex flex-col w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-30 px-4 lg:px-[35px]
 
  `}
    >
      <div
        onClick={handleCloseMenu}
        className="cursor-pointer w-8 h-16 flex justify-center items-center"
      >
        <IoMdArrowBack className="text-2xl" />
      </div>

      <Link
        to="/"
        onClick={() => handleCloseMenu()}
        className="hover:bg-slate-100 transition-all duration-300 h-[60px] leading-[60px] px-6 flex items-center"
      >
        <FaHome className="text-2xl mr-4" />
        {language === "ar" ? "إستقبال" : language === "fr" ? "ACCUEIL" : "HOME"}
      </Link>
      <div className="flex items-center">
        <Link
          to="/products"
          onClick={() => () => handleCloseMenu()}
          className="hover:bg-slate-100 transition-all duration-300 h-[60px] leading-[60px] px-6 flex items-center"
        >
          <GiLoincloth className="text-2xl mr-4" />
          {language === "ar"
            ? "منتجات"
            : language === "fr"
            ? "PRODUITS"
            : "PRODUCTS"}
        </Link>
        <CategoryDropdown
          onSelect={() => {
            handleCloseMenu();
            navigate("/products");
          }}
        />
      </div>
      <Link
        to="/about"
        onClick={() => handleCloseMenu()}
        className="hover:bg-slate-100 transition-all duration-300 h-[60px] leading-[60px] px-6 flex items-center"
      >
        <BsFillInfoCircleFill className="text-2xl mr-4" />
        {language === "ar"
          ? "عنا"
          : language === "fr"
          ? "QUI SOMMES-NOUS"
          : "ABOUT US"}
      </Link>
    </div>
  );
};

export default Menu;
