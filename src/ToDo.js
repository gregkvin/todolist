import { useEffect, useState } from "react";
import { faEdit, faSave, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useToDo } from "./ToDoProvider";

function ToDo() {
  const tasksPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { toDos, addToDo, editToDo, removeToDo, completeToDo } = useToDo();
  const [todo, setTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const currPage = localStorage.getItem("pagination");
    if (currPage) {
      setCurrentPage(Number(currPage));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("pagination", currentPage);
  }, [currentPage])

  useEffect(() => {
    const tasksFiltered = localStorage.getItem("filter");
    if (tasksFiltered) {
      setFilter(Number(tasksFiltered));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter])
  
  const filterTask = toDos.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const allCount = toDos.length;
  const completedCount = toDos.filter(task => task.completed).length; 
  const activeCount = toDos.filter(task => !task.completed).length;
  

  const handleSubmit = () => {
    if(todo.trim()){
      addToDo(todo)
      setTodo("");
      const totalPages = Math.ceil(filterTask.length / tasksPerPage);
      if (totalPages > 0) {
        setCurrentPage(totalPages);
      }
    }
  }

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditClick = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  const handleEditSubmit = () => {
    editToDo(editId, editText);
    setEditId(null);
    setEditText("");
  };

  const handleDeleteClick = (task) => {
    removeToDo(task.id);
  };

  const handleCancel = () => {
    setEditId(null);
    setEditText("");
  };

  const handleComplete = (task) => {
    console.log(task);
    completeToDo(task.id);
  }

  useEffect(() => {
    const totalPages = Math.ceil(filterTask.length / tasksPerPage);
    if (totalPages < currentPage) {
      setCurrentPage(totalPages || 1);
    }
  }, [filterTask.length, currentPage, tasksPerPage]);


  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filterTask.slice(indexOfFirstTask, indexOfLastTask);

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="max-w-md">
      <div className="flex items-center mb-4 mt-2">
        <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 bg-transparent focus:outline-none transition-colors duration-200 placeholder-gray-400 text-gray-800 dark:text-gray-300 font-sans font-light"
            onChange={(e) => handleChange(e)}
            value={todo} 
        />
        <button onClick={handleSubmit} className="text-slate-500 dark:text-slate-300 hover:text-teal-500 dark:hover:text-emerald-200 font-sans">
            Add
        </button>
    </div>

    <div className="flex mb-2 justify-center font-sans text-xs text-gray-600 dark:text-slate-300 font-extralight">
      <button  onClick={() => setFilter('all')} className={`flex items-center px-4 py-1 ${filter === "all" ? "text-sky-600 dark:text-sky-300" : "hover:text-sky-600 dark:hover:text-sky-300"}`}>All<span className="mx-1 font-semibold"> ({allCount})</span></button>
      <button  onClick={() => setFilter('completed')} className={`flex items-center px-4 py-1 ${filter === "completed" ? "text-emerald-600 dark:text-emerald-300" : "hover:text-emerald-600 dark:hover:text-emerald-300"}`}>Completed <span className="mx-1 font-semibold"> ({completedCount})</span></button>
      <button  onClick={() => setFilter('active')} className={`flex items-center px-4 py-1 ${filter === "active" ? "text-indigo-600 dark:text-indigo-300" : "hover:text-indigo-600 dark:hover:text-indigo-300"}`}>Active <span className="mx-1 font-semibold"> ({activeCount})</span></button>
    </div>

      <ul className="space-y-2 mb-2">
        {currentTasks.map((task) => (
          <li
            key={task.id}
            className="border border-gray-300 p-2 rounded flex items-center justify-between hover:bg-stone-50 dark:hover:bg-slate-500 transition-colors duration-200"
          >
            { editId === task.id ? (

              <div className="flex items-center w-full">
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                  className="flex-1 bg-transparent focus:outline-none transition-colors duration-200 text-gray-800 dark:text-gray-200 font-sans font-light"
                />
                <div className="flex space-x-3">
                <button
                  onClick={() => handleEditSubmit(task.id)}
                  className="text-slate-500 dark:text-slate-200 hover:text-green-600 dark:hover:text-emerald-300"
                >
                  <FontAwesomeIcon icon={faSave} />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-slate-500 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                </div>
              </div>
            ): (
              <div className="flex items-center w-full ">
                <button onClick={() => handleComplete(task)}
                  className={`flex items-center w-full text-left text-gray-900`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="text-gray-900 dark:text-gray-100"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    fill={task.completed ? "#bbf7d0" : "none"}
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                <p className={ `ml-4 font-sans font-extralight text-gray-800 dark:text-gray-200 ${task.completed ? 'line-through' : ''}`}>{task.text}</p>
              </button>
              <div className="flex space-x-3">
                <button onClick={() => handleEditClick(task)} className="text-slate-500 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-300 font-extralight">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => handleDeleteClick(task)} className="text-slate-500 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-300 font-extralight">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="max-w-full overflow-x-auto scrollbar-hidden">
      <div className="flex justify-center space-x-1">
        {Array.from(
          { length: Math.ceil(filterTask.length / tasksPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 ${
                currentPage === index + 1
                  ? "text-amber-500"
                  : "text-gray-600 dark:text-gray-200"
              } hover:text-amber-400 transition-colors duration-200 font-sans`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
    </div>
  );
}

export default ToDo;
