import React, { createContext, useState, useEffect } from "react";
export const HeroContext = createContext();
import axios from "axios";
import Api from "../api/api.source";
const apiInstance = Api.instance;
const HeroProvider = ({ children }) => {
  const [heros, setHeros] = useState([]);

  const fetchHeros = async () => {
    const response = await apiInstance.getAxios().get(`/heroes`);
    setHeros(response.data);
  };

  return (
    <HeroContext.Provider value={{ fetchHeros, heros }}>
      {children}
    </HeroContext.Provider>
  );
};

export default HeroProvider;
