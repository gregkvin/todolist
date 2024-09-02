import { faGear, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Settings({openSettings}){


    return (
        <div>
        <button
            className="absolute top-14 right-6 text-gray-400 dark:text-gray-400 hover:text-slate-300 dark:hover:text-gray-200"
            onClick={openSettings}
            >
                <FontAwesomeIcon icon={faGear}  size="lg" />
        </button>
        </div>
    );
}

export default Settings;

