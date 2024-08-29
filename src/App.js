import Time from "./Time";
import ToDo from "./ToDo";
import DarkMode from "./DarkMode";
import { DarkModeProvider } from "./DarkModeProvider";
import { ToDoProvider } from "./ToDoProvider";
import Settings from "./Settings";
import { useState } from "react";
import CityModal from "./CityModal";
import { CityProvider } from "./CityProvider";

function App() {
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const openSettings = () => setSettingsModalOpen(true);
  const closeSettings = () => setSettingsModalOpen(false);

  return (
    <CityProvider>
    <DarkModeProvider>
      <ToDoProvider>    
      <div className="App w-[300px] h-[600px] relative">
       <div className="flex flex-col h-full bg-gray-100 px-6 dark:bg-gray-700">
      <Settings openSettings={openSettings}/>
      <DarkMode />
      <Time />
      <ToDo />
      <CityModal isOpen={settingsModalOpen} onClose={closeSettings} />
      </div>
    </div>
    </ToDoProvider>
    </DarkModeProvider>
    </CityProvider>
   
  );
}

export default App;
