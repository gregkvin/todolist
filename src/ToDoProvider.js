import React, { useContext, useEffect, useState } from "react"

const ToDoContext = React.createContext();

export function useToDo(){
    return useContext(ToDoContext);
} 

export const ToDoProvider = ({ children }) => {
    const [toDos, setToDos] = useState(() => {
        const toDoList = localStorage.getItem("todo");
        return toDoList ? JSON.parse(toDoList) : []
    });

    useEffect(() => {
        localStorage.setItem("todo", JSON.stringify(toDos));
    }, [toDos])

    const addToDo = (text) => {
        const newToDo = {id: Date.now(), text, completed: false};
        setToDos((prevToDos) => [...prevToDos, newToDo]);
    }

    const editToDo = (id, text) => {
        setToDos((prevToDos) => prevToDos.map((toDo) => 
            toDo.id === id ? {...toDo, text: text} : toDo
        ))
    }

    const removeToDo = (id) => {
        setToDos((prevToDos) => prevToDos.filter((toDo) => toDo.id !== id ));
    }

    const completeToDo = (id) => {
        setToDos((prevToDos) => prevToDos.map((toDo) => 
            toDo.id === id ? {...toDo, completed: !toDo.completed } : toDo
        ));
    }

    return (
        <ToDoContext.Provider value={{ toDos, addToDo, editToDo, removeToDo, completeToDo }}>
          {children}
        </ToDoContext.Provider>
      );

}