import Time from "./Time";
import ToDo from "./ToDo";
import DarkMode from "./DarkMode";
import { DarkModeProvider } from "./DarkModeProvider";
import { ToDoProvider } from "./ToDoProvider";

function App() {
  return (
    <DarkModeProvider>
      <ToDoProvider>    
      <div className="App w-[300px] h-[600px]">
       <div className="flex flex-col h-full bg-gray-100 p-6 dark:bg-gray-700">
      <DarkMode />
      <Time />
      <ToDo />
      </div>
    </div>
    </ToDoProvider>
    </DarkModeProvider>
  );
}

export default App;
