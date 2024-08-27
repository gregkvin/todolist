import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function Time() {
    const [currentTime, setCurrentTime] = useState(new Date());

    const MORNING = 'Good Morning';
    const AFTERNOON = 'Good Afternoon';
    const EVENING = 'Good Evening';
    const NIGHT = 'Good Night';

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


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
            <div className="mb-2">
                <p className="text-xl text-center font-sans font-extralight text-gray-600 dark:text-gray-200 mt-1">
                    {date}
                </p>
            </div>
        </div>
    );
}

export default Time;
