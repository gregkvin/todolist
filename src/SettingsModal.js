import React, { useEffect, useState } from "react";
import { faEraser, faKey, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useCity } from "./CityProvider";

function SettingsModal({ isOpen, onClose }) {
    const [apiKey, setApiKey] = useState("");
    const [isApiKeyValid, setIsApiKeyValid] = useState(false);
    const [error, setError] = useState("");

    const [city, setCity] = useState("");
    const [citySuggestions, setCitySuggestions] = useState([]);
    const { setSelectedCity } = useCity(); 

    useEffect(() => {
        if(isOpen){
            const storedApiKey = localStorage.getItem("apiKey");
            const storedCity = localStorage.getItem("selectedCity");
            if (storedApiKey) {
                setApiKey(storedApiKey);
                validateApiKey(storedApiKey);
            }
            if(storedCity){
                setCity(storedCity);
            }
        }
    }, [isOpen])

    const validateApiKey = async (key) => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`);
            if (response.status === 200) {
                setIsApiKeyValid(true);
                localStorage.setItem("apiKey", key);
                setError("");
            }
        } catch (error) {
            console.error("Invalid API key:", error);
            setIsApiKeyValid(false);
            setError("Invalid API key.");
        }
    };


    const fetchCity = async (cityName) => {
        if (!isApiKeyValid) return;
        try {
          const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}
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

    const handleCitySave = (suggestion) => {
        setCity(suggestion.name);
        localStorage.setItem("selectedCity", suggestion.name);
        setSelectedCity(suggestion.name)
        onClose();
    }

    const handleApiKeyChange = (e) => {
        const key = e.target.value;
        setApiKey(key);
        if (key) {
            validateApiKey(key);
        } else {
            setIsApiKeyValid(false);
        }
    };


    return (
        isOpen && (
            <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 z-50">
                         <button
                            className="absolute top-16 right-4 text-slate-500 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 text-lg"
                            onClick={() => onClose()}
                            >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                <div className="px-4 py-1 w-full h-full max-w-[600px] max-h-[300px] relative">
                <div className="mb-4">
                    <h2 className="inline-block mb-2 px-2 py-1 mx-1 font-sans rounded bg-amber-100 text-black dark:bg-amber-700 dark:text-white text-xs">API Key</h2>
                    <input
                        type="text"
                        placeholder="Enter your API key"
                        className="focus:outline-none bg-transparent mb-2 pl-1 w-full font-sans font-thin text-lg dark:text-gray-300"
                        value={apiKey}
                        onChange={handleApiKeyChange}
                    />

                     {error && (
                        <div className="text-red-500 font-sans text-xs mx-1 dark:text-red-300 mb-2">
                            {error}
                        </div>
                    )}
                </div>

                {isApiKeyValid && (
                                    <>
                                     <h2 className="inline-block px-2 mb-2 py-1 mx-1 font-sans rounded bg-emerald-100 text-black dark:bg-emerald-700 dark:text-white text-xs">City</h2>
                                        <input
                                            type="text"
                                            placeholder="Enter city name"
                                            className="focus:outline-none bg-transparent mb-2 pl-1 w-full font-sans font-thin text-lg dark:text-gray-300"
                                            value={city}
                                            onChange={handleCityChange}
                                        />
                                         
                                        <ul className="max-h-60 overflow-y-auto border border-gray-300 dark:bg-gray-300 dark:bg-opacity-50 rounded-lg scroll-hidden">
                                            {citySuggestions.map((suggestion, index) => (
                                                <li
                                                    key={`${suggestion.name}-${index}`}
                                                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 transition-colors"
                                                    onClick={() => handleCitySave(suggestion)}
                                                >
                                                    <div className="text-sm font-sans">{suggestion.name}</div>
                                                    <div className="text-xs text-gray-500 font-sans font-thin dark:text-black">{suggestion.country}</div>
                                                </li>
                                            ))}
                                        </ul>
                                        </>
                ) }

                </div>
            </div>

        )
        
    );


}

export default SettingsModal;