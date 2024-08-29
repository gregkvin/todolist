import React, { useContext, useEffect, useState } from "react"


const CityContext = React.createContext();

export function useCity(){
    return useContext(CityContext)
}

export const CityProvider = ({ children }) => {

    const [selectedCity, setSelectedCity] = useState("")

    useEffect(() => {
        const storedCity = localStorage.getItem("selectedCity");
        if (storedCity) {
            setSelectedCity(storedCity);
        }
    }, []);
  
    return (
      <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
        {children}
      </CityContext.Provider>
    );
  };

