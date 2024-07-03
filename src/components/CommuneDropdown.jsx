import React, { useState, useContext,useRef,useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { CategoryContext } from '../contexts/CategoryContext';
import { LanguageContext } from '../contexts/LanguageContext';
import data from '../../public/data/wilayas.json';
import Api from '../api/api.source';
const apiInstance = Api.instance;
const CommuneDropdown = ({onSelect,validateAttempt,selectedWilaya}) => {
    const [selectedCommune, setSelectedCommune] = useState();
    const { language } = useContext(LanguageContext);
    const [isCommunesOpen, setIsCommunesOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsCommunesOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    return <div
    key={"commune"}
    className={`relative flex flex-col ${
      language === "ar" ? "items-end" : "items-start"
    }`}
    ref={dropdownRef}
  >
    <button
      onClick={() => {
        setIsCommunesOpen((prev) => !prev);
        setIsShippingTypeOpen(false);
      }}
      className="bg-white p-2 w-full flex items-center justify-between
                        text-l tracking-wider border border-1 border-black h-11 rounded-lg
        duration-300"
    >
      <div
        className={`${
          selectedCommune?.arCommune
            ? "text-black"
            : "text-gray-500"
        }`}
      >
        {language === "ar"
          ? selectedCommune?.arCommune ?? "البلدية"
          : language === "fr"
          ? selectedCommune?.frCommune ?? "Commune"
          : selectedCommune?.enCommune ?? "Commune"}
      </div>
      {!isCommunesOpen ? (
        <IoMdArrowDropdown />
      ) : (
        <IoMdArrowDropup />
      )}
    </button>
    {isCommunesOpen && (
      <div
        className="bg-white absolute top-[50px] flex flex-col items-start p-1 w-full z-10
                                border border-1 border-black max-h-[400px] overflow-x-hidden overflow-y-auto rounded-lg shadow-md
                                "
      >
        {data
          .filter(
            (c) => c.wilaya_name_ascii === selectedWilaya?.frWilaya
          )
          .map((commune) => (
            <div
              onClick={() => {
                setSelectedCommune({
                  arCommune: commune.commune_name,
                  frCommune: commune.commune_name_ascii,
                  enCommune: commune.commune_name_ascii,
                });
                setIsCommunesOpen(false);
                onSelect({
                    arCommune: commune.commune_name,
                    frCommune: commune.commune_name_ascii,
                    enCommune: commune.commune_name_ascii,
                  });
              }}
              key={commune.id}
              className="flex w-full items-center justify-between px-2 hover:bg-gray-300 cursor-pointer border-l-transparent"
            >
              <h3>
                {language === "ar"
                  ? commune.commune_name
                  : language === "fr"
                  ? commune.commune_name_ascii
                  : commune.commune_name_ascii}
              </h3>
            </div>
          ))}
      </div>
    )}
    {validateAttempt && selectedCommune === undefined && (
      <div className="text-red-500 text-sm">
        {language === "ar"
          ? "يرجى تحديد بلديتك"
          : language === "fr"
          ? "Veuillez sélectionner votre Commune"
          : "Please select your Commune"}
      </div>
    )}
  </div>
        ;
};

export default CommuneDropdown;