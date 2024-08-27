import React, { useContext, useEffect, useState } from "react"


const DarkModeContext = React.createContext();

export function useDarkMode(){
    return useContext(DarkModeContext)
}

export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        if (storedDarkMode !== null) {
          setIsDarkMode(JSON.parse(storedDarkMode));
        }
      }, []);
  
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
      }, [isDarkMode]);
  
    return (
      <DarkModeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        {children}
      </DarkModeContext.Provider>
    );
  };

