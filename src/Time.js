import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useCity } from "./CityProvider";
import axios from "axios";

function Time() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const { selectedCity } = useCity();
    const [timezone, setTimezone] = useState("");
    const [weather, setWeather] = useState([]);
    const [weatherIcon, setWeatherIcon] = useState("");
    const [apiKeyValid, setApiKeyValid] = useState(true);
    const [error, setError] = useState("");

    const MORNING = 'Good Morning';
    const AFTERNOON = 'Good Afternoon';
    const EVENING = 'Good Evening';
    const NIGHT = 'Good Night';

    useEffect(() => {
        if (selectedCity) {
            const fetchTimezone = async () => {
                try {
                    const apiKey = localStorage.getItem("apiKey");
                    if (!apiKey) {
                        setError("API key is missing. Please set up your API key.");
                        setApiKeyValid(false);
                        return;
                    }

                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`);
                    const { timezone } = response.data;
                    const { temp } = response.data.main;
                    const { icon } = response.data.weather[0];
                    console.log(response.data)
                    setTimezone(timezone);
                    setWeather(temp);
                    setWeatherIcon(icon);
                    setError("");
                    setApiKeyValid(true);
                } catch (error) {
                    console.error("Error fetching timezone:", error);
                    setApiKeyValid(false);
                    setTimezone(null);
                    setError("Invalid API key or error fetching data.");
                }
            };

            fetchTimezone();
        }
    }, [selectedCity]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const utcTime = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000); 
            const adjustedTime = timezone ? new Date(utcTime.getTime() + timezone * 1000) : new Date();
            setCurrentTime(adjustedTime);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timezone]);

    const date = currentTime.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    const time = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const [hours, minutes, seconds] = time.split(/:| /);

    const hour = parseInt(hours, 10);
    const greeting = (() => {
        switch (true) {
            case (hour >= 5 && hour < 12):
                return MORNING;
            case (hour >= 12 && hour < 18):
                return AFTERNOON;
            case (hour >= 18 && hour < 24):
                return EVENING;
            default:
                return NIGHT;
        }
    })();

    const icon = (() => {
        switch (true) {
            case (hour >= 5 && hour < 18):
                return faSun;
            default:
                return faMoon;
        }
    })();

    return (
        <div>
            <div className="mb-2">
                <p className="text-xl text-center font-sans font-bold text-gray-600 dark:text-gray-300 mt-1">
                    {greeting}
                </p>
            </div>
            <div className="flex flex-col items-center mb-2">
                <span className="text-6xl font-sans font-bold text-gray-800 dark:text-gray-200">
                    {hours}
                </span>
                <div className="flex text-6xl font-sans font-medium text-gray-600 dark:text-stone-300 mt-1">
                    <span className="font-serif">{minutes}</span>
                    <span className="mx-2">:</span>
                    <span className="font-monospace font-4xl font-extralight text-orange-950 dark:text-orange-100">{seconds}</span>
                </div>
            </div>
            <div className="mb-1">
                <p className="text-xl text-center font-sans font-extralight text-gray-600 dark:text-gray-200 mt-1">
                    {date}
                </p>
            </div>
            {error ? (
                <div className="text-center text-red-600 dark:text-red-300 font-sans text-xs">
                    {error}
                </div>
            ) : (
            <div className="text-center">
                <p className="font-sans text-sm dark:text-gray-300">
                    {selectedCity}
                    <span>
                        <img
                            src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
                            alt="Weather icon"
                            className="inline-block mx-1 weather-icon w-8 h-8"
                            style={{ filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 0.5))" }}
                        />
                    </span>
                    {weather}°C
                </p>
            </div>
            )}
        </div>
    );
}

export default Time;
