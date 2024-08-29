import React, { useEffect, useState } from "react";
import { faEraser, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCity } from "./CityProvider";

function CityModal({ isOpen, onClose }) {
    const [city, setCity] = useState("");
    const [citySuggestions, setCitySuggestions] = useState([]);
    const { setSelectedCity } = useCity(); 

    useEffect(() => {
        if(isOpen){
            const storedCity = localStorage.getItem("selectedCity");
            if(storedCity){
                setCity(storedCity);
            }
        }
    }, [isOpen])

    const fetchCity = async (cityName) => {
        try {
          const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=cc0cedf14be5a6750f3792b71a3aa9e6
`);
          console.log(response.data)
          setCitySuggestions(response.data);
        } catch (error) {
          console.error("Error fetching city data:", error);
        }
      };

    const handleCityChange = (e) => {
        setCity(e.target.value);
        fetchCity(e.target.value);
    };

    const handleSave = (suggestion) => {
        setCity(suggestion.name);
        localStorage.setItem("selectedCity", suggestion.name);
        setSelectedCity(suggestion.name)
        onClose();
    }

    const handleClear = () => {
        setCity("");
        setCitySuggestions([]);
    }

    return (
        isOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 z-50">
                <div className="p-4 w-full h-full max-w-[600px] max-h-[300px] relative">
                <button
                        className="absolute top-4 right-10 text-slate-500 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 text-lg"
                        onClick={handleClear}
                    >
                        <FontAwesomeIcon icon={faEraser} />
                    </button>
                    <button
                        className="absolute top-4 right-4 text-slate-500 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 text-lg"
                        onClick={() => onClose()}
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <input
                        type="text"
                        placeholder="Enter city name"
                        className="focus:outline-none bg-transparent mb-4 pl-1 w-[200px] font-sans font-thin text-lg dark:text-gray-300"
                        value={city}
                        onChange={handleCityChange}
                    />
                     
                    <ul className="max-h-60 overflow-y-auto border border-gray-300 dark:bg-gray-300 dark:bg-opacity-50 rounded-lg scroll-hidden">
                        {citySuggestions.map((suggestion, index) => (
                            <li
                                key={`${suggestion.name}-${index}`}
                                className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
                                onClick={() => handleSave(suggestion)}
                            >
                                <div className="text-sm font-sans">{suggestion.name}</div>
                                <div className="text-xs text-gray-500 font-sans font-thin">{suggestion.country}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    );


}

export default CityModal;