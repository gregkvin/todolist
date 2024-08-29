import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDarkMode } from "./DarkModeProvider";



function DarkMode(){
    const { isDarkMode, setIsDarkMode } = useDarkMode();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    return (
        <div className="relative max-w-md mb-4">
        <div className="form-check form-switch mb-3 flex items-center absolute top-6 right-0">
        <input
          className="form-check-input hidden"
          type="checkbox"
          id="darkModeSwitch"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
        <label htmlFor="darkModeSwitch" className="cursor-pointer">
          <FontAwesomeIcon
            icon={isDarkMode ? faMoon : faSun}
            className="text-yellow-500 dark:text-gray-400"
            size="lg"
          />
        </label>
      </div>
      </div>
    );
}

export default DarkMode;